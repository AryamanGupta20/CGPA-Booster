// Keep the admin's same-origin page preview working while blocking third-party framing.
export const staticSecurityHeaders={
 'X-Content-Type-Options':'nosniff',
 'X-Frame-Options':'SAMEORIGIN',
 'Referrer-Policy':'no-referrer',
 'Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=()',
 'Strict-Transport-Security':'max-age=31536000',
 'Content-Security-Policy':"default-src 'self'; script-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com; frame-ancestors 'self'; object-src 'none'; base-uri 'none'; form-action 'self'"
};
// Count bytes as they arrive; Content-Length is only an early hint, not a trusted limit.
export async function boundedBytes(request,limit){
 const tooLarge=()=>Object.assign(new Error('This request is too large.'),{status:413});
 if(Number(request.headers.get('content-length')||0)>limit)throw tooLarge();
 const reader=request.body?.getReader();if(!reader)return new Uint8Array();
 const chunks=[];let size=0;
 try{while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit){await reader.cancel();throw tooLarge();}chunks.push(value);}}finally{reader.releaseLock();}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}return bytes;
}
