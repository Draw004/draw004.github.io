# Carrowmont Mortgage Affordability Monitor - Methodology

**Release:** TRAFFIC1A, 23 October 2026  
**Geography:** United States  
**Purpose:** Educational research and scenario analysis; not a lender quote, approval model or forecast.

## Data inputs

- Freddie Mac Primary Mortgage Market Survey (PMMS): 30-year fixed-rate reference. Current value used: **7.32% on 22 October 2026**. Comparable year-earlier observation: **6.19% on 23 October 2025**.
- U.S. Census Bureau / HUD New Residential Sales: latest median new-house sale price available for this release: **$393,700, August 2026**.
- U.S. Census Bureau CPS ASEC, *Income in the United States: 2025*: median household income **$87,460**.

Retrieval date for this Carrowmont release: **23 October 2026**.

## Mortgage payment formula

For principal `P`, monthly rate `r` and number of monthly payments `n`:

`payment = P * r * (1+r)^n / ((1+r)^n - 1)`

All standardized scenarios use a 30-year term (`n = 360`).

## Sensitivity table

Loan balances: $200,000; $300,000; $400,000; $500,000; $750,000.  
Rates: current PMMS minus 1 percentage point, current PMMS, current PMMS plus 1 percentage point.

These are sensitivity cases, not predictions of future rates.

## Median-new-home reference

The monitor applies a standardized **20% down payment** to the national median new-house sale price. The resulting loan is calculated at the current PMMS 30-year fixed reference rate.

The payment excludes property tax, homeowners insurance, mortgage insurance, HOA/strata charges, closing costs, maintenance and lender fees.

## Income comparison

`P&I share = standardized monthly principal-and-interest payment / (annual median household income / 12)`

The displayed **29.69%** is labelled “P&I-only payment as a share of gross median household income.” It is **not** a lender debt-to-income ratio or qualification threshold.

## Historical charts

The PMMS line chart uses one weekly survey observation per month for a compact 12-month view; it is not a monthly average. The home-price line uses recent monthly Census/HUD series values; published monthly estimates may be revised.

## Reproducibility

Carrowmont publishes the normalized JSON and calculation CSV used by the page. Values are rounded for display only; calculations use full precision before display rounding.
