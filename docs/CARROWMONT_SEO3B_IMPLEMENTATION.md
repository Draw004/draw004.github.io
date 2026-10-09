# Carrowmont SEO3B — FI Number by Spending Implementation Record

**Release:** SEO3B — Financial Independence Number by Spending  
**Implementation date:** 9 October 2026  
**Approved baseline:** Carrowmont Source Snapshot 28  
**Main-site baseline commit:** `db7ddd730cf06cb556ecefd95683b6a54c44bb8e`  
**Financial Independence baseline commit:** `f0abbb8c3be6cf511dabc700713a6300c9b13c84`  
**Central QA baseline commit:** `d502cef34c23d76428df73f40701bf6fd9e3d8b8`

## Purpose

SEO3B implements the approved public authority asset at:

`https://carrowmont.com/financial-independence-number-by-spending.html`

It gives a transparent first-pass financial-independence target from portfolio-funded spending and a user-selected planning withdrawal-rate assumption. It remains intentionally narrower than the full Financial Independence Planner.

## Calculation contract

The implementation follows the approved specification and does not change the existing Financial Independence calculation engine.

- Monthly spending is multiplied by 12; annual spending is used directly.
- FI number today = annual portfolio-funded spending / planning withdrawal rate.
- Spending multiple = 1 / planning withdrawal rate.
- Future annual spending = annual spending today × (1 + inflation)^years.
- Future nominal FI number = future annual spending / the same planning withdrawal rate.
- Standard withdrawal-rate comparison = 3%, 3.5%, 4% and 5%, plus the visitor's selected rate when it is different.
- Spending sensitivity = 80%, 90%, 100%, 110% and 120% of the entered portfolio-funded spending.
- The withdrawal rate is presented as a planning assumption, not a guaranteed or universally safe rate.

The new pure calculation module is `financial-independence-number-by-spending-core.js`. The existing `financial-independence/core.js` is not modified.

## Carrowmont product and visual standards

SEO3B reuses the established Carrowmont shell, locale model and report conventions. The release applies the approved visual-consistency requirements before production merge:

- Carrowmont typography and spacing hierarchy.
- Shared country/currency catalogue and number formatting.
- Indian compact-money formatting through the shared locale formatter.
- Chart text explicitly uses the Inter/system stack and neutralizes inherited SVG strokes.
- Chart callouts are measured, constrained to the plot, shifted inward near edges and tested not to cover their own anchor.
- Desktop and narrow-mobile layouts are covered by central browser QA.
- The PDF uses the standardized Guide & Methodology and Continue Planning pages.
- Explanation containers are content-sized; the report avoids oversized fixed-height narrative boxes.
- The standard PDF report remains available without login.

## Relationship with the full FI Planner

The SEO asset is an entry point, not a restricted replacement for the full planner.

A primary CTA opens `/financial-independence/` with a small, explicit query-string handoff containing only compatible values:

- portfolio-funded monthly spending equivalent;
- planning withdrawal rate;
- inflation assumption;
- country/region;
- currency.

The full planner validates the handoff, keeps its approved engine unchanged, sets spending-at-FI to 100% and other portfolio-external income to zero so the spending-based target remains mathematically consistent, and displays a notice asking the visitor to review the fields if reliable income covers part of lifestyle spending.

SEO3B does not infer current age, target age, assets, contributions or investment return. These remain full-planner inputs.

## Privacy and future account compatibility

- No login is required.
- No backend or cloud storage is required for the calculation.
- No external financial API or AI service is used.
- Currency changes formatting/unit only; no FX conversion is performed.
- The result object is structured so it can later be saved by an optional account layer without coupling account logic to the calculation engine.
- No placeholder login or premium controls are exposed before the account system exists.

## Reporting and exports

The public tool includes:

- Copy Summary;
- CSV download with raw numeric values and assumption metadata;
- standardized PDF report;
- primary handoff to the full Financial Independence Planner.

The PDF is designed for four pages:

1. Your FI Number by Spending;
2. Sensitivity & comparison;
3. Guide & Methodology;
4. Continue Planning with Carrowmont.

## Search and internal authority

The release:

- adds the canonical route to `sitemap.xml` with 9 October 2026 lastmod;
- links the asset from the Learn hub;
- links it from the FI-number and FI-timing authority guides;
- links it from the 4% Rule guide and 4% Rule Stress Test;
- links it from the full Financial Independence Planner;
- uses WebApplication, BreadcrumbList and FAQPage structured data.

## Repository scope

This release changes only:

- `draw004.github.io` — new SEO3B product files, internal links, sitemap, implementation record;
- `financial-independence` — contextual link and safe compatible-input handoff only;
- `carrowmont-qa` — source-contract and browser/PDF regression coverage.

No SIP, Goal, Inflation, Retirement or Budget calculation engine is changed. No existing Financial Independence calculation formula is changed.

## Release gate

Before Publisher creates PRs, the release is expected to pass:

- exact release-manifest base/new hashes;
- JavaScript syntax checks;
- central source-contract checks including independent pure-core fixtures;
- browser QA for calculations, layout, locale, chart bounds, handoff, CSV and PDF;
- mobile overflow checks at 360 px and 390 px;
- standardized report page checks.

Publisher remains the final staged browser/PDF gate before repository PR creation.
