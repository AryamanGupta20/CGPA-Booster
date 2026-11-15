import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../public/usability.js',import.meta.url),'utf8');

let handler,expanded='true',focused=false,removed=false,prevented=false;
const listener=source.match(/header\.addEventListener\('keydown',e=>\{.*?\}\);/);
assert.ok(listener,'mobile menu needs a keyboard handler');
vm.runInNewContext(listener[0],{
 header:{addEventListener:(type,fn)=>{assert.equal(type,'keydown');handler=fn;},classList:{remove:name=>{assert.equal(name,'ux-menu-open');removed=true;}}},
 menu:{getAttribute:key=>{assert.equal(key,'aria-expanded');return expanded;},setAttribute:(key,value)=>{assert.equal(key,'aria-expanded');expanded=value;},focus:()=>{focused=true;}}
});
handler({key:'Enter'});assert.equal(expanded,'true');assert.equal(focused,false);
handler({key:'Escape',preventDefault:()=>{prevented=true;}});
assert.equal(expanded,'false');assert.ok(focused&&removed&&prevented);
focused=false;prevented=false;
handler({key:'Escape',preventDefault:()=>{prevented=true;}});
assert.equal(focused,false);assert.equal(prevented,false,'closed menu must leave Escape to other controls');
console.log('PASS: Escape closes an open menu, restores focus and leaves closed menus alone.');
