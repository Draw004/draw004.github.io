(() => {
  'use strict';

  const Core = window.CarrowmontHomeAffordabilityCore;
  const Locale = window.CarrowmontLocale;
  if (!Core || !Locale) return;

  const $ = id => document.getElementById(id);
  const els = {
    income:$('takeHomeIncome'), essentials:$('essentialSpending'), debt:$('existingDebt'), savings:$('protectedSavings'), buffer:$('freeBuffer'),
    deposit:$('deposit'), target:$('targetHomePrice'), rate:$('annualRate'), term:$('termYears'), ownership:$('ownershipCosts'), gross:$('grossAnnualIncome'),
    higherEnabled:$('higherRateEnabled'), higherRate:$('higherRate'), errors:$('home1Errors'), calculate:$('calculateBtn'), reset:$('resetBtn'),
    resultKicker:$('home1ResultKicker'), resultTitle:$('home1ResultsTitle'), headline:$('headlineValue'), headlineExplanation:$('headlineExplanation'), verdict:$('bufferVerdict'),
    loan:$('loanAmount'), payment:$('monthlyPayment'), allIn:$('allInHousing'), leftover:$('monthlyLeftover'), depositResult:$('depositResult'), bufferResult:$('bufferResult'), grossContext:$('grossIncomeContext'),
    cashflowTotal:$('cashflowTotal'), cashflowBar:$('cashflowBar'), cashflowLegend:$('cashflowLegend'), cashflowShortfall:$('cashflowShortfall'),
    rateCard:$('rateCard'), rateBody:$('rateTableBody'), rateHomeHeading:$('rateHomeHeading'), warningCard:$('warningCard'), warningList:$('warningList'),
    copy:$('copySummaryBtn'), csv:$('downloadCsvBtn'), report:$('generateReportBtn'), message:$('actionMessage')
  };

  const defaults = Object.freeze({
    mode:'budget', takeHomeIncome:150000, essentialSpending:60000, existingDebt:10000, protectedSavings:20000,
    freeBuffer:15000, deposit:2000000, targetHomePrice:6000000, annualRate:8.5, termYears:20, ownershipCosts:8000,
    grossAnnualIncome:0, higherRateEnabled:true, higherRate:10.5
  });

  let lastResult = null;
  let higherRateUserEdited = false;

  function identity(region = Locale.getRegion()) {
    const common = { income:'Monthly take-home household income' };
    if (region === 'IN') return { ...common, product:'Home Loan Affordability Calculator', deposit:'Down payment available', loan:'Estimated home-loan amount', payment:'Modeled EMI / repayment', term:'Tenure' };
    if (region === 'US') return { ...common, product:'Home Affordability Calculator', deposit:'Down payment available', loan:'Estimated mortgage amount', payment:'Modeled mortgage payment', term:'Loan term' };
    if (region === 'CA') return { ...common, product:'Mortgage Affordability Calculator', deposit:'Down payment available', loan:'Estimated mortgage amount', payment:'Modeled mortgage payment', term:'Amortization' };
    if (region === 'GB' || region === 'IE') return { income:'Monthly net household income', product:'Mortgage Affordability Calculator — How Much Can I Borrow?', deposit:'Deposit available', loan:'Estimated mortgage amount', payment:'Modeled mortgage repayment', term:'Mortgage term' };
    if (region === 'AU' || region === 'NZ') return { income:'Monthly after-tax household income', product:'Home Loan Borrowing Power Calculator', deposit:'Deposit available', loan:'Estimated home-loan amount', payment:'Modeled home-loan repayment', term:'Loan term' };
    return { ...common, product:'Home Affordability & Mortgage Calculator', deposit:'Deposit / down payment available', loan:'Estimated mortgage / home-loan amount', payment:'Modeled repayment', term:'Loan term' };
  }

  function applyIdentity() {
    const copy = identity();
    document.querySelectorAll('[data-home1-product-label]').forEach(n => { n.textContent = copy.product; });
    document.querySelectorAll('[data-home1-income-label]').forEach(n => { n.textContent = copy.income; });
    document.querySelectorAll('[data-home1-deposit-label]').forEach(n => { n.textContent = copy.deposit; });
    document.querySelectorAll('[data-home1-loan-label]').forEach(n => { n.textContent = copy.loan; });
    document.querySelectorAll('[data-home1-payment-label]').forEach(n => { n.textContent = copy.payment; });
    document.querySelectorAll('[data-home1-term-label]').forEach(n => { n.textContent = copy.term; });
  }

  function mode() { return document.querySelector('input[name="home1Mode"]:checked')?.value === 'target' ? 'target' : 'budget'; }
  function number(el) { return Number(el?.value); }

  function inputs() {
    return {
      mode:mode(), takeHomeIncome:number(els.income), essentialSpending:number(els.essentials), existingDebt:number(els.debt),
      protectedSavings:number(els.savings), freeBuffer:number(els.buffer), deposit:number(els.deposit), targetHomePrice:number(els.target),
      annualRate:number(els.rate), termYears:number(els.term), ownershipCosts:number(els.ownership), grossAnnualIncome:number(els.gross),
      higherRateEnabled:els.higherEnabled.checked, higherRate:number(els.higherRate)
    };
  }

  function formatMoney(value, maxDigits = 0) { return Locale.formatMoney(Number.isFinite(value) ? value : 0, { maximumFractionDigits:maxDigits }); }
  function roundHeadline(value) {
    const n = Math.max(0, Number(value) || 0);
    const step = n >= 1e7 ? 10000 : n >= 1e6 ? 5000 : n >= 1e5 ? 1000 : n >= 1e4 ? 100 : 10;
    return Math.round(n / step) * step;
  }
  function headlineMoney(value) { return formatMoney(roundHeadline(value), 0); }
  function formatRate(value) { return `${Number(value).toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1')}%`; }

  function clearInvalid() { document.querySelectorAll('.home1-field input[aria-invalid="true"]').forEach(el => el.setAttribute('aria-invalid','false')); }
  function showErrors(errors) {
    clearInvalid();
    if (!errors.length) { els.errors.hidden = true; els.errors.innerHTML = ''; return; }
    errors.forEach(err => { const el = $(err.field); if (el) el.setAttribute('aria-invalid','true'); });
    els.errors.innerHTML = `<strong>Please check these inputs:</strong><ul>${errors.map(e=>`<li>${e.message}</li>`).join('')}</ul>`;
    els.errors.hidden = false;
  }

  function renderCashFlow(result) {
    const c = result.cashFlow;
    const positiveLeftover = Math.max(0, c.leftover);
    const items = [
      ['Essentials', c.essentials, 'home1-seg-essentials'],
      ['Existing debt', c.debt, 'home1-seg-debt'],
      ['Protected savings', c.protectedSavings, 'home1-seg-savings'],
      ['Housing', c.housing, 'home1-seg-housing'],
      ['Money left', positiveLeftover, 'home1-seg-leftover']
    ];
    const committed = c.essentials + c.debt + c.protectedSavings + c.housing;
    const scale = Math.max(c.income, committed, 1);
    els.cashflowBar.innerHTML = items.filter(i=>i[1] > 0).map(([label,value,cls]) => `<span class="${cls}" style="width:${Math.max(0,value/scale*100).toFixed(4)}%" title="${label}: ${formatMoney(value)}"></span>`).join('');
    els.cashflowBar.setAttribute('aria-label', `Monthly income ${formatMoney(c.income)}. Essentials ${formatMoney(c.essentials)}. Existing debt ${formatMoney(c.debt)}. Protected savings ${formatMoney(c.protectedSavings)}. Housing ${formatMoney(c.housing)}. Money left ${formatMoney(c.leftover)}. Chosen buffer ${formatMoney(c.chosenBuffer)}.`);
    els.cashflowLegend.innerHTML = items.map(([label,value])=>`<div><span>${label}</span><b>${formatMoney(value)}</b></div>`).join('') + `<div><span>Chosen buffer</span><b>${formatMoney(c.chosenBuffer)}</b></div>`;
    els.cashflowTotal.textContent = `Income ${formatMoney(c.income)}`;
    if (c.shortfall > 0) { els.cashflowShortfall.hidden = false; els.cashflowShortfall.textContent = `The entered commitments exceed monthly take-home income by ${formatMoney(c.shortfall)}.`; }
    else els.cashflowShortfall.hidden = true;
  }

  function targetFitText(s, buffer) {
    if (s.fitsBuffer) return `Fits chosen buffer (+${formatMoney(Math.max(0,s.bufferDifference))})`;
    return `Uses ${formatMoney(Math.abs(s.bufferDifference))} of chosen buffer`;
  }

  function renderRateTable(result) {
    const isTarget = result.assumptions.mode === 'target';
    els.rateCard.hidden = !result.higherRate;
    if (!result.higherRate) return;
    els.rateHomeHeading.textContent = isTarget ? 'Target fit' : 'Home price';
    const rows = [['Entered assumptions', result.base], ['Higher-rate check', result.higherRate]];
    els.rateBody.innerHTML = rows.map(([name,s]) => `<tr><td>${name}</td><td>${formatRate(s.annualRate)}</td><td>${formatMoney(s.payment)}</td><td>${isTarget ? targetFitText(s,result.assumptions.freeBuffer) : headlineMoney(s.homePrice)}</td><td>${formatMoney(s.monthlyLeftover)}</td></tr>`).join('');
  }

  function renderWarnings(result) {
    els.warningCard.hidden = !result.warnings.length;
    els.warningList.innerHTML = result.warnings.map(w=>`<li>${w}</li>`).join('');
  }

  function renderResult(result) {
    const a = result.assumptions, b = result.base, isTarget = a.mode === 'target';
    const copy = identity();
    if (isTarget) {
      els.resultKicker.textContent = 'TARGET HOME CHECK';
      els.resultTitle.textContent = b.fitsBuffer ? 'Fits the monthly buffer you chose' : 'Would use part of the buffer you said you want to keep';
      els.headline.textContent = headlineMoney(a.targetHomePrice);
      els.headlineExplanation.textContent = `At ${formatRate(a.annualRate)} over ${a.termYears} years, the modeled ${copy.payment.toLowerCase()} is ${formatMoney(b.payment)} before other ownership costs.`;
      els.verdict.textContent = b.fitsBuffer ? `Leaves ${formatMoney(b.monthlyLeftover)} after entered commitments` : `Leaves ${formatMoney(b.monthlyLeftover)} versus your ${formatMoney(a.freeBuffer)} chosen buffer`;
      els.verdict.classList.toggle('home1-verdict-warn', !b.fitsBuffer);
    } else {
      els.resultKicker.textContent = 'PLANNING HOME PRICE';
      els.resultTitle.textContent = 'Planning home price based on your chosen monthly buffer';
      els.headline.textContent = headlineMoney(b.homePrice);
      els.headlineExplanation.textContent = `This price is produced by the income, spending, savings, buffer, ${copy.deposit.toLowerCase()}, rate and costs you entered. It is not lender approval.`;
      els.verdict.textContent = b.paymentBudget > 0 ? `Keeps your ${formatMoney(a.freeBuffer)} monthly buffer under the entered assumptions` : 'No monthly room is left for a principal-and-interest payment under these inputs';
      els.verdict.classList.toggle('home1-verdict-warn', b.paymentBudget <= 0);
    }
    els.loan.textContent = formatMoney(b.loanAmount);
    els.payment.textContent = formatMoney(b.payment);
    els.allIn.textContent = formatMoney(b.allInHousingCost);
    els.leftover.textContent = formatMoney(b.monthlyLeftover);
    els.depositResult.textContent = formatMoney(a.deposit);
    els.bufferResult.textContent = formatMoney(a.freeBuffer);
    if (b.incomeMultiple != null) {
      els.grossContext.hidden = false;
      els.grossContext.textContent = `Context only: the modeled loan is ${b.incomeMultiple.toFixed(2)}× the gross annual household income you entered. This does not change the affordability result or estimate lender approval.`;
    } else {
      els.grossContext.hidden = true;
      els.grossContext.textContent = '';
    }
    renderCashFlow(result);
    renderRateTable(result);
    renderWarnings(result);
    els.copy.disabled = false; els.csv.disabled = false; els.report.disabled = false;
  }

  function render() {
    const result = Core.calculate(inputs());
    if (!result.ok) {
      lastResult = null; window.__carrowmontHomeAffordabilityLastResult = null;
      showErrors(result.errors);
      els.headline.textContent = '—'; els.verdict.textContent = 'Correct the highlighted inputs to update the plan.';
      els.copy.disabled = true; els.csv.disabled = true; els.report.disabled = true;
      return;
    }
    showErrors([]);
    lastResult = result; window.__carrowmontHomeAffordabilityLastResult = result;
    renderResult(result);
  }

  function syncMode() {
    const isTarget = mode() === 'target';
    document.querySelectorAll('.home1-target-field').forEach(el => { el.hidden = !isTarget; });
    render();
  }

  function setDefaults() {
    document.querySelector(`input[name="home1Mode"][value="${defaults.mode}"]`).checked = true;
    els.income.value=defaults.takeHomeIncome; els.essentials.value=defaults.essentialSpending; els.debt.value=defaults.existingDebt; els.savings.value=defaults.protectedSavings;
    els.buffer.value=defaults.freeBuffer; els.deposit.value=defaults.deposit; els.target.value=defaults.targetHomePrice; els.rate.value=defaults.annualRate; els.term.value=defaults.termYears;
    els.ownership.value=defaults.ownershipCosts; els.gross.value=defaults.grossAnnualIncome; els.higherEnabled.checked=defaults.higherRateEnabled; els.higherRate.value=defaults.higherRate;
    higherRateUserEdited=false; syncMode();
  }

  function summaryText() {
    if (!lastResult) return '';
    const a=lastResult.assumptions,b=lastResult.base,copy=identity();
    const lines = [
      `Carrowmont ${copy.product} result`,
      `Mode: ${a.mode === 'target' ? 'Check a home price' : 'What home price may fit my budget?'}`,
      `${a.mode === 'target' ? 'Target home price' : 'Planning home price'}: ${formatMoney(b.homePrice)}`,
      `${copy.deposit}: ${formatMoney(a.deposit)}`,
      `${copy.loan}: ${formatMoney(b.loanAmount)}`,
      `Interest rate: ${formatRate(a.annualRate)}`,
      `${copy.term}: ${a.termYears} years`,
      `${copy.payment}: ${formatMoney(b.payment)}`,
      `Other monthly ownership costs entered: ${formatMoney(a.ownershipCosts)}`,
      `All-in monthly housing cost: ${formatMoney(b.allInHousingCost)}`,
      `Monthly amount left: ${formatMoney(b.monthlyLeftover)}`,
      `Chosen monthly buffer: ${formatMoney(a.freeBuffer)}`,
      `Difference vs chosen buffer: ${formatMoney(b.bufferDifference)}`
    ];
    if (b.incomeMultiple != null) lines.push(`Modeled loan as a gross-income multiple: ${b.incomeMultiple.toFixed(2)}x (context only)`);
    if (lastResult.higherRate) lines.push(`Higher-rate check at ${formatRate(lastResult.higherRate.annualRate)}: ${a.mode==='target' ? targetFitText(lastResult.higherRate,a.freeBuffer) : `planning home price ${formatMoney(lastResult.higherRate.homePrice)}`}`);
    lastResult.warnings.forEach(w=>lines.push(`Note: ${w}`));
    lines.push('Household planning estimate, not lender approval.');
    return lines.join('\n');
  }

  async function copySummary() {
    if (!lastResult) return;
    const text = summaryText();
    try { await navigator.clipboard.writeText(text); els.message.textContent='Summary copied.'; }
    catch { els.message.textContent='Could not copy automatically. Please try again.'; }
  }

  function csvEscape(value) { const s=String(value ?? ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s; }
  function downloadCsv() {
    if (!lastResult) return;
    const a=lastResult.assumptions, rows=[
      ['Carrowmont Home Affordability Calculator'],
      ['Methodology version',lastResult.methodologyVersion],
      ['Mode',a.mode],
      [],
      ['Scenario','Interest rate','Home price','Deposit / down payment','Loan amount','Principal and interest payment','Other monthly ownership costs','All-in monthly housing cost','Monthly leftover','Chosen monthly buffer','Difference vs buffer']
    ];
    const addScenario=(name,s)=>rows.push([name,s.annualRate,s.homePrice,a.deposit,s.loanAmount,s.payment,a.ownershipCosts,s.allInHousingCost,s.monthlyLeftover,a.freeBuffer,s.bufferDifference]);
    addScenario('Entered assumptions',lastResult.base); if(lastResult.higherRate)addScenario('Higher-rate check',lastResult.higherRate);
    rows.push([],['Household planning estimate, not lender approval.']);
    const csv=rows.map(row=>row.map(csvEscape).join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})), link=document.createElement('a');
    link.href=url; link.download='carrowmont-home-affordability.csv'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url),5000);
    els.message.textContent='CSV has been downloaded.';
  }

  async function generateReport() {
    if (!lastResult || !window.CarrowmontHomeAffordabilityPdfRenderer) return;
    els.message.textContent='Preparing report…';
    try {
      await window.CarrowmontHomeAffordabilityPdfRenderer.generate({ result:lastResult, identity:identity(), currency:Locale.getCurrency(), locale:Locale.getLocale() });
      els.message.textContent='Report has been downloaded.';
    } catch (error) {
      console.error(error); els.message.textContent='Could not generate the report. Please try again.';
    }
  }

  document.querySelectorAll('input[name="home1Mode"]').forEach(el=>el.addEventListener('change',syncMode));
  [els.income,els.essentials,els.debt,els.savings,els.buffer,els.deposit,els.target,els.term,els.ownership,els.gross].forEach(el=>el.addEventListener('input',render));
  els.rate.addEventListener('input',()=>{ if(!higherRateUserEdited){const v=Number(els.rate.value);if(Number.isFinite(v))els.higherRate.value=(v+2).toFixed(2).replace(/\.00$/,'');} render(); });
  els.higherEnabled.addEventListener('change',()=>{els.higherRate.disabled=!els.higherEnabled.checked;render();});
  els.higherRate.addEventListener('input',()=>{higherRateUserEdited=true;render();});
  els.calculate.addEventListener('click',render); els.reset.addEventListener('click',setDefaults); els.copy.addEventListener('click',copySummary); els.csv.addEventListener('click',downloadCsv); els.report.addEventListener('click',generateReport);
  window.addEventListener('carrowmont:localechange',()=>{applyIdentity();render();});

  applyIdentity(); els.higherRate.disabled=!els.higherEnabled.checked; syncMode();
})();
