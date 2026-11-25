# Carrowmont Evergreen Learn content-gap and collision audit — 25 November 2026

## Purpose

This audit is the gate for Evergreen Learn Expansion after Learn Hub 2.0. It prevents Carrowmont from adding pages simply for volume. New guides must fill a distinct planning or educational intent, improve the Learn -> Ask -> Tool network, use authoritative multi-market sources, and avoid cannibalising an existing guide.

## Baseline reviewed

The audit was performed against the newest owner-supplied all-green snapshot available before this release. Exact code/commit authority always comes from `SNAPSHOT-MANIFEST.txt` in the newest completed all-green Source Snapshot supplied by the owner.

The Learn source contained 102+ public guide/tool destinations across the established 11 topic groups before this wave, with especially strong coverage in retirement, mortgages, gold/macro, budgeting, recurring investment and Financial Independence.

## External benchmark set

Authoritative/current references reviewed included:

- UK MoneyHelper — managing money, emergency savings, debt vs saving/investing, saving vs investing and investment risk:
  - https://www.moneyhelper.org.uk/en/everyday-money/budgeting/beginners-guide-to-managing-your-money
  - https://www.moneyhelper.org.uk/en/blog/debt-help/pay-off-debt-save-or-invest-first
  - https://www.moneyhelper.org.uk/en/savings/types-of-savings/emergency-savings-how-much-is-enough
  - https://www.moneyhelper.org.uk/en/savings/how-to-save/should-i-save-or-invest
  - https://www.moneyhelper.org.uk/beginners-guide-to-investing
- U.S. Consumer Financial Protection Bureau — emergency funds, home affordability, down payment and mortgage/home-buying costs:
  - https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/
  - https://www.consumerfinance.gov/owning-a-home/prepare/figure-out-how-much-you-want-to-spend/
  - https://www.consumerfinance.gov/owning-a-home/prepare/determine-your-down-payment/
  - https://www.consumerfinance.gov/ask-cfpb/what-costs-come-with-taking-out-a-mortgage-en-153/
- U.S. SEC / Investor.gov — asset allocation, risk tolerance, rebalancing, investment fees, dollar-cost averaging and volatility discipline:
  - https://www.investor.gov/introduction-investing/getting-started/asset-allocation
  - https://www.investor.gov/additional-resources/general-resources/publications-research/info-sheets/beginners-guide-asset
  - https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated
  - https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/mutual-fund-and-etf-fees-and-expenses-investor-bulletin
  - https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging
  - https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/world-investor-week-2026-investor-bulletin
- FINRA — Fund Analyzer and investor-risk education:
  - https://tools.finra.org/fund_analyzer/
- ASIC Moneysmart (Australia) — investing plan, diversification/rebalancing, volatility, investing checklist and buying a house:
  - https://moneysmart.gov.au/how-to-invest/develop-an-investing-plan
  - https://moneysmart.gov.au/how-to-invest/investment-diversification
  - https://moneysmart.gov.au/shares/what-is-share-market-volatility
  - https://moneysmart.gov.au/how-to-invest/questions-to-ask-before-you-invest
  - https://moneysmart.gov.au/home-loans/buying-a-house
- SEBI Investor (India) — investment planning, risk, diversification and portfolio review:
  - https://investor.sebi.gov.in/investment-thingsbeforeinv.html
  - https://investor.sebi.gov.in/investment_risk_managment.html
- Reserve Bank of India — home-loan consumer fees/down-payment guidance:
  - https://www.rbi.org.in/CommonPerson/English/Scripts/FAQs.aspx?Id=701
- Financial Consumer Agency of Canada — saving/investment goals and debt priority:
  - https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/savings-investment-goals.html
- UK Financial Conduct Authority — risk/return and capacity-for-loss framing:
  - https://www.fca.org.uk/investsmart/risk-returns

These sources were used to identify recurring education needs and decision frameworks. Their wording/design is not copied.

## Gap/collision results

### Priority A — distinct missing intent, strong global support, immediate Carrowmont connection

1. **Emergency fund vs paying off debt**
   - Missing intent: existing pages cover emergency-fund size and debt-vs-investing, but not the sequencing decision between liquidity and debt repayment.
   - Direct connections: Ask Money Priorities, Debt Payoff, Emergency Fund, Snowball/Avalanche.
   - Decision: CREATE.

2. **Risk tolerance vs risk capacity**
   - Missing intent: existing asset-allocation/beginner guides mention risk but do not separate emotional willingness from financial ability to absorb loss.
   - Direct connections: Goal Planner, Asset Allocation, Diversification.
   - Decision: CREATE.

3. **Portfolio rebalancing**
   - Missing intent: asset allocation exists but maintenance after portfolio drift does not.
   - Direct connections: Asset Allocation, Diversification, Goal Planner.
   - Decision: CREATE.

4. **Investment fees and expense ratios**
   - Missing intent: mutual-fund and ETF pages mention fees, but no cross-product guide explains the compounding effect and total-cost checklist.
   - Direct connections: Compound Interest Calculator, Mutual Funds, ETFs, Index Funds.
   - Decision: CREATE.

5. **Market timing vs staying invested**
   - Missing intent: the recurring-investing market-fall guide covers one contribution pattern, but Carrowmont lacks a broader plan-vs-forecast framework.
   - Direct connections: Recurring Investment Calculator, Market Fall guide, Risk Capacity, Rebalancing.
   - Decision: CREATE.

6. **Home-buying upfront cash beyond the deposit**
   - Missing intent: home affordability and lender approval are covered, but the cash needed for fees, registration/closing, moving, repairs and post-purchase reserves is not a standalone decision framework.
   - Direct connections: Home Affordability Calculator, Emergency Fund, Rent vs Buy.
   - Decision: CREATE.

### Priority B — strong future candidates, but defer until Wave 1 is measured

- Bond price vs yield mechanics for ordinary investors.
- Nominal return vs real return after inflation and fees.
- How to evaluate financial/investment claims, finfluencers and scams using regulator/registration checks.
- Insurance as financial protection vs emergency savings (requires careful multi-market product/regulatory framing).
- Dividend yield vs total return.
- A periodic financial-plan review checklist after major life changes.

### Do not create now — collision or jurisdiction risk is too high

- Another generic “investing for beginners” page — already strong coverage.
- Another emergency-fund amount page — already covered.
- Another debt-vs-invest page — already covered.
- Country-specific tax optimisation pages without jurisdiction-specific maintenance ownership.
- Country-specific pension/account contribution-limit pages as global evergreen content.
- Thin “best investment” or product-ranking pages.

## Wave 1 internal-link rule

Every new guide must have:

- at least one relevant Carrowmont action/tool or guided-Ask route;
- at least three related Learn routes;
- at least one bidirectional link from an existing relevant guide;
- Learn Hub category inclusion;
- Search inventory + generated Search index inclusion;
- sitemap inclusion and updated `lastmod`;
- explicit authoritative sources and global/country caveats where relevant.

## Indexing consequence

Wave 1 creates new public Learn URLs. After the release is merged and passes deployed QA/Guard, sitemap and IndexNow should include them automatically. Selective Google Search Console Request Indexing is appropriate for the six new high-value URLs after the final all-green snapshot confirms deployment.
