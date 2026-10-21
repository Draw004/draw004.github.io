# CARROWMONT LEARN3C-2 — PORTFOLIO DECISIONS & INVESTMENT PLANNING

**Implementation baseline:** Source Snapshot 97  
**Implementation date:** 21 October 2026  
**Scope:** Six existing Learn guides; no new public URLs.

## Purpose

LEARN3C-2 materially improves six established investing guides so readers can understand investment timing, compounding, asset allocation, diversification, stocks versus bonds and goal-based monthly contribution planning in plain language before choosing a product or taking investment risk.

The release follows one universal educational core. Carrowmont keeps country and currency separate, uses the established localization layer for illustrative monetary examples, and avoids inventing country-specific tax, legal, investor-protection or product rules. Changing currency changes the teaching example and formatting; it is not presented as live foreign-exchange conversion.

## Pages improved

- `/lump-sum-vs-monthly-investing.html`
- `/compounding-and-time.html`
- `/asset-allocation-explained.html`
- `/diversification-across-asset-classes.html`
- `/stocks-vs-bonds.html`
- `/how-much-should-i-invest-each-month.html`

## Established-rule reconciliation before editing

Because LEARN3C-1 exposed conflicts between newer content specifications and older protected journeys, LEARN3C-2 was reconciled against existing QA before production editing.

The release therefore preserves these established tool journeys:

- Lump sum vs monthly investing → SIP / Recurring Investment Calculator.
- Compounding and time → Compound Interest Calculator.
- Asset allocation → Retirement Planner.
- Diversification → Financial Independence Planner, preserving the active CORE6 Tool ↔ Learn contract.
- Stocks vs bonds → Retirement Planner.
- How much to invest each month → Goal Planner, preserving the active GSEO1E and CORE6 contracts.

No newer editorial recommendation silently overrides an older architectural contract.

## Editorial improvements

Each guide now includes or materially strengthens:

- a direct answer near the beginning;
- definitions before technical terms are relied upon;
- at least one practical comparison table;
- a worked example or concrete scenario;
- a decision/review checklist;
- limitations, trade-offs and common misconceptions;
- at least four authoritative investor-education sources;
- visible publication/review information and Editorial standards access;
- contextual links to related tools and guides without link dumping.

The six pages remain distinct in search intent:

- lump sum vs staged investing explains a timing decision when cash already exists;
- compounding and time owns the foundation concept rather than recurring-contribution mechanics;
- asset allocation explains how goals, horizon, liquidity and loss capacity shape the portfolio-level risk mix;
- diversification explains concentration and correlation without duplicating asset allocation;
- stocks vs bonds explains ownership versus lending and the major risk drivers of each;
- how much to invest each month works backward from a defined goal rather than prescribing a universal percentage of income.

## Modeling integrity

Worked examples are deterministic educational illustrations, not forecasts.

- Lump-sum and staged-investing examples use the same starting capital and explicit market paths.
- Compounding examples separate starting capital, contributions and modeled growth.
- Goal-funding examples use a future target, existing dedicated balance, horizon and multiple return assumptions.
- Asset-allocation and diversification examples describe risk exposures without recommending portfolio percentages.
- The bond-duration illustration is explicitly approximate and separates interest-rate sensitivity from credit, income and other effects.

All monetary values that belong to one worked example use the same Carrowmont illustrative-money basis so the relationships remain coherent after localization.

## Search and indexing discipline

Existing canonical URLs are preserved. Only the six materially rewritten pages receive Article `dateModified` and sitemap `lastmod` of `2026-10-21`. The small contextual-link addition to Investing for Beginners does not receive artificial freshness.

SEARCH1 remains at 121 reviewed public pages. Aliases are strengthened for six existing intents, including staged investing, compounding over time, portfolio allocation, portfolio diversification, stocks vs fixed income and monthly goal funding. No new query URL or duplicate search-intent page is created.

Carrowmont does not guarantee crawling, indexing, ranking or AI citation. The objective is better people-first content, stronger topical clarity, truthful freshness and more useful internal discovery.

## Product boundaries

LEARN3C-2 does not change calculator formulas, PDFs, report engines, shared plan state, homepage core-card architecture, analytics, SEARCH1 query privacy or workflow files. It does not add investment-product recommendations, model portfolios, stock/fund picks or guaranteed-return language.

## Release discipline

Publisher remains the authoritative full browser gate. After merge: confirm Pages, run Automated QA, run Multi-Repo Guard, take a fresh Source Snapshot and request Google re-indexing only for the six materially rewritten URLs. Bing and participating engines continue through the existing IndexNow process.
