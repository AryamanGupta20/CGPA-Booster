// Read-only smoke checks. No account creation or load generation.
const origin=new URL(process.argv[2]||'http://127.0.0.1:4213').origin;
let failed=0;
async function check(label,fn){try{await fn();console.log('PASS '+label);}catch(e){failed++;console.error('FAIL '+label+': '+e.message);}}
const expect=(condition,message)=>{if(!condition)throw Error(message)};
const get=path=>fetch(origin+path,{signal:AbortSignal.timeout(15000),redirect:'error'});
await check('Public entry pages',async()=>{for(const path of ['/','/login','/signup']){const r=await get(path);expect(r.ok,path+' HTTP '+r.status);const html=await r.text();expect(html.includes('CGPA Booster'),'Missing project title');expect(r.headers.has('content-security-policy'),'Missing CSP');}});
await check('Database connectivity only',async()=>{const r=await get('/api/health');expect(r.ok,'Health HTTP '+r.status);const d=await r.json();expect(d.ok&&d.database,'Database probe failed');});
await check('Protected routes reject signed-out requests',async()=>{for(const path of ['/api/state','/api/admin/students']){const r=await get(path);expect([401,403].includes(r.status),path+' HTTP '+r.status);}});
await check('Bot configuration hides private keys',async()=>{const r=await get('/api/auth/config');expect(r.ok,'Config unavailable');const d=await r.json();expect(!Object.keys(d).some(k=>/secret|pepper|password/i.test(k)),'Unexpected private field');if(!['127.0.0.1','localhost'].includes(new URL(origin).hostname))expect(d.enabled===true,'Bot protection is not enabled');});
await check('Release asset integrity',async()=>{const r=await get('/release.json');expect(r.ok,'Release record unavailable');const release=await r.json();const {createHash}=await import('node:crypto');for(const [path,expected] of Object.entries(release.assets)){const asset=await get('/'+path);expect(asset.ok,path+' unavailable');const actual=createHash('sha256').update(Buffer.from(await asset.arrayBuffer())).digest('hex');expect(actual===expected,path+' differs from release record');}console.log('UI release '+release.id+'; API contract '+release.apiContract);});
console.log('These checks do not prove signup, saving, uploads, moderation, email delivery or hosted capacity. Follow the signed-in release checklist.');
process.exitCode=failed?1:0;
