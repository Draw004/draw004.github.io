# Carrowmont FRE Batch 2A — Emergency Fund & Financial Runway Planner

**Status:** Staged for Publisher  
**Parent:** Batch 2 — Missing Core Decision Engines  
**Baseline:** `carrowmont-source-snapshot - 2026-11-07T044538.659.zip`  
**Baseline SHA-256:** `038c8c7b791405ff9e62ab2eb16f03edf95c36d17ae57d3f48b18e7a174cd1cd`

## Purpose

Batch 2A adds the first new deterministic decision engine created specifically for the Financial Resolution Engine roadmap. It answers a simple household question:

> If income changed suddenly, how long could essential spending continue using emergency-ready money?

The tool is intentionally broader than a “how much should my emergency fund be?” calculator. It separates three ideas:

- **Current runway:** how many months the entered emergency-ready reserve could cover the entered unavoidable monthly need if modeled income fell to zero.
- **First useful buffer:** one month of the entered essential/unavoidable need.
- **User-selected planning target:** the number of months the user chooses to model.

A **3–6 month range is shown only as common planning context**. It is not treated as a universal recommendation and does not override the user's selected target.

## Deterministic engine

Public API: `CarrowmontEmergencyFundCore`  
File: `/emergency-fund-runway-core.js`  
Methodology version: `emergency-fund-runway-v1.0`

### Inputs

- essential monthly expenses;
- unavoidable monthly debt payments;
- other essential monthly commitments;
- emergency savings;
- optional other liquid cash, counted only if the user explicitly includes it;
- user-selected target months (bounded to 1–24);
- optional monthly contribution toward the reserve;
- optional continuing income during disruption; and
- optional one-time shock cost.

### Key outputs

- modeled essential monthly need;
- emergency-ready reserve;
- current full-income-loss runway;
- reserve remaining after the modeled shock;
- stressed monthly burn and stressed runway;
- selected target amount, gap and coverage percentage;
- one-month first-stage amount and gap;
- estimated build time where a monthly contribution is entered; and
- 3-month / 6-month reference amounts for context.

### Formula boundary

The core is pure and deterministic. It has no DOM access, local/session storage, account dependency, API call, external network call or AI/LLM calculation. The FRE adapter must call this core rather than reproduce its formulas.

## Stress scenario

The stress view can model two changes together:

1. some continuing monthly income during the disruption; and
2. an immediate one-time cost.

The stressed monthly burn is the positive remainder after continuing income is deducted from the modeled essential need. If continuing income fully covers that need, the tool does not fabricate a finite stress-runway number and explains why.

## Financial Resolution Engine integration

Batch 2A introduces `/assets/fre/resilience-engine-adapters.js` and registers:

`emergency-fund-runway`

The dedicated intent route is `emergency-runway`. It requires only the facts needed to calculate the first useful result:

- `cashFlow.essentialExpenses`
- `resilience.liquidSavings`

Other details can be requested progressively when they materially improve the answer.

This protects the UX rule:

> Ask less. Explain enough. Show the answer first.

## User experience

Public URL: `/emergency-fund-runway-calculator.html`

The page uses the existing Carrowmont design system and is grouped into three compact steps:

1. essential monthly need;
2. emergency-ready cash; and
3. target and stress assumptions.

“Why we ask” explanations are collapsed by default. Results lead with the assessment and key numbers, followed by target progress, first-buffer information, stress evidence and expandable methodology.

No decorative chart is introduced in v1 because a chart does not materially improve the first decision. The tool provides Copy Summary, CSV and a three-page PDF report instead.

## Discovery

Batch 2A deliberately does **not** change the nine-card homepage core grid.

The new tool is exposed through:

- the full Tools directory;
- Carrowmont Search;
- the sitemap; and
- contextual links from five existing emergency-fund/budget Learn articles.

This adds capability without prematurely changing the homepage hierarchy before Ask Carrowmont is ready.

## Privacy

The calculator is guest-first. Batch 2A does not add login, account persistence or storage of financial amounts. Shared locale preference may continue to use Carrowmont's established locale persistence, but financial values entered into this tool are not added to a new storage key.

My Carrowmont persistence may be considered in a later approved batch; it is not part of this release.

## Localization

The existing global localization contract remains authoritative:

- **59 region profiles** (58 named countries + Other / International)
- **48 currencies**

The tool uses neutral v1 terminology so country support does not imply tax, benefit, insurance, pension or regulatory knowledge that has not been explicitly implemented.

## Explicit non-goals

Batch 2A does not:

- model unemployment benefits, severance, taxes, insurance proceeds or country-specific social support automatically;
- tell users that a particular reserve size is universally correct;
- provide product recommendations;
- move money or open accounts;
- add mandatory login;
- change an existing calculator formula;
- add a homepage core card; or
- allow an AI model to perform the financial mathematics.

## Release gate

The release is not complete until the exact Publisher bundle passes source/browser/PDF QA, generated PRs are merged, Automated QA and Multi-Repo Guard are green, and a fresh Source Snapshot is generated.
