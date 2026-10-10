# Carrowmont Homepage Tool Demand Matrix

**Status:** Initial build-time ordering dataset for TOOLS-HUB1  
**Research date:** 10 October 2026  
**Applies to:** the six currently live homepage core tools  
**Review target:** every 6–12 months, or sooner when Carrowmont Search Console data materially changes the picture

## 1. Purpose

Carrowmont keeps one universal set of core planning tools, but the order of those tools on the homepage should reflect the financial questions people most commonly look for in the selected country.

This document records the evidence, fallbacks and deterministic ordering used by the homepage. It is a build-time product input. The public site does not call an external keyword, trend or ranking API.

The six ranked tools are:

| Tool key | Universal intent cluster |
|---|---|
| `investment` | recurring investment, compound growth, SIP, monthly investment |
| `budget` | budget planner, cash-flow planner, spending planner |
| `retirement` | retirement calculator, pension calculator, retirement corpus / savings target |
| `inflation` | inflation calculator, future cost, purchasing-power calculator |
| `goals` | savings goal, goal planner, target contribution calculator |
| `independence` | financial independence, FIRE number, early-retirement calculator |

The planned Home Loan / Mortgage Prepayment & Early Payoff tool is not ranked until it is live. **Explore All Tools** is always outside the ranking system and remains the final gateway card.

## 2. Evidence standard and limitations

The initial matrix uses a hierarchy of evidence:

1. country-selectable search-volume tools where comparable data are available;
2. country-level Google Trends comparisons as a corroborating signal;
3. calculator prominence and category structure on established local finance/public-information sites;
4. a documented regional fallback where comparable country-level evidence is weak.

Exact, like-for-like monthly search volume was not consistently available for every country and every translated synonym. This matrix therefore uses **ordinal demand scores** rather than fabricated precision:

- rank 1 = score 6
- rank 2 = score 5
- rank 3 = score 4
- rank 4 = score 3
- rank 5 = score 2
- rank 6 = score 1

The matrix is directional homepage prioritization, not a claim that every resident of a country has the same needs.

## 3. Research source registry

| Source key | Source and use |
|---|---|
| S1 | [Semrush Keyword Search Volume Checker](https://www.semrush.com/free-tools/keyword-search-volume-checker/) — country-selectable demand checks and synonym comparison. |
| S2 | [Google Trends Explore](https://trends.google.com/trends/explore) — country-level relative-interest corroboration where terms were comparable. |
| S3 | [Groww financial calculators](https://groww.in/calculators) and its SIP/retirement calculator structure — representative India evidence for very strong SIP/recurring-investment demand and material retirement demand. |
| S4 | [Bankrate calculators](https://www.bankrate.com/calculators/) — representative United States evidence across retirement, compound savings, budgeting/savings goals and household finance. |
| S5 | [MoneyHelper tools and calculators](https://www.moneyhelper.org.uk/en/tools-and-calculators.html) — representative United Kingdom evidence for pensions/retirement, budget planning and savings. |
| S6 | [Moneysmart calculators](https://moneysmart.gov.au/) — representative Australian public-interest evidence for retirement, budgeting, savings goals and investing. |
| S7 | [WealthWise Canada calculators](https://mywealthwise.ca/en/calculators) and [CalcCanada savings & retirement](https://calccanada.ca/finance/) — representative Canadian evidence for retirement/FIRE and compound saving. |
| S8 | [CalcuZone Europe finance calculators](https://calcuzone.eu/calculators/finance) and [DEdata inflation check](https://de-data.de/en/inflation-check) — multilingual European evidence for pension/retirement, savings/interest and inflation demand. |
| S9 | [SG Finance Tools](https://sgfinancetools.com/) — representative Singapore/Asian evidence for investment, retirement/FIRE, savings and household planning. |
| S10 | [RoviDev regional finance calculators](https://herramientas.rovidev.com/en/tools/finance-calculators/) — directional Latin American/multilingual evidence for compound interest, inflation, budgeting and retirement. |
| S11 | [Treasury.to global calculator directory](https://treasury.to/en) — international fallback evidence for compound growth, retirement/FIRE, inflation, savings goals and debt/budget decisions. |

## 4. Order profiles

### P1 — India investment-led

**Order:** investment → retirement → budget → inflation → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S1, S2, S3. SIP terminology and investment-calculator demand are unusually strong in India; retirement remains a major planning query. The remaining tools are ordered by broader household-planning demand, with FI/FIRE kept as a more specialized intent.

### P2 — Anglo retirement/investment-led

**Order:** retirement → investment → budget → inflation → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S1, S2, S4, S5, S6, S7. Retirement/pension and compound-saving tools receive high prominence across established English-language finance services. Budget and inflation are broad supporting needs; FI is more specialized.

### P3 — Continental Europe retirement/inflation-led

**Order:** retirement → inflation → budget → investment → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S1, S2, S8. Pension/retirement and inflation/purchasing-power tools recur prominently across European-language calculator catalogues. Budgeting and saving/investment remain important but use more country-specific terminology, so the initial profile uses a regional fallback.

### P4 — Mature East Asia retirement/investment-led

**Order:** retirement → investment → budget → inflation → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S1, S2, S9 and regional fallback. Aging-population retirement needs and savings/investment planning are the strongest comparable universal intents. Local pension/account terminology varies substantially by country.

### P5 — Asian financial-hub investment-led

**Order:** investment → retirement → budget → inflation → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S1, S2, S9. Investment/compound-growth and retirement/FIRE tools receive strong prominence in Singapore/Hong Kong/Malaysia finance ecosystems.

### P6 — Emerging Asia household-budget-led

**Order:** budget → investment → inflation → retirement → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S1, S2, S9, S11 and regional fallback. Budget/cash-flow, saving/investment and inflation are broad near-term household intents; retirement terminology and formal pension systems vary.

### P7 — Gulf household-planning-led

**Order:** budget → investment → retirement → inflation → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S1, S2, S11 and regional fallback. Household budgeting and investment/savings planning are the most transferable universal intents across resident and expatriate populations.

### P8 — Latin America investment/inflation-led

**Order:** investment → inflation → budget → retirement → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S1, S2, S10. Compound-interest/investment and inflation tools are prominent regional intents; budget and retirement follow.

### P9 — South Africa budget/retirement-led

**Order:** budget → retirement → investment → inflation → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S1, S2, S11 and regional English-language fallback. Household budgeting and retirement planning are prioritized ahead of generic recurring-investment terminology.

### P10 — High-inflation-market profile

**Order:** inflation → budget → investment → retirement → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S1, S2, S8, S10 and regional fallback. Inflation/purchasing-power questions are unusually central, followed by budget and savings/investment decisions.

### P11 — Other / International fallback

**Order:** retirement → investment → budget → inflation → goals → independence  
**Scores:** 6, 5, 4, 3, 2, 1  
**Evidence:** S11 plus the cross-market pattern in S4–S9. This is a conservative global fallback, not a country-specific claim.

## 5. Country-to-profile matrix

| Code | Country / region | Profile | Final order | Evidence / fallback note |
|---|---|---|---|---|
| IN | India | P1 | investment, retirement, budget, inflation, goals, independence | Direct India evidence (S1–S3). |
| US | United States | P2 | retirement, investment, budget, inflation, goals, independence | Direct representative evidence (S1, S2, S4). |
| CA | Canada | P2 | retirement, investment, budget, inflation, goals, independence | Direct representative evidence (S1, S2, S7). |
| GB | United Kingdom | P2 | retirement, investment, budget, inflation, goals, independence | Direct representative evidence (S1, S2, S5). |
| AU | Australia | P2 | retirement, investment, budget, inflation, goals, independence | Direct representative evidence (S1, S2, S6). |
| NZ | New Zealand | P2 | retirement, investment, budget, inflation, goals, independence | Anglo-market fallback from GB/AU/CA evidence. |
| IE | Ireland | P2 | retirement, investment, budget, inflation, goals, independence | Anglo/European English-language fallback. |
| AT | Austria | P3 | retirement, inflation, budget, investment, goals, independence | Continental Europe fallback (S8). |
| BE | Belgium | P3 | retirement, inflation, budget, investment, goals, independence | Continental Europe fallback (S8). |
| DE | Germany | P3 | retirement, inflation, budget, investment, goals, independence | Representative direct/regional evidence (S2, S8). |
| DK | Denmark | P3 | retirement, inflation, budget, investment, goals, independence | Nordic/continental fallback. |
| FI | Finland | P3 | retirement, inflation, budget, investment, goals, independence | Nordic/continental fallback. |
| FR | France | P3 | retirement, inflation, budget, investment, goals, independence | Continental Europe fallback (S8). |
| IT | Italy | P3 | retirement, inflation, budget, investment, goals, independence | Continental Europe fallback (S8). |
| NL | Netherlands | P3 | retirement, inflation, budget, investment, goals, independence | Representative direct/regional evidence (S8). |
| NO | Norway | P3 | retirement, inflation, budget, investment, goals, independence | Nordic/continental fallback. |
| PL | Poland | P3 | retirement, inflation, budget, investment, goals, independence | Representative regional evidence (S8). |
| PT | Portugal | P3 | retirement, inflation, budget, investment, goals, independence | Representative regional evidence (S8). |
| ES | Spain | P3 | retirement, inflation, budget, investment, goals, independence | Representative regional evidence (S8). |
| SE | Sweden | P3 | retirement, inflation, budget, investment, goals, independence | Nordic/continental fallback. |
| CH | Switzerland | P3 | retirement, inflation, budget, investment, goals, independence | Continental Europe fallback (S8). |
| CN | China | P4 | retirement, investment, budget, inflation, goals, independence | Mature East Asia fallback; local-language pension/savings terms vary. |
| JP | Japan | P4 | retirement, investment, budget, inflation, goals, independence | Mature East Asia fallback with strong retirement relevance. |
| KR | South Korea | P4 | retirement, investment, budget, inflation, goals, independence | Mature East Asia fallback with strong retirement relevance. |
| TW | Taiwan | P4 | retirement, investment, budget, inflation, goals, independence | Mature East Asia fallback. |
| SG | Singapore | P5 | investment, retirement, budget, inflation, goals, independence | Representative direct evidence (S1, S2, S9). |
| HK | Hong Kong | P5 | investment, retirement, budget, inflation, goals, independence | Asian financial-hub fallback from Singapore/HK market structure. |
| MY | Malaysia | P5 | investment, retirement, budget, inflation, goals, independence | Regional investment-led fallback. |
| BD | Bangladesh | P6 | budget, investment, inflation, retirement, goals, independence | Emerging Asia fallback. |
| ID | Indonesia | P6 | budget, investment, inflation, retirement, goals, independence | Emerging Asia fallback. |
| TH | Thailand | P6 | budget, investment, inflation, retirement, goals, independence | Emerging Asia fallback. |
| PH | Philippines | P6 | budget, investment, inflation, retirement, goals, independence | Emerging Asia fallback. |
| VN | Vietnam | P6 | budget, investment, inflation, retirement, goals, independence | Emerging Asia fallback. |
| AE | United Arab Emirates | P7 | budget, investment, retirement, inflation, goals, independence | Gulf resident/expatriate fallback. |
| SA | Saudi Arabia | P7 | budget, investment, retirement, inflation, goals, independence | Gulf regional fallback. |
| OM | Oman | P7 | budget, investment, retirement, inflation, goals, independence | Gulf regional fallback. |
| QA | Qatar | P7 | budget, investment, retirement, inflation, goals, independence | Gulf resident/expatriate fallback. |
| BR | Brazil | P8 | investment, inflation, budget, retirement, goals, independence | Latin America representative/fallback evidence (S2, S10). |
| MX | Mexico | P8 | investment, inflation, budget, retirement, goals, independence | Latin America representative/fallback evidence (S2, S10). |
| CL | Chile | P8 | investment, inflation, budget, retirement, goals, independence | Latin America regional fallback (S10). |
| ZA | South Africa | P9 | budget, retirement, investment, inflation, goals, independence | South Africa English-language/regional fallback. |
| RU | Russia | P10 | inflation, budget, investment, retirement, goals, independence | High-inflation-market fallback. |
| TR | Türkiye | P10 | inflation, budget, investment, retirement, goals, independence | High-inflation-market fallback. |
| OTHER | Other / International | P11 | retirement, investment, budget, inflation, goals, independence | Conservative global fallback (S11). |

## 6. Runtime implementation contract

The public homepage uses the country code returned by `CarrowmontLocale.getRegion()` and maps it to one of the profiles above. The real tool-card elements carry stable identifiers:

- `budget`
- `investment`
- `retirement`
- `inflation`
- `goals`
- `independence`

The implementation physically reorders the card nodes so keyboard and screen-reader traversal match the visual order. Currency-only changes do not select a different profile. The Explore All Tools gateway is appended after the ranked real tools and is never scored.

## 7. Future seventh tool

When the Home Loan / Mortgage Prepayment & Early Payoff tool is live, a new research revision must add its country-specific intent clusters, including terms such as:

- home loan prepayment / foreclosure calculator;
- mortgage payoff / early payoff calculator;
- mortgage overpayment calculator;
- extra repayment / home-loan repayment calculator.

It must not be added to the ranking before the page exists and has passed the standard Carrowmont release process.

## 8. Maintenance rule

On review, use Carrowmont Search Console impressions/clicks as the preferred first-party signal once sample size is meaningful. Preserve historical revisions so changes in homepage ordering remain explainable.
