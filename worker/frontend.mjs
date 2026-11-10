// Public website. Student data is accessible only through the private API binding.
import { staticSecurityHeaders } from '../server/security.mjs';
export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  if (url.protocol === 'http:' && !['localhost','127.0.0.1','[::1]'].includes(url.hostname)) {
   url.protocol = 'https:';
   return Response.redirect(url.href,308);
  }
  if (url.pathname.startsWith('/api/')) {
   if (!env.API) return Response.json({error:'The service is temporarily unavailable.'},{status:503,headers:{'Cache-Control':'no-store','Retry-After':'10'}});
   // Keep the original URL, cookies and Origin for the API's security checks.
   try { return await env.API.fetch(request); } catch {
    return Response.json({error:'The service is temporarily unavailable. Please try again.'},{status:503,headers:{'Cache-Control':'no-store','Retry-After':'10','X-Content-Type-Options':'nosniff'}});
   }
  }
  const assetRequest=url.pathname.startsWith('/p/')?new Request(new URL('/index.html',url),request):request;
  const response = await env.ASSETS.fetch(assetRequest);
  const headers = new Headers(response.headers);
  if (url.searchParams.has('portfolio') || url.pathname.startsWith('/p/') || url.searchParams.has('campusPage')) headers.set('X-Robots-Tag','noindex, nofollow');
  for (const [name,value] of Object.entries(staticSecurityHeaders)) headers.set(name,value);
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
 }
};
