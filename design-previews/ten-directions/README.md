# Ten UI design directions

These are design proposals for CGPA Booster, not the production interface.

## Run locally

From the repository root:

```sh
python3 -m http.server 4211 --bind 127.0.0.1 --directory design-previews/ten-directions
```

Open http://127.0.0.1:4211/ on the same computer. Stop the server with Ctrl+C.

## Compare the screens

Each of the ten directions includes Welcome, Login, Student dashboard and Admin dashboard.
Use the gallery links or the screen buttons at the top. Save favourite designs in this browser.
Example: http://127.0.0.1:4211/?design=1&screen=dashboard

The directions are Academic Journal, Workshop, Campus Atlas, Blue Ledger, Field Notes,
Signal Station, Common Room, Swiss Index, Library Stack and Metro Desk.

## Demo boundaries

- Student records, notices and posts are fictional.
- The login form does not create or authenticate accounts. Do not enter real passwords.
- Tool actions are samples, not the full production tools.
- Changes to demo data last only while the page remains loaded.
- Favourite design numbers are stored locally in the browser.
- This preview has no backend connection.
- Production assets are served from public/. This folder is outside that directory.

## Checks performed

The JavaScript syntax check passed. All forty routes rendered in the local browser.
Representative desktop and phone layouts were inspected, and editing then previewing a
demo notice was checked. This is not a full accessibility or production security audit.

Choose a design before integrating it into the live product.
