# CARROWMONT LEARN3C-1 — RECURRING INVESTING, COMPOUNDING & TARGET TIMING

**Implementation baseline:** Source Snapshot 96  
**Implementation date:** 21 October 2026  
**Scope:** Seven existing Learn guides; no new public URLs.

## Purpose

LEARN3C-1 materially improves seven established investing guides so readers can understand contribution paths, compounding, target funding, timing and market-fall mechanics in simple language before choosing an investment product.

The release preserves one universal educational core and Carrowmont's existing country/currency localization. India may use SIP terminology where natural; other markets continue to use recurring or regular investment terminology. Monetary examples are illustrative and use Carrowmont's reviewed localization layer rather than live exchange-rate conversion.

## Pages improved

- `/10000-sip-returns.html`
- `/sip-for-1-crore.html`
- `/step-up-sip-vs-regular-sip.html`
- `/compound-interest-monthly-contributions.html`
- `/investment-time-to-target.html`
- `/starting-investing-earlier.html`
- `/sip-during-market-fall.html`

## Editorial improvements

Each guide now adds or strengthens:

- a direct answer near the beginning;
- a practical mental model rather than one projected number;
- a structured comparison/table;
- a decision or review checklist;
- explicit separation of contributions from modeled growth;
- warnings against treating an assumed return as a forecast;
- fees, inflation, liquidity and market-risk context where relevant;
- stronger contextual links to the correct Carrowmont tools and guides;
- at least four authoritative investor-education sources;
- visible publication/review information and Editorial Policy access.

## Search and indexing discipline

Existing canonical URLs are preserved. Only the seven materially rewritten pages receive `dateModified` / sitemap `lastmod` of `2026-10-21`. No unrelated page is refreshed. SEARCH1 remains at 121 reviewed public pages; aliases are strengthened for the seven distinct intents without creating duplicate URLs.

Carrowmont does not guarantee crawling, indexing, ranking or AI citation. The objective is better people-first content, clearer topical ownership, accurate metadata, crawlable internal discovery and truthful freshness signals.

## Product boundaries

LEARN3C-1 does not change calculator formulas, PDFs, report engines, shared plan state, homepage core-card architecture, analytics, SEARCH1 query privacy or workflow files. LEARN3C-2 remains outside this release and must start from a fresh post-LEARN3C-1 Source Snapshot.

## Publisher FIX1 correction

The first Publisher rehearsal correctly exposed a browser-QA mismatch on four guides whose visible H1 and browser title are localized at runtime. Static search titles in the HTML were already correct, but the new browser test incorrectly required those static titles after localization had run, and the generic smoke expectations still looked for the pre-localization H1 wording.

FIX1 keeps the approved static titles, canonical URLs and article content unchanged. It updates browser QA to verify the raw HTML search title separately from the localized runtime heading, aligns smoke expectations with the established US/default runtime wording, and extends runtime colon-capitalization protection. The investment growth and fixed-versus-increasing runtime headings now also follow the Carrowmont rule that the first alphabetic word after a colon is capitalized. No calculation, currency scale, search ownership, privacy or freshness behavior changes.

## Publisher FIX2 correction

The second Publisher rehearsal correctly exposed one remaining production-link mismatch. The approved LEARN3C specification assigns `/compound-interest-monthly-contributions.html` to the Compound Interest Calculator as its primary tool journey, but the rewritten article had retained the older SIP / Recurring Investment Calculator as its primary action while placing the Compound Interest Calculator only in a secondary note. The browser QA correctly rejected that mismatch.

FIX2 changes only that article's primary action to `/compound-interest-calculator/` and keeps SIP / Recurring Investment as a secondary journey. The source contract now permanently protects the approved primary CTA for all seven LEARN3C-1 guides. No calculation, localization, canonical, title, freshness, search-index ownership, analytics, privacy or workflow behavior changes.

## Publisher FIX3 compatibility correction

The third Publisher rehearsal exposed two issues that had to be reconciled together rather than patched independently.

First, FIX2 followed the newer LEARN3C page-level recommendation for `/compound-interest-monthly-contributions.html`, but that conflicted with the older and still-active CORE6 Tool ↔ Learn Integration V1 contract. CORE6 deliberately uses this guide as the primary education bridge from the SIP / Recurring Investment Calculator and requires the same mapped core tool at the guide's top action and shared bottom return CTA. Carrowmont's established architecture takes precedence unless an explicit architecture change is separately approved. The guide therefore keeps SIP / Recurring Investment as the top and shared return journey, while the Compound Interest Calculator remains a prominent contextual secondary action for users who want to isolate compounding mechanics.

Second, browser QA applied the 160-character search-description ceiling after runtime localization. The static SEO descriptions were already within the approved 110–160-character Carrowmont range, but runtime-localized descriptions can change with the displayed currency or target. FIX3 shortens all three investment runtime-description templates so they retain comfortable margin under 160 characters while keeping the same search meaning. Browser QA remains strict and now prints the affected path and rendered description if this rule is ever violated again.

FIX3 does not change calculator formulas, canonical URLs, static article titles, static meta descriptions, sitemap freshness, SEARCH1 ownership, analytics, query privacy, homepage architecture or workflow files.


## Publisher FIX4 QA-boundary correction

The fourth Publisher rehearsal proved that the FIX3 approach was too broad. One legacy runtime localization controller (`learn-expansion.js`) still rewrites the market-fall guide's browser meta description after page load. That rendered string is 164 characters, while the static search-facing meta description in the HTML is already within Carrowmont's approved 110–160-character editorial range.

FIX4 changes the approach instead of chasing every legacy runtime metadata writer. The authoritative SEO contract for these Learn pages is now explicit: the raw/static HTML title, canonical, robots directive and meta description are the search-facing identity and must pass the Carrowmont metadata rules. Runtime localization is tested for visible country terminology, headings, accessibility and layout, but a post-load JavaScript description-length heuristic is not allowed to block a release when the static SEO metadata is valid.

This is also more consistent with search-engine guidance: a 160-character description is an editorial presentation target, not a Google or Bing indexing threshold. Search engines may generate or truncate snippets independently. FIX4 therefore does not expand production scope into `learn-expansion.js` merely to shorten a legacy post-load string. It preserves stable URLs, static descriptions, Article metadata, truthful freshness, localization, CORE6 journeys, SEARCH1 privacy and all calculator boundaries.
