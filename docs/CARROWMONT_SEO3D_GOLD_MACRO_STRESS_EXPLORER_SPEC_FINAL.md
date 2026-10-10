# CARROWMONT SEO3D — GOLD UNDER MACRO STRESS EXPLORER

## Product & Implementation Specification

**Baseline:** Carrowmont post-SEO3C clean Source Snapshot  
**Snapshot generated:** 10 October 2026, 07:44:54 UTC  
**Main-site commit:** `a43a22a28f28417bddb8b1ae01dd36fb62477e31`  
**Central QA commit:** `45dfca832c227a4ed8c0d4d10f3e63e972721abf`  
**Existing source contract:** 257 PASS / 0 FAIL  
**Specification date:** 10 October 2026  
**Status:** FINAL / owner-approved product direction — release-hardening gates incorporated; production code is not changed by this document.

---

# 1. Purpose

SEO3D will create a public, free, no-login Carrowmont authority asset that helps a non-specialist understand how several macroeconomic forces can simultaneously support or weigh on gold.

The core question is:

> **Under the macro conditions selected, which forces are supportive for gold, which are headwinds, and why?**

SEO3D is **not** a gold-price forecast, trading signal, return forecast or recommendation to buy or sell gold.

The tool should make five ideas clear:

1. Gold is influenced by several macro forces at the same time.
2. Those forces can point in opposite directions.
3. High inflation, high debt or geopolitical stress does not guarantee that gold rises.
4. Real yields and U.S. dollar conditions can offset safe-haven or inflation-related support.
5. A useful gold framework should explain the competing forces rather than produce a fake price target.

---

# 2. Strategic role in the Carrowmont roadmap

SEO3D is the next authority asset in the **Global Macro Risk & Financial Resilience** pillar after SEO3C — US Debt & Interest Cost Calculator.

Its role is to:

- connect macro conditions to a widely followed real asset without sensationalism;
- create a transparent educational framework around gold rather than another generic price calculator;
- connect SEO3C fiscal/debt analysis to later inflation, oil and global-stress assets;
- build a reusable Carrowmont reference-data pattern for macro indicators with different update frequencies;
- strengthen the existing Carrowmont gold article cluster;
- provide a link-worthy interactive asset whose logic can be inspected and reproduced.

SEO3D should naturally connect to:

- `gold-and-inflation.html`;
- `gold-as-an-investment.html`;
- `gold-vs-stocks.html`;
- `physical-gold-vs-gold-etf.html`;
- `us-debt-interest-cost-calculator.html`;
- inflation and retirement-planning content where appropriate.

---

# 3. Non-negotiable editorial positioning

The page must separate:

- official or authoritative reference data;
- third-party specialist data;
- Carrowmont deterministic classifications;
- user-selected scenario assumptions;
- educational interpretation;
- uncertainty.

Never publish wording such as:

- “Gold will rise.”
- “Gold will fall.”
- “Gold will reach $X.”
- “Buy gold now.”
- “High U.S. debt guarantees higher gold prices.”
- “War guarantees gold gains.”
- “Inflation means gold must outperform.”
- “The dollar is about to collapse.”

Preferred wording includes:

- “Under the conditions selected…”
- “This force is supportive for gold in the model…”
- “This condition is a macro headwind…”
- “The environment contains competing forces…”
- “This is a sensitivity framework, not a price forecast.”

The strongest positive result label permitted in V1 is:

> **Strongly supportive macro environment**

The strongest negative result label permitted in V1 is:

> **Strong macro headwinds**

Neither label predicts the next gold-price move.

---

# 4. Canonical route and search presentation

## 4.1 Canonical URL

`https://carrowmont.com/gold-macro-stress-explorer.html`

## 4.2 Recommended title

**Gold Macro Stress Explorer | Carrowmont**

## 4.3 Recommended meta description

**Explore how real yields, the U.S. dollar, inflation, central-bank demand, fiscal stress and geopolitical or financial stress can create supportive or adverse conditions for gold.**

## 4.4 H1

**See which macro forces are supporting or weighing on gold**

## 4.5 Structured data

Use `WebApplication` schema consistent with established Carrowmont authority tools.

Do not use structured data to imply:

- live gold-price prediction;
- investment advice;
- a guaranteed relationship between any driver and gold;
- real-time data unless every displayed reference actually satisfies that standard.

---

# 5. What SEO3D does and does not answer

## SEO3D answers

- Are current or selected real-yield conditions supportive or adverse for gold in the model?
- Is U.S. dollar strength acting as a macro headwind or support?
- How does inflation pressure change the macro backdrop?
- Is official-sector gold demand relatively strong or weak?
- Is fiscal stress adding a supportive safe-haven / alternative-store-of-value force?
- Is geopolitical or financial-system stress elevated?
- Which supportive and adverse forces are currently in conflict?
- How does the qualitative environment change when one or more assumptions are changed?

## SEO3D does not answer

- What will gold cost tomorrow, next month or next year?
- Should a user buy, sell or hold gold?
- What percentage return will gold produce?
- What portfolio allocation to gold is appropriate for a specific person?
- Will the dollar collapse?
- Will the United States default?
- Will a geopolitical event escalate?
- Which exact market driver will dominate the gold price next?

---

# 6. The six V1 macro drivers

SEO3D V1 uses exactly six top-level drivers.

## 6.1 Real interest rates

Reference measure: **10-year U.S. Treasury real yield**, derived from Treasury Inflation-Protected Securities through the Treasury real constant-maturity curve.

Model relationship:

- lower or falling real yields are generally more supportive;
- higher or rising real yields are generally a headwind because they raise the opportunity cost of holding a non-yielding asset;
- the relationship is not treated as deterministic price causation.

Importance in composite: **High**.

## 6.2 U.S. dollar strength

Reference measure: **Federal Reserve Broad Dollar Index**.

Model relationship:

- a weaker / falling dollar is generally more supportive for dollar-priced gold;
- a stronger / rising dollar is generally a headwind;
- currency effects can be offset by other macro forces.

Importance in composite: **High**.

## 6.3 Inflation pressure

Reference measure: **U.S. CPI-U 12-month inflation rate**, with direction/trend context.

Model relationship:

- elevated or rising inflation pressure can be supportive for gold as an inflation-sensitive store-of-value narrative;
- low or falling inflation pressure can reduce that particular source of support;
- inflation alone never produces a gold-price prediction because real yields, the dollar and other forces can dominate.

Importance in composite: **Medium**.

## 6.4 Central-bank gold demand

Reference measure: **World Gold Council central-bank and other-institution net gold demand**, smoothed using a trailing four-quarter measure where data licensing and availability permit.

Model relationship:

- strong net official-sector accumulation is supportive;
- weak accumulation is less supportive;
- sustained net selling is a headwind.

Importance in composite: **Medium**.

## 6.5 Fiscal / sovereign-debt stress

Reference context: **CBO and U.S. Treasury fiscal data**, including debt and interest-burden measures.

Model relationship:

- elevated or worsening fiscal stress can be supportive for gold through reserve-diversification, confidence and alternative-store-of-value channels;
- improving / low fiscal stress removes some of that support;
- this driver must not imply that high debt causes an imminent crisis.

Importance in composite: **Medium**.

## 6.6 Geopolitical / financial-system stress

Reference context combines:

- **Caldara-Iacoviello Geopolitical Risk Index (GPR)**; and
- **Office of Financial Research Financial Stress Index (OFR FSI)**.

Model relationship:

- elevated geopolitical or financial stress can add safe-haven support;
- low/easing stress can remove that support;
- one event does not guarantee a positive gold response.

Importance in composite: **Medium**.

---

# 7. Product experience — reference first, scenario second

SEO3D should open in a useful state without requiring the visitor to research any macroeconomic data.

Use a two-layer experience:

1. **Reference Macro Snapshot** — loaded automatically from Carrowmont's bundled validated reference file;
2. **What-if Scenario Controls** — user may change one or more driver states.

The user should understand the page within seconds.

Recommended first-screen concept:

```text
Carrowmont Gold Macro Reference Snapshot
Updated: [snapshot date]

Real yields                  High
U.S. dollar                  Strong
Inflation pressure           Elevated
Central-bank demand          Strong
Fiscal stress                Elevated
Geopolitical/financial       Moderate

[ Explore Gold Conditions ]

Change any condition to test a what-if scenario.
```

The user must not be required to enter raw Treasury yields, index levels, CPI values, tonnes of central-bank purchases or fiscal ratios before receiving a result.

---

# 8. Reference-data architecture

The production browser must not call external macro-data providers directly.

SEO3D should consume a bundled Carrowmont reference file, conceptually:

`data/gold-macro-reference.json`

Example structure:

```text
{
  "snapshotDate": "YYYY-MM-DD",
  "generatedAt": "ISO timestamp",
  "drivers": {
    "realYields": {
      "value": ..., "unit": "%", "asOf": ..., "source": ...,
      "fiveYearPercentile": ..., "trend13WeekPp": ..., "referenceScore": ...
    },
    "dollar": {
      "value": ..., "asOf": ..., "source": ...,
      "fiveYearPercentile": ..., "trend13WeekPct": ..., "referenceScore": ...
    },
    "inflation": {
      "value": ..., "unit": "% YoY", "asOf": ..., "source": ...,
      "fiveYearPercentile": ..., "trend3MonthPp": ..., "referenceScore": ...
    },
    "centralBankDemand": {
      "trailingFourQuarterTonnes": ..., "asOfQuarter": ..., "source": ...,
      "referenceScore": ..., "manualReviewed": true
    },
    "fiscalStress": {
      "sourceBaseline": ..., "sourceDate": ..., "referenceScore": ...,
      "manualReviewed": true, "rationale": ...
    },
    "stress": {
      "gprFourWeekAverage": ..., "gprPercentile": ...,
      "ofrFourWeekAverage": ..., "ofrPercentile": ...,
      "asOf": ..., "referenceScore": ...
    }
  }
}
```

The file may evolve during implementation, but the following principles are mandatory:

- raw reference values and qualitative states are separate fields;
- every reference driver has an `as of` date or source period;
- the browser calculation uses the bundled local file only;
- the page remains fully usable if every external data source is unavailable at visit time;
- the user can always see that a reference snapshot is dated rather than live.

---

# 9. Data-source and refresh policy

Different drivers update at different frequencies. SEO3D must preserve those differences rather than pretending all values are equally current.

## 9.1 Real yields — automated weekly reference

Source:

**U.S. Department of the Treasury — Daily Treasury Par Real Yield Curve Rates**  
`https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_real_yield_curve`

Use the 10-year real constant-maturity rate.

Carrowmont weekly updater may calculate:

- latest available 5-business-day average;
- trailing five-year percentile;
- change versus approximately 13 weeks earlier.

## 9.2 U.S. dollar — automated weekly reference

Source:

**Federal Reserve H.10 — Broad Dollar Index**  
`https://www.federalreserve.gov/releases/h10/summary/`

Use the nominal Broad Dollar Index.

Carrowmont weekly updater may calculate:

- latest available 5-business-day average;
- trailing five-year percentile;
- 13-week percentage change.

## 9.3 Inflation — automated check, monthly underlying release

Source:

**U.S. Bureau of Labor Statistics — CPI-U**  
`https://www.bls.gov/news.release/cpi.toc.htm`

Use the All Items CPI-U 12-month percentage change.

The weekly updater may check for a newer monthly release, but the stored CPI value changes only when a newer official month exists.

## 9.4 Central-bank demand — quarterly reviewed update

Preferred source:

**World Gold Council — Gold Demand Trends / gold demand data**  
`https://www.gold.org/goldhub/data/gold-demand-by-country`

Carrowmont should store only the summary values necessary for this tool, with source attribution and source period. Do not bulk republish proprietary/specialist data beyond what is required for the feature and permitted by the source terms.

Central-bank demand must remain **human-reviewed before merge** because quarterly estimates can be revised materially as additional data becomes available.

## 9.5 Fiscal stress — reviewed when official baseline changes

Primary source:

**Congressional Budget Office — Budget and Economic Outlook / current fiscal baseline**  
`https://www.cbo.gov/publication/62105`

Treasury fiscal data may be used as supplementary factual context.

The fiscal driver is not a weekly market series. Reassess it when:

- CBO releases a materially newer baseline/outlook;
- a relevant official fiscal update materially changes the reference conditions;
- Carrowmont deliberately refreshes the macro reference methodology.

## 9.6 Geopolitical risk — automated weekly reference

Source:

**Caldara-Iacoviello Geopolitical Risk Index**  
`https://www.matteoiacoviello.com/gpr.htm`

Use the recent daily GPR series, aggregated to a four-week average for stability.

The source states that recent daily data are updated weekly and are subject to revisions. Carrowmont must preserve source/date attribution and should not overstate preliminary readings.

## 9.7 Financial stress — automated weekly reference

Source:

**Office of Financial Research — Financial Stress Index**  
`https://www.financialresearch.gov/financial-stress-index/`

Use a four-week average rather than one daily observation.

The source defines positive FSI readings as above-average financial stress and negative readings as below-average stress. Carrowmont may additionally compute a trailing five-year percentile for the classification engine.

---

# 10. Weekly reference updater

Create a dedicated GitHub Actions workflow, conceptually:

**Update Gold Macro Reference**

Suggested filename:

`.github/workflows/update-gold-macro-reference.yml`

Recommended cadence: **once per week**, for example Monday after the main weekly source updates are expected to be available.

The workflow should:

1. fetch the latest Treasury real-yield data;
2. fetch the Federal Reserve Broad Dollar Index;
3. check BLS for the latest available CPI reference month;
4. fetch the latest available GPR data;
5. fetch the latest OFR FSI data;
6. validate every automated source;
7. calculate the deterministic reference metrics and states;
8. retain the previously reviewed central-bank-demand and fiscal-stress fields unless those are deliberately updated;
9. compare the generated reference file with the currently stored file;
10. if nothing material changed, finish without a PR;
11. if a valid change exists, create a small protected data-only PR;
12. show old/new values, dates and classifications clearly in the PR body.

## 10.1 Failure-safe policy

V1 should use an **all-or-nothing automated weekly refresh** for the automated source set.

If any required automated source:

- cannot be fetched;
- returns malformed data;
- returns a date outside reasonable expectations;
- fails a numeric sanity check;
- cannot provide the history required for classification;

then the workflow must:

- create no production-data change;
- leave the last verified reference file untouched;
- fail or warn clearly enough for owner review.

The website continues using the last verified reference snapshot.

## 10.2 Anomaly safeguards

At minimum validate:

- dates parse and do not move backwards;
- required numeric fields are finite;
- historical series contain enough valid observations;
- percentile values remain in 0–100;
- real-yield and CPI percentage values remain inside broad sanity bounds;
- dollar index values are positive;
- GPR and OFR series are non-malformed;
- unusually large week-over-week changes are flagged for manual review rather than silently merged.

Exact anomaly thresholds may be implementation constants protected by tests; they are guardrails, not economic forecasts.

## 10.3 Workflow security

The updater should use GitHub's repository `GITHUB_TOKEN`, not a long-lived personal token, wherever possible.

Use the minimum workflow permissions needed for the data-only PR pattern, such as:

- `contents: write`;
- `pull-requests: write`.

Do not grant unrelated repository, administration or workflow-edit permissions to the runtime job.

No external API secret should be required for public source retrieval in V1.

---

# 11. Deterministic driver classification engine

The reference classifications must be reproducible from stored reference values and disclosed rules.

Internal driver scores use:

```text
+2 = strong support for the gold macro environment
+1 = support
 0 = mixed / neutral
-1 = headwind
-2 = strong headwind
```

These scores describe the **macro environment**, not expected gold returns.

The normal user interface should show natural-language driver states rather than raw score numbers. The methodology may disclose the score system.

---

# 12. Real-yield reference classification

Reference inputs:

- 10-year real-yield 5-business-day average;
- trailing five-year percentile of comparable observations;
- 13-week change in percentage points.

Base score from trailing five-year percentile:

```text
<= 20th percentile      +2
>20 to 40               +1
>40 to 60                0
>60 to 80               -1
>80                     -2
```

Trend modifier:

```text
13-week change <= -0.50 percentage points    +1
13-week change >= +0.50 percentage points    -1
otherwise                                     0
```

Final real-yield score:

```text
clamp(baseScore + trendModifier, -2, +2)
```

User-facing state examples:

- +2: **Very supportive real-yield conditions**
- +1: **Supportive real-yield conditions**
- 0: **Mixed real-yield conditions**
- -1: **Real-yield headwind**
- -2: **Strong real-yield headwind**

The page must explain that this is a relative regime-and-trend classification, not a claim that a specific real yield mechanically determines gold.

---

# 13. U.S. dollar reference classification

Reference inputs:

- Broad Dollar Index 5-business-day average;
- trailing five-year percentile;
- 13-week percentage change.

Base score:

```text
<= 20th percentile      +2
>20 to 40               +1
>40 to 60                0
>60 to 80               -1
>80                     -2
```

Trend modifier:

```text
13-week change <= -3%    +1
13-week change >= +3%    -1
otherwise                 0
```

Final dollar score:

```text
clamp(baseScore + trendModifier, -2, +2)
```

Interpretation is from gold's perspective:

- a low/falling dollar score is supportive;
- a high/rising dollar score is a headwind.

---

# 14. Inflation-pressure reference classification

Reference inputs:

- latest CPI-U 12-month inflation rate;
- percentile versus the previous 60 monthly observations;
- change in the year-over-year inflation rate over approximately three months.

Base score from 60-month percentile:

```text
>= 80th percentile      +2
>=60 to <80             +1
>=40 to <60              0
>=20 to <40             -1
<20                     -2
```

Trend modifier:

```text
3-month change in YoY CPI >= +0.50 percentage points    +1
3-month change in YoY CPI <= -0.50 percentage points    -1
otherwise                                                 0
```

Final inflation score:

```text
clamp(baseScore + trendModifier, -2, +2)
```

The methodology must explicitly state:

> High inflation can add support to the gold macro environment, but it does not guarantee higher gold prices. The real-yield and dollar drivers separately capture important offsetting forces.

---

# 15. Central-bank-demand reference classification

Use a smoothed official-sector demand measure rather than a single quarter where practical.

Preferred reference:

**Trailing four-quarter central-bank / official-institution net gold demand**.

Because source estimates may be revised, this field is updated only through a reviewed quarterly PR.

Recommended classification:

- calculate the latest trailing-four-quarter total;
- compare it with the distribution of trailing-four-quarter totals over the available recent history, preferably at least 10 years where the source series supports it;
- store the source period and review date.

Reference score:

```text
net selling over trailing four quarters       -2
positive, <=20th percentile                    -1
>20 to <40th percentile                        -1
>=40 to <60th percentile                        0
>=60 to <80th percentile                       +1
>=80th percentile                              +2
```

The duplicate weak-demand bands are intentional: weak but still positive official demand is a modest headwind, while net selling is the strong-headwind state.

If licensing/data-history constraints prevent percentile calculation in V1, the formal implementation may use an explicitly documented reviewed threshold table instead. Such a change requires updating the implementation note and QA fixture before release, not silent improvisation.

---

# 16. Fiscal-stress reference classification

Fiscal stress is deliberately **reviewed**, not automatically reclassified every week.

Reference evidence should include current CBO/Treasury measures such as:

- debt held by the public relative to GDP;
- net interest outlays relative to GDP;
- direction of those measures in the official baseline;
- material changes to deficit / interest-burden assumptions.

The stored reference must contain:

- `referenceScore`;
- source baseline title/date;
- key source metrics used;
- a short deterministic rationale.

Permitted reference scores for V1:

```text
-1 = low / improving fiscal-stress backdrop
 0 = normal / mixed
+1 = elevated
+2 = very elevated
```

Do not assign `-2` in V1. Low fiscal stress removes a source of gold support but is not treated as a powerful standalone negative force.

A fiscal score change requires a reviewed PR and source citation.

---

# 17. Geopolitical / financial-stress classification

## 17.1 GPR subscore

Use the four-week average of the recent daily GPR index.

Calculate its percentile against approximately five years of comparable history.

```text
<=30th percentile      -1
>30 to <70              0
>=70 to <90            +1
>=90                   +2
```

## 17.2 OFR FSI subscore

Use the four-week average of the OFR FSI.

Calculate its percentile against approximately five years of comparable history.

```text
<=30th percentile      -1
>30 to <70              0
>=70 to <90            +1
>=90                   +2
```

Retain the actual OFR FSI value because the source's positive/negative interpretation remains useful context.

## 17.3 Combined stress score

```text
if either subscore == +2              +2
else if either subscore == +1         +1
else if both subscores == -1          -1
else                                   0
```

This rule prevents a severe geopolitical or financial stress signal from being cancelled merely because the other sub-index is normal.

V1 does not assign `-2` for unusually calm conditions.

---

# 18. User scenario controls

The reference engine and the scenario engine are separate concepts.

The reference engine produces the dated Carrowmont reference state.

The visitor may then create a scenario by changing one or more driver states.

Recommended driver controls:

## Real yields

- Very supportive
- Supportive
- Mixed
- Headwind
- Strong headwind

## U.S. dollar

- Very supportive
- Supportive
- Mixed
- Headwind
- Strong headwind

## Inflation pressure

- Strong support
- Support
- Mixed
- Low-inflation headwind
- Strong low-inflation headwind

## Central-bank demand

- Strong net selling / strong headwind
- Weak demand / headwind
- Typical / mixed
- Strong demand / support
- Very strong demand / strong support

## Fiscal stress

- Low / improving
- Normal / mixed
- Elevated
- Very elevated

## Geopolitical / financial stress

- Low
- Normal / mixed
- Elevated
- Very elevated

The visible wording can be refined for clarity during UI review, but each option must map one-to-one to a deterministic internal score.

---

# 19. Reference vs custom scenario behavior

Default state:

> **Reference Snapshot**

If the user changes any driver, change the scenario label to:

> **Custom What-if Scenario**

Provide:

- **Reset to Reference Snapshot**;
- clear highlighting of changed drivers;
- a concise “Changed from reference” summary;
- no implication that a user-selected scenario is current reality.

Reference values and custom scenario values must never be visually conflated.

---

# 20. Composite macro-environment engine

Driver weights:

```text
Real yields                    1.5
U.S. dollar                    1.5
Inflation pressure             1.0
Central-bank demand            1.0
Fiscal stress                  1.0
Geopolitical/financial stress  1.0
```

Total weight = `7.0`.

Maximum absolute weighted score = `14.0`.

For driver scores `s_i` and weights `w_i`:

```text
weightedSum = sum(s_i * w_i)
normalizedEnvironmentScore = weightedSum / 14
```

The normalized score is internal. Do not present it as a probability, expected return or gold-price score.

## 20.1 Environment labels

```text
score <= -0.60                  Strong macro headwinds
-0.60 < score < -0.15          Macro headwinds
-0.15 <= score <= +0.15        Mixed macro environment
+0.15 < score < +0.60          Supportive macro environment
score >= +0.60                 Strongly supportive macro environment
```

Use inclusive boundaries exactly as specified in code and fixtures.

---

# 21. Conflict detection and interpretation

The output should explain competing forces rather than hide them behind one label.

Set:

```text
hasSupport = any driver score >= +1
hasHeadwind = any driver score <= -1
hasConflict = hasSupport && hasHeadwind
```

If `hasConflict` is true, show:

> **Competing forces are present.**

If the overall environment is supportive but either Real Yields or U.S. Dollar is a headwind, use deterministic copy such as:

> **The overall macro environment is supportive, but major financial headwinds remain from real yields and/or the U.S. dollar.**

If the overall environment has headwinds but Fiscal Stress or Geopolitical/Financial Stress is supportive, use:

> **Financial headwinds dominate the composite, although safe-haven or fiscal-stress forces provide some support.**

Interpretation copy must be generated from deterministic driver states, not an external AI service.

---

# 22. Scenario presets

Presets are optional shortcuts and must not hide multiple speculative assumptions.

V1 presets should change only the driver(s) explicitly named by the preset and leave all other drivers at the current reference values.

Recommended presets:

1. **Lower real yields** — set Real Yields to strong/supportive state.
2. **Higher real yields** — set Real Yields to strong-headwind state.
3. **Dollar weakness** — set U.S. Dollar to supportive state.
4. **Inflation shock** — set Inflation Pressure to strong support.
5. **Strong central-bank accumulation** — set Central-bank Demand to strong support.
6. **Fiscal stress** — set Fiscal Stress to very elevated.
7. **Geopolitical / financial shock** — set combined Stress to very elevated.

After applying a preset, the UI must state exactly which driver changed.

Do not create presets named “Gold boom”, “Gold crash”, “Bull case”, “Bear case”, “Best case” or “Worst case”.

---

# 23. Core outputs

Keep the result surface concise.

## 23.1 Primary result

Show:

**Gold macro environment**  
`[Environment label]`

Secondary line:

- `X supportive forces · Y headwinds · Z mixed`

If conflict exists:

> **Competing forces are present.**

## 23.2 Strongest supportive forces

List up to three drivers with the highest positive weighted contributions.

## 23.3 Strongest headwinds

List up to three drivers with the most negative weighted contributions.

## 23.4 Changed-from-reference summary

For custom scenarios, show only the drivers that the visitor changed.

Example:

> **You changed the U.S. dollar from Headwind to Supportive. With other reference conditions unchanged, one major financial headwind is removed from the model.**

## 23.5 Mandatory disclaimer adjacent to result

> **This describes a macro environment, not a gold-price forecast or investment recommendation.**

---

# 24. Primary force-map chart

Use a Carrowmont-standard horizontal diverging bar/force chart.

Concept:

```text
Strong headwind      Mixed       Strong support
        -2   -1        0        +1   +2

Real yields        <====|
U.S. dollar           <==|
Inflation                        ==>
Central-bank demand                 ====>
Fiscal stress                    ==>
Geo/financial                    ==>
```

Requirements:

- exact driver order remains stable;
- zero/mixed center is visually clear;
- positive/negative orientation is explained in text, not color alone;
- permanent state labels are visible;
- do not rely on hover;
- no clipped labels at 360 px or 390 px;
- chart text uses the established Carrowmont font stack and no SVG text stroke;
- plot labels and callouts remain inside the plotting rectangle;
- chart has an accessible text/table equivalent.

Do not label the horizontal axis “Gold price”.

Preferred axis wording:

> **Macro influence in this framework**

---

# 25. Driver explanation cards

Below the force map, show one concise card or row per driver.

Each should include:

- driver name;
- current scenario state;
- whether it is support / mixed / headwind;
- one-sentence rationale;
- reference source and date when in Reference mode;
- “Custom assumption” label when overridden.

Example:

> **Real yields — Headwind**  
> Higher real yields increase the opportunity cost of holding a non-yielding asset.  
> U.S. Treasury reference · as of [date]

Avoid causal certainty such as “this will push gold lower.”

---

# 26. Reference-data details disclosure

Provide a collapsed-by-default disclosure:

**View Reference Data & Sources**

It should show the actual raw reference values used to derive each reference state, with source dates.

Example fields:

- 10-year real yield reference value;
- Broad Dollar Index reference value;
- CPI-U 12-month inflation rate;
- latest reviewed central-bank-demand period and summary value;
- fiscal baseline date and reviewed state;
- GPR four-week average;
- OFR FSI four-week average.

This detail is for transparency; ordinary users should not need it to use the explorer.

---

# 27. Scenario comparison

Provide a compact comparison between:

- **Reference Snapshot**; and
- **Your Scenario**.

Rows:

- overall environment label;
- each of six driver states;
- number of supportive/headwind/mixed forces.

Do not calculate a gold-price difference or percentage-return difference.

---

# 28. Educational explanation sections

Include concise evergreen sections covering:

## 28.1 Why real yields matter for gold

Explain opportunity cost and TIPS-derived real yields without claiming a fixed inverse relationship.

## 28.2 Why the U.S. dollar matters

Explain global dollar pricing and why currency strength can create a headwind or support.

## 28.3 Gold and inflation are not a one-factor relationship

Explain that inflation can support gold while high real yields or a strong dollar can offset that force.

## 28.4 Why central banks buy gold

Discuss reserve diversification and official-sector demand without implying that official buying guarantees higher prices.

## 28.5 Fiscal stress and gold

Connect to SEO3C: debt-service and fiscal-confidence concerns can affect demand for alternative stores of value, but high debt alone does not predict a crisis.

## 28.6 Geopolitical and financial stress

Explain safe-haven demand and why stress events can produce different short-term market reactions.

---

# 29. India-facing interpretation

Include a clearly separated section for India-facing users.

Required points:

- SEO3D evaluates the **global macro environment for gold**, primarily through U.S./global drivers;
- the Indian rupee can materially affect domestic gold prices;
- import duties, taxes, local premiums and domestic demand can create differences between global USD gold and Indian retail prices;
- a supportive global macro environment does not translate one-for-one into an INR gold-price move.

Do not perform INR gold-price prediction in V1.

Link to relevant Carrowmont inflation/purchasing-power content where appropriate.

---

# 30. Actions and exports

SEO3D remains free and no-login.

Provide where practical:

- **Copy Summary**;
- **Download CSV**;
- **Generate Gold Macro Report** (PDF).

Standard report download remains available without account creation.

## 30.1 Copy Summary

Include:

- reference/custom scenario label;
- overall environment label;
- each driver state;
- strongest supportive forces;
- strongest headwinds;
- source snapshot date;
- educational disclaimer;
- canonical URL.

## 30.2 CSV

Suggested sections/columns:

```text
scenario_type
snapshot_date
driver
scenario_score
scenario_state
reference_score
reference_state
reference_value
reference_unit
reference_as_of
source_name
is_user_override
```

Include an environment-summary record or separate section with the overall label.

Do not omit underlying driver rows merely because a web disclosure is collapsed.

## 30.3 PDF report

Use Carrowmont report standards and generate from the same structured result object as the web output.

Recommended report structure:

### Page 1 — Gold Macro Snapshot

- title;
- Reference vs Custom Scenario badge;
- overall macro-environment label;
- supportive/headwind counts;
- six driver-state summary;
- no-login educational disclaimer.

### Page 2 — Competing Forces

- force-map chart;
- strongest supportive forces;
- strongest headwinds;
- conflict interpretation.

### Page 3 — Reference Data, Methodology & Sources

- raw dated reference values;
- deterministic scoring explanation;
- source list;
- limitations.

### Page 4 — Gold in a Broader Financial Plan

- global vs India context;
- related Carrowmont tools/articles;
- standard educational disclaimer;
- optional subtle future-account message consistent with Carrowmont architecture, but no login requirement.

PDF cards must size to content and must not use oversized fixed-height boxes.

---

# 31. Page structure

Recommended order:

1. Canonical Carrowmont header.
2. Breadcrumb / back-to-tools pattern.
3. Hero with H1 and concise educational lede.
4. Reference Macro Snapshot date/provenance banner.
5. Six driver controls / state rows.
6. Scenario preset shortcuts.
7. Primary action or immediate reactive update.
8. Overall environment result.
9. Force-map chart.
10. Supportive forces / headwinds summary.
11. Driver explanation cards.
12. Reference vs Your Scenario comparison.
13. Reference Data & Sources disclosure.
14. Educational explanation sections.
15. India-facing interpretation.
16. Methodology and limitations.
17. FAQ.
18. Related Carrowmont tools/articles.
19. Canonical footer.

The page should not feel like six unrelated economic widgets. It should read as one coherent framework.

---

# 32. Recommended hero and warning copy

## Hero lede

> **Explore how real yields, the U.S. dollar, inflation, central-bank demand and stress conditions can pull gold in different directions. Change the assumptions to see how the macro environment shifts.**

## Reference note

> **Carrowmont preloads a dated macro reference snapshot from authoritative or clearly identified specialist sources. You can change any condition to create a what-if scenario.**

## Result warning

> **This explorer describes competing macro forces. It does not forecast the gold price or recommend buying or selling gold.**

---

# 33. FAQ topics

Include concise answers to at least:

1. **What is a real interest rate?**
2. **Why can high real yields be a headwind for gold?**
3. **Why does the U.S. dollar matter for gold?**
4. **Does high inflation always make gold rise?**
5. **Why do central banks buy gold?**
6. **Does high U.S. debt guarantee higher gold prices?**
7. **Why can gold fall during a crisis?**
8. **What is the Geopolitical Risk Index?**
9. **What is the OFR Financial Stress Index?**
10. **How often does Carrowmont update the reference snapshot?**
11. **Why are some reference inputs quarterly while others are weekly?**
12. **Is this a gold-price prediction?**
13. **Is this investment advice?**
14. **Why can gold prices in India differ from global USD gold?**
15. **What happens if one of the external data sources is unavailable?**

---

# 34. Authoritative / credible source set

## 34.1 U.S. Treasury — Daily Treasury Par Real Yield Curve Rates

Use for 10-year real-yield reference data.

The Treasury describes these as Real Constant Maturity Treasury rates derived from the TIPS real-yield curve.

## 34.2 Federal Reserve H.10 — Broad Dollar Index

Use the nominal Broad Dollar Index.

The Federal Reserve describes it as a weighted average of the foreign-exchange value of the U.S. dollar against currencies of a broad group of major U.S. trading partners.

## 34.3 U.S. Bureau of Labor Statistics — CPI-U

Use All Items CPI-U year-over-year inflation for the inflation-pressure reference.

## 34.4 World Gold Council — Gold Demand Trends / demand data

Use for reviewed central-bank / official-institution demand context.

Treat revisions as normal source behavior and preserve source-quarter attribution.

## 34.5 Congressional Budget Office

Use current Budget and Economic Outlook / fiscal baseline for the reviewed fiscal-stress context.

## 34.6 Caldara-Iacoviello Geopolitical Risk Index

Use the recent daily GPR series with attribution.

The published source notes that daily recent data are updated weekly and may be revised.

## 34.7 Office of Financial Research — Financial Stress Index

Use the OFR FSI as the financial-system stress reference.

The source states that positive values indicate above-average stress and negative values below-average stress.

## 34.8 Source discipline

- Prefer official government sources when an appropriate official series exists.
- Clearly identify World Gold Council and GPR as specialist/academic sources rather than government data.
- Preserve source date/period for every reference value.
- Never silently replace a source because another website is easier to scrape.
- If a source methodology materially changes, pause automated reclassification until the change is reviewed.
- Respect source licensing/attribution requirements.

---

# 35. Privacy and product-access rules

- Complete explorer remains available without login.
- Reference-data file is public static data and contains no personal information.
- User scenario changes remain local in the browser in V1.
- No user financial/account data is required.
- No external AI service is called.
- No third-party macro API is called from the visitor's browser.
- Standard PDF/CSV/Copy Summary remain no-login.
- Cloudflare analytics behavior must remain compatible with Carrowmont's automated-QA RUM isolation.

The SEO3D privacy QA must not incorrectly flag the intentionally blocked Cloudflare RUM endpoint as application-data leakage, matching the hardened SEO3C live-QA behavior.

---

# 36. Accessibility

Requirements include:

- keyboard-accessible driver controls;
- visible focus states;
- semantic labels for all controls;
- no meaning conveyed by color alone;
- force-map support/headwind states have text labels;
- chart has a readable tabular/text equivalent;
- disclosure components use correct accessible expanded/collapsed state;
- validation and source warnings are announced appropriately;
- minimum touch targets consistent with Carrowmont standards;
- PDF maintains readable contrast and text sizes.

---

# 37. Responsive behavior

Mandatory widths include:

- desktop reference width;
- tablet;
- 390 px;
- 360 px.

Requirements:

- no page-level horizontal overflow;
- six driver rows stack or reflow cleanly;
- controls remain usable without truncated state labels;
- primary result remains above the detailed chart/table on mobile;
- force-map labels remain inside the plotting area;
- action buttons become full-width when required by the established mobile pattern;
- Reference Data table may use an internal scrolling container if necessary, never page-level overflow;
- report actions and related links remain usable on touch devices.

---

# 38. Proposed implementation files

Exact filenames may be refined during implementation, but scope should remain small and explicit.

## 38.1 Main-site new files

Recommended:

- `gold-macro-stress-explorer.html`
- `gold-macro-stress-explorer.css`
- `gold-macro-stress-explorer-core.js`
- `gold-macro-stress-explorer.js`
- `gold-macro-stress-explorer-pdf.js`
- `gold-macro-stress-explorer-report-standard.js`
- `data/gold-macro-reference.json`
- `.github/workflows/update-gold-macro-reference.yml`
- `scripts/update-gold-macro-reference.mjs` or equivalent deterministic updater
- `docs/CARROWMONT_SEO3D_GOLD_MACRO_STRESS_EXPLORER_IMPLEMENTATION.md`

Reuse existing Carrowmont shared assets/helpers where practical rather than duplicating frameworks.

## 38.2 Main-site updates

Expected controlled updates may include:

- homepage / tools listing where appropriate;
- sitemap;
- relevant Learn article internal links;
- SEO3C cross-link;
- IndexNow coverage through established workflow;
- shared navigation/related-tool data if required.

## 38.3 Central QA

Add a dedicated Playwright suite, conceptually:

`tests/11-gold-macro-stress-explorer.spec.js`

Update source-contract protection to require the SEO3D asset, methodology/data references, updater and key QA safeguards.

No other product repository should change unless the approved implementation discovers a genuinely necessary cross-tool dependency and that scope is separately reviewed.

---

# 39. Calculation/data isolation rule

SEO3D must have a pure deterministic calculation/classification layer that can be fixture-tested without DOM, network, PDF or analytics dependencies.

Conceptual functions:

```text
classifyRealYield(referenceMetrics)
classifyDollar(referenceMetrics)
classifyInflation(referenceMetrics)
classifyCentralBankDemand(reviewedMetrics)
classifyStress(gprMetrics, ofrMetrics)
calculateEnvironment(driverScores)
buildInterpretation(driverScores, environment)
buildScenario(referenceScores, userOverrides)
```

The browser presentation layer must not silently duplicate or alter the scoring rules.

PDF/CSV/Copy Summary should consume the same structured scenario result object where practical.

---

# 40. Required deterministic fixtures

The following fixtures protect the composite engine independent of current macro data.

Weights:

```text
realYield = 1.5
dollar = 1.5
inflation = 1
centralBank = 1
fiscal = 1
stress = 1
maxWeightedAbsolute = 14
```

## Fixture A — all mixed

```text
scores = [0, 0, 0, 0, 0, 0]
weightedSum = 0
normalized = 0
label = Mixed macro environment
hasConflict = false
```

## Fixture B — broad moderate support

```text
scores = [+1, +1, +1, +1, +1, +1]
weightedSum = 7
normalized = 0.5
label = Supportive macro environment
```

This must **not** be labelled Strongly supportive because the strong threshold begins at 0.60.

## Fixture C — broad moderate headwinds

```text
scores = [-1, -1, -1, -1, -1, -1]
weightedSum = -7
normalized = -0.5
label = Macro headwinds
```

## Fixture D — all strong support

```text
scores = [+2, +2, +2, +2, +2, +2]
weightedSum = 14
normalized = 1
label = Strongly supportive macro environment
```

## Fixture E — all strong headwinds

```text
scores = [-2, -2, -2, -2, -2, -2]
weightedSum = -14
normalized = -1
label = Strong macro headwinds
```

Note: Reference fiscal/stress classifiers may not normally emit -2 in V1, but the composite engine must remain mathematically safe for the full internal score domain.

## Fixture F — competing forces can produce Mixed

```text
realYield = -2
dollar = -2
inflation = +1
centralBank = +1
fiscal = +1
stress = +1

weightedSum = (-3) + (-3) + 1 + 1 + 1 + 1 = -2
normalized = -2 / 14 = -0.142857...
label = Mixed macro environment
hasConflict = true
```

This fixture protects the principle that four supportive drivers do not automatically override two high-importance financial headwinds.

## Fixture G — support with a major headwind

```text
realYield = -1
dollar = 0
inflation = +2
centralBank = +2
fiscal = +2
stress = +2

weightedSum = -1.5 + 0 + 2 + 2 + 2 + 2 = 6.5
normalized = 6.5 / 14 = 0.464285...
label = Supportive macro environment
hasConflict = true
interpretation mentions major real-yield headwind
```

## Fixture H — real-yield percentile and trend clamp

```text
baseScore = +2
trendModifier = +1
finalScore = +2, not +3
```

## Fixture I — dollar percentile and rising trend

```text
baseScore = -1
trendModifier = -1
finalScore = -2
```

## Fixture J — stress combination

```text
gprSubscore = +2
ofrSubscore = 0
combinedStress = +2
```

## Fixture K — calm stress combination

```text
gprSubscore = -1
ofrSubscore = -1
combinedStress = -1
```

## Fixture L — reset behavior

After arbitrary user overrides, Reset to Reference Snapshot must restore all six exact reference scores and clear all `isUserOverride` flags.

---

# 41. QA acceptance contract

## 41.1 Source / SEO

1. Canonical URL is exact and unique.
2. Title, meta description and H1 match approved intent.
3. WebApplication structured data is valid and non-misleading.
4. Sitemap contains the canonical URL.
5. IndexNow flow can include the canonical URL.
6. No `noindex` or accidental canonical mismatch.
7. Related gold pages link contextually to SEO3D where approved.
8. SEO3D links back to SEO3C where fiscal-stress context is discussed.

## 41.2 Reference-data provenance

9. Every driver has source name and source date/period.
10. Production page uses bundled local reference data.
11. No visitor-browser macro-data API calls occur.
12. Reference Snapshot label is visually distinct from Custom What-if Scenario.
13. Stale-but-valid reference data remains usable if external sources fail.
14. User overrides are never labelled official/reference data.

## 41.3 Driver classification

15. Real-yield percentile bands map exactly to specified base scores.
16. Real-yield 13-week modifier applies exactly at boundaries.
17. Real-yield score clamps to -2/+2.
18. Dollar percentile bands map exactly.
19. Dollar trend modifier maps exactly.
20. Inflation percentile bands map exactly.
21. Inflation trend modifier maps exactly.
22. Central-bank reviewed classification is deterministic from stored reviewed inputs/rules.
23. Fiscal reference score comes only from reviewed stored data.
24. GPR subscore thresholds map exactly.
25. OFR subscore thresholds map exactly.
26. Combined stress logic maps exactly.

## 41.4 Composite engine

27. All required fixtures A–L pass.
28. Weights are exactly 1.5/1.5/1/1/1/1.
29. Normalization denominator is exactly 14.
30. Label thresholds are exact at -0.60, -0.15, +0.15 and +0.60.
31. Internal score is not displayed as probability or expected return.
32. Conflict detection identifies simultaneous support/headwind drivers.
33. Positive overall result with high-importance headwind uses conflict-aware interpretation.
34. Negative overall result with safe-haven support uses conflict-aware interpretation.

## 41.5 UI

35. Reference snapshot loads without user input.
36. All six drivers are visible and understandable.
37. User can change each permitted scenario state.
38. Any change switches label to Custom What-if Scenario.
39. Changed drivers are identified clearly.
40. Reset restores the exact reference state.
41. Scenario preset changes only the driver(s) explicitly documented.
42. Result never says gold will rise/fall.
43. Result never gives a price target.
44. Result disclaimer is visible near the primary result.
45. Advanced/reference-data disclosure is collapsed by default.
46. Disclosure shows actual dated raw reference values when opened.

## 41.6 Chart

47. Six stable driver rows appear in correct order.
48. Direction is understandable without color.
49. Text uses approved Carrowmont font stack.
50. SVG chart text has no inherited outline/stroke.
51. No driver/state labels clip at desktop.
52. No driver/state labels clip at 390 px.
53. No driver/state labels clip at 360 px.
54. No page-level horizontal overflow.
55. Permanent labels do not rely on hover.
56. Accessible text/table equivalent matches chart values.

## 41.7 Scenario comparison / tables

57. Reference and custom states match result object exactly.
58. Support/headwind/mixed counts reconcile with driver states.
59. Reference-data table shows source dates/periods.
60. Collapsed web detail does not remove CSV/PDF data.

## 41.8 Copy / CSV

61. Copy Summary reflects current scenario exactly.
62. Copy Summary includes non-predictive disclaimer.
63. CSV contains all six driver rows.
64. CSV identifies user overrides.
65. CSV source dates match bundled reference file.
66. Export never invents a gold-price output.

## 41.9 PDF

67. PDF uses same structured scenario object as web output.
68. Environment label matches web.
69. Driver states match web.
70. Force-map chart matches web scenario.
71. PDF has no clipped text or chart labels.
72. PDF cards size to wrapped content.
73. All pages visually reviewed after rasterization.
74. Report includes reference/source dates.
75. Report includes educational-use disclaimer.
76. Report remains downloadable without login.

## 41.10 Privacy / regression

77. No personal data required.
78. No external AI call.
79. No client secrets in source.
80. No third-party macro data request from the production browser.
81. Cloudflare RUM isolation remains active during automated QA.
82. Privacy test permits only the intentionally intercepted Cloudflare RUM route and otherwise rejects unexpected third-party application data traffic.
83. Existing calculators remain untouched unless explicitly listed in the release manifest.
84. Existing SEO3A/SEO3B/SEO3C QA remains green.
85. Central source contract remains green.
86. Live Automated QA remains green.
87. Multi-Repo Guard remains green.

## 41.11 Weekly reference updater

88. Scheduled workflow supports automatic weekly execution.
89. `workflow_dispatch` manual execution is supported.
90. Updater retrieves only approved source series.
91. Any required automated-source fetch failure leaves production unchanged.
92. Malformed data leaves production unchanged.
93. Older/equal source data produces no unnecessary PR.
94. Percentile histories contain sufficient observations.
95. Classifier output matches independent fixtures.
96. A valid changed snapshot creates a protected data-only PR.
97. PR body shows old/new raw values, dates and classifications.
98. Central-bank and fiscal reviewed fields are not silently overwritten by weekly automation.
99. Anomaly warnings block silent auto-update.
100. Workflow uses minimally scoped repository permissions.
101. No persistent external API secret is required.

## 41.12 Mandatory release-candidate red-prevention gate

The production release ZIP must **not** be handed to the owner for GitHub upload until every gate below has passed on the exact final bytes that will be packaged. If any file changes after these checks, the affected checks and the full manifest/hash verification must be rerun.

### A. Bundle / baseline integrity

102. Implementation starts from the fresh post-spec Source Snapshot and all repository base hashes match that snapshot.
103. Release manifest lists every changed repository and every changed file explicitly.
104. Every manifest base hash and new-file hash is independently recomputed before packaging.
105. Final ZIP passes archive integrity testing (`unzip -t` or equivalent).
106. Final ZIP SHA-256 and byte size are recorded in the release validation notes.
107. A clean extraction of the final ZIP reproduces the exact manifest file set with no missing or unexpected release payload files.

### B. Publisher-layout parity

108. The release is staged into the same repository layout used by Carrowmont Batch PR Publisher before browser QA is considered complete.
109. Central source contract passes from that staged Publisher layout.
110. Browser QA runs from the staged Publisher layout using the exact files that will be packaged.
111. Any UI control located inside a collapsed disclosure is tested through the real user sequence: open disclosure first, then interact; tests must never assume a hidden control is visible.
112. Default/collapsed state itself is also explicitly asserted so a test fix cannot silently weaken the approved UX.

### C. Live-origin / analytics parity

113. Privacy/network tests are exercised in a live-origin simulation that includes Carrowmont's intentionally isolated Cloudflare RUM request behavior.
114. The exact intercepted Cloudflare RUM route is permitted only as analytics isolation; all unexpected third-party application/API traffic still fails the test.
115. No production-browser request is made to Treasury, Federal Reserve, BLS, GPR, OFR, World Gold Council or any other macro-data source; the browser consumes bundled validated reference data only.

### D. Multi-Repo Guard layout parity

116. Source-contract checks are simulated in the Multi-Repo Guard clone layout, where `carrowmont-qa` may exist separately from `SOURCE_ROOT`.
117. QA/source-contract code resolves its own repository-relative files from stable script/repository paths and must not assume `SOURCE_ROOT/carrowmont-qa/...` unless that path is explicitly guaranteed.
118. Multi-Repo Guard simulation returns GREEN before the release ZIP is handed off.

### E. Workflow-permission preflight

119. If the release manifest contains any `.github/workflows/*` change, the handoff instructions must state **before the Publisher run** that the Carrowmont Release Automation token requires temporary `Workflows: Read and write`.
120. The owner must enable that permission only immediately before Publisher, save it, run Publisher, and revoke it immediately after PR creation succeeds and before release PRs are merged.
121. If the release contains no workflow-file change, Workflows permission must remain disabled.
122. The release validation notes must explicitly say whether workflow-write permission is required, so this cannot be discovered only after a failed Publisher run.

### F. External-data updater safety

123. Publisher/staged browser QA does not depend on live external macro endpoints being available.
124. Updater behavior is fixture-tested for success, no-change, malformed response, partial-source failure and anomaly conditions.
125. A network/source failure leaves the bundled production reference unchanged and cannot break the public explorer.

### G. Visual / report parity

126. Desktop, 390 px and 360 px screenshots are captured from the final staged build and visually reviewed.
127. The actual PDF is generated from the final staged build, raster-rendered, and every page is visually inspected.
128. Web, Copy Summary, CSV and PDF are checked against the same structured result object for at least the reference scenario and one custom conflicting-forces scenario.

### H. No untested post-validation edits

129. Once the final release candidate has passed all gates, no source/test/workflow file may be edited before packaging without invalidating the release-candidate sign-off.
130. The final handoff to the owner must identify the expected PR count and repositories in advance.

The purpose of this gate is not to weaken QA or guarantee that GitHub can never experience an external/platform failure. It is to eliminate the known preventable causes of repeated RED runs: hidden-control test assumptions, staged-vs-live RUM differences, Guard path-layout assumptions, missing workflow-write permission, corrupted/incorrect bundles and untested last-minute edits.

---

# 42. Carrowmont Visual Consistency Gate

Before Publisher creates production PRs, compare SEO3D against canonical existing Carrowmont assets, including SEO3C and established calculator/report patterns.

Review:

1. Header and navigation.
2. Inter/system typography.
3. Heading hierarchy.
4. Card radius, borders, shadows and internal spacing.
5. Control height and label spacing.
6. State/validation treatment.
7. Result-card hierarchy.
8. Chart typography and geometry.
9. Disclosure behavior.
10. Table treatment.
11. Copy/CSV/PDF action buttons.
12. Mobile button behavior.
13. Footer/related tools.
14. Report typography and spacing.
15. Accessibility-critical states.

Do not invent a visually separate “gold brand” inside Carrowmont.

Gold-themed imagery or restrained accents may be used only if they remain subordinate to the established Carrowmont design language and do not impair accessibility.

---

# 43. Internal-link architecture

SEO3D should strengthen the existing gold cluster rather than sit as an isolated tool.

Recommended inbound/outbound contextual links include:

- `gold-and-inflation.html` ↔ SEO3D;
- `gold-as-an-investment.html` ↔ SEO3D;
- `gold-vs-stocks.html` ↔ SEO3D where macro diversification context is relevant;
- `physical-gold-vs-gold-etf.html` → SEO3D for macro-context exploration;
- SEO3C → SEO3D from appropriate fiscal-stress educational copy;
- SEO3D → SEO3C from Fiscal Stress explanation;
- inflation-related Carrowmont content → SEO3D where gold is discussed;
- SEO3D → relevant core planning tools only where the link is genuinely useful.

Anchor text should be descriptive and natural, not keyword-stuffed.

---

# 44. Sitemap and IndexNow

On release:

- add canonical URL to sitemap according to current Carrowmont sitemap conventions;
- ensure `lastmod` reflects actual publication/change rules;
- allow established IndexNow workflow to submit the new asset;
- do not alter stable IndexNow architecture merely for SEO3D;
- preserve BING-SEO1/BING-SEO2 guardrails.

---

# 45. Release workflow

SEO3D follows the protected Carrowmont release discipline.

```text
Approved SEO3D specification committed to /docs
        ↓
Fresh Source Snapshot
        ↓
Build smallest approved SEO3D implementation from that snapshot
        ↓
Static/hash/syntax/source-contract checks
        ↓
Deterministic fixture tests
        ↓
Staged browser/mobile/export/PDF QA
        ↓
Carrowmont Visual Consistency Gate
        ↓
Batch PR Publisher GREEN
        ↓
Merge main-site PR
        ↓
Merge carrowmont-qa PR last
        ↓
Pages deployment / IndexNow as applicable
        ↓
Live Automated QA GREEN
        ↓
Multi-Repo Guard GREEN
        ↓
Fresh Source Snapshot
```

Because SEO3D introduces a new file under `.github/workflows/`, the Release Automation token may require **temporary Workflows: Read and write** permission for the Publisher run that creates the main-site PR.

Security rule:

> Enable workflow-write permission only immediately before that Publisher run, confirm the PRs are created successfully, then revoke the Workflow permission again before merging release PRs.

Do not leave elevated Workflow permission enabled permanently merely for future convenience.

For SEO3D, workflow-write permission is **known in advance to be required** because the release introduces `.github/workflows/update-gold-macro-reference.yml`. The release handoff must therefore tell the owner to enable temporary `Workflows: Read and write` **before the first Publisher attempt**, not after a failure.

Separately, Publisher preflight should be hardened when practical to detect workflow-file changes and surface a permission-specific failure before expensive staged QA.

---

# 46. Post-release data-maintenance flow

Weekly automated source maintenance follows a smaller path:

```text
Scheduled Update Gold Macro Reference workflow
        ↓
Fetch Treasury + Fed + BLS + GPR + OFR data
        ↓
Validate all required automated sources
        ↓
Calculate reference metrics + states
        ↓
No valid material change? → stop
        ↓
Valid change? → create data-only PR
        ↓
Owner reviews old/new values, dates and states
        ↓
Merge PR
        ↓
Normal Pages deployment + applicable data/QA checks
```

Quarterly central-bank-demand updates and fiscal-baseline updates remain reviewed maintenance events.

A failed data update must never break the public explorer.

---

# 47. Out of scope for SEO3D V1

Do not include in V1:

- gold price target;
- expected gold return;
- automated buy/sell/hold recommendation;
- personalized portfolio allocation;
- live brokerage data;
- futures positioning / COT model;
- ETF-flow model;
- mining-supply model;
- jewellery-demand model;
- technical-analysis indicators;
- options-implied probabilities;
- machine-learning price forecast;
- AI-generated investment advice;
- automatic INR gold-price forecast;
- account/login requirement;
- paid feature gate;
- automatic trading alerts.

These exclusions keep SEO3D focused on its educational macro-force purpose.

---

# 48. Future enhancements — not part of V1

Potential later additions, subject to separate specification:

- optional ETF-flow driver;
- futures-positioning context;
- mine supply / recycling context;
- regional gold-demand context;
- historical “how would this framework have classified past regimes?” explorer;
- saved scenarios after optional accounts exist;
- cross-tool macro dashboard connecting SEO3C/SEO3D/SEO3E;
- India-specific gold-price transmission module using USD/INR, duties and local premiums;
- Advanced/AI narrative explanations grounded strictly in deterministic Carrowmont outputs.

Historical backtesting must be designed carefully to avoid hindsight bias and must not be marketed as proof of predictive performance.

---

# 49. Definition of done

SEO3D is complete only when:

- this specification is approved and committed;
- a fresh post-spec Source Snapshot is taken;
- implementation starts from that fresh snapshot;
- six-driver deterministic model is implemented exactly;
- reference data are dated and sourced;
- weekly automated reference updater is failure-safe;
- central-bank/fiscal reviewed fields cannot be silently overwritten;
- reference/custom scenario distinction is clear;
- environment labels never become price predictions;
- force-map chart meets Carrowmont chart standard;
- 360 px and 390 px layouts pass;
- Copy Summary / CSV / PDF consume the same scenario result;
- actual PDF is generated and visually inspected page by page;
- canonical metadata, sitemap, IndexNow and contextual links are present;
- privacy and RUM-isolation regression tests pass;
- Publisher is GREEN;
- release PRs merge in dependency order with central QA last;
- Pages deployment is GREEN;
- live Automated QA is GREEN;
- Multi-Repo Guard is GREEN;
- a fresh Source Snapshot becomes the next authoritative baseline.

---

# 50. Final product principle

SEO3D should teach one idea exceptionally well:

> **Gold is not driven by one headline. Real yields, the dollar, inflation, official-sector demand, fiscal conditions and stress can push in different directions at the same time.**

The explorer should make those competing forces visible and understandable without pretending to know the next gold-price move.

Operationally, Carrowmont should do the data-maintenance work for the visitor: preload a dated validated macro snapshot, maintain automated sources through protected weekly updates, preserve reviewed quarterly/fiscal inputs, and continue serving the last verified snapshot whenever an external source cannot be safely validated.

---

**End of FINAL specification — SEO3D Gold Under Macro Stress Explorer**
