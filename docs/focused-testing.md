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
