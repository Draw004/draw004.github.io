(function () {
  'use strict';

  const core = window.CarrowmontEmergencyFundCore;
  const locale = window.CarrowmontLocale;
  if (!core || !locale) return;

  const byId = id => document.getElementById(id);
  const ids = ['essentialExpenses','debtPayments','otherCommitments','emergencySavings','otherLiquidCash','targetMonths','monthlyContribution','shockCost','disruptionIncome'];
  let lastResult = null;

  function value(id) {
    const n = Number(byId(id)?.value);
    return Number.isFinite(n) ? n : 0;
  }

  function inputState() {
    return {
      essentialExpenses: value('essentialExpenses'),
      debtPayments: value('debtPayments'),
      otherCommitments: value('otherCommitments'),
      emergencySavings: value('emergencySavings'),
      otherLiquidCash: value('otherLiquidCash'),
      includeOtherLiquidCash: Boolean(byId('includeOtherLiquidCash')?.checked),
      targetMonths: value('targetMonths'),
      monthlyContribution: value('monthlyContribution'),
      shockCost: value('shockCost'),
      disruptionIncome: value('disruptionIncome')
    };
  }

  function money(n) {
    return locale.formatMoney(n, { maximumFractionDigits: 0 });
  }

  function months(n) {
    if (n == null) return 'Not limited by monthly burn';
    if (!Number.isFinite(n)) return 'Not limited by monthly burn';
    const rounded = n >= 10 ? n.toFixed(1) : n.toFixed(2);
    return `${rounded.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')} months`;
  }

  function setText(id, text) {
    const node = byId(id);
    if (node) node.textContent = text;
  }

  function statusCopy(result) {
    switch (result.classification) {
      case 'NO_BUFFER': return { tone:'risk', label:'START WITH A FIRST BUFFER', headline:'No emergency runway is funded yet.', text:'A first milestone is one month of essential need. You can then build toward the target you choose.' };
      case 'FIRST_BUFFER': return { tone:'risk', label:'FIRST BUFFER IN PROGRESS', headline:`Your reserve covers ${months(result.fullLossRunwayMonths)}.`, text:'You have some emergency-ready cash, but it is still below one month of the essential costs entered.' };
      case 'BUILDING': return { tone:'warn', label:'BUILDING RESILIENCE', headline:`Your reserve covers ${months(result.fullLossRunwayMonths)}.`, text:`That is below your chosen ${result.assumptions.targetMonths}-month target, so the funding gap remains visible rather than hidden behind a generic score.` };
      case 'TARGET_COVERED': return { tone:'good', label:'YOUR CHOSEN TARGET IS COVERED', headline:`Your reserve covers ${months(result.fullLossRunwayMonths)}.`, text:`Based on the costs and cash entered, the reserve meets or exceeds your chosen ${result.assumptions.targetMonths}-month target.` };
      default: return { tone:'risk', label:'ADD YOUR ESSENTIAL COSTS', headline:'Runway cannot be calculated yet.', text:'Enter at least one essential or unavoidable monthly cost.' };
    }
  }

  function render(result) {
    lastResult = result;
    const status = statusCopy(result);
    const statusCard = byId('statusCard');
    if (statusCard) statusCard.dataset.tone = status.tone === 'good' ? '' : status.tone;
    setText('statusLabel', status.label);
    setText('statusHeadline', status.headline);
    setText('statusText', status.text);
    setText('reserveValue', money(result.reserve));
    setText('monthlyNeedValue', money(result.monthlyNeed));
    setText('targetGapValue', result.targetGap > 0 ? money(result.targetGap) : 'No gap');
    setText('targetGapNote', `${result.assumptions.targetMonths}-month target: ${money(result.targetAmount)}`);

    const progress = Math.max(0, Math.min(100, result.targetCoveragePct));
    setText('progressTitle', `${result.assumptions.targetMonths}-month target progress`);
    setText('progressText', `${Math.round(progress)}%`);
    const bar = byId('progressBar');
    if (bar) bar.style.width = `${progress}%`;
    const wrap = bar?.parentElement;
    if (wrap) wrap.setAttribute('aria-valuenow', String(Math.round(progress)));

    setText('firstStageValue', money(result.firstStageAmount));
    if (result.firstStageGap <= 0) setText('firstStageText', 'Your current reserve already covers at least one month of the essential need entered.');
    else if (result.monthsToFirstStage == null) setText('firstStageText', `${money(result.firstStageGap)} remains to reach this milestone. Add a monthly contribution if you want a build-time estimate.`);
    else setText('firstStageText', `${money(result.firstStageGap)} remains. At ${money(result.assumptions.monthlyContribution)} per month, that is about ${result.monthsToFirstStage} month${result.monthsToFirstStage === 1 ? '' : 's'}.`);

    setText('stressRunwayValue', result.stressMonthlyBurn <= 0 ? 'Monthly need covered' : months(result.stressedRunwayMonths));
    if (result.stressMonthlyBurn <= 0) {
      setText('stressRunwayText', `The continuing income entered (${money(result.assumptions.disruptionIncome)}) covers the modeled monthly need after the one-time shock.`);
    } else {
      setText('stressRunwayText', `After a ${money(result.assumptions.shockCost)} shock, ${money(result.postShockReserve)} remains. The modeled monthly shortfall is ${money(result.stressMonthlyBurn)}.`);
    }

    setText('referenceText', `A 3 to 6 month reference range would equal roughly ${money(result.referenceLowAmount)} to ${money(result.referenceHighAmount)} using the essential monthly need entered. This is context only, not Carrowmont choosing your target.`);

    const warnings = byId('warnings');
    if (warnings) {
      warnings.replaceChildren(...result.warnings.map(message => {
        const div = document.createElement('div');
        div.className = 'ef-warning';
        div.textContent = message;
        return div;
      }));
    }
  }

  function calculate() {
    render(core.calculate(inputState()));
    setText('actionMessage', '');
  }

  function summaryText() {
    if (!lastResult) return '';
    const r = lastResult;
    const build = r.targetGap <= 0 ? 'Chosen target is covered.' : r.monthsToTarget == null ? `Gap to chosen target: ${money(r.targetGap)}.` : `Gap to chosen target: ${money(r.targetGap)}; about ${r.monthsToTarget} months at ${money(r.assumptions.monthlyContribution)} per month.`;
    return [
      'Carrowmont Emergency Fund & Financial Runway result',
      `Emergency-ready reserve: ${money(r.reserve)}`,
      `Essential monthly need: ${money(r.monthlyNeed)}`,
      `Current full-income-loss runway: ${months(r.fullLossRunwayMonths)}`,
      `Chosen target: ${r.assumptions.targetMonths} months (${money(r.targetAmount)})`,
      build,
      `Stress scenario: one-time shock ${money(r.assumptions.shockCost)}; continuing income ${money(r.assumptions.disruptionIncome)}; stressed runway ${r.stressMonthlyBurn <= 0 ? 'monthly need covered' : months(r.stressedRunwayMonths)}`,
      'The 3-6 month range shown by Carrowmont is a reference point, not an individualized recommendation.',
      `Methodology version: ${r.methodologyVersion}`
    ].join('\n');
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText());
      setText('actionMessage', 'Summary copied.');
    } catch (_) {
      setText('actionMessage', 'Copy was not available in this browser.');
    }
  }

  function csvCell(value) {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function downloadCsv() {
    if (!lastResult) return;
    const r = lastResult;
    const rows = [
      ['Carrowmont Emergency Fund & Financial Runway'],
      ['Methodology version', r.methodologyVersion],
      ['Currency', locale.getCurrency()],
      ['Essential monthly living costs', r.assumptions.essentialExpenses],
      ['Minimum debt payments', r.assumptions.debtPayments],
      ['Other unavoidable commitments', r.assumptions.otherCommitments],
      ['Essential monthly need', r.monthlyNeed],
      ['Emergency savings', r.assumptions.emergencySavings],
      ['Other liquid cash entered', r.assumptions.otherLiquidCash],
      ['Other liquid cash counted', r.assumptions.includeOtherLiquidCash ? 'Yes' : 'No'],
      ['Emergency-ready reserve', r.reserve],
      ['Current runway months', r.fullLossRunwayMonths == null ? '' : r.fullLossRunwayMonths],
      ['Chosen target months', r.assumptions.targetMonths],
      ['Chosen target amount', r.targetAmount],
      ['Gap to chosen target', r.targetGap],
      ['Monthly contribution', r.assumptions.monthlyContribution],
      ['Months to chosen target', r.monthsToTarget == null ? '' : r.monthsToTarget],
      ['One-time shock', r.assumptions.shockCost],
      ['Continuing monthly income', r.assumptions.disruptionIncome],
      ['Post-shock reserve', r.postShockReserve],
      ['Stress monthly shortfall', r.stressMonthlyBurn],
      ['Stressed runway months', r.stressedRunwayMonths == null ? '' : r.stressedRunwayMonths],
      ['Reference low months', r.referenceRangeMonths.low],
      ['Reference high months', r.referenceRangeMonths.high],
      ['Reference only', 'Not an individualized recommendation']
    ];
    const blob = new Blob([rows.map(row => row.map(csvCell).join(',')).join('\n') + '\n'], { type:'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carrowmont-emergency-fund-runway.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    setText('actionMessage', 'CSV has been downloaded.');
  }

  async function generateReport() {
    if (!lastResult || !window.CarrowmontEmergencyFundPdfRenderer) return;
    try {
      setText('actionMessage', 'Preparing report...');
      await window.CarrowmontEmergencyFundPdfRenderer.generate({
        result:lastResult,
        currency:locale.getCurrency(),
        locale:locale.getLocale()
      });
      setText('actionMessage', 'Report has been downloaded.');
    } catch (error) {
      console.error(error);
      setText('actionMessage', 'The report could not be generated.');
    }
  }

  byId('calculateBtn')?.addEventListener('click', calculate);
  ids.forEach(id => byId(id)?.addEventListener('input', calculate));
  byId('includeOtherLiquidCash')?.addEventListener('change', calculate);
  byId('copySummaryBtn')?.addEventListener('click', copySummary);
  byId('downloadCsvBtn')?.addEventListener('click', downloadCsv);
  byId('generateReportBtn')?.addEventListener('click', generateReport);
  window.addEventListener('carrowmont:localechange', () => render(core.calculate(inputState())));

  calculate();
})();
