# Carrowmont Naming & PDF Report Standardization — Implementation Record

## Purpose

This implementation applies the September 2026 Carrowmont naming and PDF-report standard across the main website, all five calculator repositories, and central QA.

The release is intentionally limited to naming, PDF rendering, report structure, and QA. Existing calculator calculation engines are outside the change set.

## Source snapshot

Reviewed source snapshot commits:

- `draw004.github.io` — `db981a3174e92b7342e9fda625f78fcea4c9eb15`
- `sip-calculator` — `84dc19dfb4536dba7e2559b93613d20c3aa101f3`
- `goal-planner` — `ff67d3bbddf36ec1919b76fa5f574b19c133e7d4`
- `financial-independence` — `50c004dec61a843bdee920e1d2240af0461fc9c7`
- `inflation-calculator` — `4253b546cae04a69e0ca23cfefe4b9b1cedf70d2`
- `retirement-calculator` — `68eb0fe8460b84da41132abfc9dc41bc03a508ae`
- `carrowmont-qa` — `669f43ea893ebb46e0fc6eb401975e091f08b41f`

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

The five calculator repositories receive the same byte-identical `report-standard.js` helper.

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

No `styles.css` file is changed by this release.

## QA protection

Central QA is updated to verify:

- the shared report standard exists in all five tools
- the helper is byte-identical across all five tools
- each tool loads the shared helper before its PDF renderer
- all reports use the standardized Guide & Methodology page
- all reports use the standardized Continue Planning page
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
- Carrowmont multi-repo source contract — **56 PASS / 0 FAIL**
- shared `report-standard.js` hash equality — **PASS**
- calculation/application file comparison — **PASS / unchanged**

Full browser/PDF rendering is intentionally performed by the Batch PR Publisher against a combined staged website before it creates any pull request.

## Automated publication safety

The Batch PR Publisher:

1. verifies the reviewed base SHA-256 for every modified existing file
2. verifies every bundled replacement SHA-256
3. applies changes only to an explicit seven-repository allow-list
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
