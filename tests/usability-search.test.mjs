import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../public/usability.js',import.meta.url),'utf8');

const nodes={'ux-results':{},'ux-result-count':{}};
const context=vm.createContext({document:{getElementById:id=>nodes[id]}});
vm.runInContext(source.slice(source.indexOf('const entries='),source.indexOf('async function destination')),context);
function search(query){vm.runInContext('results('+JSON.stringify(query)+')',context);return nodes['ux-results'].innerHTML;}
for(const query of ['resume','résumé','RESUME','  résumé  ']){
 assert.match(search(query),/data-key="resume"/);
 assert.equal(nodes['ux-result-count'].textContent,'1 result');
}
for(const query of ['B.Tech','B.Sc.','M.C.A.','computer science'])assert.match(search(query),/data-key="courses"/);
assert.match(search('placement'),/data-key="placement"/);
search('');assert.equal(nodes['ux-result-count'].textContent,'9 results');
assert.match(search('no matching tool xyz'),/No matching tool/);
assert.equal(nodes['ux-result-count'].textContent,'0 results');
assert.doesNotMatch(search('<script>alert(1)</script>'),/<script>/);
console.log('PASS: accented and dotted searches, destinations, counts and no-match text.');
