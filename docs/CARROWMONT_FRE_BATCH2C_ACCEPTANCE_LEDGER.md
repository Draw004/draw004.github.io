# Carrowmont FRE Batch 2C Acceptance Ledger

Batch: **2C — Car Affordability & Auto Decision Core**  
Baseline: `carrowmont-source-snapshot - 2026-11-07T232236.641.zip`  
Baseline source contract: **822 PASS / 0 FAIL**

| ID | Mandatory outcome | Implementation / owner | Evidence | Status |
|---|---|---|---|---|
| B2C-R1 | Add a standalone car-affordability decision tool without changing the nine-card homepage | Main-site car-affordability HTML/CSS/JS | Browser + Tools Hub contract | PASS before Publisher |
| B2C-R2 | Reuse the existing Loan / EMI engine for payment and interest mathematics | `car-affordability-auto-decision-core.js` + `/loan-calculator/core.js` | Deterministic dependency fixture | PASS before Publisher |
| B2C-R3 | Reuse Borrowing Health for current/post-purchase DTI context | Car core + `debt-to-income-borrowing-health-core.js` | DTI parity fixture | PASS before Publisher |
| B2C-R4 | Reuse Emergency Fund & Runway for pre/post-purchase resilience | Car core + `emergency-fund-runway-core.js` | Runway parity fixture | PASS before Publisher |
| B2C-R5 | Include monthly running costs instead of treating the loan payment as the whole cost | UI + car core | All-in monthly cost fixture | PASS before Publisher |
| B2C-R6 | Show household cash room before/after purchase and a user-controlled higher-cost stress scenario | UI + car core | Deterministic + browser fixture | PASS before Publisher |
| B2C-R7 | Support lower-price, larger-down-payment and longer-term comparisons without presenting one as universally best | Car core + UI + PDF | Comparison fixtures | PASS before Publisher |
| B2C-R8 | Do not use a universal car affordability cutoff or predict lender approval | UI copy + FRE adapter assumptions | Static contract | PASS before Publisher |
| B2C-R9 | Keep financial values local: no login, persistence or financial-input network calls | UI/runtime | Browser privacy contract | PASS before Publisher |
| B2C-R10 | Provide Copy Summary, CSV and exact three-page PDF report | UI + PDF helpers | Browser/download contract | PASS before Publisher |
| B2C-R11 | Add Tools, Search, Sitemap and contextual Learn discovery while preserving Learn dates | Main site | Search/static/browser contracts | PASS before Publisher |
| B2C-R12 | Register the tool for the future Financial Resolution Assistant | FRE adapter, catalog, Router existing car intent, Registry V6 | FRE contract | PASS before Publisher |
| B2C-R13 | Preserve 59 region profiles / 48 currencies and all existing calculator formulas | Existing locale + dependency reuse | Full regression contract | PASS before Publisher |
| B2C-R14 | Validate both normal Source Snapshot and separate-QA Multi-Repo Guard layouts | Central QA source contract | Source/Guard simulations | PASS before Publisher |

Publisher browser/PDF QA, production merge, Automated QA, Multi-Repo Guard and a fresh Source Snapshot remain release gates.
