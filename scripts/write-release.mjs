import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const files=['boot.js','dashboard-summary.js','community.js','student.js','welcome.js','professional.css','usability.js','usability.css','auth-protection.js','admin.js','career-tools.js','study-tools.js','control-studio.js','orbit-mark.svg'];
const assets={};for(const file of files)assets[file]=createHash('sha256').update(await readFile(new URL('../public/'+file,import.meta.url))).digest('hex');
await writeFile(new URL('../public/release.json',import.meta.url),JSON.stringify({id:'2026-11-18-study-navigation',apiContract:1,backendChanges:false,assets},null,2)+'\n');
