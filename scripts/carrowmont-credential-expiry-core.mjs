// Carrowmont Credential Expiry Guard - pure decisions; safe to unit test with no tokens.
const MS_DAY = 86400000;
const MILESTONES = Object.freeze([90, 60, 30, 14, 7]);
export const ISSUE_MARKER = '<!-- carrowmont-credential-guard:release-automation -->';
export const ISSUE_TITLE = '[Carrowmont] Release automation credential needs review';

export function parseIsoDay(day) {
  if (typeof day !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    throw new Error('Expected an ISO calendar date (YYYY-MM-DD)');
  }
  const t = Date.parse(`${day}T00:00:00.000Z`);
  if (!Number.isFinite(t) || new Date(t).toISOString().slice(0, 10) !== day) {
    throw new Error('Invalid calendar date');
  }
  return t;
}

export function validateRegistry(data) {
  if (!data || data.schema_version !== 1 || !Array.isArray(data.credentials) || data.credentials.length !== 1) {
    throw new Error('Credential registry must have schema 1 and exactly one reviewed credential');
  }
  parseIsoDay(data.reviewed_on);
  const topAllowed = new Set(['schema_version','reviewed_on','description','credentials']);
  if (Object.keys(data).some(k => !topAllowed.has(k))) {
    throw new Error('Unexpected top-level registry property: metadata review required');
  }
  const c = data.credentials[0];
  if (!c || c.key !== 'release-automation' || c.display_name !== 'Carrowmont Release Automation' ||
      c.secret_name !== 'CARROWMONT_REPO_TOKEN' || c.probe_repository !== 'Draw004/draw004.github.io' ||
      c.renewal_guide !== 'docs/CARROWMONT_CREDENTIAL_EXPIRY_GUARD.md' ||
      !Array.isArray(c.reminder_days) || c.reminder_days.join(',') !== MILESTONES.join(',')) {
    throw new Error('Credential metadata is missing, unreviewed or inconsistent');
  }
  parseIsoDay(c.expires_on);
  if (parseIsoDay(c.expires_on) < parseIsoDay(data.reviewed_on)) {
    throw new Error('Registry already expired on review date');
  }
  // Registry must never contain token values or other unreviewed properties.
  const allowed = new Set(['key','display_name','secret_name','expires_on','reminder_days','probe_repository','renewal_guide']);
  if (Object.keys(c).some(k => !allowed.has(k))) {
    throw new Error('Unexpected registry property: metadata review required');
  }
  return c;
}

export function daysRemaining(expiresOn, todayIso) {
  return Math.round((parseIsoDay(expiresOn) - parseIsoDay(todayIso)) / MS_DAY);
}

export function classifyCredential(credential, todayIso, probe = 'ok') {
  const remaining = daysRemaining(credential.expires_on, todayIso);
  if (!['ok','access-failed','unverified'].includes(probe)) throw new Error('Invalid probe state');
  let stage = 'clear';
  if (remaining < 0) stage = 'expired';
  else if (remaining === 0) stage = 'expires-today';
  else {
    const milestone = [...MILESTONES].reverse().find(n => remaining <= n);
    if (milestone !== undefined) stage = `warning-${milestone}`;
  }
  // A valid date cannot prove that the PAT works. A failed authentication
  // probe always triggers its own urgent stage, even 300 days early.
  if (probe === 'access-failed') stage = 'access-failed';
  // Transient GitHub/network errors are not evidence of PAT revocation.
  if (probe === 'unverified' && stage === 'clear') stage = 'probe-unverified';
  const alert = !['clear','probe-unverified'].includes(stage);
  const critical = ['expired','expires-today','access-failed','probe-unverified'].includes(stage);
  return {stage, remainingDays:remaining, alert, critical, probe};
}

export function issueBody(credential, assessment) {
  const stage = assessment.stage;
  // The main repository is public: include only an alias, date and instructions,
  // never secret contents or a token ID.
  return `${ISSUE_MARKER}\n<!-- carrowmont-guard-stage:${stage} -->\n` +
    `## Carrowmont credential review required\n\n` +
    `@Draw004 — the automated release credential requires attention.\n\n` +
    `- Credential alias: **Carrowmont Release Automation**\n` +
    `- Registered expiry date (UTC calendar date): **${credential.expires_on}**\n` +
    `- Current alert stage: **${stage}**\n` +
    `- Days until registered expiry: **${assessment.remainingDays}**\n\n` +
    `**What this affects:** Cross-repository Publisher and other automations that depend on the release PAT. An expired PAT does **not** normally take the existing published site offline.\n\n` +
    `**Required action:** Review the fine-grained PAT's actual expiry and repository permissions, rotate or renew if needed, update the GitHub Actions secret securely, update the reviewed expiry registry via PR, and rerun the guard and repository access checks.\n\n` +
    `Instructions: [Credential Expiry Guard handbook](https://github.com/Draw004/draw004.github.io/blob/main/${credential.renewal_guide}).\n\n` +
    `Do **not** post credentials, token IDs, recovery codes, personal financial data or secret values in this public issue. This issue is generated using GitHub Actions' separate built-in token.\n`;
}

export function extractIssueStage(body) {
  return typeof body === 'string' ? (body.match(/<!-- carrowmont-guard-stage:([a-z0-9-]+) -->/) || [])[1] || null : null;
}

export function nextIssueAction(previousIssue, assessment) {
  if (!assessment.alert) return previousIssue?.state === 'open' ? 'close' : 'none';
  if (!previousIssue) return 'create';
  if (previousIssue.state === 'closed') return 'reopen';
  return extractIssueStage(previousIssue.body) === assessment.stage ? 'none' : 'escalate';
}
