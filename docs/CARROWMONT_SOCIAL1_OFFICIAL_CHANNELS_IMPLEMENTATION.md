# CARROWMONT SOCIAL1 — Official Social Channels & Brand Foundation

## Baseline

- Source Snapshot: `carrowmont-source-snapshot - 2026-10-27T182354.070.zip`
- `draw004.github.io`: `95e04e99b786478bc01915e35e40da043ecc2d5e`
- `carrowmont-qa`: `6aea24b21a5ebf063486393970d4d0a634a34bc0`

## Purpose

Connect Carrowmont's newly established official social channels to the public website while preserving the existing calculator, Learn, Research, privacy, localization and report behavior.

Carrowmont's social positioning remains educational rather than recommendation-led:

> Understand the system. See the impact. Make your own decision.

## Official channels

- LinkedIn: `https://www.linkedin.com/company/carrowmont/`
- Facebook: `https://www.facebook.com/carrowmont`
- Instagram: `https://www.instagram.com/carrowmont.finance/`
- YouTube: `https://www.youtube.com/@carrowmontfinance`

## Production changes

### Homepage

- Adds the four official social URLs to the domain-level `Organization.sameAs` structured-data identity.
- Adds a near-footer `Follow Carrowmont` section focused on financial awareness, research and simple explanations.
- Does not alter the hero, calculator grid, country-aware ordering or calculator links.

### Shared footer

- `site.js` adds one compact `Follow Carrowmont` group to the existing footer brand block.
- The shared runtime approach avoids editing every public HTML page individually.
- Links open in a new tab and use `noopener noreferrer`.
- No tracking parameters are added to official social URLs.

### About

- Expands the existing purpose statement to connect financial-system concepts with household financial consequences.
- Adds the explicit educational boundary that Carrowmont does not exist to tell people what to buy or sell.

### Contact

- Adds a compact social-channel panel below the existing email contact card.
- The Carrowmont email remains the primary direct-contact route.

## Explicit non-goals

SOCIAL1 does **not** change:

- calculator mathematics or assumptions;
- PDF/report generation;
- country/currency localization logic;
- Learn article identities, content freshness or sitemap inventory;
- Research calculations or source data;
- analytics/privacy behavior;
- header navigation or homepage tool ordering;
- workflow files.

## QA

- Existing Carrowmont source contract: `697 PASS / 0 FAIL` on the staged SOCIAL1 source.
- Adds `tests/53-social1-official-channels.spec.js` covering:
  - `Organization.sameAs` official channel identity;
  - homepage social destinations;
  - shared footer runtime injection on a content page;
  - About positioning and non-recommendation language;
  - Contact social destinations;
  - 390px horizontal-overflow checks for homepage and Contact.
- Publisher remains responsible for exact staged Chrome/mobile browser validation before PR creation.

## Release workflow

Use the established disposable staging flow:

1. Create temporary branch `0/0` from current `main`.
2. Upload the exact SOCIAL1 release ZIP to `0/0`.
3. Run Carrowmont Batch PR Publisher against `0/0`.
4. Merge only Publisher-generated PRs after green validation.
5. Run Automated QA.
6. Run Multi-Repo Guard.
7. Run Source Snapshot and retain the new snapshot as the authoritative baseline.
8. Delete/abandon `0/0`; never merge the staging branch itself.
