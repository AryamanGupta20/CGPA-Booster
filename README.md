# CGPA Booster

A semester project for students moving into college and tech degrees.

CGPA Booster brings study and career support into one student website, with a Prism Arcade dashboard and an admin dashboard.

## Project guides

- [Run on another laptop](docs/run-on-another-laptop.md) — setup and common local errors.
- [Class demo checklist](docs/class-demo-checklist.md) — checks before a presentation.
- [Contributing guide](CONTRIBUTING.md) — how to prepare and check changes.
- [Report a bug](https://github.com/AryamanGupta20/CGPA-Booster/issues/new?template=bug_report.md) — describe a problem with steps to repeat it.
- [Suggest a feature](https://github.com/AryamanGupta20/CGPA-Booster/issues/new?template=feature_request.md) — explain the student problem and proposed improvement.

## Run on your computer

Install Node.js 24 or later, then run:

```
node server/local.mjs
```

Open http://127.0.0.1:4173 and keep the terminal open. No npm packages are needed for this version.

Create an account using your email and a password of at least 10 characters. Save the recovery code shown after signup. Email delivery and email verification are not configured.

## Admin

The project owner's email is reserved for admin signup. The private setup code is printed in the local terminal. Never commit that code, passwords, database files or student uploads. Admins can see account details, login counts and help requests. Private expenses and private portfolios are not included in the admin dashboard.

## Data

Local SQLite records and uploads are stored in `.campus-data/`. Back up the whole directory. It is excluded from Git. Do not deploy this local SQLite version on a host that deletes its disk on restart.

## Checks

```
node tests/api.test.mjs
node tests/screens.test.cjs
node tests/admin-screens.test.cjs
```

API tests use real in-memory SQLite. Screen tests use a DOM stub; they are not browser visual tests.

## Hosted website

Open [CGPA Booster](https://collexion-campus.aryamangupta55.workers.dev/). The address keeps the original project name so existing links continue to work. The GitHub repository contains the source code; it is not the website login page.

The local server uses a separate database on your laptop. Local accounts and changes do not automatically appear on the hosted website. Check the live website before a presentation; a source commit alone does not prove a successful deployment.

The course material is a general guide with curated external video links, not a verified university-specific syllabus. The WhatsApp link opens a channel, not a discussion group. Portfolios are private unless students choose to share them.

## Cloudflare deployment

The project uses two Workers. The public Worker serves the website and forwards API requests through a service binding. The private backend handles API requests and uses the D1 database. See [Separate hosting](docs/separate-hosting.md) for the architecture and deployment notes.

After installing development dependencies with `npm ci` in a checkout containing the lockfile:

- `npm run deploy` applies D1 migrations using `wrangler.backend.json`, then deploys the public Worker.
- `npm run deploy:backend` deploys the backend using `wrangler.backend.json`.

These commands change the hosted environment and require Cloudflare access. They are not needed to run the website locally. Do not run them just to preview a page.

Keep API changes compatible while the two deployments complete. Do not rename Worker bindings or replace the database as part of a branding update. Store credentials in private service settings, never in source files.

Monitor the active plan and current usage limits before increasing traffic. This project does not establish unlimited capacity. After a deployment, check registration, login, admin-only access, uploads and saving data after logout using test accounts.
