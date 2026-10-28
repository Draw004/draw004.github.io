# Carrowmont SOCIAL1A — Social Icon Visual Polish

Baseline: Source Snapshot generated 2026-10-28T20:14:54Z.

## Scope

- Adds lightweight inline SVG platform icons beside LinkedIn, Facebook, Instagram and YouTube names on the homepage Follow Carrowmont cards.
- Adds the same icon + name treatment to the Contact page social buttons.
- Adds compact icon + platform-name pills to the shared site footer injected by `site.js`.
- Keeps MOBILE1 social icons in the mobile More sheet unchanged because that surface already had icons.
- Cache-busts `site.js` on the eight primary entry pages and `carrowmont.css` on the homepage/contact surfaces.

## Boundaries

- No social URLs changed.
- No Organization `sameAs` schema changed.
- No calculator formulas, reports, localization logic, Learn/Research content, sitemap inventory, analytics/privacy behavior or workflow files changed.
- Icons are inline SVGs; no external icon library, font or network request is added.
- Icon treatment is intentionally Carrowmont-styled rather than large platform-branded artwork.

## QA

The existing SOCIAL1 Playwright contract now additionally requires one icon SVG per official social link on the homepage, Contact panel and shared footer, while preserving the 390px horizontal-overflow check.
