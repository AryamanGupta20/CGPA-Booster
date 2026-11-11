// File signatures reduce disguised uploads. They are not a malware scanner.
const types={pdf:'application/pdf',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',txt:'text/plain',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'};
const fail=()=>{throw Object.assign(new Error('The file contents do not match a supported file type. Use a valid PDF, image, text, DOCX or XLSX file.'),{status:400});};
function officeContainer(bytes,extension){
 const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);let end=-1;
 for(let i=bytes.length-22;i>=Math.max(0,bytes.length-65557);i--)if(view.getUint32(i,true)===0x06054b50){end=i;break;}
 if(end<0||view.getUint16(end+4,true)!==0||view.getUint16(end+6,true)!==0)return false;
 const count=view.getUint16(end+10,true),size=view.getUint32(end+12,true);let at=view.getUint32(end+16,true);
 if(count<2||count>2000||at+size!==end)return false;
 const names=new Set();
 for(let n=0;n<count;n++){
  if(at+46>end||view.getUint32(at,true)!==0x02014b50||view.getUint16(at+8,true)&1)return false;
  const length=view.getUint16(at+28,true),extra=view.getUint16(at+30,true),comment=view.getUint16(at+32,true);
  if(at+46+length+extra+comment>end)return false;
  const name=new TextDecoder().decode(bytes.subarray(at+46,at+46+length));
  if(name.includes('..')||name.startsWith('/')||/vbaProject\.bin$/i.test(name))return false;
  names.add(name);at+=46+length+extra+comment;
 }
 return at===end&&names.has('[Content_Types].xml')&&names.has(extension==='docx'?'word/document.xml':'xl/workbook.xml');
}
export function validateUpload(name,buffer){
 const ext=String(name).split('.').pop().toLowerCase(),mime=types[ext],bytes=new Uint8Array(buffer);
 if(!mime||!bytes.length)fail();
 const starts=arr=>arr.every((x,i)=>bytes[i]===x),ascii=(start,end)=>new TextDecoder().decode(bytes.subarray(start,end));
 let valid=false;
 if(ext==='pdf')valid=ascii(0,5)==='%PDF-';
 if(ext==='png')valid=starts([137,80,78,71,13,10,26,10]);
 if(ext==='jpg'||ext==='jpeg')valid=starts([255,216,255]);
 if(ext==='webp')valid=ascii(0,4)==='RIFF'&&ascii(8,12)==='WEBP'&&bytes.length>=16;
 if(ext==='docx'||ext==='xlsx')valid=starts([80,75,3,4])&&officeContainer(bytes,ext);
 if(ext==='txt'){try{const text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);valid=!/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text);}catch{valid=false;}}
 if(!valid)fail();return mime;
}
