CARROWMONT SIP PAY-FREQUENCY IMPLEMENTATION SPEC
Status
Implementation specification for the SIP Calculator pilot only.
Repository:
`Draw004/sip-calculator`
This is a surgical feature addition, not a redesign.
The purpose is to add selectable contribution frequency while protecting the calculator's existing design, monthly calculation behaviour, reports, charts, layout, and other functionality.
Related documents:
`docs/CARROWMONT_ARCHITECTURE.md`
`docs/CARROWMONT_PAY_FREQUENCY_STANDARD.md`
`docs/CARROWMONT_GITHUB_AUTOMATION_HANDOVER.md`
---
1. Non-Negotiable Freeze
The following must not be intentionally changed as part of this feature:
fonts
font sizes
colours
spacing system
page width
cards
borders
button styling
navigation
header styling
footer styling
country/currency styling
chart styling
report typography
PDF visual design
report page margins
existing currency formatting
existing number-formatting rules
existing rounding rules
existing URLs
sitemap URLs
SEO metadata, except if a frequency-related wording correction is later approved separately
existing annual-return assumption
existing inflation logic
existing annual step-up concept
existing goal logic
existing time-to-target logic except for making the contribution interval frequency-aware
existing monthly result when Monthly is selected
No "cleanup refactor", CSS modernization, variable renaming campaign, layout redesign, dependency change, or unrelated copy edit should be bundled into this PR.
---
2. Existing SIP Baseline
The current calculator uses:
Existing invested amount
Current monthly SIP
Investment period
Expected annual investment return
Annual increase in monthly SIP
The current methodology describes:
annual return converted to an equivalent monthly compound rate
existing investments growing monthly
contributions added at month-end
annual SIP step-up
numerical solving for the required monthly SIP
time-to-target checking on the existing monthly model
The current page also contains frequency-specific wording such as:
"recurring monthly contribution"
"Current monthly SIP"
"starting monthly contribution"
"Annual increase in monthly SIP"
"Based on your existing investment, monthly SIP..."
"Total monthly SIP required from now"
"Additional monthly SIP required"
"Follow the monthly SIP..."
"starting monthly SIP required"
All of those must be handled deliberately when a non-monthly frequency is selected.
---
3. Pilot Scope
The SIP pilot should add one new user input:
`Contribution frequency`
Do not add a separate salary/income Pay Frequency field to the SIP Calculator during this pilot.
Reason:
The SIP Calculator models investments, not salary income.
A person can be paid every two weeks and still invest monthly.
Therefore the SIP Calculator should calculate using Contribution Frequency.
The broader Carrowmont architecture can separately retain a user's Pay Frequency for future tools such as:
Financial Independence
Pay Cycle Budget Planner
future cash-flow tools
---
4. Exact UI Placement
Inside the existing:
`Investment plan`
field grid, place the new field immediately after the current SIP amount field and before Investment period.
Current conceptual order:
Existing invested amount
Current monthly SIP
Investment period
Expected annual investment return
Annual increase in monthly SIP
New order:
Existing invested amount
SIP contribution amount
Contribution frequency
Investment period
Expected annual investment return
Annual increase in SIP contribution
This should use the existing `.field` and existing `<select>` styling already used elsewhere in the calculator.
Do not create a new visual component or a new design system.
---
5. Frequency Field
Recommended element:
`id="contributionFrequency"`
Canonical values:
```text
weekly
biweekly
semimonthly
fourweekly
monthly
```
Do not use the displayed label as the calculation key.
Normal period counts:
```text
weekly       = 52
biweekly     = 26
semimonthly  = 24
fourweekly   = 13
monthly      = 12
```
---
6. Display Labels
Country controls the wording and suggested default, but never removes the user's choices.
US / Canada style
```text
Weekly
Biweekly (Every 2 Weeks)
Twice Monthly
Every 4 Weeks
Monthly
```
Australia / New Zealand / UK / Ireland style
```text
Weekly
Fortnightly (Every 2 Weeks)
Twice Monthly
Every 4 Weeks
Monthly
```
Neutral international fallback
```text
Weekly
Every 2 Weeks
Twice Monthly
Every 4 Weeks
Monthly
```
`Biweekly`, `Fortnightly`, and `Every 2 Weeks` map to the same internal ID:
`biweekly`
---
7. Country Behaviour
Country may set a suggested initial frequency.
Examples:
```text
India -> monthly
United States -> biweekly
Canada -> biweekly
Australia -> biweekly, displayed as Fortnightly
New Zealand -> biweekly, displayed as Fortnightly
United Kingdom -> monthly
Ireland -> monthly
Philippines -> semimonthly
```
This is a UX default, not a locked rule.
Every supported frequency remains available in the dropdown.
---
8. User Override Rule
The user's selection wins.
Required behaviour:
```text
No manual frequency choice yet:
Country change -> update frequency to the new country's suggested default.

User has manually changed frequency:
Country change -> preserve the user's selected frequency.
```
Do not silently replace a manually selected frequency.
A local state flag can be used, conceptually:
`frequencyUserOverride = true`
Cross-tool persistence can be added later after confirming the production origin/storage architecture.
Do not add broad cross-tool storage in the SIP pilot unless separately reviewed.
---
9. Existing Monthly Default Safety
The monthly calculation path is the control path.
When:
`Contribution frequency = Monthly`
the calculator must reproduce the current monthly outputs within the existing display/rounding tolerance.
The monthly path must remain mathematically equivalent to the current production methodology.
This requirement applies to:
future value
total amount invested
estimated investment growth
fixed-SIP comparison
step-up benefit
required SIP for goal
additional SIP required
time to target
yearly journey values
comparison charts
report values
Copy Summary
---
10. Calculation Generalisation
The current model converts the annual return to an equivalent monthly compound rate.
The safe generalisation is to convert the same annual-return assumption to an equivalent rate for the selected contribution period.
Conceptually:
```text
periodicRate = (1 + annualReturn)^(1 / periodsPerYear) - 1
```
where:
```text
periodsPerYear =
52 for weekly
26 for biweekly
24 for semimonthly
13 for fourweekly
12 for monthly
```
For Monthly:
```text
periodicRate = (1 + annualReturn)^(1 / 12) - 1
```
which must remain the same monthly-rate convention already used by the current methodology.
This is a generalisation of the current method, not a new return methodology.
---
11. Contribution Timing
Keep the existing contribution-timing principle:
contribution is added at the end of each modelled contribution period.
Therefore:
Monthly -> month-end contribution
Weekly -> end of each modelled week
Biweekly/Fortnightly -> end of each 2-week modelled period
Semi-monthly -> end of each of 24 modelled periods
Four-weekly -> end of each 4-week modelled period
Do not switch monthly contributions to beginning-of-period.
That would alter the existing monthly result.
---
12. Existing Invested Amount
The existing invested amount should continue growing using the selected equivalent periodic rate.
For a full year, the selected periodic rate should compound to the same annual-return assumption.
Do not apply a separate return convention to existing invested money.
---
13. Annual Step-Up
The current feature is an annual increase.
It must remain annual.
For the selected frequency:
```text
weekly       -> step-up after 52 contribution periods
biweekly     -> step-up after 26 contribution periods
semimonthly  -> step-up after 24 contribution periods
fourweekly   -> step-up after 13 contribution periods
monthly      -> step-up after 12 contribution periods
```
Do not apply the step-up every 12 periods for all frequencies.
That would incorrectly step up a weekly contribution every 12 weeks.
---
14. Goal Solver
The existing numerical approach for solving required contribution should be retained unless inspection of `app.js` proves a change is technically required.
The change should be:
```text
solve for required contribution per selected period
```
rather than:
```text
solve for required monthly SIP
```
Do not replace the solver with a completely different mathematical approach as part of this PR.
---
15. Time-to-Target
The target model must iterate using the selected contribution periods.
The methodology wording should change from:
`first modelled month`
to:
`first modelled contribution period`
where necessary.
The user-facing duration format should remain as close as possible to the current format.
Do not redesign the duration UI in this PR.
---
16. Minimal Label Changes
Only frequency-dependent wording should change.
Input amount label
When Monthly is selected:
`Current monthly SIP`
For other frequencies:
```text
Current weekly SIP
Current biweekly SIP
Current fortnightly SIP
Current twice-monthly SIP
Current four-weekly SIP
```
If this produces awkward country-specific wording, use the neutral label:
`Current SIP contribution`
with helper text showing the cadence.
The preferred implementation is whichever requires the least disruption to the existing layout.
Helper text
Monthly:
`The starting monthly contribution.`
Non-monthly:
`The starting contribution for each selected period.`
Annual step-up label
Monthly may retain:
`Annual increase in monthly SIP`
For non-monthly frequencies, change dynamically to:
`Annual increase in SIP contribution`
or a frequency-specific equivalent.
The helper text remains conceptually unchanged:
`Models a step-up once each year. Use 0% for a fixed SIP.`
---
17. Snapshot Wording
Current frequency-specific text should become frequency-aware.
For example:
Monthly:
`Based on your existing investment, monthly SIP, step-up and return assumption`
Biweekly:
`Based on your existing investment, biweekly SIP, step-up and return assumption`
Australia/NZ variant:
`Based on your existing investment, fortnightly SIP, step-up and return assumption`
Do not change snapshot layout or styling.
---
18. Goal Metrics
Current labels include:
Total monthly SIP required from now
Additional monthly SIP required
These must become frequency-aware.
Examples:
Monthly:
```text
Total monthly SIP required from now
Additional monthly SIP required
```
Biweekly:
```text
Total biweekly SIP required from now
Additional biweekly SIP required
```
Australia/NZ:
```text
Total fortnightly SIP required from now
Additional fortnightly SIP required
```
The action ribbon must use the same wording.
---
19. Journey Section
Current wording includes:
`Follow the monthly SIP, money invested and modelled portfolio value...`
Make only the necessary frequency wording dynamic.
Example neutral wording:
`Follow the recurring SIP, money invested and modelled portfolio value for every year of the plan.`
Do not change the table layout, chart design, colours, headings, or visual hierarchy.
---
20. "How It Works" and Methodology
The current methodology is explicitly monthly.
It must be updated accurately but minimally.
Recommended conceptual wording:
```text
Periodic return:
The annual return assumption is converted to the equivalent compound rate for the selected contribution frequency.

SIP projection:
Existing investments grow at the equivalent periodic rate. Contributions are added at the end of each selected contribution period and can increase once each year by the entered step-up rate.

Required SIP:
The starting contribution for the selected frequency that would model to the selected future goal while applying the entered annual step-up. It is solved numerically.

Time to target:
The first modelled contribution period in which the projected portfolio equals or exceeds the target corpus, checked for up to 50 years.
```
Do not add a new methodology panel.
Use the existing panel and styling.
---
21. Headline / SEO-Sensitive Copy
Do not broadly rewrite the page headline, metadata, or SEO copy in this pilot.
If static "monthly" wording becomes factually wrong after a user selects another frequency, prefer a small runtime wording substitution over a permanent marketing rewrite.
Monthly selection should retain the current familiar monthly wording where practical.
Any SEO copy redesign should be a separate reviewed change.
---
22. Copy Summary
The Copy Summary output must state the selected contribution frequency.
Example:
```text
Contribution: $500 every 2 weeks
Contribution frequency: Biweekly
Annual step-up: 5%
Investment period: 15 years
Expected annual investment return: 8%
```
For Australia/NZ/UK/Ireland, use `Fortnightly` instead of `Biweekly` in user-facing text.
Do not change the overall Copy Summary structure beyond what is needed to make frequency clear.
---
23. PDF Report
Do not change:
report fonts
margins
colours
page design
heading hierarchy
footer design
The report should include frequency using the existing assumption-row style.
Preferred minimal approach:
```text
SIP contribution: $500
Contribution frequency: Biweekly (Every 2 Weeks)
```
If adding one row causes a page-layout regression, combine them:
```text
SIP contribution: $500 every 2 weeks
```
The visual report standard takes priority over adding unnecessary rows.
---
24. Internal Naming / Refactor Safety
The existing HTML currently uses identifiers such as:
`monthlySIP`
Do not perform a broad rename across the codebase merely for semantic cleanliness during this pilot.
A broad rename creates unnecessary regression risk.
Preferred approach:
add `contributionFrequency`
reuse existing amount input
adapt the calculation boundary carefully
only rename existing IDs/variables where technically necessary and fully covered by tests
A later cleanup PR can rename internals after the feature is stable.
---
25. Required Regression Tests Before Implementation
Before modifying calculation code, record/capture current production outputs for at least:
Fixture A — Current default growth mode
Use the current default inputs.
Record:
hero value
total invested
investment growth
fixed SIP value
step-up benefit
Fixture B — Fixed monthly SIP
Set:
`Annual increase = 0%`
Record the full result.
Fixture C — Goal mode
Record:
future goal amount
current-plan value
required monthly SIP
additional monthly SIP
Fixture D — Time-to-target mode
Record:
time to target
total invested by target
estimated growth
These become pre-change baselines.
---
26. Required Automated Tests After Implementation
Monthly preservation
Explicitly select:
`Monthly`
Then prove that the current independent monthly-compounding test still passes.
The existing independent monthly formula regression must not be deleted or weakened.
Frequency constants
Assert:
```text
weekly = 52
biweekly = 26
semimonthly = 24
fourweekly = 13
monthly = 12
```
Label mapping
Assert:
`biweekly`
displays as:
`Biweekly` in US/Canada
and:
`Fortnightly` in Australia/NZ/UK/Ireland
without changing its mathematical ID.
Biweekly vs semi-monthly
Prove that:
```text
biweekly != semimonthly
26 != 24
```
and their projected results differ for the same per-period contribution.
Step-up timing
Prove the annual step-up occurs once per year for every frequency.
User override
Prove:
```text
Country default selected
-> user manually selects another frequency
-> later country change does not overwrite manual selection
```
---
27. Existing QA Contracts That Must Stay Green
The SIP pilot must preserve the existing QA areas, including:
no JavaScript errors
required controls visible
no page-level horizontal overflow
report button remains inside its action container
chart 1 renders
chart 2 renders
charts keep permanent/static readable values
independent monthly compounding regression
report generation/download standard
internal link health where enabled
Do not "fix" a new feature by weakening an existing QA test.
---
28. Browser / Layout Review
After implementation, visually compare the SIP page before and after in:
Chrome desktop
Edge desktop
mobile Chromium
Check specifically:
no font difference
no unexpected card height change
no broken field alignment
no horizontal overflow
frequency dropdown fits on mobile
buttons remain unchanged
snapshot card remains aligned
charts remain unchanged
PDF report remains visually consistent
---
29. Branch / PR Process
Do not edit `main` directly.
Use:
```text
feature/sip-contribution-frequency
```
or an equivalent descriptive branch.
Then:
```text
implement
-> run SIP tests
-> run central QA
-> inspect screenshots
-> create PR
-> review changed files
-> verify no unrelated CSS/design edits
-> merge only after approval
```
---
30. Diff Review Rule
Before merge, the PR should be reviewed specifically for accidental changes.
Reject or remove unrelated changes involving:
global CSS
fonts
branding
header/footer
page width
chart colours
report theme
unrelated copy
other calculators
sitemap
deployment workflow
The change set should be narrow and explainable.
---
31. Acceptance Criteria
The SIP pilot is complete only when all of the following are true:
Contribution Frequency dropdown exists.
All supported frequency choices remain user-selectable.
Country supplies only a suggested default.
Manual user choice overrides country suggestion.
Monthly calculation results remain unchanged within existing rounding tolerance.
Weekly calculations work.
Biweekly/Fortnightly calculations work.
Semi-monthly calculations work.
Four-weekly calculations work.
Annual step-up remains annual.
Goal mode works for every frequency.
Time-to-target works for every frequency.
Copy Summary states frequency.
PDF report states frequency.
Current fonts/design/layout are unchanged.
Existing charts remain visually unchanged.
Existing QA stays green.
New frequency-specific QA passes.
Desktop and mobile visual review passes.
PR contains no unrelated changes.
---
32. Implementation Gate
Do not start coding from this specification alone if the current `app.js`, `locale.js`, `core.js`, and PDF renderer have not been inspected.
Before the first code edit, inspect the current production versions of:
```text
index.html
app.js
locale.js
core.js
pdf-export.js
sip-pdf-renderer.js
```
and the relevant QA calculation/report tests.
The purpose is to adapt the existing architecture rather than replace it.
If the live files differ from the baseline described in this document, update the implementation plan before coding.
---
33. Guiding Rule
This feature should feel as if the SIP Calculator always supported multiple contribution frequencies.
The user should notice the new capability.
They should not notice a redesign, formula rewrite, typography change, report redesign, or unrelated behavioural change.
