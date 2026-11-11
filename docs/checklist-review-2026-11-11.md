# Usability and security checklist — 11 November 2026

## Implemented in this update

- Optional light/dark appearance, persisted on this browser.
- Tool search with account-aware destinations; course search includes exam preparation.
- Mobile welcome/login menu, sticky header, back-to-top, reading progress and reduced-motion handling.
- Delayed request indicator, connection notices, login success/error states.
- Confirmation before deleting student projects, updates, expenses and community posts.
- Copy recovery code and contact email, contact dialog, print rules and interface update date.
- Cookie information notice explaining necessary storage, with no new visitor tracking.
- Draft content is excluded from public/student content responses; administrators can preview drafts.
- Upload content signatures and Office container checks, with cleanup after rejected uploads.
- Core admin content/settings/request edits now write audit records in the same database batch.
- Wrangler updated to 4.160.0; npm reported zero known vulnerabilities after installation.

## Existing controls checked by tests

Server-side authorization and record ownership; parameterized queries; request size limits; secure sessions; HTTPS and security headers; origin/CSRF protection; password hashing and pepper handling; bot validation; rate limits; recovery and session races; private attachment access; safe overloaded-database responses. Existing skip links, password visibility, FAQs and policy pages are retained.

## Validation and limits

All 26 local test suites passed. Frontend and backend dry-run bundles succeeded. Browser checks covered welcome/login, dark appearance, cookie dismissal and search filtering/account gates. The advisory check includes development dependencies. This is not a penetration test, a full browser test of every student/admin tool, or a production load/backup recovery test.

File signature checks are not antivirus scanning. D1 record ownership is enforced by server queries, not PostgreSQL row-level security. Anonymous public endpoints intentionally remain public. There are no chat-to-command tools or webhook receivers to secure in this implementation. UTM tracking was not added. Email verification, MFA, malware scanning and a hosted restore drill remain separate work. Dark appearance may need further checks on uncommon admin screens. No guarantee of complete security or unlimited capacity is made.
