# Back up and restore local test data

This guide is for the local Node.js server only. It does not back up Cloudflare D1 or any hosted student accounts.

## Make a backup

1. Stop the local server with Ctrl+C.
2. Confirm no other local server is using this project's data folder.
3. Copy the entire `.campus-data` folder to a private backup location outside the repository.
4. Give the backup a date and a clear label so you can identify it later.
5. Keep the original folder until you have checked the backup.

Copy the entire folder, including uploads and any SQLite companion files, rather than copying only the main database file. Stopping the server first prevents writes while copying.

The folder can contain private account details and uploads. Do not commit it, attach it to a public issue or include it in a source-code ZIP.

## Check a restore safely

1. Make a separate copy of the project for testing.
2. If that copy already has a `.campus-data` folder, preserve it elsewhere before replacing it.
3. Copy the backup into the test project's root and name it `.campus-data`.
4. Start that copy with `npm start`. Stop the original server first, or use a [different port](run-on-another-laptop.md#use-a-different-local-port).
5. Sign in with a test account from the backup.
6. Check a saved record and a test upload, if the backup contains one.
7. Stop the test server and record whether the restore passed.

A backup is not verified until a restore has been checked. Do not test recovery by overwriting the only copy of your data. Hosted backup and recovery must be handled separately.
