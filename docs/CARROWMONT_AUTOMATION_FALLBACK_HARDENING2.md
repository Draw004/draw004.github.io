# Carrowmont weekly fallback semantics hardening — 25 November 2026

## Incident

The Monday U.S. Debt and Gold updater PRs were reviewed and merged. The Tuesday fallback schedules then created additional PRs (#255 Debt and #256 Gold) because they were ordinary scheduled updater runs and the only duplicate protection was an **open PR** check. Once Monday's PR had been merged, no PR was open and newer daily source observations were available.

The duplicate Tuesday PRs were closed without merging.

## Corrected behavior

For the weekly Debt and Gold updaters only:

- Monday primary: always eligible, subject to the existing source/data/open-PR guards.
- Manual dispatch: always eligible, subject to the existing source/data/open-PR guards.
- Tuesday fallback: query the repository's closed PR history for the updater-specific automation branch prefix and a non-null `mergedAt` during the current UTC week.
  - merged current-week updater PR found -> skip before source fetch;
  - none found -> allow the Tuesday catch-up to proceed.
- Existing open-PR guard remains a second protection.

This means Tuesday still catches a dropped Monday schedule or a Monday run where the official source was not yet newer, but does not create a second weekly update after Monday was already successfully merged.

## Country updater audit

Country policy references intentionally run on weekdays because central-bank changes can happen on different days. The Saturday check is a catch-up after Friday. A same-week-merged guard would be too broad: a Tuesday country-policy PR should not suppress a genuine Friday policy change. No change is made to Country Reference scheduling.

## Security/permissions

This release changes `.github/workflows/update-us-debt-reference.yml` and `.github/workflows/update-gold-macro-reference.yml`. The Publisher PAT therefore requires temporary **Workflows: read/write** for this release only. Return it to the normal least-privilege setting after the final green release closeout.
