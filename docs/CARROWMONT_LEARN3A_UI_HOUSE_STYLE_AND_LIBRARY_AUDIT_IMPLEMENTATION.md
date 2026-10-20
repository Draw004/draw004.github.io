# CARROWMONT LEARN3A — UI, HOUSE STYLE & LIBRARY AUDIT IMPLEMENTATION

**Baseline:** Source Snapshot 91  
**Scope:** draw004.github.io + carrowmont-qa  

## Implemented

- Added an explicit Home link to desktop and mobile navigation on `/tools.html` and `/search.html`.
- Reduced unused vertical space in the Tools-directory hero and moved the embedded Search panel upward.
- Applied the colon-capitalization rule to public page titles and H1–H6 headings in the main-site HTML inventory.
- Added the rule to the shared UI and Learn article standards.
- Audited all 83 current Learn articles and recorded page-level structural signals plus a controlled topic-batch roadmap.
- Added permanent source-contract and browser QA for the new navigation, layout and heading rule.

## Deliberately not implemented

This release does not automatically rewrite all 83 Learn articles. Content improvements require human review in controlled topic batches so clarity, factual accuracy, localization, internal-link ownership and search identity remain inspectable.

No calculator formula, report engine, search privacy behavior, analytics architecture, sitemap URL, canonical URL, homepage core-card architecture or workflow file is changed.

## Publisher FIX1 — narrow-screen Tools discovery

The first Publisher browser run found that the embedded Tools search input ended at 960.5 px on a 390 × 900 viewport. The desktop layout was correct, but the two stacked hero shortcut buttons consumed the narrow-screen first viewport before the primary search action.

FIX1 keeps both shortcut buttons on desktop, hides those redundant shortcuts at 700 px and below, tightens the narrow-screen hero and embedded-search introduction, and cache-busts the Tools page stylesheet. The shortcuts remain available through the mobile navigation and the tool categories immediately below Search. The protected search input now appears above the fold at 1280, 390 and 360 px without changing search privacy, tools, content, canonicals or calculation behavior.
