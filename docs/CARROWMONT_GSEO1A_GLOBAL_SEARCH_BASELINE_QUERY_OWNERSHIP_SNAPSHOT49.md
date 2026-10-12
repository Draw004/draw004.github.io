# CARROWMONT GSEO1A — Global Search Baseline & Query Ownership

**Authoritative source baseline:** Source Snapshot 49  
**Search baseline:** Google Search Console export dated 12 October 2026  
**Status:** Approved direction for controlled implementation  

## 1. Objective

Build Carrowmont into a globally discoverable financial-planning brand and progressively improve qualified organic visibility from Top 20 to Top 10, Top 5 and Top 3 by **query × page × country/market**, without degrading tool functionality, established localization, reports, URLs or the Carrowmont visual system.

## 2. Locked product protection rule

Global SEO changes must not silently alter calculator mathematics, report arithmetic, input behavior, established URLs, country-aware terminology, or the approved visual design. India continues to see India-familiar terminology such as **SIP**, **Step-Up SIP**, **Home Loan**, **EMI** and **Balance Transfer** where the existing localization contract calls for it. Other markets continue to receive their familiar terminology.

A product/UX change must be separately explicit. Search optimization is not permission to redesign or change calculation logic.

## 3. Search Console baseline

The selected Search Console view says “3 months”, but the exported daily data currently runs only from **21 September 2026 through 10 October 2026**. Rankings are therefore early and directional.

- 648 impressions
- 7 clicks
- approximately 1.1% blended CTR
- 39 countries represented
- United States: 353 impressions
- Canada: 62 impressions
- Chile: 62 impressions
- United Kingdom: 35 impressions
- India: 18 impressions / 6 clicks
- Australia: 17 impressions

The Queries export does not expose the seven clicks at query level because of Search Console’s low-volume/privacy aggregation. Page and country totals must not be reverse-engineered into unsupported query-level conclusions.

## 4. What Google currently understands

Early discovery is led mainly by educational pages, including:

- Zero-Based Budgeting
- Silver vs Gold
- Asset Allocation Explained
- Diversification Across Asset Classes
- Pay Yourself First Budgeting
- Physical Gold vs Gold ETF
- How Much Should I Save Each Month?
- Emergency Fund — How Much?

The strongest early core-tool signal in the page export is the SIP/Investment calculator at 27 impressions with an average reported position of about 18. Other core tools have only a handful of impressions or have not yet crossed the export threshold.

This supports a shift from **indexing work** toward **query relevance + topical authority + trust + external authority**.

## 5. Query ownership contract

Every important public page should own one primary intent and a small related family of secondary queries. Learn pages should support tools without competing for the same calculator intent.

### Core tools

| Canonical page | Primary search intent | Important secondary / regional terms |
|---|---|---|
| `/sip-calculator/` | Investment calculator / SIP calculator | monthly investment calculator, recurring investment calculator, step-up SIP, goal SIP |
| `/goal-planner/` | Savings goal calculator / financial goal calculator | monthly savings needed, investment goal calculator, goal contribution calculator |
| `/financial-independence/` | Financial independence calculator / FIRE calculator | FI calculator, early retirement calculator, financial independence planner |
| `/budget-cash-flow-planner/` | Budget calculator / monthly budget calculator | cash flow planner, household budget calculator, monthly cash flow calculator |
| `/retirement-calculator/` | Retirement calculator / retirement planning calculator | retirement savings calculator, retirement corpus calculator |
| `/inflation-calculator/` | Inflation calculator / purchasing power calculator | future cost calculator, value of money calculator |
| `/mortgage-payoff-calculator/` | Mortgage payoff calculator / extra payment calculator | mortgage prepayment, home loan prepayment, mortgage overpayment |
| `/mortgage-payoff-calculator/prepayment-vs-investing.html` | Mortgage prepayment vs investing calculator | pay off mortgage or invest, overpayment vs investing |

### Important Learn intent separations

- `zero-based-budgeting.html` owns informational zero-based budgeting intent; Budget Planner owns calculator intent.
- `how-much-should-i-save-each-month.html` owns the informational monthly-saving question; Goal/Budget tools own calculator intent.
- `how-much-should-i-invest-each-month.html` owns the informational monthly-investing question; SIP/Investment tool owns “monthly investment calculator”.
- `how-much-money-do-i-need-to-retire.html` owns the informational question; Retirement Planner owns calculator intent.
- `asset-allocation-explained.html` and `diversification-across-asset-classes.html` remain distinct concepts and should not be collapsed into duplicate pages.

## 6. Global architecture

Keep one universal calculator when the math is universal. Use country selection for terminology, formatting, helper text and genuine local caveats. Do not create near-identical country calculator clones simply to rank.

Separate regional content is justified only when it contains genuinely different rules or information such as tax treatment, government retirement systems, legal mortgage penalties or authoritative national data.

## 7. GSEO1B release sequence

### GSEO1B-1
- SIP / Investment search-facing identity
- Goal search-facing identity
- Gold Macro Explorer primary-action UX fix
- matching central QA contracts

### GSEO1B-2
- Financial Independence / FIRE search-facing identity
- Budget / Cash Flow search-facing identity

### GSEO1B-3
- Retirement search-facing identity
- Inflation / Purchasing Power search-facing identity

Mortgage remains comparatively stable immediately after MDC1A so the new cluster can accumulate clean ranking/indexing history before further search-facing changes.

## 8. Measurement

Track performance by **query × page × country × device**, with the ranking ladder:

1. Indexed / impressions
2. Top 20
3. Top 10
4. Top 5
5. Top 3

Do not repeatedly rewrite titles based on tiny samples. Use stable Search Console windows and compare changes only after enough impressions accumulate.

## 9. Release safety

Continue the approved Carrowmont release workflow:

1. start from latest clean Source Snapshot;
2. disposable staging branch from `main`;
3. upload release ZIP to staging branch only;
4. run Batch PR Publisher against the exact package;
5. inspect and merge only generated PRs in approved repository order;
6. do not merge the staging branch itself;
7. Pages → Automated QA → Multi-Repo Guard → fresh Source Snapshot → indexing.
