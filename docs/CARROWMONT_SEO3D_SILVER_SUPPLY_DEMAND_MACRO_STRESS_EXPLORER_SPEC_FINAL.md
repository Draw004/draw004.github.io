# CARROWMONT SEO3D-S — SILVER SUPPLY, DEMAND & MACRO STRESS EXPLORER

## Product, Data, SEO & Implementation Specification

**Baseline:** Carrowmont post-LEARN-LOCALE1 clean Source Snapshot 38  
**Snapshot generated:** 10 October 2026, 15:29:42 UTC  
**Main-site commit:** `cfc726375e04cf2ef1219ed4896c48c6c7012e49`  
**Central QA commit:** `4727a788bdbe01b64c61f9abe55a06baac4b53de`  
**Existing source contract:** 304 PASS / 0 FAIL  
**Specification date:** 10 October 2026  
**Status:** FINAL / owner-approved product direction — production code is not changed by this document.

---

# 1. Purpose

SEO3D-S will create a public, free, no-login Carrowmont authority asset that explains silver through its **dual identity**:

1. a precious / investment metal influenced by monetary conditions and investor demand; and
2. an industrial commodity whose physical market depends on fabrication demand, mine production, recycling and substitution.

The core question is:

> **Under the physical-market and macro conditions selected, is silver experiencing a modeled deficit or surplus, which forces are supportive or adverse, and why?**

The tool is not a silver-price forecast, trading signal, return forecast, valuation model or recommendation to buy or sell silver.

The tool should teach six ideas exceptionally well:

1. Silver is not simply “cheaper gold.”
2. Silver can be supported by precious-metal demand and industrial demand at the same time.
3. Silver can also face conflicting forces — for example strong industrial demand alongside high real yields or a strong U.S. dollar.
4. A physical deficit does not guarantee a higher silver price.
5. Higher silver prices can encourage recycling, thrifting and substitution, creating an endogenous supply/demand response.
6. Gold and silver can behave differently because their demand structures are different.

---

# 2. Strategic role in the Carrowmont roadmap

SEO3D-S is inserted as the **Silver companion asset to SEO3D Gold Under Macro Stress Explorer**, before the existing SEO3E Oil Shock & Inflation Calculator workstream.

This insertion does **not** renumber or cancel SEO3E or SEO3F.

The sequence becomes:

1. SEO3C — US Debt & Interest Cost Calculator — complete.
2. SEO3D — Gold Under Macro Stress Explorer — complete.
3. **SEO3D-S — Silver Supply, Demand & Macro Stress Explorer — this specification.**
4. SEO3E — Oil Shock & Inflation Calculator — remains planned.
5. SEO3F — Hypothetical US Default & Global Market Stress Test — remains planned.

SEO3D-S should strengthen a new **Precious Metals** authority cluster rather than exist as an isolated calculator.

It should connect naturally to:

- `gold-macro-stress-explorer.html`;
- existing Gold Learn content;
- the new primary discovery article `silver-vs-gold.html`;
- future Silver Learn content;
- inflation and macro-risk content where contextually relevant.

---

# 3. Controlling Carrowmont standards

Implementation must comply with the current versions in the authoritative source snapshot of:

- `docs/CARROWMONT_ARCHITECTURE.md`
- `docs/CARROWMONT_SHARED_UI_STANDARD.md`
- `docs/CARROWMONT_HOMEPAGE_TOOL_DEMAND_MATRIX.md`
- `docs/CARROWMONT_SEO3D_GOLD_MACRO_STRESS_EXPLORER_SPEC_FINAL.md`
- `docs/CARROWMONT_LEARN_LOCALE1_GLOBAL_LEARN_CONTENT_LOCALIZATION_SPEC_FINAL_REV1.md`

Where this specification is silent, those documents control.

Permanent rules include:

- one Carrowmont ecosystem / one shared shell;
- country and currency remain separate concepts;
- country-aware terminology must be preserved where relevant;
- new authority assets must remain globally understandable;
- shared visual language must not drift;
- no login wall for the core tool or standard report;
- deterministic calculation logic comes before narrative interpretation;
- no client-side third-party data API calls;
- no silent AI calculation layer;
- no price prediction language;
- no weakening of QA merely to obtain a green workflow.

---

# 4. Canonical routes and search presentation

## 4.1 Tool canonical URL

`https://carrowmont.com/silver-supply-demand-macro-stress-explorer.html`

## 4.2 Tool title

**Silver Supply, Demand & Macro Stress Explorer | Carrowmont**

## 4.3 Tool meta description

**Explore how industrial demand, investment demand, mine supply, recycling, real yields and the U.S. dollar can shape silver’s physical-market balance and macro backdrop.**

## 4.4 Tool H1

**See what is driving silver’s physical and macro environment**

## 4.5 Primary discovery article canonical URL

`https://carrowmont.com/silver-vs-gold.html`

## 4.6 Primary discovery article title

**Silver vs Gold: Is Silver a Good Alternative to Gold? | Carrowmont**

## 4.7 Primary discovery article meta description

**Compare silver and gold across affordability, volatility, industrial demand, supply dynamics and macro sensitivity — and explore what makes silver different from gold.**

## 4.8 Primary discovery article H1

**Silver vs Gold: Is Silver a good alternative to gold?**

## 4.9 Structured data

Tool:

- `WebApplication` schema consistent with established Carrowmont authority tools;
- no investment-advice or price-prediction claims in structured data.

Article:

- `Article` / `BlogPosting` and breadcrumb markup where consistent with current Learn architecture;
- no fabricated author expertise, price forecasts or guaranteed-return claims.

---

# 5. Mandatory search funnel

SEO3D-S must not launch as a tool-only page.

The release must create the following discovery path:

```text
Search intent
"silver vs gold"
"is silver a good alternative to gold"
"silver alternative to gold"
"why is silver different from gold"
        ↓
Primary Learn article
silver-vs-gold.html
        ↓
Strong contextual CTA
Explore Silver Supply, Demand & Macro Conditions
        ↓
Silver Explorer
        ↓
Related Gold Explorer / Precious Metals content
```

The primary article must answer the search question independently before asking the visitor to use the tool.

The article must not be a thin doorway page whose only purpose is to funnel traffic to the calculator.

The article should cover, in clear global language:

- why people consider silver when gold becomes expensive;
- why a lower per-ounce/per-gram price does not automatically mean better value;
- silver’s greater industrial exposure;
- relative volatility differences;
- industrial-demand sensitivity;
- physical supply, mine production and recycling;
- investment demand;
- deficits and surpluses;
- substitution and thrifting;
- the gold-silver ratio as context, not as a prediction rule;
- why silver can complement gold without being a like-for-like replacement.

Mandatory CTA copy may be refined visually, but the intent must remain:

> **Explore what is driving silver now →**

---

# 6. Supporting Silver Learn cluster

The primary article is mandatory in this release.

The following are planned follow-on assets and should be reserved in internal-link architecture without creating placeholder URLs:

1. Why Silver Behaves Differently From Gold
2. Silver Supply Deficit Explained
3. How Industrial Demand Affects Silver
4. Gold-Silver Ratio Explained
5. Silver During Inflation, Recession and Dollar Stress
6. How Recycling and Substitution Affect Silver Supply

Do not publish dead links or “coming soon” cards for these pages.

---

# 7. What the Silver Explorer answers

SEO3D-S should answer:

- Is modeled silver demand above or below modeled supply under the selected assumptions?
- How large is the modeled deficit or surplus relative to modeled demand?
- What happens if industrial demand rises or falls?
- What happens if physical investment demand rises or falls?
- What happens if mine supply contracts or grows?
- How much can stronger recycling offset other pressures?
- Are real yields and dollar conditions supportive, mixed or adverse for precious-metal demand?
- Which physical and macro forces conflict with each other?
- How is silver structurally different from gold?

SEO3D-S must not answer:

- What will silver cost tomorrow, next month or next year?
- Should a user buy, sell or hold silver?
- Will silver outperform gold?
- Is silver “undervalued” purely because its unit price is lower than gold?
- What personal portfolio allocation is appropriate?
- Will a supply deficit force prices higher?
- Will industrial demand keep rising indefinitely?

---

# 8. Non-negotiable editorial positioning

Never publish wording such as:

- “Silver will rise because supply is in deficit.”
- “Silver is the next gold.”
- “Silver is cheap because gold is expensive.”
- “Buy silver before the shortage gets worse.”
- “Industrial demand guarantees higher prices.”
- “The gold-silver ratio proves silver is undervalued.”
- “Silver will reach $X.”

Preferred wording includes:

- “Under the selected assumptions…”
- “The modeled physical market is in deficit / surplus…”
- “This creates a physical-market support/headwind in the framework…”
- “The macro backdrop is supportive / mixed / adverse…”
- “Recycling and substitution can offset part of the demand pressure…”
- “A deficit can contribute to tightness, but does not determine the future price.”
- “This is a scenario framework, not a price forecast.”

---

# 9. Core product architecture — two engines, one explanation

SEO3D-S V1 uses two distinct deterministic engines.

## 9.1 Physical Market Engine

Models:

- mine production;
- recycling;
- other explicitly published/reconciling supply if required;
- industrial fabrication demand;
- physical investment demand;
- jewelry / silverware / photography / other demand as reference categories;
- total modeled supply;
- total modeled demand;
- modeled annual balance.

Primary output:

> **Modeled physical balance: deficit / near balance / surplus**

## 9.2 Macro & Precious-Metal Backdrop Engine

Uses approved same-origin reference conditions for:

- U.S. real yields;
- broad U.S. dollar strength;
- inflation/monetary context where retained from the Gold reference framework.

Primary output:

> **Macro backdrop: supportive / mixed / adverse**

## 9.3 Combined interpretation

Do **not** collapse the two engines into a false-precision “silver score.”

Use a transparent rule matrix instead.

Examples:

| Physical balance | Macro backdrop | Combined interpretation |
|---|---|---|
| Deficit | Supportive | Physical and macro conditions are both supportive in the framework |
| Deficit | Adverse | Physical support with macro headwinds |
| Near balance | Supportive | Macro support with a balanced physical market |
| Surplus | Supportive | Macro support with physical-market headwinds |
| Surplus | Adverse | Physical and macro headwinds |
| Near balance | Mixed | Mixed / balanced environment |

The combined interpretation remains descriptive, not predictive.

---

# 10. Primary physical-market data source

The primary source for the completed-year physical market should be the latest validated **World Silver Survey** published by the Silver Institute / Metals Focus, subject to source terms and permitted data reuse.

The implementation should prefer the latest completed full-year dataset rather than presenting an outlook as though it were actual history.

The physical reference must disclose:

- source organization;
- source publication/report title;
- reference year;
- publication date where practical;
- whether each field is actual, estimate or forecast;
- unit of measure;
- source URL / provenance link.

The latest current-year outlook may be displayed as clearly labeled context, but it must not silently replace completed-year actual data in the default engine.

---

# 11. Secondary supply validation source

Use **U.S. Geological Survey (USGS)** silver statistics as a secondary cross-check for mine-production trends where practical.

USGS should not create a second competing physical-balance methodology.

If USGS and World Silver Survey figures differ due to definitions, timing or revisions:

- preserve the primary methodology;
- document the difference;
- do not average unrelated series merely to make them agree.

---

# 12. Macro reference reuse

Do not create a duplicate weekly macro-data infrastructure if the existing SEO3D Gold reference system already maintains the required approved fields.

Preferred V1 architecture:

- Silver physical data: `data/silver-market-reference.json`
- Existing same-origin macro reference: reuse the approved Gold macro reference file for common macro fields where semantically appropriate.

The Silver browser must use same-origin bundled reference data only.

No visitor browser request may be made directly to Treasury, Federal Reserve, BLS, Silver Institute, USGS or another external data API.

This avoids duplicate updaters, source drift and unnecessary workflow permissions.

---

# 13. No live silver-price dependency in V1

V1 should not require a live silver price to be useful.

Do not add a live LBMA or commercial benchmark feed unless licensing, redistribution and technical terms are explicitly reviewed and approved.

The educational objective is supply, demand and macro sensitivity — not a live quote screen.

Price history, valuation ratios and live benchmark integration are future-scope items.

---

# 14. Silver market reference schema

Create a versioned reference file conceptually similar to:

`data/silver-market-reference.json`

Recommended structure:

```json
{
  "schemaVersion": 1,
  "referenceYear": 2025,
  "unit": "million_troy_ounces",
  "source": {
    "publisher": "Silver Institute / Metals Focus",
    "title": "World Silver Survey 2026",
    "publicationDate": "YYYY-MM-DD",
    "url": "...",
    "dataStatus": "completed-year actual/estimate"
  },
  "supply": {
    "mineProductionMoz": 0,
    "recyclingMoz": 0,
    "otherSupplyMoz": 0,
    "totalSupplyMoz": 0
  },
  "demand": {
    "industrialMoz": 0,
    "physicalInvestmentMoz": 0,
    "jewelryMoz": 0,
    "silverwareMoz": 0,
    "photographyMoz": 0,
    "otherDemandMoz": 0,
    "totalDemandMoz": 0
  },
  "publishedBalanceMoz": 0,
  "limitedHistory": [],
  "notes": []
}
```

If source categories differ from this conceptual schema, use clearly named reconciliation fields rather than silently forcing the source into incorrect categories.

---

# 15. Copyright / source-data minimization rule

The release must not reproduce a large proprietary table merely because it is technically available in a report.

Use only the minimum source data necessary to power the educational tool.

If redistribution rights for a broad historical series are unclear:

- use the current reference-year aggregates;
- use a short, minimal historical series only where clearly permissible;
- otherwise derive narrative trends without republishing extensive tables;
- link to the original source for deeper historical data.

The tool should add interpretation and scenario analysis rather than re-host the source publication.

---

# 16. Units

Primary internal physical-market unit:

> **million troy ounces (Moz)**

Optional display toggle:

- million troy ounces (Moz)
- metric tonnes

Conversion must be deterministic and documented:

> `1 million troy ounces = 31.1034768 metric tonnes`

The unit toggle changes display only. It must not alter model calculations.

---

# 17. Simple Mode

Simple Mode is the default.

The visitor should not need to research mining statistics before using the page.

On load, show:

> **Carrowmont Silver Market Reference**  
> Physical market: [reference year / source]  
> Macro reference: [latest approved macro date]

Five simple controls:

1. **Industrial demand** — Weak / Reference / Strong
2. **Physical investment demand** — Weak / Reference / Strong
3. **Mine supply** — Contracting / Reference / Growing
4. **Recycling response** — Weak / Reference / Strong
5. **Monetary backdrop** — Adverse / Reference / Supportive

Primary CTA:

> **Explore Silver Conditions**

Secondary action:

> **Reset to Reference**

---

# 18. Simple-mode scenario step sizes

Simple-mode states are sensitivity presets, not forecasts.

Use transparent V1 step sizes unless implementation research identifies a better documented sensitivity framework before coding:

| Driver | Weak / Contracting | Reference | Strong / Growing |
|---|---:|---:|---:|
| Industrial demand | -5% | 0% | +5% |
| Physical investment demand | -10% | 0% | +10% |
| Mine supply | -2% | 0% | +2% |
| Recycling | -10% | 0% | +10% |

These values must be disclosed in methodology text and must be editable in Advanced Assumptions.

The **Monetary backdrop** control changes the macro state and does not directly alter physical ounces.

---

# 19. Advanced Assumptions

Advanced Assumptions must be collapsed by default.

When opened, it should expose:

## Physical market

- mine production (Moz);
- recycling (Moz);
- other/reconciling supply where applicable;
- industrial demand (Moz);
- physical investment demand (Moz);
- jewelry demand (Moz);
- silverware demand (Moz);
- photography / other demand where present;
- exact percentage adjustments from reference;
- display unit toggle.

## Macro context

- reference real-yield state/value from approved same-origin macro data;
- reference dollar state/value from approved same-origin macro data;
- inflation/monetary context where used;
- optional state override for scenario analysis.

Advanced mode must never expose unsupported pseudo-precision.

---

# 20. Physical model formulas

For each scenario-adjustable physical category:

```text
modeled category = reference category × (1 + scenario adjustment)
```

Modeled total supply:

```text
modeled total supply
= modeled mine production
+ modeled recycling
+ modeled other/reconciling supply
```

Modeled total demand:

```text
modeled total demand
= modeled industrial demand
+ modeled physical investment demand
+ modeled jewelry demand
+ modeled silverware demand
+ modeled photography demand
+ modeled other/reconciling demand
```

Modeled balance:

```text
modeled balance = modeled total supply - modeled total demand
```

Interpretation:

- negative balance = modeled deficit;
- positive balance = modeled surplus.

Balance as a percentage of modeled demand:

```text
balance ratio = modeled balance / modeled total demand
```

All calculations use full precision internally.

---

# 21. Physical-balance classification

Use balance ratio rather than absolute ounces alone so results remain meaningful across different reference-year market sizes.

V1 classification:

| Balance ratio | Label |
|---:|---|
| `<= -5%` | Large modeled deficit |
| `> -5% and <= -2%` | Modeled deficit |
| `> -2% and < +2%` | Near balance |
| `>= +2% and < +5%` | Modeled surplus |
| `>= +5%` | Large modeled surplus |

These thresholds are **Carrowmont scenario classifications**, not Silver Institute labels and not price signals.

The UI must disclose this distinction.

---

# 22. Inventory / tightness limitation

A flow deficit is not the same thing as an immediate shortage.

V1 must explicitly explain that above-ground inventories, exchange inventories, investor holdings, fabrication inventories and other stocks can absorb or release metal.

Unless a vetted inventory series is added, do not claim:

- “silver is running out”;
- “there is no silver available”;
- “deficit equals shortage.”

Preferred wording:

> **The modeled annual flow is in deficit. This can contribute to physical tightness, but annual flow balance does not by itself measure all above-ground inventories or guarantee a price response.**

---

# 23. Macro backdrop engine

Reuse the approved Gold macro reference logic where practical rather than inventing a conflicting second interpretation of the same macro series.

V1 macro inputs should include at least:

- real-yield conditions;
- broad U.S. dollar conditions.

Inflation context may be included if it can reuse the established macro classifier without duplicating or weakening the Gold methodology.

Macro result labels:

- Supportive
- Mixed
- Adverse

The macro engine describes precious-metal conditions, not future silver returns.

---

# 24. Combined interpretation matrix

The combined result must keep physical and macro conclusions visible separately.

Primary result card should contain, at minimum:

- **Modeled physical balance**
- **Macro backdrop**
- **Combined interpretation**
- **Reference vs scenario change**
- **Educational limitation**

Examples:

> **Modeled physical balance: Deficit**  
> **Macro backdrop: Adverse**  
> **Interpretation: Physical support with macro headwinds.**

or:

> **Modeled physical balance: Surplus**  
> **Macro backdrop: Supportive**  
> **Interpretation: Macro support with physical-market headwinds.**

No output should state that silver is “bullish” or “bearish.”

---

# 25. Scenario presets

Provide a small number of educational presets.

Recommended V1 presets:

1. **Industrial Demand Surge**
2. **Investment Demand Surge**
3. **Mine Supply Disruption**
4. **Strong Recycling Response**
5. **Industrial Slowdown**
6. **Physical Deficit + Strong-Dollar Headwind**

Each preset must:

- declare exactly which assumptions it changes;
- leave unrelated assumptions untouched;
- be reversible with Reset to Reference;
- be described as an educational scenario, not a forecast.

---

# 26. Required outputs

The result surface should show:

- reference total supply;
- modeled total supply;
- reference total demand;
- modeled total demand;
- reference market balance;
- modeled balance;
- deficit/surplus magnitude;
- balance ratio;
- industrial-demand change;
- physical-investment-demand change;
- mine-supply change;
- recycling change;
- macro backdrop;
- combined interpretation;
- changed-driver summary.

Do not overload the top result area with every component. Detailed category data can remain in an expandable table.

---

# 27. Primary chart — Supply vs Demand & Balance

Create a Carrowmont-standard chart that makes the physical model understandable immediately.

Recommended structure:

- reference supply bar;
- reference demand bar;
- scenario supply bar;
- scenario demand bar;
- clearly labeled deficit/surplus gap;
- permanent values where required for comprehension.

Chart must follow the established Carrowmont visual standard:

- approved Inter/system font stack;
- axis text consistent with the canonical standard;
- no inherited SVG text stroke;
- restrained neutral grid;
- all labels inside bounds;
- no reliance on hover;
- 360px and 390px safe;
- accessible text/table equivalent.

---

# 28. Secondary chart — Silver Force Map

Show the main scenario forces in a stable order:

1. Industrial demand
2. Physical investment demand
3. Mine supply
4. Recycling
5. Real yields
6. U.S. dollar

Each row should communicate:

- support / mixed / headwind direction;
- reference state;
- selected scenario state;
- explanatory text available without hover.

Do not use color alone to communicate direction.

---

# 29. Limited historical context

Where source terms permit, show a concise historical physical-market series sufficient to teach the recent deficit/surplus pattern.

Preferred V1 window:

> **2021–latest completed year**

Do not expand into a large redistributive historical database without confirming source rights.

If a numeric historical series is not appropriate for redistribution, replace it with a sourced narrative timeline rather than omitting the historical context entirely.

---

# 30. “Why silver is different from gold” panel

The tool must include a concise educational comparison.

Suggested structure:

### Gold

- primarily monetary / investment / reserve asset;
- lower direct industrial share relative to silver;
- often treated as a safe-haven / reserve-diversification asset.

### Silver

- precious / investment metal;
- major industrial input;
- more exposed to fabrication cycles;
- more sensitive to mine/recycling supply response;
- generally more volatile.

CTA:

> **Read Silver vs Gold: Is Silver a Good Alternative to Gold?**

and cross-link to the Gold Explorer.

---

# 31. Substitution, thrifting and recycling explanation

A dedicated explanation must make clear that high demand does not act in isolation.

Explain that:

- manufacturers can reduce silver intensity per unit;
- some applications can substitute materials where technically/economically viable;
- higher prices can encourage recycling;
- mine supply may respond slowly because much silver is produced as a by-product of other mining;
- these responses can offset part of a deficit over time.

Never present industrial demand as a one-way structural guarantee.

---

# 32. Gold-silver ratio treatment

The primary article may explain the gold-silver ratio as historical context.

V1 tool should **not** use the gold-silver ratio as a deterministic valuation signal.

Do not say:

- “ratio above X means silver is undervalued”;
- “ratio must revert to Y.”

If included later as an interactive module, it must be labeled as a relative-price observation, not a fair-value formula.

---

# 33. Country and currency behavior

SEO3D-S is global-first.

The physical silver market is global, so country selection must not change the underlying global supply/demand reference.

The shared Carrowmont country/currency shell remains intact.

Rules:

- country selection may localize generic explanatory terminology where appropriate;
- currency selection must not alter physical ounces/tonnes;
- V1 does not relabel global silver market quantities into INR, USD, GBP or other currencies;
- no country-specific silver-price claims;
- no hard-coded India-only monetary examples in the primary global article;
- if future price examples are added, they must use the Learn localization architecture.

---

# 34. Homepage and Tools Hub placement

SEO3D-S is an authority / macro-market explorer, not one of the primary core-planning tools.

Therefore:

- do **not** add it to the ranked core-tools grid;
- do **not** change the country-aware core-tool ordering matrix;
- do **not** alter the fixed Explore All Tools gateway behavior;
- add Silver to `/tools.html` under the appropriate **Macro & Market Explorers / Precious Metals** category;
- add a Silver card to the homepage **Explore More Financial Tools** discovery section only if the established layout remains balanced and passes the visual-consistency gate;
- preserve India, US and other country homepage core ordering exactly.

The complete card visual identity must follow `CARROWMONT_SHARED_UI_STANDARD.md`.

---

# 35. Learn-hub placement

Add `silver-vs-gold.html` to the relevant Learn / Assets & Investing discovery area.

Cross-link from selected existing Gold content where contextually useful.

Do not mass-insert repetitive links into every Learn page.

At minimum, review contextual links from:

- gold-as-an-investment;
- gold-and-inflation;
- gold-vs-stocks;
- physical-gold-vs-gold-etf;
- Gold Macro Stress Explorer.

The article must link to:

- Silver Explorer;
- Gold Explorer;
- relevant existing Gold educational content.

The Silver Explorer must link back to:

- Silver vs Gold article;
- Gold Explorer.

---

# 36. Reference-data maintenance model

## 36.1 Physical silver data

Physical silver data should be updated through a **reviewed annual data change**, not a blind automated PDF scrape.

Preferred flow:

```text
New World Silver Survey / approved source update
        ↓
Review source definitions and revisions
        ↓
Update silver-market-reference.json
        ↓
Run deterministic validation script
        ↓
Protected data-only PR
        ↓
Review old/new values and provenance
        ↓
Merge
```

## 36.2 Macro data

Reuse the existing approved Gold macro reference/update infrastructure for shared fields where practical.

Do not create a second weekly workflow merely to duplicate the same Treasury/Fed/BLS series.

## 36.3 Failure-safe rule

If a source is unavailable or cannot be validated:

> **Keep serving the last verified reference. Never replace it with zero, null, stale placeholder text or an unverified scrape.**

---

# 37. Validation script

Create a deterministic validation script for the Silver physical reference, conceptually:

`scripts/validate-silver-market-reference.mjs`

It should validate:

- schema version;
- source title and URL;
- reference year;
- units;
- finite non-negative category values;
- total supply reconciliation;
- total demand reconciliation;
- published balance consistency where definitions permit;
- allowed residual/reconciliation fields;
- historical-year ordering;
- no duplicate years;
- forecast vs actual labeling;
- anomaly warnings for implausible changes;
- no accidental negative supply/demand quantities.

The script must be runnable in CI without external network access.

---

# 38. Reference revisions

Annual source revisions are expected.

If a newer World Silver Survey revises prior-year figures:

- preserve the latest authoritative revision;
- record the provenance/update date;
- do not pretend prior Carrowmont reference values were “wrong” when the source itself revised them;
- show meaningful revisions in the data-only PR body / implementation record.

---

# 39. Copy Summary

Provide **Copy Summary** using the same deterministic scenario result object as the webpage.

It should include:

- reference year;
- modeled total supply;
- modeled total demand;
- modeled deficit/surplus;
- macro backdrop;
- combined interpretation;
- changed assumptions;
- educational disclaimer;
- Carrowmont URL.

No separate arithmetic inside the copy function.

---

# 40. CSV export

Provide a CSV export containing, at minimum:

- reference / scenario identifier;
- physical category;
- reference value;
- scenario value;
- unit;
- adjustment percentage;
- total supply;
- total demand;
- balance;
- balance ratio;
- macro states;
- source reference year.

CSV values must come from the same deterministic result object used by the page.

---

# 41. PDF report

Provide a standard no-login Carrowmont PDF report.

Target: **four A4 pages**, unless final layout proves that another established standard is clearly better.

Recommended structure:

## Page 1 — Scenario overview

- title;
- reference year / macro date;
- main physical balance;
- macro backdrop;
- combined interpretation;
- key assumptions.

## Page 2 — Physical market

- supply vs demand chart;
- major supply/demand components;
- deficit/surplus explanation;
- inventory limitation.

## Page 3 — Drivers and comparison

- force map;
- reference vs scenario table;
- recycling/substitution explanation;
- Gold vs Silver comparison.

## Page 4 — Methodology, sources and limitations

- formulas;
- scenario-step disclosures;
- source provenance;
- no-price-forecast disclaimer;
- related Carrowmont tools/articles.

Requirements:

- actual PDF must be generated in QA;
- exactly the intended page count;
- raster-render and visually inspect every page before packaging;
- no clipping / overlap / black SVG text artifacts;
- mobile-generated PDF must match desktop semantics;
- report must remain no-login.

---

# 42. Accessibility

Requirements include:

- keyboard-accessible controls;
- visible focus states;
- semantic labels;
- correct disclosure expanded/collapsed state;
- no meaning conveyed by color alone;
- chart text/table equivalent;
- touch targets consistent with Carrowmont standards;
- mobile-safe tables and controls;
- screen-reader-readable deficit/surplus result;
- validation messages associated with relevant fields.

---

# 43. Privacy and network behavior

V1 requires no personal financial account data.

Rules:

- user scenario changes remain local in the browser;
- no external AI service;
- no client secret;
- no external macro/commodity API called from the visitor browser;
- static same-origin reference data only;
- standard PDF/CSV/Copy Summary remain no-login;
- Cloudflare analytics behavior must remain compatible with Carrowmont automated-QA RUM isolation.

The privacy test must permit only the intentionally isolated Cloudflare RUM route and otherwise reject unexpected third-party application-data traffic.

---

# 44. Expected production files

Main-site additions/updates may include:

- `silver-supply-demand-macro-stress-explorer.html`
- `silver-supply-demand-macro-stress-explorer.css`
- `silver-supply-demand-macro-stress-explorer-core.js`
- `silver-supply-demand-macro-stress-explorer.js`
- `silver-supply-demand-macro-stress-explorer-pdf-renderer.js`
- `silver-supply-demand-macro-stress-explorer-report-standard.js`
- `data/silver-market-reference.json`
- `scripts/validate-silver-market-reference.mjs`
- `silver-vs-gold.html`
- `docs/CARROWMONT_SEO3D_SILVER_SUPPLY_DEMAND_MACRO_STRESS_EXPLORER_IMPLEMENTATION.md`
- `tools.html`
- homepage Explore More section only if approved by the visual gate;
- Learn hub / relevant Gold internal links;
- sitemap.

Reuse established shared assets/helpers where practical.

Do not duplicate frameworks unnecessarily.

---

# 45. Central QA

Add a dedicated Playwright suite conceptually:

`carrowmont-qa/tests/12-silver-supply-demand-macro-stress.spec.js`

Add source-contract coverage for:

- tool files;
- primary article;
- reference file;
- validation script;
- canonical metadata;
- sitemap;
- internal links;
- same-origin data behavior;
- no price-prediction wording;
- no India-only leakage into the global Silver article;
- Tools Hub placement;
- homepage core-grid non-regression.

---

# 46. Deterministic fixture set

At minimum, independently fixture-test:

1. reference scenario exactly reproduces reference totals;
2. +5% industrial demand widens deficit / reduces surplus by the expected amount;
3. -5% industrial demand narrows deficit / increases surplus correctly;
4. +10% physical investment changes demand correctly;
5. -10% physical investment changes demand correctly;
6. -2% mine supply changes supply correctly;
7. +2% mine supply changes supply correctly;
8. +10% recycling changes supply correctly;
9. -10% recycling changes supply correctly;
10. combined scenario arithmetic;
11. unit conversion Moz -> tonnes;
12. unit conversion is display-only;
13. exact threshold at -5%;
14. exact threshold at -2%;
15. exact threshold at +2%;
16. exact threshold at +5%;
17. zero balance;
18. invalid negative physical input;
19. non-finite input;
20. reset to reference;
21. each scenario preset changes only documented fields;
22. Copy Summary parity;
23. CSV parity;
24. PDF parity;
25. macro supportive / mixed / adverse matrix cases;
26. physical-deficit + macro-adverse combined interpretation;
27. physical-surplus + macro-supportive combined interpretation;
28. near-balance + mixed combined interpretation.

---

# 47. Acceptance criteria

## 47.1 Baseline / scope

1. Implementation starts from the fresh post-spec Source Snapshot.
2. Existing six calculator repositories are unchanged unless explicitly approved.
3. Gold calculation/reference behavior is not changed merely to support Silver.
4. Current homepage core-tool ordering contract remains unchanged.
5. Explore All Tools behavior remains unchanged.
6. Architecture and Shared UI standards remain controlling documents.

## 47.2 Search funnel

7. `silver-vs-gold.html` exists and is indexable.
8. Silver Explorer exists and is indexable.
9. Article has self-referencing canonical.
10. Tool has self-referencing canonical.
11. Article links prominently to Silver Explorer.
12. Tool links back to the article.
13. Article links to Gold Explorer.
14. Gold ecosystem contains at least one contextual path to the Silver article.
15. Sitemap includes article and tool.
16. IndexNow coverage includes both URLs through established infrastructure.
17. No placeholder links to unbuilt Silver articles.

## 47.3 Reference data

18. Physical reference file exists.
19. Reference year is displayed.
20. Source provenance is displayed.
21. Actual vs forecast status is explicit.
22. All physical quantities are finite and non-negative.
23. Supply totals reconcile within documented tolerance.
24. Demand totals reconcile within documented tolerance.
25. Published balance is not silently conflated with a differently defined Carrowmont balance.
26. Physical-data validation runs without network access.
27. Source failure cannot zero production data.
28. Last verified reference remains usable.
29. Macro reference comes only from approved same-origin data.
30. Browser makes no external data API request.

## 47.4 Simple Mode

31. Simple Mode is default.
32. Advanced Assumptions are collapsed by default.
33. Five simple controls are present.
34. Reference state is obvious.
35. Explore Silver Conditions computes deterministic output.
36. Reset restores exact reference state.
37. Simple step sizes match methodology.
38. Scenario presets are identified as scenarios, not forecasts.

## 47.5 Physical model

39. Reference totals reproduce exactly.
40. Industrial adjustment works.
41. Physical-investment adjustment works.
42. Mine-supply adjustment works.
43. Recycling adjustment works.
44. Other fixed demand categories remain fixed unless explicitly edited in Advanced mode.
45. Modeled supply is calculated once in the core result.
46. Modeled demand is calculated once in the core result.
47. Modeled balance is calculated once in the core result.
48. Balance ratio is calculated once in the core result.
49. Classification thresholds are exact.
50. Full precision is retained internally.
51. Presentation rounding does not alter formulas.

## 47.6 Macro / interpretation

52. Macro result is Supportive / Mixed / Adverse only.
53. Physical and macro results remain separately visible.
54. Combined interpretation follows the rule matrix.
55. No overall numeric “silver score” is exposed in V1.
56. No result says silver will rise/fall.
57. No result gives a price target.
58. No result says deficit guarantees price appreciation.
59. Inventory limitation is visible near physical-balance interpretation.
60. Substitution/thrifting/recycling counterforces are explained.

## 47.7 Charts

61. Supply-vs-demand chart matches result object.
62. Force map matches result object.
63. Approved Carrowmont font stack is used.
64. SVG text has no inherited stroke.
65. Labels stay inside desktop plot bounds.
66. Labels stay inside 390px bounds.
67. Labels stay inside 360px bounds.
68. No page-level horizontal overflow.
69. Permanent values do not depend on hover.
70. Color is not the only state indicator.
71. Accessible text/table equivalent matches chart data.

## 47.8 Global/localization behavior

72. Tool remains globally worded.
73. Article contains no accidental hard-coded INR / lakh / crore dependence.
74. Country changes do not alter global silver ounces.
75. Currency changes do not alter global silver ounces.
76. Unit toggle affects display only.
77. India homepage core cards remain unchanged.
78. US homepage core cards remain unchanged.
79. Representative non-India homepage core ordering remains unchanged.
80. Explore All Tools stays in its approved position.
81. Silver does not enter the ranked core-tool matrix.

## 47.9 Article quality

82. Article independently answers Silver-vs-Gold search intent.
83. Article explains lower nominal price does not equal lower valuation.
84. Article explains silver industrial exposure.
85. Article explains volatility difference without exaggerated claims.
86. Article explains deficits without guaranteeing price direction.
87. Article explains recycling/substitution.
88. Article treats gold-silver ratio as context only.
89. CTA to Explorer is prominent but not intrusive.
90. No thin-doorway-page pattern.

## 47.10 Exports

91. Copy Summary uses core result object.
92. CSV uses core result object.
93. PDF uses core result object.
94. Reference/scenario values reconcile across all three surfaces.
95. PDF is no-login.
96. Actual PDF is generated in QA.
97. PDF page count matches specification.
98. PDF is visually inspected page by page.
99. Mobile-generated PDF preserves semantics.
100. No PDF clipping or overlap.

## 47.11 Privacy / network regression

101. No personal data required.
102. No AI call required.
103. No client secret exists in frontend source.
104. No direct external market-data fetch occurs in the browser.
105. Cloudflare RUM isolation remains active in automated QA.
106. Privacy test allows only intentionally isolated RUM traffic and rejects unexpected third-party application traffic.
107. Existing Gold QA remains green.
108. Existing SEO3C / SEO3D / Learn localization QA remains green.

## 47.12 Source / release governance

109. Central source contract is green.
110. Product QA is green before release packaging.
111. Publisher-layout simulation is green.
112. Multi-Repo Guard-layout simulation is green.
113. Final ZIP integrity is checked.
114. Every manifest file/hash is verified.
115. No file is changed after final validation without rerunning affected checks.
116. Expected PR count is known before Publisher.
117. Main-site PR is merged before central-QA PR.
118. Live Pages deployment is green.
119. Live Automated QA is green.
120. Multi-Repo Guard is green.
121. Fresh Source Snapshot is green and becomes the next baseline.

---

# 48. Red-prevention release gate

Because repeated Publisher/live-QA RED runs are costly, the final production bundle must not be handed over until the exact bundle has passed a release-candidate rehearsal.

Mandatory pre-handoff checks:

- exact baseline hashes match the fresh post-spec snapshot;
- ZIP opens cleanly and `testzip()` returns no bad member;
- release manifest path and hashes verified;
- source contract green in normal source layout;
- source contract green in Publisher layout;
- source contract green in Multi-Repo Guard layout;
- browser tests run at desktop, 390px and 360px;
- hidden Advanced Assumptions are opened through the real user flow before tests target hidden controls;
- live-style same-origin reference fetches use `BASE_URL` / served URLs rather than assuming a sibling repository exists;
- Cloudflare RUM behavior is tested in live-style conditions;
- Unicode/non-breaking whitespace is normalized in text assertions where localization can legitimately emit NBSP characters;
- external data sources are not required for Publisher/live browser tests;
- physical reference validator uses local fixtures;
- all scenario fixtures pass;
- Copy/CSV/PDF parity passes;
- actual PDF rendered and visually reviewed;
- homepage India + US + representative other country regression passes;
- Gold Explorer and primary Gold internal links remain healthy;
- primary Silver article and tool both pass canonical/sitemap/internal-link checks.

---

# 49. Expected repository scope and PRs

Initial expected repositories:

1. `draw004.github.io`
2. `carrowmont-qa`

Expected Publisher output:

> **Exactly 2 PRs**

No existing calculator repository should need modification.

V1 should avoid adding a new `.github/workflows/*` file by reusing the existing macro updater and using reviewed annual Silver physical-data updates.

Therefore temporary **Workflows: Read and write** permission should **not** be required unless implementation scope changes and a workflow file is explicitly approved later.

---

# 50. Planned release sequence

```text
Approved Silver specification committed to /docs
        ↓
Fresh Source Snapshot
        ↓
Build primary article + Silver Explorer
        ↓
Deterministic physical / macro fixtures
        ↓
Reference-data validation
        ↓
Staged browser / mobile / export / PDF QA
        ↓
Carrowmont Visual Consistency Gate
        ↓
Publisher-layout + Guard-layout rehearsal
        ↓
Final release ZIP
        ↓
Batch PR Publisher GREEN
        ↓
Merge draw004.github.io PR
        ↓
Merge carrowmont-qa PR last
        ↓
Pages / IndexNow
        ↓
Live Automated QA GREEN
        ↓
Multi-Repo Guard GREEN
        ↓
Fresh Source Snapshot
        ↓
Google Search Console URL Inspection / Request Indexing
for Silver article + Silver Explorer
```

---

# 51. Google / Bing discoverability after release

After the full release is green, inspect in Google Search Console:

- `https://carrowmont.com/silver-vs-gold.html`
- `https://carrowmont.com/silver-supply-demand-macro-stress-explorer.html`

If not indexed:

- run Live Test;
- request indexing only if Google reports the URL is indexable.

Bing discovery should use the existing IndexNow infrastructure.

IndexNow notification does not guarantee indexing; Bing Webmaster URL inspection can be used later to confirm crawl/index status.

---

# 52. Future enhancements — explicitly out of V1

Possible later additions:

- broader historical supply/demand explorer;
- exchange / above-ground inventory module if a suitable data source is approved;
- gold-silver ratio explorer;
- live/historical benchmark price integration after licensing review;
- regional fabrication demand;
- solar / electronics / automotive sub-sector breakdown;
- mine-by-product supply sensitivity;
- local silver-price transmission by currency and taxes;
- saved scenarios after optional accounts exist;
- cross-tool Precious Metals dashboard;
- AI explanation layer grounded strictly in deterministic Carrowmont outputs.

None of these should delay V1.

---

# 53. Definition of done

SEO3D-S is complete only when:

- this specification is approved and committed;
- a fresh post-spec Source Snapshot is taken;
- implementation starts from that snapshot;
- the primary Silver-vs-Gold discovery article is live;
- the Silver Explorer is live;
- physical and macro engines are deterministic and separately visible;
- deficits/surpluses are modeled correctly;
- inventory limitations are disclosed;
- substitution/recycling counterforces are explained;
- no price target / buy-sell language appears;
- global localization rules are respected;
- Tools Hub and relevant Precious Metals links are updated;
- homepage core-tool behavior is unchanged;
- web, Copy Summary, CSV and PDF remain in parity;
- actual PDF is generated and visually inspected;
- 360px and 390px layouts pass;
- privacy / same-origin data tests pass;
- Publisher is GREEN;
- release PRs merge in dependency order with QA last;
- Pages is GREEN;
- live Automated QA is GREEN;
- Multi-Repo Guard is GREEN;
- a fresh Source Snapshot becomes the next authoritative baseline;
- Google indexing is requested for the Silver article and Silver Explorer when appropriate.

---

# 54. Final product principle

SEO3D-S should teach one central idea exceptionally well:

> **Silver is both a precious metal and an industrial material. Its physical market and its monetary backdrop can reinforce each other or pull in opposite directions. A deficit may matter, but it is not a guaranteed price signal.**

The user should leave understanding **why silver can behave differently from gold**, not believing Carrowmont has predicted the next silver price.

---

**End of FINAL specification — SEO3D-S Silver Supply, Demand & Macro Stress Explorer**
