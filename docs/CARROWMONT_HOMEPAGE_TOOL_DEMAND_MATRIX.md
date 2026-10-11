# Carrowmont Homepage Tool Demand Matrix

**Status:** CORE7 build-time ordering dataset
**Research revision:** 11 October 2026
**Applies to:** the seven primary homepage planning tools
**Review target:** every 6-12 months, or sooner when Carrowmont Search Console data materially changes the picture

## 1. Purpose

Carrowmont keeps one universal set of primary planning tools, but the order of those tools on the homepage should reflect the financial questions people most commonly look for in the selected country. This document records the evidence, fallbacks and deterministic ordering used by the homepage. It is a build-time product input; the public site does not call an external keyword, trend or ranking API.

The seven ranked tools are:

| Tool key | Universal intent cluster |
|---|---|
| `investment` | recurring investment, compound growth, SIP, monthly investment |
| `housing` | home-loan prepayment / foreclosure, mortgage payoff / overpayment, extra repayments |
| `budget` | budget planner, cash-flow planner, spending planner |
| `retirement` | retirement calculator, pension calculator, retirement corpus / savings target |
| `inflation` | inflation calculator, future cost, purchasing-power calculator |
| `goals` | savings goal, goal planner, target contribution calculator |
| `independence` | financial independence, FIRE number, early-retirement calculator |

**Explore All Tools** is outside the ranking system and remains the fixed eighth gateway card.

## 2. Evidence standard and limitations

The matrix uses a hierarchy of country-selectable search-volume evidence where defensible, Google Trends as a corroborating signal, the prominence of calculator categories on established local finance/public-information sites, and documented regional/global fallbacks when like-for-like country data are weak.

Exact comparable monthly volume is not available for every country and every translated synonym. The matrix therefore uses ordinal priority rather than fabricated precision. With seven tools, rank 1 is the highest-priority homepage position and rank 7 the lowest among the primary tools. The matrix is directional homepage prioritization, not a claim that every resident of a country has the same needs.

## 3. Research source registry

| Source key | Source and use |
|---|---|
| S1 | [Semrush Keyword Search Volume Checker](https://www.semrush.com/free-tools/keyword-search-volume-checker/) - country-selectable demand checks and synonym comparison. |
| S2 | [Google Trends Explore](https://trends.google.com/trends/explore) - country-level relative-interest corroboration where terms were comparable. |
| S3 | [Groww financial calculators](https://groww.in/calculators) - representative India evidence for SIP/recurring-investment and retirement calculator demand. |
| S4 | [Bankrate calculators](https://www.bankrate.com/calculators/) - representative United States evidence across mortgages, retirement, savings and household finance. |
| S5 | [MoneyHelper tools and calculators](https://www.moneyhelper.org.uk/en/tools-and-calculators.html) - representative United Kingdom evidence for mortgages, pensions/retirement, budgeting and savings. |
| S6 | [Moneysmart calculators](https://moneysmart.gov.au/) - Australian public-interest evidence for home loans, retirement, budgeting and investing. |
| S7 | [WealthWise Canada calculators](https://mywealthwise.ca/en/calculators) and [CalcCanada](https://calccanada.ca/finance/) - representative Canadian evidence for retirement/FIRE and saving. |
| S8 | [CalcuZone Europe finance calculators](https://calcuzone.eu/calculators/finance) and [DEdata inflation check](https://de-data.de/en/inflation-check) - multilingual European evidence for retirement, savings/interest and inflation. |
| S9 | [SG Finance Tools](https://sgfinancetools.com/) - representative Singapore/Asian evidence for investment, retirement/FIRE, savings and household planning. |
| S10 | [RoviDev regional finance calculators](https://herramientas.rovidev.com/en/tools/finance-calculators/) - directional Latin American/multilingual evidence for compound interest, inflation, budgeting and retirement. |
| S11 | [Treasury.to global calculator directory](https://treasury.to/en) - international fallback evidence across compound growth, retirement/FIRE, inflation, savings goals and debt/budget decisions. |
| S12 | [seodata.dev - mortgage payoff calculator](https://www.seodata.dev/keyword/mortgage-payoff-calculator) - US mortgage-payoff keyword evidence; June 2026 page reported approximately 74,000 monthly searches using Google Ads API-based data. |
| S13 | [Techmagnate Home Loan Trends India FY2024-25](https://www.techmagnate.com/campaigns/ppc/health-insurance-industry-trends-india/pdf/2024/Techmagnate-Home-Loan-STR.pdf) - India home-loan calculator and housing-loan prepayment intent evidence. |
| S14 | [Consumer Financial Protection Bureau](https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/) - US consumer payoff context and terminology. |
| S15 | [Financial Consumer Agency of Canada](https://www.canada.ca/en/financial-consumer-agency/services/rights-responsibilities/rights-mortgages/rights-prepayments.html) - Canadian mortgage prepayment terminology and consumer relevance. |
| S16 | [MoneyHelper - pay off your mortgage early](https://www.moneyhelper.org.uk/en/homes/buying-a-home/should-you-pay-off-your-mortgage-early) - UK overpayment / early repayment consumer context. |
| S17 | [Moneysmart - pay off your mortgage faster](https://moneysmart.gov.au/home-loans/pay-off-your-mortgage-faster) - Australian extra-repayment consumer context. |
| S18 | [Sorted mortgage calculator](https://sorted.org.nz/tools/mortgage-calculator/) - New Zealand mortgage repayment context. |

## 4. Order profiles

### P1 - India investment + housing-led

**Order:** investment → housing → retirement → budget → inflation → goals → independence

**Rationale:** Direct India evidence shows unusually strong SIP / recurring-investment demand and material home-loan calculator / prepayment intent. Retirement and broad household planning follow.

### P2 - Anglo housing + retirement-led

**Order:** housing → retirement → investment → budget → inflation → goals → independence

**Rationale:** Mortgage payoff / overpayment / extra-repayment calculators are prominent across US, Canada, UK and Australia, while retirement and investment remain broad high-intent categories.

### P3 - Continental Europe retirement + housing-led

**Order:** retirement → housing → inflation → budget → investment → goals → independence

**Rationale:** Retirement/pension is the strongest universal planning cluster; housing debt and inflation follow. Local mortgage terminology varies, so the housing rank is a regional product fallback rather than a claim of identical keyword volume.

### P4 - Mature East Asia retirement + housing-led

**Order:** retirement → housing → investment → budget → inflation → goals → independence

**Rationale:** Retirement and housing are durable household planning needs; investment follows. Local pension and mortgage terminology varies materially by country.

### P5 - Asian financial-hub investment + housing-led

**Order:** investment → housing → retirement → budget → inflation → goals → independence

**Rationale:** Investment / compound-growth and housing finance are prominent in high-cost financial hubs, with retirement/FIRE close behind.

### P6 - Emerging Asia household-budget + housing-led

**Order:** budget → housing → investment → inflation → retirement → goals → independence

**Rationale:** Near-term household cash flow and housing commitments are prioritized before broader investing and retirement terms.

### P7 - Gulf household-planning + housing-led

**Order:** budget → housing → investment → retirement → inflation → goals → independence

**Rationale:** Budget/cash-flow and housing costs are broadly relevant across resident and expatriate populations; investment and retirement follow.

### P8 - Latin America investment + housing/inflation-led

**Order:** investment → housing → inflation → budget → retirement → goals → independence

**Rationale:** Compound-growth/investment remains prominent, with housing and inflation as major household planning concerns.

### P9 - South Africa budget + housing/retirement-led

**Order:** budget → housing → retirement → investment → inflation → goals → independence

**Rationale:** Household budgeting and housing commitments are prioritized, followed by retirement and investment.

### P10 - High-inflation-market profile

**Order:** inflation → budget → housing → investment → retirement → goals → independence

**Rationale:** Inflation/purchasing power remains first, followed by budget and housing-debt decisions.

### P11 - Other / International fallback

**Order:** retirement → housing → investment → budget → inflation → goals → independence

**Rationale:** Conservative global fallback using cross-market prominence of retirement, housing debt, investing and budget planning.

## 5. Country-to-profile matrix

| Code | Country / region | Profile | Final order | Evidence / fallback note |
|---|---|---|---|---|
| IN | India | P1 | investment, housing, retirement, budget, inflation, goals, independence | Direct India evidence (S1-S3, S12-S13). |
| US | United States | P2 | housing, retirement, investment, budget, inflation, goals, independence | Direct representative evidence (S1, S2, S4, S12, S14). |
| CA | Canada | P2 | housing, retirement, investment, budget, inflation, goals, independence | Direct representative evidence (S1, S2, S7, S15). |
| GB | United Kingdom | P2 | housing, retirement, investment, budget, inflation, goals, independence | Direct representative evidence (S1, S2, S5, S16). |
| AU | Australia | P2 | housing, retirement, investment, budget, inflation, goals, independence | Direct representative evidence (S1, S2, S6, S17). |
| NZ | New Zealand | P2 | housing, retirement, investment, budget, inflation, goals, independence | Anglo-market fallback with local mortgage terminology support (S18). |
| IE | Ireland | P2 | housing, retirement, investment, budget, inflation, goals, independence | Anglo/European English-language fallback. |
| AT | Austria | P3 | retirement, housing, inflation, budget, investment, goals, independence | Continental Europe fallback (S8). |
| BE | Belgium | P3 | retirement, housing, inflation, budget, investment, goals, independence | Continental Europe fallback (S8). |
| DE | Germany | P3 | retirement, housing, inflation, budget, investment, goals, independence | Representative direct/regional evidence (S2, S8). |
| DK | Denmark | P3 | retirement, housing, inflation, budget, investment, goals, independence | Nordic/continental fallback. |
| FI | Finland | P3 | retirement, housing, inflation, budget, investment, goals, independence | Nordic/continental fallback. |
| FR | France | P3 | retirement, housing, inflation, budget, investment, goals, independence | Continental Europe fallback (S8). |
| IT | Italy | P3 | retirement, housing, inflation, budget, investment, goals, independence | Continental Europe fallback (S8). |
| NL | Netherlands | P3 | retirement, housing, inflation, budget, investment, goals, independence | Representative direct/regional evidence (S8). |
| NO | Norway | P3 | retirement, housing, inflation, budget, investment, goals, independence | Nordic/continental fallback. |
| PL | Poland | P3 | retirement, housing, inflation, budget, investment, goals, independence | Representative regional evidence (S8). |
| PT | Portugal | P3 | retirement, housing, inflation, budget, investment, goals, independence | Representative regional evidence (S8). |
| ES | Spain | P3 | retirement, housing, inflation, budget, investment, goals, independence | Representative regional evidence (S8). |
| SE | Sweden | P3 | retirement, housing, inflation, budget, investment, goals, independence | Nordic/continental fallback. |
| CH | Switzerland | P3 | retirement, housing, inflation, budget, investment, goals, independence | Continental Europe fallback (S8). |
| CN | China | P4 | retirement, housing, investment, budget, inflation, goals, independence | Mature East Asia fallback; local-language pension/housing terms vary. |
| JP | Japan | P4 | retirement, housing, investment, budget, inflation, goals, independence | Mature East Asia fallback with strong retirement relevance. |
| KR | South Korea | P4 | retirement, housing, investment, budget, inflation, goals, independence | Mature East Asia fallback with strong retirement relevance. |
| TW | Taiwan | P4 | retirement, housing, investment, budget, inflation, goals, independence | Mature East Asia fallback. |
| SG | Singapore | P5 | investment, housing, retirement, budget, inflation, goals, independence | Representative direct/regional evidence (S1, S2, S9). |
| HK | Hong Kong | P5 | investment, housing, retirement, budget, inflation, goals, independence | Asian financial-hub fallback. |
| MY | Malaysia | P5 | investment, housing, retirement, budget, inflation, goals, independence | Regional investment/housing fallback. |
| BD | Bangladesh | P6 | budget, housing, investment, inflation, retirement, goals, independence | Emerging Asia fallback. |
| ID | Indonesia | P6 | budget, housing, investment, inflation, retirement, goals, independence | Emerging Asia fallback. |
| TH | Thailand | P6 | budget, housing, investment, inflation, retirement, goals, independence | Emerging Asia fallback. |
| PH | Philippines | P6 | budget, housing, investment, inflation, retirement, goals, independence | Emerging Asia fallback. |
| VN | Vietnam | P6 | budget, housing, investment, inflation, retirement, goals, independence | Emerging Asia fallback. |
| AE | United Arab Emirates | P7 | budget, housing, investment, retirement, inflation, goals, independence | Gulf resident/expatriate fallback. |
| SA | Saudi Arabia | P7 | budget, housing, investment, retirement, inflation, goals, independence | Gulf regional fallback. |
| OM | Oman | P7 | budget, housing, investment, retirement, inflation, goals, independence | Gulf regional fallback. |
| QA | Qatar | P7 | budget, housing, investment, retirement, inflation, goals, independence | Gulf resident/expatriate fallback. |
| BR | Brazil | P8 | investment, housing, inflation, budget, retirement, goals, independence | Latin America representative/fallback evidence (S2, S10). |
| MX | Mexico | P8 | investment, housing, inflation, budget, retirement, goals, independence | Latin America representative/fallback evidence (S2, S10). |
| CL | Chile | P8 | investment, housing, inflation, budget, retirement, goals, independence | Latin America regional fallback (S10). |
| ZA | South Africa | P9 | budget, housing, retirement, investment, inflation, goals, independence | South Africa English-language/regional fallback. |
| RU | Russia | P10 | inflation, budget, housing, investment, retirement, goals, independence | High-inflation-market fallback. |
| TR | Türkiye | P10 | inflation, budget, housing, investment, retirement, goals, independence | High-inflation-market fallback. |
| OTHER | Other / International | P11 | retirement, housing, investment, budget, inflation, goals, independence | Conservative global fallback (S11 plus cross-market housing evidence). |

## 6. Runtime implementation contract

The public homepage uses the country code returned by `CarrowmontLocale.getRegion()` and maps it to one of the profiles above. The seven real tool-card elements carry stable identifiers:

- `budget`
- `investment`
- `retirement`
- `inflation`
- `goals`
- `independence`
- `housing`

The implementation physically reorders the card nodes so keyboard and screen-reader traversal match the visual order. Currency-only changes do not select a different profile. The **Explore All Tools** gateway is appended after the seven ranked tools and is never scored.

## 7. Housing terminology contract

The `housing` card keeps one stable tool identity and URL while visible wording changes by country. India uses Home Loan Prepayment / Foreclosure language; the US uses Mortgage Payoff; Canada uses Mortgage Prepayment & Payoff; the UK and Ireland use Mortgage Overpayment; Australia and New Zealand use Home Loan Extra Repayments. The country changes wording and homepage rank; currency-only changes do neither.

## 8. Maintenance rule

On review, use Carrowmont Search Console impressions/clicks as the preferred first-party signal once sample size is meaningful. Record source dates and preserve historical revisions so changes in homepage ordering remain explainable. Do not alter the matrix in response to one or two impressions; use the established Carrowmont evidence threshold and review discipline.
