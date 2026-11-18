# 63-point review: changes and remaining limits

Review continued on 18 November 2026. This record covers the existing CGPA Booster application, not a new design prototype. “Changed” means the source was updated. It does not mean every browser, account or deployment has been verified. No design can prove who wrote the code.

| # | Finding | Result / evidence |
|---|---|---|
| 1 | Purpose was unclear | Changed: welcome and dashboard put exam preparation first; careers, money and community remain supporting tools. |
| 2 | Generic headline | Changed: “Your next exam. A plan for each day.” |
| 3 | No output example | Changed: labelled example with revision, SQL practice and past-paper work. |
| 4 | No student scenario | Changed: database exam in seven days; clearly marked as an example. |
| 5 | Generic copy | Changed main welcome, dashboard, account, résumé, budget and admin headings. Some legacy tool copy remains. |
| 6 | Repeated introductions | Removed the extra welcome routine section and duplicate dashboard hero actions. |
| 7 | Weak identity | Changed to a study-first layout, blue/ink colours, simple typography and concrete tasks. This remains a design judgment. |
| 8 | Orbit logo mismatch | Replaced the orbit symbol with a book and progress mark; kept its asset path to avoid broken links. |
| 9 | Old public hostname | Retained intentionally. Changing it needs a coordinated origin, bot-widget, cookie and link migration. No domain has been bought. |
| 10 | Every tool looked the same | Study summary now differs from tool rows and data forms. Existing task-specific planner, budget table and résumé preview retained. |
| 11 | Empty hero space | Added an example study plan beside the desktop introduction. |
| 12 | Long phone introduction | Shortened copy and spacing; example stacks below the main action. |
| 13 | Signup form too far down | Replaced two-column marketing layout with a compact, centred account form. |
| 14 | Unbalanced desktop login | Same compact form layout now serves login and signup. |
| 15 | Inconsistent spacing | Shared public-page spacing and tool body padding; smaller mobile account bar and horizontal tool navigation. |
| 16 | Misaligned containers | Shared public widths and centred tool content. Custom admin-authored layouts still need separate previews. |
| 17 | Too many heading sizes | Reduced welcome/auth/dashboard scales; tool headings remain task-specific. |
| 18 | Too much uppercase | Removed several uppercase labels and neutralised eyebrow text transforms. |
| 19 | Tiny supporting text | Increased legacy template 10–12px font-size rules to 13px; key tool supporting text uses 14px. |
| 20 | Excess footer padding | Removed utility-toolbar clearance padding and phone footer margin. |
| 21 | Too many borders | Removed outer dashboard hero/tool containers; kept borders on fields and useful separators. |
| 22 | Inconsistent corners | Square controls and main surfaces across shared styles. Avatars retain their own shape. |
| 23 | Toolbar covered phone password | Utility controls now flow after page content rather than floating over forms. |
| 24 | Toolbar covered desktop submit | Same flow-layout fix. |
| 25 | Distracting secondary toolbar | Search, theme and help remain available at the end of the page. |
| 26 | Dark auth tabs indistinguishable | Explicit active/inactive contrast, verified on phone signup. |
| 27 | Forgot password on signup | Shown only in login mode. |
| 28 | Signup header links to itself | Account header now links to Home and Help. |
| 29 | Duplicate account navigation | Mode switching is inside the form; header no longer repeats it. |
| 30 | Bot widget theme mismatch | Turnstile uses the saved page theme when rendered. Actual hosted challenge appearance still needs a production check. |
| 31 | Misleading startup message | Replaced “Opening your workspace” with checking sign-in status inside a sized loading section. |
| 32 | Signed-out loading wording | Does not assume that the visitor already has a workspace. |
| 33 | Layout shift | Sized loading section and reduced account layout help; no measured CLS result is claimed. |
| 34 | Recovery information too early | Removed from the account introduction; detailed instructions remain at recovery/signup completion. |
| 35 | Recovery code is the only reset method | Clearly explains the current method and offers a support contact. Email reset is NOT implemented; support must not bypass identity checks. |
| 36 | Multiple dashboard styles | Shared theme tokens and content widths; some legacy stylesheet structure remains. |
| 37 | Returning students start over | Dashboard shows the next unfinished task from saved study data. |
| 38 | Continue panel hidden | New lightweight summary is visible on the main dashboard. |
| 39 | Study had equal priority | Exam task is the main summary action; course and résumé are secondary. |
| 40 | Nested shells | Removed duplicate tool heading/brand and Dashboard nav item; simplified sidebar to tool navigation. |
| 41 | No URL / Back behaviour | Tool URLs use /dashboard?tool=…; Back/Forward restores the tool without adding a new history entry. Internal tool nav updates the URL. Community tabs are still local state. |
| 42 | Limited search scope | Expanded tool/help index from 9 to 14 destinations. Label explicitly separates this from people/post search. It is not a full-text syllabus search engine. |
| 43 | Exam search opened courses | Exams now render directly, including for students who have not chosen a course. |
| 44 | Separate profiles can drift | UI explains public community vs private profile and copied résumé projects. No silent cross-profile sharing was added. Full opt-in field synchronisation remains future work. |
| 45 | Résumé check overstated | Existing text explicitly calls it completeness guidance, not an ATS score or recruiter review. Retained and reviewed. |
| 46 | PDF differences across browsers | Added print-preview/page-break guidance; existing A4 stylesheet retained. Identical output across browsers is not promised. |
| 47 | Social search is keyword-based | Existing selected-resource approach retained. It is not personalised advice or counselling. |
| 48 | Email / background push unavailable | Still unavailable. Existing settings say this; no delivery claims were added. Requires sender and push-service setup plus end-to-end delivery tests. |
| 49 | Manual Refresh as normal UI | Removed routine refresh controls. Community loads on navigation and refreshes its initial metadata in the background. |
| 50 | Old admin tool names | Changed Find a Team to Community link and Service Studio to Help requests. |
| 51 | Promotional admin headings | Replaced with Manage students and content, Course guides and Website settings. |
| 52 | Confusing content status | Content forms display Published while preserving the existing stored Ready value and access rules. |
| 53 | Freeform editing can break layout | Explicit Computer/Phone preview guidance and restore-to-draft instructions. Existing bounded schema and protected auth controls remain. Arbitrary edits cannot be guaranteed safe. |
| 54 | Broad effect-reset selectors | Narrowed reset targets to decorative components instead of every div, button and section. Legacy override cleanup is not complete. |
| 55 | Dark overrides hid state | Added theme tokens on app roots and distinct selected controls; fixed a white tool background with pale text found in browser testing. |
| 56 | Large coupled functions | Extracted dashboard summary into its own file and separated tool mounting. Student/community modules still need a larger staged refactor. |
| 57 | Optional reads block dashboard | Dashboard requires state/content only; community requests happen separately and show a recoverable error. Reports load when their tool opens. |
| 58 | All tools load immediately | Student, career and placement scripts now load when a tool is first opened. Admin ensures the course catalogue exists before rendering. |
| 59 | Mock tests miss visual defects | Added real phone/desktop browser checks alongside a new navigation regression test. This is not a full cross-browser test matrix. |
| 60 | Local tests do not prove capacity | Kept this boundary explicit. No million-user claim, hosted stress test or unapproved traffic generation. |
| 61 | Health alone is insufficient | Added read-only release checks for public pages, security headers, protected routes, bot config and asset hashes. Signed-in journeys still require separate testing. |
| 62 | Independent deployments | Added UI release manifest with asset hashes and API contract version. This release changes no backend contract. Backend runtime version monitoring remains separate. |
| 63 | Commit count is not quality | Release checklist records tests, browser evidence and limits. Commits are tied to changes, not contribution-calendar targets. |

## Validation record

- Existing 30 test files passed after the changes; added `dashboard-navigation.test.cjs` (31 total test files in the main command).
- New test covers lazy mounting, optional-service independence, direct exam navigation, Back behaviour and support-data loading with a mocked DOM.
- Real local browser: 390px phone signup, selected auth tab, password/submit visibility, direct exam planner, pasted date confirmation, unit entry, plan creation, completion checkbox, saving, next unfinished task on dashboard, desktop dashboard and browser Back.
- Local test account and database only. No real student data was used for these checks.
- Real hosted Turnstile, password recovery, admin moderation, uploads, PDF output in every browser and sustained cloud load are not certified by this record.

## Still open

The old hostname, email recovery, email/background push, full profile synchronisation, full legacy code/style refactor, measured layout/performance metrics and hosted capacity are not completed. They must not be reported as fixed merely because all 63 entries have been reviewed.
