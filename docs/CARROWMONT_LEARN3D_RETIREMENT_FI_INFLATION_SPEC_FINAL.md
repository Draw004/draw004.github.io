# CARROWMONT LEARN3D - RETIREMENT, FINANCIAL INDEPENDENCE & INFLATION

## Final Page-by-Page Editorial, Localization, Search, Internal Discovery, QA and Release Specification

**Status:** FINAL specification-only approval gate. This document does not change public article content.  
**Authoritative baseline:** Carrowmont Source Snapshot 98  
**Snapshot generated:** 2026-10-21T10:04:35Z  
**Main-site baseline commit:** `d71fba6efccd0730165263e2c83e1cee78c267a1`  
**Central QA baseline commit:** `cd7ac7a9b32ff370a1a2eb0e84f0297f76be3ecd`  
**Baseline source contract:** 608 PASS / 0 FAIL  
**Specification date:** 21 October 2026

---

# 1. Executive decision

LEARN3D will materially improve sixteen existing Carrowmont Learn guides covering retirement readiness, retirement income, withdrawal risk, financial independence and inflation/purchasing power.

The purpose is to help readers answer long-horizon questions in simple language without turning planning assumptions into promises. Retirement and financial independence are especially vulnerable to false precision because small changes in inflation, return, spending, withdrawal rate, retirement length and sequence of returns can materially change the result.

LEARN3D must therefore teach the reader how the moving parts fit together rather than presenting one target, age, benchmark or withdrawal rate as universally correct.

Every improved page must preserve:

- its existing canonical URL;
- Carrowmont's people-first Learn article standard;
- one universal educational core;
- country-aware terminology and monetary examples;
- accurate separation between today's money and future nominal money;
- accurate separation between nominal and real returns;
- explicit uncertainty around retirement length and investment paths;
- stable query ownership so related pages support rather than compete with one another;
- all existing Tool <-> Learn journeys and older QA contracts;
- Article and Breadcrumb structured data;
- truthful `dateModified` and sitemap `lastmod` only after substantive editorial change;
- privacy-first SEARCH1 behavior;
- Publisher -> QA -> Guard -> Snapshot release discipline.

Search visibility is a desired long-term result of better content. It must not be pursued through keyword stuffing, duplicate pages, artificial freshness, unsupported financial claims or mass page creation.

---

# 2. Scope

The following sixteen existing Learn pages are in scope.

## LEARN3D-1 - Retirement readiness, income and withdrawal risk

1. `retirement-savings-by-age.html`
2. `retirement-monthly-income-needed.html`
3. `retirement-expenses.html`
4. `inflation-and-retirement-planning.html`
5. `how-long-will-retirement-savings-last.html`
6. `4-percent-rule-retirement.html`
7. `sequence-of-returns-risk.html`
8. `longevity-risk-retirement.html`

## LEARN3D-2 - Financial independence and inflation foundations

9. `financial-independence-number.html`
10. `when-can-i-reach-financial-independence.html`
11. `coast-fire-explained.html`
12. `inflation-value-of-money-over-time.html`
13. `future-cost-of-expenses.html`
14. `inflation-purchasing-power-savings.html`
15. `inflation-purchasing-power.html`
16. `todays-money-vs-future-money.html`

A fresh clean Source Snapshot is required between LEARN3D-1 and LEARN3D-2.

---

# 3. Maintenance-only pages in this programme

The following newer or already-strong pages remain maintenance-only unless a genuine defect is found:

- `how-much-money-do-i-need-to-retire.html` - already the established primary Retirement Planner education bridge and currently one of the deeper retirement guides;
- `financial-independence-number-by-spending.html` - newer decision-support tool/page with distinct first-pass target ownership;
- `4-percent-rule-stress-test.html` - newer decision tool; it must remain separate from the explanatory 4% Rule Learn guide;
- `what-is-swp-systematic-withdrawal-plan.html` - newer SWP-specific educational guide;
- the live Retirement Withdrawal / Drawdown calculator and its product pages.

These pages may receive contextual inbound links from LEARN3D pages, but they must not be rewritten simply to increase change volume.

---

# 4. Controlling Carrowmont standards

Implementation must inherit, not replace:

- `.github/LEARN-ARTICLE-STANDARD.md`;
- `docs/CARROWMONT_LEARN_LOCALE1_GLOBAL_LEARN_CONTENT_LOCALIZATION_SPEC_FINAL_REV1.md`;
- current CORE6 Tool <-> Learn integration contracts;
- current RETIRE1 withdrawal/drawdown discovery contracts;
- SEARCH1 privacy and search-index rules;
- current colon-capitalization rule;
- current Article/Breadcrumb structured-data conventions;
- current sitemap/IndexNow freshness discipline;
- current 1280 / 390 / 360 responsive QA discipline.

If this specification conflicts with an already-active architecture or QA contract, the older active contract wins unless the conflict is explicitly reviewed and approved before implementation.

This rule is mandatory after the LEARN3C reconciliation experience.

---

# 5. Non-goals

LEARN3D must not:

- create new public URLs;
- redirect or rename the sixteen canonical URLs;
- create country-specific doorway pages;
- create raw machine-translated copies;
- tell a reader the exact age at which they should retire;
- present an age-based retirement benchmark as a pass/fail rule;
- present 4% or any other withdrawal rate as universally safe;
- treat a deterministic retirement projection as a forecast;
- assume one life expectancy or retirement horizon is correct for everyone;
- assume one inflation rate applies to every household expense;
- silently mix today's-money and future-money values;
- silently mix nominal returns and real returns;
- assume Social Security, State Pension, EPF, superannuation, CPP, pensions, tax wrappers or other country systems are universal;
- recommend a specific fund, security, pension product, annuity or provider;
- create a country tax engine inside Learn content;
- change any calculator formula, report or shared-plan-state behavior;
- change SEARCH1 query storage, privacy or external-network behavior;
- add third-party search or AI services;
- change homepage core-tool architecture;
- refresh dates on pages that did not receive material editorial improvement;
- use word count as a proxy for quality;
- pad pages with repeated keywords or generic retirement advice.

---

# 6. Reader outcome standard

Every materially improved LEARN3D guide must leave the reader with five things:

1. **A direct answer** - answer the page's main question early and plainly.
2. **A mental model** - explain what variables actually drive the result.
3. **A transparent illustration** - show assumptions and what changes when they move.
4. **A practical review process** - give the reader questions or a checklist to use on their own plan.
5. **A next step** - make the relevant Carrowmont tool or related guide obvious.

The reader should not leave believing that a smooth assumed return, one benchmark, one withdrawal rate, one inflation number or one retirement age is a promise.

---

# 7. Plain-language and house-style rules

## 7.1 Writing

- Prefer common words over retirement-industry jargon.
- Define terms before relying on them: corpus, drawdown, withdrawal rate, sequence risk, longevity risk, real return, nominal return, purchasing power and FI/FIRE.
- Keep paragraphs short enough to scan on a phone.
- Use tables for comparisons and scenarios, not decoration.
- Explain benefits and limitations together.
- Avoid fear, shame and urgency language about being "behind" on retirement.
- Do not tell readers they have "failed" because they do not match an age benchmark.
- Do not describe retirement as one fixed spending level from retirement day until death.
- Do not imply that lower spending is always the correct answer.
- Explain uncertainty without making the article vague.

## 7.2 Direct answer

The first substantive answer should normally appear within the first 120 words of article content.

It should:

- answer the exact H1 question;
- state the most important limitation;
- avoid a long history lesson before the answer;
- remain useful even if the reader stops there.

## 7.3 Capitalization

The current Carrowmont colon rule remains mandatory in titles, H1-H6 headings, card headings, chart titles and standalone labels. Do not force unnatural capitalization inside ordinary prose, quotations, formulas, URLs or official source titles.

---

# 8. Global core and local relevance

Carrowmont's established rule remains:

> One universal educational core, with country-aware terminology, monetary examples and genuine local caveats.

## 8.1 Retirement terminology

Use familiar language without changing the underlying lesson.

| Context | Preferred wording where natural |
|---|---|
| India | retirement corpus / retirement savings; SWP where specifically relevant |
| United States / Canada | retirement savings / retirement portfolio; withdrawals |
| United Kingdom / Ireland | retirement savings / pension savings where context genuinely requires pension terminology; drawdown/withdrawals |
| Australia / New Zealand | retirement savings; superannuation only when the subject is specifically that system; withdrawals/drawdown |
| International | retirement savings / retirement portfolio; withdrawals/drawdown |

Do not use `corpus` as the only explanation for global readers. If retained for India familiarity, explain it as retirement savings or portfolio value.

## 8.2 Financial-independence terminology

`Financial independence` and `FI` may be used globally. `FIRE` should be explained rather than assumed. Coast FIRE must be described as a planning milestone under assumptions, not a product or guarantee.

## 8.3 Money examples

- Use the existing Learn localization system.
- Use round illustrative values for the selected currency, not live FX conversion.
- All values belonging to one scenario must use the same proportional localization scale.
- INR may use lakh/crore where natural.
- Non-INR examples must not leak lakh/crore merely because the selected country is India.
- Currency selection changes presentation, not the financial relationship.

## 8.4 Country-dependent retirement rules

Public pensions, retirement-account access ages, tax rules, mandatory contributions, annuity rules, healthcare systems and investor-protection arrangements differ materially by country.

LEARN3D must not invent a universal rule. Where a local rule matters, explain that it varies and direct readers to their local government/regulator/provider documentation.

---

# 9. Retirement and FI modeling standard

Every numerical example involving retirement or FI must state the assumptions that create the result.

Where relevant, state:

- starting portfolio or savings;
- recurring contribution amount/frequency;
- current age only if genuinely necessary;
- target age or horizon;
- spending/withdrawal amount;
- assumed nominal return;
- inflation assumption;
- whether values are in today's money or future nominal money;
- fees/taxes if included, or explicitly say they are omitted;
- withdrawal timing convention when it matters.

Rules:

1. Do not show a smooth annual-return line as though markets follow that path.
2. Do not call a withdrawal rate "safe" without qualification.
3. Do not use an age benchmark to calculate a personal target without explaining its limitations.
4. Separate portfolio-funded spending from income expected from pensions or other sources.
5. Distinguish accumulation from withdrawal/decumulation.
6. When sequence risk is the lesson, show at least two return orders with the same or clearly comparable long-run assumptions.
7. When longevity is the lesson, vary the horizon rather than pretending to predict lifespan.
8. Keep examples mathematically consistent after localization.
9. Where a Carrowmont calculator implements the same concept, align the article explanation with that calculator's methodology.

---

# 10. Inflation and purchasing-power standard

Inflation content must preserve four distinctions:

1. **Today's money** - values expressed in current purchasing-power terms.
2. **Future nominal money** - the number of currency units expected at a later date under an inflation assumption.
3. **Nominal return** - growth before subtracting inflation.
4. **Real return** - growth after accounting for inflation, using the appropriate relationship rather than simple subtraction when precision matters.

Additional rules:

- General inflation measures do not perfectly represent every household's personal cost experience.
- Different categories can rise at different rates.
- A savings account can grow in nominal terms while losing purchasing power if its after-fee/after-tax growth is below inflation.
- A future-cost illustration is not a price forecast.
- Do not mix a today's-money spending input with a future nominal portfolio output without conversion/explanation.

---

# 11. Search-intent ownership

Each page must answer one primary question. Related pages should link to one another rather than repeat the same article under different titles.

| Page | Primary question / search intent | Must not become |
|---|---|---|
| `retirement-savings-by-age.html` | How should age-based retirement savings benchmarks be used as a checkpoint? | a universal required balance by age |
| `retirement-monthly-income-needed.html` | How can expected retirement spending be turned into a monthly income need? | a generic retirement-target article |
| `retirement-expenses.html` | Which expenses may end, continue, rise or begin in retirement? | a duplicate monthly-income article |
| `inflation-and-retirement-planning.html` | How does inflation affect retirement spending before and after retirement begins? | a generic inflation explainer |
| `how-long-will-retirement-savings-last.html` | What determines retirement savings longevity under withdrawals? | a guaranteed depletion-date calculator |
| `4-percent-rule-retirement.html` | What is the 4% rule, how is it applied, and what are its limits? | the 4% Rule Stress Test tool page |
| `sequence-of-returns-risk.html` | Why can return order matter once withdrawals begin? | a generic volatility article |
| `longevity-risk-retirement.html` | What changes when retirement lasts longer than assumed? | a life-expectancy prediction page |
| `financial-independence-number.html` | What does a financial-independence number mean and what assumptions create it? | the FI Number by Spending tool |
| `when-can-i-reach-financial-independence.html` | What determines the modeled time to FI? | a promise of a retirement/FI date |
| `coast-fire-explained.html` | What does Coast FIRE mean and how is it different from full FI? | advice to stop saving |
| `inflation-value-of-money-over-time.html` | How does inflation change the purchasing power of a fixed amount over time? | a future-cost-of-expenses duplicate |
| `future-cost-of-expenses.html` | How can today's expense amount be translated into a future nominal cost? | a general purchasing-power article |
| `inflation-purchasing-power-savings.html` | How can inflation reduce the real value of savings? | an investment-return recommendation page |
| `inflation-purchasing-power.html` | What are inflation and purchasing power, and how are they connected? | a calculator landing page |
| `todays-money-vs-future-money.html` | What is the difference between today's-money and future-money values in a plan? | another general inflation article |

Maintenance-only ownership remains separate:

- `how-much-money-do-i-need-to-retire.html` = broad retirement-target planning bridge;
- `financial-independence-number-by-spending.html` = transparent first-pass FI target tool;
- `4-percent-rule-stress-test.html` = scenario/stress-testing tool;
- `what-is-swp-systematic-withdrawal-plan.html` = SWP-specific mechanics;
- Retirement Withdrawal / Drawdown Calculator = deterministic withdrawal-path modeling.

---

# 12. Current Snapshot 98 quality signals

These counts are review signals only. They must not be used as reasons to pad articles.

| Page | Approx. visible words | Tables | Authority links | Worked/example H2 | Checklist/review H2 | Main opportunity |
|---|---:|---:|---:|---:|---:|---|
| `retirement-savings-by-age.html` | 1,527 | 1 | 4 | 0 | 1 | add a fair benchmark-vs-personal-plan illustration and stronger benchmark caveats |
| `retirement-monthly-income-needed.html` | 1,199 | 1 | 4 | 0 | 0 | deepen spending-to-income method, other-income treatment and checklist |
| `retirement-expenses.html` | 1,230 | 1 | 5 | 1 | 0 | strengthen expense layers, timing changes and decision checklist |
| `inflation-and-retirement-planning.html` | 1,163 | 1 | 5 | 0 | 0 | deepen pre/post-retirement inflation example and nominal/real clarity |
| `how-long-will-retirement-savings-last.html` | 1,272 | 1 | 5 | 0 | 0 | make longevity drivers, sequence uncertainty and withdrawal-calculator journey clearer |
| `4-percent-rule-retirement.html` | 1,405 | 1 | 5 | 0 | 0 | add transparent initial-withdrawal example and historical-rule limitations |
| `sequence-of-returns-risk.html` | 1,476 | 3 | 5 | 0 | 0 | add explicit paired-path worked example and mitigation review questions |
| `longevity-risk-retirement.html` | 1,307 | 1 | 6 | 1 | 0 | add horizon sensitivity and practical longevity checklist |
| `financial-independence-number.html` | 1,507 | 2 | 5 | 0 | 0 | separate target mechanics from time-to-FI and add assumption checklist |
| `when-can-i-reach-financial-independence.html` | 1,197 | 1 | 5 | 0 | 0 | deepen target/timeline sensitivity and distinguish milestone from forecast |
| `coast-fire-explained.html` | 1,298 | 1 | 5 | 0 | 0 | add transparent coast calculation and explain what Coast FIRE does not mean |
| `inflation-value-of-money-over-time.html` | 1,269 | 1 | 3 | 1 | 0 | strengthen purchasing-power mechanics, sources and checklist |
| `future-cost-of-expenses.html` | 1,189 | 1 | 3 | 0 | 0 | add future-cost worked example, category-inflation caveat and source depth |
| `inflation-purchasing-power-savings.html` | 1,193 | 1 | 4 | 0 | 1 | add nominal-vs-real savings example and fee/tax caveat |
| `inflation-purchasing-power.html` | 1,289 | 1 | 3 | 1 | 0 | strengthen basket/index explanation and practical interpretation checklist |
| `todays-money-vs-future-money.html` | 1,202 | 0 | 3 | 1 | 0 | add comparison table, conversion example and anti-double-counting checklist |

`how-much-money-do-i-need-to-retire.html` currently has about 1,937 visible words, five authority links and an existing review/checklist structure. It remains maintenance-only in this programme.

---

# 13. LEARN3D-1 page-specific implementation requirements

## 13.1 `retirement-savings-by-age.html`

Keep the page focused on benchmarks as a checkpoint.

Must add or strengthen:

- why benchmark methods often use income multiples or broad savings ratios;
- why benchmark assumptions differ across providers and countries;
- a worked example comparing a benchmark checkpoint with a personal retirement-gap calculation;
- why someone can be below a benchmark yet have a viable plan, or above one yet still have a gap;
- treatment of pensions/other retirement income as country-dependent;
- a checklist: current retirement spending target, existing assets, future contributions, retirement horizon, other income and assumptions;
- primary journey to the Retirement Planner.

Must not present one table as an official universal requirement.

## 13.2 `retirement-monthly-income-needed.html`

Must explain a bottom-up retirement-spending method rather than relying on a single income-replacement percentage.

Include:

- essential, flexible and irregular spending layers;
- housing, healthcare, family support, travel and taxes as context-dependent categories;
- income expected from pensions/other sources versus the amount the portfolio must fund;
- a localized worked example from current spending to retirement monthly need;
- a checklist for expenses that end, continue, rise or begin later;
- Retirement Planner as the primary tool journey.

## 13.3 `retirement-expenses.html`

Must deepen the existing expense-change lesson.

Include:

- expenses that may stop, continue, rise or begin;
- one example with at least four categories changing in different directions;
- a distinction between one-time retirement transitions and recurring costs;
- a checklist for housing, healthcare, debt, family support, travel, insurance, tax and contingency items;
- primary Retirement Planner mapping preserved at top and shared bottom CTA.

## 13.4 `inflation-and-retirement-planning.html`

Must explain inflation in two stages:

1. from today to retirement; and
2. during retirement withdrawals.

Include:

- a today's-money spending amount converted into a future nominal amount;
- a clear note that different expense categories may inflate differently;
- nominal versus real return explanation;
- why inflation matters even if retirement begins soon;
- a checklist for inflation assumptions and stress testing;
- primary Retirement Planner mapping preserved at top and bottom.

## 13.5 `how-long-will-retirement-savings-last.html`

Must explain longevity as an interaction among:

- starting portfolio;
- withdrawal amount;
- inflation;
- returns;
- return order;
- fees/taxes where relevant;
- time horizon.

Include at least two sensitivity scenarios and explain that a deterministic result is an illustration, not a prediction.

Preserve:

- Retirement Planner Tool <-> Learn mapping at top and bottom;
- contextual route to the live Retirement Withdrawal / Drawdown calculator;
- RETIRE1 discovery contracts.

## 13.6 `4-percent-rule-retirement.html`

Must clearly explain:

- the classic rule as an initial withdrawal concept with inflation adjustments, not "withdraw 4% of the current balance every year";
- the historical U.S.-market research context;
- why fees, taxes, horizon, asset mix, inflation and market sequence matter;
- one worked first-year/second-year illustration;
- why 25x spending is a shortcut derived from 4%, not a guarantee;
- practical questions before using the rule;
- primary route to the 4% Rule Stress Test;
- contextual route to the Withdrawal / Drawdown calculator where useful.

## 13.7 `sequence-of-returns-risk.html`

Must show the central idea numerically:

- two return paths with comparable long-run return assumptions;
- withdrawals occurring during both paths;
- a visibly different portfolio outcome when weak returns arrive early;
- why this matters more during withdrawals than during accumulation;
- mitigations framed as planning options, not guaranteed solutions;
- a checklist covering spending flexibility, cash/liquidity, asset mix, horizon and stress testing.

Preserve existing routes to the 4% Rule Stress Test, Withdrawal / Drawdown calculator and SWP guide.

## 13.8 `longevity-risk-retirement.html`

Must explain longevity risk as planning for uncertainty in retirement length, not predicting death.

Include:

- at least two retirement-horizon scenarios;
- why a longer horizon changes sustainable spending pressure;
- interaction with inflation, healthcare, later-life support and market risk;
- a checklist for horizon, guaranteed income, flexibility, reserves and legacy goals;
- existing Financial Independence Tool <-> Learn mapping preserved at top and bottom.

---

# 14. LEARN3D-2 page-specific implementation requirements

## 14.1 `financial-independence-number.html`

Must explain:

- the spending-based target relationship;
- why withdrawal-rate assumptions change the target;
- portfolio-funded spending versus income not required from the portfolio;
- today's-money versus future-money framing;
- one localized target example with more than one withdrawal-rate assumption;
- what the target does not tell the reader: date to FI, market path, taxes or future life changes;
- checklist for spending, income offsets, assets, inflation and withdrawal assumptions;
- primary route to FI Number by Spending remains appropriate.

## 14.2 `when-can-i-reach-financial-independence.html`

Must keep the page about timing, not target definition.

Include:

- target amount, current assets, contributions, return assumption and inflation/spending assumptions;
- a worked sensitivity showing that changing one assumption can move the modeled date;
- why a modeled crossing is a planning milestone, not a promise;
- what to review when the date is later than desired;
- existing Financial Independence Planner mapping at top and bottom preserved.

## 14.3 `coast-fire-explained.html`

Must explain Coast FIRE as a future-retirement milestone under assumptions.

Include:

- current invested assets;
- future retirement target;
- years until target age;
- assumed return and inflation framing;
- one transparent coast calculation/illustration;
- why Coast FIRE does not automatically mean someone can stop all saving, stop working or ignore near-term goals;
- distinction from full FI and Barista/Lean/Fat FIRE labels unless those labels are genuinely useful;
- existing Financial Independence Planner mapping preserved at top and bottom.

## 14.4 `inflation-value-of-money-over-time.html`

Must remain the primary Inflation Calculator education bridge.

Explain:

- purchasing power of a fixed nominal amount over time;
- how to interpret a future purchasing-power result;
- one localized multi-horizon worked example;
- why CPI/inflation assumptions are not personal forecasts;
- a checklist for horizon, inflation assumption and today's/future-money basis;
- Inflation Calculator mapping preserved at top and bottom.

## 14.5 `future-cost-of-expenses.html`

Must focus on converting today's expense to a future nominal cost.

Include:

- clear future-cost formula in plain language;
- worked example at more than one horizon or inflation rate;
- distinction between general inflation and category-specific cost changes;
- why future nominal cost should not be compared directly with today's nominal income without context;
- checklist for horizon, current cost, inflation assumption and category sensitivity;
- Inflation Calculator mapping preserved at top and bottom.

## 14.6 `inflation-purchasing-power-savings.html`

Must focus on savings rather than general inflation.

Include:

- nominal account growth versus purchasing-power change;
- one example where the balance rises but real purchasing power falls;
- fees/tax caveat without creating a tax engine;
- why cash/emergency savings can still be appropriate despite inflation risk;
- checklist for purpose, horizon, access needs, nominal rate and inflation assumption;
- Inflation Calculator mapping preserved at top and bottom.

## 14.7 `inflation-purchasing-power.html`

Must remain the conceptual foundation guide.

Explain:

- inflation as a broad rise in prices, not every price rising equally;
- purchasing power in plain language;
- inflation indexes/baskets at a high level without pretending one index matches every household;
- one simple worked illustration;
- common misconceptions, including confusing price level with inflation rate;
- checklist for interpreting an inflation statistic in a personal plan;
- Inflation Calculator as the primary tool journey.

## 14.8 `todays-money-vs-future-money.html`

Must explain the two valid planning frames and how to avoid mixing them.

Include:

- today's-money definition;
- future nominal-money definition;
- a side-by-side comparison table;
- one conversion example;
- examples of common double-counting mistakes, especially inflating spending and also using a real-return assumption incorrectly;
- checklist for identifying which basis each input/output uses;
- Inflation Calculator mapping preserved at top and bottom.

---

# 15. Protected Tool <-> Learn journeys

Before implementation, QA and source-contract mappings must be reconciled with every planned article change.

The following established mappings are immutable unless separately approved.

## Financial Independence Planner

- primary guide: `/when-can-i-reach-financial-independence.html`
- related: `/coast-fire-explained.html`
- related: `/longevity-risk-retirement.html`
- top and shared bottom CTA for these mapped pages must return to `/financial-independence/`.

## Inflation Calculator

- primary guide: `/inflation-value-of-money-over-time.html`
- related: `/future-cost-of-expenses.html`
- related: `/inflation-purchasing-power-savings.html`
- related: `/todays-money-vs-future-money.html`
- top and shared bottom CTA for these mapped pages must return to `/inflation-calculator/`.

## Retirement Planner

- primary guide remains maintenance-only: `/how-much-money-do-i-need-to-retire.html`
- related: `/retirement-expenses.html`
- related: `/how-long-will-retirement-savings-last.html`
- related: `/inflation-and-retirement-planning.html`
- top and shared bottom CTA for these mapped pages must return to `/retirement-calculator/`.

## Retirement withdrawal-specific journeys

- `4-percent-rule-retirement.html` keeps its primary 4% Rule Stress Test journey;
- `sequence-of-returns-risk.html` keeps its approved stress-test / withdrawal / SWP contextual routes;
- `how-long-will-retirement-savings-last.html` keeps approved RETIRE1 withdrawal-calculator discovery;
- LEARN3D must not remove or silently replace these routes while adding richer content.

---

# 16. Internal discovery rules

Every rewritten page should normally receive:

- one primary tool action;
- three genuinely related Learn links where practical;
- contextual links inside the article only where they help the reader continue the same decision;
- at least one inbound contextual link from another relevant article in the same release when natural.

Do not create link dumps or repeat the same target multiple times merely to increase internal-link counts.

Recommended cluster relationships:

- retirement savings by age -> broad retirement target -> monthly retirement income -> retirement expenses;
- retirement expenses -> monthly income -> inflation and retirement;
- 4% rule -> sequence risk -> longevity risk -> withdrawal calculator;
- FI number -> when can I reach FI -> Coast FIRE;
- inflation value -> future cost -> purchasing-power savings -> today's money vs future money;
- retirement inflation pages -> general purchasing-power foundation only where helpful.

---

# 17. Search and indexing safeguards

LEARN3D must preserve the current indexing discipline.

For every rewritten page:

- keep one self-canonical URL;
- keep `index,follow`;
- keep one clear H1;
- use a unique static HTML title and meta description;
- keep static search metadata as the SEO contract;
- let runtime localization change visible presentation without using post-load meta-length heuristics as the search-quality gate;
- keep Article + Breadcrumb structured data valid;
- update `dateModified` and sitemap `lastmod` only for materially rewritten pages;
- do not change unrelated sitemap dates;
- keep sitemap URL inventory unchanged;
- keep SEARCH1 inventory unchanged at the current public-page count unless another approved release changes it;
- update SEARCH1 aliases only when they improve genuine query understanding without creating competing ownership;
- keep `search.html` `noindex,follow`;
- preserve IndexNow rather than adding another submission mechanism.

No claim may be made that indexing or ranking is guaranteed.

---

# 18. Structured data and trust

Every changed article must preserve:

- Carrowmont author/publisher identity;
- Article structured data;
- BreadcrumbList structured data;
- visible publication/review information;
- authoritative source section;
- educational-information disclaimer;
- Editorial & Review Policy link where used by the current standard.

Sources should favor primary/high-authority institutions. Potential source classes include national regulators, central banks/statistical agencies, OECD/IMF, investor-education bodies and original retirement research where relevant.

Do not cite a source merely because it contains a convenient number. The source must support the actual claim being made.

---

# 19. QA strategy - changed after LEARN3C

LEARN3D implementation must use a stricter preflight process before a release ZIP is handed to Publisher.

## 19.1 Reconcile old contracts first

Before editing any mapped page, inspect at minimum:

- `tests/17-core6-tool-learn-integration.spec.js`;
- `tests/32-retirement-withdrawal-drawdown.spec.js`;
- `tests/13-learn-localization.spec.js`;
- relevant smoke tests;
- relevant source-contract assertions;
- any GSEO/search-intent tests that name the affected pages.

New editorial QA must not contradict an older active Tool <-> Learn rule.

## 19.2 Static versus runtime assertions

- Static title/meta/canonical/robots/structured data are tested from raw HTML.
- Runtime browser tests validate visible localization, layout, navigation and interactions.
- Do not make Publisher depend on a post-load JavaScript meta-description length when the static search-facing description is already valid.

## 19.3 Selector discipline

Browser QA must target the intended semantic element or container.

Do not assume that a phrase or contextual link appears exactly once across a rich article. If duplicate legitimate links exist, scope the selector to the relevant section instead of weakening the product or requiring false uniqueness.

## 19.4 Required automated protection

Each implementation batch should add a dedicated browser test covering:

- stable canonical/title/H1 identity;
- direct-answer presence;
- worked example/scenario presence;
- checklist/review section presence;
- authoritative-source/trust signals;
- protected Tool <-> Learn journeys;
- representative localized money examples;
- country-aware terminology;
- no unapproved hard-coded INR/lakh/crore leakage into non-INR rendering;
- SEARCH1 query ownership;
- 1280, 390 and 360px horizontal-overflow safety.

The source contract should protect the same architectural rules without duplicating brittle browser-only selectors.

---

# 20. Release boundaries

## LEARN3D-1

Expected repositories:

1. `draw004.github.io`
2. `carrowmont-qa`

No calculator repository should need modification. Existing calculator behavior is a dependency, not an implementation target.

After LEARN3D-1:

1. Publisher green;
2. merge main site first;
3. merge central QA last;
4. Pages green;
5. Automated QA green;
6. Multi-Repo Guard green;
7. fresh Source Snapshot;
8. request Google re-indexing only for the eight materially changed URLs;
9. Bing/participating engines continue through IndexNow.

## LEARN3D-2

Must start from the fresh post-LEARN3D-1 Source Snapshot, not from this Snapshot 98 package.

Expected repositories are again main site + central QA unless implementation review proves otherwise.

---

# 21. Definition of done

LEARN3D is complete only when:

1. this specification is merged from Snapshot 98;
2. a fresh post-spec Source Snapshot is captured;
3. LEARN3D-1 is implemented from that fresh baseline;
4. every LEARN3D-1 page materially improves reader understanding rather than only word count;
5. old Tool <-> Learn and RETIRE1 contracts remain green;
6. LEARN3D-1 Publisher, live QA and Multi-Repo Guard are green;
7. a fresh snapshot is captured;
8. LEARN3D-2 is implemented from that newer baseline;
9. all sixteen pages preserve stable canonical ownership and truthful freshness;
10. country/currency localization remains consistent and mathematically coherent;
11. no retirement benchmark, withdrawal rate, FI date, inflation assumption or longevity horizon is presented as a guarantee;
12. static SEO metadata, structured data and sitemap signals are valid;
13. SEARCH1 inventory remains privacy-first and query ownership remains distinct;
14. 1280 / 390 / 360 layouts pass;
15. Publisher, live Automated QA and Multi-Repo Guard are green after LEARN3D-2;
16. a fresh Source Snapshot becomes the next authoritative baseline;
17. Google indexing is requested only for materially changed LEARN3D pages, with Bing handled by the existing IndexNow process.

---

# 22. Final editorial principle

LEARN3D should help a reader understand one central idea:

> Retirement, financial independence and inflation planning are not about finding one magic number. They are about making the assumptions visible, understanding how those assumptions interact, and testing whether a plan remains reasonable when life, prices or markets do not follow the smooth path.

The best Carrowmont article is one that leaves the reader more capable of making their own financial decision, not more dependent on a rule of thumb.
