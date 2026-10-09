# Carrowmont SEO3A - 4% Rule Stress Test Specification

**Specification date:** 9 October 2026  
**Status:** Approved design specification for implementation  
**Source baseline:** Carrowmont Source Snapshot 22, generated 9 October 2026  
**Primary objective:** Build Carrowmont's first SEO3 link-worthy interactive authority asset without changing the approved Retirement Planner calculation engine.

---

## 1. Executive decision

Carrowmont will build a new public, no-login interactive resource named **4% Rule Stress Test**.

The resource will help users test how a fixed inflation-adjusted retirement withdrawal may behave under:

- a smooth return path;
- lower long-run returns and higher inflation;
- weak early returns;
- a longer retirement horizon; and
- the same set of returns arriving in a different order.

The tool is an **educational deterministic stress test**, not a safe-withdrawal recommendation, forecast, probability model or Monte Carlo simulator.

The existing Retirement Planner remains unchanged mathematically. It currently uses deterministic smooth return assumptions and explicitly states that it does not simulate market volatility or sequence-of-returns risk. SEO3A therefore adds a separate transparent stress-testing engine rather than altering the approved Retirement Planner methodology.

---

## 2. Product identity

### Public name

**4% Rule Stress Test**

### Recommended route

`https://carrowmont.com/4-percent-rule-stress-test.html`

### Recommended search title

`4% Rule Stress Test | Retirement Withdrawal Risk`

### Recommended meta description

`Test how inflation, retirement length and weak early returns can affect a 4% withdrawal plan using transparent deterministic scenarios.`

### H1

**Stress-test the 4% rule against inflation, long retirements and weak early returns**

### Supporting line

**See how the same starting withdrawal can produce very different outcomes when returns arrive in a different order.**

### Product classification

- Free educational planning tool
- No login
- No account
- No cloud storage
- No external AI
- No individualized recommendation

---

## 3. Purpose and user need

The existing guide explains the 4% rule and its limitations. SEO3A turns that education into an interactive reference that users, educators, writers and publishers can test and cite.

The tool should answer:

1. What does a 4% first-year withdrawal mean in money terms?
2. How does inflation increase withdrawals over time?
3. How does the selected retirement horizon affect the outcome?
4. Why can weak early returns damage a withdrawal plan even when long-run returns are similar?
5. How do 3%, 3.5%, 4% and 5% starting rates compare under the same adverse scenario?
6. When does the portfolio deplete under each deterministic scenario?

The tool must show the mechanics clearly enough that a reader can understand the result without trusting a black box.

---

## 4. Relationship to existing Carrowmont products

### Existing 4% Rule guide

`4-percent-rule-retirement.html` remains the educational guide and should gain a prominent action:

**Run the 4% Rule Stress Test ->**

The guide continues explaining history, mechanics, limitations, taxes, fees, flexible spending and research context.

### Retirement Planner

The Retirement Planner remains the detailed retirement cash-flow and corpus tool. SEO3A must not replace it.

Recommended integration:

- add a contextual link from the Retirement Planner methodology/FAQ area;
- use wording such as **Stress-test withdrawal sequence risk**;
- do not change any Retirement Planner formula, output or report value;
- explain that the Stress Test uses annual deterministic sequences while the Retirement Planner models detailed retirement cash flows using smooth entered return assumptions.

### Inflation Calculator

The Stress Test should link to the Inflation Calculator for users who want to explore purchasing-power assumptions separately.

### Financial Independence

The Stress Test may link to the FI Planner where withdrawal-rate assumptions are used to estimate an FI target, but it must not imply that the Stress Test replaces the FI model.

---

## 5. Scope

### In scope for SEO3A

- New public interactive page on the main Carrowmont site
- Shared country/currency shell
- Deterministic annual withdrawal engine
- Base, Cautious and Adverse scenario cards
- Weak-first versus strong-first sequence comparison
- Portfolio-balance chart
- Withdrawal path chart or combined annual table
- 3%, 3.5%, 4% and 5% comparison table
- Full annual result table
- Copy Summary
- Download annual data as CSV
- Generate a standardized PDF summary
- Methodology, FAQ, sources and disclaimer
- Links from the current 4% Rule guide and Retirement Planner
- Sitemap, Learn hub and IndexNow integration
- Central source, calculation, browser, report, accessibility and link QA

### Out of scope for SEO3A

- Monte Carlo simulation
- Historical market-data backtesting
- Live market data
- Portfolio asset-allocation recommendations
- Tax modelling
- investment fees as a separate input
- dynamic guardrails or spending cuts
- pensions or retirement income
- account/login features
- saving user plans
- external AI
- claims of a universally safe rate

These may be considered later only through separate specifications and regression-tested methodology changes.

---

## 6. User journey

### Primary journey

1. User opens the Stress Test.
2. User selects country/currency through the shared Carrowmont locale control.
3. User enters starting portfolio, withdrawal assumption, retirement age, plan-until age, inflation and long-run nominal return.
4. Results update automatically.
5. User compares Base, Cautious and Adverse scenarios.
6. User opens **Why order matters** to compare weak-first and strong-first sequences using the same return set.
7. User reviews annual values and the rate comparison.
8. User copies a summary, downloads CSV or generates a PDF.
9. User continues to the Retirement Planner, Inflation Calculator or 4% Rule guide.

### Empty/invalid state

The tool must not show misleading results when inputs are incomplete or invalid. It should display clear, plain-language validation messages and retain the last valid result only if this behavior is already consistent with Carrowmont form conventions.

---

## 7. Inputs

### 7.1 Timeline

| Input | Default sample | Allowed range | Notes |
|---|---:|---:|---|
| Retirement start age | 60 | 35-90 | Educational timeline marker only |
| Plan until age | 90 | Start age + 10 to 120 | Determines horizon |

The displayed horizon is:

`Plan until age - retirement start age`

### 7.2 Starting portfolio

| Input | Default sample | Validation |
|---|---:|---|
| Starting portfolio | 10,000,000 in selected currency | Must be greater than 0 |

The sample is illustrative and does not imply a recommended portfolio value.

### 7.3 Starting withdrawal

The tool supports two synchronized modes:

#### Rate mode

- Starting withdrawal rate
- Default: 4.0%
- Range: 0.5%-10.0%

#### Amount mode

- First-year annual portfolio withdrawal
- Must be greater than or equal to 0
- Must not exceed the starting portfolio in a valid initial calculation

The relationship is:

`First-year withdrawal = Starting portfolio x Starting withdrawal rate`

Changing either field updates the other.

### 7.4 Inflation

| Input | Default sample | Range |
|---|---:|---:|
| Annual inflation | 4.0% | -2.0% to 15.0% |

This is a user-entered planning assumption, not a country forecast.

### 7.5 Long-run nominal return

| Input | Default sample | Range |
|---|---:|---:|
| Long-run nominal return | 6.0% | -10.0% to 20.0% |

This is a deterministic modelling assumption, not a forecast or guaranteed return.

### 7.6 Input behavior

- Currency changes the unit and number format only; it does not perform FX conversion.
- Country/currency changes must not silently change return or inflation assumptions.
- All inputs must be keyboard accessible and properly labelled.
- The tool should preserve valid user-entered assumptions during ordinary UI interaction.
- No financial input is transmitted to a backend.

---

## 8. Core annual calculation convention

SEO3A uses annual steps for transparency.

For each retirement year:

1. Record the opening portfolio balance.
2. Apply the year's inflation-adjusted withdrawal at the **start of the year**.
3. If the opening balance is insufficient to fund the full withdrawal, mark depletion during that year and set the closing balance to zero.
4. Apply the scenario's annual portfolio return to the remaining balance.
5. Record investment growth/loss and closing balance.
6. Increase the next year's withdrawal by the scenario inflation rate.

### 8.1 Year-one withdrawal

`W1 = Starting portfolio x Starting withdrawal rate`

or the user-entered annual amount.

### 8.2 Later withdrawals

`Wt = W(t-1) x (1 + inflation_t)`

### 8.3 Closing balance

`Closing balance_t = max(0, (Opening balance_t - Withdrawal_t) x (1 + return_t))`

### 8.4 Depletion convention

If the full scheduled withdrawal cannot be funded at the start of a year:

- the status becomes **Depleted during year N**;
- the modelled depletion age is `retirement start age + N - 1`;
- no negative balance is displayed;
- later years remain zero and are visibly marked as depleted.

### 8.5 Today's-money end balance

The tool also shows the final portfolio in today's purchasing power:

`Real ending balance = Nominal ending balance / cumulative inflation factor`

The interface must clearly distinguish nominal money from today's money.

---

## 9. Scenario definitions

The scenarios are deterministic illustrations. They are not probabilities and must never be labelled likely, expected or guaranteed.

### 9.1 Base scenario

- Annual return: user-selected long-run nominal return every year
- Inflation: user-selected inflation every year
- Purpose: show the smooth deterministic path

### 9.2 Cautious scenario

- Annual return: user-selected return minus 1.5 percentage points
- Annual inflation: user-selected inflation plus 1.0 percentage point
- Apply reasonable validation caps from the input ranges
- Purpose: show sensitivity to a less favourable long-run combination

### 9.3 Adverse early-sequence scenario

The first ten years use an illustrative weak-first return sequence. The sequence is normalized so that its ten-year geometric average equals the user's selected long-run return. After year ten, the user-selected return applies smoothly.

Raw ten-year return template before normalization:

`-20%, -10%, 0%, 4%, 6%, 8%, 10%, 12%, 14%, 16%`

Normalization method:

1. Convert each return to a growth factor.
2. Calculate the geometric mean of the ten raw factors.
3. Multiply each raw factor by:

`(1 + selected long-run return) / raw geometric mean factor`

4. Convert the normalized factors back to annual returns.

This preserves the selected geometric return over the ten-year stress window while placing weak years first.

Adverse inflation treatment:

- Years 1-10: selected inflation plus 2.0 percentage points
- Later years: selected inflation
- Apply the same upper validation cap used by the input range

Purpose: combine weak early returns with an early inflation stress while keeping the return-sequence method transparent.

### 9.4 Strong-first sequence comparator

The **Why order matters** comparison uses the same normalized ten annual returns as the weak-first sequence, but in reverse order.

- Weak-first and strong-first therefore contain the same ten return values.
- Without withdrawals, both produce the same ten-year compounded result.
- With withdrawals, their portfolio paths can differ because the order changes when losses and withdrawals interact.
- Base inflation, not adverse inflation, is used in this isolated sequence comparison so the difference is attributable to return order.

This comparison is educational and separate from the three primary scenario cards.

---

## 10. Result object

The calculation engine should create one immutable result object that is reused by the webpage, copy summary, CSV and PDF.

Recommended top-level structure:

```js
{
  assumptions,
  base,
  cautious,
  adverse,
  sequenceComparison,
  rateComparison,
  generatedAt,
  methodologyVersion
}
```

Each scenario should include:

```js
{
  status,
  depletionYear,
  depletionAge,
  endingBalanceNominal,
  endingBalanceReal,
  totalWithdrawalsNominal,
  firstYearWithdrawal,
  finalScheduledWithdrawal,
  minimumPositiveBalance,
  annualRows
}
```

Each annual row should include:

```js
{
  year,
  age,
  openingBalance,
  withdrawal,
  inflationRate,
  returnRate,
  investmentGrowth,
  closingBalance,
  depleted
}
```

The PDF and CSV must not recalculate independently.

---

## 11. Core outputs

### 11.1 Summary cards

For Base, Cautious and Adverse:

- Portfolio lasts through selected horizon / depletes during year N
- Depletion age, where applicable
- Ending balance in nominal money
- Ending balance in today's money
- Total nominal withdrawals funded
- Final scheduled annual withdrawal

Avoid probability language such as success rate or confidence.

### 11.2 Rate comparison

Using the user's starting portfolio, horizon, inflation, return and **Adverse** scenario method, compare:

- 3.0%
- 3.5%
- 4.0%
- 5.0%

For each rate show:

- first-year withdrawal;
- lasts through horizon / depletion age;
- ending balance in today's money.

This table demonstrates sensitivity. It must not identify one rate as universally safe.

### 11.3 Sequence comparison

Show weak-first and strong-first paths using the same return set.

Required callout:

> These paths use the same ten annual return values in a different order. The difference comes from withdrawals interacting with the timing of gains and losses.

### 11.4 Annual table

Columns:

1. Year
2. Age
3. Opening balance
4. Withdrawal
5. Inflation
6. Return
7. Investment growth/loss
8. Closing balance
9. Status

Allow users to select Base, Cautious, Adverse, Weak-first or Strong-first.

---

## 12. Visual design

SEO3A must comply with `CARROWMONT_SHARED_UI_STANDARD.md`.

### 12.1 Page shell

- Standard Carrowmont wordmark and header
- Standard 44px desktop / 38px mobile country-currency pill
- Shared locale popover and behavior
- Standard footer with the six-tool registry
- Responsive desktop/mobile treatment

### 12.2 Page structure

1. Compact hero and direct explanation
2. Assumption panel
3. Scenario summary cards
4. Portfolio path chart
5. Why order matters comparison
6. Rate comparison table
7. Annual data table
8. Methodology and limitations
9. FAQ
10. Sources and preparation note
11. Relevant Carrowmont tools and guides

### 12.3 Charts

#### Portfolio path chart

- Base, Cautious and Adverse lines
- X-axis: retirement year/age
- Y-axis: selected currency
- Permanent printed values at start, year 10, year 20 and final/depletion point where space permits
- No hover-only information

#### Sequence comparison chart

- Weak-first and strong-first lines
- Same axes and annual return set
- Clear legend and text explanation
- Depletion markers where applicable

Charts must remain readable in PDF and mobile layouts.

### 12.4 Color and accessibility

- Do not rely on colour alone
- Distinct line styles/markers
- Sufficient contrast
- Accessible table alternative
- Keyboard-accessible controls
- Visible focus states
- Reduced-motion friendly

---

## 13. Copy Summary, CSV and PDF

### 13.1 Copy Summary

Include:

- starting portfolio;
- starting withdrawal rate and amount;
- retirement horizon;
- inflation and return assumptions;
- Base/Cautious/Adverse status;
- sequence-risk explanation;
- educational disclaimer;
- canonical Stress Test URL.

### 13.2 CSV export

File name:

`carrowmont-4-percent-rule-stress-test.csv`

Include one metadata block or header rows for assumptions, followed by annual scenario rows. CSV values must match the on-screen result object exactly.

### 13.3 PDF report

Recommended title:

**Carrowmont 4% Rule Stress Test Report**

Recommended report structure:

1. Summary and assumptions
2. Scenario comparison and portfolio chart
3. Sequence comparison
4. Rate comparison and annual values
5. Report Guide & Methodology
6. Continue Planning with Carrowmont

The final two pages should follow the established Carrowmont report standard. The investment-tool card remains country-aware.

The report must state:

- deterministic annual model;
- start-of-year withdrawal timing;
- inflation-adjusted withdrawal method;
- scenario definitions;
- no taxes/fees/pension modelling;
- no probability or Monte Carlo analysis;
- educational use only.

---

## 14. SEO, content and authority requirements

### 14.1 Metadata

- Self-canonical
- `index,follow`
- Unique title and description
- One H1
- `WebApplication` JSON-LD
- `BreadcrumbList` JSON-LD
- `FAQPage` JSON-LD only for visible FAQ content
- Carrowmont publisher identity
- `dateModified` matching review date

### 14.2 Sitemap and IndexNow

- Add the public URL to `sitemap.xml`
- Use accurate `lastmod`
- Ensure the existing IndexNow workflow submits the new/changed URL after deployment

### 14.3 Learn hub and internal links

Add the Stress Test as a featured interactive resource in the Retirement/Financial Independence area of the Learn hub.

Required internal links:

- Existing 4% Rule guide -> Stress Test
- Sequence-of-returns guide -> Stress Test
- Longevity-risk guide -> Stress Test
- Retirement Planner -> Stress Test
- Stress Test -> Retirement Planner
- Stress Test -> Inflation Calculator
- Stress Test -> 4% Rule guide
- Stress Test -> sequence-of-returns guide

### 14.4 Trust content

The page must explain:

- Carrowmont owns and maintains the model;
- the model is deterministic and illustrative;
- the return pattern is synthetic and disclosed, not presented as historical data;
- cited sources support the educational concepts, not the model's future accuracy;
- AI assistance, if used in drafting content, does not calculate user results.

### 14.5 Sources

Prefer the authoritative sources already used by the existing 4% Rule guide and add only sources needed for new factual claims. Do not duplicate long quotations.

---

## 15. Privacy and analytics

- All calculations run locally in the browser.
- Do not store inputs in the cloud.
- Do not include financial amounts in analytics events.
- Do not place financial assumptions in the page URL by default.
- No API key or backend is required.
- The page must remain usable if analytics is blocked.

---

## 16. Calculation safety and separation

Recommended file separation:

- `4-percent-rule-stress-test.html` - page structure
- `4-percent-rule-stress-test.js` - UI orchestration
- `4-percent-rule-stress-test-core.js` - pure deterministic calculation engine
- `4-percent-rule-stress-test.css` - page-specific presentation
- `4-percent-rule-stress-test-pdf.js` - report rendering from result object

The core engine must not read DOM state directly. It receives normalized inputs and returns a result object.

No existing calculator core/application file should be modified for calculation reuse. Any Retirement Planner repository change should be limited to contextual linking unless a later separately approved methodology change is designed.

---

## 17. QA and acceptance criteria

### 17.1 Source-contract checks

1. Public Stress Test page exists.
2. One H1 only.
3. Self-canonical is correct.
4. `index,follow` is present.
5. Title and meta description meet Carrowmont editorial guardrails.
6. WebApplication and Breadcrumb JSON-LD are valid.
7. Sitemap contains the URL with accurate `lastmod`.
8. Learn hub links to the asset.
9. Existing 4% Rule guide links to the asset.
10. Retirement Planner links to the asset.
11. Required methodology/disclaimer text is present.
12. No external AI/API dependency exists.

### 17.2 Calculation fixtures

13. Zero return and zero inflation fixture matches hand calculation.
14. No-withdrawal fixture compounds correctly.
15. Year-one withdrawal occurs before annual return.
16. Inflation increases later withdrawals correctly.
17. Rate mode and amount mode produce identical results.
18. Exact depletion year/age is correct.
19. Balance never displays below zero.
20. Nominal and today's-money ending balances match independent calculations.
21. Cautious scenario applies the defined return/inflation adjustments.
22. Adverse sequence normalization matches the selected geometric return over ten years.
23. Weak-first and strong-first sequences contain identical return values in reverse order.
24. Without withdrawals, weak-first and strong-first have the same ten-year ending balance within rounding tolerance.
25. With withdrawals, the approved fixture demonstrates a lower weak-first ending balance.
26. Rate comparison uses the same adverse assumptions for all four rates.
27. Annual rows reconcile opening balance, withdrawal, growth and closing balance.

### 17.3 Browser/layout/accessibility checks

28. Page loads without first-party JavaScript errors.
29. Country/currency control follows shared geometry and behavior.
30. Desktop has no horizontal overflow.
31. Mobile has no horizontal overflow.
32. Charts render non-blank geometry.
33. Charts include permanent labels/markers at meaningful checkpoints.
34. Inputs and buttons are keyboard accessible.
35. Validation messages are programmatically associated with inputs.
36. Tables remain readable on small screens.
37. Reduced-motion preference is respected.

### 17.4 Export/report checks

38. Copy Summary values equal on-screen values.
39. CSV values equal the selected scenario's annual rows.
40. PDF downloads successfully.
41. PDF assumptions and scenario results equal the webpage result object.
42. PDF charts remain readable without hover.
43. PDF includes methodology, limitations and disclaimer.
44. PDF final planning page uses the current six-tool registry.

### 17.5 Link and privacy checks

45. All same-origin links return no 4xx/5xx.
46. No financial input is sent in analytics requests.
47. No financial input is written into query parameters automatically.
48. No secret/API credential exists in browser code.
49. IndexNow configuration remains healthy after the new URL is added.

---

## 18. Expected repositories

### `draw004.github.io`

- New Stress Test page and assets
- Existing guide link updates
- Learn hub update
- Sitemap update
- Documentation/implementation record

### `retirement-calculator`

- Contextual link only, unless review shows no suitable placement
- No formula changes

### `carrowmont-qa`

- Source contract
- Independent calculation fixtures
- Browser/layout/chart/report/link/privacy tests
- Visual-review checklist additions

Expected release PR count: **2 or 3**, depending on whether the Retirement Planner integration link is included in the first build.

---

## 19. Implementation sequence

1. Add this specification to `draw004.github.io/docs/`.
2. Run a fresh Source Snapshot.
3. Build the pure core engine and independent QA fixtures first.
4. Build the page around the approved result object.
5. Add charts, table, copy/CSV/PDF outputs.
6. Add internal links, sitemap and metadata.
7. Run source contract and local deterministic fixtures.
8. Package the release through the Batch PR Publisher.
9. Review and merge PRs manually.
10. Run live Automated QA, Multi-Repo Guard and IndexNow.
11. Generate a fresh post-release Source Snapshot.
12. Begin the SEO3 outreach launch only after the live asset and methodology are verified.

---

## 20. Final product principle

The 4% Rule Stress Test must help users understand **sensitivity and sequence risk**, not persuade them that one percentage is safe.

Carrowmont calculates the deterministic mechanics, shows every assumption and keeps the user in control. The value of the asset comes from transparency, comparability and usefulness—not from presenting uncertainty as certainty.
