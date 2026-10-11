# Carrowmont Naming & PDF Report Standardization — Implementation Record

## Purpose

This implementation record now applies the Carrowmont naming and PDF-report standard across the main website, all seven primary calculator repositories, and central QA.

The original September 2026 report-standardization work was limited to naming, PDF rendering, report structure, and QA. The October 2026 six-tool extension changes only the shared report helper, related QA contracts and documentation for the five existing calculators; the Budget & Cash Flow Planner is introduced as the new sixth calculator in the accompanying V1 release. Existing calculator calculation engines remain outside this report-standard change set.

The October 2026 CORE7 Home Loan / Mortgage extension is a later approved architecture change. It expands the shared primary report registry from six to seven tools. Each primary-tool report now removes its own tool from the registry and renders the other six. Older six-tool/five-card passages in this record describe the historical Budget launch, not the current registry.

## Source snapshot

Reviewed source snapshot commits:

- `draw004.github.io` — `ee9b40f47e3a1b7e3d828ea7f151350a7359c947`
- `sip-calculator` — `05befef2d03c9953faa3b8797a5cb609b0eb450a`
- `goal-planner` — `78e4232984daeb0e87d1e64a1f0f12cca9f48bf3`
- `financial-independence` — `fa3de50fd53e8173961cd9bc38a231829489cad3`
- `inflation-calculator` — `d81b51bb4ba8564edc45ec88eb61ba66944cc633`
- `retirement-calculator` — `81186b7bbb7cb5e96ae74758e8c828f0639cb709`
- `budget-cash-flow-planner` — `dc91bc847e75e4cecd974bc569e665a4bd95db15`
- `carrowmont-qa` — `e64038886d8d0e3abe42cd135de018c809f0de23`

## Naming standard

### India

The investment tool continues to use **SIP Calculator** prominently.

The PDF identity is **SIP Planning Report** and the report is prepared from the **Carrowmont SIP Calculator**.

### Outside India

The same product is presented as **Recurring Investment Calculator**.

The PDF identity is **Recurring Investment Planning Report** and the report is prepared from the **Carrowmont Recurring Investment Calculator**.

The established production route remains `/sip-calculator/`.

`Monthly Investment Calculator` is retired as the general product identity on the main product surfaces covered by this release. A broader Learn-content terminology/SEO pass remains intentionally separate.

## Shared PDF architecture

The seven primary calculator repositories receive the same byte-identical `report-standard.js` helper.

It provides two standardized final report pages.

### Report Guide & Methodology

Each report receives a separate page containing:

- How to read this report
- report-specific methodology
- report-specific terminology
- important assumptions and disclaimer
- methodology reference
- Carrowmont contact details

The page structure is shared while terminology and methodology remain specific to the calculator.

### Continue planning with Carrowmont

Each report receives a separate final tools page.

The investment-tool card resolves by country:

- India — **SIP Calculator**
- outside India — **Recurring Investment Calculator**

### Seven-tool registry rule

The shared report helper maintains one registry containing all seven active Carrowmont primary calculators:

- SIP Calculator / Recurring Investment Calculator
- Retirement Planner
- Goal Planner
- Financial Independence
- Inflation Calculator
- Budget & Cash Flow Planner
- Home Loan / Mortgage Prepayment & Early Payoff Calculator

For every report, the **Continue planning with Carrowmont** page removes the calculator that generated the report and renders every remaining active calculator. With seven active primary calculators, that means exactly six related-tool cards. The helper must not truncate the registry, and a new approved primary calculator should be added to the shared registry rather than patched into one report independently.

The current six-card related-tools layout uses the established two-column grid. The rule is shared across all seven primary calculator repositories and the helper remains byte-identical.

## SIP / Recurring Investment changes

- India retains SIP wording.
- International product identity uses Recurring Investment Calculator.
- International hero wording no longer describes the product as monthly-only.
- PDF title and prepared-from identity are country-aware.
- Long contribution-frequency terminology is moved out of the old fixed-height methodology layout into the wrapping-safe shared guide page.
- Contribution-frequency calculation logic is not changed.

## Retirement report fixes

- Key-value rows calculate height from wrapped label and value text.
- Long values can wrap while remaining right aligned.
- Long labels in the monthly-investment action section use wrapped text.
- Detailed expense pages use fewer rows per page and increased row height.
- The final methodology and tools pages use the shared report standard.

These changes address the previously observed collisions with divider lines and neighboring rows.

## Financial Independence report fixes

Both report charts receive permanent printed values at the selected target age.

The report prints:

- FI target
- projected portfolio
- money added
- projected portfolio on the contribution/growth chart

A PDF reader no longer has to rely on hover behavior to interpret the selected-age values.

## Goal Planner and Inflation report changes

Both reports adopt the standardized Guide & Methodology page and the standardized Continue Planning page while keeping their own calculation-specific terminology and methodology.

## Main website changes

The main homepage/tool identity and shared site naming logic use:

- India — SIP Calculator
- outside India — Recurring Investment Calculator

The broader Learn article/content rewrite is intentionally deferred to a later content/SEO pass so URLs and indexed topics are not unnecessarily disturbed during this report release.

## Calculation safety

The following calculation/application files were compared with the source snapshot and remain unchanged:

- `sip-calculator/core.js`
- `sip-calculator/app.js`
- `goal-planner/app.js`
- `financial-independence/core.js`
- `financial-independence/app.js`
- `inflation-calculator/app.js`
- `retirement-calculator/app.js`

No existing calculator `styles.css` file is changed by the six-tool report-standard extension. Budget & Cash Flow Planner V1 adds its own stylesheet as part of the new tool launch.

## QA protection

Central QA is updated to verify:

- the shared report standard exists in all seven primary tools
- the helper is byte-identical across all seven primary tools
- each tool loads the shared helper before its PDF renderer
- all reports use the standardized Guide & Methodology page
- all reports use the standardized Continue Planning page
- the shared tool registry contains all seven active primary calculators
- each Continue Planning page renders all six other active primary calculators without truncation
- India retains SIP identity
- international product/report surfaces use Recurring Investment Calculator
- international hero wording is not monthly-only
- FI reports contain permanent printed chart values
- Retirement report rows are wrapping-safe
- detailed Retirement expense pages use safer pagination
- PDF files generated during QA are retained as review artifacts
- local staged QA stubs only the Cloudflare analytics beacon, preventing expected localhost CORS noise from being treated as a Carrowmont application error while preserving all first-party JavaScript error checks

## Pre-publication static validation

Completed before creating the release bundle:

- JavaScript syntax validation — **PASS**
- Carrowmont multi-repo source contract — **154 PASS / 0 FAIL**
- shared `report-standard.js` hash equality — **PASS**
- calculation/application file comparison — **PASS / unchanged**

Full browser/PDF rendering is intentionally performed by the Batch PR Publisher against a combined staged website before it creates any pull request.

## Automated publication safety

The Batch PR Publisher:

1. verifies the reviewed base SHA-256 for every modified existing file
2. verifies every bundled replacement SHA-256
3. applies changes only to an explicit eight-repository allow-list
4. syntax-checks changed JavaScript
5. runs the multi-repo source contract
6. builds a combined staged Carrowmont website
7. runs Chrome browser and PDF QA against the staged website
8. retains generated report PDFs as QA artifacts
9. verifies that no file outside the release manifest changed
10. creates one feature branch and one pull request per repository
11. **never merges automatically**

## Final live verification

After owner review and merge, run:

- Carrowmont Automated QA
- visual review of generated PDFs using `VISUAL-REVIEW-CHECKLIST.md`
- Carrowmont Multi-Repo Guard

The rollout is complete only after those live checks are green and no material report-layout defect remains.
