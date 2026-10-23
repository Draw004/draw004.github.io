# CARROWMONT TRAFFIC1 - RESEARCH, DIGITAL PR & DISTRIBUTION FOUNDATION

## Final strategy and implementation specification

**Status:** FINAL specification-only approval gate. This document does not change public pages or calculator behavior.  
**Authoritative baseline:** Carrowmont Source Snapshot 109, generated 2026-10-22T19:20:24Z.  
**Main-site baseline commit:** `cdde3e5d57514c600f9f236205c2bdf728652b2c`  
**Central-QA baseline commit:** `775ae00f0f1f63bcc88577e6c7f8585bceac1958`  
**Baseline source contract:** 672 PASS / 0 FAIL.  
**Specification date:** 23 October 2026.

---

# 1. Executive decision

Carrowmont has completed the technical/indexing foundation and now has broad coverage across its primary consumer-finance decision areas. The next growth phase must therefore shift from **more SEO repair and more generic tools** to **original research, digital PR, recurring distribution and measurement-led iteration**.

TRAFFIC1 establishes a new public **Carrowmont Research** layer that turns existing Carrowmont calculators, transparent deterministic models and authoritative public datasets into original, reference-worthy research assets.

The goal is not to publish at high volume. The goal is to create a small number of assets that are useful enough to earn:

- editorial links and citations;
- referral traffic;
- journalist/newsletter references;
- Discover visibility where earned;
- AI-search citations where earned;
- repeat visits and brand searches;
- new demand signals for future product decisions.

The first three flagship research assets are locked as:

1. **Carrowmont Mortgage Affordability Monitor**;
2. **Carrowmont Emergency Savings & Income-Loss Resilience Report**;
3. **Carrowmont Purchasing-Power & Inflation Monitor**.

No new calculator is approved by TRAFFIC1. The three research assets must reuse existing Carrowmont engines and public datasets wherever possible.

---

# 2. Why this phase comes next

## 2.1 Product maturity

Snapshot 109 already contains a substantial tool and education portfolio spanning:

- budgeting and cash flow;
- debt payoff;
- recurring investing / SIP;
- savings goals;
- compound interest;
- financial independence;
- retirement planning and withdrawal/drawdown;
- inflation and purchasing power;
- mortgage payoff;
- prepayment vs investing;
- refinance / balance-transfer break-even;
- mortgage rate-shock stress;
- home affordability;
- rent vs buy;
- loan / EMI calculations;
- macro and market-chain scenario tools;
- gold, silver and sovereign-debt research/education.

The marginal value of another ordinary calculator is now lower than the marginal value of getting the existing system discovered and cited.

## 2.2 Search-demand direction

Current third-party Google Trends sampling continues to show very strong interest in housing and mortgage decisions, with mortgage rates and mortgage calculators among the highest-scoring selected finance queries. Inflation calculators, retirement calculators, rent-vs-buy and refinance calculators also remain meaningful demand areas.

This evidence is directional rather than a substitute for first-party Search Console data. TRAFFIC1 must therefore use external demand research for opportunity discovery and Carrowmont Search Console for ongoing prioritization once sample sizes are meaningful.

## 2.3 Google / Discover direction

Google's 2026 Discover guidance emphasizes original, timely, in-depth content and topic-level expertise rather than clickbait or commodity rewrites. Google's people-first guidance also explicitly asks whether content provides original information, reporting, research or analysis.

TRAFFIC1 is designed around those principles: high-effort research, transparent methodology, first-party modelling and downloadable evidence.

---

# 3. Non-negotiable TRAFFIC1 rules

1. **No mass publishing.** Do not create daily or programmatic location pages merely to capture keywords.
2. **No fake data.** Every published factual statistic must be traceable to an identified source or a clearly labelled Carrowmont calculation.
3. **Separate fact from model.** Official data, Carrowmont reference snapshots, user assumptions and deterministic model outputs must be visually and editorially distinct.
4. **No sensational headlines.** Avoid crash, collapse, guaranteed, doomed, safe, must-buy or similar framing.
5. **No fabricated expertise.** Do not invent researchers, reviewers, credentials or institutions.
6. **No paid-link schemes.** Outreach must be editorially relevant and useful even if search engines did not exist.
7. **Stable URLs.** Research monitors should use durable canonical URLs rather than creating thin monthly pages.
8. **Substantive freshness only.** Update `dateModified` and sitemap `lastmod` only when data, analysis or methodology materially changes.
9. **Data licensing discipline.** Use datasets whose reuse/export terms are compatible with the intended chart/CSV output; record source and retrieval date.
10. **No hidden calculator changes.** Research releases must not silently alter the underlying public calculator mathematics.
11. **Global Carrowmont architecture remains intact.** A study may launch with one country where primary data quality is strongest, but must state the geographic scope truthfully and must not imply global representativeness.
12. **Privacy first.** No personal financial inputs from calculators are transmitted into research analytics.

---

# 4. Carrowmont Research information architecture

## 4.1 Public hub

Recommended durable hub:

`https://carrowmont.com/research.html`

Purpose:

- explain what Carrowmont Research is;
- list current flagship studies;
- show update cadence and methodology principles;
- link to datasets/downloads;
- link to corrections/contact;
- provide a clear path back to relevant calculators.

The Research hub is not a blog index and should not become an infinite chronological feed.

## 4.2 Research page pattern

Recommended stable pattern:

`/research/<study-slug>.html`

If repository constraints favor root-level HTML, root-level stable URLs are acceptable, but the visible Research hub must still provide one coherent research identity.

Each flagship page should contain, in this order:

1. **Headline finding** - one useful sentence, no clickbait.
2. **Key numbers** - 3 to 5 concise metrics.
3. **Primary chart** - immediately visible and understandable.
4. **What changed / why it matters** - short interpretation.
5. **Interactive Carrowmont scenario** - link or embedded deterministic view where appropriate.
6. **Detailed findings** - tables/charts, not padded prose.
7. **Methodology** - formulas, assumptions, exclusions and data dates.
8. **Sources** - authoritative source list.
9. **Download data** - CSV where legally/reliably redistributable.
10. **Download chart** - high-resolution PNG/SVG generated from Carrowmont data.
11. **Citation / media note** - suggested factual description and contact path.
12. **Related tool** - contextual CTA to the existing Carrowmont calculator.

## 4.3 Visual system

Research pages should feel related to Carrowmont but more data-led than ordinary Learn pages.

Required visual principles:

- one strong chart above the fold or immediately after the opening finding;
- large readable numeric callouts;
- restrained use of color and annotation;
- table headers fixed to clear units;
- no chart legends that require guesswork;
- charts must remain interpretable in print/PDF and at 390px mobile width;
- all charts receive text alternatives or adjacent data tables;
- downloadable chart exports should be at least 1200px wide for editorial/social reuse;
- title images intended for Discover should meet Google's large-image recommendations where practical.

## 4.4 Research dataset structure

Recommended repository convention:

- `data/research/<study-slug>.json` - normalized data used by the page;
- `data/research/<study-slug>.csv` - public downloadable data when redistribution is allowed;
- `assets/research/<study-slug>-*.png` - generated shareable charts;
- `docs/research/<study-slug>-methodology.md` - optional long-form technical methodology if the public page would otherwise become unwieldy.

Do not publish raw third-party files when their licence or terms do not permit redistribution. In those cases publish only Carrowmont-derived values with source citations and retrieval dates.

---

# 5. Flagship study 1 - Carrowmont Mortgage Affordability Monitor

## 5.1 Strategic priority

**Priority: 1 / launch first.**

Housing and mortgage decisions remain one of the strongest current finance-search themes, and Carrowmont already owns the product journey needed to turn a data story into useful action: Home Affordability, Mortgage Payoff, Refinance Break-Even, Rate Shock and Rent-vs-Buy.

## 5.2 Core question

> **How much does the current mortgage-rate environment change the monthly payment and purchasing power of a household, and how does that compare with recent home-price and income data?**

## 5.3 First-release geographic scope

Launch the first monitor as **United States data** because there is a clean primary-data chain:

- Freddie Mac Primary Mortgage Market Survey (PMMS) for 30-year fixed mortgage rates;
- U.S. Census Bureau / HUD New Residential Sales for median new-house sale price;
- U.S. Census Bureau CPS ASEC for median household income.

The page must say "United States" prominently. Do not call this a global affordability index.

A later TRAFFIC release may add separate country panels only after equivalent authoritative source quality is established.

## 5.4 Locked calculations

### A. Standard payment-sensitivity table

Show principal-and-interest payment for standardized loan balances such as:

- $200,000;
- $300,000;
- $400,000;
- $500,000;
- $750,000.

Use:

- 30-year amortization;
- current PMMS 30-year fixed rate;
- comparison rates of current rate -1 percentage point, current rate, current rate +1 percentage point where all values remain valid.

This is a rate-sensitivity illustration, not a lender quote.

### B. Median-new-home reference scenario

Use the current median new-house sale price and a clearly stated standardized down-payment assumption (recommended initial research assumption: 20%).

Calculate principal-and-interest only.

Explicit exclusions:

- property tax;
- homeowners insurance;
- mortgage insurance;
- HOA/strata charges;
- closing costs;
- maintenance;
- lender fees.

### C. Income comparison

Show the standardized principal-and-interest payment as a percentage of **gross median monthly household income**.

This metric must be labelled:

**"P&I-only payment as a share of gross median household income"**

It is **not** a lender debt-to-income ratio and must never be described as a qualification threshold.

## 5.5 Required outputs

- current rate and one-year comparison;
- payment change on $400,000 reference loan;
- payment sensitivity by loan size;
- median-new-home standardized P&I payment;
- P&I-only share of median gross household income;
- 12-month rate line chart;
- recent median-new-home-price line chart;
- downloadable Carrowmont calculation CSV;
- shareable primary chart;
- CTA to Home Affordability Calculator;
- secondary links to Refinance Break-Even and Mortgage Rate Shock.

## 5.6 Update cadence

**Monthly**, not weekly.

Reason:

- weekly mortgage-rate noise is too frequent for a high-quality research workflow;
- Census/HUD home-price data is monthly;
- monthly updates create a more defensible editorial cadence.

The current PMMS rate may be displayed between monthly research updates only if the page clearly distinguishes the live reference value from the last full report calculation.

## 5.7 Digital-PR angles

Potential factual headlines generated from the model:

- "What a one-percentage-point mortgage-rate move changes on a $400,000 loan";
- "Mortgage payment pressure versus a year ago";
- "How much monthly payment changes even when home prices are flat";
- "Why a small rate move can change affordability more than a small price discount".

Target audiences:

- housing journalists;
- mortgage/newsletter writers;
- real-estate data publishers;
- first-time-buyer education sites;
- financial-wellness programs.

---

# 6. Flagship study 2 - Emergency Savings & Income-Loss Resilience Report

## 6.1 Strategic priority

**Priority: 2.**

The topic has both search demand and strong authoritative survey data, while Carrowmont already has Budget, Debt Payoff, emergency-fund Learn content and future room for a dedicated resilience tool if actual demand justifies it.

## 6.2 Core question

> **How prepared are households for an income interruption, and what does a three-month emergency fund actually mean under different essential-spending levels?**

## 6.3 Primary data source

Use the Federal Reserve Board's annual Survey of Household Economics and Decisionmaking (SHED) as the primary U.S. evidence source.

The 2026 report on 2025 household conditions provides, among other measures:

- the share able to cover a $400 emergency with cash or its equivalent;
- the share with savings sufficient for three months of expenses;
- the share unable to cover three months by any available means;
- emergency-savings results by income, age and other characteristics;
- downloadable/accessible tables suitable for transparent citation.

## 6.4 Report structure

### A. Official-data layer

Visualize official SHED results without altering their definitions.

Examples:

- three-month emergency savings over time;
- three-month emergency savings by household income;
- largest emergency expense supportable using savings;
- relationship between monthly surplus frequency and emergency savings.

### B. Carrowmont scenario layer

Add a separate clearly-labelled deterministic scenario table:

**Illustrative emergency runway**

For accessible savings of:

- $5,000;
- $10,000;
- $20,000;
- $30,000;

and essential monthly cash shortfalls of:

- $1,500;
- $2,500;
- $3,500;
- $5,000.

Calculate months of runway as:

`accessible reserve / monthly cash shortfall`

No probability of job loss is estimated.

### C. Income-loss scenarios

Illustrate the difference between:

- 25% income reduction;
- 50% income reduction;
- 100% loss of dependable income;

using clearly user-neutral example budgets.

## 6.5 Required outputs

- official-data charts;
- Carrowmont runway matrix;
- "three months is not one universal dollar amount" explanatory graphic;
- download of Carrowmont scenario matrix;
- source methodology and definition notes;
- CTA to Budget & Cash Flow Planner;
- secondary CTA to Debt Payoff Calculator;
- contextual link to emergency-fund Learn content.

## 6.6 Update cadence

**Annual major update** when the Federal Reserve publishes the new SHED report, plus only genuinely material interim updates.

This asset should remain evergreen between data releases rather than receiving artificial monthly freshness changes.

## 6.7 Digital-PR angles

- "Only X% of adults report three months of emergency savings";
- "What $10,000 of emergency savings actually covers at different monthly shortfalls";
- "Why emergency-fund targets should be expressed in household cash burn, not one fixed dollar amount".

Target audiences:

- personal-finance journalists;
- employee financial-wellness publishers;
- nonprofit financial-literacy programs;
- budgeting newsletters;
- HR/benefits publishers;
- financial educators.

---

# 7. Flagship study 3 - Purchasing-Power & Inflation Monitor

## 7.1 Strategic priority

**Priority: 3.**

Inflation calculators remain a meaningful search category and Carrowmont already has a mature inflation calculator plus multiple Learn pages explaining nominal versus real value, future costs and retirement/inflation interactions.

## 7.2 Core question

> **How much purchasing power has a fixed amount of money lost over different historical periods, and what inflation assumptions imply for future household goals?**

## 7.3 Scope

The first release should prioritize a small number of markets with reliable official CPI series and clear source rights.

Recommended initial set, subject to source/licensing verification during implementation:

- United States - Bureau of Labor Statistics CPI;
- India - Ministry of Statistics and Programme Implementation CPI;
- United Kingdom - Office for National Statistics CPI;
- Canada - Statistics Canada CPI;
- Australia - Australian Bureau of Statistics CPI.

Do not add a country merely for coverage. Each panel requires an authoritative source and a documented series definition.

## 7.4 Locked calculations

For each supported market:

- show cumulative price-level change over 1, 5 and 10 years where data permits;
- show the purchasing power of a standard local amount in today's money relative to the earlier period;
- keep historical observed inflation separate from forward-looking user assumptions;
- never call a forward illustration a forecast.

Example historical calculation:

`purchasing_power_factor = CPI_start / CPI_end`

Example future illustration using a user-selected constant rate:

`future_real_value = amount / (1 + inflation_rate)^years`

## 7.5 Required outputs

- country comparison chart using normalized index values, not mixed currencies;
- market-specific purchasing-power cards;
- 5-year and 10-year historical erosion table;
- link to the Inflation Calculator for personalized assumptions;
- downloadable Carrowmont-derived normalized table where source terms permit;
- methodology explaining CPI differences across countries.

## 7.6 Update cadence

Recommended **quarterly editorial update**, even if source CPI releases are monthly.

Reason: quarterly updates are frequent enough to stay timely without turning Carrowmont into a data-feed publisher.

## 7.7 Digital-PR angles

- "What five years of inflation did to 100 units of purchasing power";
- "Purchasing-power change across five major markets";
- "Why the same nominal savings target buys less over time";
- retirement/goal implications linked to Carrowmont calculators.

Target audiences:

- inflation/economy writers;
- retirement and savings publishers;
- financial-literacy programs;
- expatriate/personal-finance newsletters where cross-market context is useful.

---

# 8. Study-selection scorecard

TRAFFIC1 uses the following qualitative scorecard before approving any fourth study.

| Criterion | Mortgage monitor | Emergency resilience | Inflation monitor |
|---|---:|---:|---:|
| Current search demand | Very high | High | High |
| Carrowmont product fit | Very high | Very high | Very high |
| Primary-data quality | Very high | Very high | Very high |
| Original chart potential | Very high | High | Very high |
| Journalist / newsletter relevance | Very high | Very high | High |
| Repeatable update cadence | Very high | Medium | High |
| Risk of commodity duplication | Medium | Medium | Medium |
| Maintenance burden | Medium | Low | Medium |

A future study must score strongly on at least four of these dimensions and must have a distinct reader decision/use case.

---

# 9. Digital PR and outreach operating model

## 9.1 Outreach principle

Do not email people asking for "a backlink".

Pitch a specific finding, chart or dataset that is genuinely relevant to their audience.

## 9.2 Outreach package per study

Each launch should prepare:

- one-sentence finding;
- 3 key numbers;
- 1 high-resolution chart;
- 1 small CSV/data table;
- methodology URL;
- source list;
- suggested neutral citation sentence;
- media/contact email;
- related Carrowmont interactive tool.

## 9.3 Target tiers

### Tier A - editorial/data publications

- personal-finance reporters;
- housing reporters;
- retirement writers;
- inflation/economy reporters;
- data journalists.

### Tier B - specialist publishers

- mortgage and real-estate newsletters;
- FIRE/retirement publishers;
- budgeting and financial-wellness publishers;
- university/nonprofit financial-literacy resource pages.

### Tier C - community distribution

- relevant Reddit discussions where a chart/model directly answers the question;
- specialist forums;
- LinkedIn posts from the Carrowmont brand/owner;
- YouTube calculator walkthroughs;
- newsletter issue built around the study.

No automated mass-posting is allowed.

## 9.4 Outreach cadence

For each flagship launch:

- prepare 30-50 researched prospects;
- contact 10-15 highly relevant prospects in wave 1;
- one follow-up after 5-7 days if appropriate;
- expand only if the angle receives positive engagement;
- record contacted URL, person/publication, angle, date, response and resulting mention/link.

---

# 10. Video and social derivative standard

Each flagship report should create reusable distribution outputs rather than requiring separate topic invention.

Minimum derivatives:

1. **YouTube / long-form screen walkthrough** - 4 to 8 minutes;
2. **short vertical clip** - one chart / one finding;
3. **LinkedIn post** - chart + methodology note;
4. **community answer** - only where directly relevant;
5. **newsletter brief** - finding + chart + tool link.

The video style should be calculator/data-led. Avoid generic talking-head market predictions.

---

# 11. Email / returning audience

TRAFFIC1 recommends a lightweight **Carrowmont Money Brief** only after the first Research page is live.

Recommended cadence: twice monthly at most.

Each edition should contain:

- one useful chart;
- one financial decision/scenario;
- one new or updated Carrowmont resource;
- one data point worth remembering.

Do not require newsletter signup to use any core calculator or access Research data.

Email implementation is not part of this specification release and requires a separate privacy/vendor decision.

---

# 12. Search Console and measurement become the roadmap

After TRAFFIC1 launches, monthly prioritization should use first-party evidence in this order:

1. Google Search Console query/page/country/device data;
2. Discover performance where available;
3. generative/AI search performance reporting where available in the account;
4. referral traffic and referring domains;
5. research download events;
6. Research -> Tool click-through;
7. brand-query growth;
8. newsletter/video/community referral traffic if those channels launch.

External keyword/trend tools are for discovery, not final prioritization.

## 12.1 Success metrics for the first 90 days

Working targets, not guarantees:

- 3 flagship Research assets live;
- at least 30 high-quality outreach contacts per asset researched;
- at least 5 new relevant referring domains across the quarter;
- at least 3 genuine editorial/resource mentions;
- measurable Research -> Tool traffic;
- measurable referral sessions from non-search channels;
- at least one study earning repeat/update traffic after its initial launch;
- no technical/search regression in existing Carrowmont assets.

Do not judge success only by raw pageviews in the first weeks.

---

# 13. Analytics and privacy

Research analytics should remain aggregate.

Approved event classes may include:

- Research page view;
- dataset download;
- chart download;
- methodology expansion/view;
- Research -> Tool click;
- external-source click;
- share/copy-citation action.

Do not capture:

- calculator financial inputs;
- downloaded report contents;
- free-text personal information;
- precise household scenarios tied to identity.

---

# 14. Structured data and indexing

Use structured data only when it accurately describes the page.

Recommended review during implementation:

- `Article` or `Report`-appropriate supported schema only where valid;
- `Dataset` only when Carrowmont actually publishes a dataset with the required descriptive fields;
- `BreadcrumbList` where the page hierarchy supports it;
- Organization/author/publisher identity consistent with existing trust rules.

Do not add unsupported or misleading schema merely to chase enhanced results.

All Research pages must be indexable, canonical, included in the sitemap, internally linked from Research hub and contextually linked from the relevant tool/Learn cluster.

---

# 15. Implementation sequence

## TRAFFIC1A - Research foundation + Mortgage Affordability Monitor

Repositories expected:

- `draw004.github.io`;
- `carrowmont-qa`.

No calculator-repository changes should be necessary unless implementation uncovers a genuine reusable-data need that cannot be met from the main site.

Deliverables:

- Research hub;
- shared Research presentation system;
- first flagship report;
- data/chart downloads;
- methodology/source block;
- browser/source QA;
- outreach launch pack.

## TRAFFIC1B - Emergency Savings & Income-Loss Resilience Report

Use the same Research page system. Do not build the previously discussed resilience calculator unless post-launch search/user evidence justifies it.

## TRAFFIC1C - Purchasing-Power & Inflation Monitor

Use the same Research page system and confirm every country source/licence before implementation.

---

# 16. QA requirements

Every Research implementation release must protect:

## Content / methodology

- headline finding agrees with underlying data;
- displayed units are correct;
- official data and Carrowmont calculations are labelled separately;
- source date/retrieval date is visible;
- no forecast language for deterministic scenarios;
- no unsupported lender/market/investment recommendation.

## Data

- JSON/CSV parses;
- row/column counts expected;
- no NaN/Infinity;
- source period matches visible labels;
- calculations reproduce deterministic fixtures;
- downloadable data matches the visible chart/table.

## Browser / responsive

- desktop 1280px;
- 390px;
- 360px;
- chart labels do not clip;
- tables remain usable on small screens;
- downloads work;
- Research -> Tool links work;
- source links work;
- no horizontal page overflow.

## Search / trust

- title/description/canonical unique;
- sitemap inclusion;
- stable search intent distinct from Learn pages and calculators;
- accurate structured data;
- dateModified only for material updates;
- privacy/analytics rules unchanged.

---

# 17. Release discipline

TRAFFIC1 follows the established Carrowmont workflow:

1. Start from the latest clean Source Snapshot.
2. Specification is approved before production implementation.
3. Build exact controlled release bundle.
4. Upload ZIP to a disposable staging branch; do not extract it.
5. Run Batch PR Publisher against the exact ZIP.
6. Merge only generated PRs and only after Publisher is fully green.
7. Central QA merges last.
8. Run Pages where relevant -> Automated QA -> Multi-Repo Guard -> fresh Source Snapshot.
9. Request indexing only for genuinely new or materially updated public URLs.
10. Delete/abandon disposable staging and completed generated release branches after validation.

No workflow-file changes are expected for the specification release or the initial Research implementation.

---

# 18. First 12-week operating plan

| Week | Work | Output |
|---|---|---|
| 1 | Approve/merge TRAFFIC1 specification | Locked Research strategy |
| 2 | Specify/build shared Research hub/template | Reusable research system |
| 3 | Build Mortgage Affordability Monitor | Staged TRAFFIC1A asset |
| 4 | Launch TRAFFIC1A + first outreach wave | Live report + 10-15 targeted contacts |
| 5 | Follow-up + derivative video/social | Referral/distribution layer |
| 6 | Build Emergency Savings report | TRAFFIC1B staged |
| 7 | Launch TRAFFIC1B + outreach | Live resilience report |
| 8 | Measure Research -> Tool and referral data | First evidence review |
| 9 | Build Inflation/Purchasing-Power monitor | TRAFFIC1C staged |
| 10 | Launch TRAFFIC1C + outreach | Live inflation report |
| 11 | Second outreach / resource-page wave | New editorial opportunities |
| 12 | Review GSC, referrals, links, downloads | Q1 traffic-growth decision memo |

The sequence can change only when first-party data clearly indicates a stronger opportunity.

---

# 19. Evidence sources used to choose TRAFFIC1

The implementation must re-check current values at build time. This specification used the following evidence classes:

## Google / discovery guidance

- Google Search Central - Creating helpful, reliable, people-first content.
- Google Search Central - Get on Discover.
- Google Search Central - February 2026 Discover core update.

## Search-demand discovery

- Payney, U.S. Money Search Trends, September/October 2026 samples. These are selected-query Google Trends samples and must be treated as directional, not certified monthly search volumes.

## Mortgage / housing primary data

- Freddie Mac Primary Mortgage Market Survey (PMMS).
- U.S. Census Bureau / HUD New Residential Sales / median new-house price series.
- U.S. Census Bureau, Income in the United States: 2025.

## Emergency resilience primary data

- Federal Reserve Board, Report on the Economic Well-Being of U.S. Households in 2025 / 2026 publication.
- Federal Reserve SHED emergency-savings interactive tables/data.

## Supporting audience evidence

- TIAA Institute / GFLEC 2026 Personal Finance Index.
- CFP Board 2026 affordability/client concern research.

These sources guide topic selection; the public research pages must cite the exact source/version used for their calculations.

---

# 20. Final approval gate

Approval of this specification means:

- Carrowmont formally transitions from broad SEO/build mode into authority/distribution mode;
- no Oil Shock & Inflation Calculator is part of the current roadmap;
- the first implementation is TRAFFIC1A Research Foundation + Mortgage Affordability Monitor;
- Emergency Savings/Resilience and Purchasing Power/Inflation follow as research assets, not automatically as new calculators;
- original research, digital PR and distribution now receive materially more effort than new-tool creation;
- the next production bundle must be built from the latest clean post-spec Source Snapshot.

