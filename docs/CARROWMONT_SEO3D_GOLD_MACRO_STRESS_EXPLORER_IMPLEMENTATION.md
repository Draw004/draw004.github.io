# Carrowmont SEO3D — Gold Under Macro Stress Explorer Implementation

**Implementation baseline:** Carrowmont Source Snapshot generated **10 October 2026 at 08:37:15 UTC**, after approval and merge of `CARROWMONT_SEO3D_GOLD_MACRO_STRESS_EXPLORER_SPEC_FINAL.md`.

Baseline commits:

- `draw004.github.io`: `a0e41cf3a753c1da6b0bff886cdf84639cada8a3`
- `carrowmont-qa`: `45dfca832c227a4ed8c0d4d10f3e63e972721abf`
- `sip-calculator`: `9309d6b6150c6f09e410b7f0b3c79a456c4c3f42`
- `goal-planner`: `bc61b12b5e1632d99892a9d72d4f11cf147afa57`
- `financial-independence`: `3b0c69be1629ae1f1cfa940d71ab6f192a395d60`
- `inflation-calculator`: `885fb1a09946632dccee1d4f2cb9a3bb686282b5`
- `retirement-calculator`: `3385406f104940f20ff4a7c3769ba34baccca93e`
- `budget-cash-flow-planner`: `b657d819c401bf7d3beeeb797ca706c3d5ac2e55`

## Scope

SEO3D adds a public, free, no-login educational macro tool at `/gold-macro-stress-explorer.html`. It does **not** forecast the gold price, generate a buy/sell signal, estimate an investment return or recommend an allocation.

The tool teaches one idea: gold can face supportive and adverse macro forces at the same time. It models six deterministic drivers:

1. Real yields
2. U.S. dollar strength
3. Inflation pressure
4. Central-bank gold demand
5. Fiscal stress
6. Geopolitical / financial-system stress

No existing SIP, Goal, Inflation, Retirement, Financial Independence, Budget, SEO3A, SEO3B or SEO3C calculation engine is modified.

## User experience

The browser loads a bundled, dated **Carrowmont Gold Macro Reference Snapshot**. The visitor can immediately see the reference classification, or change one or more qualitative driver states and explore a custom what-if scenario.

The public path provides:

- preloaded reference conditions;
- six simple scenario controls;
- scenario shortcuts;
- Reset to Reference Snapshot;
- qualitative overall environment label;
- supportive/headwind/mixed counts;
- explicit conflict flag;
- strongest supportive forces and strongest headwinds;
- deterministic explanation;
- diverging Gold Macro Force Map;
- Reference vs Scenario comparison;
- collapsed Reference Data & Sources detail;
- Copy Summary;
- Download CSV;
- four-page Gold Macro Report.

The required adjacent disclaimer is: **“This describes a macro environment, not a gold-price forecast or investment recommendation.”**

## Deterministic engine

`gold-macro-stress-explorer-core.js` is a pure module with no DOM, network or browser-state dependency.

Driver states use internal scores from `-2` to `+2`:

- `-2` strong headwind
- `-1` headwind
- `0` mixed
- `+1` support
- `+2` strong support

Weights are fixed:

- Real yields: `1.5`
- U.S. dollar: `1.5`
- Inflation: `1.0`
- Central-bank demand: `1.0`
- Fiscal stress: `1.0`
- Geopolitical / financial stress: `1.0`

The maximum weighted absolute score is `14`. The normalized score is `weightedSum / 14`.

Overall labels are exact:

- `<= -0.60`: **Strong macro headwinds**
- `> -0.60 and < -0.15`: **Macro headwinds**
- `>= -0.15 and <= +0.15`: **Mixed macro environment**
- `> +0.15 and < +0.60`: **Supportive macro environment**
- `>= +0.60`: **Strongly supportive macro environment**

The score is used only to select a qualitative macro-environment label. It is not displayed as a return, probability or price target.

## Driver classification rules

### Real yields

Reference metric: 10-year Treasury real yield, five-business-day average; five-year percentile; 13-week change in percentage points.

Lower percentiles are supportive. A 13-week move of `<= -0.50 pp` adds one score point; a move of `>= +0.50 pp` subtracts one point; output is clamped to `[-2,+2]`.

### U.S. dollar

Reference metric: Broad U.S. Dollar Index, five-business-day average; five-year percentile; 13-week percent change.

Lower percentiles are supportive. A 13-week move of `<= -3%` adds one score point; a move of `>= +3%` subtracts one point; output is clamped to `[-2,+2]`.

### Inflation

Reference metric: CPI-U 12-month inflation rate; five-year percentile; approximately three-month change in the YoY inflation rate.

Higher percentiles are supportive in this macro framework. A rise of `>= +0.50 pp` adds one point; a fall of `<= -0.50 pp` subtracts one point; output is clamped to `[-2,+2]`.

### Central-bank demand

V1 uses a disclosed **reviewed threshold table**, rather than bulk-republishing a long specialist-source history:

- `< 0 tonnes`: `-2`
- `0 to <400 tonnes`: `-1`
- `400 to <700 tonnes`: `0`
- `700 to <1000 tonnes`: `+1`
- `>=1000 tonnes`: `+2`

The metric is trailing four-quarter central-bank net demand. It remains human-reviewed because specialist estimates can be revised materially and because Carrowmont does not need to republish a full licensed/specialist data history to provide this educational classification.

### Fiscal stress

Fiscal stress is a reviewed CBO/Treasury context score restricted to `-1, 0, +1, +2` in V1. The tool does not translate fiscal stress into a default probability or currency-collapse claim.

### Geopolitical / financial-system stress

The GPR and OFR FSI components are converted independently from five-year percentiles:

- `<=30`: `-1`
- `>30 and <70`: `0`
- `>=70 and <90`: `+1`
- `>=90`: `+2`

Combined stress is:

- `+2` if either component is `+2`;
- otherwise `+1` if either is `+1`;
- otherwise `-1` only if both are `-1`;
- otherwise `0`.

V1 does not use a `-2` combined stress state.

## Bundled release-time reference snapshot

The browser reads only `data/gold-macro-reference.json`. It makes no visitor-side request to Treasury, the Federal Reserve, BLS, the GPR source, OFR, CBO or the World Gold Council.

The initial release snapshot contains dated reference inputs for:

- U.S. Treasury 10-year real yield;
- Federal Reserve H.10 Broad Dollar Index;
- BLS CPI-U;
- reviewed World Gold Council central-bank demand context;
- reviewed CBO fiscal context;
- Caldara-Iacoviello GPR;
- OFR Financial Stress Index.

Percentiles and rolling-state metrics are Carrowmont calculations from the underlying histories; they are not represented as official source classifications.

## Weekly reference updater

`.github/workflows/update-gold-macro-reference.yml` runs weekly and also supports `workflow_dispatch`.

`scripts/update-gold-macro-reference.mjs` retrieves automated inputs from:

- U.S. Treasury official Daily Treasury Par Real Yield Curve XML;
- Federal Reserve H.10 Broad Dollar series as distributed through the FRED CSV endpoint for deterministic machine retrieval;
- BLS CPI-U bulk series;
- the official Caldara-Iacoviello recent daily GPR workbook;
- OFR Financial Stress Index CSV.

For OFR, the updater sends a Carrowmont-identifying User-Agent and accepts both the current `ofr-fsi.csv` path and the same official site's `fsi.csv` filename as a fallback. The parser accepts ISO and U.S.-style source dates, but still rejects unrecognized headers or unusable rows. This is source-availability hardening only; both paths must resolve to OFR and the same validation/classification logic applies.

The browser never calls these endpoints.

The updater is deliberately **all-or-nothing**. All five automated source groups must be fetched and validated before a new reference file can be proposed. If any source fails, is malformed, moves backwards in date, lacks sufficient history, or triggers an anomaly guard, the existing production reference file remains unchanged.

Central-bank demand and fiscal stress are explicitly preserved by the weekly updater. They can change only through deliberate reviewed maintenance.

If validated automated data produce a material change, the workflow creates a small branch and a data-only pull request. It does not merge directly into `main`.

## Source and updater safeguards

Validation includes:

- finite numeric values;
- parseable dates;
- minimum historical observation counts;
- no backwards source dates;
- five-year history for percentile-based daily/weekly inputs;
- enough CPI history for YoY and recent-trend calculation;
- anomaly guards against implausibly large week-to-week/reference changes;
- preservation checks for reviewed central-bank and fiscal sections;
- exact data-only staged diff before automated PR creation.

Updater fixture QA covers:

- valid newer data;
- identical/no-change rerun;
- malformed/missing source input;
- simulated partial-source failure;
- anomaly rejection;
- preservation of reviewed fields.

## Reports and exports

The web result object is the common source for Copy Summary, CSV and PDF output.

The PDF is a four-page no-login report:

1. Gold Macro Snapshot
2. Competing Forces
3. Reference Data, Methodology & Sources
4. Continue Planning with Carrowmont

The PDF chart clones the current web force-map SVG with computed styles inlined before rasterization. This prevents the black-text/unstyled-clone defect previously caught during SEO3C report QA.

## Visual and accessibility contract

The force map uses the canonical Carrowmont chart standards:

- Inter/system font stack;
- `13px` chart text;
- weight `700` or greater;
- text fill `#385b78`;
- grid `#dce7ec`;
- no SVG text stroke/outline;
- permanent labels, not hover-only labels;
- plot-bounded geometry;
- accessible table/text equivalent.

Desktop plus `390px` and `360px` widths must have no page-level horizontal overflow or clipped action controls.

The Reference Data & Sources disclosure is collapsed by default and its real user-open sequence is exercised in QA.

## Privacy and analytics QA

- No login is required.
- No personal financial/account data is required.
- No external AI service is used.
- No client API secret is present.
- Scenario changes stay in the browser for V1.
- Automated QA continues to intercept Cloudflare RUM ingestion so QA sessions do not pollute production analytics.
- Live-style privacy QA permits only the exact intentionally intercepted Cloudflare RUM route while rejecting unexpected third-party application/API traffic.

## Discoverability

SEO3D is linked from the Learn hub, the existing gold-learning cluster and SEO3C's global-context section. Its canonical route is included in the main sitemap with the release last-modified date.

## Release scope

Expected production repositories changed by this release:

1. `draw004.github.io`
2. `carrowmont-qa`

Expected generated release PR count: **2**.

No calculator repository outside the main site and central QA is modified.

## Known Publisher permission preflight

This release adds `.github/workflows/update-gold-macro-reference.yml`. Therefore the fine-grained Carrowmont Release Automation token requires temporary **Workflows: Read and write** permission for the Publisher run that pushes the main-site release branch.

Operational rule:

1. Enable Workflows Read/write immediately before the Publisher run.
2. Save the token permission.
3. Run Publisher and confirm the generated PRs are created successfully.
4. Revoke Workflows permission again **before merging** the release PRs.

The permission must not be left enabled permanently.

## Release-candidate red-prevention gate

The production ZIP is not ready for user handoff until the exact final payload has passed:

- archive integrity and exact manifest verification;
- Snapshot-34 base-hash validation;
- syntax checks;
- independent deterministic fixtures;
- updater fixtures;
- source-contract checks;
- staged browser QA;
- real disclosure/preset/reset flows;
- desktop, 390px and 360px overflow checks;
- live-style third-party/RUM privacy check;
- Copy/CSV/PDF parity;
- actual four-page PDF generation and rendered-page visual review;
- visual screenshot review;
- Publisher-layout simulation;
- Multi-Repo Guard-layout simulation with QA outside `SOURCE_ROOT`;
- expected PR/repository-count verification.

No release file may be changed after that final validation without rerunning the affected gate.
