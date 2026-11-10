import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import frontend from '../worker/frontend.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const redirect=await frontend.fetch(new Request('http://campus.test/login?view=reset'),{});
assert.equal(redirect.status,308);assert.equal(redirect.headers.get('location'),'https://campus.test/login?view=reset');
const local=await frontend.fetch(new Request('http://127.0.0.1:4210/'),{ASSETS:{fetch:()=>new Response('local')}});
assert.equal(await local.text(),'local');
for(const page of ['index','login','signup','dashboard']){
 const html=read('public/'+page+'.html');assert(html.includes('name="description"'));assert(html.includes('og:image'));assert(html.includes('/privacy.html'));assert(html.includes('/terms.html'));assert(html.indexOf('/professional.css')<html.indexOf('/site.css'));
 if(page!=='index')assert(html.includes('noindex, nofollow'));
}
for(const page of ['privacy','terms','cookies','404'])assert(read('public/'+page+'.html').includes('<h1>'));
assert(read('public/robots.txt').includes('Disallow: /api/'));
assert(!read('public/sitemap.xml').includes('/dashboard'));
assert(existsSync(new URL('../public/social-preview.png',import.meta.url)));
assert(!read('public/boot.js').includes("load('/welcome-engine.js')"));
assert(!read('public/welcome.js').includes('data:image'));
assert(read('public/welcome.js').includes('if(busy||!form.reportValidity())return'));
assert.equal(JSON.parse(read('wrangler.jsonc')).assets.not_found_handling,'404-page');
console.log('PASS: HTTPS redirect, local preview, metadata, policy links, private-page indexing and lightweight auth entry point.');
