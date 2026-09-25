# Carrowmont GitHub Automation & QA Handover

**Project:** Carrowmont  
**GitHub owner:** `Draw004`  
**Last updated:** 26 September 2026  
**Primary controller repository:** `Draw004/draw004.github.io`  
**Primary QA repository:** `Draw004/carrowmont-qa`

---

## 0. How to use this handover in a new ChatGPT conversation

Upload this file at the start of a new conversation and say:

> Treat this as the current Carrowmont GitHub automation and QA source of truth. Before suggesting or changing anything, summarize the active repositories, the current workflow architecture, the distinction between CREATE_PRS and RELEASE, the current duplicate Batch PR Publisher cleanup item, and the standard release procedure. Preserve the rule that automation creates review PRs and never auto-merges normal product changes to main.

Important operating rule:

```text
Fresh Source Snapshot
    -> prepare reviewed release bundle
    -> Batch PR Publisher
    -> staged QA
    -> review PRs
    -> human merge
    -> Automated QA
    -> Multi-Repo Guard
    -> fresh Source Snapshot
```

Do not replace this process with manual per-repository uploads unless there is a specific reason and the consequences are understood.

---

## 1. Purpose of this document

This document explains the GitHub automation and QA system used by Carrowmont so a future developer or a new ChatGPT conversation can continue the project without rebuilding the architecture from memory.

It records:

- all Carrowmont repositories involved in automation;
- where central automation lives;
- the credential model and secret names;
- every important GitHub Actions workflow;
- the safe multi-repository publishing process;
- the difference between `CREATE_PRS` and `RELEASE`;
- the source snapshot and staged QA process;
- the post-merge QA process;
- the known duplicate Batch PR Publisher cleanup item;
- common failure scenarios and what to check first;
- how to onboard a new Carrowmont repository; and
- current verified status as of 26 September 2026.

**Security rule:** never place the actual PAT or release-token value in this file, source code, screenshots, issues, PR comments, workflow logs, or chat messages.

---

## 2. Repository map

Carrowmont currently uses these repositories:

| Repository | Role |
|---|---|
| `Draw004/draw004.github.io` | Main Carrowmont website, documentation, GitHub Pages source, and central automation controller |
| `Draw004/sip-calculator` | SIP Calculator in India / Recurring Investment Calculator internationally |
| `Draw004/goal-planner` | Goal Planner |
| `Draw004/financial-independence` | Financial Independence tool |
| `Draw004/inflation-calculator` | Inflation Calculator |
| `Draw004/retirement-calculator` | Retirement Planner / Calculator |
| `Draw004/carrowmont-qa` | Shared source-contract, browser, report, PDF, link, and regression QA |

### Naming warning

The retirement repository is:

```text
Draw004/retirement-calculator
```

A historical setup error used `Draw004/retirement-planner`, which produced a `404`. Do not reintroduce that old repository name into workflows.

---

## 3. High-level architecture

Carrowmont deliberately separates source control, QA, publishing, and formal GitHub releases.

```text
                         +--------------------------+
                         | Draw004/draw004.github.io |
                         | Central controller        |
                         +------------+-------------+
                                      |
                   +------------------+-------------------+
                   |                  |                   |
                   v                  v                   v
            Source Snapshot     Batch PR Publisher   Multi-Repo Guard
                   |                  |                   |
                   |                  |                   |
                   +----------+-------+-------------------+
                              |
                              v
                    Five calculator repos
                              |
                              v
                       Draw004/carrowmont-qa
                              |
                 +------------+-------------+
                 |                          |
                 v                          v
          Automated QA                GitHub Release
       live-site validation        tags/releases only
```

Core release policy:

```text
automation prepares
    -> QA verifies
    -> automation opens PRs
    -> human reviews
    -> human merges
    -> live QA verifies
```

Normal product-code automation must not directly merge to `main`.

---

## 4. Credentials and GitHub Actions secrets

### 4.1 `CARROWMONT_REPO_TOKEN`

The central cross-repository automation credential is a fine-grained PAT named:

```text
Carrowmont Release Automation
```

It is stored as a GitHub Actions repository secret in:

```text
Draw004/draw004.github.io
```

GitHub UI path:

```text
Settings -> Secrets and variables -> Actions -> Repository secrets
```

Secret name:

```text
CARROWMONT_REPO_TOKEN
```

Relevant permissions used by the automation architecture include:

| Permission | Access |
|---|---|
| Contents | Read and write |
| Pull requests | Read and write |
| Metadata | Read-only |

The current corrected Batch PR Publisher is written to preflight and clone the complete Carrowmont baseline, including `carrowmont-qa`. The latest project handover states that the PAT was expanded to cover the main site, all five calculator repositories, and `carrowmont-qa`. When auditing or troubleshooting, verify the actual token scope in GitHub rather than relying only on documentation.

Never:

- hard-code the token in YAML, JavaScript, HTML, or shell scripts;
- print the token in logs;
- paste the token into chat;
- place the token in an issue or pull request;
- expose it in frontend code; or
- share it in a screenshot.

If the token is regenerated, update the secret value in GitHub. The workflow source should continue referencing the secret name rather than the raw value.

### 4.2 `CARROWMONT_RELEASE_TOKEN`

The `Carrowmont Release` workflow in `Draw004/carrowmont-qa` uses a separate secret:

```text
CARROWMONT_RELEASE_TOKEN
```

This token is used for creating GitHub tags/releases in target repositories. It is separate from the Batch PR Publisher confirmation process and should not be confused with `CARROWMONT_REPO_TOKEN`.

Do not assume both tokens have identical repository scope or permissions. Audit the actual GitHub secret/token settings when troubleshooting release access.

---

## 5. Controller workflows in `Draw004/draw004.github.io`

The controller repository currently exposes these important workflows in GitHub Actions:

1. Carrowmont Batch PR Publisher
2. Carrowmont Multi-Repo Dry Run
3. Carrowmont Multi-Repo Guard
4. Carrowmont Repository Access Check
5. Carrowmont Source Snapshot
6. GitHub Pages deployment (`pages-build-deployment`)

The next sections explain each workflow.

---

## 6. Carrowmont Batch PR Publisher

### Purpose

This is the controlled multi-repository product-change publisher.

It is the workflow to use when one reviewed release bundle contains changes for one or more Carrowmont repositories and the goal is to create review PRs with staged QA before anything is merged.

### Confirmation word

The required confirmation is:

```text
CREATE_PRS
```

It is deliberately not `RELEASE`.

The workflow never auto-merges the normal product changes it publishes.

### Inputs

The workflow accepts:

- a release ZIP path on the selected controller branch; and
- a confirmation field that must equal `CREATE_PRS`.

### What the corrected publisher does

The corrected publisher follows this sequence:

1. Checks out the selected controller branch.
2. Sets up Node.js.
3. Confirms the user entered `CREATE_PRS`.
4. Validates the release ZIP path.
5. Unpacks the release ZIP.
6. Requires `release-manifest.json` with schema version 1 and at least one target repository.
7. Authenticates with `CARROWMONT_REPO_TOKEN`.
8. Validates all manifest repository names against the Carrowmont allow-list.
9. Clones the complete Carrowmont QA baseline, not only the changed repositories.
10. Verifies every reviewed base-file hash.
11. Verifies every new-file hash from the release bundle.
12. Refuses to continue if a live base file has changed since the reviewed snapshot.
13. Applies the reviewed files into the staged repository tree.
14. Syntax-checks changed `.js` and `.mjs` files with Node.
15. Runs the shared Carrowmont source contract against the staged multi-repository tree.
16. Builds a combined local staged website.
17. Runs staged Chrome browser and PDF QA.
18. Verifies that no file outside the manifest allow-list changed.
19. Creates a feature branch for each repository with actual changes.
20. Commits the approved files.
21. Pushes the feature branch.
22. Opens a pull request to `main`.
23. Uploads publisher validation and staged-QA evidence as a GitHub Actions artifact.
24. Stops before merge.

### Branch naming

The publisher generates branches in the general form:

```text
carrowmont/<release_id>-<github_run_id>
```

### Why base hashes matter

Each changed file in the release manifest contains a reviewed base SHA-256 hash and a new SHA-256 hash.

If the current repository file no longer matches the reviewed base hash, the publisher stops with the equivalent of:

```text
Base file changed since the reviewed snapshot.
Nothing will be published.
Create a fresh source snapshot and rebuild the release bundle.
```

This is an important anti-overwrite safeguard. It prevents an older release ZIP from silently replacing newer work.

### Partial release bundles

The corrected publisher supports bundles that change only a subset of Carrowmont repositories while still cloning the complete baseline for staged source-contract, browser, link, chart, and PDF QA.

This is important. A two-repository change can still be tested in the context of the full site and all five tools before PRs are created.

### Expected result

Healthy publisher run:

```text
release bundle validated
    -> base hashes verified
    -> staged source contract green
    -> staged browser/PDF QA green
    -> only allow-listed files changed
    -> one review PR per changed repository
    -> no automatic merge
```

---

## 7. Release bundle contract

The Batch PR Publisher expects a ZIP containing:

```text
release-manifest.json
<repository-name>/<file path>
<repository-name>/<file path>
...
```

A repository manifest entry should contain the information needed by the publisher, including:

- repository name;
- PR title;
- commit message;
- file path;
- reviewed base SHA-256 hash, or null for a genuinely new file;
- new SHA-256 hash.

The manifest also supplies release-level information such as:

- `release_id`;
- `release_name`;
- `summary`.

Conceptual example only:

```json
{
  "schema_version": 1,
  "release_id": "example-change",
  "release_name": "Example Carrowmont Change",
  "summary": "Example summary",
  "repositories": [
    {
      "name": "goal-planner",
      "pr_title": "Example PR title",
      "commit_message": "Example commit message",
      "files": [
        {
          "path": "app.js",
          "base_sha256": "<reviewed-old-hash>",
          "new_sha256": "<reviewed-new-hash>"
        }
      ]
    }
  ]
}
```

Do not manually edit hashes to force a stale bundle through. If hashes no longer match, create a fresh snapshot and rebuild the bundle.

---

## 8. Important current cleanup item: duplicate Batch PR Publisher

As of 26 September 2026, the controller repository contains two workflow files that both display the same Actions workflow name:

```text
.github/workflows/carrowmont-batch-pr-publisher.yml
.github/workflows/carrowmont-batch-pr-publisher (1).yml
```

The `(1)` file is the corrected/improved version created after Windows renamed the downloaded workflow. It clones the complete QA baseline for partial release bundles.

The older canonical file clones only repositories listed in the manifest and is therefore not the version to preserve long term.

### Until cleanup is completed

When selecting **Carrowmont Batch PR Publisher** in GitHub Actions, verify the filename shown under the workflow title.

The corrected file is:

```text
carrowmont-batch-pr-publisher (1).yml
```

### Desired cleanup

The long-term desired state is one canonical workflow only:

```text
.github/workflows/carrowmont-batch-pr-publisher.yml
```

with the corrected `(1)` implementation moved into that canonical filename, followed by removal of the duplicate `(1)` file.

Do this as a separate reviewed housekeeping change. Do not casually delete or overwrite workflows while another product release is in progress.

---

## 9. Carrowmont Source Snapshot

Workflow:

```text
.github/workflows/carrowmont-source-snapshot.yml
```

### Purpose

Create a read-only artifact containing the current source state of:

- main Carrowmont site;
- SIP / Recurring Investment Calculator;
- Goal Planner;
- Financial Independence;
- Inflation Calculator;
- Retirement Calculator; and
- Carrowmont QA.

It also records the exact commit hash of every repository in:

```text
SNAPSHOT-MANIFEST.txt
```

### Artifact

Artifact name:

```text
carrowmont-source-snapshot
```

Current retention:

```text
7 days
```

### When to run it

Run Source Snapshot:

- before preparing a meaningful multi-repository change;
- after a completed release and final verification;
- when handing the project into a new development session;
- before rebuilding a release bundle after a base-hash mismatch.

### Why it matters

The snapshot gives a precise baseline for future work and prevents a new chat or developer from relying on stale local copies.

---

## 10. Carrowmont Multi-Repo Dry Run

Workflow:

```text
.github/workflows/carrowmont-multi-repo-dry-run.yml
```

### Purpose

Read-only, manual ecosystem source-contract QA across all five calculator repositories.

It:

1. checks out the five tool repositories;
2. obtains `carrowmont-qa`;
3. runs `scripts/source-contract.mjs` against the five-tool tree;
4. writes the result to the Actions summary; and
5. uploads an artifact.

It does not intentionally create branches, PRs, commits, or product-code changes.

### Expected healthy result

```text
green workflow
Artifacts: 1
no source repositories modified
```

Artifact retention is approximately 30 days.

Use this when an explicit manual read-only source-contract check is useful before or after a cross-tool change.

---

## 11. Carrowmont Multi-Repo Guard

Workflow:

```text
.github/workflows/carrowmont-multi-repo-guard.yml
```

### Purpose

Recurring protection against cross-tool source-contract drift.

Manual trigger is available through GitHub Actions.

Scheduled trigger:

```yaml
cron: "0 3 * * *"
```

This corresponds to:

```text
03:00 UTC daily
08:30 India Standard Time daily
```

### What it checks

The Guard:

1. checks out the five calculator repositories;
2. clones Carrowmont QA;
3. records the latest repository commits;
4. runs the source-contract checker;
5. writes results to the Actions summary;
6. uploads a report artifact;
7. opens or updates a failure issue if the contract fails;
8. closes the old failure issue when the contract becomes healthy again; and
9. returns the final pass/fail result.

Artifact name:

```text
carrowmont-multi-repo-guard-results
```

Retention:

```text
30 days
```

Expected failure issue title:

```text
Carrowmont multi-repo source contract failure
```

### Verification status

Healthy-path operation has been verified multiple times, including a green run in the 26 September 2026 session.

The automatic failure-issue and recovery-close behavior was configured, but the original setup did not intentionally introduce a known production failure solely to test those paths.

---

## 12. Carrowmont Repository Access Check

Workflow:

```text
.github/workflows/carrowmont-repo-access-check.yml
```

### Purpose

Credential and repository-access diagnostic.

Use it when:

- a PAT is changed or regenerated;
- a repository is renamed;
- a repository is added or removed;
- a cross-repository workflow produces `403` or `404` errors;
- checkout authentication suddenly fails; or
- the Batch PR Publisher cannot reach a repository.

Historical access-check scope included:

- `Draw004/draw004.github.io`;
- `Draw004/sip-calculator`;
- `Draw004/goal-planner`;
- `Draw004/financial-independence`;
- `Draw004/inflation-calculator`;
- `Draw004/retirement-calculator`.

If the central token scope is expanded to include another production repository, update the access checker so the new repository is not a blind spot.

---

## 13. GitHub Pages deployment

GitHub Pages deployment is intentionally separate from the QA/Guard architecture.

Conceptually:

```text
QA and Guard workflows
    -> validate and monitor software

GitHub Pages deployment
    -> publish merged software
```

Do not change Pages deployment configuration merely to fix a QA problem unless deployment itself is demonstrably the cause.

---

## 14. QA workflows in `Draw004/carrowmont-qa`

The QA repository currently contains these important Actions workflows:

1. Carrowmont Automated QA
2. Carrowmont Release

They serve different purposes.

---

## 15. Carrowmont Automated QA

Workflow:

```text
.github/workflows/carrowmont-qa.yml
```

### Purpose

Live-site browser/regression QA against:

```text
https://carrowmont.com
```

It runs manually and on a schedule.

Scheduled trigger:

```text
02:30 UTC daily
```

### What it does

The workflow:

1. checks out `carrowmont-qa`;
2. sets up Node.js 22;
3. installs dependencies;
4. installs Playwright Chromium;
5. runs `npm run qa` against the live Carrowmont site; and
6. uploads QA reports, screenshots, and test artifacts.

Artifact name:

```text
carrowmont-qa-results
```

Retention:

```text
30 days
```

A healthy run showing:

```text
Success
Artifacts: 1
```

is expected.

### Current session status

In the 26 September 2026 session, Carrowmont Automated QA was reported green with one artifact after the country/currency update work.

---

## 16. Carrowmont Release

Workflow:

```text
Draw004/carrowmont-qa/.github/workflows/carrowmont-release.yml
```

### Purpose

Create formal GitHub tag/release records in one or more target repositories after the latest Carrowmont Automated QA has passed.

This is not the workflow for distributing source-code changes across the five tools.

### Confirmation word

The required confirmation is:

```text
RELEASE
```

### Main inputs

The workflow asks for:

- semantic version, for example `v1.2.0`;
- comma-separated target repositories;
- optional release title;
- optional release notes;
- pre-release checkbox; and
- confirmation `RELEASE`.

### QA gate

Before creating a GitHub release, it verifies that the latest `Carrowmont Automated QA` run is completed successfully. If the latest QA did not pass, the release stops.

### Credential

It uses:

```text
CARROWMONT_RELEASE_TOKEN
```

for target-repository release operations.

### Important distinction

Do not confuse the two confirmation words:

| Workflow | Purpose | Confirmation |
|---|---|---|
| Carrowmont Batch PR Publisher | Validate a release bundle and create review PRs for product changes | `CREATE_PRS` |
| Carrowmont Release | Create formal GitHub tag/release records after QA | `RELEASE` |

Entering `CREATE_PRS` into Carrowmont Release will fail by design.

Entering `RELEASE` into Batch PR Publisher will fail by design.

---

## 17. Source of truth for shared QA contracts

Shared QA logic primarily belongs in:

```text
Draw004/carrowmont-qa
```

Important source-contract checker:

```text
scripts/source-contract.mjs
```

Update the shared QA contract whenever a cross-tool Carrowmont standard changes, including standards for:

- shared wording;
- country/currency behavior;
- localization;
- report generation;
- PDF/report behavior;
- report-page structure;
- button capitalization;
- `Copy Summary` conventions;
- methodology links;
- cross-tool references;
- chart standards;
- investment-product naming; and
- other shared UI or behavior contracts.

The purpose is to prevent the five calculators from drifting into inconsistent implementations.

---

## 18. Standard operating procedure for a normal multi-repository product change

This is the preferred process going forward.

### Phase A - Establish the baseline

1. Go to `Draw004/draw004.github.io -> Actions`.
2. Run **Carrowmont Source Snapshot** on `main`.
3. Wait for green.
4. Download or otherwise preserve the snapshot artifact when it is needed for implementation/review.
5. Treat the snapshot commit hashes as the baseline for the release bundle.

### Phase B - Prepare the change

1. Determine which repositories actually require changes.
2. Modify only the approved files.
3. Preserve approved calculation formulas unless a calculation change is explicitly part of the release.
4. Update `carrowmont-qa` when the shared contract itself changes.
5. Create a release ZIP with `release-manifest.json` and the changed files.
6. Record correct reviewed base and new SHA-256 hashes.

### Phase C - Publish review PRs

1. Upload the release ZIP to the selected branch in `Draw004/draw004.github.io`.
2. Open **Carrowmont Batch PR Publisher**.
3. Until duplicate-workflow cleanup is complete, verify the selected workflow file is the corrected `(1).yml` version.
4. Set the bundle path to the uploaded ZIP.
5. Type:

```text
CREATE_PRS
```

6. Run the workflow.
7. The publisher must complete staged QA before creating PRs.
8. If staged QA fails, fix the source or QA issue and rebuild from a fresh baseline if needed.
9. If base hashes fail, create a fresh Source Snapshot and rebuild the release bundle.

### Phase D - Review and merge

1. Open each generated PR.
2. Review the files and diff.
3. Confirm only expected repositories/files changed.
4. Confirm the PR reflects the approved product change.
5. Merge manually.
6. Never enable a generic direct auto-merge to `main` merely to save clicks.

### Phase E - Post-merge validation

1. Allow GitHub Pages/tool deployment to complete.
2. Run **Carrowmont Automated QA** from `Draw004/carrowmont-qa`.
3. Confirm green and review the artifact if needed.
4. Run **Carrowmont Multi-Repo Guard** from `Draw004/draw004.github.io`.
5. Confirm green.
6. Perform any required live visual checks that automated tests cannot fully validate.
7. Run **Carrowmont Source Snapshot** again to capture the new production baseline.

### Phase F - Optional formal version release

If a formal GitHub version/tag is wanted after QA:

1. Open **Carrowmont Release** in `Draw004/carrowmont-qa`.
2. Enter the intended semantic version.
3. Enter the target repositories.
4. Add title/notes if desired.
5. Type:

```text
RELEASE
```

6. Run the workflow.

Do not use the Release workflow as a substitute for Batch PR Publisher.

---

## 19. What to do if some files were changed manually before the publisher is run

Do not run an old/stale release ZIP simply because its content still looks correct.

If the live repository files changed after the release bundle was prepared, the publisher's base-hash protection should stop the workflow.

Correct recovery:

```text
manual/live changes already happened
    -> run fresh Source Snapshot
    -> rebuild the release bundle from current production
    -> recalculate base hashes
    -> run staged QA again
    -> create fresh PRs only for remaining intended changes
```

Never change manifest hashes by hand merely to bypass the protection.

---

## 20. Current status recorded on 26 September 2026

The following status is recorded from the current working session and prior verified setup:

| Component | Status |
|---|---|
| Main controller repository | Active: `Draw004/draw004.github.io` |
| QA repository | Active: `Draw004/carrowmont-qa` |
| `CARROWMONT_REPO_TOKEN` architecture | Established |
| `Contents: Read and write` | Verified in prior setup |
| `Pull requests: Read and write` | Verified in prior setup |
| Repository Access Check | Historically verified green |
| Multi-Repo Dry Run | Historically verified green with artifact |
| Multi-Repo Guard | Green in 26 Sep 2026 session |
| Automated QA | Green in 26 Sep 2026 session with 1 artifact |
| Source Snapshot workflow | Active; recommended to run after latest completed batch |
| Batch PR Publisher | Active; corrected implementation exists under duplicate `(1)` filename |
| Publisher staged source-contract QA | Implemented |
| Publisher staged browser/PDF QA | Implemented |
| Publisher branch creation | Implemented and proven |
| Publisher PR creation | Implemented and proven |
| Automatic product-code merge to `main` | Not enabled and should remain disabled |
| Carrowmont Release | Active; separate tag/release workflow using `RELEASE` |
| Duplicate Batch PR Publisher cleanup | Still recommended |

### Recent country/currency batch

During the 26 September 2026 work session, country/currency catalogue changes were applied and the subsequent Carrowmont Automated QA and Multi-Repo Guard were reported green.

Because some of that batch was applied manually rather than through a fresh Batch PR Publisher run, the next significant development batch should begin from a new Source Snapshot rather than reusing the old release ZIP.

---

## 21. Troubleshooting runbook

### Scenario A - `404 Not Found`

Check in this order:

1. exact repository owner;
2. exact repository name;
3. whether the repository was renamed;
4. whether the token has access to the repository;
5. whether a workflow contains an old repository name.

Known historical example:

```text
wrong:   Draw004/retirement-planner
correct: Draw004/retirement-calculator
```

Do not regenerate credentials as the first response to a `404`.

### Scenario B - `403`, authentication failure, or checkout denied

Check:

1. token expiry;
2. target repository selection in the fine-grained token;
3. required repository permissions;
4. existence of `CARROWMONT_REPO_TOKEN` in controller Actions secrets;
5. Repository Access Check results.

### Scenario C - Batch PR Publisher says base file changed

This usually means the release ZIP was prepared from an older snapshot.

Correct response:

```text
stop
    -> create fresh Source Snapshot
    -> rebuild release bundle
    -> regenerate hashes
    -> rerun publisher
```

Do not bypass the hash check.

### Scenario D - staged source-contract QA fails

Inspect:

- `staged-source-contract.txt`;
- publisher validation artifact;
- the shared contract in `carrowmont-qa/scripts/source-contract.mjs`; and
- the changed files.

Determine whether the product change is wrong or the shared contract legitimately needs updating.

### Scenario E - staged browser/PDF QA fails

Inspect the publisher QA artifact, including available:

- QA summary;
- QA JSON;
- Playwright report;
- test results;
- screenshots/artifacts;
- staged HTTP server log.

Do not create PRs manually simply to bypass staged QA.

### Scenario F - Multi-Repo Guard goes red but repositories checkout correctly

Treat this first as a source-contract failure rather than an authentication problem.

Inspect:

```text
Actions -> Carrowmont Multi-Repo Guard -> failed run
```

Read the source-contract output and artifact before changing credentials.

### Scenario G - Automated QA goes red

Inspect the `carrowmont-qa-results` artifact and determine whether the failure is:

- browser behavior;
- report/PDF behavior;
- navigation/link behavior;
- live-site deployment timing;
- console/runtime JavaScript error; or
- an expected test that must be updated because the approved product contract changed.

### Scenario H - Carrowmont Release refuses to run

Check:

1. confirmation is exactly `RELEASE`;
2. version is valid SemVer beginning with `v`;
3. target repository format is valid;
4. latest Carrowmont Automated QA is completed and green;
5. `CARROWMONT_RELEASE_TOKEN` exists and can reach the targets;
6. the requested tag/release does not already exist.

### Scenario I - token is regenerated

Update the appropriate GitHub Actions secret value rather than distributing the token into individual repositories.

Then run the relevant access/QA checks.

---

## 22. Safety rules that must be preserved

Do not:

- put secret token values in source files or documentation;
- let automation make normal product changes directly to `main`;
- bypass staged QA because a change looks small;
- reuse an old release bundle after base files changed;
- edit hashes to force a stale bundle through;
- merge generated PRs without reviewing them;
- confuse `CREATE_PRS` with `RELEASE`;
- modify GitHub Pages settings merely to solve unrelated QA failures;
- silently change calculator formulas during wording/layout/report work;
- update one tool's shared standard without considering source-contract QA; or
- add a new tool without extending central access/QA coverage.

Preferred policy:

```text
reviewed change
    -> staged validation
    -> PR
    -> human approval
    -> merge
    -> live validation
```

---

## 23. Adding a new Carrowmont calculator or repository

When a new tool is created, review all of the following:

1. Create the repository.
2. Decide whether `CARROWMONT_REPO_TOKEN` requires access.
3. Add the repository to the token scope if needed.
4. Update Repository Access Check.
5. Update Multi-Repo Dry Run.
6. Update Multi-Repo Guard.
7. Update Source Snapshot.
8. Update the Batch PR Publisher allow-list and complete-baseline clone list.
9. Extend `carrowmont-qa` source-contract and browser tests.
10. Update main-site navigation/discovery.
11. Add the public route to sitemap/search-discovery logic where appropriate.
12. Run Repository Access Check.
13. Run Multi-Repo Dry Run.
14. Run the Guard.
15. Run Automated QA after deployment.

A new repository must not become a blind spot in central QA or release automation.

---

## 24. Historical setup notes worth preserving

### Temporary SIP PR automation test

Before the production Batch PR Publisher existed, a temporary workflow called:

```text
carrowmont-pr-test.yml
```

was used to prove the technical ability to:

1. check out `Draw004/sip-calculator`;
2. create a feature branch;
3. create a harmless test file;
4. commit it;
5. push the branch; and
6. open a pull request automatically.

The test PR was intentionally not merged. The temporary branch was removed and the test workflow was deleted.

That test proved the branch-and-PR capability that later became part of the controlled Batch PR Publisher.

### Historical smoke-test confirmation

During an earlier QA update, `tests/01-smoke.spec.js` was manually checked for the exact test name:

```text
Learn hub localization contract v3
```

This was a one-time verification that GitHub contained the intended QA version. It is historical context, not a universal deployment requirement.

---

## 25. Quick reference: which workflow should I use?

| Need | Repository | Workflow | Confirmation |
|---|---|---|---|
| Capture exact current source baseline | `draw004.github.io` | Carrowmont Source Snapshot | None |
| Check whether central PAT can reach repositories | `draw004.github.io` | Carrowmont Repository Access Check | None |
| Run manual read-only five-tool source contract | `draw004.github.io` | Carrowmont Multi-Repo Dry Run | None |
| Monitor five-tool source-contract drift | `draw004.github.io` | Carrowmont Multi-Repo Guard | None |
| Publish reviewed multi-repo code changes as PRs | `draw004.github.io` | Carrowmont Batch PR Publisher | `CREATE_PRS` |
| Test the live site in browser/regression QA | `carrowmont-qa` | Carrowmont Automated QA | None |
| Create formal GitHub version/tag releases | `carrowmont-qa` | Carrowmont Release | `RELEASE` |

---

## 26. Minimum-information restart checklist for a future chat

Before changing code in a future session, the assistant/developer should establish these facts:

1. This handover is the current automation reference.
2. `Draw004/draw004.github.io` is the central automation controller.
3. `Draw004/carrowmont-qa` is the central QA repository.
4. There are five calculator repositories.
5. Normal multi-repo product changes should use Batch PR Publisher.
6. Batch PR Publisher confirmation is `CREATE_PRS`.
7. Carrowmont Release confirmation is `RELEASE` and is not the code-distribution workflow.
8. Batch PR Publisher must finish staged QA before PR creation.
9. PRs are merged manually.
10. After merge, run Automated QA and Multi-Repo Guard.
11. Use Source Snapshot before a new meaningful batch and after completed releases.
12. Until housekeeping is completed, confirm the corrected Batch PR Publisher filename is `(1).yml` before running it.
13. Never ask the user to paste a PAT/token into chat.

---

## 27. Recommended housekeeping after the current country/currency batch

When convenient and as a separate controlled change:

1. Run a fresh Carrowmont Source Snapshot.
2. Preserve this updated handover in `docs/CARROWMONT_GITHUB_AUTOMATION_HANDOVER.md`.
3. Compare the two Batch PR Publisher workflow files.
4. Move the corrected complete-baseline implementation into the canonical filename:

```text
.github/workflows/carrowmont-batch-pr-publisher.yml
```

5. Remove the duplicate:

```text
.github/workflows/carrowmont-batch-pr-publisher (1).yml
```

6. Confirm only one **Carrowmont Batch PR Publisher** appears in Actions.
7. Run a safe validation of the canonical publisher with the next legitimate reviewed release bundle rather than creating a meaningless test change.
8. Continue to keep normal product merging manual.

---

## 28. One-line architecture summary

`draw004.github.io` is the central controller, `carrowmont-qa` is the QA source of truth, Source Snapshot captures the baseline, Batch PR Publisher validates a reviewed release bundle and creates PRs after staged QA, humans merge, Automated QA validates the live site, Multi-Repo Guard watches cross-tool drift, and Carrowmont Release creates formal tags/releases only after QA.

---

## 29. Final rule for future changes

When in doubt, prefer the safer flow:

```text
snapshot first
    -> make the smallest approved change
    -> test the full staged system
    -> create PRs
    -> review
    -> merge manually
    -> test live
    -> snapshot again
```

This file should remain the canonical GitHub automation handover under:

```text
docs/CARROWMONT_GITHUB_AUTOMATION_HANDOVER.md
```
