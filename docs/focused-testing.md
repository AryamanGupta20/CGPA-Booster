# Focused testing

Run these commands from the repository root after installing dependencies with `npm ci`. Use Node.js 24 or newer. Each command stops at its first failed test.

These shortcuts run selected existing tests. They do not replace `npm test` before a broad release and do not deploy the website. Test results are not proof that a live service is healthy.

## Usability

Run `npm run test:usability`.

Use after changing tool search, loading feedback, appearance preferences or mobile menu keyboard handling. These tests use simulated browser objects; also check the affected pages in a real browser.

Included tests:

- `tests/usability-search.test.mjs`
- `tests/usability-loading.test.mjs`
- `tests/usability-theme.test.mjs`
- `tests/usability-menu.test.mjs`

## Auth

Run `npm run test:auth`.

Use after changing signup, login, recovery, bot checks or session handling. These use local test data and simulated bot verification. They do not prove that the live Turnstile widget or email delivery works.

Included tests:

- `tests/auth-protection.test.mjs`
- `tests/auth-races.test.mjs`
- `tests/split-flow.test.mjs`

## Security

Run `npm run test:security`.

Use after changing authorization, uploads, private content or request forwarding. The restore test uses an isolated local database. This group is not a penetration test, malware scan or hosted backup restore.

Included tests:

- `tests/security.test.mjs`
- `tests/checklist-hardening.test.mjs`
- `tests/split-hosting.test.mjs`
- `tests/restore-drill.test.mjs`

## Study

Run `npm run test:study`.

Use after changing exam planning, placement preparation or opportunity validation. Tests check application behavior, not the accuracy of university syllabuses or whether a job opening remains available. Review external resources separately.

Included tests:

- `tests/study.test.cjs`
- `tests/placement.test.cjs`
- `tests/placement-validation.test.mjs`
- `tests/hiring-routes-admin.test.cjs`
