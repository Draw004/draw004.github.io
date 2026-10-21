# CARROWMONT LEARN3E - HOME, MORTGAGE & PROPERTY

## Final Page-by-Page Editorial, Localization, Search, Internal Discovery, QA and Release Specification

**Status:** FINAL specification-only approval gate. This document does not change public article content.  
**Authoritative baseline:** Carrowmont Source Snapshot 101 (timestamped source snapshot generated 2026-10-21T14:36:29Z)  
**Main-site baseline commit:** `1961bbb13853628ff00dcbe55ca82ef92ba74898`  
**Central QA baseline commit:** `3fffc138e89463d95ba211421f9dc16f28fc3615`  
**Baseline source contract:** 624 PASS / 0 FAIL  
**Specification date:** 21 October 2026

---

# 1. Executive decision

LEARN3E will materially improve nine established Carrowmont Learn guides covering mortgage overpayment/prepayment mechanics and property-investment foundations.

The programme will **not** rewrite the newer Home Affordability, Mortgage Decision Centre or Rent vs Buy education merely to increase page count. Those newer pages already have deeper decision-specific content and active Tool <-> Learn contracts. They remain maintenance-only unless a genuine defect is found.

The purpose of LEARN3E is to make the older guides more practical, easier to understand and more useful internationally while preserving the calculation and product architecture already established across Mortgage Payoff, Home Affordability, Rent vs Buy, Goal Planner, Retirement and Financial Independence.

Every improved page must preserve:

- its existing canonical URL;
- the established Carrowmont Learn article structure;
- simple language and clear direct answers;
- one universal educational core with country-aware housing terminology;
- mathematically consistent localized examples;
- stable search-intent ownership;
- existing Tool <-> Learn journeys and older QA contracts;
- truthful Article `dateModified` and sitemap `lastmod` only after substantive change;
- SEARCH1 privacy and index ownership;
- the existing Learn housing localization system;
- Publisher -> QA -> Multi-Repo Guard -> fresh Source Snapshot release discipline.

Search growth is a desired outcome of stronger content, not a reason to create duplicate housing pages or repeat mortgage keywords.

---

# 2. Scope

## LEARN3E-1 - Mortgage overpayment, repayment frequency and payoff timing

1. `biweekly-fortnightly-mortgage-payments.html`
2. `extra-mortgage-payments-early-vs-late.html`
3. `monthly-extra-vs-annual-lump-sum-mortgage.html`
4. `one-extra-mortgage-payment-a-year.html`
5. `pay-off-mortgage-five-years-early.html`

## LEARN3E-2 - Property investment foundations and comparisons

6. `rental-yield-explained.html`
7. `reit-vs-direct-property.html`
8. `what-is-a-reit.html`
9. `real-estate-vs-stocks.html`

A fresh clean Source Snapshot is required between LEARN3E-1 and LEARN3E-2.

---

# 3. Maintenance-only pages in this programme

The following newer or already-deeper pages remain maintenance-only unless implementation review finds a genuine defect:

- `mortgage-prepayment-vs-investing.html` - established MDC1A decision guide;
- `mortgage-refinance-break-even.html` - established MDC1B refinance / balance-transfer decision guide;
- `mortgage-rate-rise-payment-stress.html` - established MDC1C rate-stress guide;
- `rent-vs-buy-home.html` - established RENT1 comparison guide;
- `how-much-home-can-i-afford.html` - established HOME1 affordability guide;
- `mortgage-affordability-vs-lender-approval.html` - established HOME1 approval-vs-affordability guide;
- `how-deposit-and-interest-rates-affect-home-affordability.html` - established HOME1 deposit/rate guide;
- the live Mortgage / Home Loan Payoff Calculator and its Decision Centre subtools;
- the live Home Affordability Calculator;
- the live Rent vs Buy Calculator.

These pages may receive contextual inbound links where useful, but they must not be rewritten simply to increase change volume or freshness.

---

# 4. Controlling Carrowmont standards

Implementation must inherit, not replace:

- `.github/LEARN-ARTICLE-STANDARD.md`;
- the current Learn localization specification and runtime;
- Mortgage Learn Education V1 contracts;
- MDC1A / MDC1B / MDC1C Tool <-> Learn contracts;
- RENT1 Tool <-> Learn contracts;
- HOME1 Tool <-> Learn contracts;
- SEARCH1 privacy and search-index rules;
- the sitewide colon-capitalization rule;
- current Article and Breadcrumb structured-data conventions;
- sitemap / IndexNow freshness discipline;
- 1280 / 390 / 360 responsive QA discipline.

If this specification conflicts with an already-active architecture or QA contract, the older active contract wins unless the conflict is explicitly reviewed and approved before implementation.

This preflight rule is mandatory. No new editorial preference may silently override an existing tool journey.

---

# 5. Non-goals

LEARN3E must not:

- create new public URLs;
- rename or redirect the nine canonical URLs;
- create country-specific housing doorway pages;
- create raw machine-translated copies;
- change any mortgage, affordability, rent-vs-buy, retirement, FI or goal-planner formula;
- imply that making extra mortgage payments is always better than saving, investing or paying higher-cost debt;
- imply that a lender must accept unlimited overpayments or a particular repayment frequency;
- imply that biweekly, fortnightly and twice-monthly payments are interchangeable;
- present one deposit/down-payment percentage as universal;
- present one debt-to-income or affordability ratio as universally safe;
- present refinancing, balance transfer, remortgaging or prepayment rules as identical across countries;
- claim that property is automatically safer than shares/equities;
- claim that REITs are equivalent to directly owning a property;
- use rental yield as a substitute for total return, cash flow or risk analysis;
- recommend a particular property, REIT, fund, lender, broker or security;
- invent tax, stamp-duty, mortgage-interest-deduction, capital-gains, landlord or tenancy rules;
- change SEARCH1 query storage or privacy behavior;
- change homepage core-tool architecture;
- refresh unrelated sitemap dates;
- pad pages to hit a word count target.

---

# 6. Reader outcome standard

Every materially improved LEARN3E guide must give the reader:

1. **A direct answer** near the top.
2. **A mental model** explaining what drives the result.
3. **A transparent worked illustration** where numbers clarify the decision.
4. **A practical checklist** or review questions.
5. **A clear next step** to the correct Carrowmont tool or related guide.

The reader should leave knowing what can be calculated universally and what still depends on lender rules, local law, tax, fees, property costs or personal cash-flow needs.

---

# 7. Plain-language and house-style rules

- Prefer `extra payment`, `overpayment`, `prepayment`, `home loan` and `mortgage` according to the existing country-aware terminology layer.
- Define amortization before relying on the term.
- Explain `principal` as the outstanding loan balance when first useful.
- Explain `gross rental yield`, `net rental yield`, `cash flow`, `total return`, `REIT`, `leverage` and `liquidity` before using them as shorthand.
- Keep paragraphs short enough to scan on a phone.
- Use tables where comparison helps; do not add tables merely for visual density.
- Explain benefits and limitations together.
- Avoid fear language around home ownership, debt or market risk.
- Avoid moral language such as `renting is wasting money` or `debt-free is always best`.
- Do not call a property or REIT `safe` without qualification.
- Preserve the current title/H1/H2 colon-capitalization rule.

The first substantive answer should normally appear within the first 120 words of the article body.

---

# 8. Global terminology and local relevance

Carrowmont's established housing rule remains:

> Keep the core mathematics universal; localize terminology, examples and genuine market caveats without inventing country-specific rules.

## 8.1 Housing terminology

| Context | Preferred wording where natural |
|---|---|
| India | home loan; prepayment / foreclosure only when the legal meaning is clear; EMI where the context is monthly loan payment |
| United States / Canada | mortgage; extra principal payment / prepayment; refinance |
| United Kingdom / Ireland | mortgage; overpayment; remortgage where genuinely relevant |
| Australia / New Zealand | home loan / mortgage; extra repayment; refinance |
| International fallback | mortgage / home loan; extra payment / prepayment |

`Foreclosure` must never be used globally as a synonym for voluntary early payoff because in several markets it primarily means lender repossession/enforcement.

## 8.2 Frequency terminology

- `biweekly` and `fortnightly` may both mean every two weeks in different markets.
- `twice monthly` means 24 payments per year and is not mathematically the same as every two weeks / fortnightly, which normally produces 26 payment events per year.
- If a lender merely splits a monthly payment into smaller installments without applying principal earlier, the interest effect can differ from a true accelerated schedule.
- Every example must say what payment timing assumption is being modeled.

## 8.3 Money examples

- Use the existing Learn localization layer.
- Use round illustrative values, not live FX conversion.
- Values belonging to one scenario must scale consistently together.
- INR may use lakh/crore where natural.
- Non-INR scenarios must not leak lakh/crore notation.
- Currency changes presentation, not the underlying financial relationship.

## 8.4 Country-dependent rules

The following can differ materially by jurisdiction, lender and contract:

- prepayment / overpayment limits;
- early-repayment charges;
- variable, fixed, floating and reset-rate behavior;
- refinancing / balance-transfer fees;
- mortgage-interest tax treatment;
- property transaction taxes and stamp duties;
- REIT legal/distribution requirements;
- landlord taxes and allowable expenses;
- tenancy and maintenance obligations.

Where relevant, tell readers to check their lender agreement, regulator, tax authority or official product documentation rather than inventing a universal rule.

---

# 9. Mortgage example and calculation standard

Numerical mortgage examples must state enough assumptions to reproduce the logic.

Where relevant, state:

- starting loan balance;
- annual interest rate;
- remaining or original term;
- payment frequency;
- scheduled payment amount or the method used to derive it;
- extra-payment amount and timing;
- whether extra money reduces principal immediately;
- whether fees / penalties are included or omitted;
- whether the interest rate stays constant in the illustration.

Rules:

1. Use the same amortization convention as the relevant Carrowmont mortgage tool when making a directly comparable illustration.
2. Do not compare a monthly-extra strategy with an annual lump sum unless the total extra cash is made comparable and timing is clearly disclosed.
3. Do not claim frequency itself creates savings when the actual mechanism is extra annual principal or earlier principal application.
4. Do not call an overpayment `guaranteed return` without explaining that the avoided interest depends on the loan rate, timing, fees and tax context.
5. Do not assume a lender allows the modeled payment pattern.
6. Keep liquidity and emergency-fund trade-offs visible.
7. Where a user may have higher-cost debt, mention that mortgage prepayment should not be evaluated in isolation.
8. Illustrations are educational, not lender quotes.

---

# 10. Property-investment standard

Property comparison articles must separate at least four concepts where relevant:

1. **Income** - rent or distributions received.
2. **Costs** - maintenance, vacancies, management, transaction costs, financing costs, taxes/charges where applicable.
3. **Capital value change** - property price, share/REIT price or equity-market change.
4. **Risk and liquidity** - concentration, leverage, marketability, tenant/asset risk, volatility and access to cash.

Additional rules:

- Gross rental yield = annual gross rent / property value or purchase price, with the chosen denominator disclosed.
- Net rental yield must state which costs are subtracted; there is no single universal net-yield convention.
- Cash-on-cash return is different from property yield and becomes leverage-dependent.
- Rental yield is not total return.
- REIT distribution yield is not total return.
- Listed REITs can behave like both real estate and public securities.
- Direct property usually creates greater single-asset/location concentration than a diversified REIT or broad equity fund, but the comparison must not assume every REIT or equity portfolio is diversified.
- Leverage must be normalized or disclosed before comparing direct-property returns with unleveraged share-market returns.
- Illiquidity is a cost/risk characteristic, not automatically an advantage or disadvantage for every person.
- Tax treatment is jurisdiction-specific and must not be generalized.

---

# 11. Search-intent ownership

Each page must retain one primary question and avoid cannibalizing newer decision tools.

| Page | Primary question / search intent | Must not become |
|---|---|---|
| `biweekly-fortnightly-mortgage-payments.html` | Where can savings from every-two-week / fortnightly mortgage payments actually come from? | a generic mortgage payoff guide or a claim that 26-payment cadence always saves money |
| `extra-mortgage-payments-early-vs-late.html` | Why can the timing of equal extra principal payments change interest savings? | a prepay-vs-invest article |
| `monthly-extra-vs-annual-lump-sum-mortgage.html` | How do equal annual extra-payment amounts compare when paid monthly versus as one lump sum? | a generic lump-sum investing article |
| `one-extra-mortgage-payment-a-year.html` | What can one genuine extra principal payment per year change? | a promise of a fixed payoff-time reduction |
| `pay-off-mortgage-five-years-early.html` | How can a target payoff date be translated into an extra-payment requirement? | the Mortgage Payoff Calculator landing page |
| `rental-yield-explained.html` | What are gross and net rental yield, and what do they omit? | a full property-investment return calculator |
| `reit-vs-direct-property.html` | What structural trade-offs differ between REIT ownership and direct property? | a REIT definition article or product recommendation |
| `what-is-a-reit.html` | What is a REIT, how does it work, and where can return/risk come from? | a direct-property comparison duplicate |
| `real-estate-vs-stocks.html` | How do direct property and diversified equities differ in concentration, leverage, liquidity, income and total-return mechanics? | a prediction of which asset class will outperform |

Maintenance-only ownership remains separate:

- `mortgage-prepayment-vs-investing.html` = extra mortgage payment versus investing decision;
- `mortgage-refinance-break-even.html` = refinance / balance-transfer switching-cost break-even;
- `mortgage-rate-rise-payment-stress.html` = payment and household-buffer sensitivity to higher rates;
- `rent-vs-buy-home.html` = full rent-versus-buy household decision;
- HOME1 trio = affordability / lender approval / deposit-and-rate effects;
- Mortgage Payoff Calculator = deterministic loan payoff modeling;
- Home Affordability Calculator = household cash-flow affordability modeling;
- Rent vs Buy Calculator = deterministic rent-versus-buy scenario comparison.

---

# 12. Current Snapshot 101 quality signals

These are review signals, not automatic reasons to make a page longer.

| Page | Approx. visible words | Tables | Authority links | Existing numerical illustration | Main opportunity |
|---|---:|---:|---:|---:|---|
| `biweekly-fortnightly-mortgage-payments.html` | 1,094 | 1 | 4 | Yes | make 26-vs-24-payment mechanics unmistakable and show lender-application caveat |
| `extra-mortgage-payments-early-vs-late.html` | 1,104 | 1 | 4 | Partial | add a clearly labeled same-extra-cash early-vs-late worked example and review checklist |
| `monthly-extra-vs-annual-lump-sum-mortgage.html` | 1,225 | 1 | 4 | Yes | deepen fair-comparison timing logic and cash-flow trade-offs |
| `one-extra-mortgage-payment-a-year.html` | 1,463 | 1 | 6 | Yes | clarify what counts as genuinely extra principal and lender timing rules |
| `pay-off-mortgage-five-years-early.html` | 1,144 | 1 | 4 | Partial | add target-payoff worked example and affordability/checklist depth |
| `rental-yield-explained.html` | 1,202 | 1 | 4 | No | add gross-vs-net worked example and what yield omits |
| `reit-vs-direct-property.html` | 1,138 | 3 | 5 | No | add comparable investment-structure example and decision checklist |
| `what-is-a-reit.html` | 1,184 | 2 | 4 | No | add economic-chain example, listed/non-traded distinction and due-diligence checklist |
| `real-estate-vs-stocks.html` | 1,270 | 2 | 5 | No | add leverage-normalized comparison and portfolio decision checklist |

The page already being longer is not a reason to leave a conceptual gap. Conversely, a shorter page should not be expanded when the missing idea can be explained clearly in a compact section.

---

# 13. LEARN3E-1 page briefs

## 13.1 `biweekly-fortnightly-mortgage-payments.html`

### Reader question
Why do some every-two-week / fortnightly mortgage schedules appear to save interest, and when is the saving really just an extra annual payment?

### Required improvement

- Give the direct answer immediately: the saving can come from **more principal paid per year**, **earlier principal application**, or both - not from the label `biweekly` itself.
- Show 24 twice-monthly events versus 26 every-two-week events.
- Explain the common accelerated pattern where half a monthly payment every two weeks totals roughly 13 monthly payments per year.
- Include a transparent illustration using one consistent mortgage scenario.
- Explain that some servicers hold partial payments until a full installment is available, which can change the result.
- Keep the current checklist and strengthen it with lender questions: application timing, fees, autopay rules, prepayment limits and whether the extra amount is principal-only.
- Link contextually to `one-extra-mortgage-payment-a-year.html` and the Mortgage Payoff Calculator.

### Guardrail
Do not imply every biweekly plan saves the same amount or that a lender must offer such a schedule.

## 13.2 `extra-mortgage-payments-early-vs-late.html`

### Reader question
If the total extra cash is the same, why can paying it earlier reduce more interest?

### Required improvement

- Explain amortization in simple language.
- Add a clearly labeled worked example with the same total extra principal paid at different times.
- Separate the mathematical effect from the household decision: liquidity, emergency reserves, higher-cost debt and investment opportunity still matter.
- Explain how rate resets / variable rates can weaken a simple fixed-rate illustration.
- Add a practical `Before moving extra cash earlier` checklist.
- Link to `mortgage-prepayment-vs-investing.html` as the distinct next decision when the alternative use is investing.

### Guardrail
Do not turn this page into an argument that earlier prepayment is always the best use of cash.

## 13.3 `monthly-extra-vs-annual-lump-sum-mortgage.html`

### Reader question
If the same extra amount is available over a year, does paying monthly or as one annual lump sum reduce the mortgage faster?

### Required improvement

- Make the fair-comparison rule explicit: equal total extra cash, known timing and the same loan assumptions.
- Show why monthly extras often have a timing advantage when the annual lump sum arrives at year-end.
- Show why a lump sum available at the **start** of the year can reverse that result.
- Keep a scenario table with at least monthly-extra, year-end lump sum and beginning-of-year lump sum patterns.
- Explain behavioral/cash-flow reliability without pretending one method is universally better.
- Add a lender-rule checklist.

### Guardrail
Do not compare unequal annual cash amounts and call the difference a timing effect.

## 13.4 `one-extra-mortgage-payment-a-year.html`

### Reader question
What can one genuine extra principal payment each year change in a mortgage schedule?

### Required improvement

- Preserve the direct explanation that the extra payment must reduce principal rather than merely bring a scheduled payment forward.
- Keep a worked example but make assumptions easy to reproduce.
- Explain how loan rate, remaining term and payment timing change the saving.
- Add a compact comparison of one annual extra payment versus the same amount spread monthly.
- Explain why the strategy can be useful but should not consume the household's cash buffer.
- Preserve authoritative lender/regulator caveats.

### Guardrail
Do not promise that one extra payment always removes a fixed number of years.

## 13.5 `pay-off-mortgage-five-years-early.html`

### Reader question
How can a borrower estimate the extra payment needed to reach a payoff date five years earlier?

### Required improvement

- Explain this as a target-payoff problem, not as one universal percentage increase.
- Add a transparent example showing original term, target term, scheduled payment and modeled extra payment.
- Explain that the exact extra amount changes with balance, rate, remaining term and payment timing.
- Explain why `five years early` can be unsuitable if it creates an unaffordable cash-flow target.
- Add review questions covering emergency reserves, other debt, lender limits and alternative uses of cash.
- Keep the Mortgage Payoff Calculator as the primary action.

### Guardrail
Do not claim the article can produce a lender-accurate payoff quote.

---

# 14. LEARN3E-2 page briefs

## 14.1 `rental-yield-explained.html`

### Reader question
What are gross and net rental yield, how are they calculated, and what do they leave out?

### Required improvement

- Define gross yield with a simple formula.
- Add a worked example: property value/purchase price, annual gross rent, vacancy/management/maintenance-type costs and resulting illustrative net yield.
- State exactly which costs are included in the illustrative `net` figure.
- Explain that financing changes investor cash flow and cash-on-cash return but not the property's unlevered gross rental yield.
- Explain that yield excludes or incompletely captures capital appreciation, transaction costs, leverage, tax and concentration risk.
- Add a due-diligence checklist.
- Preserve Goal Planner as the established primary journey unless architecture is separately reviewed.

### Guardrail
Do not present a `good rental yield` threshold as universal.

## 14.2 `reit-vs-direct-property.html`

### Reader question
How does owning REIT securities differ from owning a property directly?

### Required improvement

- Preserve the structural comparison: ownership, control, diversification, liquidity, leverage, costs and management responsibility.
- Add a worked comparison using equal starting capital, without pretending the investment outcomes will be equal.
- Explain that direct-property leverage may sit at household level while REIT leverage can sit inside the entity.
- Clarify that listed REIT prices can move daily even when underlying property values move more slowly.
- Add a `Which questions matter before choosing the structure?` checklist.
- Keep tax discussion jurisdiction-specific.

### Guardrail
Do not conclude that one structure is better for all investors.

## 14.3 `what-is-a-reit.html`

### Reader question
What is a REIT, how does money flow through it, and what risks remain?

### Required improvement

- Explain the economic chain: investor capital -> REIT -> property/assets -> rent/operating income -> expenses/financing -> distributions and retained value.
- Add a simple illustrative income/distribution example without implying a fixed yield.
- Explain listed versus non-traded/private REIT structures at a high level and why liquidity/valuation differ.
- Explain distribution yield versus total return.
- Add a due-diligence checklist: property type, geography, debt, occupancy, management, fees, liquidity and legal structure.
- Preserve Retirement Planner as the established primary tool journey unless separately reviewed.

### Guardrail
Do not describe distributions as guaranteed income or assume every country's REIT regime has the same payout rule.

## 14.4 `real-estate-vs-stocks.html`

### Reader question
How do direct real estate and diversified equities differ as investment exposures?

### Required improvement

- Compare concentration, leverage, liquidity, transaction costs, income, diversification and time/management burden.
- Add a leverage-normalized example so a leveraged property gain is not casually compared with an unleveraged stock-index return.
- Explain why property price stability can partly reflect infrequent valuation rather than lower economic risk.
- Explain that broad equity funds can be diversified while a single stock is not; avoid treating `stocks` as automatically diversified.
- Add a portfolio-level checklist rather than a `winner` conclusion.
- Preserve Financial Independence Planner as the established primary tool journey unless separately reviewed.

### Guardrail
Do not forecast which asset class will outperform or recommend a universal allocation.

---

# 15. Protected Tool <-> Learn journeys

The following current journeys are protected unless a separate architecture change is explicitly approved.

## LEARN3E-1

All five mortgage overpayment / payoff education pages retain the Mortgage / Home Loan Payoff Calculator as their primary tool journey:

- `biweekly-fortnightly-mortgage-payments.html` -> `/mortgage-payoff-calculator/`
- `extra-mortgage-payments-early-vs-late.html` -> `/mortgage-payoff-calculator/`
- `monthly-extra-vs-annual-lump-sum-mortgage.html` -> `/mortgage-payoff-calculator/`
- `one-extra-mortgage-payment-a-year.html` -> `/mortgage-payoff-calculator/`
- `pay-off-mortgage-five-years-early.html` -> `/mortgage-payoff-calculator/`

The existing Mortgage Learn Education V1 runtime/bottom-return behavior must continue to work.

## LEARN3E-2

Preserve the current established primary journeys:

- `rental-yield-explained.html` -> Goal Planner;
- `reit-vs-direct-property.html` -> Goal Planner;
- `what-is-a-reit.html` -> Retirement Planner;
- `real-estate-vs-stocks.html` -> Financial Independence Planner.

These may receive contextual secondary links, but the primary top/bottom return route must not be changed casually.

## Maintenance-only journeys

The following are explicitly outside the rewrite scope and must remain intact:

- Mortgage Prepayment vs Investing -> MDC1A tool;
- Mortgage Refinance Break-Even -> MDC1B tool;
- Mortgage Rate Rise Payment Stress -> MDC1C tool;
- Rent vs Buy guide -> Rent vs Buy Calculator;
- HOME1 affordability trio -> Home Affordability Calculator.

Before implementation, central QA must be searched for every in-scope URL so no active selector or journey is missed.

---

# 16. Internal linking

Contextual links should clarify the decision path rather than create a dense cross-link mesh.

Recommended relationships:

- biweekly/fortnightly <-> one extra payment per year;
- early-vs-late <-> monthly-vs-annual lump sum;
- five-years-early -> Mortgage Payoff Calculator and extra-payment timing guides;
- mortgage overpayment guides -> Prepayment vs Investing only when the reader is comparing alternative uses of cash;
- rental yield <-> REIT vs direct property / real estate vs stocks where relevant;
- REIT definition <-> REIT vs direct property;
- real estate vs stocks <-> diversification / asset allocation guides;
- property pages -> Rent vs Buy only when the question concerns housing choice rather than investment ownership.

Do not add sitewide links solely to increase internal-link counts.

---

# 17. Static SEO, structured data and freshness

For each materially rewritten page:

- preserve the canonical URL;
- keep one static source `<title>` with distinct intent;
- keep one static source meta description within the current Carrowmont editorial range;
- preserve Article and Breadcrumb structured data;
- update Article `dateModified` only on the pages materially rewritten in that implementation batch;
- update sitemap `lastmod` only for the same changed public URLs;
- do not rely on runtime JavaScript metadata length as the search-facing source contract;
- do not modify publication dates to simulate new content;
- do not change unrelated sitemap URLs.

Publisher tests should validate search-facing metadata from raw HTML and visible localization from the browser DOM.

---

# 18. Sources and trust

Each improved page should use authoritative sources appropriate to the claim, favoring:

- central banks and financial regulators;
- government consumer-finance / housing bodies;
- tax authorities only for clearly local examples;
- recognized securities / REIT regulators and exchanges;
- lender documentation only for product-specific examples, not universal claims;
- academic or institutional research where it explains mortgage amortization, housing finance or investment structure.

Do not copy source wording. Explain the concept in Carrowmont's own plain language and identify where rules differ by jurisdiction.

---

# 19. SEARCH1 and query ownership

LEARN3E must preserve privacy-first SEARCH1 behavior:

- no search query in URLs;
- no query persistence in localStorage/session/cookies;
- no external search API;
- no public indexable search-result URLs;
- search inventory remains canonical-only.

If aliases are improved, they must route distinct intents to the correct existing page rather than create duplicate ownership.

Potential intent phrases to verify during implementation include:

- biweekly mortgage payments / fortnightly mortgage payments;
- extra mortgage payments early vs late;
- monthly extra mortgage payment vs lump sum;
- one extra mortgage payment a year;
- pay off mortgage five years early;
- rental yield / gross rental yield / net rental yield;
- REIT vs direct property;
- what is a REIT;
- real estate vs stocks.

Search fixtures should assert the intended page, not merely that a phrase appears somewhere in the index.

---

# 20. Accessibility and responsive behavior

Implementation must preserve:

- one H1;
- logical heading order;
- accessible link text;
- tables that remain readable on narrow screens;
- no horizontal overflow at 1280 / 390 / 360px;
- no nowrap rule that forces long mortgage/property labels off-screen;
- visible focus states;
- readable tables and callouts without hover-only information;
- no duplicate primary CTA caused by richer contextual linking.

Any numeric comparison that matters to the lesson must also exist as readable text/table content rather than only a chart or hover state.

---

# 21. QA strategy

## 21.1 Preflight before editing

Before implementing each sub-batch:

1. start from the latest clean post-merge Source Snapshot;
2. search central QA for every in-scope URL;
3. record every active Tool <-> Learn journey and exact primary CTA expectation;
4. inspect existing localization runtime bindings;
5. inspect SEARCH1 ownership/aliases;
6. inspect sitemap freshness and Article metadata;
7. only then edit public content.

## 21.2 Source-contract checks

Add permanent contracts for the pages materially changed in that batch, including:

- one LEARN3E enhancement marker per rewritten page;
- preservation of the existing shared Learn depth/rich module identity - do not create a second `data-cm-depth="1"` marker;
- approved primary tool journey;
- canonical and static SEO metadata;
- Article/Breadcrumb structured data;
- exact changed-URL freshness scope;
- required Learn localization script binding;
- no workflow files in the production release.

## 21.3 Browser QA

Browser tests should protect:

- direct answer / worked example / checklist presence;
- visible country-aware housing terminology;
- India / US / UK / Australia representative wording;
- mathematically consistent localized money examples;
- approved primary top and bottom tool journey;
- contextual links using scoped selectors that tolerate legitimate duplicate destinations;
- 1280 / 390 / 360 layout and overflow;
- no duplicate H1;
- no duplicate depth marker;
- raw static SEO checks separately from runtime localization.

Selectors must target the intended heading, section or CTA. Do not fail simply because useful editorial content links to the same destination more than once.

## 21.4 Worked-example fixtures

For mortgage examples, deterministic tests should recalculate the relevant amortization relationship rather than hard-code decorative text only.

For property examples, deterministic checks should verify arithmetic such as:

- gross rental yield;
- illustrative net-yield cost subtraction;
- comparable starting-capital arithmetic;
- leverage normalization where the example uses debt.

Tests must use the same scenario assumptions the article states.

---

# 22. Release sequence

## Specification release

This document only.

Expected repository:

1. `draw004.github.io`

No public page, QA runtime, sitemap or workflow changes.

After merge and green QA/Guard, take a fresh Source Snapshot.

## LEARN3E-1 implementation

Expected repositories:

1. `draw004.github.io`
2. `carrowmont-qa` last

Materially rewrite only the five mortgage overpayment / payoff pages in Section 2.

After merge:

- Pages/deployment green;
- Automated QA green;
- Multi-Repo Guard green;
- fresh Source Snapshot;
- selective Google re-indexing for only the five materially changed URLs;
- Bing/participating engines through IndexNow.

## LEARN3E-2 implementation

Start from the fresh post-LEARN3E-1 snapshot.

Expected repositories:

1. `draw004.github.io`
2. `carrowmont-qa` last

Materially rewrite only the four property-investment pages in Section 2.

Then repeat deployment, QA, Guard, fresh Snapshot and selective indexing.

---

# 23. Acceptance criteria

LEARN3E is complete only when:

- all nine scoped guides materially improve in clarity/usefulness;
- no maintenance-only page is rewritten without a genuine reason;
- all canonical URLs remain stable;
- established Tool <-> Learn routes remain intact;
- mortgage terminology localizes correctly by country;
- biweekly/fortnightly/twice-monthly distinctions are mathematically correct;
- mortgage worked examples disclose timing and assumptions;
- property pages distinguish yield, cash flow and total return;
- REIT/property comparisons disclose structure, leverage, liquidity and concentration;
- no country-specific tax/lender rule is presented as universal;
- examples remain mathematically consistent after localization;
- static SEO metadata remains valid and distinct;
- freshness applies only to materially changed pages;
- SEARCH1 ownership remains unambiguous;
- 1280 / 390 / 360 browser QA is green;
- source contract is green;
- Batch PR Publisher is green;
- live Automated QA and Multi-Repo Guard are green;
- a fresh source snapshot closes each implementation batch.

---

# 24. Final implementation principle

LEARN3E should make Carrowmont's housing and property education more useful by **clarifying decisions that are easy to oversimplify**.

The implementation should add explanation where it changes understanding, not where it merely increases length.

The reader should understand:

- why mortgage-payment timing can matter;
- why repayment frequency labels can be misleading;
- why lender rules can change implementation without changing the arithmetic;
- why extra mortgage payments compete with other uses of cash;
- why rental yield is only one part of a property return;
- why REITs and direct property are structurally different;
- why leverage and liquidity can make real estate comparisons look deceptively simple;
- and which Carrowmont tool is the correct next step for the decision they are actually trying to make.

That is the standard against which LEARN3E should be judged.
