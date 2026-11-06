# Carrowmont GLOBAL2 / FRE Batch 0A — Global Country Coverage Expansion

## Purpose

Expand the shared Carrowmont localization catalogue before the Financial Resolution Engine starts relying heavily on country context. This release changes formatting, default currency and first-visit timezone inference only. It does **not** add local tax, pension, benefits, mortgage-law, inflation, return or regulatory assumptions.

## Baseline

- Post-FRE-Batch-0 snapshot generated 2026-11-06T20:28:12Z.
- 11 repositories.
- Source contract before this change: **723 PASS / 0 FAIL**.
- Existing catalogue: **43 named countries + Other / International = 44 region profiles; 34 currencies**.

## Added named countries

Argentina (AR), Israel (IL), Colombia (CO), Romania (RO), Pakistan (PK), Czechia (CZ), Egypt (EG), Peru (PE), Kazakhstan (KZ), Nigeria (NG), Greece (GR), Morocco (MA), Kuwait (KW), Uzbekistan (UZ), Kenya (KE).

The resulting catalogue is **58 named countries + Other / International = 59 region profiles**.

## Added currencies

ARS, ILS, COP, RON, PKR, CZK, EGP, PEN, KZT, NGN, MAD, KWD, UZS and KES. Greece uses existing EUR. The resulting currency catalogue is **48 currencies**.

## Product rules

1. Existing country/currency storage keys remain unchanged.
2. Existing currency override behavior remains unchanged.
3. Country selectors remain alphabetical; Other / International remains last.
4. New countries use neutral international terminology unless an established Carrowmont country rule already applies.
5. New contribution-frequency metadata, where required by an existing tool, defaults to monthly with neutral Every 2 Weeks wording. This is a UI suggestion only, not a payroll/legal assumption.
6. Existing India SIP/EMI/Home Loan terminology and all other established local terminology remain protected.
7. Learn money examples receive explicit illustrative scale profiles for every new currency; they are not exchange-rate claims.
8. No calculator formula, chart formula, PDF arithmetic or report methodology is changed.
9. Timezone inference is privacy-first and remains device-local; no IP geolocation is introduced.
10. Future country-specific financial rules require separate research and a separate release.

## Timezone coverage

Representative IANA zones are mapped for all 15 countries, including multi-zone Argentina and Kazakhstan and both Uzbekistan zones. Browser-language country detection remains the fallback after timezone detection.

## Homepage tool order

Existing regional demand profiles are reused only where the grouping is already established; Kazakhstan and Uzbekistan use the neutral default profile. This release does not introduce new financial assumptions or new tool-order profiles.

## QA

QA must lock:

- 59 region profiles on locale-enabled tools;
- 48 currencies;
- alphabetical country selectors with Other / International last;
- presence and exact metadata for all 15 new profiles in the SIP locale runtime;
- explicit Learn example coverage for all 48 currencies;
- homepage tools-hub mapping for every supported region;
- representative timezone detection strings;
- no regression to existing localization, calculators, reports, charts or shared state.
