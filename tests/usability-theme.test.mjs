import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../public/usability.js',import.meta.url),'utf8');

const start=source.indexOf("const initial=read("),end=source.indexOf('const container=');
assert.ok(start>=0&&end>start);
for(const [saved,deviceDark,expected] of [
 [null,true,'dark'],[null,false,'light'],['light',true,'light'],
 ['dark',false,'dark'],['invalid',true,'dark'],['',false,'light']
]){
 const root={dataset:{}};
 vm.runInNewContext(source.slice(start,end),{
  read:key=>{assert.equal(key,'cgpa-color-mode');return saved;},
  root,matchMedia:query=>{assert.equal(query,'(prefers-color-scheme: dark)');return {matches:deviceDark};}
 });
 assert.equal(root.dataset.colorMode,expected);
}
console.log('PASS: saved appearance takes priority and invalid preferences use device appearance.');
