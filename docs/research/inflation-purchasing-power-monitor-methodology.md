# Carrowmont U.S. Inflation & Purchasing-Power Monitor - Methodology

**Published:** 26 October 2026  
**Geography:** United States  
**Primary evidence source:** U.S. Bureau of Labor Statistics, Consumer Price Index for All Urban Consumers (CPI-U), September 2026 release dated 14 October 2026.

## 1. What is official data

The monitor reproduces or summarizes clearly labelled BLS CPI-U measures, including:

- all-items CPI-U: +0.6% month over month, seasonally adjusted, in September 2026;
- all-items CPI-U: +3.7% over the 12 months to September 2026, not seasonally adjusted;
- all items less food and energy: +0.3% month over month and +2.6% over 12 months;
- the September 2026 all-items CPI-U index level of 336.940 (1982-84=100);
- BLS relative-importance weights and 12-month changes for the eight major expenditure groups;
- selected detailed category changes such as energy, gasoline, electricity, shelter, hospital services and airline fares;
- historical September CPI-U index anchors from the BLS U.S. city-average historical table.

Carrowmont does not present an official BLS value as a forecast or as the inflation experience of any one household.

## 2. Purchasing-power calculation

For a historical CPI index `I_old` and the current September 2026 CPI index `I_current`:

`current_dollars_needed = 100 x (I_current / I_old)`

This answers: how many September 2026 dollars would be needed to match the broad purchasing power of $100 at the earlier index level?

The reverse view is:

`current_100_in_old_dollars = 100 x (I_old / I_current)`

These calculations compare general CPI price levels. They do not represent investment returns, wages, taxes, exchange rates or the price of any one product.

## 3. Major-group weighted spending illustration

The interactive basket uses the eight mutually exclusive BLS major expenditure groups:

- food and beverages;
- housing;
- apparel;
- transportation;
- medical care;
- recreation;
- education and communication;
- other goods and services.

For user-entered spending shares `w_i` and current 12-month BLS major-group price changes `r_i`:

`weighted_rate = sum(w_i x r_i) / sum(w_i)`

The published BLS relative-importance values sum to 100.001% because of rounding.

This weighted result is a **Carrowmont illustration, not an official personal CPI**. It does not reproduce BLS item-level sampling, expenditure updates, index formulas, seasonal treatment, substitutions, quality adjustments, geography or taxes. It is intended only to make the effect of a different spending mix transparent.

## 4. Selected pressure-point categories

The pressure-point chart includes selected categories that may overlap broader expenditure groups. The values are shown for context only and must not be added together as a decomposition of headline inflation.

## 5. Data handling and privacy

The research page is static. The personal-basket calculation runs entirely in the browser. User-entered weights are not transmitted, stored, placed in the URL or sent to analytics.

## 6. Sources

- BLS CPI September 2026 news release: https://www.bls.gov/news.release/cpi.htm
- BLS CPI home / release schedule: https://www.bls.gov/cpi/
- BLS CPI-U historical U.S. city-average table: https://www.bls.gov/regions/mid-atlantic/data/consumerpriceindexhistorical_us_table.htm

## 7. Update policy

The monitor is designed for substantive monthly updates after a new BLS CPI release. A monthly update should refresh the official metrics, major-group changes, selected pressure points, latest index, purchasing-power anchors where necessary, charts, dataset files, page analysis, `dateModified` and sitemap `lastmod`.

Do not manufacture freshness between releases. The page should retain a stable canonical URL rather than creating thin monthly pages.
