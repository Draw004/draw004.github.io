# CARROWMONT LEARN-LOCALE1 — Global Learn Content Localization

**Document status:** FINAL REV1 — controlling-standards and homepage non-regression guardrails added; pending protected `/docs` commit  
**Project:** Carrowmont  
**Workstream:** LEARN-LOCALE1  
**Baseline:** Post-TOOLS-HUB1 clean Source Snapshot generated 10 October 2026 12:53:20 UTC  
**Baseline main commit:** `daafa7b631710530e76e86acff8df0e4bb5f23dc`  
**Baseline QA commit:** `05a41d03d2aa3215284d5d8955b5ac77767a80c4`  
**Baseline source contract:** `292 PASS / 0 FAIL`

---

## 1. Purpose

Carrowmont is a global financial-planning product. Learn content must therefore not silently present India-specific monetary examples, units or terminology to visitors using other supported countries/currencies.

LEARN-LOCALE1 will perform a **single comprehensive repository-wide localization correction** across the Learn hub and all Learn guides. The user must not be required to inspect or repair articles one by one.

The release must:

1. audit every Learn/hub page automatically;
2. correct every user-facing hard-coded monetary example that should respond to the selected currency;
3. correct country-specific terminology where the content is intended to be global;
4. preserve genuinely contextual references such as “US dollar” where the subject itself requires that term;
5. add permanent QA so the same class of defect cannot quietly return later.

This is a localization/content-consistency release, not a redesign of Learn content and not a change to financial methodology.

### 1A. Controlling standards and homepage non-regression

This release is subordinate to and must comply with the current repository standards:

- `docs/CARROWMONT_SHARED_UI_STANDARD.md`
- `docs/CARROWMONT_ARCHITECTURE.md`

Those documents remain the controlling source for shared shell behavior, country/currency architecture, localization, homepage discovery, visual consistency and shared QA. LEARN-LOCALE1 must not create a competing localization or UI convention.

**Homepage non-regression is mandatory.** The release must not intentionally change the post-TOOLS-HUB1 homepage presentation for India or for any other supported country. In particular it must preserve:

- the complete visual identity of every core homepage tool card, including icon, badge, title, description, illustration and CTA;
- the country-aware core-tool ordering already defined by TOOLS-HUB1;
- the fixed, visually prominent `Explore All Tools` gateway position after the live core tools;
- the separate `Explore More Financial Tools` discovery treatment;
- India-specific `SIP Calculator` terminology on the homepage where currently specified;
- non-India `Recurring Investment Calculator` terminology where currently specified;
- the rule that selected country, not selected currency, controls homepage tool ordering;
- the rule that currency-only changes do not reorder homepage tools.

The following are explicitly **out of scope for functional/visual change** unless a separately approved defect is discovered during validation:

- homepage `index.html` card layout and visual design;
- `/tools.html` directory structure and visual design;
- `CARROWMONT_HOMEPAGE_TOOL_DEMAND_MATRIX.md`;
- TOOLS-HUB1 country-to-order mappings;
- core calculator mathematics;
- shared header/footer/locale-pill geometry.

If `locale.js` must be touched, the change must be additive/localization-data-only where practical and must not alter existing homepage country behavior. Central QA must prove the homepage rendering/order contract remains unchanged for representative India and non-India profiles before Publisher is allowed to pass.

---

## 2. Defect being fixed

The current shared Learn localization layer already updates some hero text, selected worked examples and several guide modules. However, later rich-content expansions introduced additional hard-coded examples directly in article HTML.

Example currently visible in the Financial Independence guide:

- `₹6 lakh`
- `₹1.50 crore`
- `₹12 lakh`
- `₹3.43 crore`

These values remain India-specific even when the visitor selects another country/currency because the rich module bypasses the shared localization layer.

This same architectural pattern occurs across multiple Learn pages.

---

## 3. Baseline audit result

A repository-level scan of the post-TOOLS-HUB1 baseline found:

- **53** Learn/hub pages in scope;
- **33** pages with India-specific monetary units/terms inside the article/main content that require localization review/correction;
- **8 supported currencies** currently missing their own round Learn-example profile and therefore falling back to the USD numeric example scale.

The eight missing Learn example profiles are:

- BDT — Bangladeshi Taka
- CLP — Chilean Peso
- DKK — Danish Krone
- NOK — Norwegian Krone
- OMR — Omani Rial
- PLN — Polish Zloty
- QAR — Qatari Riyal
- SEK — Swedish Krona

All 34 currencies defined in `locale.js` must have an explicit Learn example profile after this release.

---

## 4. Pages identified by the audit

The following 33 Learn/hub pages contain India-specific monetary values or terminology in article/main content and must be reviewed and corrected by the implementation. This list is a minimum scope, not an allowlist that permits other pages to escape the final scanner.

1. `10000-sip-returns.html`
2. `4-percent-rule-retirement.html`
3. `budgeting-by-pay-frequency.html`
4. `coast-fire-explained.html`
5. `compound-interest-monthly-contributions.html`
6. `compounding-and-time.html`
7. `emergency-fund-how-much.html`
8. `financial-independence-number.html`
9. `future-cost-of-expenses.html`
10. `how-long-will-retirement-savings-last.html`
11. `how-much-money-do-i-need-to-retire.html`
12. `how-much-should-i-invest-each-month.html`
13. `how-much-should-i-save-each-month.html`
14. `inflation-and-retirement-planning.html`
15. `inflation-purchasing-power-savings.html`
16. `inflation-value-of-money-over-time.html`
17. `investment-time-to-target.html`
18. `learn.html`
19. `longevity-risk-retirement.html`
20. `lump-sum-vs-monthly-investing.html`
21. `planning-life-goals.html`
22. `real-estate-vs-stocks.html`
23. `rent-vs-buy-home.html`
24. `retirement-monthly-income-needed.html`
25. `savings-goal-planning.html`
26. `sequence-of-returns-risk.html`
27. `sip-during-market-fall.html`
28. `sip-for-1-crore.html`
29. `starting-investing-earlier.html`
30. `step-up-sip-vs-regular-sip.html`
31. `todays-money-vs-future-money.html`
32. `when-can-i-reach-financial-independence.html`
33. `zero-based-budgeting.html`

The implementation must still scan **all 53** Learn/hub pages at final validation time, because a page not listed above may contain another localization issue not captured by the initial narrow India-term scan.

---

## 5. Global-first localization rule

Carrowmont's existing architecture remains authoritative:

> **Universal financial logic → country profile → selected currency → localized terminology and presentation.**

For Learn content:

- **Country** controls country-sensitive terminology where relevant.
- **Currency** controls monetary symbols, grouping, examples and compact number presentation.
- Country and currency remain separate choices.
- The underlying financial formula/relationship must not change simply because the visitor changes country.
- Country-specific financial rules are introduced only where the subject genuinely requires them.

No page should assume that a visitor in one country necessarily uses that country's default currency after the visitor has manually selected another supported currency.

---

## 6. Static HTML fallback rule

Because Carrowmont is globally positioned, the raw HTML fallback for a general Learn guide must not be India-specific unless the page itself is deliberately India-specific search content.

Where a value is localized by JavaScript:

- the base HTML should use a neutral/global fallback or a safe international default;
- runtime localization may replace it with India-specific wording/amounts when India/INR is selected;
- crawlers or users without JavaScript must not encounter a general global guide whose main worked examples are unexpectedly locked to `₹`, `lakh` or `crore`.

The canonical URL remains one URL. This release does not create country-specific duplicate pages.

---

## 7. Monetary example architecture

### 7.1 Round examples, not exchange-rate conversion

Learn examples are illustrative planning examples. They should use sensible round values for the selected currency rather than live FX conversion.

Example:

- INR may use a round monthly investment such as `₹10,000`.
- USD may use `$500`.
- GBP may use `£500`.

The purpose is to teach the financial relationship, not imply that the amounts are exchange-rate equivalents.

This principle must be disclosed where necessary in locale context text.

### 7.2 Complete currency example profiles

`learn-localization.js` (or an equivalent shared module) must define an explicit example scale for **all 34 supported currencies**.

Each profile should provide enough deterministic anchors for Learn examples, including where useful:

- target amount;
- recurring monthly amount;
- goal amount;
- monthly-expense amount;
- annual-spending amount;
- existing-investment amount.

Derived values should be calculated from these anchors rather than repeatedly hard-coded in HTML.

### 7.3 Indian compact units

For INR:

- use lakh/crore where that improves readability and matches the existing Carrowmont convention;
- use Indian grouping/locale formatting consistently.

For non-INR currencies:

- use localized standard formatting and million/billion where appropriate;
- do not display lakh/crore simply because the selected country is India if the user has selected a non-INR currency.

---

## 8. Country-sensitive terminology

India-specific terminology such as **SIP** or **Step-up SIP** may remain when India is the selected country and the context supports it.

For non-India profiles, use internationally understandable terminology such as:

- Monthly Investment / Recurring Investment
- Increasing Monthly Investment
- Fixed Monthly Investment

The exact labels must remain consistent with the existing Carrowmont country-profile architecture.

General global prose should avoid constructions such as:

- “every rupee”
- “the average rupee”
- “rupee/dollar amount”
- “rupee/dollar/euro amount”

when the actual concept is simply **money**, **contribution**, **currency amount**, or **purchasing power**.

---

## 9. Contextual currency references that must not be incorrectly removed

The global localization scanner must distinguish hard-coded user examples from legitimate subject-matter references.

Examples that may remain where context requires them:

- gold being commonly quoted in **US dollars**;
- the effect of a home currency moving against the **US dollar**;
- a cited source or institution whose official title contains a country/currency term;
- educational discussion explicitly comparing currencies.

Therefore QA must use targeted rules and explicit exceptions rather than blindly banning the word “dollar” across the site.

Reference/source citation blocks should not be rewritten merely because they name SEBI, Investor.gov, MoneyHelper, FINRA or another jurisdiction-specific source.

---

## 10. Dynamic localization coverage

Every affected worked example, table, inline example or callout must either:

1. be generated by the shared Learn localization layer; or
2. contain semantic data attributes/IDs that the shared layer deterministically updates.

Do not create 33 unrelated one-off scripts.

The preferred implementation is one shared localization system with reusable helpers for:

- money formatting;
- compact money formatting;
- round example profile selection;
- FI/withdrawal-rate tables;
- inflation examples;
- recurring-investment examples;
- goal examples;
- retirement examples;
- debt/budget examples;
- country terminology.

Pages that currently lack a `data-cm-page` identifier but require dynamic localization must receive a stable page identifier or equivalent declarative binding.

Known examples include:

- `compounding-and-time.html`
- `planning-life-goals.html`
- `todays-money-vs-future-money.html`

---

## 11. Financial Independence Guide requirement

The defect reported by the user must be explicitly protected.

For `financial-independence-number.html`, the first-pass FI table and surrounding explanatory text must update from the selected currency/profile.

For example, under an illustrative USD profile, an annual-spending example may read conceptually:

| Annual portfolio-funded spending | At 4% | At 3.5% | At 3% |
|---|---:|---:|---:|
| $60,000 | $1.50 million | about $1.71 million | $2.00 million |

Under INR, the same relationship may use:

| Annual portfolio-funded spending | At 4% | At 3.5% | At 3% |
|---|---:|---:|---:|
| ₹6 lakh | ₹1.50 crore | about ₹1.71 crore | ₹2.00 crore |

The exact numbers come from deterministic Carrowmont example profiles and the withdrawal-rate formula; they are not live FX conversions.

All rows in the table must reconcile mathematically with:

`FI target = annual portfolio-funded spending ÷ starting withdrawal rate`

---

## 12. SIP-focused legacy URLs

Pages such as:

- `10000-sip-returns.html`
- `sip-for-1-crore.html`
- `sip-during-market-fall.html`
- `step-up-sip-vs-regular-sip.html`

have historically India-oriented URLs/search intent. They are **not exempt from runtime localization**.

Rules:

- India may continue to see familiar SIP/Step-up SIP terminology.
- Non-India visitors should see neutral recurring/monthly-investment terminology in the visible content where already supported by Carrowmont's localization approach.
- Monetary examples must follow the selected currency.
- The existing canonical URLs may remain for SEO continuity unless a separate approved SEO migration is planned.

This release must not create redirect/canonical churn merely to rename those legacy URLs.

---

## 13. Learn hub requirement

`learn.html` must also be covered.

Any user-visible card title, description or amount on the Learn hub that uses an illustrative target/monthly amount must update consistently with the selected country/currency.

The hub's category ordering and current localization behavior must remain intact.

---

## 14. Automated repository-wide localization scanner

Central QA must add a permanent scanner/contract test covering all Learn/hub pages.

The scanner must inspect the relevant article/main content while excluding areas that would create false positives, such as:

- scripts/styles;
- standard navigation/footer boilerplate;
- source/reference citation labels where a jurisdiction name is legitimate.

For global Learn content, fail on unapproved hard-coded India-specific user-facing text such as:

- `₹`
- `lakh` / `lakhs`
- `crore` / `crores`
- `rupee` / `rupees`

It should also detect unapproved hard-coded country-specific monetary examples in other currencies where they should instead use the shared localization layer.

If a page legitimately needs a country/currency term, the exception must be narrow, documented and testable. Do not create a blanket page-level bypass unless the entire page is genuinely country-specific.

---

## 15. Browser QA matrix

At minimum, representative browser tests must cover:

1. India / INR
2. United States / USD
3. United Kingdom / GBP
4. Canada / CAD
5. Australia / AUD
6. a EUR country / EUR
7. one Middle East profile using AED/SAR/OMR/QAR
8. one East/Southeast Asian profile using JPY/CNY/KRW/IDR/VND
9. one previously missing example-profile currency such as BDT/DKK/NOK/PLN/SEK
10. Other / International

In addition, a deterministic programmatic test must iterate **all 34 supported currencies** and verify:

- an explicit Learn example profile exists;
- output is finite;
- no `NaN`, `undefined`, blank symbol or USD-example fallback occurs unintentionally;
- formatting uses the selected currency;
- FI/goal/inflation/investment derived values reconcile with their formulas.

---

## 16. Locale-change behavior

On affected Learn pages:

- changing country must update country-sensitive terminology;
- changing currency must update monetary examples;
- changing currency alone must not silently reset the selected country;
- changing country may apply its default currency according to existing Carrowmont locale behavior;
- updates should occur without requiring a hard browser refresh;
- Back/Forward/page-show/storage synchronization behavior must remain stable.

---

## 17. Content integrity

This release must not weaken or rewrite the educational meaning of the guides.

Preserve:

- formulas;
- percentages;
- time horizons;
- return/inflation assumptions;
- limitations/disclaimers;
- source references;
- article structure;
- internal links;
- canonical URLs.

When a monetary example is rebased for another currency, all dependent values in the same example must be recalculated together so the table/text remains internally consistent.

---

## 18. SEO behavior

The release must not create country-specific duplicate URLs.

Requirements:

- existing canonicals remain canonical unless explicitly changed by this spec;
- sitemap URLs remain stable;
- affected pages may receive updated `lastmod` dates when their content is changed;
- base static content should be globally appropriate;
- JavaScript localization must enhance the visible experience without turning general pages into India-only raw HTML.

Google indexing checks for the recently released authority tools remain deferred until LEARN-LOCALE1 is GREEN and a fresh post-release snapshot is taken.

IndexNow remains available for Bing when changed HTML/sitemap files are merged.

---

## 19. Accessibility and no-JS behavior

Localization must not:

- remove semantic table headers;
- replace meaningful text with inaccessible visual-only content;
- cause layout clipping at 360 px or 390 px;
- create screen-reader ambiguity when values update;
- leave empty placeholders before JavaScript executes.

Raw HTML must remain readable and educational without JavaScript.

---

## 20. Performance and privacy

The localization system must remain local/client-side and deterministic.

Do not:

- call an FX API from the browser;
- call a third-party localization service;
- add tracking to determine country;
- send the user's selected country/currency to an external service merely to render examples.

Reuse the existing Carrowmont locale state and browser-local preferences.

---

## 21. Release scope

Expected repository changes:

### `draw004.github.io`

Likely changes include:

- `learn-localization.js`
- selected Learn/hub HTML pages requiring localization bindings/base-content corrections
- possibly `locale.js` only if shared profile metadata is genuinely required
- `sitemap.xml` lastmod updates where established policy requires them
- implementation documentation under `/docs`

Explicit exclusions from the release payload unless separately approved:

- homepage `index.html` visual/card/order changes;
- `/tools.html` visual/directory changes;
- homepage demand-matrix changes;
- calculator repositories or calculation-engine changes.

### `carrowmont-qa`

Add/extend QA for:

- Learn localization static scanner;
- all-currency profile completeness;
- representative country/currency browser flows;
- homepage non-regression for India and representative non-India profiles, including card order, labels, icons/illustrations and `Explore All Tools` placement;
- `/tools.html` non-regression;
- Financial Independence rich-table regression;
- legacy SIP-page non-India rendering;
- mobile overflow.

No calculator repository should change.

Expected Publisher PR count: **2**

1. `draw004.github.io`
2. `carrowmont-qa`

No `.github/workflows/*` change is required by this specification, so temporary Release Automation **Workflows: Read and write** permission should not be necessary.

---

## 22. Red-prevention preflight

Before the production ZIP is handed to the user, the exact final bundle must pass:

- ZIP integrity;
- release manifest hash verification;
- exact baseline hash verification;
- source contract in Publisher directory layout;
- source contract in Multi-Repo Guard directory layout;
- static Learn localization scanner across all 53 pages;
- all 34 currency-profile completeness tests;
- representative browser localization tests;
- India → US → UK → Canada → Australia → EUR switching on affected pages;
- currency-only switching without region reset;
- Financial Independence Guide rich table verification;
- SIP-focused page India/non-India terminology verification;
- 360 px and 390 px no-overflow checks;
- no unexpected edits to the six calculator repositories;
- expected PR count validation.

If implementation files are edited after preflight, all affected checks must be rerun before packaging.

---

## 23. Acceptance criteria

LEARN-LOCALE1 is complete only when all of the following are true:

1. All 53 Learn/hub pages have been included in the automated audit.
2. Every user-facing hard-coded India-specific monetary example that should localize has been corrected.
3. The 33 initially identified affected pages pass the final scanner.
4. Every one of the 34 supported currencies has an explicit Learn example profile.
5. No supported currency unintentionally falls back to USD numeric example values.
6. INR uses Carrowmont's lakh/crore convention where appropriate.
7. Non-INR currencies do not display lakh/crore merely because India was previously the hard-coded source.
8. Country and currency remain separate concepts.
9. India-specific SIP terminology appears where appropriate for India.
10. Non-India visitors receive neutral recurring/monthly-investment terminology where the localization contract calls for it.
11. Financial Independence Guide tables/text update correctly after locale changes.
12. All dependent monetary values reconcile mathematically.
13. Legitimate subject references to the US dollar or jurisdiction-specific source names remain intact.
14. Static raw HTML for general global guides is not India-locked.
15. No JavaScript-disabled page is left with blank/meaningless placeholders.
16. No third-party FX/localization API is introduced.
17. Learn hub localization remains correct.
18. Existing source references and canonical URLs remain intact.
19. Desktop layouts remain stable.
20. 390 px layout passes.
21. 360 px layout passes.
22. Existing core calculator repositories remain untouched.
23. Existing SEO3 and TOOLS-HUB QA remains green.
24. The homepage view remains visually and behaviorally unchanged for India and representative non-India profiles except for no approved homepage change in this release.
25. Homepage country-aware tool ordering, India/non-India investment terminology and the fixed `Explore All Tools` gateway remain exactly as defined by TOOLS-HUB1.
26. `/tools.html` remains visually and structurally unchanged.
27. `CARROWMONT_SHARED_UI_STANDARD.md` and `CARROWMONT_ARCHITECTURE.md` contracts remain satisfied.
28. Source contract remains green.
25. Batch Publisher is GREEN.
26. Main-site PR is merged before central QA PR.
27. Pages deployment is GREEN.
28. Live Automated QA is GREEN.
29. Multi-Repo Guard is GREEN.
30. A fresh Source Snapshot becomes the next authoritative baseline.

---

## 24. Post-release indexing sequence

After LEARN-LOCALE1 is fully GREEN and the new authoritative snapshot is verified:

1. inspect the priority authority-tool URLs in Google Search Console;
2. request indexing only where Google says the URL is not indexed and no blocking issue exists;
3. inspect `/tools.html`;
4. verify Bing/IndexNow receipt through the existing automation where useful;
5. only then resume the next authority-tool build (currently planned Silver Supply, Demand & Macro Stress Explorer unless the user reprioritizes).

---

## 25. Final product principle

> **A Carrowmont Learn guide should teach one financial idea globally, while presenting amounts and terminology in a way that feels native to the visitor's selected country and currency.**

The user should never have to manually hunt through dozens of Learn pages to find hard-coded regional assumptions. The repository-wide localization contract and QA scanner must do that job permanently.

---

**End of final specification — LEARN-LOCALE1 Global Learn Content Localization**
