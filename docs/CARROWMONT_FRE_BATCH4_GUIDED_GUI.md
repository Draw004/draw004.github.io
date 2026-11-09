# Carrowmont FRE Batch 4 — Best-in-Class Guided GUI

## Purpose
Batch 4 improves how Ask Carrowmont collects the minimum information needed for the five controlled Batch 3 journeys and how it presents the resolution. It does not add new financial journeys or alter deterministic formulas.

## Implemented
- Progressive disclosure remains capped at one to three questions per screen.
- A visible step/progress indicator shows where the user is in the current journey.
- Every requested field includes a collapsed **Why we ask** explanation.
- **I don't know** is offered only where an illustrative assumption can be used without inventing a household fact: modeled savings/investment return assumptions.
- Selecting **I don't know** uses an explicit 5% illustration and records that choice in the displayed assumptions.
- Income, expenses, debt, savings, balances, prices and loan facts are never fabricated.
- Validation identifies the exact field that needs correction in plain language.
- Valid answers remain in place when another field fails validation.
- **Previous** lets the user return to the prior question group, see the answers already entered and correct them without restarting the journey.
- A resolved result offers **Review answers** so the last inputs can still be corrected.
- New question groups, validation problems and results are brought into view with focused context; reduced-motion preferences are respected.
- Inputs retain native labels/form behavior, **Why we ask** remains keyboard-operable, validation uses `aria-invalid`, and interactive controls have visible focus states.
- Previously entered facts remain in journey state and are not requested again during normal forward progress.
- Results remain answer-first: Carrowmont's view precedes diagnosis, numbers, alternatives, change factors and methodology.
- The existing privacy boundary remains unchanged: financial inputs are not persisted or transmitted.

## Out of scope
- New resolution journeys.
- Login, profiles, saved financial data or connected accounts.
- Changes to calculator formulas or deterministic engines.
- Country-specific default return/rate assumptions.
- Homepage product transformation.

## Exit gate
Batch 4 is complete only when deterministic source contracts, responsive browser QA, Publisher, Automated QA and Multi-Repo Guard are green at 360 / 390 / 412 mobile, tablet and desktop widths, including Back/correction, validation recovery and keyboard-focus checks.
