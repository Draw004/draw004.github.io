# Carrowmont FRE12B-6 - Explainable opportunities / decision prompts

## Purpose

Turn the existing My Carrowmont **Your next three moves** surface into a transparent decision-assistance layer without creating a second recommendation engine. Every prompt must be supported by saved My Carrowmont information plus an existing deterministic Carrowmont rule or saved-plan progress result.

## Research-informed product rules

Public financial-wellness guidance and current budgeting products consistently point toward four useful design principles: show what deserves attention, explain the evidence, distinguish warnings from positive/optional opportunities, and let the user set aside a prompt without altering the underlying plan. Community feedback also shows that persistent or inaccurate notification-style warnings quickly become noise. FRE12B-6 therefore remains an on-dashboard, pull-based surface rather than adding push/email alerts.

## User experience

Each of the existing three next-move slots can render as **Needs attention**, **Worth reviewing**, **Opportunity** or **On track**. A prompt contains:

- the action or decision to consider;
- **Why you're seeing this** with the deterministic rationale;
- up to four saved/modelled numbers when the Money Priorities engine supplied them;
- **What could change this** factors where available;
- a direct Tool/Ask route and relevant Learn route;
- **Not now**, which hides that prompt only on the current device until the saved inputs behind the prompt change.

The plan-area status remains visible even when its decision prompt is set aside. “Not now” never changes, deletes, marks complete or writes to a saved financial plan.

## Deterministic boundaries

- Reuse `CarrowmontProgress` and `CarrowmontMoneyPriorities`; do not introduce an AI scoring/ranking engine.
- Reuse the locked Stabilize -> Protect -> Reduce -> Build -> Grow -> Optimize priority framework.
- Do not invent missing financial data, goals, rates, thresholds, tax rules or country-specific recommendations.
- User-entered emergency targets and saved-plan targets remain authoritative for their own status.
- Unsaved calculator what-if results remain outside My Carrowmont.
- Prompt snooze state is presentation-only browser local storage and is not financial data or a Supabase schema change.
- No push, email or recurring notifications are created.

## Prompt reappearance rule

A snooze stores only a deterministic fingerprint of the prompt on the current device. If the action, rationale, evidence or relevant saved inputs change, the fingerprint changes and the prompt becomes visible again. Users can also restore currently hidden prompts immediately.

## Research summary used for design

- CFPB financial well-being framing: control over day-to-day finances, ability to absorb shocks, progress toward goals and freedom of choice.
- YNAB: separate underfunded/overfunded/snoozed states and allow users to snooze a target when the current warning no longer reflects their chosen priority.
- Monarch community/product feedback: uncontrolled notification badges and low-confidence alerts create noise; users value explicit control over which alerts deserve attention.
- Fidelity and community priority discussions: financial sequencing is a starting framework, not a universal one-size-fits-all recommendation; emergency resilience, high-cost debt and goals compete for the same surplus.

## Acceptance

- Existing six-area financial plan and report remain intact.
- Existing three-move cap remains intact.
- Each rendered prompt exposes its type, reason, evidence where available, change factors, Tool/Ask route, Learn route and Not now.
- Not now does not alter the model or saved plan and automatically expires when the prompt fingerprint changes.
- Mobile layout has no horizontal overflow.
- Public footprint remains 23 tools and 145 indexed URLs.
- Publisher browser QA and the normal source/standards gates must be green before merge.
