(function () {
  'use strict';
  const core = window.CarrowmontShortTermSavingsCore;
  const locale = window.CarrowmontLocale;
  const root = document.getElementById('short-term-savings-comparison');
  if (!core || !locale || !root) return;

  const byId = id => document.getElementById(id);
  const numericIds = ['stsAmountNow','stsGoalAmount','stsHorizonMonths','stsInstantAccessAmount','stsMonthlyContribution','stsSavingsRatePct','stsTermRatePct','stsTermMonths','stsFundYieldPct','stsGovernmentYieldPct','stsGovernmentTermMonths'];
  let lastResult = null;

  function rawValue(id) {
    const el = byId(id);
    return el ? el.value : '';
  }

  function state() {
    return {
      amountNow: rawValue('stsAmountNow'),
      goalAmount: rawValue('stsGoalAmount'),
      horizonMonths: rawValue('stsHorizonMonths'),
      instantAccessAmount: rawValue('stsInstantAccessAmount'),
      monthlyContribution: rawValue('stsMonthlyContribution'),
      goalFlexibility: rawValue('stsGoalFlexibility'),
      savingsRatePct: rawValue('stsSavingsRatePct'),
      termRatePct: rawValue('stsTermRatePct'),
      termMonths: rawValue('stsTermMonths'),
      fundYieldPct: rawValue('stsFundYieldPct'),
      governmentYieldPct: rawValue('stsGovernmentYieldPct'),
      governmentTermMonths: rawValue('stsGovernmentTermMonths')
    };
  }

  function money(value) {
    return locale.formatMoney(Number(value) || 0, { maximumFractionDigits: 0 });
  }

  function pct(value) {
    if (value == null || !Number.isFinite(Number(value))) return 'Rate not entered';
    return `${Number(value).toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1')}% p.a.`;
  }

  function setText(id, value) {
    const el = byId(id);
    if (el) el.textContent = value;
  }

  function labelsForRegion(region) {
    const generic = {
      savings: 'Accessible savings account',
      savingsRate: 'Accessible savings account rate (% p.a.)',
      term: 'Term deposit',
      termRate: 'Term deposit rate (% p.a.)',
      termMonths: 'Term deposit maturity (months)',
      fund: 'Money market / cash fund',
      fundRate: 'Money market / cash fund yield assumption (% p.a.)',
      government: 'Short government bill',
      governmentRate: 'Short government bill yield (% p.a.)',
      governmentMonths: 'Government bill maturity (months)'
    };
    const map = {
      IN: {...generic, term:'Fixed deposit (FD)', termRate:'Fixed deposit (FD) rate (% p.a.)', termMonths:'Fixed deposit maturity (months)', fund:'Liquid / money market fund', fundRate:'Liquid / money market fund yield assumption (% p.a.)', government:'Treasury bill', governmentRate:'Treasury bill yield (% p.a.)', governmentMonths:'Treasury bill maturity (months)'},
      US: {...generic, term:'Certificate of deposit (CD)', termRate:'Certificate of deposit (CD) rate (% p.a.)', termMonths:'CD maturity (months)', government:'Treasury bill', governmentRate:'Treasury bill yield (% p.a.)', governmentMonths:'Treasury bill maturity (months)'},
      CA: {...generic, term:'Term deposit / GIC', termRate:'Term deposit / GIC rate (% p.a.)', termMonths:'Term deposit / GIC maturity (months)', government:'Government T-bill', governmentRate:'Government T-bill yield (% p.a.)', governmentMonths:'Government T-bill maturity (months)'},
      GB: {...generic, term:'Fixed-term savings account', termRate:'Fixed-term savings rate (% p.a.)', termMonths:'Fixed-term savings maturity (months)', government:'Treasury bill', governmentRate:'Treasury bill yield (% p.a.)', governmentMonths:'Treasury bill maturity (months)'},
      AU: {...generic, term:'Term deposit', government:'Short government security'},
      NZ: {...generic, term:'Term deposit', government:'Short government security'}
    };
    return map[region] || generic;
  }

  function applyLocalizedLabels() {
    const l = labelsForRegion(locale.getRegion());
    setText('stsSavingsTitle', l.savings);
    setText('stsSavingsRateLabel', l.savingsRate);
    setText('stsTermTitle', l.term);
    setText('stsTermRateLabel', l.termRate);
    setText('stsTermMonthsLabel', l.termMonths);
    setText('stsFundTitle', l.fund);
    setText('stsFundRateLabel', l.fundRate);
    setText('stsGovernmentTitle', l.government);
    setText('stsGovernmentRateLabel', l.governmentRate);
    setText('stsGovernmentMonthsLabel', l.governmentMonths);
  }

  function statusLabel(status) {
    return ({ready:'Fits deadline',conditional:'Check risk',mismatch:'Maturity mismatch','needs-input':'Needs inputs','no-lockable':'No amount to place'})[status] || 'Review';
  }

  function renderOption(option, result) {
    const prefix = ({savings:'stsSavings','term-deposit':'stsTerm','money-market-fund':'stsFund','government-bill':'stsGovernment'})[option.id];
    const card = root.querySelector(`[data-option="${option.id}"]`);
    if (card) card.dataset.status = option.status;
    setText(`${prefix}Status`, statusLabel(option.status));

    if (option.projectedTotal == null) {
      setText(`${prefix}Value`, '-');
      if (option.status === 'mismatch') setText(`${prefix}Growth`, `Matures after your ${result.horizonMonths}-month deadline, so Carrowmont does not count it as available by the goal date.`);
      else if (option.status === 'no-lockable') setText(`${prefix}Growth`, 'Your full current balance is reserved for instant access.');
      else if (option.id === 'savings') setText(`${prefix}Growth`, 'Enter the accessible savings rate to project the ending balance.');
      else if (option.id === 'money-market-fund') setText(`${prefix}Growth`, 'Enter the yield assumption and accessible savings rate to project this split.');
      else setText(`${prefix}Growth`, 'Enter the rate, maturity and accessible savings rate to project this split.');
    } else {
      setText(`${prefix}Value`, money(option.projectedTotal));
      const growthText = option.modeledGrowth >= 0 ? `${money(option.modeledGrowth)} modeled growth` : `${money(Math.abs(option.modeledGrowth))} modeled decline`;
      const goal = option.goalGap == null ? '' : option.goalGap > 0 ? ` · ${money(option.goalGap)} below your goal` : ` · ${money(Math.abs(option.goalGap))} above your goal`;
      setText(`${prefix}Growth`, `${growthText}${goal}`);
    }

    if (option.id === 'savings') setText('stsSavingsFit', `${pct(option.ratePct)} · Immediate access; the actual rate may change.`);
    if (option.id === 'term-deposit') {
      const maturity = option.maturityMonths == null ? 'Maturity not entered' : `${option.maturityMonths} month maturity`;
      setText('stsTermFit', `${pct(option.ratePct)} · ${maturity}. ${option.status === 'mismatch' ? 'The maturity is later than your entered deadline.' : 'The instant-access reserve remains outside the locked amount.'}`);
    }
    if (option.id === 'money-market-fund') setText('stsFundFit', `${pct(option.ratePct)} · Investment fund; value, yield, settlement and protections can differ from a bank deposit.`);
    if (option.id === 'government-bill') {
      const maturity = option.maturityMonths == null ? 'Maturity not entered' : `${option.maturityMonths} month maturity`;
      setText('stsGovernmentFit', `${pct(option.ratePct)} · ${maturity}. ${option.status === 'mismatch' ? 'Selling before maturity can expose the value to market-rate changes.' : 'Modeled on a hold-to-maturity basis.'}`);
    }
  }

  function render(result) {
    lastResult = result;
    const statusCard = byId('stsStatusCard');
    if (!result.ok) {
      if (statusCard) statusCard.dataset.tone = 'risk';
      setText('stsStatusLabel','CHECK THE INPUTS');
      setText('stsStatusHeadline','This comparison needs a little more information.');
      setText('stsStatusText', result.errors[0] || 'Enter a savings amount and deadline.');
      setText('stsAccessReserveValue','-'); setText('stsLockableValue','-'); setText('stsContributionValue','-');
      setText('stsDecisionText','Add the required figures to compare liquidity, maturity and projected ending values.'); setText('stsGoalText','');
      const warnings = byId('stsWarnings'); if (warnings) warnings.replaceChildren();
      return;
    }

    if (statusCard) statusCard.dataset.tone = result.lockableAmount > 0 ? '' : 'warn';
    setText('stsStatusLabel', result.lockableAmount > 0 ? 'LIQUIDITY RESERVE SET' : 'ALL CURRENT SAVINGS KEPT ACCESSIBLE');
    setText('stsStatusHeadline', `Keep ${money(result.accessReserve)} accessible; compare ${money(result.lockableAmount)} for the ${result.horizonMonths}-month horizon.`);
    setText('stsStatusText', result.lockableAmount > 0 ? 'The comparison below keeps your selected instant-access amount out of locked and market-based options.' : 'There is no current balance left to place in locked or market-based options after your liquidity reserve.');
    setText('stsAccessReserveValue', money(result.accessReserve));
    setText('stsLockableValue', money(result.lockableAmount));
    setText('stsContributionValue', money(result.totalPlannedContributions));

    result.options.forEach(option => renderOption(option, result));

    const labels = labelsForRegion(locale.getRegion());
    const optionName = id => ({savings:labels.savings,'term-deposit':labels.term,'money-market-fund':labels.fund,'government-bill':labels.government})[id] || id;
    if (result.highestModeledValueOptionId) {
      setText('stsDecisionText', `${optionName(result.highestModeledValueOptionId)} has the highest modeled ending value among the options with enough information and no maturity mismatch: ${money(result.highestModeledValue)}. That is a scenario result, not a recommendation or guarantee.`);
    } else {
      setText('stsDecisionText', 'Enter the accessible savings rate and any other rates or maturities you want to compare. Carrowmont will not invent missing market assumptions.');
    }
    if (result.goalAmount > 0) {
      const complete = result.options.filter(o => o.projectedTotal != null);
      const meeting = complete.filter(o => o.projectedTotal >= result.goalAmount && o.status !== 'mismatch').map(o => optionName(o.id));
      setText('stsGoalText', meeting.length ? `${meeting.join(', ')} ${meeting.length === 1 ? 'meets' : 'meet'} the entered goal amount of ${money(result.goalAmount)} in this model.` : `None of the completed, deadline-compatible projections reaches the entered goal amount of ${money(result.goalAmount)}.`);
    } else setText('stsGoalText','Add an optional goal amount if you want each option compared with a target balance at the deadline.');

    const warnings = byId('stsWarnings');
    if (warnings) warnings.replaceChildren(...result.warnings.map(message => { const div=document.createElement('div'); div.className='sts-warning'; div.textContent=message; return div; }));
  }

  function calculate() {
    applyLocalizedLabels();
    render(core.calculate(state()));
    setText('stsActionMessage','');
  }

  function summaryText() {
    if (!lastResult?.ok) return '';
    const labels = labelsForRegion(locale.getRegion());
    const names = {savings:labels.savings,'term-deposit':labels.term,'money-market-fund':labels.fund,'government-bill':labels.government};
    const lines = [
      'Carrowmont Short-Term Savings Comparison',
      `Currency: ${locale.getCurrency()}`,
      `Current savings compared: ${money(lastResult.assumptions.amountNow)}`,
      `Deadline: ${lastResult.horizonMonths} months (${lastResult.goalFlexibility} date)`,
      `Instant-access reserve: ${money(lastResult.accessReserve)}`,
      `Amount compared outside the access reserve: ${money(lastResult.lockableAmount)}`,
      `Planned monthly additions: ${money(lastResult.assumptions.monthlyContribution)}`
    ];
    if (lastResult.goalAmount > 0) lines.push(`Goal amount at deadline: ${money(lastResult.goalAmount)}`);
    for (const o of lastResult.options) lines.push(`${names[o.id]}: ${o.projectedTotal == null ? statusLabel(o.status) : `${money(o.projectedTotal)} projected ending value (${statusLabel(o.status)})`}`);
    if (lastResult.highestModeledValueOptionId) lines.push(`Highest modeled ending value among completed, deadline-compatible scenarios: ${names[lastResult.highestModeledValueOptionId]} — ${money(lastResult.highestModeledValue)}`);
    lines.push('Important: user-entered rates are held constant only for illustration. Taxes, fees, deposit-protection limits, provider eligibility, early-withdrawal penalties and live market changes are not modeled.');
    lines.push(`Methodology version: ${lastResult.methodologyVersion}`);
    return lines.join('\n');
  }

  async function copySummary() {
    if (!lastResult?.ok) return;
    try { await navigator.clipboard.writeText(summaryText()); setText('stsActionMessage','Summary copied.'); }
    catch (_) { setText('stsActionMessage','Copy was not available in this browser.'); }
  }

  function csvCell(value) {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g,'""')}"` : text;
  }

  function downloadCsv() {
    if (!lastResult?.ok) return;
    const labels = labelsForRegion(locale.getRegion());
    const names = {savings:labels.savings,'term-deposit':labels.term,'money-market-fund':labels.fund,'government-bill':labels.government};
    const rows = [
      ['Carrowmont Short-Term Savings Comparison'],
      ['Methodology version', lastResult.methodologyVersion],
      ['Currency', locale.getCurrency()],
      ['Current savings', lastResult.assumptions.amountNow],
      ['Goal amount', lastResult.goalAmount || ''],
      ['Horizon months', lastResult.horizonMonths],
      ['Goal flexibility', lastResult.goalFlexibility],
      ['Instant-access reserve', lastResult.accessReserve],
      ['Amount outside access reserve', lastResult.lockableAmount],
      ['Monthly contribution', lastResult.assumptions.monthlyContribution],
      ['Option','Status','Annual rate / yield %','Maturity months','Projected ending value','Modeled growth','Goal gap']
    ];
    for (const o of lastResult.options) rows.push([names[o.id],o.status,o.ratePct ?? '',o.maturityMonths ?? '',o.projectedTotal ?? '',o.modeledGrowth ?? '',o.goalGap ?? '']);
    rows.push(['Important','Entered rates are scenario assumptions, not live market rates. Taxes, fees, deposit protection and provider-specific terms are not modeled.']);
    const blob = new Blob([rows.map(row => row.map(csvCell).join(',')).join('\n') + '\n'], {type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href=url; link.download='carrowmont-short-term-savings-comparison.csv'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url),5000); setText('stsActionMessage','CSV has been downloaded.');
  }

  numericIds.forEach(id => byId(id)?.addEventListener('input', calculate));
  byId('stsGoalFlexibility')?.addEventListener('change', calculate);
  byId('stsCalculateBtn')?.addEventListener('click', calculate);
  byId('stsCopySummaryBtn')?.addEventListener('click', copySummary);
  byId('stsDownloadCsvBtn')?.addEventListener('click', downloadCsv);
  byId('stsPrintBtn')?.addEventListener('click', () => { document.body.classList.add('sts-printing'); window.print(); setTimeout(() => document.body.classList.remove('sts-printing'), 1000); });
  window.addEventListener('afterprint', () => document.body.classList.remove('sts-printing'));
  window.addEventListener('carrowmont:localechange', () => { applyLocalizedLabels(); calculate(); });
  applyLocalizedLabels();
  calculate();
})();
