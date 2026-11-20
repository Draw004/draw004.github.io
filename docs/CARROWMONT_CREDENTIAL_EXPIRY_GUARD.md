# Carrowmont Credential Expiry Guard - operating and handover standard

**Version:** 1.0 (proposed release; becomes active only after approved Publisher/merge).  
**Owned by:** Carrowmont owner in GitHub; independent of ChatGPT account.  
**Goal:** Do not allow a forgotten release-automation PAT to silently interrupt Publisher or cross-repository maintenance.

## 1. What this does (plain language)

- Checks the **reviewed expiry date** for Carrowmont Release Automation every day through GitHub Actions. The date is entered in `ops/credential-expiry-registry.json`; GitHub does not automatically refresh it when a PAT is renewed.
- On or after the **90-, 60-, 30-, 14-, and 7-day** warning boundaries, creates or updates **one tracked GitHub issue** in `Draw004/draw004.github.io`. Also warns when due today or overdue. If the daily check misses a date, it raises the most urgent currently applicable warning when it next runs.
- Makes a read-only GitHub API request using the existing encrypted `CARROWMONT_REPO_TOKEN` secret. It checks that the token can still see the Main repository with `permissions.push` set to true. An authorization/permission failure generates an immediate review issue even before the expiry window.
- Uses the automatically supplied **GitHub Actions `GITHUB_TOKEN`** (scoped to Issues: write) for the alert. It **does not use the release PAT** to open or update alert issues.
- Keeps warnings idempotent: one issue, escalation comments only when the warning stage changes, and close after registry + token health are verified clear.

**The website will not normally go offline if the release PAT expires.** Publisher and other automation using it may stop. The guard cannot renew a PAT automatically, read its expiry from GitHub, or guarantee a scheduler will always run.

## 2. Information stored in the repository

| Location | Purpose |
|---|---|
| `ops/credential-expiry-registry.json` | Non-secret PAT alias, exact registered expiry date, alert milestones and probe target |
| `.github/workflows/carrowmont-credential-expiry-guard.yml` | Daily 05:23 UTC schedule and optional manual run |
| `scripts/carrowmont-credential-expiry-core.mjs` | Date calculation and idempotent issue-stage logic |
| `scripts/carrowmont-credential-expiry-guard.mjs` | GitHub token probe and independent issue updates |
| `carrowmont-qa/scripts/credential-expiry-guard-contract.mjs` | Deterministic tests for thresholds, repeat runs, access failure, registry validity and workflow privileges |

This public repository and its issues **must not** contain token strings, token IDs, OAuth secrets, recovery codes, private account details or personal financial records. The issue will reveal that a maintenance credential needs review and its registered expiration date; do not post sensitive investigation details there.

## 3. One-time activation after merge (non-coder steps)

1. In GitHub, open **Draw004/draw004.github.io -> Actions -> Carrowmont Credential Expiry Guard**. It must exist on the `main` branch. If GitHub has disabled the workflow, enable it.
2. Run **Run workflow** manually on `main`. The first successful run should say the date is outside the warning window and the existing secret is healthy. No GitHub issue is expected in that situation.
3. Confirm **Settings -> Secrets and variables -> Actions** still contains repository secret `CARROWMONT_REPO_TOKEN` (do not reveal its value). Confirm repository Issues are enabled and Actions can create/update issues using `issues: write`.
4. For advance warning delivery, confirm your GitHub notification settings for repository Issues and workflow failures. A public GitHub issue alone is not a guaranteed private notification.
5. Create a **separate personal calendar reminder for 24 June 2027** (90 days before the registered date), with a second backup contact/channel if desired. This is essential because GitHub may disable scheduled workflows after 60 days of inactivity in a public repo, and scheduled runs can be delayed or skipped. Manually verify the Actions workflow is enabled and running at least once every three months.

**Do not** test by putting a fake expired date in a committed public registry. The QA contract tests expiry scenarios offline.

## 4. Renewal procedure (owner-approved, never auto-renew)

1. Open GitHub **Settings -> Developer settings -> Personal access tokens -> Fine-grained tokens**. Locate **Carrowmont Release Automation** and verify the real expiry and scopes. Replace or renew the token before the deadline; follow GitHub's current UI.
2. Keep repository scope limited to the Carrowmont repos that actually need automation. Routine Publisher permissions are Contents: read/write, Pull requests: read/write and required Metadata: read. **Workflows: read/write must be temporary and only for releases changing `.github/workflows/`**, such as initially installing this guard.
3. Update the token **only inside the encrypted GitHub Actions repository secret** `CARROWMONT_REPO_TOKEN` in `Draw004/draw004.github.io`; do not add its value to a PR, public document, chat, test fixture, issue or screenshot.
4. Run **Carrowmont Repository Access Check** and a manual **Credential Expiry Guard** run. If any access check fails, verify the fine-grained token scope and secret before proceeding. The guard's lightweight probe checks only the Main repo; it does not test all 11 repository scopes.
5. Update `ops/credential-expiry-registry.json` with the **new actual expiry date** and `reviewed_on` via the normal human-reviewed Publisher/QA/Guard path, then rerun Credential Expiry Guard. The old expiry date persists until reviewed and merged; the guard cannot discover the new date from the secret.
6. Once the new date is more than 90 days away *and* the PAT health check passes, the tracked issue closes. Record the rotation event in a non-secret changelog. Re-disable Workflows write when no longer required.

**If the token is already revoked/expired:** the credential check will fail; use GitHub's account Settings to rotate manually. The independent alert runs with `GITHUB_TOKEN` and does not need the expired PAT. Old Publisher jobs may still fail until the secret is updated.

## 5. Operational failure conditions and limits

- PAT health probe returns an authorization failure or cannot confirm Main push permission: a tracked issue opens immediately, and the workflow reports failure.
- Temporary API rate limit, timeout or network failure: the guard reports an inconclusive failure rather than falsely claiming a token is revoked. Check the next run or rerun manually.
- Issue API not permitted or repository Issues disabled: the workflow fails. Check the Actions log/summary and repository workflow permissions. GitHub issue notification is not guaranteed if issue writing is blocked.
- GitHub schedule disabled, actor ineligible, service outage, GitHub Actions off or account no longer available: the guard cannot run. The separate calendar reminder and quarterly manual verification are mandatory backups.
- Other tokens (for example `CARROWMONT_RELEASE_TOKEN` in the QA repository), Google OAuth, mailing services and domain renewal are **not covered by v1** unless separately inventoried with confirmed expiry dates and approved checks. Never assume they are covered.
- Do not automatically rotate credentials or modify repository secrets. Credentials and permission changes always require the account owner.

## 6. Technical/security contract for future developers or AI

1. Read `CARROWMONT_DEVELOPMENT_START_HERE.md`, `CARROWMONT_CURRENT_PROJECT_STATUS.md`, this guide, the registry and workflow source **before edits**.
2. The guard is a standalone scheduled workflow on `main`, not part of the high-frequency Publisher execution path. `GITHUB_TOKEN` owns only issue writes; the release PAT is used only for a read-only health probe.
3. The registry schema must be validated; invalid dates, extra credential properties and changed milestones fail deterministic QA.
4. Preserve the unique issue marker, idempotence, escalation boundaries, safe API errors and no-secret logging. Refuse to create duplicate issues if the previous issue cannot be safely located.
5. Test calendar thresholds including missed scheduled runs, repeated runs, renewed credentials, health failures, API failures and issue reassignment. Do not test by leaking or revoking production credentials.
6. Release all changes using exact reviewed source hashes, Publisher review PRs, source/browser checks as applicable, Multi-Repo Guard and a new green snapshot. Document last successful Guard execution and any blocked warnings in current status.

**Reminder:** GitHub's scheduler is not an enterprise monitoring service. Use a manual/calendar backup; never claim 100% delivery or continuous unattended protection.
