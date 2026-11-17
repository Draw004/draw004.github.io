# Carrowmont FRE Batch 10 — Acceptance Ledger

Status: **COMPLETE — all Batch 10 release gates green.**

| Requirement | Outcome |
|---|---|
| Existing localization remains authoritative for country labels, currency and terminology | PASS — Batch 10 reads `CarrowmontLocale`; it does not replace it. |
| Move beyond labels only where reliable country context exists | PASS — verified context is limited to India, United States, United Kingdom, Canada, Australia, Japan, South Korea, France and Italy; unsupported markets receive no invented policy reference. |
| Verified reference model exists | PASS — `/data/country-financial-reference.json` is retained as the reviewed source record and the runtime embeds the same verified values. |
| Official policy-rate reference is sourced | PASS — each supported market has an official central-bank source. |
| Official inflation target/control range is sourced | PASS — each supported market has an official source. |
| Reference freshness/review date is visible | PASS — data set has `reviewedAt`; policy-rate entries carry an as-of date. |
| Country context is explainable | PASS — panel states why the reference matters and links the official source; runtime delivery uses the established Trust asset path. |
| Policy rate is not presented as lender/product rate | PASS — borrowing copy explicitly separates the central-bank rate from user/lender rates. |
| Inflation target is not presented as forecast/current inflation | PASS — planning/inflation copy explicitly states the distinction. |
| User-entered assumptions remain authoritative | PASS — Country Context never writes calculator inputs. |
| Saved plans remain unchanged unless user explicitly saves/updates | PASS — component has no account-storage or save/update write path. |
| Unsupported countries do not receive invented rules | PASS — panel is hidden when no verified profile exists. |
| Core planning/borrowing/inflation tools receive the shared layer | PASS — 13 primary tool surfaces load the shared component. |
| No automatic FX conversion is introduced | PASS — existing locale/currency behavior is untouched. |
| No tax/regulatory engine is invented | PASS — v1 contains monetary-policy reference context only. |
| Methodology explains scope and limitations | PASS — public Methodology page updated. |
| Future Ask can reuse the same verified model | PASS — shared `getReference(region)` API exposed. |
| Policy-rate references have a protected refresh path | PASS — weekday updater checks official RBI, Federal Reserve, Bank of England, Bank of Canada, RBA, Bank of Japan, Bank of Korea and ECB sources and opens a review PR only on validated change. |
| Update direction cannot repeat the earlier sign bug | PASS — change is numeric `proposed - stored`, rendered as explicit `+`/`-` percentage-point movement; dedicated unit checks cover positive, negative and zero. |
| Stale / implausible automated updates fail closed | PASS — older-than-stored, future-dated, >120-day-old changed observations and >2.00pp moves are blocked. |
| Canonical and embedded references cannot drift during an automated update | PASS — both files are changed together and exact equality is verified before and after write. |
| Shared Euro Area reference cannot drift between France and Italy | PASS — one ECB observation updates both profiles atomically and the updater fails closed if their stored policy references diverge. |
| China remains outside the automated country-reference layer | PASS — CN has no verified profile and the Country Context panel remains hidden rather than inferring a benchmark. |
| Inflation target frameworks are not confused with monthly inflation | PASS — weekday automation preserves the reviewed framework fields unchanged. |
| Home Affordability starter magnitudes follow currency scale | PASS — NZD uses round thousands/million-scale examples rather than India-scale raw defaults; other currencies use the same currency-aware starter pattern. |
| Locale changes do not overwrite edited Home Affordability inputs | PASS — automatic starter refresh stops as soon as the user edits an input; Reset intentionally reloads current-locale starters. |
| No calculator formula or deterministic engine changed | PASS. |
| No Supabase schema, Google OAuth or account-ownership change | PASS. |
| No new public URL or sitemap/indexing impact | PASS. |
| Browser QA covers all nine supported country profiles, NZ/CN unsupported fallback and no-overwrite boundary | PASS — all-green Automated QA after the V4 country-reference expansion. |
| Source contract | PASS — reconstructed authoritative snapshot run: 1254 PASS / 0 FAIL. |
| Publisher / Automated QA / Multi-Repo Guard | PASS — all release gates green. |
| Authoritative Source Snapshot | PASS — `carrowmont-source-snapshot - 2026-11-17T163512.278.zip` (`f807c30249db47e5df0943d62cea73904bd78aee25aa925d81144c72eea68add`). |
