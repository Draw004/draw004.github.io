# CARROWMONT DEBT1 — Production Implementation

**Production baseline:** Source Snapshot 65  
**Release:** Debt Payoff Calculator V1  
**Date:** 2026-10-14

## Scope

DEBT1 adds a focused Debt Payoff Calculator inside the existing `budget-cash-flow-planner` product family. It compares two payoff orders under the same monthly debt budget:

- pay highest-interest debt first (Avalanche);
- pay smallest debt first (Snowball).

The seven-core homepage remains unchanged.

## Calculation contract

The browser-side deterministic core:

1. accrues monthly interest from the user-entered annual rate;
2. pays all entered minimum payments first;
3. keeps the starting sum of minimums plus the extra monthly amount as one fixed monthly debt budget;
4. directs the remaining amount to the current method target;
5. spills unused money into the next debt in the same month when a debt is cleared;
6. rolls freed minimum payments forward in later months;
7. stops when all debts are cleared or at the 600-month / 50-year model horizon.

The core ships with 19 deterministic fixture cases covering one-debt parity, zero-percent debt, tie rules, divergent payoff order, same-month spillover, weak minimum warnings, final-payment capping, freed-payment roll-forward and the 600-month horizon.

## Privacy

Debt labels, balances, rates and minimum payments are not automatically persisted. No account, card or login identifiers are requested. The only cross-tool value is a short-lived, user-triggered Budget → Debt handoff for a possible extra monthly payment.

## Public discovery

- Tool: `/budget-cash-flow-planner/debt-payoff-calculator.html`
- Learn: `/debt-snowball-vs-avalanche.html`
- Tools Hub: secondary `Debt planning` card
- Learn hub: Budget & Cash Flow category

## Report

The report is exactly three pages and is rendered from the same deterministic result object as the webpage:

1. comparison summary;
2. payoff order and timeline;
3. assumptions, methodology, privacy and next steps.

## Release boundary

Exactly three repositories are changed:

1. `budget-cash-flow-planner`
2. `draw004.github.io`
3. `carrowmont-qa` last

No workflow files are changed.
