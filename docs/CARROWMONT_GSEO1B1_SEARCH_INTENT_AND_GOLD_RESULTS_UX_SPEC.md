# CARROWMONT GSEO1B-1 — Search Intent Alignment + Gold Results UX

**Baseline:** Source Snapshot 49  
**Scope:** SIP/Investment, Goal Planner, Gold Macro Explorer, Central QA  
**Math changes:** None  
**Report changes:** None  
**URL changes:** None  
**Localization contract changes:** None  

## SIP / Investment

Search-facing title becomes:

`Investment Calculator & SIP Calculator | Carrowmont`

The visible India product identity remains **SIP Calculator** and the existing localization script continues to present **Recurring Investment Calculator** outside India. The H1, inputs, calculations, reports and country/currency behavior are unchanged.

Structured data identifies the page as an investment/SIP calculator and the meta description explicitly covers monthly investment growth, SIP contributions, step-up plans, time-to-target and existing investments.

## Goal Planner

Search-facing title becomes:

`Savings Goal Calculator & Financial Goal Planner | Carrowmont`

The visible product remains **Goal Planner**. Inputs, goal types, formulas, report and localization are unchanged. Structured data and social metadata clarify that the page is a savings-goal calculator as well as a financial goal planner.

## Gold Macro Explorer UX

Current behavior recalculates automatically whenever a scenario control changes. The existing primary button merely runs the same calculation again, so users can reasonably perceive it as doing nothing.

The calculation model remains live and unchanged.

The primary action becomes:

`View Gold Scenario Results`

When clicked it:

1. ensures the current deterministic scenario is rendered;
2. scrolls the current result section into view;
3. moves programmatic focus to the result section for keyboard/accessibility context;
4. respects reduced-motion preference;
5. changes no score, source, threshold, methodology, PDF or CSV logic.

## QA gate

Central QA must prove:

- SIP source title/metadata broadens global search intent while the visible India product label remains SIP Calculator;
- Goal source title/metadata identifies Savings Goal Calculator while the visible product label remains Goal Planner;
- Gold controls still recalculate live;
- Gold primary button is labelled `View Gold Scenario Results`;
- clicking it focuses the results section and preserves the same current deterministic result;
- desktop, 390px and 360px layouts retain no horizontal overflow;
- no workflow files change.
