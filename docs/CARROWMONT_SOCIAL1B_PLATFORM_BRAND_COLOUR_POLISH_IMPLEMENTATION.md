# Carrowmont SOCIAL1B — Platform Brand Colour Polish

Baseline: Source Snapshot generated 2026-10-28T21:08:39Z.

## Scope

- Keeps the existing SOCIAL1 / SOCIAL1A official-channel links, layout, typography, spacing and Carrowmont surfaces unchanged.
- Applies recognizable platform colour only to the social SVG artwork:
  - LinkedIn: `#0A66C2`
  - Facebook: `#1877F2`
  - Instagram: inline multi-stop gradient
  - YouTube: `#FF0000` with a white play mark
- Applies the treatment consistently to the homepage Follow Carrowmont cards, the Contact-page Continue the conversation buttons, and the shared site footer.
- Keeps the existing pale Carrowmont icon containers, white cards/pills, borders and text styling unchanged.
- Keeps MOBILE1 More-sheet social treatment unchanged because that surface is outside this requested visual-polish scope.
- Cache-busts `carrowmont.css` on homepage/contact and `site.js` on the same eight primary entry pages used by SOCIAL1A.

## Boundaries

- No social URLs or Organization `sameAs` schema changed.
- No calculator formulas, reports, localization logic, Learn/Research content, sitemap inventory, privacy/analytics behavior or workflow files changed.
- No external icon library, image asset or network request is introduced.
- Brand colour is not used as the only information cue; each icon remains paired with the platform name.

## QA

- SOCIAL1 Playwright coverage verifies the official destinations remain unchanged.
- SOCIAL1 now also verifies the LinkedIn/Facebook/YouTube SVG brand colours and the Instagram gradient on homepage, Contact and shared footer surfaces.
- Existing 390px horizontal-overflow coverage remains in place.
