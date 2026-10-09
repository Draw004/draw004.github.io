# Carrowmont Optional Login, Monetization & AI Architecture

**Document status:** Approved product direction  
**Project:** Carrowmont  
**Baseline context:** Post-SEO3A / Snapshot 26 generation  
**Date:** 9 October 2026  
**Purpose:** Define how Carrowmont should introduce optional accounts, monetization, advanced reports and AI analytics without reducing access to the existing free financial-planning tools.

---

## 1. Product Principle

Carrowmont should remain useful before a user creates an account.

The long-term product model is:

> **Free core planning without login → Optional account for persistence and convenience → Paid advanced analysis, premium reports and AI insights.**

Carrowmont must not turn its core financial calculators into login-gated tools merely to create an account funnel.

This principle applies to the current tools, future SEO calculators, future planning tools, reports and AI features.

---

## 2. Three-Layer Product Model

### Layer 1 — Carrowmont Free / No Login

Users should continue to be able to access the core Carrowmont experience without creating an account.

Free/no-login access should include, where applicable:

- Core financial calculators and planners.
- SEO-focused calculators and educational tools.
- Standard deterministic calculations.
- Standard scenario analysis.
- Standard Carrowmont charts and tables.
- Basic / standard downloadable reports.
- Copy Summary and CSV where already part of the tool design.
- Educational methodology and assumptions.
- Cross-links between related Carrowmont tools.
- Local browser calculation and temporary state where technically practical.

Examples include:

- SIP / Recurring Investment Calculator.
- Goal Planner.
- Financial Independence Planner.
- Inflation Calculator.
- Retirement Planner.
- Budget & Cash Flow Planner.
- 4% Rule Stress Test.
- Financial Independence Number by Spending.

**Permanent rule:** A user should not have to log in just to obtain the core calculation that a Carrowmont tool is designed to provide.

---

### Layer 2 — Optional Carrowmont Account

A Carrowmont account should primarily add **persistence, continuity and convenience**.

Potential account features include:

- Save a plan.
- Resume a plan later.
- Access saved plans from another device.
- Save multiple scenarios.
- Name plans and goals.
- Maintain household/profile assumptions.
- Reuse preferred country/currency settings.
- Save historical reports.
- Compare current and earlier versions of a plan.
- Connect related plans across Carrowmont tools.
- Maintain multiple goals such as retirement, education, home purchase and financial independence.
- Create a consolidated view of saved financial-planning assumptions.

The account CTA should therefore be framed as a benefit, for example:

> **Save this plan to your Carrowmont account**

rather than:

> **Log in to use this calculator**

The latter should be avoided for core tools.

---

### Layer 3 — Carrowmont Advanced / Paid

Monetization should focus on capabilities that genuinely add depth beyond the free deterministic planning experience.

Potential paid features include:

- Advanced PDF reports.
- Consolidated financial-planning reports.
- Deeper scenario comparison.
- Advanced retirement and FI stress testing.
- Monte Carlo analysis, if introduced later and implemented responsibly.
- Historical-plan comparison.
- Advanced data export.
- Cross-tool financial analysis.
- Goal conflict analysis.
- Portfolio / cash-flow / FI interaction analysis.
- Periodic financial-plan reviews.
- Advanced risk analysis.
- AI-generated explanations and observations.
- AI-assisted scenario interpretation.
- Premium analytical summaries.

Carrowmont should monetize **greater depth and convenience**, not remove previously free core calculations merely to create a paywall.

---

## 3. Relationship Between SEO Tools and Full Tools

SEO-focused calculators are **entry points**, not restricted versions of the main tools.

Their purpose is to answer a focused search question quickly and then help the user progress naturally into the broader Carrowmont planning ecosystem.

Example:

**Search intent:** “How much money do I need for financial independence?”  
↓  
**SEO asset:** Financial Independence Number by Spending  
↓  
**Quick result:** Estimated FI number  
↓  
**Primary next step:** Build My Full Financial Independence Plan  
↓  
**Full tool:** Financial Independence Planner

### Permanent SEO rule

> **An SEO asset must never reduce access to the main Carrowmont tool. It must either serve a distinct standalone search intent or provide a clear progression into the more comprehensive tool.**

SEO calculators should not hide or replace the full tools.

---

## 4. Input Handoff Between SEO Assets and Full Tools

Where technically safe and logically compatible, focused SEO calculators should transfer relevant user inputs into the corresponding full Carrowmont tool.

For example, Financial Independence Number by Spending may be able to hand off:

- Country / currency.
- Monthly or annual spending.
- Inflation assumption.
- Planning withdrawal rate.
- Other directly compatible assumptions.

The user should not be forced to re-enter information that Carrowmont already has in the current browser session.

### Handoff requirements

- Never alter the full tool's approved calculation engine merely to accommodate an SEO page.
- Transfer only compatible fields.
- Validate all transferred values in the receiving tool.
- Do not silently invent missing assumptions.
- Clearly show the user the assumptions used by the full tool.
- The full tool must remain directly accessible without first using the SEO page.

---

## 5. Recommended Technical Separation

New and existing Carrowmont tools should increasingly follow a separation-of-concerns architecture.

### A. Calculation Engine

Responsible for:

- Deterministic financial calculations.
- Scenario calculations.
- Validation rules directly related to the model.

The calculation engine should not need to know whether the user is logged in or subscribed.

### B. Presentation Layer

Responsible for:

- Inputs.
- Results UI.
- Tables.
- Charts.
- Disclosures / accordions.
- Accessibility.
- Mobile behavior.

### C. Report Layer

Responsible for:

- Standard free reports.
- Future advanced report templates.
- PDF formatting.
- Report-specific explanations.

The report layer should consume structured calculation outputs rather than re-create financial math independently.

### D. Persistence Layer

**Current phase:** local browser state where appropriate.  
**Future phase:** optional authenticated storage.

Responsible for:

- Saved plans.
- Saved assumptions.
- Historical versions.
- User preferences.
- Cross-device access.

### E. Entitlement Layer

Future server-side layer responsible for determining:

- Free vs paid access.
- Subscription status.
- Premium report access.
- AI usage allowance.
- Other plan-specific entitlements.

This should be independent of the financial calculation engines.

### F. Advanced Analytics Layer

Future layer for analytical methods that go beyond the standard free deterministic tools.

Potential examples:

- Monte Carlo simulation.
- Deeper stress testing.
- Multi-tool analysis.
- Scenario ranking.
- Historical-plan comparisons.

### G. AI Interpretation Layer

Future AI features should explain and interpret structured Carrowmont results.

AI should not silently replace the deterministic engines that produce core financial outputs.

Preferred pattern:

> **Carrowmont calculation engine produces the numbers → structured results are passed to the AI layer → AI explains patterns, risks, trade-offs and possible actions.**

This separation is important for consistency, auditability and trust.

---

## 6. AI Analytics Principles

AI should be an interpretation and analytical enhancement layer, not an uncontrolled calculation substitute.

### AI may help with

- Explaining a result in plain language.
- Highlighting major drivers.
- Identifying conflicting goals.
- Comparing scenarios.
- Summarizing financial-plan risk.
- Explaining the effect of changing assumptions.
- Pointing out trends across saved plans.
- Producing advanced narrative reports.
- Generating questions a user may wish to explore further.

### AI should not

- Fabricate account balances or assumptions.
- Silently change the deterministic model.
- Present speculative output as guaranteed financial outcomes.
- Hide the assumptions used.
- Replace methodology disclosure.
- Present itself as providing regulated personal financial advice unless Carrowmont deliberately builds the legal/compliance framework required for that activity.

### Recommended AI output language

Prefer wording such as:

- “Under the assumptions you selected…”
- “This scenario suggests…”
- “The largest driver of the result is…”
- “If this assumption changes, the estimated result may change materially.”

Avoid guaranteed-outcome language.

---

## 7. Privacy & Data Handling Direction

Anonymous calculations should remain **local-only by default where practical**.

A user should deliberately choose to save data before Carrowmont sends persistent plan data to its backend.

### Future high-level data flow

**Browser**  
→ deterministic Carrowmont calculation  
→ optional authenticated save  
→ Carrowmont backend stores saved-plan data  
→ entitlement layer checks subscription / premium access  
→ AI service receives only the structured data required for the requested analysis

### Privacy principles

- Minimize data sent to the server.
- Minimize data sent to AI services.
- Do not collect information merely because it may be useful later.
- Clearly distinguish local calculations from saved cloud data.
- Give users control over whether a plan is saved.
- Provide appropriate deletion / account-data controls when accounts are introduced.
- Use secure authentication and session handling.
- Encrypt sensitive data in transit and at rest where applicable.
- Maintain a documented data-retention policy before account launch.

---

## 8. Payments

Future paid plans should use a specialist payment provider.

Carrowmont should avoid directly storing raw payment-card information.

The payment provider should handle card processing, while Carrowmont stores only the information needed for account entitlement, billing status and permitted transaction references.

Potential future implementation must include:

- Subscription lifecycle handling.
- Upgrade / downgrade behavior.
- Failed-payment handling.
- Cancellation behavior.
- Refund policy.
- Tax / invoice requirements applicable to the operating business.

Pricing is intentionally **not locked** in this architecture document.

---

## 9. Possible Commercial Structure

A possible future structure is:

| Carrowmont Free | Carrowmont Account | Carrowmont Advanced |
|---|---|---|
| Core calculators | Everything in Free | Everything in Account |
| SEO calculators | Save plans | Advanced reports |
| Standard charts | Cross-device access | AI analytics |
| Standard reports | Multiple saved plans | Deeper stress testing |
| No login required | Historical plan access | Consolidated planning |
| Educational content | Reusable profile assumptions | Premium insights |

The optional account tier may initially remain free while Carrowmont builds traffic and user adoption.

Monetization can be concentrated on the Advanced tier first.

---

## 10. Reporting Strategy

Carrowmont should maintain a useful free standard report while creating room for genuinely enhanced paid reports later.

### Standard report

May include:

- Core result.
- Key assumptions.
- Standard chart(s).
- Scenario summary.
- Methodology / educational explanation.
- Appropriate disclaimer.

### Future advanced report

May include:

- Multiple-scenario comparison.
- Historical-plan comparison.
- Cross-tool findings.
- Advanced risk analysis.
- AI narrative interpretation.
- Prioritized observations.
- Additional stress testing.
- Consolidated financial-goal analysis.

The advanced report must add meaningful analytical value rather than merely changing typography or adding pages to the same free output.

---

## 11. Authentication Is Not Required Yet

This document establishes the architecture direction. It does **not** mean authentication should be added to the current release immediately.

For the present development phase:

- Keep existing calculators no-login.
- Keep SEO calculators no-login.
- Do not introduce a premature backend merely to support future possibilities.
- Keep calculation modules separable from future account logic.
- Keep outputs structured enough that they can later be saved or analysed.
- Avoid architecture decisions that would make future authentication unnecessarily difficult.

Build the account platform when there is enough product value to justify it.

---

## 12. Requirements for SEO3B — FI Number by Spending

SEO3B should be built now with the future account model in mind but should **not require login**.

### Required behavior

1. Provide the complete SEO3B calculation without login.
2. Provide a prominent CTA into the full Financial Independence Planner.
3. Transfer compatible inputs into the full FI Planner where technically safe.
4. Do not weaken or alter the current FI Planner calculation engine.
5. Do not hide the FI Planner behind SEO3B.
6. Keep the standard report available without login according to the approved specification.
7. Structure result data so it could later be saved to an optional account.
8. Do not implement fake or placeholder login controls in the current production version unless a real account system exists.

### Future enhancement once accounts exist

After results, Carrowmont may additionally offer:

> **Save This Calculation**

and, for eligible users:

> **Get Advanced Analysis & AI Insights**

These future CTAs must supplement, not replace, the no-login core experience.

---

## 13. Requirements for Future Tools

Every future Carrowmont tool should answer the following questions during specification:

1. What is the core no-login value?
2. What result must remain free?
3. What data can remain local?
4. What data could optionally be saved to an account?
5. What advanced analysis would provide genuine premium value?
6. Could AI improve interpretation without changing deterministic calculation logic?
7. Which related Carrowmont tool should the user be guided to next?
8. Can compatible inputs be handed off instead of re-entered?
9. Is the report structured for both standard and future advanced versions?
10. Does the feature preserve Carrowmont privacy and transparency principles?

---

## 14. UX Rules for Login & Monetization

When authentication is eventually introduced:

### Preferred

- “Save this plan”
- “Continue on another device”
- “Compare with a saved scenario”
- “Generate Advanced Analysis”
- “Unlock Advanced Report”
- “Get AI Insights”

### Avoid

- Blocking the calculator before the user sees any value.
- Requiring signup to perform ordinary calculations.
- Interrupting every calculation with a registration modal.
- Removing standard reports solely to manufacture premium scarcity.
- Misleading “free” language that later blocks the advertised calculation.

The user should understand the value of the optional account before being asked to create one.

---

## 15. Security Direction

When accounts and paid features are introduced, the authentication/backend architecture must receive its own formal security specification before implementation.

At minimum it should address:

- Authentication provider choice.
- Passwordless / social / password authentication policy.
- Multi-factor authentication options.
- Session security.
- CSRF / XSS protections.
- Rate limiting.
- Secure cookies / token handling.
- Authorization and entitlement checks.
- Server-side validation.
- Encryption.
- Audit logging.
- Account recovery.
- Data deletion.
- Backup / restore.
- AI request logging and privacy.
- Payment webhook security.
- Secrets management.

No sensitive credentials should ever be committed to a public GitHub repository.

---

## 16. Permanent Carrowmont Product Rules

The following rules are considered the approved direction unless deliberately revised later:

1. **Core Carrowmont calculations remain accessible without login.**
2. **Accounts add persistence, continuity and convenience.**
3. **Paid plans add meaningful analytical depth, advanced reports and AI capabilities.**
4. **SEO tools are entry points, not replacements for full tools.**
5. **SEO pages must provide a clear path to the appropriate full Carrowmont planner.**
6. **Compatible inputs should be handed off between tools where safe.**
7. **Deterministic engines remain the source of truth for core financial calculations.**
8. **AI interprets structured results rather than silently inventing the underlying math.**
9. **Anonymous data remains local by default where practical.**
10. **Users deliberately choose when to save information to an account.**
11. **Carrowmont should not directly store raw payment-card data.**
12. **Advanced reports must provide real analytical value beyond cosmetic expansion of free reports.**
13. **Future authentication must not be bolted directly into calculation engines.**
14. **Privacy, transparency and methodology disclosure remain core product requirements.**

---

## 17. Roadmap Relationship

This architecture should guide, but not delay, the current SEO and traffic roadmap.

Current priority remains:

1. **SEO3B — Financial Independence Number by Spending**
2. **SEO3C — US Debt & Interest Cost Calculator**
3. **SEO3D — Gold Under Macro Stress Explorer**
4. **SEO3E — Oil Shock & Inflation Calculator**
5. **SEO3F — Hypothetical US Default & Global Market Stress Test**
6. Continue authority/content cluster development.
7. Introduce account/authentication architecture when justified by product readiness.
8. Develop Advanced / AI functionality after deterministic foundations and account entitlements are ready.

The current SEO assets should therefore be built in a way that remains compatible with the future account model without requiring that account system today.

---

## 18. Implementation Note for Future Chats / Developers

If work continues in a new ChatGPT conversation or with another developer, this document should be read together with:

- The latest Carrowmont Source Snapshot.
- The current Carrowmont continuity / architecture documents.
- The specific tool specification being implemented.
- The approved GitHub release workflow and QA requirements.

Do not infer that the presence of this document means login, payments or AI are already implemented. It defines the **future architectural direction and product rules**.

---

**End of document**
