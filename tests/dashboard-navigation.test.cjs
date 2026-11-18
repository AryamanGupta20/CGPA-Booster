const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
(async()=>{
 const nodes=new Map(),listeners={},loaded=[],requests=[],opened=[],historyCalls=[];
 const node=id=>{if(!nodes.has(id))nodes.set(id,{id,hidden:id==='orbit-tools',innerHTML:'',addEventListener(){},querySelector(){return null;}});return nodes.get(id);};
 const location={pathname:'/dashboard',search:'',href:'https://example.test/dashboard'};
 const history={pushState(_a,_b,url){historyCalls.push(['push',url]);assign(url)},replaceState(_a,_b,url){historyCalls.push(['replace',url]);assign(url)}};
 function assign(url){const u=new URL(url,location.href);Object.assign(location,{href:u.href,pathname:u.pathname,search:u.search});}
 let mountCount=0,ctx;
 const controller={async flush(){},openSection(s){opened.push(s);ctx.window.Campus.onSectionChange?.(s)},summary(){return ''},dispose(){},dataSnapshot(){return {}},async refreshRequests(){requests.push('/requests')}};
 const window={CAMPUS_TEMPLATES:{student:'student shell'},async mountStudent(){mountCount++;return controller},async mountCommunity(){return {show:async()=>{},dispose(){}}},renderDashboardSummary:()=>'',addEventListener(k,v){listeners[k]=v},removeEventListener(k){delete listeners[k]},scrollTo(){}};
 ctx=vm.createContext({window,location,history,URL,URLSearchParams,console,document:{documentElement:{dataset:{}},head:{appendChild(){}},body:{appendChild(s){loaded.push(s.src);s.onload()}},createElement(){return {}},querySelector(){return true},getElementById:node}});
 let source=fs.readFileSync('public/boot.js','utf8');source=source.slice(0,source.indexOf("document.addEventListener('click'"))+'})();';await vm.runInContext(source,ctx);
 const campus=window.Campus;campus.user={name:'Test',email:'test@example.test',id:'test'};campus.api=async p=>{requests.push(p);if(p==='/state')return {data:{},version:0};if(p==='/content')return {items:[],settings:{}};throw Error('Optional service unavailable')};
 await campus.loadStudent();assert.equal(mountCount,0);assert(!loaded.includes('/student.js'));assert.deepEqual(requests,['/state','/content']);
 await campus.openTool('exams');assert.equal(mountCount,1);assert.equal(location.search,'?tool=exams');assert.equal(opened.at(-1),'exams');assert.equal(node('orbit-tools').hidden,false);
 await campus.openTool('money');assert.equal(mountCount,1);assert.equal(location.search,'?tool=money');
 const before=historyCalls.length;assign('/dashboard?tool=exams');await listeners.popstate();assert.equal(opened.at(-1),'exams');assert.equal(historyCalls.length,before,'Back must not create a new history entry');
 assign('/dashboard');await listeners.popstate();assert.equal(node('orbit-tools').hidden,true);assert.equal(historyCalls.length,before);
 await campus.openTool('service');assert(requests.includes('/requests'));
 await campus.openTool('money');campus.onSectionChange('resume');assert.equal(location.search,'?tool=resume');
 console.log('PASS: lazy tool mounting, optional-service isolation, exam routing, history and support loading. Mocked DOM; browser checks are separate.');
})().catch(e=>{console.error(e);process.exitCode=1});
