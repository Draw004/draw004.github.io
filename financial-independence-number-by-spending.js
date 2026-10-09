(function () {
  'use strict';

  const Core = window.CarrowmontFINumberBySpendingCore;
  const Locale = window.CarrowmontLocale;
  if (!Core || !Locale) return;

  const $ = (id) => document.getElementById(id);
  const els = {
    localeMenu: $('localeMenu'), regionSelect: $('regionSelect'), currencySelect: $('currencySelect'), localeDoneBtn: $('localeDoneBtn'),
    localeCountryLabel: $('localeCountryLabel'), localeCurrencyLabel: $('localeCurrencyLabel'),
    portfolioSpending: $('portfolioSpending'), withdrawalRate: $('withdrawalRate'), yearsUntilFi: $('yearsUntilFi'), inflationRate: $('inflationRate'), spendingHelp: $('spendingHelp'),
    validation: $('fiqValidation'), annualSpendingValue: $('annualSpendingValue'), fiTodayValue: $('fiTodayValue'), fiTodayNote: $('fiTodayNote'), multipleValue: $('multipleValue'),
    futureCardLabel: $('futureCardLabel'), fiFutureValue: $('fiFutureValue'), fiFutureNote: $('fiFutureNote'), interpretationText: $('interpretationText'),
    rateBody: $('rateComparisonBody'), spendingBody: $('spendingSensitivityBody'), chart: $('sensitivityChart'), chartRateLabel: $('chartRateLabel'),
    copyBtn: $('copySummaryBtn'), csvBtn: $('downloadCsvBtn'), reportBtn: $('generateReportBtn'), actionMessage: $('fiqActionMessage'),
    fullPlannerCta: $('fullPlannerCta'), fullPlannerCard: $('fullPlannerCard')
  };

  let latestResult = null;
  let pendingRegion = Locale.getRegion();
  let pendingCurrency = Locale.getCurrency();
  let renderTimer = null;

  function currentView() {
    return document.querySelector('input[name="spendingView"]:checked')?.value === 'annual' ? 'annual' : 'monthly';
  }
  function num(el) { return Number(el?.value); }
  function money(value, compact = false) {
    return compact ? Locale.formatCompactMoney(value, { maximumFractionDigits: 1 }) : Locale.formatMoney(value, { maximumFractionDigits: 0 });
  }
  function percent(decimal, digits = 1) {
    return `${(Number(decimal) * 100).toFixed(digits)}`.replace(/\.0$/, '') + '%';
  }
  function multiple(value) {
    const n = Number(value) || 0;
    return `${n.toFixed(n >= 100 ? 0 : 2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')}×`;
  }
  function rawInputs() {
    return {
      view: currentView(),
      spending: num(els.portfolioSpending),
      withdrawalRate: num(els.withdrawalRate),
      yearsUntilFi: num(els.yearsUntilFi),
      inflationRate: num(els.inflationRate)
    };
  }
  function validate(raw) {
    const messages = [];
    if (!Number.isFinite(raw.spending) || raw.spending < 0) messages.push('Portfolio-funded spending must be zero or greater.');
    if (!Number.isFinite(raw.withdrawalRate) || raw.withdrawalRate < 2 || raw.withdrawalRate > 8) messages.push('Planning withdrawal rate must be between 2.0% and 8.0%.');
    if (!Number.isFinite(raw.yearsUntilFi) || raw.yearsUntilFi < 0 || raw.yearsUntilFi > 60 || Math.round(raw.yearsUntilFi) !== raw.yearsUntilFi) messages.push('Years until FI must be a whole number from 0 to 60.');
    if (!Number.isFinite(raw.inflationRate) || raw.inflationRate < 0 || raw.inflationRate > 25) messages.push('Inflation assumption must be between 0% and 25%.');
    return messages;
  }
  function setActionMessage(message, isError = false) {
    els.actionMessage.textContent = message || '';
    els.actionMessage.style.color = isError ? '#a93c35' : '';
    if (message) window.setTimeout(() => { if (els.actionMessage.textContent === message) els.actionMessage.textContent = ''; }, 5000);
  }

  function populateLocale() {
    const regions = Object.entries(Locale.regions).sort(([codeA, a], [codeB, b]) => {
      if (codeA === 'OTHER') return 1;
      if (codeB === 'OTHER') return -1;
      return a.label.localeCompare(b.label, 'en', { sensitivity: 'base' });
    });
    els.regionSelect.innerHTML = regions.map(([code, profile]) => `<option value="${code}">${profile.label}</option>`).join('');
    els.currencySelect.innerHTML = Object.entries(Locale.currencies)
      .sort(([a], [b]) => a.localeCompare(b, 'en'))
      .map(([code, profile]) => `<option value="${code}">${code} · ${profile.label}</option>`).join('');
    syncLocaleControls();
  }
  function syncLocaleControls() {
    pendingRegion = Locale.getRegion();
    pendingCurrency = Locale.getCurrency();
    els.regionSelect.value = pendingRegion;
    els.currencySelect.value = pendingCurrency;
    els.localeCountryLabel.textContent = Locale.getProfile().label;
    els.localeCurrencyLabel.textContent = Locale.getCurrency();
    const footerLink = document.querySelector('.footer-investment-link');
    if (footerLink) footerLink.textContent = Locale.getRegion() === 'IN' ? 'SIP Calculator' : 'Recurring Investment Calculator';
  }
  els.localeMenu?.addEventListener('toggle', () => {
    if (!els.localeMenu.open) return;
    pendingRegion = Locale.getRegion(); pendingCurrency = Locale.getCurrency();
    els.regionSelect.value = pendingRegion; els.currencySelect.value = pendingCurrency;
  });
  els.regionSelect?.addEventListener('change', (event) => {
    pendingRegion = event.target.value;
    const profile = Locale.regions[pendingRegion];
    if (profile && Locale.currencies[profile.currency]) { pendingCurrency = profile.currency; els.currencySelect.value = pendingCurrency; }
  });
  els.currencySelect?.addEventListener('change', (event) => { pendingCurrency = event.target.value; });
  els.localeDoneBtn?.addEventListener('click', () => { Locale.setLocale(pendingRegion, pendingCurrency); els.localeMenu.open = false; });
  document.addEventListener('click', (event) => { if (els.localeMenu?.open && !els.localeMenu.contains(event.target)) els.localeMenu.open = false; });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && els.localeMenu) els.localeMenu.open = false; });

  function renderSummary(result) {
    const a = result.inputs;
    els.annualSpendingValue.textContent = money(result.annualSpendingToday);
    els.fiTodayValue.textContent = money(result.fiToday, true);
    els.fiTodayNote.textContent = `At a ${percent(a.withdrawalRate)} planning withdrawal rate.`;
    els.multipleValue.textContent = multiple(result.fiMultiple);
    if (a.yearsUntilFi > 0) {
      els.futureCardLabel.textContent = `Future FI number · ${a.yearsUntilFi} years`;
      els.fiFutureValue.textContent = money(result.fiFuture, true);
      els.fiFutureNote.textContent = `Using ${percent(a.inflationRate)} assumed annual inflation.`;
    } else {
      els.futureCardLabel.textContent = 'Future-money view';
      els.fiFutureValue.textContent = 'No inflation uplift';
      els.fiFutureNote.textContent = 'Set years above 0 to illustrate a future nominal target.';
    }
    let sentence = `At a ${percent(a.withdrawalRate)} planning withdrawal rate, ${money(result.annualSpendingToday, true)} of annual portfolio-funded spending corresponds to a first-pass FI number of about ${money(result.fiToday, true)} in today's money.`;
    if (a.yearsUntilFi > 0) sentence += ` At ${percent(a.inflationRate)} assumed inflation for ${a.yearsUntilFi} years, that spending would be about ${money(result.futureAnnualSpending, true)} a year in future nominal money, corresponding to about ${money(result.fiFuture, true)} at the same withdrawal-rate assumption.`;
    els.interpretationText.textContent = sentence;
  }

  function renderRateComparison(result) {
    const showFuture = result.inputs.yearsUntilFi > 0;
    document.querySelectorAll('.future-col').forEach(el => { el.hidden = !showFuture; });
    els.rateBody.innerHTML = result.rateComparison.map(row => `<tr class="${row.isSelected ? 'is-selected' : ''}"><td>${row.isSelected && !Core.STANDARD_RATES.some(r => Math.abs(r-row.rate)<1e-10) ? 'Your selected rate · ' : ''}${percent(row.rate)}</td><td>${multiple(row.multiple)}</td><td>${money(row.fiToday)}</td>${showFuture ? `<td>${money(row.fiFuture)}</td>` : ''}</tr>`).join('');
  }

  function renderSpendingTable(result) {
    const showFuture = result.inputs.yearsUntilFi > 0;
    els.spendingBody.innerHTML = result.spendingSensitivity.map(row => `<tr class="${row.isBaseline ? 'is-baseline' : ''}"><td>${row.percentage}%${row.isBaseline ? ' · Your baseline' : ''}</td><td>${money(row.annualSpending)}</td><td>${money(row.fiToday)}</td>${showFuture ? `<td>${money(row.fiFuture)}</td>` : ''}</tr>`).join('');
  }

  const SVG_NS = 'http://www.w3.org/2000/svg';
  function svgEl(name, attrs = {}, text = '') {
    const node = document.createElementNS(SVG_NS, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    if (text !== '') node.textContent = text;
    return node;
  }
  function renderChart(result) {
    const svg = els.chart;
    const rows = result.spendingSensitivity;
    const width = 800, height = 380;
    const margin = { left: 105, right: 38, top: 34, bottom: 70 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;
    const plotRight = width - margin.right;
    const plotBottom = margin.top + plotH;
    const values = rows.map(row => row.fiToday);
    const spendingValues = rows.map(row => row.annualSpending);
    const xMin = Math.min(...spendingValues), xMax = Math.max(...spendingValues);
    const rawYMax = Math.max(1, ...values);
    const yMax = rawYMax * 1.15;
    const x = (value) => margin.left + ((value - xMin) / Math.max(1, xMax - xMin)) * plotW;
    const y = (value) => margin.top + plotH - (Math.max(0, value) / yMax) * plotH;
    const labelBoxes = [];

    svg.replaceChildren();
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.dataset.plotLeft = String(margin.left);
    svg.dataset.plotRight = String(plotRight);
    svg.dataset.plotTop = String(margin.top);
    svg.dataset.plotBottom = String(plotBottom);

    for (let i = 0; i <= 4; i += 1) {
      const ratio = i / 4;
      const yValue = yMax * (1 - ratio);
      const yPos = margin.top + plotH * ratio;
      svg.appendChild(svgEl('line', { x1: margin.left, y1: yPos, x2: plotRight, y2: yPos, class: 'grid-line' }));
      svg.appendChild(svgEl('text', { x: margin.left - 11, y: yPos + 4, 'text-anchor': 'end' }, money(yValue, true)));
    }
    rows.forEach((row) => {
      const px = x(row.annualSpending);
      svg.appendChild(svgEl('line', { x1: px, y1: margin.top, x2: px, y2: plotBottom, class: 'grid-line' }));
      svg.appendChild(svgEl('text', { x: px, y: height - 38, 'text-anchor': 'middle' }, `${row.percentage}%`));
      svg.appendChild(svgEl('text', { x: px, y: height - 20, 'text-anchor': 'middle' }, money(row.annualSpending, true)));
    });
    svg.appendChild(svgEl('line', { x1: margin.left, y1: plotBottom, x2: plotRight, y2: plotBottom, class: 'axis-line' }));
    svg.appendChild(svgEl('line', { x1: margin.left, y1: margin.top, x2: margin.left, y2: plotBottom, class: 'axis-line' }));
    svg.appendChild(svgEl('text', { x: margin.left + plotW / 2, y: height - 3, 'text-anchor': 'middle', class: 'axis-title' }, 'Annual portfolio-funded spending'));

    const d = rows.map((row, index) => `${index ? 'L' : 'M'} ${x(row.annualSpending).toFixed(2)} ${y(row.fiToday).toFixed(2)}`).join(' ');
    svg.appendChild(svgEl('path', { d, class: 'series-path' }));

    rows.forEach((row) => {
      const px = x(row.annualSpending), py = y(row.fiToday);
      if (row.isBaseline) {
        svg.appendChild(svgEl('circle', { cx: px, cy: py, r: 8, class: 'chart-point-baseline', 'data-baseline': 'true' }));
        svg.appendChild(svgEl('circle', { cx: px, cy: py, r: 4, class: 'chart-point-baseline-core' }));
      } else {
        svg.appendChild(svgEl('circle', { cx: px, cy: py, r: 5, class: 'chart-point' }));
      }
    });

    function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
    function overlaps(a, b, padding = 5) { return !(a.x + a.w + padding <= b.x || b.x + b.w + padding <= a.x || a.y + a.h + padding <= b.y || b.y + b.h + padding <= a.y); }
    function coversAnchor(box, px, py, padding = 7) { return px >= box.x - padding && px <= box.x + box.w + padding && py >= box.y - padding && py <= box.y + box.h + padding; }

    function addLabel(row, label) {
      const px = x(row.annualSpending), py = y(row.fiToday);
      const text = `${label} · ${money(row.fiToday, true)}`;
      const measure = svgEl('text', { x: -9999, y: -9999, class: 'chart-label-text', visibility: 'hidden' }, text);
      svg.appendChild(measure);
      const measuredWidth = typeof measure.getComputedTextLength === 'function' ? measure.getComputedTextLength() : text.length * 7;
      measure.remove();
      const boxH = 26, safe = 7, gap = 11;
      const boxW = Math.min(plotW - safe * 2, Math.max(98, Math.ceil(measuredWidth) + 18));
      const preferLeft = px > margin.left + plotW * 0.64;
      const preferBelow = py < margin.top + plotH * 0.24;
      const left = px - boxW - gap, right = px + gap, above = py - boxH - gap, below = py + gap, centered = px - boxW / 2;
      const candidates = preferLeft
        ? [[left, preferBelow ? below : above], [left, preferBelow ? above : below], [right, preferBelow ? below : above], [right, preferBelow ? above : below], [centered, above], [centered, below]]
        : [[right, preferBelow ? below : above], [right, preferBelow ? above : below], [left, preferBelow ? below : above], [left, preferBelow ? above : below], [centered, above], [centered, below]];
      candidates.push([left, py - boxH * 2 - gap * 2], [right, py - boxH * 2 - gap * 2]);
      let chosen = null;
      for (const [cx, cy] of candidates) {
        const box = { x: clamp(cx, margin.left + safe, plotRight - safe - boxW), y: clamp(cy, margin.top + safe, plotBottom - safe - boxH), w: boxW, h: boxH };
        if (coversAnchor(box, px, py)) continue;
        if (labelBoxes.some(other => overlaps(box, other))) continue;
        chosen = box; break;
      }
      if (!chosen) chosen = { x: clamp(preferLeft ? left : right, margin.left + safe, plotRight - safe - boxW), y: clamp(preferBelow ? below : above, margin.top + safe, plotBottom - safe - boxH), w: boxW, h: boxH };
      labelBoxes.push(chosen);
      const group = svgEl('g', { class: 'chart-callout', 'data-label': label });
      group.appendChild(svgEl('rect', { x: chosen.x, y: chosen.y, width: chosen.w, height: chosen.h, rx: 6, class: 'chart-label-bg', 'data-anchor-x': px.toFixed(2), 'data-anchor-y': py.toFixed(2) }));
      group.appendChild(svgEl('text', { x: chosen.x + 9, y: chosen.y + 17, class: 'chart-label-text' }, text));
      svg.appendChild(group);
    }

    addLabel(rows[0], '80%');
    addLabel(rows[2], '100% baseline');
    addLabel(rows[4], '120%');
    els.chartRateLabel.textContent = `Selected rate · ${percent(result.inputs.withdrawalRate)}`;
    svg.setAttribute('aria-label', `FI number by annual portfolio-funded spending at a ${percent(result.inputs.withdrawalRate)} planning withdrawal rate. Baseline ${money(result.annualSpendingToday)} annual spending corresponds to ${money(result.fiToday)}.`);
  }

  function updatePlannerLinks(result) {
    const monthly = result.inputs.view === 'monthly' ? result.inputs.spending : result.inputs.spending / 12;
    const params = new URLSearchParams({
      cm_handoff: 'fi_spending_v1',
      spendingMonthly: String(monthly),
      withdrawalRate: String(Number((result.inputs.withdrawalRate * 100).toFixed(10))),
      inflation: String(Number((result.inputs.inflationRate * 100).toFixed(10))),
      region: Locale.getRegion(),
      currency: Locale.getCurrency()
    });
    const href = `/financial-independence/?${params.toString()}`;
    els.fullPlannerCta.href = href;
    els.fullPlannerCard.href = href;
  }

  function render() {
    const raw = rawInputs();
    const messages = validate(raw);
    els.validation.textContent = messages[0] || '';
    const invalid = messages.length > 0;
    [els.copyBtn, els.csvBtn, els.reportBtn].forEach(button => { button.disabled = invalid; });
    if (invalid) return;
    latestResult = Core.calculate(raw);
    renderSummary(latestResult);
    renderRateComparison(latestResult);
    renderSpendingTable(latestResult);
    renderChart(latestResult);
    updatePlannerLinks(latestResult);
    syncLocaleControls();
  }
  function scheduleRender() { window.clearTimeout(renderTimer); renderTimer = window.setTimeout(render, 70); }

  function summaryText(result) {
    const a = result.inputs;
    const lines = [
      'Carrowmont Financial Independence Number by Spending',
      `Country / region: ${Locale.getProfile().label}`,
      `Currency: ${Locale.getCurrency()}`,
      `Spending view: ${a.view === 'monthly' ? 'Monthly' : 'Annual'}`,
      `Annual portfolio-funded spending: ${money(result.annualSpendingToday)}`,
      `Planning withdrawal rate: ${percent(a.withdrawalRate)}`,
      `Spending multiple: ${multiple(result.fiMultiple)}`,
      `FI number today: ${money(result.fiToday)}`
    ];
    if (a.yearsUntilFi > 0) lines.push(`Years until FI: ${a.yearsUntilFi}`, `Inflation assumption: ${percent(a.inflationRate)}`, `Future annual spending: ${money(result.futureAnnualSpending)}`, `Future nominal FI number: ${money(result.fiFuture)}`);
    lines.push('', 'Withdrawal-rate comparison:');
    result.rateComparison.forEach(row => lines.push(`${percent(row.rate)} · ${multiple(row.multiple)} · ${money(row.fiToday)}${a.yearsUntilFi > 0 ? ` · future ${money(row.fiFuture)}` : ''}`));
    lines.push('', 'Educational deterministic illustration only. The planning withdrawal rate is an assumption, not a guarantee or universal recommendation.', 'https://carrowmont.com/financial-independence-number-by-spending.html');
    return lines.join('\n');
  }
  async function copySummary() {
    if (!latestResult) return;
    const text = summaryText(latestResult);
    try { await navigator.clipboard.writeText(text); setActionMessage('Summary copied.'); }
    catch (_) {
      const area = document.createElement('textarea'); area.value = text; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); setActionMessage('Summary copied.');
    }
  }
  function csvEscape(value) { const text = String(value ?? ''); return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; }
  function downloadCsv() {
    if (!latestResult) return;
    const a = latestResult.inputs;
    const lines = [
      ['Carrowmont FI Number by Spending'], ['Generated at', latestResult.generatedAt], ['Methodology version', latestResult.methodologyVersion],
      ['Country / region', Locale.getProfile().label], ['Currency', Locale.getCurrency()], ['Spending view', a.view], ['Entered spending', a.spending],
      ['Annual portfolio-funded spending', latestResult.annualSpendingToday], ['Planning withdrawal rate', a.withdrawalRate], ['FI number today', latestResult.fiToday],
      ['Years until FI', a.yearsUntilFi], ['Inflation rate', a.inflationRate], ['Future annual spending', latestResult.futureAnnualSpending], ['Future FI number', latestResult.fiFuture], [],
      ['Rate comparison'], ['Planning withdrawal rate','Spending multiple','FI number today','FI number in future money','Selected']
    ];
    latestResult.rateComparison.forEach(row => lines.push([row.rate, row.multiple, row.fiToday, row.fiFuture, row.isSelected ? 'yes' : 'no']));
    lines.push([], ['Spending sensitivity'], ['Spending factor','Spending percentage','Annual portfolio-funded spending','FI number today','FI number in future money','Baseline']);
    latestResult.spendingSensitivity.forEach(row => lines.push([row.factor, row.percentage, row.annualSpending, row.fiToday, row.fiFuture, row.isBaseline ? 'yes' : 'no']));
    const csv = lines.map(line => line.map(csvEscape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }), url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = 'carrowmont-fi-number-by-spending.csv'; document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 10000);
    setActionMessage('CSV has been downloaded.');
  }
  async function generateReport() {
    if (!latestResult || !window.CarrowmontFINumberBySpendingPdf) return;
    els.reportBtn.disabled = true; els.reportBtn.textContent = 'Generating Report…';
    try {
      await window.CarrowmontFINumberBySpendingPdf.generate(latestResult, { chartSvg: els.chart, currency: Locale.getCurrency() });
      setActionMessage('Report has been downloaded.');
    } catch (error) {
      console.error(error); setActionMessage('The report could not be generated. Please try again.', true);
    } finally {
      els.reportBtn.disabled = false; els.reportBtn.textContent = 'Generate FI Number Report';
    }
  }

  document.querySelectorAll('input[name="spendingView"]').forEach(input => input.addEventListener('change', () => {
    els.spendingHelp.textContent = input.value === 'annual' ? 'Enter the annual amount that would need to come from the portfolio. If dependable income covers part of your expenses, subtract that amount first.' : 'Enter the monthly amount that would need to come from the portfolio. If dependable income covers part of your expenses, subtract that amount first.';
    scheduleRender();
  }));
  [els.portfolioSpending, els.withdrawalRate, els.yearsUntilFi, els.inflationRate].forEach(element => element.addEventListener('input', scheduleRender));
  els.copyBtn.addEventListener('click', copySummary);
  els.csvBtn.addEventListener('click', downloadCsv);
  els.reportBtn.addEventListener('click', generateReport);
  window.addEventListener('carrowmont:localechange', () => { syncLocaleControls(); scheduleRender(); });

  populateLocale();
  render();
})();
