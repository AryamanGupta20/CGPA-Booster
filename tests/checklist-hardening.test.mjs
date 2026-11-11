import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {handleApi} from '../server/api.mjs';
import {adapter} from '../server/local.mjs';
import {validateUpload} from '../server/upload-validation.mjs';
const bytes=s=>new TextEncoder().encode(s);
assert.equal(validateUpload('notes.txt',bytes('Study notes — Unicode is supported.')),'text/plain');
assert.equal(validateUpload('notes.pdf',bytes('%PDF-1.7\nfixture')),'application/pdf');
for(const name of ['photo.png','photo.jpg','photo.webp','notes.pdf','notes.docx','notes.xlsx','program.exe'])assert.throws(()=>validateUpload(name,bytes('<script>alert(1)</script>')),e=>e.status===400);
assert.throws(()=>validateUpload('notes.txt',new Uint8Array([0,1,2])),e=>e.status===400);
assert.throws(()=>validateUpload('notes.txt',new Uint8Array([0xff])),e=>e.status===400);
// Office fixtures contain a minimal central directory. The validator does not extract files.
function zip(names){const chunks=[new Uint8Array([80,75,3,4])];let size=0;for(const name of names){const n=bytes(name),entry=new Uint8Array(46+n.length),v=new DataView(entry.buffer);v.setUint32(0,0x02014b50,true);v.setUint16(28,n.length,true);entry.set(n,46);chunks.push(entry);size+=entry.length;}const end=new Uint8Array(22),v=new DataView(end.buffer);v.setUint32(0,0x06054b50,true);v.setUint16(8,names.length,true);v.setUint16(10,names.length,true);v.setUint32(12,size,true);v.setUint32(16,4,true);chunks.push(end);const out=new Uint8Array(4+size+22);let at=0;for(const chunk of chunks){out.set(chunk,at);at+=chunk.length;}return out;}
assert.match(validateUpload('file.docx',zip(['[Content_Types].xml','word/document.xml'])),/wordprocessing/);
assert.throws(()=>validateUpload('file.xlsx',zip(['[Content_Types].xml','word/document.xml'])),e=>e.status===400);
assert.throws(()=>validateUpload('file.docx',zip(['[Content_Types].xml','word/document.xml','word/vbaProject.bin'])),e=>e.status===400);
const sql=new DatabaseSync(':memory:');sql.exec(readFileSync(new URL('../server/schema.sql',import.meta.url),'utf8'));
const objects=new Map(),env={DB:adapter(sql),ADMIN_SETUP_TOKEN:'local-test-token',BUCKET:{async put(k,b){objects.set(k,b)},async delete(k){objects.delete(k)}}};
async function call(path,method='GET',data,cookie=''){const res=await handleApi(new Request('https://campus.test/api'+path,{method,headers:{Origin:'https://campus.test','X-Campus-Request':'1',Cookie:cookie,...(data&&!(data instanceof FormData)?{'Content-Type':'application/json'}:{})},...(data?{body:data instanceof FormData?data:JSON.stringify(data)}:{})}),env);return {status:res.status,data:await res.json(),cookie:res.headers.get('set-cookie')?.split(';')[0]};}
const admin=await call('/auth/signup','POST',{name:'Admin fixture',email:'aryamangupta55@gmail.com',password:'test-password-12345',adminCode:env.ADMIN_SETUP_TOKEN});
const student=await call('/auth/signup','POST',{name:'Student fixture',email:'fixture@example.test',password:'test-password-12345'});
const draft=await call('/admin/content','PUT',{kind:'video',data:{title:'Private draft',url:'https://www.youtube.com/watch?v=demo',status:'Draft',topic:'Speaking',language:'Hindi'}},admin.cookie);
assert.equal(draft.status,200);
for(const cookie of ['',student.cookie])assert(!(await call('/content','GET',null,cookie)).data.items.some(x=>x.id===draft.data.id));
assert((await call('/content','GET',null,admin.cookie)).data.items.some(x=>x.id===draft.data.id));
assert.equal(sql.prepare("SELECT count(*) AS n FROM admin_audit WHERE action='content-update'").get().n,1);
assert.equal((await call('/admin/content','PUT',{kind:'video',data:{}},student.cookie)).status,403);
assert.equal(sql.prepare('SELECT count(*) AS n FROM admin_audit').get().n,1,'failed student access cannot create a successful edit audit');
const form=new FormData();form.set('category','Technical guidance');form.set('description','Please check my project files.');form.set('timing','Flexible');form.append('files',new Blob(['good text']), 'notes.txt');form.append('files',new Blob(['not an image']), 'fake.png');
assert.equal((await call('/requests','POST',form,student.cookie)).status,400);
assert.equal(objects.size,0,'earlier uploaded files are cleaned after a later file fails validation');
assert.equal(sql.prepare('SELECT count(*) AS n FROM requests').get().n,0);
sql.close();console.log('PASS: draft resources private, content edits audited, disguised uploads rejected, office container checks, failed upload cleanup. Signature checks are not malware scanning.');
