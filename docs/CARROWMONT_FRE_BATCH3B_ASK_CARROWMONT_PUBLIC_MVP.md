# Carrowmont FRE Batch 3B — Ask Carrowmont Public MVP

## Purpose
Batch 3B exposes the already-tested Batch 3A deterministic journey orchestrator through a controlled public page at `/ask-carrowmont.html`.

## Scope
The public MVP supports exactly five journeys:
1. Debt versus savings
2. Car affordability
3. Mortgage / home-loan prepayment versus investing
4. Emergency-fund adequacy
5. Running short before payday / monthly cash-flow shortfall

The page begins with an ordinary-language question or a suggested journey. Once a journey is selected, it asks only for missing required facts and never presents more than three questions at one time.

## Calculation authority
The Ask interface does not introduce new financial formulas. `assets/fre/ask-carrowmont-mvp.js` orchestrates and explains. Existing deterministic Carrowmont engines calculate the outcomes. The result exposes the engines used and any explicit assumptions.

## Privacy boundary
Financial facts entered into Ask Carrowmont remain in JavaScript memory for the current page session. The Ask UI and journey core do not write those facts to localStorage, sessionStorage or IndexedDB and do not send them through fetch/XHR/WebSocket calls. Existing locale preferences continue to use the established Carrowmont locale layer.

## Product boundaries
- No login or account is required.
- No bank, card or investment account connection is introduced.
- No homepage Ask entry is introduced in Batch 3B.
- The Tools Hub remains at 23 tools because Ask Carrowmont is a guided decision entry point, not a new calculator engine.
- The nine-card homepage tool grid remains unchanged.
- The new public page is added to sitemap and site search, taking the reviewed public-page inventory from 136 to 137.

## Result contract
Resolved journeys show:
- situation
- diagnosis
- important numbers
- compared paths where applicable
- practical next steps
- the deterministic engines used
- explicit assumptions

## Release gate
Publisher → merge generated PRs → Automated QA → Multi-Repo Guard → fresh Source Snapshot.
