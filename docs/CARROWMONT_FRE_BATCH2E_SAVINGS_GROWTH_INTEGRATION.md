# Carrowmont FRE Batch 2E — Savings Growth Supporting-Engine Integration

## Decision
Batch 2 does not add a separate Savings Growth calculator. Carrowmont already has two tested deterministic engines that cover the required savings-growth use cases:

- Recurring Investment (`CarrowmontSIPCore`) for recurring contributions, step-up contributions, goal funding, required contribution, and time-to-target.
- Compound Interest (`CarrowmontCompoundCore`) for lump-sum and recurring-contribution growth under explicit compounding and optional inflation assumptions.

Creating a third public calculator would duplicate authoritative mathematics and create unnecessary maintenance, localization, report, search, and QA surface area.

## Batch 2E implementation
- Adds `assets/fre/savings-growth-engine-adapters.js`.
- Registers both existing engines through the standard deterministic FRE adapter contract.
- Preserves the existing intent-router mappings for debt-vs-savings, goal funding, and recurring investment.
- Adds deterministic parity checks against the existing cores.
- Keeps Tools Hub at 23 live tools and keeps the homepage unchanged.
- Creates Engine Registry V8 and marks Batch 2 complete.

## Trust boundary
The adapters expose deterministic calculator outputs only. They do not forecast returns, select investments, connect accounts, or collect additional personal data.

## Exit decision
Batch 2 is complete when Publisher, central QA, Multi-Repo Guard, and Source Snapshot are green on this integration release.
