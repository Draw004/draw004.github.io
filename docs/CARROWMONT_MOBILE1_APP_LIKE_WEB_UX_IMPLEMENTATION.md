# CARROWMONT MOBILE1 — App-Like Mobile Web UX

## Purpose
Make the main Carrowmont website feel faster and easier to navigate on phones without changing the desktop experience, calculator engines, SEO content, URLs, or country-aware calculation logic.

## Mobile-only behaviour (<=700px)
- Persistent bottom navigation: Home, Tools, Learn, Research, More.
- More bottom sheet: Search, About, Methodology, Contact, Country & Currency, and official social channels.
- Compact sticky mobile header with a visible Search control and compact currency selector.
- Homepage Popular tools launcher. India: SIP, EMI, Retirement, Compound, Goals. Other markets: Retirement, Mortgage/Home Loan, Loan, Invest, Compound.
- The large homepage core-card grid remains in the HTML and unchanged for desktop, but is hidden on mobile because the quick launcher and full Tools directory provide faster access.
- India SIP spotlight is hidden on mobile because SIP is already surfaced in the quick launcher and hero.
- Decision-support and Learn card groups become horizontal swipe rows on mobile to reduce vertical scrolling.

## Non-goals / preserved contracts
- No calculator math changes.
- No report/PDF changes.
- No locale or currency conversion changes.
- No URL or canonical changes.
- No structured-data changes.
- No desktop homepage/grid changes.
- No workflow changes.

## Main files
- `site.js` — mobile shell, bottom navigation, More sheet, quick tools, mobile-only styles.
- Main entry pages receive a `site.js?v=20261028-mobile1` cache-busting reference.
- `carrowmont-qa/tests/54-mobile1-app-like-web-ux.spec.js` — mobile and desktop regression coverage.
