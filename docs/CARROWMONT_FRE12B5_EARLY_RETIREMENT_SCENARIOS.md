# Carrowmont FRE12B-5 - Early-retirement Scenarios

## Purpose
Extend the existing Financial Independence planner so a user can compare an earlier exit from full-time work, the current target age, one more working year, and an earlier scenario with user-entered bridge income or spending changes.

## Research-informed design
Public search and community research repeatedly surfaced practical questions such as “can I retire at 45/50?”, “what does one more year change?”, part-time/bridge income, healthcare before pension/benefit eligibility, sequence-of-returns risk and uncertainty about whether a mathematically sufficient FIRE number is enough. The product therefore avoids fixed Lean/Fat/Barista percentage presets and instead uses explicit user-entered assumptions.

## Product rules
- Reuse the existing Financial Independence core; no second FIRE formula.
- Keep the selected target age as the baseline.
- Compare an earlier age, current target and one-more-year path under the same assumptions.
- Optional bridge income and spending percentage are scenario-only and are not silently persisted to My Carrowmont.
- Do not infer pension dates, taxes, healthcare eligibility, insurance costs or country-specific retirement rules.
- State clearly that deterministic constant-return modelling does not simulate sequence-of-returns risk.
- Do not recommend whether the user should keep working or retire.
- Add no new public URL or tool card.

## Discovery
The existing Early Retirement Planning guide links directly to `/financial-independence/#early-retirement-scenarios`. Search metadata adds ordinary-language phrases such as “can I retire at 50”, “when can I retire early”, “one more year retirement” and “part time income retirement”.

## Acceptance
Source contract, search ownership, standards preflight, Publisher browser QA, deployed live-site verification, Multi-Repo Guard and a fresh all-green snapshot are required before closeout.

## Publisher v1.1 browser repair

The first staged browser run exposed one real global-first UX issue and one QA selector issue. Non-India/default locales intentionally clear demo money values, so the new early-retirement section could appear with an empty card grid before the user entered a main FI plan. The runtime now shows a clear **Add your FI details above** state instead of a blank comparison and replaces it with the four scenario cards once valid planner inputs exist. Browser QA now seeds a deterministic main-plan fixture before asserting scenario values and selects the intended guide CTA by accessible name, avoiding strict-mode ambiguity from two legitimate links to the same anchor. No FI formula, search ranking, public URL, saved-plan behavior, or country/currency rule changed.

## Publisher v1.2 save-bridge repair

The v1.1 staged browser rerun reduced the failure set to one real runtime defect. Once a user entered FI values, the existing My Carrowmont save bridge called `getPlan()`, which read `r.modelledFI`, `r.requiredContribution` and `r.additionalContribution` without first creating the FI result object `r`. That produced repeated `ReferenceError: r is not defined` page errors even though the four early-retirement cards rendered. v1.2 fixes the product source by computing `const r = C.result(s)` inside `getPlan()` before those summary fields are read. A deterministic contract now protects that exact initialization order. No FI formula, scenario logic, search ownership, country/currency behavior, public URL, or persistence boundary changed.
