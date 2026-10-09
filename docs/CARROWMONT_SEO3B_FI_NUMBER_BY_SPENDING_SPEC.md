# CARROWMONT SEO3B — FINANCIAL INDEPENDENCE NUMBER BY SPENDING

## Product & Implementation Specification

**Baseline:** Carrowmont Source Snapshot 26  
**Snapshot generated:** 9 October 2026  
**Main-site commit:** `98fc565d57a2b4b7f1899826225cd69701a2a747`  
**Financial Independence commit:** `f0abbb8c3be6cf511dabc700713a6300c9b13c84`  
**Central QA commit:** `d502cef34c23d76428df73f40701bf6fd9e3d8b8`  
**Status:** Build specification — production code is not changed by this document.

---

# 1. Purpose

SEO3B will create a public, link-worthy Carrowmont reference asset that answers a common Financial Independence question quickly:

> **How much invested money might I need for a given level of spending?**

The asset should let a visitor enter the amount of spending that must be funded by a portfolio and immediately see a first-pass Financial Independence (FI) number under a selected planning withdrawal-rate assumption.

It is intentionally simpler than the full Financial Independence Planner. It estimates the **target**; the existing FI Planner remains the product for modelling current assets, recurring contributions, target age, investment growth and a path toward that target.

The asset must be educational, transparent, deterministic, country/currency aware, mobile friendly and usable without login.

---

# 2. SEO3 strategy role

SEO3B is the second link-worthy authority asset in the SEO3 plan, after the 4% Rule Stress Test.

It should strengthen the existing Carrowmont Financial Independence cluster around queries such as:

- financial independence number;
- what is my financial independence number;
- FI number by spending;
- how much money do I need for financial independence;
- 25x expenses rule;
- annual expenses to FI number;
- monthly spending to FI target.

The page should be useful enough to be cited or linked as a reference, not merely exist as another keyword-targeted article.

---

# 3. Canonical route and search presentation

## 3.1 Canonical URL

`https://carrowmont.com/financial-independence-number-by-spending.html`

The URL should remain stable after publication.

## 3.2 Recommended title

**Financial Independence Number by Spending | Carrowmont**

Target: keep the final HTML title at or below approximately 60 characters.

## 3.3 Recommended meta description

**Estimate a first-pass financial independence number from monthly or annual portfolio-funded spending, compare withdrawal-rate assumptions and see inflation effects.**

Target: approximately 110–160 characters.

## 3.4 H1

**See how spending changes your financial independence number**

## 3.5 Structured data

Use a `WebApplication` schema matching the established Carrowmont calculator/interactive-asset pattern.

Do not use structured data to imply investment advice, guaranteed outcomes or a universally safe withdrawal rate.

---

# 4. Product positioning

The page should make the distinction below explicit near the top:

> **This tool estimates a spending-based FI target. It does not tell you when you will reach FI. Use the full Financial Independence Planner to model your current assets, future investments and target age.**

The asset should not duplicate the entire FI Planner.

### SEO3B answers

- What is the approximate FI number implied by my spending?
- How does that target change if spending changes?
- How does the target change under different withdrawal-rate assumptions?
- How might inflation change the future nominal target if FI is years away?

### Full FI Planner answers

- What is my projected portfolio at a target age?
- What recurring investment may be required?
- What age does the model first reach the selected target?
- How do existing assets, contribution frequency, return and step-up assumptions affect the path?

---

# 5. Calculation source of truth

SEO3B must use the same sustainable-FI mathematical convention already used by the current `financial-independence/core.js`.

The current FI Planner defines the spending-based target as:

```text
Annual portfolio-funded spending
-------------------------------- = FI target in today's money
Planning withdrawal rate
```

For SEO3B, the visitor directly supplies **portfolio-funded spending**, so the asset does not need to recreate the full planner's total-spending / spending-percentage / other-income model.

This keeps the quick-reference asset simple while preserving mathematical consistency with the full FI Planner.

---

# 6. Inputs

## 6.1 Spending view

Use a two-option segmented control:

- **Monthly**
- **Annual**

Default: **Monthly**.

The chosen view changes input/display convenience only. Internally all calculations normalize to annual portfolio-funded spending.

## 6.2 Portfolio-funded spending

Label:

**Spending the portfolio needs to fund**

Help text:

> Enter the part of your lifestyle spending that would need to come from the investment portfolio. If dependable income will cover part of your expenses, subtract that amount first.

Default baseline for India: `100000` per month, matching the current FI Planner's general spending example.

Changing currency changes the unit and number format only; it does not perform FX conversion.

Validation:

- minimum: 0;
- no negative values;
- finite numeric input only;
- zero is allowed and should produce an FI number of zero.

## 6.3 Planning withdrawal rate

Label:

**Planning withdrawal rate**

Default: **4.0%**.

Recommended input range:

- minimum: 2.0%;
- maximum: 8.0%;
- step: 0.1%.

Required help text:

> This is a planning assumption, not a guaranteed or universally safe withdrawal rate. A lower rate produces a larger target; a higher rate produces a smaller target.

Do not label this field `safe withdrawal rate`.

## 6.4 Years until FI

Label:

**Years until you want the target expressed**

Default: **0 years**.

Recommended range:

- 0–60 years;
- integer step 1.

Purpose: let the user distinguish a target in today's money from a future nominal target.

If `0`, future-money output equals today's-money output and the interface should avoid implying a separate inflation effect.

## 6.5 Inflation assumption

Label:

**Annual inflation assumption**

Default: **5.0%**.

Recommended range:

- 0–25%;
- step 0.1%.

This input affects only the optional future nominal spending/target display. It does not change the today's-money FI number.

---

# 7. Exact formulas

Let:

- `S` = entered spending amount;
- `view` = monthly or annual;
- `r` = withdrawal-rate assumption as a decimal;
- `i` = inflation assumption as a decimal;
- `y` = years until FI.

## 7.1 Annual spending today

```text
If Monthly:
annualSpendingToday = S × 12

If Annual:
annualSpendingToday = S
```

## 7.2 FI number in today's money

```text
fiToday = annualSpendingToday / r
```

If annual spending is zero, `fiToday = 0`.

## 7.3 FI multiple

```text
fiMultiple = 1 / r
```

Examples:

| Withdrawal-rate assumption | Approximate spending multiple |
|---:|---:|
| 5.0% | 20.0× |
| 4.0% | 25.0× |
| 3.5% | 28.57× |
| 3.0% | 33.33× |

These are mathematical consequences of the selected rate, not recommendations.

## 7.4 Future annual spending

```text
futureAnnualSpending = annualSpendingToday × (1 + i)^y
```

## 7.5 Future nominal FI target

```text
fiFuture = futureAnnualSpending / r
```

This is a nominal future-money illustration using a constant inflation assumption. It is not a forecast.

---

# 8. Core outputs

## 8.1 Primary summary cards

Show four cards:

1. **Portfolio-funded spending** — annual equivalent;
2. **FI number today** — selected withdrawal-rate assumption;
3. **Spending multiple** — e.g. `25× annual spending`;
4. **Future FI number** — displayed only when years until FI > 0, otherwise show a concise inflation note rather than duplicate the same number.

On mobile, cards stack cleanly with no horizontal overflow.

## 8.2 Primary interpretation sentence

Generate one deterministic sentence such as:

> At a 4.0% planning withdrawal rate, ₹12.0 L of annual portfolio-funded spending corresponds to a first-pass FI number of about ₹3.0 Cr in today's money.

If years until FI > 0, append:

> At 5.0% assumed inflation for 10 years, that spending would be about ₹19.5 L a year in future nominal money, corresponding to about ₹4.9 Cr at the same withdrawal-rate assumption.

All numbers must come from the deterministic engine.

---

# 9. Withdrawal-rate comparison

Always show a comparison table for:

- 3.0%
- 3.5%
- 4.0%
- 5.0%

If the user's selected rate is not one of those four, add a fifth row labelled **Your selected rate**.

Columns:

1. Planning withdrawal rate
2. Spending multiple
3. FI number today
4. FI number in future money (only when years > 0)

The comparison must not visually label any one rate as `best`, `safe`, `recommended`, `conservative` or `aggressive`.

A concise note below the table should say:

> The rate is an assumption about how much of the starting portfolio is represented by first-year spending. Lower rates mechanically create larger first-pass targets. Real-world sustainability depends on market returns, inflation, taxes, fees, spending flexibility and time horizon.

Link to the **4% Rule Stress Test** for sequence-risk exploration.

---

# 10. Spending sensitivity model

SEO3B should show how the FI target moves when portfolio-funded spending changes while the selected withdrawal-rate assumption remains fixed.

Use five deterministic comparison points:

- 80% of entered spending
- 90%
- 100%
- 110%
- 120%

For each point calculate:

- annual portfolio-funded spending;
- FI number today;
- future nominal FI number when years > 0.

The 100% row is the user's baseline and should be visually highlighted.

Required educational insight:

> At a fixed withdrawal-rate assumption, the FI number changes one-for-one with portfolio-funded spending. A 10% change in portfolio-funded spending produces a 10% change in the first-pass FI target.

---

# 11. Chart standard — non-negotiable

SEO3B must not invent a new chart style.

The chart must inherit the established Carrowmont chart standard represented by the existing Financial Independence Planner and the post-release-hardened 4% Rule Stress Test.

## 11.1 Chart purpose

One chart only in V1:

**FI number by annual portfolio-funded spending**

- X-axis: annual portfolio-funded spending at 80%, 90%, 100%, 110%, 120% of baseline;
- Y-axis: FI number in the selected currency;
- one line only: selected withdrawal-rate assumption;
- five plotted markers;
- baseline 100% point visually emphasized without changing the overall visual language.

Avoid unnecessary multi-series complexity.

## 11.2 Typography

Use the same chart font stack:

`Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Required chart text behavior:

- axis labels: approximately 13px, weight 700;
- callout text: approximately 12px, strong but readable;
- `font-variant-numeric: tabular-nums` where practical;
- SVG text must have `stroke: none` and `stroke-width: 0`;
- never inherit global icon/SVG strokes.

## 11.3 Geometry and visual treatment

Canonical treatment:

- white chart plotting surface;
- subtle blue-grey border;
- light grid lines around `#dce7ec`;
- axis lines around `#9fb2bf`;
- primary Carrowmont teal series line;
- line width approximately 4px;
- rounded line joins/caps;
- data markers with a white separating stroke;
- no gradients, 3D effects or decorative chart backgrounds.

## 11.4 Number formatting

Use the shared Carrowmont locale formatter.

- chart axes and callouts: `formatCompactMoney`;
- tables: full locale-aware money formatting unless compact formatting materially improves readability;
- India must use readable Indian compact units such as `₹3 Cr` / `₹12 L` with the established spacing;
- other currencies use their locale conventions;
- never manually concatenate currency symbols with raw numbers when the shared formatter can do it.

## 11.5 Callout rules

The SEO3A live-review lessons are mandatory here from day one.

All permanent chart callouts must:

- measure their rendered text before placement;
- remain fully inside the chart plotting rectangle;
- flip left/right or above/below when close to an edge;
- maintain padding from plot borders;
- avoid covering their own anchor marker;
- avoid overlapping another callout where a valid alternative position exists;
- remain readable on both desktop and mobile;
- never rely on hover as the only way to read a key value.

V1 should permanently label at least:

- 80% spending point;
- 100% baseline point;
- 120% spending point.

The visible comparison table contains all five exact values, so chart labels should remain calm rather than overcrowded.

## 11.6 Chart QA requirement

Before publication, automated QA must compare the SEO3B chart's computed typography/geometry with the canonical Carrowmont chart standard and assert:

- no SVG text stroke;
- expected font family/weight range;
- plot/callout bounding boxes remain inside the SVG;
- no chart callout overlaps its anchor marker;
- no horizontal overflow at desktop or mobile widths;
- compact number formatting matches shared locale behavior.

A visual screenshot review is required before the owner is asked to merge the production PR.

---

# 12. Tables and progressive disclosure

The withdrawal-rate table and five-row spending-sensitivity table are small and should remain visible.

Do **not** create an oversized year-by-year table; SEO3B is a target-reference asset, not a portfolio projection tool.

If an implementation adds deeper explanatory data later, use the same native collapsed `<details>` pattern established in the FI Planner and 4% Rule Stress Test.

---

# 13. Actions and exports

V1 should include:

- **Copy Summary**
- **Download CSV**
- **Open Full FI Planner** (primary CTA)

## 13.1 Copy Summary

Include:

- selected country/currency;
- monthly/annual spending view;
- annual portfolio-funded spending;
- selected withdrawal-rate assumption;
- FI number today;
- years/inflation/future FI number where applicable;
- comparison-rate outputs;
- educational disclaimer.

## 13.2 CSV

CSV should contain:

- selected inputs;
- rate comparison rows;
- spending sensitivity rows;
- today's-money and future-money values;
- clear column headers.

CSV numeric values must be raw numeric values, not preformatted strings, where feasible.

## 13.3 PDF report

SEO3B V1 should include a standardized downloadable PDF rather than defer it and create another visual retrofit later.

Recommended maximum: **4 pages**.

### Page 1 — Your FI Number by Spending

- inputs;
- FI number today;
- selected withdrawal rate;
- spending multiple;
- future-money target when applicable;
- concise interpretation.

### Page 2 — Sensitivity

- withdrawal-rate comparison;
- spending sensitivity chart;
- five-row spending table.

### Page 3 — Guide & Methodology

- exact formulas;
- today's money vs future nominal money;
- limitations;
- no universal safe-rate claim;
- links/references to the FI-number guide and 4% Rule Stress Test methodology.

### Page 4 — Continue Planning with Carrowmont

Use the existing shared Carrowmont report-standard final page and current six-tool registry.

PDF rules:

- use the same report typography/spacing system as existing Carrowmont reports;
- chart labels must follow the same chart rules as the web version;
- all explanation cards must size from wrapped content rather than reserve oversized fixed blocks;
- no sparse trailing page;
- render and visually inspect every page before release.

---

# 14. Country and currency behavior

SEO3B must use the shared Carrowmont country/currency contract.

Required closed pill:

`[globe] Country · ISO currency code [chevron]`

Examples:

- `India · INR`
- `United States · USD`

Currency options use:

`ISO CODE · Currency Name`

Required note:

> **Important:** Changing currency changes the unit and number format. It does not convert entered amounts using an exchange rate.

Changing currency must not alter the mathematical spending amount entered by the user.

---

# 15. Page structure

Recommended order:

1. Standard Carrowmont header + locale control
2. Compact hero
3. Quick input panel
4. Primary FI-number summary
5. Withdrawal-rate comparison
6. Spending sensitivity chart
7. Spending sensitivity table
8. What the number means
9. Today's money vs future money
10. Limitations and why withdrawal rate is an assumption
11. FAQ
12. Sources / preparation note
13. Continue with full FI Planner / 4% Rule Stress Test / related guides
14. Standard Carrowmont footer

The page should remain substantially shorter and simpler than the full FI Planner.

---

# 16. Recommended copy blocks

## 16.1 Hero lede

> Turn portfolio-funded spending into a transparent first-pass FI target, compare common withdrawal-rate assumptions and see how inflation can change the future nominal number.

## 16.2 Important distinction

> This page estimates the target implied by spending. It does not project how quickly your current investments may reach that target.

## 16.3 Why spending matters

> At a fixed withdrawal-rate assumption, the relationship is linear: if portfolio-funded spending rises 10%, the first-pass FI number rises 10%. Reducing recurring spending has the same proportional effect in the other direction.

## 16.4 Educational disclaimer

> These outputs are deterministic illustrations for financial-planning education. They are not forecasts, guarantees or individualized investment, tax or legal advice.

---

# 17. FAQ topics

Include concise answers to:

1. **What is a financial independence number?**
2. **Is 25× annual spending always enough?**
3. **Why does a lower withdrawal rate create a larger FI number?**
4. **Should I include income such as pension or rent?**
5. **Should I use monthly or annual spending?**
6. **Why is there a future-money FI number?**
7. **Does this tool model investment returns?** — No; use the full FI Planner for the path.
8. **Does changing currency convert my spending?** — No.

---

# 18. Internal-link architecture

SEO3B should receive contextual internal links from at least:

- `financial-independence-number.html`;
- `when-can-i-reach-financial-independence.html`;
- `coast-fire-explained.html` where contextually appropriate;
- `4-percent-rule-retirement.html`;
- `4-percent-rule-stress-test.html`;
- `/financial-independence/`;
- `learn.html` or a relevant featured-resource area.

SEO3B should link out to:

- full Financial Independence Planner;
- Financial Independence Number guide;
- 4% Rule Stress Test;
- Coast FIRE guide;
- Retirement Planner where relevant.

Do not add random sitewide links solely to inflate internal-link counts.

---

# 19. Sitemap and IndexNow

Add the canonical SEO3B URL to `sitemap.xml` with accurate `lastmod`.

The existing Carrowmont IndexNow workflow should notify search engines automatically after deployment.

Do not manually add a second IndexNow mechanism.

---

# 20. Privacy and data handling

- no login required;
- no account required;
- calculations run locally in the browser;
- do not transmit spending values to a backend;
- no external AI call;
- no bank/account/card information;
- normal aggregated site analytics must not include the user's entered financial values.

---

# 21. Accessibility

Required:

- keyboard-usable inputs and segmented controls;
- visible focus states;
- proper labels and help text;
- chart `role="img"` + useful `aria-label`;
- exact values available in HTML tables, not chart-only;
- sufficient contrast;
- no information conveyed by color alone;
- screen-reader friendly output status after recalculation/copy/download.

---

# 22. Responsive behavior

Desktop and mobile must use the same product logic.

Mobile requirements:

- no horizontal page overflow;
- locale pill uses canonical mobile height;
- summary cards stack;
- chart remains legible without requiring pinch zoom;
- callouts stay inside plot bounds;
- tables may use a contained horizontal scroll region if necessary, never page-level overflow;
- CTA buttons remain easy to tap.

Test at representative widths including approximately 360px, 390px, 768px, 1024px and desktop.

---

# 23. Proposed implementation files

Expected main-site additions/changes may include:

### New main-site files

- `financial-independence-number-by-spending.html`
- `financial-independence-number-by-spending.css`
- `financial-independence-number-by-spending.js`
- `financial-independence-number-by-spending-core.js`
- `financial-independence-number-by-spending-pdf-renderer.js`

Use existing shared locale/site/report helpers wherever practical instead of duplicating logic.

### Main-site updates

- `sitemap.xml`
- `financial-independence-number.html`
- other selected FI/withdrawal-rate guides
- `learn.html` where appropriate
- implementation record under `docs/`

### Financial Independence repository

Add a contextual link/card to SEO3B explaining that it is a quick target reference, while the full planner models the savings path.

Do not alter `financial-independence/core.js` calculations for SEO3B.

### Central QA

Update `carrowmont-qa` source contracts and Playwright coverage.

---

# 24. Calculation isolation rule

SEO3B must have a small deterministic core module with no DOM dependency.

Core functions should be unit-testable with plain numeric inputs and outputs.

Suggested conceptual API:

```text
normalizeInputs(raw)
annualSpending(inputs)
fiNumber(annualSpending, withdrawalRate)
futureSpending(annualSpending, inflation, years)
rateComparison(inputs)
spendingSensitivity(inputs)
```

Avoid embedding formulas directly in click handlers or chart-rendering code.

---

# 25. Required calculation fixtures

At minimum test:

### Fixture A — Simple 4% case

```text
Annual spending = 1,200,000
Rate = 4%
FI number = 30,000,000
Multiple = 25×
```

### Fixture B — Monthly/annual parity

```text
100,000 per month == 1,200,000 per year
```

Both modes must produce identical FI numbers.

### Fixture C — 3.5% comparison

```text
Annual spending = 1,200,000
Rate = 3.5%
FI number = 34,285,714.2857...
```

Display rounding may differ by locale, but raw calculation tolerance must be explicit and floating-point safe.

### Fixture D — Inflation projection

```text
Annual spending = 1,200,000
Inflation = 5%
Years = 10
Future annual spending = 1,200,000 × 1.05^10
Future FI target = future annual spending / selected rate
```

### Fixture E — Spending proportionality

At a fixed rate:

```text
120% spending => 120% of the baseline FI number
80% spending => 80% of the baseline FI number
```

### Fixture F — Zero spending

Zero spending returns zero FI number without error/NaN/Infinity.

---

# 26. QA acceptance contract

SEO3B is not complete until all applicable checks pass.

## 26.1 Source / SEO

1. Canonical URL is exact.
2. Page exists in sitemap once only.
3. `lastmod` matches the release date.
4. No accidental `noindex`.
5. Robots allows crawling.
6. One visible H1 only.
7. Unique title.
8. Unique meta description.
9. WebApplication structured data parses.
10. Internal links are valid.
11. Existing IndexNow workflow remains unchanged unless separately approved.

## 26.2 Calculation

12. Monthly/annual parity fixture passes.
13. 4% / 25× fixture passes.
14. 3.5% fixture passes within explicit numeric tolerance.
15. Future inflation formula passes.
16. 80/90/100/110/120% sensitivity passes.
17. Zero-spending fixture passes.
18. No NaN/Infinity outputs.
19. Selected-rate comparison de-duplicates correctly.
20. Currency changes never alter raw numeric values.

## 26.3 UI

21. Standard header matches established Carrowmont tools/assets.
22. Country/currency pill matches canonical desktop height.
23. Country/currency pill matches canonical mobile height.
24. Currency option wording uses `ISO · Currency Name`.
25. Shared currency warning is present.
26. Inputs are keyboard usable.
27. Summary cards update deterministically.
28. Copy Summary works.
29. CSV downloads valid content.
30. Full FI Planner CTA works.
31. No page-level horizontal overflow on desktop.
32. No page-level horizontal overflow on mobile.

## 26.4 Chart

33. Chart uses Inter/system font stack.
34. SVG text has no stroke.
35. Grid/axis styling matches canonical Carrowmont chart treatment.
36. Compact locale formatting is used.
37. Baseline marker is visually distinguishable without relying only on color.
38. Permanent callouts remain inside plot bounds.
39. Callouts do not cover their own anchor marker.
40. Callouts do not overlap each other where valid alternatives exist.
41. Chart remains legible at 360/390px widths.
42. Exact five-row sensitivity values are available outside the chart.
43. No hover-only key information.

## 26.5 PDF

44. PDF generates successfully.
45. PDF uses the selected locale/currency.
46. Summary values match web outputs.
47. Rate comparison matches web outputs.
48. Spending sensitivity values match web outputs.
49. Chart text is not clipped/outlined.
50. All callouts stay within the PDF chart region.
51. Wrapped explanation cards use content-driven height.
52. No content collision.
53. No sparse blank trailing page.
54. Standard Continue Planning page is present.
55. Six-tool report registry is current.

## 26.6 Privacy / regression

56. No financial input values are sent to third parties.
57. No API key or secret is present in browser code.
58. Existing FI Planner calculations are unchanged.
59. Existing 4% Rule Stress Test calculations are unchanged.
60. Existing calculator source contract remains green.
61. Main-site sitemap remains valid.
62. Automated QA remains green after merge.
63. Multi-Repo Guard remains green after merge.

---

# 27. Visual review gate

Because SEO3A required several live presentation fixes, SEO3B must include a stricter pre-merge visual gate.

Before the owner is asked to merge the production PR, review at minimum:

- desktop full-page screenshot;
- mobile full-page screenshot;
- chart close-up with representative INR values;
- chart close-up with a non-INR currency;
- rate-comparison table;
- PDF page containing the chart;
- PDF methodology page;
- final Continue Planning page.

If any value, chart label, table cell or report block looks cramped, clipped, misaligned or visually inconsistent with existing tools, correct it **before** publication rather than relying on a post-release fix.

---

# 28. Release workflow

Use the established Carrowmont process:

```text
Fresh Source Snapshot
        ↓
Build smallest approved SEO3B change
        ↓
Static/hash/syntax/source-contract checks
        ↓
Staged browser/mobile/PDF QA
        ↓
Batch PR Publisher
        ↓
Owner review
        ↓
Merge manually
        ↓
Pages deployment + IndexNow
        ↓
Live Automated QA
        ↓
Multi-Repo Guard
        ↓
Fresh Source Snapshot
```

No direct production merge from automation.

---

# 29. Out of scope for SEO3B

Do not add in this release:

- user accounts;
- cloud storage;
- AI explanations;
- personalized investment advice;
- probabilistic Monte Carlo modelling;
- historical market return simulations;
- tax modelling;
- pension/social-security databases;
- automatic FX conversion;
- changes to the existing FI calculation engine;
- macro-risk tools planned for SEO3C onward.

---

# 30. Relationship to future roadmap

After SEO3B, the planned authority sequence remains:

1. **SEO3C — US Debt & Interest Cost Calculator**
2. **Treasury Refinancing Stress analysis**
3. **Gold Under Macro Stress Explorer**
4. **Oil Shock & Inflation Calculator**
5. **Hypothetical US Default & Global Market Stress Test**
6. **Dollar Reserve Diversification Tracker**

Those products must use the same Carrowmont chart, number-formatting, report and QA standards defined here and in the continuity roadmap.

---

# 31. Final product principle

SEO3B should make one relationship immediately understandable:

> **Your FI number is driven first by the amount of spending the portfolio needs to fund and the withdrawal-rate assumption used to translate that spending into a target.**

The page should be simple enough to answer that question in seconds, detailed enough to teach the assumptions, and visually consistent enough to feel like part of the same Carrowmont product family on the first release.
