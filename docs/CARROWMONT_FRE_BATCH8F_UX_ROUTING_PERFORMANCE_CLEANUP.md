# Carrowmont FRE Batch 8F - UX Simplification, Routing & Performance Cleanup

## Purpose
Batch 8F is a stabilization release before Batch 9. It reduces repeated public messaging, makes Ask Carrowmont a traffic controller across the existing Carrowmont ecosystem, makes Search visibly respond after submission, frames Research as a multi-market library without mislabelling U.S. evidence, simplifies the Privacy front layer, and improves homepage hero loading without changing the approved visual.

## Product rules
- Say each important idea once, in its strongest location.
- Ask Carrowmont is the traffic controller: guided resolution when available; otherwise route to relevant Learn, Tool, Research or Search content.
- Search remains the fast direct-retrieval utility and never places search words in the URL.
- Mobile navigation keeps the established label **My Money**.
- Country/Currency remains the canonical shared component protected in Batch 8E.
- Research study scope is stated honestly; U.S. studies remain U.S. studies while the hub is global-ready.

## Search and Ask
Ask can query the same privacy-first Carrowmont content index used by Search. Unsupported guided questions no longer expose development-backlog language. The best matching Carrowmont pages are shown directly, with a private same-browser handoff to the full Search page when the user wants more results. The temporary query is stored only in sessionStorage and is removed when Search consumes it.

Search now distinguishes Learn, Tool and Research results and, after an explicit Search action, moves the viewport to the result heading and first matches while accounting for the site header. Live typing can still filter without forcing the page to jump.

## Homepage and performance
The redundant Explore freely strip is removed. The approved couple hero remains unchanged visually. Responsive WebP files are re-encoded substantially smaller, the mobile file is resized appropriately, responsive preload hints are added, and the above-the-fold hero uses eager/high-priority fetching with a new cache version.

## Privacy and Research
The Privacy page keeps the existing disclosures but presents the common points as short scan-friendly summaries, with technical My Carrowmont processing details behind an explicit disclosure control. Research cards use clean market-scope badges rather than repeating LIVE - UNITED STATES.

## Protected architecture
No calculator formulas, deterministic engines, saved-plan calculations, account schema, Supabase behavior, bank connections, native app behavior, public URLs, or indexing rules change in this batch.
