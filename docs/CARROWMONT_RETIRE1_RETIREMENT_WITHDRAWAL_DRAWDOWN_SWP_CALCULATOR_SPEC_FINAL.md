# CARROWMONT RETIRE1 — RETIREMENT WITHDRAWAL / DRAWDOWN / SWP CALCULATOR

## Final Product, Calculation, Localization, SEO, Footer Architecture, Reporting, QA & Release Specification

**Status:** FINAL — specification-only approval gate; production code must not be changed by this document  
**Authoritative baseline:** Carrowmont Source Snapshot 79  
**Snapshot generated:** 2026-10-17T14:41:43Z  
**Main-site baseline commit:** `f5bb2f381f959d26cea7fed273d133a67a806ae0`  
**Retirement Calculator baseline commit:** `b9acd0be830439de499eb9c257a9bfc2247b9a6d`  
**Central QA baseline commit:** `5832ed5067b6c4d4917b700a401ea704d5464e1b`  
**Specification date:** 17 October 2026  

---

# 1. Executive decision

Build the next Carrowmont decision tool as a dedicated **Retirement Withdrawal / Drawdown / SWP Calculator**.

The tool should answer a simple post-accumulation question that the existing Retirement Planner only partially answers:

> **I already have a retirement portfolio. If I withdraw a regular amount and the remaining money earns a stated return, how long could the portfolio last?**

The tool must also support the reverse question:

> **Given a starting portfolio and a target retirement horizon, what regular starting withdrawal could the model support under the assumptions I choose?**

This is a **separate decision tool**, not a replacement for the current Retirement Planner and not an extension that makes the existing planner harder to use.

RETIRE1 belongs inside the existing `retirement-calculator` product family and repository. It does **not** require a new GitHub repository.

---

# 2. Why this is the next tool

Carrowmont now has strong accumulation and planning coverage:

- SIP / Recurring Investment Calculator;
- Goal Planner;
- Financial Independence Planner;
- Inflation Calculator;
- Retirement Planner;
- Budget & Cash Flow Planner;
- Mortgage / Home Loan Payoff;
- Compound Interest Calculator;
- Loan / EMI Calculator;
- Debt Payoff Calculator;
- Rent vs Buy Calculator;
- Mortgage Decision Centre companion modules;
- 4% Rule Stress Test and related retirement Learn content.

The remaining retirement gap is decumulation in plain language: a user has a portfolio **today** and wants to understand the relationship between withdrawals, inflation, investment return and time.

The existing Retirement Planner is intentionally broader. It models changing expenses, retirement income, one-time goals, accumulation before retirement and a required corpus. RETIRE1 must remain focused enough that a user can answer the runway question in seconds.

The existing Learn article:

`/how-long-will-retirement-savings-last.html`

already owns the educational question and is a natural discovery path into this calculator.

---

# 3. Product identity and terminology

## 3.1 Internal product identity

Internal codename:

`RETIRE1`

Internal neutral product name:

**Retirement Withdrawal / Drawdown / SWP Calculator**

This internal name may appear in specifications, QA and release metadata. It should not be forced verbatim into every user-facing locale.

## 3.2 Canonical repository and route

Repository:

`Draw004/retirement-calculator`

Canonical production URL:

`https://carrowmont.com/retirement-calculator/withdrawal-calculator.html`

One canonical URL must serve every country. Do not create separate `/swp-calculator/`, `/pension-drawdown-calculator/` or country-specific duplicates.

## 3.3 Search-facing static identity

Recommended HTML title:

**Retirement Withdrawal & Drawdown Calculator | Carrowmont**

Recommended meta description:

**Estimate how long retirement savings may last under regular withdrawals, investment returns and inflation, or calculate a starting withdrawal for a chosen horizon.**

Recommended static H1 fallback:

**See how withdrawals, returns and inflation can change how long retirement savings may last.**

## 3.4 Country-aware visible product labels

The visible product label must follow Carrowmont's established rule: **universal calculation engine, country-relevant terminology**.

Recommended labels:

- **India:** `Retirement SWP / Withdrawal Calculator`
- **United States:** `Retirement Withdrawal Calculator`
- **Canada:** `Retirement Withdrawal Calculator`
- **United Kingdom:** `Retirement Drawdown Calculator`
- **Ireland:** `Retirement Drawdown Calculator`
- **Australia:** `Retirement Withdrawal Calculator`
- **New Zealand:** `Retirement Withdrawal Calculator`
- **Other / International:** `Retirement Withdrawal & Drawdown Calculator`

The India label may use **SWP** because the term is familiar in the market, but the interface must clearly explain that Carrowmont models a generic invested portfolio and does not model a particular mutual-fund scheme, NAV path, units, exit load or tax rule.

For the UK/Ireland, **drawdown** is familiar terminology, but RETIRE1 must not claim to model pension-provider rules, tax-free cash, access-age rules or tax treatment.

For Australia/New Zealand, avoid implying that the calculator applies statutory account-based-pension minimum drawdown rules unless such rules are separately implemented and maintained from authoritative sources.

---

# 4. Product boundary with the existing Retirement Planner

The existing Retirement Planner answers:

- What might retirement spending look like?
- How much might I need at retirement?
- What might I have by retirement?
- What contribution could close the gap?
- How might the portfolio behave during retirement under the planner assumptions?

RETIRE1 answers:

- I have a starting balance now. How long could it last if I withdraw X?
- What starting regular withdrawal could a balance support for Y years?
- How does inflation-linked spending change the runway?
- How sensitive is the runway to a different constant return assumption?

Do not copy the Retirement Planner's full expense-by-expense system, pre-retirement accumulation model or one-time-goal architecture into RETIRE1.

A user who needs those broader questions should be linked back to the Retirement Planner.

---

# 5. V1 solve modes

RETIRE1 V1 should expose two primary modes.

## 5.1 Mode A — How long could my savings last?

Primary question:

> If I start with this portfolio and withdraw this amount regularly, when does the modelled balance reach zero?

Required inputs:

- starting retirement portfolio;
- starting regular withdrawal;
- expected annual portfolio return, net of investment fees if the user chooses to reflect fees there;
- withdrawal inflation / annual increase assumption;
- withdrawal treatment: fixed amount or increase with inflation;
- optional starting age.

Primary result:

- modelled runway in years and months;
- if starting age is provided, approximate age when the balance is depleted;
- if the balance survives the maximum model horizon, state that it lasts **through the model horizon**, never "forever".

## 5.2 Mode B — What starting withdrawal could this portfolio support?

Primary question:

> If I want this portfolio to last for a selected period, what starting monthly withdrawal produces the selected ending-balance target under these assumptions?

Required inputs:

- starting retirement portfolio;
- target duration in years, or target age when a starting age is provided;
- expected annual portfolio return;
- withdrawal inflation / annual increase assumption;
- fixed or inflation-linked withdrawal treatment;
- target ending balance, default `0`;
- optional starting age.

Primary result:

- modelled starting monthly withdrawal;
- modelled first-year annual withdrawal;
- first-year withdrawal rate;
- target duration / target age;
- target ending balance.

The reverse solve must use the same deterministic month-by-month engine as Mode A. Do not create a separate simplified formula that can diverge from the forward model.

---

# 6. Simple Mode and Advanced assumptions

## 6.1 Simple Mode

Simple Mode should remain visually compact.

For Mode A, show:

1. Starting retirement savings
2. Monthly withdrawal
3. Expected annual return
4. Increase withdrawals with inflation? — on/off
5. Inflation rate when enabled
6. Optional starting age

For Mode B, show:

1. Starting retirement savings
2. How long should the savings last? — years or target age
3. Expected annual return
4. Increase withdrawals with inflation? — on/off
5. Inflation rate when enabled
6. Target ending balance — optional, default zero
7. Optional starting age

## 6.2 Advanced assumptions

Advanced settings may expose:

- withdrawal timing: start of month / end of month;
- maximum model horizon where relevant;
- result sensitivity around the selected return;
- exact target age when the user prefers age rather than years.

Do not overload V1 with tax, pension-system, government-benefit or account-product rules.

---

# 7. Core deterministic calculation engine

The calculation engine must be isolated from UI rendering and independently testable.

Recommended file:

`withdrawal-core.js`

All screen results, chart series, table rows, Copy Summary, CSV and PDF must consume the same result object.

No report renderer may recreate the withdrawal mathematics independently.

---

# 8. Monthly calculation convention

RETIRE1 V1 uses a monthly time step for the main engine.

Let:

- `B0` = starting portfolio balance;
- `R` = expected effective annual return as a decimal;
- `rm` = equivalent monthly return;
- `W0` = starting monthly withdrawal;
- `I` = annual withdrawal-increase / inflation assumption as a decimal;
- `m` = month index beginning at 1;
- `Wm` = withdrawal applied in month `m`;
- `Bm` = end-of-month balance.

Equivalent monthly return:

`rm = (1 + R)^(1/12) - 1`

This uses the entered annual return as an effective annual rate. Do not simply divide the annual rate by 12.

The engine must reject any annual return where `1 + R <= 0`.

---

# 9. Withdrawal timing

Default:

**Beginning of month**

Rationale: the withdrawal is treated as money removed to fund the upcoming spending period.

For beginning-of-month timing:

1. subtract the scheduled withdrawal from the opening balance;
2. if the withdrawal exhausts the balance, record depletion during that month and stop;
3. apply monthly return to the remaining balance.

Conceptually:

`afterWithdrawal = B_start - Wm`

`B_end = afterWithdrawal × (1 + rm)`

For optional end-of-month timing:

`afterGrowth = B_start × (1 + rm)`

`B_end = afterGrowth - Wm`

The UI and methodology must disclose the selected timing because timing changes the result slightly.

---

# 10. Fixed versus inflation-linked withdrawals

RETIRE1 must support both common planning treatments.

## 10.1 Fixed nominal withdrawal

The same nominal withdrawal continues every month:

`Wm = W0`

## 10.2 Inflation-linked withdrawal

The starting monthly withdrawal applies for the first 12 months.

On each annual anniversary, increase the withdrawal by the entered annual inflation rate:

`W_year_n = W0 × (1 + I)^n`

where `n = 0` for the first 12 months, `1` for months 13–24, and so on.

The UI must say **Increase withdrawals with inflation** rather than implying that inflation itself is guaranteed.

The annual increase can also model another user-selected spending-growth assumption; it is not an official CPI forecast.

---

# 11. Depletion logic

A portfolio is depleted when the scheduled withdrawal cannot be fully funded from the available balance at the applicable withdrawal point.

The result should preserve month-level precision and display a user-readable duration such as:

`22 years 7 months`

If starting age is 63, the same result may additionally show:

`around age 85 years 7 months`

Do not round a month-level depletion result to a whole year in the headline.

If a tiny floating-point residual remains, use an explicit epsilon and clamp to zero.

Do not show negative ending balances.

---

# 12. Reverse withdrawal solve

Mode B must solve the maximum starting monthly withdrawal that produces the selected target ending balance at the target month under the same forward engine.

Recommended method:

- deterministic bounded binary search;
- monotonic search over the starting monthly withdrawal;
- fixed iteration cap sufficient for cent-level / smallest-currency-unit stability;
- final result rounded only for display, not during intermediate simulation.

The solver must work with:

- positive returns;
- zero returns;
- negative returns within allowed bounds;
- fixed withdrawals;
- inflation-linked withdrawals;
- beginning or end timing;
- non-zero target ending balance.

The implementation must include an independent closed-form or arithmetic fixture for simple zero-return cases so the binary-search path is not self-validating.

---

# 13. Validation and product boundaries

Recommended V1 bounds:

- starting portfolio: greater than 0 and up to 10,000,000,000 selected currency units;
- starting monthly withdrawal: 0 to 1,000,000,000 selected currency units;
- annual return: greater than -100% and no more than +100%;
- default UI validation guidance may use a narrower reasonable range, but the product contract must clearly define the accepted range;
- annual withdrawal increase / inflation: -10% to +30%;
- target duration: 1 month to 100 years;
- starting age: 18 to 100 when used;
- target age: greater than starting age and no more than 120;
- target ending balance: 0 to starting portfolio or greater only when mathematically feasible under selected assumptions.

Negative inflation / spending growth may be allowed to model a declining withdrawal path, but the UI must label it as a user assumption rather than a forecast.

The UI must never display NaN, Infinity, undefined or an empty primary result.

---

# 14. Result hierarchy — Mode A

Primary headline:

**Modelled savings runway**

Show:

- years and months until depletion, or through-horizon survival;
- approximate depletion age when starting age is entered.

Primary cards:

1. Modelled runway
2. Starting monthly withdrawal
3. First-year withdrawal rate
4. Total modelled withdrawals through depletion / horizon

Secondary cards:

- ending balance at a selected checkpoint / horizon;
- first-year annual withdrawal;
- selected annual return;
- selected withdrawal inflation rate;
- fixed vs inflation-linked status;
- beginning vs end timing.

If the portfolio never depletes within the 100-year maximum model horizon, do not claim sustainability forever. Say:

**The balance remains above zero through the 100-year model horizon under these constant assumptions.**

---

# 15. Result hierarchy — Mode B

Primary headline:

**Modelled starting withdrawal**

Show:

- monthly starting withdrawal;
- first-year annual withdrawal;
- first-year withdrawal rate;
- target horizon / target age;
- target ending balance.

Supporting explanation:

> This is the starting withdrawal produced by the selected constant-return and withdrawal-growth assumptions. It is not a guaranteed safe withdrawal rate.

Do not use the phrase **safe withdrawal** as a result label.

---

# 16. Return sensitivity

RETIRE1 should make assumption risk visible without pretending to forecast markets.

After the base result, show a compact deterministic sensitivity comparison using the same engine at:

- selected return minus 2 percentage points;
- selected return;
- selected return plus 2 percentage points.

Clamp the sensitivity cases to the valid product range.

For Mode A, compare runways / ending balances.

For Mode B, compare starting withdrawals that meet the same horizon.

Required label:

**Return sensitivity — not a forecast**

Do not introduce Monte Carlo simulation in V1.

The separate 4% Rule Stress Test remains the Carrowmont tool for deterministic sequence-of-returns stress scenarios.

---

# 17. Chart and annual table

## 17.1 Primary chart

Provide a responsive balance-over-time chart.

Required series:

- retirement portfolio balance;
- optional annual withdrawal amount as a secondary visual only if it remains readable.

The chart must clearly mark depletion when it occurs.

No essential information may be hover-only.

## 17.2 Annual table

Provide a year-by-year table with at least:

- year number;
- age when available;
- opening balance;
- total withdrawals during the year;
- modelled investment change;
- ending balance.

For inflation-linked withdrawals, the table should make the annual withdrawal step-up visible.

Long runs may show a bounded preview on screen while CSV/PDF contains the full annual schedule within practical output limits.

---

# 18. Plain-language explanation

RETIRE1 must explain three concepts without jargon:

1. **Withdrawals reduce the amount left invested.**
2. **Returns act on the remaining balance, not the original balance forever.**
3. **If withdrawals rise with inflation, the portfolio has to support a larger cash amount later.**

A simple sentence should appear near the result:

> A longer modelled runway does not mean the result is guaranteed. Real investment returns vary from year to year, and the order of returns can matter.

Link the phrase about order of returns to the existing sequence-risk / 4% Rule educational content.

---

# 19. Country and currency behavior

Reuse the current Carrowmont locale controller and country/currency list.

Country and currency remain separate concepts.

Changing currency changes:

- symbol;
- ISO code where shown;
- number formatting;
- monetary input/output units.

Changing currency does **not** perform FX conversion and does not automatically change return, inflation, taxes or pension rules.

Changing country may change:

- product label;
- helper text;
- familiar terminology;
- examples;
- contextual links.

The underlying mathematics must not change by country unless a future separately approved feature genuinely implements an authoritative local rule.

---

# 20. India / SWP terminology boundary

When India is selected, the tool may visibly use **SWP** alongside **withdrawal**.

Required clarification:

> Carrowmont models a generic invested portfolio and regular withdrawals. It does not model a specific mutual-fund scheme, NAV history, unit redemptions, exit loads or tax treatment.

Do not imply that the entered annual return is a mutual-fund guarantee.

Do not fetch live fund performance.

---

# 21. UK / Ireland drawdown terminology boundary

When the UK or Ireland is selected, the UI may use **drawdown** terminology.

Required clarification:

> This calculator illustrates portfolio withdrawals under user-entered assumptions. It does not calculate pension tax, provider charges, tax-free cash, access eligibility or statutory pension rules.

Do not present the result as regulated pension advice.

---

# 22. Australia / New Zealand terminology boundary

Use familiar retirement-withdrawal language without claiming compliance with account-based-pension, superannuation or KiwiSaver withdrawal rules.

Do not automatically apply minimum withdrawal percentages, preservation/access ages, government pension rules or tax treatment in V1.

If such rules are ever added, they require an authoritative-data maintenance plan and separate specification.

---

# 23. Privacy and analytics

RETIRE1 must preserve the Privacy & Analytics Trust V2 contract from Snapshot 79.

Requirements:

- calculator values remain client-side;
- no financial values in query strings;
- no financial values in analytics event fields;
- Google Analytics remains opt-in only;
- analytics-bound page location/referrer remains path-only;
- any cross-tool handoff uses the same-origin shared-plan/session mechanism, not URL financial parameters;
- no login required;
- no server-side storage in V1.

Permitted analytics should be limited to non-financial interaction events such as tool open, mode selection, calculate, report generation and contextual navigation.

---

# 24. Shared-plan handoff from Retirement Planner

The current Retirement Planner should gain a contextual action such as:

**Test how long this retirement balance may last →**

Compatible staged values may include:

- country;
- currency;
- retirement age / starting age;
- projected corpus or required corpus — but never silently choose between them;
- first-year portfolio-funded monthly need when semantically available;
- retirement return assumption;
- inflation assumption.

The receiving RETIRE1 page must display an import/review panel explaining which values came from the Retirement Planner.

The user must be able to edit or reject them.

If both projected corpus and required corpus are available, the sender or receiver must make the distinction explicit, for example:

- **Use my projected savings at retirement**
- **Use the modelled retirement target**

Do not silently substitute one for the other.

---

# 25. Connections back into the Carrowmont ecosystem

RETIRE1 should provide contextual next steps rather than generic promotion.

Required paths:

- **Need to build the retirement target first?** → Retirement Planner
- **Want to test poor early market returns?** → 4% Rule Stress Test
- **Understand sequence risk** → Sequence of Returns Risk Learn page
- **How long will retirement savings last?** → existing Learn guide
- **How much money do I need to retire?** → existing Learn guide
- **Inflation and retirement planning** → existing Learn guide

Future optional connection:

- Financial Independence planner/result → RETIRE1 once the semantic handoff is separately verified.

---

# 26. Learn and search-intent ownership

## 26.1 Calculator intent

RETIRE1 should own high-intent interactive query families such as:

- retirement withdrawal calculator;
- retirement drawdown calculator;
- retirement savings withdrawal calculator;
- how long will retirement savings last calculator;
- retirement income withdrawal calculator;
- SWP calculator in India-facing terminology;
- systematic withdrawal calculator in India-facing supporting copy.

## 26.2 Existing Learn intent

Keep `/how-long-will-retirement-savings-last.html` as the explanatory guide.

The Learn page should explain the concept and link prominently to RETIRE1.

The calculator should provide the interactive answer and link back to the guide for explanation.

Do not rewrite both pages to target identical titles/H1s.

## 26.3 Additional contextual Learn links

Review:

- `/sequence-of-returns-risk.html`
- `/4-percent-rule-retirement.html`
- `/retirement-monthly-income-needed.html`
- `/retirement-expenses.html`
- `/longevity-risk-retirement.html`

Add links only where they are genuinely useful. Avoid sitewide keyword-stuffed anchors.

---

# 27. Tools Hub integration

Add RETIRE1 to `/tools.html` after launch.

Recommended category:

**Investing & Retirement Income**

If the current Tools Hub taxonomy does not yet render that category, add it only because RETIRE1 is live; do not publish empty future categories.

Suggested neutral card title:

**Retirement Withdrawal & Drawdown Calculator**

Suggested description:

**Estimate how long a retirement portfolio may last under regular withdrawals, returns and inflation, or solve for a starting withdrawal over a chosen horizon.**

The Tools Hub card may localize its title using the established country controller.

---

# 28. Homepage integration

RETIRE1 is a **retirement-family decision tool**, not a new primary homepage core card in V1.

The existing Retirement Planner remains the homepage gateway for retirement.

RETIRE1 should be discovered from:

- Retirement Planner;
- Tools Hub;
- retirement Learn content;
- 4% Rule Stress Test / sequence-risk content;
- contextual result links.

This avoids making the homepage core grid grow indefinitely while still giving the new tool strong crawlable internal discovery.

---

# 29. Permanent compact-footer architecture

The RETIRE1 implementation release should also establish the permanent footer rule requested after CORE9.

## 29.1 Problem

The current footer lists every primary calculator individually. As the toolkit grows, the Tools column becomes progressively taller and visually heavier.

The footer must stop behaving as a complete product catalogue.

## 29.2 Permanent rule

**Do not automatically add new calculators to the footer.**

The complete catalogue belongs on `/tools.html`.

The footer should contain a fixed set of high-value gateway links only.

## 29.3 Recommended Tools-column structure

Maximum five links:

1. **All financial tools** → `/tools.html`
2. **SIP Calculator** in India / **Recurring Investment Calculator** elsewhere → `/sip-calculator/`
3. **Retirement Planner** → `/retirement-calculator/`
4. Locale-aware housing gateway → `/mortgage-payoff-calculator/`
5. **Budget & Cash Flow Planner** → `/budget-cash-flow-planner/`

No Compound Interest, Loan/EMI, Debt Payoff, Rent vs Buy, RETIRE1 or future individual tool should be appended beneath these links.

## 29.4 Locale-aware housing footer label

The footer must use a short gateway label, not the full product title.

Recommended labels:

- India: **Home Loan**
- United States: **Mortgage**
- Canada: **Mortgage**
- United Kingdom: **Mortgage**
- Ireland: **Mortgage**
- Australia: **Home Loan**
- New Zealand: **Home Loan**
- Other / International: **Mortgage & Home Loan**

This short label is a navigation gateway. The full calculator page can retain its more precise localized title.

## 29.5 Footer SEO rule

Reducing the footer list must not orphan tools.

Every live calculator must remain discoverable through:

- `/tools.html`;
- relevant contextual tool-to-tool links;
- relevant Learn pages;
- sitemap;
- homepage or family gateway where appropriate.

The footer is not the sitemap.

---

# 30. Copy Summary

Copy Summary is required.

Mode A summary should include:

- locale/currency;
- starting portfolio;
- starting monthly withdrawal;
- fixed or inflation-linked withdrawal treatment;
- annual return assumption;
- inflation / annual withdrawal increase assumption;
- withdrawal timing;
- modelled runway;
- depletion age when available;
- total modelled withdrawals;
- clear educational disclaimer.

Mode B summary should include:

- starting portfolio;
- target duration / age;
- target ending balance;
- modelled starting monthly withdrawal;
- first-year withdrawal rate;
- return and inflation assumptions;
- timing;
- disclaimer.

Copy Summary must never include hidden analytics identifiers or unnecessary personal information.

---

# 31. CSV export

Provide a CSV export of the annual schedule.

Recommended columns:

- Year
- Age if available
- Opening balance
- Total withdrawals
- Modelled investment change
- Ending balance
- Starting monthly withdrawal for that year

CSV values must reconcile with screen and PDF results from the same result object.

---

# 32. PDF report

A Carrowmont-standard downloadable PDF is required.

Recommended structure:

## Page 1 — Retirement withdrawal summary

- localized product identity;
- selected mode;
- starting portfolio;
- withdrawal or solved withdrawal;
- modelled runway / horizon;
- first-year withdrawal rate;
- key assumptions.

## Page 2 — Balance path and sensitivity

- balance-over-time chart;
- base result;
- return sensitivity comparison;
- visible statement that sensitivity is not a forecast.

## Page 3 — Annual withdrawal schedule

- opening balance;
- withdrawals;
- investment change;
- ending balance;
- continuation page(s) when needed.

## Page 4 — Methodology, boundaries and next steps

- monthly effective-return conversion;
- withdrawal timing;
- inflation-linked withdrawal rule;
- taxes/pension rules not modeled;
- sequence-of-returns limitation;
- relevant Carrowmont next tools/guides.

Report calculations must not be recreated in the renderer.

---

# 33. Structured data and SEO contract

Required:

- one canonical URL;
- one H1;
- unique title and meta description;
- valid calculator/WebApplication structured data where consistent with current Carrowmont standards;
- Breadcrumb structured data only if accurate;
- sitemap inclusion with accurate `lastmod`;
- IndexNow coverage through the current sitemap-change workflow;
- crawlable links from Tools Hub and relevant retirement pages;
- no `noindex`;
- no country duplicate URLs;
- no financial values in canonical URLs or internal links.

Do not add FAQ structured data merely because an FAQ is visible unless it remains appropriate under current search-engine guidance.

---

# 34. Accessibility and responsive behavior

Required at minimum:

- desktop;
- tablet;
- 390 px;
- 360 px;
- no page-level horizontal scrolling;
- 16 px minimum input text on mobile;
- keyboard-operable mode switch and controls;
- visible focus states;
- semantic labels;
- chart information available without hover;
- table horizontally scrollable locally if necessary rather than expanding the page;
- errors associated with relevant controls;
- result changes announced appropriately without excessive screen-reader noise.

The header must match the shared Carrowmont header geometry established after the CORE8/CORE9 alignment release.

---

# 35. Deterministic fixture contract

Independent fixtures must include at least:

1. zero-return fixed withdrawal;
2. zero-return inflation-linked withdrawal;
3. positive-return fixed withdrawal;
4. positive-return inflation-linked withdrawal;
5. negative-return withdrawal;
6. exact depletion on a month boundary;
7. depletion during the first month;
8. portfolio survives the maximum horizon;
9. beginning-of-month versus end-of-month timing;
10. Mode B zero-return reverse solve;
11. Mode B positive-return reverse solve;
12. non-zero target ending balance;
13. target age conversion to months;
14. return sensitivity lower/base/upper cases;
15. rounding and epsilon behavior near zero.

At least one zero-return fixture must be verified by simple arithmetic independently of the production simulation.

---

# 36. Browser QA contract

Dedicated RETIRE1 browser QA should cover at minimum:

- canonical live route returns 200;
- page title/meta/H1;
- default mode calculation;
- reverse mode calculation;
- fixed withdrawal behavior;
- inflation-linked behavior;
- return sensitivity;
- beginning/end timing;
- country terminology for India, US, UK, Australia and Other/International;
- currency switching without FX conversion;
- chart rendering;
- annual table;
- Copy Summary;
- CSV export;
- PDF generation;
- Retirement Planner handoff review/confirm behavior;
- link to 4% Rule Stress Test;
- link to existing Learn article;
- 1280 px layout;
- 390 px layout;
- 360 px layout;
- no JavaScript console errors;
- privacy analytics isolation;
- financial inputs absent from URL query strings;
- compact-footer structure and locale-aware labels.

---

# 37. Source-contract protection

Central source-contract checks should enforce:

- canonical RETIRE1 path exists;
- sitemap contains it;
- Tools Hub contains it;
- Retirement Planner contains a contextual path to it;
- existing Learn article links to it;
- no financial-value query-string handoff;
- required isolated core engine file exists;
- required report/CSV surfaces exist;
- footer contains no more than the approved fixed gateway set on controlled surfaces;
- new tool is **not** automatically appended to footer;
- locale-aware footer housing label contract exists;
- Privacy V2 analytics allow-list remains intact;
- no workflow-file changes unless separately approved.

---

# 38. Production repository scope

Expected implementation repositories:

1. `retirement-calculator`
2. `draw004.github.io`
3. `carrowmont-qa`

Additional repositories should be changed only if the sitewide compact-footer implementation genuinely requires a shared runtime file in those repositories and that dependency cannot be implemented safely through existing shared behavior.

Do **not** modify unrelated calculator mathematics merely to advertise RETIRE1.

If the footer needs coordinated changes across multiple core tool repositories, those changes must be presentation/navigation-only and explicitly listed in the implementation manifest.

---

# 39. Expected retirement-calculator changes

Likely new files:

- `withdrawal-calculator.html`
- `withdrawal-calculator.css`
- `withdrawal-calculator.js`
- `withdrawal-core.js`
- `withdrawal-pdf-renderer.js`

Likely existing files touched:

- `planner.html` for contextual handoff;
- shared-plan bridge/state only if a schema addition is genuinely required;
- `sitemap.xml`;
- possibly locale/site files for product terminology and compact-footer behavior;
- report standard only if the decision tool is added to retirement-family continuation links without expanding every core report registry.

Keep the main Retirement Planner calculation engine unchanged unless a semantic handoff requires a small isolated sender addition.

---

# 40. Expected main-site changes

Likely:

- `/tools.html` card/category addition;
- `/how-long-will-retirement-savings-last.html` calculator CTA/link;
- contextual links from selected retirement Learn pages;
- sitemap if any main-site page is newly created — no new root calculator page is expected;
- sitewide compact-footer logic / markup;
- locale-aware short housing gateway label;
- no homepage core-card addition.

Do not change unrelated SEO titles, canonicals or Learn content.

---

# 41. Expected QA changes

Add a dedicated test file such as:

`tests/32-retirement-withdrawal-drawdown.spec.js`

Update:

- `qa.config.js` for the new live route if required;
- `tests/01-smoke.spec.js` only when the central smoke registry requires it;
- `tests/02-layout.spec.js` only for shared geometry/footer rules;
- `tests/06-links.spec.js` if route coverage is centralized there;
- `scripts/source-contract.mjs`;
- calculation fixtures/helpers only when shared independent arithmetic is useful.

Central QA remains last in the merge order.

---

# 42. Release process

Use the established disposable-branch Publisher workflow.

Required sequence:

1. Merge this specification-only release.
2. Run validation appropriate to a docs-only change.
3. Take a **fresh Source Snapshot** after the specification is merged.
4. Use that newer snapshot as the production coding baseline.
5. Prepare the smallest reviewed implementation bundle.
6. Rehearse source contract in normal, Publisher and Multi-Repo Guard layouts.
7. Run deterministic fixtures and JavaScript syntax checks before handoff.
8. Stage the exact implementation ZIP on a disposable branch.
9. Run Carrowmont Batch PR Publisher with `CREATE_PRS`.
10. Do not merge any generated PR unless Publisher is green.
11. Merge product/main repositories in dependency order; `carrowmont-qa` last.
12. Confirm Pages.
13. Run live Automated QA.
14. Run Multi-Repo Guard.
15. Take a fresh Source Snapshot.
16. Perform Google/Bing indexing steps for the new canonical route and materially changed discovery pages.

Do not merge the staging branch itself.

---

# 43. Specification-only release scope

This document itself is a specification-only release.

Expected Publisher output for this specification release:

**1 PR** in `draw004.github.io` containing only:

`docs/CARROWMONT_RETIRE1_RETIREMENT_WITHDRAWAL_DRAWDOWN_SWP_CALCULATOR_SPEC_FINAL.md`

No calculator code, footer code, sitemap, Learn page or QA file is changed by the specification-only release.

Merging the specification PR constitutes approval of RETIRE1 V1 and the permanent compact-footer direction described here.

---

# 44. Out of scope for RETIRE1 V1

- Monte Carlo simulation;
- stochastic market-return generation;
- automatic historical backtesting;
- tax calculation;
- required minimum distributions;
- pension-access-age enforcement;
- UK pension tax-free-cash logic;
- Australian account-based-pension minimum drawdown rules;
- Age Pension / Social Security / CPP / OAS / State Pension entitlement calculation;
- annuity quotes or comparisons;
- mutual-fund scheme recommendations;
- live NAV/fund performance;
- exit-load calculation;
- automatic Indian capital-gains tax calculation;
- advisor recommendations;
- guaranteed sustainable/safe withdrawal claim;
- user accounts or cloud saving;
- new homepage core card;
- country-specific duplicate calculator URLs;
- new workflow files;
- changing existing Retirement Planner mathematics.

---

# 45. Acceptance criteria

RETIRE1 V1 is complete only when:

1. the canonical route is live and indexable;
2. Mode A produces deterministic month-precise runway results;
3. Mode B reverse-solves against the same forward engine;
4. fixed and inflation-linked withdrawal treatments work;
5. beginning/end timing works if exposed;
6. zero/positive/negative return fixtures pass;
7. country terminology follows the approved locale map;
8. currency switching performs no FX conversion;
9. screen, table, CSV, Copy Summary and PDF reconcile;
10. Retirement Planner handoff is explicit and reviewable;
11. financial values do not enter analytics or query strings;
12. Tools Hub and Learn discovery paths are crawlable;
13. no homepage core-card growth is introduced;
14. footer Tools column is converted to the approved fixed gateway architecture during implementation;
15. new tools are not appended to the footer;
16. desktop, 390 px and 360 px QA pass;
17. central source contract passes;
18. Publisher staged browser QA passes;
19. live Automated QA passes;
20. Multi-Repo Guard passes;
21. a fresh clean Source Snapshot is taken after release.

---

# 46. Product principle

RETIRE1 should make a difficult retirement question understandable without pretending the future is predictable.

The user should be able to see, in plain language:

> **Starting balance + withdrawals + withdrawal increases + return assumption + time = a modelled retirement-savings runway.**

Carrowmont should show the mechanics, the sensitivity and the limitations — not declare a guaranteed safe spending level.

---

# 47. External research notes used for specification direction

The product direction was checked against current public calculator patterns on 17 October 2026. These references inform terminology and UX boundaries; they are not copied calculation engines.

- Hargreaves Lansdown — Pension Drawdown Calculator: familiar UK drawdown terminology and clear warnings that drawdown outcomes depend on growth, withdrawals and longevity.
- Australian Government Moneysmart — Account-based pension calculator: explicitly models how long a retirement account may last and shows the importance of returns, fees and inflation while making local statutory assumptions visible.
- Groww — SWP Calculator: confirms strong India-facing use of SWP / systematic withdrawal terminology around lump-sum portfolios and regular monthly withdrawals.
- HDFC Mutual Fund — SWP Calculator: similarly frames SWP around starting investment, regular withdrawals, expected return and remaining value.

Carrowmont must remain more jurisdiction-neutral than product-provider calculators by keeping local legal/tax/product rules out of V1 unless they are explicitly implemented from maintainable authoritative sources.
