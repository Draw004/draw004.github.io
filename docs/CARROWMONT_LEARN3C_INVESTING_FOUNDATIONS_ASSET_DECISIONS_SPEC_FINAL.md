# CARROWMONT LEARN3C - INVESTING FOUNDATIONS & ASSET DECISIONS

## Final Page-by-Page Editorial, Localization, Search, Internal Discovery, QA and Release Specification

**Status:** FINAL specification-only approval gate. This document does not change public article content.  
**Authoritative baseline:** Carrowmont Source Snapshot 95  
**Snapshot generated:** 2026-10-20T18:07:31Z  
**Main-site baseline commit:** `d8bc1b1f85093e9bddeccf1637cc117bf4b3c4e0`  
**Central QA baseline commit:** `326266fa83b95151f05836cc9ac4084212ef2071`  
**Baseline source contract:** 593 PASS / 0 FAIL  
**Specification date:** 20 October 2026  

---

# 1. Executive decision

LEARN3C will materially improve thirteen existing Carrowmont Learn guides covering recurring investing, compounding, investment timing, target funding, asset allocation, diversification and the basic difference between stocks and bonds.

The purpose is to help a reader understand how long-term investing works **before** they choose a product. The content must be useful to a beginner, but it must not oversimplify risk, fees, inflation, volatility or the difference between a smooth model and real markets.

LEARN3C is an education programme, not an investment-recommendation programme. It must not tell a reader which stock, bond, ETF, mutual fund, asset allocation or return assumption is right for them.

Every improved page must preserve:

- its existing canonical URL;
- Carrowmont's simple-language and people-first Learn standard;
- one universal educational core;
- country-aware words and monetary examples;
- India-specific SIP terminology where appropriate and Recurring Investment terminology elsewhere;
- accurate separation between contributions and modeled investment growth;
- explicit treatment of inflation, fees, volatility and uncertainty where relevant;
- stable search intent ownership so related articles support rather than compete with one another;
- Article and Breadcrumb structured data;
- accurate `dateModified` and sitemap `lastmod` only after substantive editorial change;
- privacy-first SEARCH1 behavior;
- the established Publisher -> QA -> Guard -> Snapshot release discipline.

Search visibility is a desired long-term result of stronger content. It must never be pursued through keyword stuffing, duplicated pages, artificial freshness or exaggerated investment claims.

---

# 2. Scope

The following thirteen existing pages are in scope:

1. `10000-sip-returns.html`
2. `sip-for-1-crore.html`
3. `step-up-sip-vs-regular-sip.html`
4. `compound-interest-monthly-contributions.html`
5. `investment-time-to-target.html`
6. `starting-investing-earlier.html`
7. `sip-during-market-fall.html`
8. `lump-sum-vs-monthly-investing.html`
9. `compounding-and-time.html`
10. `asset-allocation-explained.html`
11. `diversification-across-asset-classes.html`
12. `stocks-vs-bonds.html`
13. `how-much-should-i-invest-each-month.html`

The following newer investing pages are deliberately **maintenance-only** in LEARN3C because their current structure is already strong:

- `investing-for-beginners.html`
- `what-is-an-etf.html`
- `index-funds-explained.html`

They may receive a contextual inbound or outbound link if a LEARN3C journey genuinely requires it, but they must not be rewritten simply to increase change volume.

Gold, silver, REIT and direct-property articles remain outside LEARN3C. They belong to later asset-specific or macro/property review batches so this release does not mix foundational investing education with specialist assets.

---

# 3. Non-goals

LEARN3C must not:

- create new public URLs;
- change or redirect the thirteen existing canonical URLs;
- create country-specific doorway pages;
- publish raw machine translations;
- recommend a specific security, fund, provider or portfolio;
- label one asset allocation as universally conservative, balanced or aggressive without context;
- imply that a smooth assumed return is a forecast;
- imply that regular investing removes market risk;
- imply that diversification prevents losses;
- imply that bonds are always safe or stocks always outperform;
- use a historical return as a promised future return;
- silently ignore investment fees, taxes, inflation or sequence/market variability when they materially affect the lesson;
- change any calculator formula, report or shared plan-state behavior;
- change SEARCH1 privacy or query-storage behavior;
- add third-party search, AI or recommendation APIs;
- change homepage tool-card architecture;
- refresh dates on pages that did not receive substantive content improvement;
- use word count as a proxy for quality;
- add repeated keywords or filler paragraphs solely for search engines.

---

# 4. Reader outcome standard

Every materially improved LEARN3C guide must leave the reader with five things:

1. **A direct answer** - the main question is answered early in plain language.
2. **A mental model** - the reader understands what drives the outcome.
3. **A fair numerical illustration** - assumptions, contribution timing and modeled growth are transparent.
4. **A decision/review process** - the reader knows what to check before acting.
5. **A next step** - the correct Carrowmont calculator or related guide is obvious.

A reader should not leave believing that an illustration is a forecast, that a return assumption is guaranteed, or that one investment method is automatically best.

---

# 5. Plain-language and house-style rules

All pages remain subordinate to `.github/LEARN-ARTICLE-STANDARD.md` and `docs/CARROWMONT_LEARN_LOCALE1_GLOBAL_LEARN_CONTENT_LOCALIZATION_SPEC_FINAL_REV1.md`.

## 5.1 Writing

- Prefer common words over investment jargon.
- Define `return`, `volatility`, `asset allocation`, `diversification`, `bond duration`, `correlation`, `real return` and similar terms before relying on them.
- Keep paragraphs short enough to scan comfortably on a phone.
- Use tables for comparisons, not decoration.
- State calculation assumptions next to the result they create.
- Separate money contributed from modeled investment growth.
- Label every modeled return as illustrative.
- Use a range or sensitivity where one return assumption could create false precision.
- Explain benefits and limitations together.
- Avoid fear, urgency, shame and market-timing language.
- Do not describe a market decline as automatically an opportunity; explain the horizon and risk conditions that matter.
- Do not tell the reader what they “must buy.”

## 5.2 Direct answer

The first substantive answer should normally appear within the first 120 words of the article content.

It should:

- answer the exact H1 question;
- state the most important limitation;
- avoid a long history lesson before the answer;
- remain understandable without the rest of the page.

## 5.3 Capitalization

The current Carrowmont colon rule remains mandatory. The first alphabetic word after a colon is capitalized in titles, H1-H6 headings, card headings and standalone labels.

---

# 6. Global core and local relevance

Carrowmont's established rule remains:

> **One universal educational core, with country-aware terminology, money examples and genuine local caveats.**

## 6.1 Investment terminology

Where the concept is a recurring investment plan:

| Context | Preferred terminology |
|---|---|
| India | SIP / Systematic Investment Plan where natural |
| United States / Canada | Recurring investment / regular investing |
| United Kingdom / Ireland | Regular investing / regular investment |
| Australia / New Zealand | Regular investing / recurring investment |
| International | Recurring investment / regular investing |

The stable canonical URL may retain a historical `sip` slug. The visible global copy must not force non-India users to learn India-specific terminology before understanding the concept.

## 6.2 Money examples

- Use the existing Learn localization system.
- Use round illustrative values for the selected currency; do not imply live FX conversion.
- All values that belong to one deterministic example must use the **same localization scale** so the displayed outcome remains mathematically consistent across currencies.
- INR may use lakh/crore where natural.
- Non-INR examples must not use lakh/crore merely because the visitor is in India if another currency is selected.
- Never display a localized contribution amount while leaving the associated target, fee or output on a different scale.

## 6.3 Country-dependent investment rules

Tax wrappers, capital-gains rules, pension/retirement accounts, fund structures, investor compensation schemes, bond taxation, securities regulation and product availability differ by country.

Where relevant, the article should say plainly that these rules vary and direct readers to their local regulator/provider documentation rather than inventing a universal rule.

## 6.4 Language versions

LEARN3C does not create translated pages. Future genuine translations require human review, stable localized URLs, correct `lang`/`hreflang` relationships and the same editorial standard. Machine-generated doorway copies are prohibited.

---

# 7. Calculation and modeling standard

Investment education creates a high risk of false precision. Every LEARN3C numerical example must follow these rules:

1. State starting balance, contribution amount/frequency, horizon and assumed return.
2. State whether contributions are modeled at the beginning or end of each period when that distinction matters.
3. Keep nominal and inflation-adjusted values clearly separated.
4. Separate total contributions from modeled growth.
5. If fees are omitted, say so; if fees are included, state the assumption.
6. Do not silently include tax effects.
7. Use the same deterministic convention as the relevant Carrowmont calculator where the article is demonstrating that calculator's math.
8. Do not transform a smooth annual return assumption into a claim about the path markets will take.
9. For market-fall examples, use unit/price illustrations to teach cost averaging rather than predicting a recovery date.
10. For stock/bond examples, explain the source of risk rather than only comparing historical returns.

---

# 8. Query ownership and cannibalization control

These pages intentionally answer related but different questions.

| Page | Primary question / search intent | Must not become |
|---|---|---|
| `10000-sip-returns.html` | What can a fixed regular monthly contribution grow to over different horizons? | a generic “how to start investing” guide |
| `sip-for-1-crore.html` | What recurring contribution may be needed to reach a large long-term target? | a duplicate of Goal Planner or `how-much-should-i-invest-each-month.html` |
| `step-up-sip-vs-regular-sip.html` | What changes when contributions rise over time instead of staying fixed? | a claim that step-ups guarantee better returns |
| `compound-interest-monthly-contributions.html` | How do recurring contributions and compound growth work together? | a generic compounding-only article |
| `investment-time-to-target.html` | How long might a target take under stated assumptions? | a future-value calculator landing page |
| `starting-investing-earlier.html` | What changes when the same plan starts years earlier? | a guilt-based “start now or fail” article |
| `sip-during-market-fall.html` | What happens to fixed recurring purchases when market prices fall? | market-timing or buy-the-dip advice |
| `lump-sum-vs-monthly-investing.html` | How does timing differ when cash is available now versus invested in stages? | a blanket recommendation for lump sum or DCA |
| `compounding-and-time.html` | What is compounding and why does time magnify growth assumptions? | a duplicate of monthly-contribution mechanics |
| `asset-allocation-explained.html` | How should people think about mixing asset classes around goals, horizon and risk? | a model-portfolio recommendation page |
| `diversification-across-asset-classes.html` | What diversification actually means and what it cannot eliminate? | a generic asset-allocation duplicate |
| `stocks-vs-bonds.html` | How ownership and lending exposures differ? | a “which is better” investment recommendation |
| `how-much-should-i-invest-each-month.html` | How to work backward from a defined goal to a contribution amount? | a duplicate of the round-target SIP article |

The three newer foundation pages retain their own ownership:

- `investing-for-beginners.html` = broad start-here investing pathway;
- `what-is-an-etf.html` = ETF structure and risks;
- `index-funds-explained.html` = index-tracking fund mechanics.

---

# 9. Current baseline signals

The Snapshot 95 audit shows meaningful improvement opportunities rather than thin-content emergencies.

| Page | Approx. visible words | Tables | Authoritative source links | Main structural gap |
|---|---:|---:|---:|---|
| `10000-sip-returns.html` | 1,289 | 1 | 3 | no explicit worked-example/checklist structure |
| `sip-for-1-crore.html` | 1,635 | 1 | 3 | strong depth but needs clearer decision process and source depth |
| `step-up-sip-vs-regular-sip.html` | 1,350 | 1 | 3 | needs fair fixed-vs-increasing contribution example and checklist |
| `compound-interest-monthly-contributions.html` | 1,501 | 0 | 3 | no structured comparison/table and no dedicated worked example |
| `investment-time-to-target.html` | 1,142 | 1 | 3 | shorter page; needs sensitivity and review process |
| `starting-investing-earlier.html` | 1,224 | 1 | 3 | needs fair comparison separating extra contributions from extra time |
| `sip-during-market-fall.html` | 1,347 | 2 | 3 | needs stronger evidence and explicit worked example |
| `lump-sum-vs-monthly-investing.html` | 1,240 | 0 | 3 | no structured comparison; distinction between existing cash and future income needs emphasis |
| `compounding-and-time.html` | 1,168 | 1 | 3 | shorter foundation page; no worked example/checklist |
| `asset-allocation-explained.html` | 1,386 | 2 | 5 | good source depth; needs practical goal/risk workflow |
| `diversification-across-asset-classes.html` | 1,287 | 1 | 5 | good source depth; needs hidden-concentration example/checklist |
| `stocks-vs-bonds.html` | 1,222 | 2 | 4 | needs clearer interest-rate/credit-risk example and decision framing |
| `how-much-should-i-invest-each-month.html` | 1,405 | 1 | 3 | needs transparent goal-funding example and stronger evidence |

These counts are review signals only. LEARN3C must not pad pages merely to increase word count.

---

# 10. Implementation sequence

LEARN3C will be delivered in two controlled implementation releases with a fresh clean Source Snapshot between them.

## 10.1 LEARN3C-1 - Recurring investing, compounding and target timing

1. `10000-sip-returns.html`
2. `sip-for-1-crore.html`
3. `step-up-sip-vs-regular-sip.html`
4. `compound-interest-monthly-contributions.html`
5. `investment-time-to-target.html`
6. `starting-investing-earlier.html`
7. `sip-during-market-fall.html`

## 10.2 LEARN3C-2 - Portfolio decisions and investment planning

1. `lump-sum-vs-monthly-investing.html`
2. `compounding-and-time.html`
3. `asset-allocation-explained.html`
4. `diversification-across-asset-classes.html`
5. `stocks-vs-bonds.html`
6. `how-much-should-i-invest-each-month.html`

The second batch must start from a fresh post-LEARN3C-1 Source Snapshot rather than Snapshot 95.

---

# 11. Page specification - Regular monthly investment growth examples

## 11.1 Stable route

`/10000-sip-returns.html`

## 11.2 Search identity

Primary intent: **What can a fixed recurring monthly investment grow to over time?**

India may use SIP terminology in visible copy. Other markets should use recurring/regular investment terminology. The static search identity should remain globally understandable.

## 11.3 Direct answer

Explain that the result is driven mainly by contribution size, horizon and the assumed return, and that the illustration is not a forecast.

## 11.4 Required improvement

- Separate total contributions from modeled growth.
- Show why later years can add more modeled growth than early years.
- Compare at least two return assumptions rather than presenting one path as “the return.”
- Explain inflation and fees as forces that reduce real outcomes.
- Explain that contribution frequency and return compounding convention must be consistent with the calculator.

## 11.5 Worked example

Use one localized monthly contribution and show 10-, 15-, 20- and 25-year horizons. Show:

- total money contributed;
- modeled ending value under a lower/base assumption;
- modeled growth separately;
- a clear note that actual market returns will not arrive smoothly.

## 11.6 Checklist

Ask the reader to review goal, horizon, emergency liquidity, contribution affordability, return range, fees, inflation and annual review frequency.

## 11.7 Internal journey

Primary: SIP / Recurring Investment Calculator.  
Related: Investing for Beginners, Compound Interest With Monthly Contributions, Starting Earlier, Step-Up vs Fixed Contributions.

---

# 12. Page specification - Recurring investment needed for a large target

## 12.1 Stable route

`/sip-for-1-crore.html`

The legacy route remains stable even though the visible global article does not require non-India users to understand “crore.”

## 12.2 Search identity

Primary intent: **How much recurring investment may be needed to build a large long-term target?**

## 12.3 Direct answer

There is no single contribution amount; target, horizon, starting balance and assumed return determine the modeled contribution.

## 12.4 Required improvement

- Make target-funding math transparent.
- Distinguish a nominal target from a target defined in today's purchasing power.
- Show how an existing invested balance changes the required contribution.
- Explain why increasing the return assumption is not a safe way to “solve” an unaffordable plan.
- Explain how longer time, higher contribution or a smaller target change the result.

## 12.5 Worked example

Use a localized round target, two horizons and an optional existing balance. Show the required recurring contribution under at least two return assumptions and one inflation-aware target scenario.

## 12.6 Checklist

Target basis, current dedicated balance, horizon, contribution capacity, return range, inflation basis, fees, review date.

## 12.7 Internal journey

Primary: SIP / Recurring Investment Calculator.  
Secondary: Goal Planner, How Much Should You Invest Each Month?, Investment Time to Target.

---

# 13. Page specification - Increasing vs fixed recurring contributions

## 13.1 Stable route

`/step-up-sip-vs-regular-sip.html`

## 13.2 Search identity

Primary intent: **What changes when recurring contributions increase over time instead of staying fixed?**

## 13.3 Direct answer

Increasing contributions can raise total contributions and therefore modeled ending value, but the result is not evidence of a higher investment return.

## 13.4 Required improvement

- Compare like with like: same starting contribution, same horizon, same return assumption.
- Show total contributions under both strategies.
- Explain annual step-up timing and affordability.
- Explain that income may not rise predictably.
- Explain why a fixed plan that is actually sustainable can be better than an aggressive step-up that gets abandoned.

## 13.5 Worked example

Compare fixed recurring contributions with an illustrative annual percentage increase. Show total contributed and modeled ending value separately.

## 13.6 Checklist

Starting amount, planned increase, income stability, emergency reserve, competing goals, maximum affordable contribution, review trigger.

## 13.7 Internal journey

Primary: SIP / Recurring Investment Calculator.  
Related: Budget & Cash Flow Planner, Investing for Beginners, Starting Earlier.

---

# 14. Page specification - Compound interest with recurring contributions

## 14.1 Stable route

`/compound-interest-monthly-contributions.html`

## 14.2 Search identity

Primary intent: **How do recurring contributions and compound growth work together?**

## 14.3 Direct answer

The ending value combines money contributed over time with modeled growth on earlier balances and earlier growth. It is not simple multiplication.

## 14.4 Required improvement

- Add a simple structured table.
- Explain the difference between contribution frequency and compounding/return convention.
- Explain beginning-versus-end-of-period timing in plain language.
- Show contributions versus growth.
- Explain why fees, taxes and inflation can compound in the opposite direction.
- Keep formulas readable and define every variable.

## 14.5 Worked example

Use a small localized monthly contribution over a short horizon so the mechanics are easy to follow before showing a longer-horizon illustration.

## 14.6 Checklist

Starting balance, contribution timing, contribution frequency, assumed return, fees, inflation, horizon, calculator convention.

## 14.7 Internal journey

Primary: Compound Interest Calculator.  
Secondary: SIP / Recurring Investment Calculator, Compounding & Time, Index Funds Explained.

---

# 15. Page specification - Investment time to target

## 15.1 Stable route

`/investment-time-to-target.html`

## 15.2 Search identity

Primary intent: **How long could it take to reach an investment target under stated assumptions?**

## 15.3 Direct answer

Time to target is an output of the target, current balance, contribution path and assumed return. It is a scenario date, not a guaranteed countdown.

## 15.4 Required improvement

- Show sensitivity to monthly contribution and return assumption.
- Explain why contribution changes are usually more controllable than market returns.
- Explain what happens as the goal date gets close and the ability to absorb a market fall declines.
- Distinguish fixed-date goals from flexible-date goals.

## 15.5 Worked example

Use one target and compare at least three contribution/return combinations, clearly labeling which input changed.

## 15.6 Checklist

Target basis, current balance, contribution amount, horizon flexibility, investment risk, fees, inflation, milestone review dates.

## 15.7 Internal journey

Primary: SIP / Recurring Investment Calculator or Goal Planner depending on context.  
Related: How Much Should You Invest Each Month?, Starting Earlier, Asset Allocation.

---

# 16. Page specification - Starting investing earlier

## 16.1 Stable route

`/starting-investing-earlier.html`

## 16.2 Search identity

Primary intent: **How much difference can starting five or ten years earlier make?**

## 16.3 Direct answer

Starting earlier gives contributions more time to compound and may reduce the contribution needed for a fixed future target, but it does not guarantee better realized returns.

## 16.4 Required improvement

- Show two fair comparisons:
  1. same monthly contribution, different start date; and
  2. same total contribution, different timing where practical.
- Explicitly separate “more money contributed” from “more time invested.”
- Explain liquidity and high-cost debt before long-term investing.
- Avoid guilt or urgency language aimed at people who are starting later.

## 16.5 Worked example

Compare a five- or ten-year earlier start under the same illustrative return. Show total contributions and ending value separately.

## 16.6 Checklist

Emergency reserve, high-cost debt, horizon, contribution capacity, return range, fees, review schedule.

## 16.7 Internal journey

Primary: SIP / Recurring Investment Calculator.  
Related: Investing for Beginners, Compounding & Time, How Much Should You Invest Each Month?.

---

# 17. Page specification - Recurring investing during a market fall

## 17.1 Stable route

`/sip-during-market-fall.html`

## 17.2 Search identity

Primary intent: **What happens to fixed recurring purchases when market prices fall?**

## 17.3 Direct answer

A fixed contribution buys more units when the price is lower, which can reduce average purchase cost, but that does not remove asset risk or guarantee a profitable recovery.

## 17.4 Required improvement

- Add a transparent unit-price example.
- Explain average cost without promising profit.
- Separate an investor with a long horizon from someone whose goal is near.
- Explain when the plan itself should be reviewed: changed goal, changed risk capacity, lost income, unsuitable asset exposure, or near-term need.
- Explain recovery math after large losses.
- Strengthen authoritative investor-education sourcing.

## 17.5 Worked example

Use three or four purchase dates with changing unit prices and the same contribution. Show units purchased and average purchase cost. Do not invent a recovery date.

## 17.6 Checklist

Goal date, emergency fund, income stability, asset suitability, diversification, amount at risk, reason for changing the plan.

## 17.7 Internal journey

Primary: SIP / Recurring Investment Calculator.  
Related: Investing for Beginners, Diversification, Asset Allocation, Stocks vs Bonds.

---

# 18. Page specification - Lump sum vs monthly/staged investing

## 18.1 Stable route

`/lump-sum-vs-monthly-investing.html`

## 18.2 Search identity

Primary intent: **How does investment timing differ when cash is available now versus invested in stages?**

## 18.3 Direct answer

If the cash already exists, investing it immediately gives it more time in the market; staging the investment reduces immediate market exposure and may be easier behaviorally. Neither approach guarantees a better realized outcome.

## 18.4 Required improvement

- Add a side-by-side comparison table.
- Distinguish “cash already available” from “money earned each month.”
- Account for what happens to the uninvested cash during a staged plan.
- Discuss horizon, liquidity and risk capacity separately from expected value.
- Avoid presenting historical averages as a personal recommendation.

## 18.5 Worked example

Use the same total available capital and compare immediate investment with a fixed staged schedule under at least two market-path illustrations. Keep the math educational rather than predictive.

## 18.6 Checklist

Does the cash already exist, emergency reserve, horizon, loss tolerance/capacity, staging rule, uninvested cash treatment, taxes/fees where relevant.

## 18.7 Internal journey

Primary: Investing for Beginners / SIP or Compound Interest tool depending on the example.  
Related: Asset Allocation, Diversification, What Is an ETF?, Index Funds Explained.

---

# 19. Page specification - Compounding and time

## 19.1 Stable route

`/compounding-and-time.html`

## 19.2 Search identity

Primary intent: **What is compounding and why does time magnify growth assumptions?**

This page owns the foundation concept. `compound-interest-monthly-contributions.html` owns recurring-contribution mechanics.

## 19.3 Direct answer

Compounding means future growth can be applied to earlier growth as well as the starting amount. Time magnifies both the benefit of positive growth assumptions and the damage from fees or inflation.

## 19.4 Required improvement

- Explain simple versus compound growth without unnecessary algebra.
- Add one short deterministic example.
- Show how a small change in assumed return creates a large long-horizon difference without implying either path is forecast.
- Explain that inflation and fees also compound.
- Include a decision/review checklist rather than ending at the concept.

## 19.5 Worked example

Use one round localized starting amount with no contributions first, then a short recurring-contribution extension. Clearly separate nominal and real purchasing-power discussion.

## 19.6 Checklist

Horizon, return range, fees, inflation, contributions, liquidity, review cadence.

## 19.7 Internal journey

Primary: Compound Interest Calculator.  
Related: Compound Interest With Monthly Contributions, Starting Earlier, Investing for Beginners.

---

# 20. Page specification - Asset allocation

## 20.1 Stable route

`/asset-allocation-explained.html`

## 20.2 Search identity

Primary intent: **What is asset allocation and why does it matter?**

## 20.3 Direct answer

Asset allocation is the decision about how much of a portfolio is exposed to different asset classes. It should begin with the goal, time horizon, liquidity needs and ability to tolerate loss—not recent performance.

## 20.4 Required improvement

- Explain risk tolerance versus risk capacity in simple language without creating a second page inside this article.
- Explain the role different asset classes may play without prescribing percentages.
- Add a goal-based example showing why two goals for the same person may reasonably have different mixes.
- Explain rebalancing as maintenance, not market prediction.
- Explain that labels such as “conservative” vary by provider and should not be treated as universal definitions.

## 20.5 Worked example

Use two hypothetical goals with different horizons and liquidity needs. Discuss how the required risk budget differs without recommending exact allocations.

## 20.6 Checklist

Goal, horizon, liquidity, loss capacity, emotional tolerance, concentration, rebalancing rule, fees/tax context.

## 20.7 Internal journey

Primary educational path: Investing for Beginners.  
Related: Diversification, Stocks vs Bonds, What Is an ETF?, Index Funds Explained.

---

# 21. Page specification - Diversification across asset classes

## 21.1 Stable route

`/diversification-across-asset-classes.html`

## 21.2 Search identity

Primary intent: **What does diversification actually mean and what risk can it not remove?**

## 21.3 Direct answer

Diversification spreads exposure across investments whose risks are not identical. It can reduce concentration risk but cannot guarantee gains or remove broad market losses.

## 21.4 Required improvement

- Explain diversification within an asset class and across asset classes.
- Explain correlation in plain language.
- Add a hidden-concentration example: several funds can still own many of the same securities or sectors.
- Explain geographic, sector, currency and employer/industry concentration where relevant.
- Explain that owning more line items does not automatically mean more diversification.

## 21.5 Worked example

Show two hypothetical portfolios with the same number of holdings but different underlying concentration. Use exposure categories rather than named securities.

## 21.6 Checklist

Underlying holdings, sector/geography, asset classes, currency exposure, employer/property concentration, correlation, rebalancing.

## 21.7 Internal journey

Related: Asset Allocation, Stocks vs Bonds, ETFs, Index Funds, Investing for Beginners.

---

# 22. Page specification - Stocks vs bonds

## 22.1 Stable route

`/stocks-vs-bonds.html`

## 22.2 Search identity

Primary intent: **What is the difference between stocks and bonds?**

## 22.3 Direct answer

Stocks generally represent ownership in a business; bonds generally represent lending to an issuer. Their risks and return drivers differ, which is why they may play different roles in a portfolio.

## 22.4 Required improvement

- Explain ownership versus lending.
- Explain dividends and coupon/interest payments without implying either is guaranteed.
- Explain bond duration/interest-rate sensitivity in plain language.
- Explain credit/default risk and inflation risk.
- Explain why “bonds are safe” and “stocks always win long term” are both overbroad statements.
- Keep the article global; do not assume one country's bond market or tax rules.

## 22.5 Worked example

Use a simple bond-price sensitivity illustration and a separate stock-ownership example. Avoid named securities and forecasts.

## 22.6 Checklist

Goal, horizon, income need, loss capacity, credit quality, duration, diversification, inflation, fees/tax context.

## 22.7 Internal journey

Related: Asset Allocation, Diversification, What Is an ETF?, Index Funds Explained, Investing for Beginners.

---

# 23. Page specification - How much to invest each month

## 23.1 Stable route

`/how-much-should-i-invest-each-month.html`

## 23.2 Search identity

Primary intent: **How much should you invest each month to reach a defined financial goal?**

This page owns the general planning process. `sip-for-1-crore.html` owns a large round-target illustration.

## 23.3 Direct answer

The contribution should be worked backward from the goal amount, time available, current dedicated investments and a cautious range of return assumptions. It is an output of the plan, not a universal percentage of income.

## 23.4 Required improvement

- Show the target-funding relationship transparently.
- Explain future-money versus today's-money goal values.
- Explain how current investments reduce the remaining funding gap.
- Show three levers: contribution, time and target size before suggesting a higher return assumption.
- Explain why near-term goals may require lower-risk assets even if that means a higher contribution.

## 23.5 Worked example

Use a localized future target, existing balance and horizon. Show the monthly contribution under a lower and higher illustrative return, and show the effect of extending the horizon.

## 23.6 Checklist

Goal amount/basis, target date, current balance, monthly capacity, risk capacity, inflation, fees, review schedule.

## 23.7 Internal journey

Primary: Goal Planner and SIP / Recurring Investment Calculator.  
Related: Investment Time to Target, Starting Earlier, Compounding & Time.

---

# 24. Shared internal-link architecture

## 24.1 Minimum discovery

Each materially improved page should have:

- the Learn hub link;
- at least one relevant calculator/tool path;
- at least three contextual inbound links from genuinely related pages where practical;
- three related-guide cards where practical;
- no irrelevant sitewide link additions solely to increase link count.

## 24.2 Cluster gateways

The main cluster gateways are:

- `investing-for-beginners.html` for broad beginner navigation;
- SIP / Recurring Investment Calculator for recurring-investment math;
- Compound Interest Calculator for compound-growth mechanics;
- Goal Planner for goal funding;
- `asset-allocation-explained.html` for portfolio construction concepts.

## 24.3 Anchor text

Use descriptive natural anchors such as:

- `understand asset allocation`;
- `see how recurring contributions compound`;
- `compare stocks and bonds`;
- `review diversification`;
- `work backward from a goal`.

Do not repeat exact-match keyword anchors mechanically.

---

# 25. Search presentation and freshness

## 25.1 Stable identity

- Preserve each canonical URL.
- Preserve `index,follow`.
- Keep one H1.
- Use unique titles and descriptions.
- Keep titles and descriptions within current Carrowmont editorial guardrails.
- Preserve Article and Breadcrumb JSON-LD.

## 25.2 Title/H1 refinement

A title or H1 may be refined only when it improves clarity or global terminology. It must not be changed merely to insert more keywords.

The visible India/non-India terminology may localize through existing runtime mechanisms while the static search title remains globally understandable.

## 25.3 Freshness

Only pages receiving substantive editorial improvements may receive the new review date and sitemap `lastmod`.

Do not change dates for:

- contextual-link-only edits that do not materially change the guide;
- unchanged maintenance-only pages;
- unrelated Learn pages;
- the full sitemap as a batch.

## 25.4 SEARCH1

Update the local search index after each implementation batch. The total public-page count remains unchanged because LEARN3C creates no new URLs.

Useful aliases may include natural variants such as:

- SIP / recurring investment / regular investing;
- step-up SIP / increasing contribution;
- compound interest / compounding;
- asset allocation / portfolio mix;
- diversification / concentration;
- stocks vs bonds / shares vs bonds;
- lump sum vs monthly investing / staged investing / dollar-cost averaging where conceptually accurate.

Do not use aliases to misrepresent a page as answering a different question.

## 25.5 Indexing follow-through

After each material implementation batch:

1. allow the existing IndexNow process to notify Bing and participating engines;
2. inspect/request indexing in Google Search Console for the materially rewritten URLs;
3. do not submit unchanged or maintenance-only pages merely to create activity;
4. monitor coverage, impressions and query ownership rather than expecting immediate ranking changes.

---

# 26. Evidence and sourcing

Every materially improved article must use at least four relevant authoritative sources where the subject warrants factual or investor-protection claims.

Preferred source classes include:

- investor/regulatory education bodies such as Investor.gov/SEC, FINRA, FCA/MoneyHelper, ASIC Moneysmart, SEBI/NISM and equivalent national bodies;
- central banks or official statistical agencies where inflation/interest-rate context is required;
- recognized investor-education or research institutions for diversified portfolio concepts;
- original source material for formulas or conventions where practical.

Rules:

- do not fabricate return histories;
- do not use marketing pages as primary evidence when a regulator or original source is available;
- country-specific product/tax claims require a clearly identified jurisdiction;
- worked examples may be internally calculated and need not cite an external source, but assumptions must be explicit;
- no source should be cited merely because it contains a target keyword.

---

# 27. Accessibility and visual requirements

Every changed page must pass at:

- 1280px desktop;
- 390px mobile;
- 360px mobile.

Requirements include:

- no horizontal page overflow;
- tables contained in their intended responsive/scroll wrapper;
- readable H1 and body text;
- no oversized hero pushing the direct answer far below the first viewport;
- visible focus treatment on interactive controls;
- correct heading order;
- meaningful link text;
- comparison tables remain understandable on mobile;
- localized numbers/terms do not break layout.

---

# 28. Privacy and analytics boundaries

LEARN3C must not introduce:

- user accounts;
- personal-profile storage;
- investment holdings storage;
- third-party recommendation APIs;
- external AI calls;
- search terms in URLs, cookies, local storage or analytics;
- financial example values in URLs;
- new analytics providers.

Existing approved aggregate analytics behavior remains unchanged.

---

# 29. Production file scope

A LEARN3C implementation release may change only files genuinely required for the approved batch, normally including:

- the approved article HTML files;
- `learn.html` only when category copy or contextual discovery materially benefits;
- `sitemap.xml` for changed-page `lastmod` values only;
- `data/carrowmont-search-pages.json` and generated `data/carrowmont-search-index.json` when search metadata/aliases change;
- `learn-localization.js` only when an approved shared localization capability is required;
- relevant implementation documentation;
- central QA/source-contract files required to protect the new standard.

Do not touch calculators, homepage core cards, workflows or unrelated Learn pages unless a separately approved defect requires it.

---

# 30. QA acceptance criteria

## 30.1 Page identity and SEO

For every changed page:

- self-canonical is correct;
- `index,follow` remains present;
- exactly one H1;
- unique title and meta description;
- Article JSON-LD parses;
- Breadcrumb JSON-LD parses;
- visible review date matches `dateModified`;
- sitemap contains the canonical URL;
- sitemap `lastmod` matches the substantive review date;
- no unrelated sitemap dates change.

## 30.2 Editorial structure

For every materially rewritten page:

- direct answer appears early;
- visible guide text stays above the current 1,000-word regression floor unless a separately approved exception exists;
- at least one worked example/structured illustration where numbers improve understanding;
- at least one decision/review checklist;
- benefits and limitations are both present;
- at least four authoritative source links where factual claims warrant them;
- FAQ answers genuine follow-up questions rather than merely repeating headings;
- no duplicate/empty heading blocks;
- colon capitalization standard passes.

## 30.3 Modeling integrity

- localized values within one deterministic example preserve the same proportional math;
- contributions and modeled growth are separated where relevant;
- return assumptions are labeled illustrative;
- nominal and real values are not mixed;
- fees/taxes/inflation treatment is stated where relevant;
- no smooth-return example is described as a forecast;
- recurring-investment market-fall examples do not predict recovery.

## 30.4 Localization

Test at minimum representative India/INR and non-India profiles, including US/USD and one UK/AU/NZ profile where terminology differs.

Verify:

- SIP versus recurring/regular investment terminology;
- localized monetary examples;
- lakh/crore not leaking into non-INR output;
- all values in a single example scale consistently;
- country caveats do not silently become universal rules.

## 30.5 Internal discovery

- related links resolve;
- tool links resolve;
- no accidental self-links in related cards;
- no unrelated link dumping;
- SEARCH1 returns the correct primary page for core aliases.

## 30.6 Layout and accessibility

- 1280/390/360 layouts are overflow-safe;
- responsive tables do not widen the page;
- the direct answer is not buried by an oversized hero;
- keyboard/focus behavior remains intact;
- localized labels do not clip.

## 30.7 Privacy and regression

- no new third-party application-data requests;
- SEARCH1 privacy contract remains intact;
- no calculator formula/report behavior changes;
- existing Learn and tool routes remain valid;
- central source contract remains green;
- Publisher browser QA remains green;
- live Automated QA remains green;
- Multi-Repo Guard remains green.

---

# 31. Future evergreen investing gaps - explicitly not part of LEARN3C

The audit confirms three globally useful evergreen subjects that deserve a later **new-page** decision rather than being forced into existing URLs:

1. **Real vs nominal investment return** - how inflation changes what an investment gain means in purchasing-power terms.
2. **Investment fees and long-term compounding** - how recurring fees reduce ending wealth over long horizons.
3. **Risk tolerance vs risk capacity** - why willingness to accept volatility is different from the financial ability to absorb loss.

These topics may become a future LEARN2B/LEARN4 specification after LEARN3C stabilizes. LEARN3C may explain these concepts contextually, but it must not create hidden duplicate pages or change an existing article's primary search intent to capture them.

---

# 32. Release and merge process

For the specification release:

1. Start from Snapshot 95.
2. Add this specification document only.
3. Run the current source contract.
4. Package the exact reviewed file with `release-manifest.json`.
5. Run Batch PR Publisher.
6. Expect one PR for `draw004.github.io` only.
7. Review and merge manually.
8. Run normal post-merge QA/Guard.
9. Take a fresh Source Snapshot.
10. Build LEARN3C-1 from that new snapshot.

For each implementation batch:

1. Build only the approved pages and support files.
2. Run static/hash/JSON-LD/sitemap/search-index checks.
3. Run deterministic localized-example tests.
4. Run 1280/390/360 browser QA.
5. Run Publisher.
6. Merge main-site PR before central QA.
7. Confirm Pages.
8. Run Automated QA.
9. Run Multi-Repo Guard.
10. Take a fresh Source Snapshot.
11. Request Google indexing only for materially rewritten pages; rely on IndexNow for Bing/participating engines.

Central QA always merges last when QA changes are part of an implementation release.

---

# 33. Definition of done for LEARN3C

LEARN3C is complete only when:

- this specification is approved and merged;
- a fresh post-spec Source Snapshot is taken;
- LEARN3C-1 is implemented from that snapshot and passes all gates;
- a fresh post-LEARN3C-1 Source Snapshot is taken;
- LEARN3C-2 is implemented from that snapshot and passes all gates;
- all thirteen pages preserve their canonical routes and distinct search intent;
- the three strong LEARN2A investing pages remain stable unless a genuine defect is found;
- examples are mathematically consistent across localization profiles;
- simple-language, sourcing, checklist and worked-example standards are met;
- no investment recommendation or forecast language is introduced;
- only materially changed pages receive freshness updates;
- SEARCH1 remains privacy-first and query ownership stays clear;
- Google indexing is requested for the materially rewritten pages after each batch;
- IndexNow runs through the established automated process;
- final Automated QA and Multi-Repo Guard are green;
- a fresh final Source Snapshot becomes the next authoritative baseline.

---

# 34. Final product principle

LEARN3C should teach investing in a way that makes people **less dependent on slogans**.

A reader should understand that:

- time matters, but return assumptions are not promises;
- recurring contributions and compound growth are different parts of the result;
- investing more is not the same thing as earning a higher return;
- diversification reduces some risks but not all risk;
- stocks and bonds are different economic exposures, not simply “high risk” and “low risk” labels;
- allocation should reflect goals, horizon, liquidity and the ability to absorb loss;
- market falls do not automatically make an investment suitable;
- the best educational outcome is a clearer decision process, not a product recommendation.

That is the standard by which the implementation should be judged.
