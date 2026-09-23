Carrowmont GitHub Automation & QA Handover
Project: Carrowmont  
GitHub owner: `Draw004`  
Last updated: 23 September 2026  
Primary controller repository: `Draw004/draw004.github.io`
---
1. Purpose of this document
This document explains the GitHub automation and QA system created for Carrowmont so that a future developer can understand:
which repositories participate in the system;
what credentials and permissions exist;
which GitHub Actions workflows are active;
what each workflow does;
what was tested successfully;
what was only configured but not intentionally failure-tested;
how to diagnose common failures;
how to add a future Carrowmont tool safely; and
which safety principles must be preserved.
Important: Never place the actual personal access token (PAT) value in this file, source code, issues, PR comments, logs, or screenshots.
---
2. Repository map
Carrowmont currently uses the following repositories:
Repository	Role
`Draw004/draw004.github.io`	Main Carrowmont website and central automation controller
`Draw004/sip-calculator`	SIP Calculator
`Draw004/goal-planner`	Goal Planner
`Draw004/financial-independence`	Financial Independence tool
`Draw004/inflation-calculator`	Inflation Calculator
`Draw004/retirement-calculator`	Retirement Calculator
`Draw004/carrowmont-qa`	Shared QA / source-contract test framework
The first six repositories above are the repositories currently covered by the cross-repository automation PAT. `carrowmont-qa` is obtained separately by the QA workflows.
---
3. Central automation credential
A GitHub fine-grained Personal Access Token was created with the name:
`Carrowmont Release Automation`
Repository scope
The token was limited to these six repositories:
`Draw004/draw004.github.io`
`Draw004/sip-calculator`
`Draw004/goal-planner`
`Draw004/financial-independence`
`Draw004/inflation-calculator`
`Draw004/retirement-calculator`
Do not broaden this token to all repositories unless there is a clear operational reason.
Repository permissions
The token currently needs the following repository permissions:
Permission	Access
Contents	Read and write
Pull requests	Read and write
Metadata	Read-only
`Metadata: Read-only` is required by GitHub and may appear automatically.
Why these permissions exist
Contents: Read and write allows automation to read repositories and, when intentionally used by a PR workflow, create commits and push a branch.
Pull requests: Read and write allows an authorized automation workflow to open a PR.
Metadata: Read-only allows GitHub repository information to be read.
Token expiry
The exact expiry choice is intentionally not duplicated here. Check the token directly in GitHub when auditing credentials.
---
4. Where the token is stored
The raw PAT is not stored in workflow YAML.
It is stored as a GitHub Actions repository secret in:
`Draw004/draw004.github.io`
Path in GitHub UI:
`Settings -> Secrets and variables -> Actions -> Repository secrets`
Secret name:
`CARROWMONT_REPO_TOKEN`
Workflows reference it as:
```yaml
${{ secrets.CARROWMONT_REPO_TOKEN }}
```
Security rules
A developer must never:
hard-code the PAT in YAML, JavaScript, shell scripts, or HTML;
print the PAT in logs;
paste it into an issue or PR;
expose it in browser-side code; or
share it through screenshots.
If the PAT is regenerated or replaced, update the value of `CARROWMONT_REPO_TOKEN` in the main repository. The workflow files themselves should not need the raw token to be edited.
---
5. Setup history and what was tested
This section records the exact sequence used to build and validate the current system.
Step 1 - Fine-grained PAT created
A fine-grained token named `Carrowmont Release Automation` was created and restricted to the six repositories listed above.
Initial required repository permission:
`Contents -> Read and write`
GitHub also showed:
`Metadata -> Read-only`
Step 2 - PAT stored as an Actions secret
In `Draw004/draw004.github.io`, the PAT was saved as:
`CARROWMONT_REPO_TOKEN`
under Repository secrets for GitHub Actions.
Step 3 - Six-repository access checker created
Workflow file:
`.github/workflows/carrowmont-repo-access-check.yml`
Purpose:
verify that the central token can reach every required repository;
verify write-capable repository access without changing files;
give a simple authentication diagnostic independent of the full QA suite.
The workflow checks:
`Draw004/draw004.github.io`
`Draw004/sip-calculator`
`Draw004/goal-planner`
`Draw004/financial-independence`
`Draw004/inflation-calculator`
`Draw004/retirement-calculator`
Step 4 - Initial access check failed with HTTP 404
The first access-check run failed only at the retirement repository because the workflow had the incorrect repository name:
`Draw004/retirement-planner`
The actual repository is:
`Draw004/retirement-calculator`
After correcting that single repository name, the access check ran green and confirmed access to all six repositories.
Operational lesson: a `404` in a cross-repo workflow does not automatically mean the PAT is broken. Check the repository owner/name and token scope first.
Step 5 - Read-only multi-repository dry run created
Workflow file:
`.github/workflows/carrowmont-multi-repo-dry-run.yml`
Purpose:
check the five live calculator repositories together;
run the central Carrowmont source-contract QA;
make no source-code changes;
produce an artifact containing results.
Tool repositories checked:
`financial-independence`
`goal-planner`
`inflation-calculator`
`retirement-calculator`
`sip-calculator`
The workflow also obtains the QA project from:
`Draw004/carrowmont-qa`
and runs the shared source-contract checker:
`qa/scripts/source-contract.mjs`
The initial dry-run completed successfully:
workflow: green;
artifact count: 1;
no source repositories modified.
Step 6 - Production multi-repository Guard created
Workflow file:
`.github/workflows/carrowmont-multi-repo-guard.yml`
Purpose:
run the shared QA automatically across all five tool repositories;
keep an audit artifact;
make failures visible in GitHub;
create/update a tracking issue if the source contract fails;
close the tracking issue once the system becomes healthy again.
The Guard was run manually after creation and completed green with one artifact.
Step 7 - PAT permission expanded for PR automation
The existing `Carrowmont Release Automation` token was edited. The repository permission:
`Pull requests -> Read and write`
was added.
The token was not regenerated simply for this permission change.
Final relevant permissions became:
`Contents -> Read and write`
`Pull requests -> Read and write`
`Metadata -> Read-only`
Step 8 - Safe PR automation was tested on one repository
A temporary workflow was created:
`carrowmont-pr-test.yml`
The test targeted only:
`Draw004/sip-calculator`
The test workflow:
checked out the SIP Calculator repository;
created a temporary branch;
created a harmless test file at `.carrowmont/automation-pr-test.txt`;
committed the test file;
pushed the temporary branch; and
opened a Pull Request automatically.
The PR title was:
`Test: Carrowmont PR automation`
The test succeeded. GitHub showed the PR with one commit and one changed file. The target was `main`, but `main` itself was not changed.
Step 9 - PR test cleaned up
The test PR was deliberately not merged.
Cleanup performed:
the test PR was closed;
the temporary automation branch was deleted; and
`carrowmont-pr-test.yml` was deleted from the main repository.
The temporary test workflow should therefore not be treated as an active production workflow.
---
6. Active workflows
6.1 `carrowmont-repo-access-check.yml`
Role: credential and repository-access diagnostic.
Use this when:
the PAT has changed;
a repository has been renamed;
a repository has been added or removed;
GitHub access suddenly fails; or
a cross-repository workflow reports `403`, `404`, authentication, or checkout errors.
Expected healthy result:
green workflow run;
all six repositories accessible.
This workflow should not intentionally change application source code.
---
6.2 `carrowmont-multi-repo-dry-run.yml`
Role: manual read-only ecosystem QA.
Conceptually:
```text
Main automation repository
        |
        +-- financial-independence
        +-- goal-planner
        +-- inflation-calculator
        +-- retirement-calculator
        +-- sip-calculator
        |
        +-- carrowmont-qa
                |
                +-- source-contract.mjs
```
Use this before or after a meaningful cross-tool change when a developer wants an explicit one-off QA run.
Expected healthy result:
green workflow run;
one QA artifact;
no branch, commit, PR, or application-source change.
---
6.3 `carrowmont-multi-repo-guard.yml`
Role: recurring multi-repository QA supervision.
Manual trigger is available through GitHub Actions.
Scheduled trigger:
```yaml
cron: "0 3 * * *"
```
This means:
03:00 UTC daily;
08:30 India Standard Time daily.
The Guard:
checks out all five calculator repositories;
obtains `carrowmont-qa`;
sets up the required Node.js runtime;
records the latest commit/version of each calculator;
runs the source-contract checker;
writes results to the GitHub Actions summary;
uploads a QA artifact; and
reports a final pass/fail result.
The workflow was manually tested successfully after creation.
---
7. Automatic failure issue behavior
The Guard is configured so that a QA failure can open or update an issue in:
`Draw004/draw004.github.io`
Expected issue title:
`Carrowmont multi-repo source contract failure`
Intended behavior:
```text
QA healthy
   -> green Action
   -> no failure issue required

QA fails
   -> red Action
   -> open or update one failure issue

Developer fixes source problem
   -> later Guard run becomes green
   -> old failure issue is closed
```
Verification status
The Guard itself has been run successfully while healthy. The intentional failure-to-issue and subsequent auto-close path was configured but was not deliberately forced during setup, because doing so would require introducing a known failure. A future developer should therefore distinguish between:
Guard healthy path: verified;
issue open/update/auto-close path: configured, but not intentionally failure-tested during the initial setup.
---
8. QA source of truth
Shared QA logic should primarily live in:
`Draw004/carrowmont-qa`
Important checker:
`scripts/source-contract.mjs`
A future developer should update the QA contract whenever a shared Carrowmont standard changes, including standards for areas such as:
shared wording;
report generation;
PDF/report behavior;
button capitalization;
`Copy Summary` conventions;
cross-tool references;
localization behavior;
country/currency behavior;
chart standards;
methodology links; and
shared UI contracts.
The goal is to stop the five tools from drifting into inconsistent implementations.
---
9. Smoke-test version verification performed during setup
During earlier QA standardization, the file:
`tests/01-smoke.spec.js`
was manually checked for the exact test name:
`Learn hub localization contract v3`
This was used as a simple confirmation that GitHub contained the intended/new QA version rather than an older copy.
The subsequent QA run was clean.
This is not a universal deployment rule; it records a specific verification step used during this setup.
---
10. Artifacts
The dry-run and Guard workflows create GitHub Actions artifacts containing test/report output.
A healthy run showing:
`Artifacts: 1`
is expected and is not itself an error.
The Guard created during setup uses an artifact retention period of approximately 30 days.
Artifacts can be useful for:
debugging;
audit history;
confirming what was checked on a particular run; and
reviewing source-contract output after a workflow completes.
---
11. Safety architecture
The system deliberately separates four levels of automation.
Level 1 - Repository access validation
`carrowmont-repo-access-check.yml`
Question answered:
> Can the central credential reach all required repositories?
Level 2 - Manual read-only ecosystem QA
`carrowmont-multi-repo-dry-run.yml`
Question answered:
> Do the five tools currently satisfy the shared source contract?
Level 3 - Recurring automated protection
`carrowmont-multi-repo-guard.yml`
Question answered:
> Has anything drifted or broken since the last checks?
Level 4 - Controlled automated modification
The technical ability to do this was proven by the temporary SIP Calculator PR test:
```text
requested change
    -> feature/automation branch
    -> commit
    -> QA
    -> Pull Request
    -> human review
    -> merge
```
A generic production updater for arbitrary Carrowmont changes has not yet been deployed. Only the branch-and-PR capability was proven in a controlled test.
---
12. Critical policy: automation should not push normal product changes directly to `main`
Preferred model:
```text
automation
   -> temporary/feature branch
   -> QA
   -> PR
   -> human review
   -> merge
   -> main
```
Avoid:
```text
automation -> direct product-code push to main
```
This becomes increasingly important as Carrowmont gains traffic and business value.
---
13. GitHub Pages deployment
The existing GitHub Pages deployment was intentionally left separate from the QA/guard work.
Conceptually:
```text
QA / Guard workflows
    -> test and monitor software

GitHub Pages deployment
    -> publish software
```
Do not modify the Pages deployment merely to repair QA unless the deployment itself is demonstrably part of the problem.
---
14. Troubleshooting runbook
Scenario A - `404 Not Found`
Check, in this order:
exact repository owner;
exact repository name;
whether the repo was renamed;
whether the repo is still selected in the fine-grained PAT; and
whether the workflow contains an old repo name.
Known historical example:
wrong: `Draw004/retirement-planner`
correct: `Draw004/retirement-calculator`
Scenario B - `403`, authentication failure, or checkout denied
Check:
PAT has not expired;
target repo is selected on the PAT;
required PAT permissions remain present;
`CARROWMONT_REPO_TOKEN` still exists in Actions secrets; and
the access-check workflow.
Do not regenerate a token as the first troubleshooting step.
Scenario C - Guard goes red but repositories still checkout successfully
Treat this as a likely QA/source-contract failure rather than an authentication problem.
Inspect:
`Actions -> Carrowmont Multi-Repo Guard -> failed run`
Read the failing `source-contract` output and the artifact before changing credentials.
Scenario D - a repository is renamed
Search all central workflow YAML files for the old repository name and update every reference.
Then run:
Repository Access Check;
Multi-Repo Dry Run; and
Multi-Repo Guard.
Scenario E - token is regenerated
Update only the repository secret value:
`CARROWMONT_REPO_TOKEN`
Then run the Repository Access Check.
Avoid distributing the new token into individual repositories unless architecture changes require it.
---
15. Adding a new Carrowmont calculator/tool
When a new tool is created, do not stop after creating its GitHub repository and website page.
A developer should review this checklist:
Create the new repository.
Decide whether the central automation PAT requires access to it.
If required, add the new repository to the fine-grained PAT scope.
Update `carrowmont-repo-access-check.yml`.
Update `carrowmont-multi-repo-dry-run.yml`.
Update `carrowmont-multi-repo-guard.yml`.
Extend `carrowmont-qa` so the new tool is covered by relevant shared contracts.
Run the access checker.
Run the dry run.
Run/verify the Guard.
Add the tool to main-site navigation/discovery.
Add the public URL to the sitemap if appropriate.
Verify search-engine discovery/indexing separately.
A new tool should not become a blind spot in the central QA system.
---
16. Current known status
Component	Status
Fine-grained PAT created	Verified
Six target repositories selected	Verified
`Contents: Read and write`	Verified
`Pull requests: Read and write`	Verified
`Metadata: Read-only`	Verified
`CARROWMONT_REPO_TOKEN` secret	Verified
Six-repository access workflow	Verified green
Five-tool multi-repo dry run	Verified green
Daily multi-repo Guard	Verified green
QA artifact generation	Verified
Branch creation through automation	Verified in temporary test
PR creation through automation	Verified in temporary test
Test PR merged	No - intentionally not merged
Test branch cleanup	Completed
Temporary `carrowmont-pr-test.yml`	Deleted
Direct automated merge to `main`	Not enabled
Generic production auto-updater	Not yet built
Guard failure issue creation path	Configured, not intentionally failure-tested
Guard automatic issue-close path	Configured, not intentionally failure-tested
---
17. What a future developer should not do
Do not:
delete `CARROWMONT_REPO_TOKEN` without a replacement plan;
hard-code the PAT in a workflow;
grant the automation token access to unrelated repositories without need;
push automated multi-repository product changes directly into `main`;
bypass shared QA because a change appears visually small;
assume every red workflow means credentials are broken;
rename a repository without updating the central workflows;
silently change shared wording/behavior in one tool without reviewing the source contract; or
mix Pages deployment changes into QA troubleshooting unless necessary.
---
18. Recommended development flow going forward
For a normal product change:
```text
change requested
    -> determine affected repository/repositories
    -> create feature branch
    -> implement change
    -> run repository tests
    -> run relevant shared source-contract QA
    -> open PR
    -> review
    -> merge
    -> verify deployment
    -> confirm central Guard remains healthy
```
For a shared change across multiple tools, use the same principle for every affected repository rather than making unreviewed direct edits to `main`.
---
19. Recommended hardening as traffic/business grows
The current system is intentionally simple. As Carrowmont becomes more business-critical, consider adding:
branch protection/rulesets for `main`;
required status checks before merge;
required PR review for production changes;
a staging environment;
development/staging/production separation;
uptime monitoring;
client-side/runtime error monitoring;
security/dependency scanning;
rollback procedures;
backup/export procedures;
release notes/versioning; and
eventually, a GitHub App or another short-lived credential model instead of relying indefinitely on a long-lived PAT.
Do not add complexity merely for its own sake; introduce controls as risk and traffic increase.
---
20. Developer onboarding checklist
A newly hired developer should, before changing infrastructure:
read this document fully;
inspect `.github/workflows/` in `draw004.github.io`;
inspect `Draw004/carrowmont-qa` and `scripts/source-contract.mjs`;
run the Repository Access Check;
run the Multi-Repo Dry Run;
review the latest Multi-Repo Guard run;
confirm which repositories are currently covered by the PAT;
confirm branch protection/deployment settings before changing them; and
use PRs rather than direct automation pushes for production code.
---
21. One-line architecture summary
`draw004.github.io` is the central automation controller, `carrowmont-qa` defines shared QA contracts, the five calculator repositories are monitored together, and write automation should use branches + pull requests + human approval rather than direct changes to `main`.
