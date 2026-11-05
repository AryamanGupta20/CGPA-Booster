# Run CGPA Booster on another laptop

## Start the website

1. Install Node.js 24 or newer and VS Code.
2. Download the project and extract it if it is a ZIP file.
3. In VS Code, open the folder containing `package.json`.
4. Open **Terminal > New Terminal**.
5. Run `node --version` to check your Node.js version.
6. Run `npm start`.
7. Open http://127.0.0.1:4173 in your browser.

Keep the terminal open while using the website. Press Ctrl+C in the terminal to stop it. The local server uses Node.js built-in modules; installing deployment tools is not needed just to run this local version.

## Accounts and data

This laptop gets its own local database in `.campus-data/`. Live website accounts are separate. Create a test account for local use. Keep any recovery code private.

Do not include `.campus-data/`, private environment files, passwords, or secret keys when sharing the source code. Do not use real student data for a classroom demonstration.

## If something does not work

- **Node or npm is not recognised:** install Node.js, then close and reopen VS Code.
- **package.json cannot be found:** open the project folder containing that file, not its parent folder.
- **node:sqlite cannot be found:** use Node.js 24 or newer.
- **Address already in use:** stop the other local server before starting this one.
- **Only the page design opens:** use `npm start`, not VS Code Live Server. Account features need the backend.
- **The page will not open:** check that the terminal is still running and use port 4173.

The local address works only on this laptop. Share the hosted website link when friends need to use the website from their own devices. Running locally does not deploy changes to Cloudflare.

## Use a different local port

If port 4173 is busy, use one of these commands, then open http://127.0.0.1:4174.

**Windows PowerShell:**

```powershell
$env:PORT = '4174'
npm start
```

**macOS or Linux:**

```sh
PORT=4174 npm start
```

To return to the default port in PowerShell, stop the server and run `Remove-Item Env:PORT`, then run `npm start` again.
