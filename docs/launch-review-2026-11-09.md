# Website review: 9 November 2026

This is a source review and a set of bounded checks, not a penetration-test certificate or a promise that every issue is fixed.

## Changes in this release

- Replaced the animated welcome and login scenes with lightweight, readable pages and one main signup action.
- Removed loading of external Three.js and Lucide scripts; tightened the matching script policy.
- Replaced the dashboard's decorative scene and card grid with a tool directory. Existing tools and data routes remain.
- Added shared visual rules for contrast, focus, smaller screens and reduced motion. Preserved hidden views and form states.
- Added privacy, terms and cookie notices based on current features, with contact details and chat moderation information.
- Added page descriptions, canonical URLs, social metadata, a compressed 1200-by-630 preview image, robots.txt and a sitemap for the public home page.
- Added a custom 404 page and HTTPS redirects on Worker-handled routes. Entry pages and API calls run through the Worker; static files remain on the asset service to reduce free-tier Worker use.
- Added noindex directives to account pages and private/shared link responses.
- Fixed the shared portfolio print action to use an event listener compatible with the content security policy.
- Updated Wrangler from 4.92.0 to 4.158.0 and committed a dependency lockfile after audit and dry builds.

## Checklist findings

| Area | Finding and action |
| --- | --- |
| Frontend secrets | No matches in the public source for the reviewed private-key, token and secret-assignment patterns. A Turnstile site key is public by design. This was not a complete Git-history secret scan. |
| Login and sessions | Existing server-side authentication, secure cookies on HTTPS, CSRF checks, throttling, recovery rotation and suspension handling retained. Automated checks passed. |
| Bot checks | Live public configuration reported Turnstile enabled. Tests cover hostname/action validation and failure handling. A real live challenge was not completed during this review. |
| Password storage | Existing salted PBKDF2 and optional server-side HMAC pepper retained. No password or pepper rotation performed. See the remaining work below. |
| Database access | D1 remains bound only to the private backend. Application-level ownership and admin checks protect records. Supabase-style public keys and row-level-security toggles do not apply to this architecture. |
| Queries and field tampering | Existing parameterised queries and validation/access checks reviewed through the security, API, isolation and state tests. This is not a formal proof for every route. |
| Uploads | Existing limits and private attachment handling retained; file round-trip and limit tests passed. No antivirus scanning service added. |
| Browser protections | Security headers retained; external script sources reduced. Browser checks caught and fixed hidden-view and text-contrast regressions. |
| Tracking and cookies | Added an accurate cookie notice; no optional analytics or advertising trackers were installed. Existing admin login/account counts remain. |
| AI and OAuth | The current account flow does not use OAuth or an AI agent with student-data tools. The screenshot items for those systems are not applicable to this release. |
| Placeholder content | No Lorem ipsum, Vite + React title, or fake-testimonial marker found in the public HTML/JS scan. No testimonials were invented. |
| Dependencies | Initial tooling audit reported vulnerabilities. The updated isolated install reported zero known npm audit vulnerabilities. Audit results change over time. |
| Backups | Existing local restore test passed. This review did not export or test a live D1 backup. |

## Verification

All 25 test files, including the new launch-readiness test, passed before release. The launch-readiness test checks HTTPS redirects, local operation, public metadata, policy links, private-page indexing and the lightweight account entry point. Frontend and backend dry builds passed with the updated Wrangler.

Browser checks used a fictional local account and separate local database. Login, dashboard rendering and opening College Courses were checked. The dashboard was inspected at a 390px iframe viewport; this is not a physical-device test. Internal links on the new public pages were checked against local files. External course and employer links were not all revisited.

## Remaining work and limits

- The password work factor is 100,000 PBKDF2-SHA256 iterations, below OWASP's published 600,000 recommendation. A stronger version requires a measured Cloudflare-compatible migration and hosted resource-budget checks; do not change the iteration constant or pepper blindly and lock out existing users.
- No full Git-history secret scan, third-party penetration test, hosted load test or million-user capacity proof was performed.
- Cloudflare account MFA, provider backup retention and operational alerts require account-level verification. Source configuration alone does not prove those controls are active.
- The notices describe current behaviour; they are not a legal compliance certification. Review retention and deletion procedures as the service grows.
- No optional tracking was added. If analytics or advertising is introduced, update the notice and applicable consent choices before enabling it.

References: [OWASP password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [Cloudflare D1 data security](https://developers.cloudflare.com/d1/reference/data-security/), [Cloudflare static-asset routing](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).
