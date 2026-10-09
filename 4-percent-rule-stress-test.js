(function () {
  'use strict';

  const Core = window.CarrowmontFourPercentCore;
  const Locale = window.CarrowmontLocale;
  if (!Core || !Locale) return;

  const $ = (id) => document.getElementById(id);
  const els = {
    startAge: $('startAge'),
    planUntilAge: $('planUntilAge'),
    startingPortfolio: $('startingPortfolio'),
    startingWithdrawalRate: $('startingWithdrawalRate'),
    firstYearWithdrawal: $('firstYearWithdrawal'),
    inflationRate: $('inflationRate'),
    nominalReturn: $('nominalReturn'),
    validation: $('stressValidation'),
    summaryCards: $('summaryCards'),
    portfolioChart: $('portfolioChart'),
    sequenceChart: $('sequenceChart'),
    sequenceSummary: $('sequenceSummary'),
    returnStrip: $('returnStrip'),
    rateBody: $('rateComparisonBody'),
    annualScenario: $('annualScenarioSelect'),
    annualBody: $('annualTableBody'),
    copyBtn: $('copySummaryBtn'),
    csvBtn: $('downloadCsvBtn'),
    reportBtn: $('generateReportBtn'),
    actionMessage: $('stressActionMessage'),
    portfolioCurrencyNote: $('portfolioCurrencyNote')
  };

  let latestResult = null;
  let syncLock = false;
  let renderTimer = null;

  function currentMode() {
    return document.querySelector('input[name="withdrawalMode"]:checked')?.value === 'amount' ? 'amount' : 'rate';
  }

  function readNumber(element) {
    return Number(element?.value);
  }

  function formatMoney(value, compact = false) {
    return compact
      ? Locale.formatCompactMoney(value, { maximumFractionDigits: 1 })
      : Locale.formatMoney(value, { maximumFractionDigits: 0 });
  }

  function formatPercent(value, digits = 1) {
    return `${(Number(value) * 100).toFixed(digits).replace(/\.0$/, '')}%`;
  }

  function formatSignedPercent(value) {
    const percentage = Number(value) * 100;
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(1).replace(/\.0$/, '')}%`;
  }

  function rawInputs() {
    return {
      startAge: readNumber(els.startAge),
      planUntilAge: readNumber(els.planUntilAge),
      startingPortfolio: readNumber(els.startingPortfolio),
      withdrawalMode: currentMode(),
      startingWithdrawalRate: readNumber(els.startingWithdrawalRate),
      firstYearWithdrawal: readNumber(els.firstYearWithdrawal),
      inflationRate: readNumber(els.inflationRate),
      nominalReturn: readNumber(els.nominalReturn)
    };
  }

  function validate(raw) {
    const messages = [];
    if (!Number.isFinite(raw.startAge) || raw.startAge < 35 || raw.startAge > 90) messages.push('Retirement start age must be between 35 and 90.');
    if (!Number.isFinite(raw.planUntilAge) || raw.planUntilAge < raw.startAge + 10 || raw.planUntilAge > 120) messages.push('Plan-until age must be at least 10 years after retirement and no more than 120.');
    if (!Number.isFinite(raw.startingPortfolio) || raw.startingPortfolio <= 0) messages.push('Starting portfolio must be greater than zero.');
    if (raw.withdrawalMode === 'rate' && (!Number.isFinite(raw.startingWithdrawalRate) || raw.startingWithdrawalRate < 0.5 || raw.startingWithdrawalRate > 10)) messages.push('Starting withdrawal rate must be between 0.5% and 10%.');
    if (raw.withdrawalMode === 'amount' && (!Number.isFinite(raw.firstYearWithdrawal) || raw.firstYearWithdrawal < 0 || raw.firstYearWithdrawal > raw.startingPortfolio)) messages.push('First-year withdrawal must be between zero and the starting portfolio.');
    if (!Number.isFinite(raw.inflationRate) || raw.inflationRate < -2 || raw.inflationRate > 15) messages.push('Inflation must be between -2% and 15%.');
    if (!Number.isFinite(raw.nominalReturn) || raw.nominalReturn < -10 || raw.nominalReturn > 20) messages.push('Nominal return must be between -10% and 20%.');
    return messages;
  }

  function syncWithdrawalFields(source) {
    if (syncLock) return;
    syncLock = true;
    const portfolio = Math.max(0, readNumber(els.startingPortfolio) || 0);
    const mode = currentMode();
    if (mode === 'rate' || source === 'rate' || source === 'portfolio') {
      const rate = Math.max(0, readNumber(els.startingWithdrawalRate) || 0) / 100;
      els.firstYearWithdrawal.value = String(Math.round(portfolio * rate));
    } else {
      const amount = Math.max(0, readNumber(els.firstYearWithdrawal) || 0);
      els.startingWithdrawalRate.value = portfolio > 0 ? (amount / portfolio * 100).toFixed(2).replace(/0+$/, '').replace(/\.$/, '') : '0';
    }
    els.startingWithdrawalRate.readOnly = mode === 'amount';
    els.firstYearWithdrawal.readOnly = mode === 'rate';
    syncLock = false;
  }

  function setActionMessage(message, isError = false) {
    els.actionMessage.textContent = message || '';
    els.actionMessage.style.color = isError ? '#a93c35' : '';
    if (message) window.setTimeout(() => {
      if (els.actionMessage.textContent === message) els.actionMessage.textContent = '';
    }, 5000);
  }

  function scenarioHeadline(scenario) {
    return scenario.depletionYear
      ? `Depletes at age ${scenario.depletionAge}`
      : 'Lasts through the selected horizon';
  }

  function renderSummaryCards(result) {
    ['base', 'cautious', 'adverse'].forEach((key) => {
      const card = els.summaryCards.querySelector(`[data-scenario-card="${key}"]`);
      const scenario = result[key];
      card.querySelector('strong').textContent = scenarioHeadline(scenario);
      card.querySelector('small').textContent = scenario.depletionYear
        ? `${formatMoney(scenario.totalWithdrawalsNominal)} funded before depletion.`
        : `${formatMoney(scenario.endingBalanceReal)} remains in today's money.`;
      let metrics = card.querySelector('.stress-summary-metrics');
      if (!metrics) {
        metrics = document.createElement('div');
        metrics.className = 'stress-summary-metrics';
        card.appendChild(metrics);
      }
      metrics.innerHTML = `
        <span>Nominal ending balance: <b>${formatMoney(scenario.endingBalanceNominal)}</b></span>
        <span>Total withdrawals funded: <b>${formatMoney(scenario.totalWithdrawalsNominal)}</b></span>
        <span>Final scheduled withdrawal: <b>${formatMoney(scenario.finalScheduledWithdrawal)}</b></span>`;
    });
  }

  const SVG_NS = 'http://www.w3.org/2000/svg';
  function svgEl(name, attrs = {}, text = '') {
    const node = document.createElementNS(SVG_NS, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    if (text) node.textContent = text;
    return node;
  }

  function pointSeries(scenario, assumptions) {
    return [
      { year: 0, age: assumptions.startAge, value: assumptions.startingPortfolio, depleted: false },
      ...scenario.annualRows.map((row) => ({ year: row.year, age: row.age + 1, value: row.closingBalance, depleted: row.depleted }))
    ];
  }

  function renderLineChart(svg, seriesConfig, assumptions, options = {}) {
    const width = 760, height = 380;
    const margin = { left: 74, right: 36, top: 30, bottom: 54 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;
    const allValues = seriesConfig.flatMap((series) => series.points.map((point) => point.value));
    const maximum = Math.max(1, ...allValues);
    const yMax = maximum * 1.12;
    const xMax = Math.max(1, assumptions.horizonYears);
    const x = (year) => margin.left + (year / xMax) * plotW;
    const y = (value) => margin.top + plotH - (Math.max(0, value) / yMax) * plotH;

    svg.replaceChildren();
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    for (let i = 0; i <= 4; i += 1) {
      const ratio = i / 4;
      const yValue = yMax * (1 - ratio);
      const yPos = margin.top + plotH * ratio;
      svg.appendChild(svgEl('line', { x1: margin.left, y1: yPos, x2: width - margin.right, y2: yPos, class: 'grid-line' }));
      svg.appendChild(svgEl('text', { x: margin.left - 10, y: yPos + 4, 'text-anchor': 'end' }, formatMoney(yValue, true)));
    }

    const tickYears = [...new Set([0, Math.min(10, xMax), Math.min(20, xMax), xMax])].sort((a, b) => a - b);
    tickYears.forEach((year) => {
      const xPos = x(year);
      svg.appendChild(svgEl('line', { x1: xPos, y1: margin.top, x2: xPos, y2: margin.top + plotH, class: 'grid-line' }));
      svg.appendChild(svgEl('text', { x: xPos, y: height - 23, 'text-anchor': 'middle' }, year === 0 ? `Age ${assumptions.startAge}` : `Age ${assumptions.startAge + year}`));
    });
    svg.appendChild(svgEl('line', { x1: margin.left, y1: margin.top + plotH, x2: width - margin.right, y2: margin.top + plotH, class: 'axis-line' }));
    svg.appendChild(svgEl('line', { x1: margin.left, y1: margin.top, x2: margin.left, y2: margin.top + plotH, class: 'axis-line' }));

    function addLabel(point, label, color, dx, dy) {
      const px = x(point.year), py = y(point.value);
      const text = `${label}: ${formatMoney(point.value, true)}`;
      const boxW = Math.max(96, Math.min(170, text.length * 6.1));
      let bx = px + dx;
      let by = py + dy;
      bx = Math.max(margin.left + 3, Math.min(width - margin.right - boxW - 2, bx));
      by = Math.max(6, Math.min(height - margin.bottom - 28, by));
      svg.appendChild(svgEl('rect', { x: bx, y: by, width: boxW, height: 24, rx: 6, class: 'chart-label-bg' }));
      svg.appendChild(svgEl('text', { x: bx + 8, y: by + 16, class: 'chart-label-text' }, text));
      svg.appendChild(svgEl('circle', { cx: px, cy: py, r: 4.5, fill: color, class: 'chart-point' }));
    }

    seriesConfig.forEach((series, index) => {
      const d = series.points.map((point, pointIndex) => `${pointIndex ? 'L' : 'M'} ${x(point.year).toFixed(2)} ${y(point.value).toFixed(2)}`).join(' ');
      svg.appendChild(svgEl('path', { d, class: `series-path ${series.className}` }));
      const finalPoint = series.points.find((point) => point.depleted) || series.points[series.points.length - 1];
      addLabel(finalPoint, series.shortLabel, series.color, index % 2 ? -135 : 10, -30 + index * 25);
    });

    if (options.baseCheckpoints && seriesConfig[0]) {
      [10, 20].filter((year) => year < xMax).forEach((year, index) => {
        const point = seriesConfig[0].points.find((candidate) => candidate.year === year);
        if (point) addLabel(point, `Base age ${assumptions.startAge + year}`, seriesConfig[0].color, index ? -148 : 10, index ? 10 : -34);
      });
    }
  }

  function renderCharts(result) {
    const assumptions = result.assumptions;
    renderLineChart(els.portfolioChart, [
      { shortLabel: 'Base', className: 'base-path', color: '#0e827a', points: pointSeries(result.base, assumptions) },
      { shortLabel: 'Cautious', className: 'cautious-path', color: '#c17b1f', points: pointSeries(result.cautious, assumptions) },
      { shortLabel: 'Adverse', className: 'adverse-path', color: '#a94848', points: pointSeries(result.adverse, assumptions) }
    ], assumptions, { baseCheckpoints: true });

    renderLineChart(els.sequenceChart, [
      { shortLabel: 'Weak-first', className: 'weak-path', color: '#9c3f54', points: pointSeries(result.sequenceComparison.weakFirst, assumptions) },
      { shortLabel: 'Strong-first', className: 'strong-path', color: '#315f9b', points: pointSeries(result.sequenceComparison.strongFirst, assumptions) }
    ], assumptions);
  }

  function renderSequence(result) {
    const weak = result.sequenceComparison.weakFirst;
    const strong = result.sequenceComparison.strongFirst;
    const difference = strong.endingBalanceNominal - weak.endingBalanceNominal;
    els.sequenceSummary.textContent = difference >= 0
      ? `With the selected withdrawals, the strong-first order ends with ${formatMoney(difference)} more than the weak-first order. The ten return values are identical; only their order changes.`
      : `Under these inputs, the weak-first path ends with ${formatMoney(Math.abs(difference))} more. Review the annual table: depletion timing and a short horizon can occasionally alter the usual pattern.`;
    els.returnStrip.innerHTML = result.sequenceComparison.normalizedReturns
      .map((rate, index) => `<span class="${rate < 0 ? 'negative' : ''}" title="Year ${index + 1}">${formatSignedPercent(rate)}</span>`)
      .join('');
  }

  function renderRateComparison(result) {
    els.rateBody.innerHTML = result.rateComparison.map((row) => `
      <tr>
        <td class="stress-table-rate">${formatPercent(row.rate)}</td>
        <td>${formatMoney(row.firstYearWithdrawal)}</td>
        <td class="${row.depletionAge ? 'stress-status-depleted' : 'stress-status-good'}">${row.depletionAge ? `Depletes at age ${row.depletionAge}` : 'Lasts through horizon'}</td>
        <td>${formatMoney(row.endingBalanceReal)}</td>
      </tr>`).join('');
  }

  function scenarioByKey(result, key) {
    if (key === 'weakFirst' || key === 'strongFirst') return result.sequenceComparison[key];
    return result[key] || result.base;
  }

  function renderAnnualTable(result) {
    const scenario = scenarioByKey(result, els.annualScenario.value);
    els.annualBody.innerHTML = scenario.annualRows.map((row) => `
      <tr data-depleted="${row.depleted}">
        <td>${row.year}</td><td>${row.age}</td><td>${formatMoney(row.openingBalance)}</td>
        <td>${formatMoney(row.withdrawal)}</td><td>${formatPercent(row.inflationRate)}</td>
        <td>${formatSignedPercent(row.returnRate)}</td><td>${formatMoney(row.investmentGrowth)}</td>
        <td>${formatMoney(row.closingBalance)}</td><td>${row.status}</td>
      </tr>`).join('');
  }

  function updateLocaleText() {
    els.portfolioCurrencyNote.textContent = `Entered in ${Locale.getCurrency()} · ${Locale.currencies[Locale.getCurrency()]?.label || 'selected currency'}`;
    const footerLink = document.querySelector('.footer-investment-link');
    if (footerLink) footerLink.textContent = Locale.getRegion() === 'IN' ? 'SIP Calculator' : 'Recurring Investment Calculator';
  }

  function render() {
    syncWithdrawalFields(currentMode() === 'amount' ? 'amount' : 'rate');
    const raw = rawInputs();
    const messages = validate(raw);
    els.validation.textContent = messages[0] || '';
    if (messages.length) return;
    latestResult = Core.calculate(raw);
    renderSummaryCards(latestResult);
    renderCharts(latestResult);
    renderSequence(latestResult);
    renderRateComparison(latestResult);
    renderAnnualTable(latestResult);
    updateLocaleText();
  }

  function scheduleRender() {
    window.clearTimeout(renderTimer);
    renderTimer = window.setTimeout(render, 90);
  }

  function summaryText(result) {
    const a = result.assumptions;
    const lines = [
      'Carrowmont 4% Rule Stress Test',
      `Starting portfolio: ${formatMoney(a.startingPortfolio)}`,
      `Starting withdrawal: ${formatPercent(a.startingWithdrawalRate)} (${formatMoney(a.firstYearWithdrawal)} in year 1)`,
      `Retirement horizon: age ${a.startAge} to ${a.planUntilAge} (${a.horizonYears} years)`,
      `Inflation assumption: ${formatPercent(a.inflationRate)}`,
      `Long-run nominal return assumption: ${formatPercent(a.nominalReturn)}`,
      '',
      `Base: ${result.base.status}; ending balance ${formatMoney(result.base.endingBalanceNominal)} nominal / ${formatMoney(result.base.endingBalanceReal)} in today's money.`,
      `Cautious: ${result.cautious.status}; ending balance ${formatMoney(result.cautious.endingBalanceNominal)} nominal / ${formatMoney(result.cautious.endingBalanceReal)} in today's money.`,
      `Adverse early sequence: ${result.adverse.status}; ending balance ${formatMoney(result.adverse.endingBalanceNominal)} nominal / ${formatMoney(result.adverse.endingBalanceReal)} in today's money.`,
      '',
      'Sequence comparison: weak-first and strong-first use the same ten annual return values in reverse order. Withdrawals make the order matter.',
      'Educational deterministic illustration only; not a forecast, probability model or individualized recommendation.',
      'https://carrowmont.com/4-percent-rule-stress-test.html'
    ];
    return lines.join('\n');
  }

  async function copySummary() {
    if (!latestResult) return;
    try {
      await navigator.clipboard.writeText(summaryText(latestResult));
      setActionMessage('Summary copied.');
    } catch (_) {
      const area = document.createElement('textarea');
      area.value = summaryText(latestResult);
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      setActionMessage('Summary copied.');
    }
  }

  function csvEscape(value) {
    const string = String(value ?? '');
    return /[",\n]/.test(string) ? `"${string.replace(/"/g, '""')}"` : string;
  }

  function downloadCsv() {
    if (!latestResult) return;
    const a = latestResult.assumptions;
    const lines = [
      ['Carrowmont 4% Rule Stress Test'],
      ['Generated at', latestResult.generatedAt],
      ['Methodology version', latestResult.methodologyVersion],
      ['Currency', Locale.getCurrency()],
      ['Starting portfolio', a.startingPortfolio],
      ['Starting withdrawal rate', a.startingWithdrawalRate],
      ['First-year withdrawal', a.firstYearWithdrawal],
      ['Retirement start age', a.startAge],
      ['Plan until age', a.planUntilAge],
      ['Inflation rate', a.inflationRate],
      ['Nominal return', a.nominalReturn],
      [],
      ['Scenario','Year','Age','Opening balance','Scheduled withdrawal','Withdrawal funded','Inflation rate','Return rate','Investment growth/loss','Closing balance','Status']
    ];
    const scenarios = [
      ['Base', latestResult.base],
      ['Cautious', latestResult.cautious],
      ['Adverse', latestResult.adverse],
      ['Weak-first', latestResult.sequenceComparison.weakFirst],
      ['Strong-first', latestResult.sequenceComparison.strongFirst]
    ];
    scenarios.forEach(([name, scenario]) => scenario.annualRows.forEach((row) => lines.push([
      name,row.year,row.age,row.openingBalance,row.scheduledWithdrawal,row.withdrawal,row.inflationRate,row.returnRate,row.investmentGrowth,row.closingBalance,row.status
    ])));
    const csv = lines.map((line) => line.map(csvEscape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'carrowmont-4-percent-rule-stress-test.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
    setActionMessage('Annual data CSV has been downloaded.');
  }

  async function generateReport() {
    if (!latestResult || !window.CarrowmontFourPercentPdf) return;
    els.reportBtn.disabled = true;
    els.reportBtn.textContent = 'Generating Report…';
    try {
      await window.CarrowmontFourPercentPdf.generate(latestResult, {
        portfolioSvg: els.portfolioChart,
        sequenceSvg: els.sequenceChart,
        currency: Locale.getCurrency()
      });
      setActionMessage('Report has been downloaded.');
    } catch (error) {
      console.error(error);
      setActionMessage('The report could not be generated. Please try again.', true);
    } finally {
      els.reportBtn.disabled = false;
      els.reportBtn.textContent = 'Generate Stress Test Report';
    }
  }

  document.querySelectorAll('input[name="withdrawalMode"]').forEach((input) => input.addEventListener('change', () => {
    syncWithdrawalFields(input.value === 'amount' ? 'amount' : 'rate');
    scheduleRender();
  }));
  els.startingPortfolio.addEventListener('input', () => { syncWithdrawalFields('portfolio'); scheduleRender(); });
  els.startingWithdrawalRate.addEventListener('input', () => { if (currentMode() === 'rate') syncWithdrawalFields('rate'); scheduleRender(); });
  els.firstYearWithdrawal.addEventListener('input', () => { if (currentMode() === 'amount') syncWithdrawalFields('amount'); scheduleRender(); });
  [els.startAge, els.planUntilAge, els.inflationRate, els.nominalReturn].forEach((element) => element.addEventListener('input', scheduleRender));
  els.annualScenario.addEventListener('change', () => latestResult && renderAnnualTable(latestResult));
  els.copyBtn.addEventListener('click', copySummary);
  els.csvBtn.addEventListener('click', downloadCsv);
  els.reportBtn.addEventListener('click', generateReport);
  window.addEventListener('carrowmont:localechange', () => { updateLocaleText(); scheduleRender(); });

  syncWithdrawalFields('rate');
  updateLocaleText();
  render();
})();
