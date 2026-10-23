# Carrowmont U.S. Emergency Savings & Income-Loss Resilience Report - Methodology

**Published:** 23 October 2026  
**Geography:** United States  
**Primary evidence source:** Federal Reserve Board, *Economic Well-Being of U.S. Households in 2025*, published 13 May 2026 from the 2025 Survey of Household Economics and Decisionmaking (SHED).

## 1. What is official data

The report reproduces or summarizes clearly labelled SHED measures, including:

- 55% of adults reporting a rainy-day fund sufficient for three months of expenses;
- 15% of all adults who did not have such a fund but could cover three months using other savings, borrowing or asset sales;
- 30% of adults who indicated they could not cover three months by those means;
- 63% who would cover a hypothetical $400 emergency expense using cash or its equivalent;
- 12% who said they would be unable to pay that $400 expense by any means;
- the distribution of the largest emergency expense adults said they could handle using only savings;
- the relationship between how often adults have money left over at month-end and whether they report three months of emergency savings.

Carrowmont does not reinterpret those percentages as probability forecasts or household targets.

## 2. Carrowmont runway calculation

For an accessible reserve `R` and a monthly cash shortfall `S` after any remaining dependable income:

`months_of_runway = R / S`

This is a deterministic arithmetic illustration. If the monthly shortfall is zero or negative, the simple reserve-runway calculation is not meaningful because the reserve is not being depleted by the modeled monthly cash flow.

## 3. Three-month examples

The illustrative three-month dollar targets use:

`three_month_target = 3 x monthly_essential_outflow`

They are examples, not universal recommendations. The correct reserve for a real household depends on income stability, essential costs, dependants, insurance, debt minimums, available support, job-search/recovery time and local protections.

## 4. Income-loss example

The example uses:

- dependable monthly income: $6,000;
- essential monthly outflow: $4,800;
- accessible reserve: $20,000.

For each income-reduction scenario:

`remaining_income = 6000 x (1 - reduction)`

`monthly_cash_shortfall = max(0, 4800 - remaining_income)`

`runway = 20000 / monthly_cash_shortfall`

The example excludes severance, unemployment benefits, tax changes, spending reductions, investment returns, new emergency expenses and any income recovery. It is not a forecast of unemployment duration.

## 5. Source definitions and limitations

SHED is a survey of U.S. adults. Survey responses are not the same as audited account balances, and national results do not describe any one household. The report keeps Federal Reserve measures separate from Carrowmont calculations.

Primary links:

- Federal Reserve savings and investments chapter: https://www.federalreserve.gov/publications/2026-economic-well-being-of-us-households-in-2025-savings-investments.htm
- Federal Reserve accessible tables: https://www.federalreserve.gov/publications/2026-economic-well-being-of-us-households-in-2025-accessible-version.htm
- Federal Reserve SHED overview: https://www.federalreserve.gov/consumerscommunities/shed.htm

## 6. Update policy

Major updates should occur when the Federal Reserve publishes a new annual SHED report or when methodology materially changes. The page should not receive artificial freshness updates between substantive releases.
