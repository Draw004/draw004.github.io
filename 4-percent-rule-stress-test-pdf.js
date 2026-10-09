(function () {
  'use strict';

  const W = 794, H = 1123, M = 42, CW = W - M * 2;
  const C = {
    navy: '#102945', ink: '#17314f', teal: '#0e827a', tealDark: '#08756d', muted: '#506b84',
    line: '#cbdbe3', pale: '#e9f7f4', warm: '#fff7e8', white: '#ffffff', light: '#f8fbfc',
    base: '#0e827a', cautious: '#c17b1f', adverse: '#a94848', weak: '#9c3f54', strong: '#315f9b'
  };

  function P() { return window.CarrowmontPdfExport; }
  function L() { return window.CarrowmontLocale; }
  function S() { return window.CarrowmontReportStandard; }
  function page() { return P().createPage({ width: W, height: H, scale: 2.5, background: '#fff' }); }
  function money(value) { return L().formatMoney(value, { maximumFractionDigits: 0 }); }
  function compact(value) { return L().formatCompactMoney(value, { maximumFractionDigits: 1 }); }
  function pct(value, digits = 1) { return `${(Number(value) * 100).toFixed(digits).replace(/\.0$/, '')}%`; }
  function signedPct(value) { const p = Number(value) * 100; return `${p > 0 ? '+' : ''}${p.toFixed(1).replace(/\.0$/, '')}%`; }
  function card(ctx, x, y, w, h, fill = C.white, stroke = C.line, radius = 10) { P().roundRect(ctx, x, y, w, h, radius, fill, stroke, 1); }
  function line(ctx, x1, x2, y, color = C.line, width = 1) { P().line(ctx, x1, y, x2, y, color, width); }
  function footer(ctx, label) {
    P().text(ctx, 'CARROWMONT', M, H - 34, { size: 9.8, weight: 900, color: C.teal });
    P().text(ctx, label, W - M, H - 34, { size: 8.7, weight: 550, color: C.muted, align: 'right' });
  }
  function pageHeader(ctx, title, subtitle, pageLabel) {
    P().text(ctx, 'CARROWMONT', M, 51, { size: 14, weight: 900, color: C.teal });
    P().text(ctx, pageLabel, W - M, 51, { size: 9.2, weight: 650, color: C.muted, align: 'right' });
    P().text(ctx, title, M, 92, { size: 25, weight: 900, color: C.navy });
    if (subtitle) P().wrappedText(ctx, subtitle, M, 116, CW, { size: 10.2, lineHeight: 14, weight: 550, color: C.muted, maxLines: 2 });
    line(ctx, M, W - M, 149, C.navy, 2);
  }

  function summaryPage(result) {
    const pg = page(), ctx = pg.ctx, a = result.assumptions;
    pageHeader(ctx, '4% Rule Stress Test Report', 'Deterministic retirement-withdrawal scenarios for inflation, horizon and return-order risk.', 'Summary & assumptions');
    let y = 177;
    card(ctx, M, y, CW, 102, C.pale, '#b9ded8', 12);
    P().text(ctx, 'Headline assumptions', M + 16, y + 27, { size: 14, weight: 900, color: C.tealDark });
    P().text(ctx, `Starting portfolio: ${money(a.startingPortfolio)}`, M + 16, y + 53, { size: 10.1, weight: 750, color: C.ink });
    P().text(ctx, `First-year withdrawal: ${money(a.firstYearWithdrawal)} (${pct(a.startingWithdrawalRate)})`, M + 16, y + 76, { size: 10.1, weight: 750, color: C.ink });
    P().text(ctx, `Ages ${a.startAge}-${a.planUntilAge} · ${a.horizonYears} years`, W - M - 16, y + 53, { size: 10.1, weight: 750, color: C.ink, align: 'right' });
    P().text(ctx, `Inflation ${pct(a.inflationRate)} · Return ${pct(a.nominalReturn)}`, W - M - 16, y + 76, { size: 10.1, weight: 750, color: C.ink, align: 'right' });
    y += 127;

    P().text(ctx, 'Scenario comparison', M, y, { size: 16, weight: 900, color: C.navy });
    line(ctx, M, W - M, y + 13);
    y += 31;
    const gap = 12, w = (CW - gap * 2) / 3, h = 188;
    const scenarios = [
      ['Base', result.base, C.base],
      ['Cautious', result.cautious, C.cautious],
      ['Adverse early sequence', result.adverse, C.adverse]
    ];
    scenarios.forEach(([title, scenario, color], index) => {
      const x = M + index * (w + gap);
      card(ctx, x, y, w, h, C.white, C.line, 12);
      ctx.fillStyle = color; ctx.fillRect(x, y, w, 5);
      P().text(ctx, title.toUpperCase(), x + 14, y + 27, { size: 9.4, weight: 900, color: C.muted });
      P().wrappedText(ctx, scenario.depletionAge ? `Depletes at age ${scenario.depletionAge}` : 'Lasts through the selected horizon', x + 14, y + 58, w - 28, { size: 14.2, lineHeight: 17, weight: 900, color: C.navy, maxLines: 2 });
      P().text(ctx, 'Ending balance', x + 14, y + 101, { size: 8.8, weight: 750, color: C.muted });
      P().text(ctx, compact(scenario.endingBalanceNominal), x + 14, y + 122, { size: 13, weight: 900, color: C.ink });
      P().text(ctx, `Today’s money: ${compact(scenario.endingBalanceReal)}`, x + 14, y + 145, { size: 8.8, weight: 650, color: C.muted });
      P().text(ctx, `Withdrawals funded: ${compact(scenario.totalWithdrawalsNominal)}`, x + 14, y + 167, { size: 8.8, weight: 650, color: C.muted });
    });
    y += h + 27;

    P().text(ctx, 'What this report means', M, y, { size: 16, weight: 900, color: C.navy });
    line(ctx, M, W - M, y + 13);
    y += 31;
    const meaningText = 'The Base path uses the entered return and inflation every year. The Cautious path reduces return by 1.5 percentage points and raises inflation by 1 point. The Adverse path uses a disclosed weak-first ten-year return sequence and higher early inflation. These are deterministic illustrations—not probabilities, forecasts or guarantees.';
    ctx.font = '550 10px Arial, sans-serif';
    const meaningLines = P().linesForText ? P().linesForText(ctx, meaningText, CW - 32) : null;
    const meaningLineCount = meaningLines ? Math.min(6, meaningLines.length) : 4;
    const meaningCardH = Math.max(72, 31 + meaningLineCount * 15);
    card(ctx, M, y, CW, meaningCardH, C.light, C.line, 11);
    P().wrappedText(ctx, meaningText, M + 16, y + 26, CW - 32, { size: 10, lineHeight: 15, weight: 550, color: C.ink, maxLines: 6 });
    y += meaningCardH + 21;
    card(ctx, M, y, CW, 90, C.warm, '#ebd2a8', 11);
    P().text(ctx, 'Educational use only', M + 16, y + 27, { size: 13, weight: 900, color: '#8b5a17' });
    P().wrappedText(ctx, 'This report does not identify a universally safe withdrawal rate and does not model taxes, fees, pensions, spending guardrails, historical data or Monte Carlo probabilities.', M + 16, y + 50, CW - 32, { size: 9.5, lineHeight: 13, weight: 550, color: C.ink, maxLines: 3 });
    footer(ctx, '4% Rule Stress Test · Summary');
    return pg.canvas;
  }

  async function chartPage(result, portfolioSvg) {
    const pg = page(), ctx = pg.ctx;
    pageHeader(ctx, 'Portfolio paths', 'Base, Cautious and Adverse balances through the selected horizon.', 'Scenario chart');
    card(ctx, M, 176, CW, 412, C.light, C.line, 12);
    await P().drawSvgElement(ctx, portfolioSvg, M + 14, 192, CW - 28, 380);
    let y = 615;
    const a = result.assumptions;
    P().text(ctx, 'Scenario details', M, y, { size: 16, weight: 900, color: C.navy });
    line(ctx, M, W - M, y + 13);
    y += 31;
    const rows = [
      ['Base', `Return ${pct(a.nominalReturn)}; inflation ${pct(a.inflationRate)} every year.`, result.base],
      ['Cautious', `Return ${pct(Math.max(-.10, a.nominalReturn - .015))}; inflation ${pct(Math.min(.15, a.inflationRate + .01))}.`, result.cautious],
      ['Adverse', `Weak-first ten-year sequence; inflation is ${pct(Math.min(.15, a.inflationRate + .02))} for ten years.`, result.adverse]
    ];
    rows.forEach(([label, method, scenario], index) => {
      const rowY = y + index * 85;
      if (index % 2) { ctx.fillStyle = '#fbfdfe'; ctx.fillRect(M, rowY, CW, 85); }
      P().text(ctx, label, M + 8, rowY + 24, { size: 11, weight: 900, color: C.navy });
      P().wrappedText(ctx, method, M + 105, rowY + 22, 300, { size: 9.1, lineHeight: 12, weight: 550, color: C.muted, maxLines: 2 });
      P().text(ctx, scenario.status, W - M - 8, rowY + 24, { size: 9.5, weight: 850, color: scenario.depletionAge ? C.adverse : C.tealDark, align: 'right' });
      P().text(ctx, `Ending ${compact(scenario.endingBalanceNominal)} · real ${compact(scenario.endingBalanceReal)}`, W - M - 8, rowY + 51, { size: 8.8, weight: 600, color: C.muted, align: 'right' });
      line(ctx, M, W - M, rowY + 84);
    });
    footer(ctx, '4% Rule Stress Test · Portfolio paths');
    return pg.canvas;
  }

  async function sequencePage(result, sequenceSvg) {
    const pg = page(), ctx = pg.ctx;
    pageHeader(ctx, 'Why return order matters', 'Weak-first and strong-first use the same ten annual return values in reverse order.', 'Sequence comparison');
    card(ctx, M, 176, CW, 412, C.light, C.line, 12);
    await P().drawSvgElement(ctx, sequenceSvg, M + 14, 192, CW - 28, 380);
    let y = 615;
    const weak = result.sequenceComparison.weakFirst;
    const strong = result.sequenceComparison.strongFirst;
    card(ctx, M, y, CW, 90, C.pale, '#baded9', 11);
    P().text(ctx, 'Same values, reversed order', M + 16, y + 28, { size: 13, weight: 900, color: C.tealDark });
    P().wrappedText(ctx, `Weak-first ending balance: ${money(weak.endingBalanceNominal)}. Strong-first ending balance: ${money(strong.endingBalanceNominal)}. The difference comes from withdrawals interacting with the timing of gains and losses.`, M + 16, y + 51, CW - 32, { size: 9.4, lineHeight: 13, weight: 550, color: C.ink, maxLines: 3 });
    y += 115;
    P().text(ctx, 'First ten normalized annual returns', M, y, { size: 15.2, weight: 900, color: C.navy });
    line(ctx, M, W - M, y + 13);
    y += 31;
    const values = result.sequenceComparison.normalizedReturns;
    const boxW = (CW - 9 * 7) / 10;
    values.forEach((value, index) => {
      const x = M + index * (boxW + 7);
      card(ctx, x, y, boxW, 60, value < 0 ? '#fff3f3' : '#f3faf8', value < 0 ? '#e5bcbc' : '#bddbd6', 8);
      P().text(ctx, `Y${index + 1}`, x + boxW / 2, y + 20, { size: 8.2, weight: 800, color: C.muted, align: 'center' });
      P().text(ctx, signedPct(value), x + boxW / 2, y + 43, { size: 10, weight: 900, color: value < 0 ? C.adverse : C.tealDark, align: 'center' });
    });
    y += 86;
    card(ctx, M, y, CW, 90, C.warm, '#ead1a9', 11);
    P().text(ctx, 'Synthetic stress pattern', M + 16, y + 28, { size: 13, weight: 900, color: '#8b5a17' });
    P().wrappedText(ctx, 'The pattern is disclosed and normalized so its ten-year geometric return equals the long-run return entered. It is not presented as historical market data.', M + 16, y + 52, CW - 32, { size: 9.4, lineHeight: 13, weight: 550, color: C.ink, maxLines: 3 });
    footer(ctx, '4% Rule Stress Test · Sequence comparison');
    return pg.canvas;
  }

  function rateAndAnnualPage(result) {
    const pg = page(), ctx = pg.ctx;
    pageHeader(ctx, 'Rate sensitivity & annual values', '3%, 3.5%, 4% and 5% under the same adverse scenario method.', 'Comparison table');
    let y = 174;
    const col = [M, M + 88, M + 250, M + 500, W - M];
    ctx.fillStyle = '#eef6f7'; ctx.fillRect(M, y, CW, 34);
    ['Rate', 'First-year withdrawal', 'Modelled status', 'Ending balance (today’s money)'].forEach((label, index) => {
      const x = index === 0 ? col[0] + 8 : col[index];
      P().text(ctx, label, x, y + 22, { size: 8.8, weight: 900, color: C.navy, align: index === 3 ? 'right' : 'left' });
    });
    y += 34;
    result.rateComparison.forEach((row, index) => {
      const rowH = 48;
      if (index % 2) { ctx.fillStyle = '#fbfdfe'; ctx.fillRect(M, y, CW, rowH); }
      P().text(ctx, pct(row.rate), col[0] + 8, y + 29, { size: 10.5, weight: 900, color: C.navy });
      P().text(ctx, money(row.firstYearWithdrawal), col[1], y + 29, { size: 9.4, weight: 650, color: C.ink });
      P().text(ctx, row.depletionAge ? `Depletes at age ${row.depletionAge}` : 'Lasts through horizon', col[2], y + 29, { size: 9.4, weight: 750, color: row.depletionAge ? C.adverse : C.tealDark });
      P().text(ctx, money(row.endingBalanceReal), col[4], y + 29, { size: 9.4, weight: 750, color: C.ink, align: 'right' });
      line(ctx, M, W - M, y + rowH);
      y += rowH;
    });
    y += 28;
    P().text(ctx, 'Base annual values — first 12 years', M, y, { size: 15.2, weight: 900, color: C.navy });
    line(ctx, M, W - M, y + 13);
    y += 29;
    const headers = ['Year','Age','Opening','Withdrawal','Return','Closing'];
    const xs = [M + 6, M + 54, M + 104, M + 275, M + 440, W - M - 6];
    ctx.fillStyle = '#eef6f7'; ctx.fillRect(M, y, CW, 30);
    headers.forEach((header, index) => P().text(ctx, header, xs[index], y + 20, { size: 8.4, weight: 900, color: C.navy, align: index === 5 ? 'right' : 'left' }));
    y += 30;
    result.base.annualRows.slice(0, 12).forEach((row, index) => {
      const rowH = 37;
      if (index % 2) { ctx.fillStyle = '#fbfdfe'; ctx.fillRect(M, y, CW, rowH); }
      const values = [row.year,row.age,compact(row.openingBalance),compact(row.withdrawal),signedPct(row.returnRate),compact(row.closingBalance)];
      values.forEach((value, valueIndex) => P().text(ctx, value, xs[valueIndex], y + 24, { size: 8.7, weight: valueIndex < 2 ? 750 : 600, color: C.ink, align: valueIndex === 5 ? 'right' : 'left' }));
      line(ctx, M, W - M, y + rowH);
      y += rowH;
    });
    P().wrappedText(ctx, 'The downloadable CSV includes every annual row for Base, Cautious, Adverse, Weak-first and Strong-first scenarios.', M, H - 72, CW, { size: 8.7, lineHeight: 12, weight: 550, color: C.muted, maxLines: 2 });
    footer(ctx, '4% Rule Stress Test · Rate and annual comparison');
    return pg.canvas;
  }

  function additionalAnnualPages(result) {
    const rows = result.base.annualRows.slice(12);
    if (!rows.length) return [];
    const maximumRowsPerPage = 23;
    const pageCount = Math.ceil(rows.length / maximumRowsPerPage);
    const perPage = Math.ceil(rows.length / pageCount);
    const pages = [];
    for (let offset = 0; offset < rows.length; offset += perPage) {
      const pg = page(), ctx = pg.ctx;
      const part = rows.slice(offset, offset + perPage);
      pageHeader(ctx, 'Base annual values', `Years ${part[0].year}-${part[part.length - 1].year} of the selected horizon.`, `Annual data ${Math.floor(offset / perPage) + 2}`);
      let y = 176;
      const headers = ['Year','Age','Opening','Withdrawal','Inflation','Return','Growth / loss','Closing','Status'];
      const widths = [40,42,105,92,60,58,95,100,118];
      const xs = [M];
      widths.slice(0,-1).forEach((width) => xs.push(xs[xs.length - 1] + width));
      ctx.fillStyle = '#eef6f7'; ctx.fillRect(M, y, CW, 32);
      headers.forEach((header, index) => P().text(ctx, header, xs[index] + 4, y + 21, { size: 7.5, weight: 900, color: C.navy }));
      y += 32;
      part.forEach((row, index) => {
        const rowH = 38;
        if (index % 2) { ctx.fillStyle = '#fbfdfe'; ctx.fillRect(M, y, CW, rowH); }
        const values = [row.year,row.age,compact(row.openingBalance),compact(row.withdrawal),pct(row.inflationRate),signedPct(row.returnRate),compact(row.investmentGrowth),compact(row.closingBalance),row.status];
        values.forEach((value, valueIndex) => {
          if (valueIndex === 8) P().wrappedText(ctx, value, xs[valueIndex] + 4, y + 15, widths[valueIndex] - 8, { size: 7.2, lineHeight: 9.2, weight: 600, color: C.ink, maxLines: 2 });
          else P().text(ctx, value, xs[valueIndex] + 4, y + 23, { size: 7.5, weight: valueIndex < 2 ? 750 : 550, color: C.ink });
        });
        line(ctx, M, W - M, y + rowH);
        y += rowH;
      });
      footer(ctx, '4% Rule Stress Test · Annual values');
      pages.push(pg.canvas);
    }
    return pages;
  }

  async function generate(result, options = {}) {
    if (!result || !P() || !S()) throw new Error('Report helpers are unavailable.');
    const canvases = [
      summaryPage(result),
      await chartPage(result, options.portfolioSvg),
      await sequencePage(result, options.sequenceSvg),
      rateAndAnnualPage(result),
      ...additionalAnnualPages(result)
    ];
    canvases.push(S().guidePage({
      reportTitle: 'Carrowmont 4% Rule Stress Test Report',
      preparedFrom: 'Prepared from the Carrowmont 4% Rule Stress Test',
      howToRead: 'Start with the three scenario outcomes, then compare the portfolio chart, return-order illustration and annual table. Results are deterministic illustrations based on the assumptions entered, not probabilities or market forecasts.',
      methodology: [
        ['Annual timing', 'The scheduled inflation-adjusted withdrawal is taken at the start of each retirement year. The scenario return is then applied to the remaining balance.'],
        ['Base path', 'Uses the entered nominal return and inflation every year.'],
        ['Cautious path', 'Uses the entered return minus 1.5 percentage points and inflation plus 1 percentage point, within the documented input bounds.'],
        ['Adverse path', 'Uses a disclosed synthetic weak-first ten-year return sequence normalized to the entered ten-year geometric return, plus higher early inflation.'],
        ['Depletion', 'If the full scheduled withdrawal cannot be funded at the start of a year, the model marks depletion during that year and does not show a negative balance.']
      ],
      terminology: [
        ['Nominal balance', 'The modelled currency amount at that future point without adjusting it back for purchasing power.'],
        ['Today’s-money balance', 'The ending balance divided by the cumulative modelled inflation factor.'],
        ['Sequence risk', 'The effect that the order of gains and losses can have when withdrawals are occurring.'],
        ['Deterministic scenario', 'A transparent fixed path used for sensitivity testing; not a probability or prediction.'],
        ['Starting withdrawal rate', 'The first-year portfolio withdrawal divided by the starting portfolio. Later withdrawals rise with scenario inflation.']
      ],
      assumptions: 'The report excludes taxes, fees, pensions, retirement income, asset allocation changes, dynamic spending guardrails and Monte Carlo probability analysis.',
      disclaimer: 'This report is an educational planning illustration and is not individualized investment, financial, tax, legal or accounting advice. Actual returns, inflation and spending needs can differ materially.',
      methodologyMeta: `${result.methodologyVersion} · reviewed 9 October 2026`,
      methodologyUrl: 'https://carrowmont.com/4-percent-rule-stress-test.html#methodology'
    }));
    canvases.push(S().continuePlanningPage({
      currentTool: 'stress-test',
      intro: 'Use this withdrawal stress test alongside Carrowmont retirement, inflation, financial-independence, investing, goal and cash-flow tools. Each tool answers a different part of the planning question.'
    }));
    await P().downloadCanvases(canvases, { filename: 'carrowmont-4-percent-rule-stress-test-report.pdf', quality: 0.94 });
  }

  window.CarrowmontFourPercentPdf = { generate };
})();
