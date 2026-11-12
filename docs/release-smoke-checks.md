# Release smoke checks

Run these checks after a website release. Record the date, version and results. Do not mark a check as passed without performing it.

## Automated checks
- Run `npm test` with Node.js 24 or newer.
- Run `npm audit`; review development dependencies as well as runtime dependencies.
- Build both Workers with a dry run before deploying.
- Test risky account or upload changes using an isolated local database.

## Live checks
- Open the welcome, login and signup pages on desktop and mobile.
- Check search, theme switch, help, menu and keyboard navigation.
- Confirm `/api/health` reports a working database.
- While signed out, verify private account and admin endpoints reject access.
- Using a designated test account, check saving and reloading a non-sensitive record.
- Confirm the frontend and backend both have the intended version.

A frontend release alone does not publish the separate backend Worker. Follow the existing separate-hosting guide when deploying API changes.

## If something fails
Record the page, action, time and visible error. Do not include credentials or private student data. Stop further publishing, compare with the previous working version, and verify any fix before retrying.

These checks do not replace a penetration test, a production capacity test or a hosted backup restore drill.
