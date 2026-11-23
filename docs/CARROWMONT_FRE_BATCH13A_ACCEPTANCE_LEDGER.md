# Carrowmont FRE Batch 13A - acceptance ledger

| Requirement | Acceptance rule |
|---|---|
| Production feature remains off | `CarrowmontConnectedDataConfig.enabled === false`, sandbox-only mode, no live providers |
| Sandbox-only source | Only `carrowmont-sandbox` adapter exists in Batch 13A |
| No credentials | Core rejects credential-like keys and normalized/session state contains no token/password/secret fields |
| Granular consent | Balance and monthly cash-flow scopes are independently selectable |
| No raw transactions | Normalized sandbox snapshot contains summaries only |
| Explicit apply | Applying a connected value without `explicit:true` throws; `Use this value` is the only UI apply action |
| Provenance | Applied fact origin is `connected-reviewed` and source identifies the reviewed sandbox source |
| No silent overwrite | Current vs connected values are shown side-by-side before apply |
| Session minimization | Sandbox connection state uses `sessionStorage`, not local/cloud storage |
| Disconnect semantics | Disconnect removes sandbox session state; explicitly saved My Carrowmont facts are not silently deleted |
| Freshness | Current/stale/expired/disconnected states are deterministic |
| Guest/manual first | Existing tools/account save behavior is unchanged and My Carrowmont works with feature flag off |
| Ask boundary | No connected snapshot/raw data is routed into Ask Carrowmont |
| No new indexed URL | Existing public sitemap/Search counts remain unchanged |
| Mobile UX | Sandbox preview has no horizontal overflow at 390px |
| Desktop UX | Consent, review and disconnect flow remains usable at desktop viewport |
| Privacy copy | UI states that no real bank is contacted and no bank credentials are requested/stored |
| Release discipline | Main + QA PRs only; Publisher/browser QA + Guard + fresh snapshot required before deployment claim |

- PASS required: saved profile currency wins over device locale for the sandbox; cross-currency review items fail closed and cannot be applied without an explicit future conversion/reconciliation design.
