# Contributing to CGPA Booster

Keep changes focused on a clear student problem. Use simple language in labels and help text.

## Start locally

Follow [Run on another laptop](docs/run-on-another-laptop.md). Use fictional accounts and test data, never a copy of real student records.

## Make a change

1. Create a branch from the latest main branch.
2. Describe the problem and the expected result.
3. Make one focused change.
4. Run checks that cover the behaviour you changed.
5. Open a pull request with a short explanation and the results of your checks.

## Choose checks

- For API changes, run `node tests/api.test.mjs`.
- For student screens, run `node tests/screens.test.cjs`.
- For admin screens, run `node tests/admin-screens.test.cjs`.
- For a broader check, run `npm test`.

Screen tests use a DOM stub. They do not replace checking the actual pages in a browser. For visual changes, check phone and desktop layouts, keyboard focus and readable text. For saving changes, verify the result after refreshing.

## Check slow and failed requests

For changes involving requests or saving, use fictional data on a local or test setup:

1. Check the normal result first.
2. Use browser network controls to try a slow connection and an offline request.
3. Confirm the page shows a clear loading or error state instead of a false success.
4. Restore the connection and check whether retrying creates a duplicate.
5. Refresh and confirm the final saved result.

Record what you actually observed. Do not run load tests or deliberately disrupt real student sessions to check these cases.

## Protect data and access

Do not commit private environment files, passwords, tokens, database files or student uploads. Never remove access checks just to make a screen load. Keep server-side permission checks for admin actions.

Do not put sensitive security details into a public issue. Contact the repository owner privately first.

## Before review

Explain what changed, why it helps, what you checked and any known limits. Use the pull request template. Avoid unrelated formatting changes so the review stays clear.

Creating a pull request does not mean a change has been deployed. Production changes need review of any required migrations and service settings.
