#!/usr/bin/env node
// Scheduled guard. Never prints a secret or sends the PAT to the Issues API.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {validateRegistry, classifyCredential, ISSUE_MARKER, ISSUE_TITLE, issueBody, nextIssueAction} from './carrowmont-credential-expiry-core.mjs';

const ownRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registry = JSON.parse(fs.readFileSync(path.join(ownRoot,'ops','credential-expiry-registry.json'),'utf8'));
const credential = validateRegistry(registry);
const mode = process.argv[2] || '--check';
if (!['--check','--apply'].includes(mode) || process.argv.length > 3) {
  throw new Error('Usage: node scripts/carrowmont-credential-expiry-guard.mjs [--check|--apply]');
}
const todayIso = new Date().toISOString().slice(0,10);

function appendSummary(lines) {
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n')+'\n', 'utf8');
  }
}

export async function probeExistingPat(secret, requestFetch = fetch) {
  if (!secret) return 'access-failed';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await requestFetch(`https://api.github.com/repos/${credential.probe_repository}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${secret}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'carrowmont-credential-expiry-guard'
      }
    });
    if ([401,404].includes(response.status)) return 'access-failed';
    if (response.status === 403 && response.headers.get('x-ratelimit-remaining') !== '0') return 'access-failed';
    if (response.status !== 200) return 'unverified';
    const details = await response.json();
    return details?.permissions?.push === true ? 'ok' : 'access-failed';
  } catch { return 'unverified'; }
  finally { clearTimeout(timer); }
}

async function api(url, token, method='GET', body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`https://api.github.com${url}`, {
      method,
      signal: controller.signal,
      headers: {
        'Accept':'application/vnd.github+json',
        'Authorization':`Bearer ${token}`,
        'X-GitHub-Api-Version':'2022-11-28',
        'User-Agent':'carrowmont-credential-expiry-guard',
        ...(body === undefined ? {} : {'Content-Type':'application/json'})
      },
      ...(body === undefined ? {} : {body:JSON.stringify(body)})
    });
    if (!response.ok) throw new Error(`GitHub issue API returned HTTP ${response.status} (${method} ${url.split('?')[0]})`);
    if (response.status === 204) return null;
    return await response.json();
  } finally { clearTimeout(timer); }
}

export async function findTrackedIssue(repo, token, requester = api) {
  // Prefer an existing issue, whether open or closed, over duplicate creation.
  for (let page=1; page<=20; page++) {
    const issues = await requester(`/repos/${repo}/issues?state=all&per_page=100&page=${page}`, token);
    const found = issues.find(issue => !issue.pull_request && issue.title === ISSUE_TITLE && issue.body?.includes(ISSUE_MARKER));
    if (found) return found;
    if (issues.length < 100) return null;
  }
  throw new Error('Tracked issue lookup exceeded safe pagination limit; refusing to create a duplicate');
}

export async function syncIssue(repo, token, assessment, requester = api) {
  const previous = await findTrackedIssue(repo, token, requester);
  const action = nextIssueAction(previous, assessment);
  const base = `/repos/${repo}/issues`;
  if (action === 'none') return {action, number:previous?.number};
  if (action === 'close') {
    await requester(`${base}/${previous.number}`, token, 'PATCH', {state:'closed'});
    return {action, number:previous.number};
  }
  const body = issueBody(credential, assessment);
  if (action === 'create') {
    const created = await requester(base, token, 'POST', {title:ISSUE_TITLE, body});
    return {action, number:created.number};
  }
  await requester(`${base}/${previous.number}`, token, 'PATCH', {body, ...(action === 'reopen' ? {state:'open'} : {})});
  if (action === 'escalate') {
    await requester(`${base}/${previous.number}/comments`, token, 'POST', {
      body:`Credential Guard escalation: **${assessment.stage}**. Please review the issue and the secure renewal instructions. Do not post secret values here.`
    });
  }
  return {action, number:previous.number};
}

async function main() {
  if (mode === '--check') {
    const assessment = classifyCredential(credential, todayIso, 'ok');
    console.log(`Credential registry reviewed; ${assessment.remainingDays} calendar days until registered expiry; calendar stage: ${assessment.stage}.`);
    console.log('Local --check does NOT test the secret, create GitHub issues or prove live credential health.');
    return;
  }
  const repo = process.env.GITHUB_REPOSITORY;
  if (repo !== 'Draw004/draw004.github.io' || process.env.GITHUB_REF !== 'refs/heads/main') {
    throw new Error('Refusing to apply outside Draw004/draw004.github.io default branch');
  }
  const issueToken = process.env.GITHUB_TOKEN;
  if (!issueToken) throw new Error('Built-in GITHUB_TOKEN unavailable; cannot create independent alert');
  const probe = await probeExistingPat(process.env[credential.secret_name]);
  const assessment = classifyCredential(credential, todayIso, probe);
  if (assessment.stage === 'probe-unverified') {
    appendSummary(['## Credential Expiry Guard', 'PAT health probe inconclusive (transient GitHub/network response). No credential issue was opened. Run again; investigate if repeated.']);
    throw new Error('PAT health probe inconclusive; see workflow summary (no secret disclosed)');
  }
  const issue = await syncIssue(repo, issueToken, assessment);
  appendSummary([
    '## Carrowmont Credential Expiry Guard',
    `- Registered expiry: ${credential.expires_on} (UTC calendar date)`,
    `- Remaining calendar days: ${assessment.remainingDays}`,
    `- Current stage: ${assessment.stage}`,
    `- Independent issue action: ${issue.action}${issue.number ? ` (#${issue.number})` : ''}`,
    '- PAT value is never printed. GitHub does not automatically refresh expiry metadata after rotation.'
  ]);
  console.log(`Credential Guard: ${assessment.stage}; issue action ${issue.action}.`);
  if (assessment.critical) process.exitCode = 1;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(e => { console.error(`Credential Guard failed: ${e.message}`); process.exitCode=1; });
}
