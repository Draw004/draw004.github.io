# CARROWMONT GSEO1D — Internal Topic Authority

**Release baseline:** Source Snapshot 56 (2026-10-13)

## Objective

Strengthen contextual internal authority between the Learn hub, established calculator owners and the Mortgage Decision Centre without link dumping, changing calculator mathematics, or turning informational articles into duplicate calculator-intent pages.

GSEO1D builds on the existing CORE6 Tool ↔ Learn and Mortgage Learn integrations. It deliberately avoids rewriting article titles, descriptions or H1s; query-level content refinement remains GSEO1E.

## Primary internal ownership map

The Learn hub exposes one contextual tool handoff for each planning category that has a clear primary product owner:

| Topic | Primary internal destination | Role |
|---|---|---|
| Monthly / recurring investment | `/sip-calculator/` | Core calculator owner |
| Retirement calculator | `/retirement-calculator/planner.html` | Interactive calculator owner |
| Budget & cash flow | `/budget-cash-flow-planner/` | Core calculator owner |
| Financial goals | `/goal-planner/` | Core planner owner |
| Financial independence / FIRE | `/financial-independence/` | Core calculator owner |
| Inflation / purchasing power | `/inflation-calculator/` | Core calculator owner |
| Home-loan / mortgage decisions | `/mortgage-payoff-calculator/decision-centre.html` | Decision-family navigation owner |

Assets & Investing and Foundation Guides intentionally receive no category-level calculator CTA because neither has one single primary calculator owner. This prevents artificial or competing internal targets.

## Learn hub changes

Each mapped category header receives one compact contextual action. The existing article cards stay unchanged. This creates a clear Hub → Tool route without adding a block of repetitive links or replacing informational ownership.

The category-level actions are marked with `data-cm-topic-tool` so central QA can enforce exactly one mapped destination per eligible cluster.

## Mortgage Decision Centre authority

The Mortgage Decision Centre now links the live **Prepay vs Invest** decision to the explanatory Learn article `/mortgage-prepayment-vs-investing.html`. The explainer links back to the Decision Centre in its related-reading grid, and the Home Loans & Mortgages Learn category links to the Decision Centre.

This creates a bounded three-way path:

`Learn hub → Mortgage Decision Centre ↔ Prepayment vs Investing explainer`

The live decision calculator remains `/mortgage-payoff-calculator/prepayment-vs-investing.html`; the explanatory article remains informational. No intent is reassigned.

## Locked behavior

This release does **not** change:

- calculator formulas, defaults, results, reports or PDF generation;
- country/currency localization or country-aware terminology;
- calculator titles, meta descriptions, H1s or canonical URLs;
- Learn-article titles, meta descriptions, H1s or canonical URLs;
- the seven-core-tool homepage composition;
- Mortgage Decision Centre planned/live product status;
- workflow files or repository permissions.

## QA contract

Central QA must verify:

1. exactly seven contextual Learn-hub category tool actions exist;
2. each action points to the single approved internal owner above;
3. Assets & Investing and Foundation Guides do not receive forced calculator owners;
4. Mortgage Decision Centre and the prepayment-vs-investing explainer link to each other;
5. the Home Loans & Mortgages cluster links to the Decision Centre;
6. the changed pages remain mobile-safe at 390 px and 360 px;
7. only changed sitemap entries are refreshed to 2026-10-13 and the Learn article `dateModified` matches its sitemap date.

## Release scope

Expected Publisher output: **3 PRs**, merged in this order:

1. `mortgage-payoff-calculator`
2. `draw004.github.io`
3. `carrowmont-qa` last

After merge: Pages → Automated QA → Multi-Repo Guard → fresh Source Snapshot.
