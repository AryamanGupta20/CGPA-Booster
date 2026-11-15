import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../public/usability.js',import.meta.url),'utf8');

let handler,next=0;
const timers=new Map(),label={hidden:true};
const context=vm.createContext({
 container:{querySelector:()=>label},
 addEventListener:(name,fn)=>{assert.equal(name,'campus:request');handler=fn;},
 setTimeout:(fn,delay)=>{assert.equal(delay,350);timers.set(++next,fn);return next;},
 clearTimeout:id=>timers.delete(id)
});
vm.runInContext(source.slice(source.indexOf('let requests=0'),source.indexOf("addEventListener('offline'")),context);
const event=detail=>handler({detail});
event('start');const firstTimer=[...timers.keys()][0];
event('start');event('end');
assert.equal(timers.size,1);assert.ok(timers.has(firstTimer),'overlap must not restart the delay');
const callback=timers.get(firstTimer);timers.delete(firstTimer);callback();
assert.equal(label.hidden,false);
event('end');assert.equal(label.hidden,true);
event('start');event('end');assert.equal(timers.size,0,'quick requests cancel the indicator');
event('end');event('invalid');assert.equal(timers.size,0);
event('start');assert.equal(timers.size,1,'extra end events must not break later requests');
event('end');assert.equal(label.hidden,true);
console.log('PASS: overlapping, quick, unbalanced and unknown request events.');
