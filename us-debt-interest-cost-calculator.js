(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const Core = () => window.CarrowmontUSDebtInterestCore;
  const els = {
    referenceDebt:$('referenceDebt'), referenceMeta:$('referenceMeta'), debtBasis:$('debtBasis'), startingDebt:$('startingDebtTrillions'), debtProvenance:$('debtProvenance'),
    existingRate:$('existingAverageRate'), refiRate:$('refinancingRate'), primaryDeficit:$('primaryDeficitTrillions'), refiWindow:$('refinancingWindow'), projection:$('projectionYears'),
    calculate:$('calculateBtn'), reset:$('resetBtn'), validation:$('validationMessage'), copy:$('copySummaryBtn'), csv:$('downloadCsvBtn'), report:$('generateReportBtn'), action:$('actionMessage'),
    openingInterest:$('openingInterest'), yearOneInterest:$('yearOneInterest'), finalYearInterest:$('finalYearInterest'), finalYearInterestNote:$('finalYearInterestNote'), finalDebt:$('finalDebt'), finalDebtNote:$('finalDebtNote'), cumulativeInterest:$('cumulativeInterest'), cumulativeInterestNote:$('cumulativeInterestNote'), changeInterest:$('changeInterest'),
    interpretation:$('interpretation'), repricedShare:$('repricedShare'), repricedText:$('repricedText'), fullOnePp:$('fullOnePp'), trancheOnePp:$('trancheOnePp'), chart:$('interestChart'), comparisonBody:document.querySelector('#scenarioComparisonTable tbody'), annualBody:document.querySelector('#annualTable tbody'), sourceDateCopy:$('sourceDateCopy')
  };

  const DEFAULTS = Object.freeze({ existingAverageRate:3.4, refinancingRate:4.0, primaryDeficitTrillions:1.0, refinancingWindow:5, projectionYears:10 });
  let reference = null;
  let lastResult = null;
  let manualDebtEdit = false;

  const number = (value, fallback=0) => { const n=Number(value); return Number.isFinite(n)?n:fallback; };
  const trillions = value => Number(value) * 1e12;
  const toTrillions = value => Number(value) / 1e12;
  const fmtDate = iso => { try { return new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(`${iso}T00:00:00Z`)); } catch { return iso; } };
  const fmtMoney = (value, digits=0) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:digits,minimumFractionDigits:digits}).format(value);
  function fmtCompactMoney(value, max=1){
    const abs=Math.abs(value), sign=value<0?'-':'';
    if(abs>=1e12) return `${sign}$${(abs/1e12).toFixed(max).replace(/\.0+$/,'')}T`;
    if(abs>=1e9) return `${sign}$${(abs/1e9).toFixed(max).replace(/\.0+$/,'')}B`;
    if(abs>=1e6) return `${sign}$${(abs/1e6).toFixed(max).replace(/\.0+$/,'')}M`;
    return fmtMoney(value,0);
  }
  const fmtPct = decimal => `${(Number(decimal)*100).toFixed(1).replace(/\.0$/,'')}%`;
  const fmtRatePercent = value => `${Number(value).toFixed(1).replace(/\.0$/,'')}%`;
  const escapeCsv = value => { const s=String(value??''); return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s; };

  function setAction(text, error=false){ els.action.textContent=text||''; els.action.style.color=error?'#9a3c36':''; }
  function setValidation(messages){ els.validation.textContent=messages.join(' '); }

  function rawInputs(){
    return {
      debtBasis: els.debtBasis.value,
      startingDebt: trillions(els.startingDebt.value),
      existingAverageRate: number(els.existingRate.value, DEFAULTS.existingAverageRate),
      refinancingRate: number(els.refiRate.value, DEFAULTS.refinancingRate),
      primaryDeficit: trillions(els.primaryDeficit.value),
      refinancingWindow: number(els.refiWindow.value, DEFAULTS.refinancingWindow),
      projectionYears: number(els.projection.value, DEFAULTS.projectionYears)
    };
  }

  function applyOfficialBasis(basis){
    if(!reference) return;
    if(basis==='public'){
      manualDebtEdit=false; els.startingDebt.value=toTrillions(reference.debtHeldByPublic).toFixed(3); els.debtProvenance.textContent=`Official U.S. Treasury reference · as of ${fmtDate(reference.asOfDate)}.`;
    }else if(basis==='total'){
      manualDebtEdit=false; els.startingDebt.value=toTrillions(reference.totalPublicDebtOutstanding).toFixed(3); els.debtProvenance.textContent=`Official U.S. Treasury total public debt reference · as of ${fmtDate(reference.asOfDate)}.`;
    }else{
      manualDebtEdit=true; els.debtProvenance.textContent='Custom scenario value — not labelled as an official Treasury amount.';
    }
  }

  function markCustom(){
    if(!reference) return;
    const basis=els.debtBasis.value;
    const official=basis==='public'?reference.debtHeldByPublic:basis==='total'?reference.totalPublicDebtOutstanding:null;
    if(official==null){ els.debtProvenance.textContent='Custom scenario value — not labelled as an official Treasury amount.'; return; }
    const entered=trillions(els.startingDebt.value);
    if(Math.abs(entered-official)>1000){ manualDebtEdit=true; els.debtBasis.value='custom'; els.debtProvenance.textContent='Custom scenario value — edited from the published Treasury reference.'; }
  }

  function resetDefaults(){
    els.debtBasis.value='public'; applyOfficialBasis('public');
    els.existingRate.value=DEFAULTS.existingAverageRate.toFixed(1); els.refiRate.value=DEFAULTS.refinancingRate.toFixed(1); els.primaryDeficit.value=DEFAULTS.primaryDeficitTrillions.toFixed(1); els.refiWindow.value=String(DEFAULTS.refinancingWindow); els.projection.value=String(DEFAULTS.projectionYears);
    setAction('Published defaults restored.'); calculateAndRender();
  }

  function buildYearZeroSeries(result){
    return result.sensitivity.map(s => ({...s, values:[result.selected.openingAnnualizedInterest,...s.result.annualRows.map(r=>r.modeledInterestCost)]}));
  }

  function svgEl(name, attrs={}){ const e=document.createElementNS('http://www.w3.org/2000/svg',name); Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v))); return e; }
  function clearSvg(svg){ while(svg.firstChild) svg.removeChild(svg.firstChild); }
  function textWidth(text,size=12,weight=850){ const c=textWidth.canvas||(textWidth.canvas=document.createElement('canvas')); const ctx=c.getContext('2d'); ctx.font=`${weight} ${size}px Inter, Arial, sans-serif`; return ctx.measureText(text).width; }

  function renderChart(result){
    const svg=els.chart; if(!svg) return; clearSvg(svg);
    const W=980,H=420,p={l:92,r:36,t:34,b:62}; const plot={x:p.l,y:p.t,w:W-p.l-p.r,h:H-p.t-p.b};
    const series=buildYearZeroSeries(result); const years=Array.from({length:result.inputs.projectionYears+1},(_,i)=>i);
    const all=series.flatMap(s=>s.values); let min=0,max=Math.max(...all)*1.12; if(!(max>0))max=1;
    const niceStep=Math.pow(10,Math.floor(Math.log10(max/4))); const candidates=[1,2,2.5,5,10].map(x=>x*niceStep); const step=candidates.find(x=>max/x<=5)||candidates[candidates.length-1]; max=Math.ceil(max/step)*step;
    const x=i=>plot.x+(years.length===1?0:(i/(years.length-1))*plot.w); const y=v=>plot.y+plot.h-(v-min)/(max-min)*plot.h;
    for(let tick=0;tick<=max+step/2;tick+=step){ const yy=y(tick); svg.appendChild(svgEl('line',{x1:plot.x,x2:plot.x+plot.w,y1:yy,y2:yy,class:'grid-line'})); const t=svgEl('text',{x:plot.x-12,y:yy+4,'text-anchor':'end'}); t.textContent=fmtCompactMoney(tick,1); svg.appendChild(t); }
    svg.appendChild(svgEl('line',{x1:plot.x,x2:plot.x,y1:plot.y,y2:plot.y+plot.h,class:'axis-line'})); svg.appendChild(svgEl('line',{x1:plot.x,x2:plot.x+plot.w,y1:plot.y+plot.h,y2:plot.y+plot.h,class:'axis-line'}));
    const maxXTicks=result.inputs.projectionYears<=10?result.inputs.projectionYears:Math.ceil(result.inputs.projectionYears/6); years.forEach((yr,i)=>{ if(yr!==0&&yr!==years[years.length-1]&&yr%maxXTicks!==0)return; const t=svgEl('text',{x:x(i),y:plot.y+plot.h+27,'text-anchor':'middle'}); t.textContent=`Year ${yr}`; svg.appendChild(t); });
    const axisTitle=svgEl('text',{x:19,y:plot.y+plot.h/2,transform:`rotate(-90 19 ${plot.y+plot.h/2})`,'text-anchor':'middle',class:'axis-title'}); axisTitle.textContent='Modeled annual interest cost (USD)'; svg.appendChild(axisTitle);

    series.forEach(s=>{
      const pts=s.values.map((v,i)=>[x(i),y(v)]); const d=pts.map((pt,i)=>`${i?'L':'M'} ${pt[0].toFixed(2)} ${pt[1].toFixed(2)}`).join(' '); svg.appendChild(svgEl('path',{d,class:`series-${s.key}`}));
      pts.forEach((pt,i)=>{ if(i===0||i===pts.length-1) svg.appendChild(svgEl('circle',{cx:pt[0],cy:pt[1],r:s.key==='selected'?5.4:4.4,class:`point point-${s.key}`})); });
    });

    const callouts=series.map(s=>({key:s.key,label:`${s.label}: ${fmtCompactMoney(s.values[s.values.length-1],1)}`,x:x(years.length-1),anchorY:y(s.values[s.values.length-1])})).sort((a,b)=>a.anchorY-b.anchorY);
    const minGap=36; for(let i=1;i<callouts.length;i++) if(callouts[i].anchorY-callouts[i-1].anchorY<minGap) callouts[i].anchorY=callouts[i-1].anchorY+minGap;
    const overflow=callouts[callouts.length-1].anchorY-(plot.y+plot.h-18); if(overflow>0) callouts.forEach(c=>c.anchorY-=overflow);
    const under=plot.y+18-callouts[0].anchorY; if(under>0) callouts.forEach(c=>c.anchorY+=under);
    callouts.forEach(c=>{
      const bw=Math.min(190,Math.ceil(textWidth(c.label,12,850)+20)),bh=28,bx=Math.max(plot.x+8,Math.min(plot.x+plot.w-bw-10,c.x-bw-13)),by=Math.max(plot.y+6,Math.min(plot.y+plot.h-bh-6,c.anchorY-bh/2));
      svg.appendChild(svgEl('rect',{x:bx,y:by,width:bw,height:bh,rx:7,class:`callout-bg ${c.key==='selected'?'callout-selected':''}`})); const t=svgEl('text',{x:bx+10,y:by+18,class:'callout-text'}); t.textContent=c.label; svg.appendChild(t);
    });
  }

  function renderTables(result){
    els.comparisonBody.innerHTML=''; result.sensitivity.forEach(s=>{
      const tr=document.createElement('tr'); if(s.key==='selected') tr.className='is-selected';
      tr.innerHTML=`<td>${s.label}</td><td>${fmtRatePercent(s.ratePercent)}</td><td>${fmtCompactMoney(s.result.finalYearInterest,2)}</td><td>${fmtCompactMoney(s.result.cumulativeInterest,2)}</td><td>${fmtCompactMoney(s.result.finalDebt,2)}</td><td>${s.key==='selected'?'—':fmtCompactMoney(s.changeInFinalYearInterestVsSelected,2)}</td>`; els.comparisonBody.appendChild(tr);
    });
    els.annualBody.innerHTML=''; result.selected.annualRows.forEach(row=>{
      const tr=document.createElement('tr'); tr.innerHTML=`<td>${row.year}</td><td>${fmtCompactMoney(row.legacyStartingDebtRemaining,3)}</td><td>${fmtCompactMoney(row.refinancedOriginalDebt,3)}</td><td>${fmtCompactMoney(row.newRateDebtBeforeYearEndAdditions,3)}</td><td>${fmtCompactMoney(row.modeledInterestCost,3)}</td><td>${fmtCompactMoney(row.primaryDeficit,3)}</td><td>${fmtCompactMoney(row.closingDebt,3)}</td><td>${fmtPct(row.effectiveModeledRate)}</td>`; els.annualBody.appendChild(tr);
    });
  }

  function renderResult(result){
    lastResult=result; window.__carrowmontDebtLastResult=result;
    const s=result.selected, first=s.annualRows[0];
    els.openingInterest.textContent=fmtCompactMoney(s.openingAnnualizedInterest,2); els.yearOneInterest.textContent=fmtCompactMoney(first?.modeledInterestCost||0,2); els.finalYearInterest.textContent=fmtCompactMoney(s.finalYearInterest,2); els.finalYearInterestNote.textContent=`Year ${s.inputs.projectionYears} · selected ${fmtRatePercent(s.inputs.refinancingRate*100)} rate`;
    els.finalDebt.textContent=fmtCompactMoney(s.finalDebt,2); els.finalDebtNote.textContent=`After ${s.inputs.projectionYears} year${s.inputs.projectionYears===1?'':'s'}`; els.cumulativeInterest.textContent=fmtCompactMoney(s.cumulativeInterest,2); els.cumulativeInterestNote.textContent=`Total modeled interest across ${s.inputs.projectionYears} year${s.inputs.projectionYears===1?'':'s'}`; els.changeInterest.textContent=fmtCompactMoney(s.changeInAnnualInterest,2);
    els.repricedShare.textContent=`${Math.round(s.repricedShareOfStartingDebt*100)}%`; els.repricedText.textContent=`of the original starting debt has been repriced by Year ${s.inputs.projectionYears} under the simplified rollover assumption.`; els.fullOnePp.textContent=fmtCompactMoney(s.fullStartingDebtOnePpSensitivity,2); els.trancheOnePp.textContent=fmtCompactMoney(s.oneAnnualRefiTrancheOnePpSensitivity,2);
    const summary=Core().formatScenarioSummary(result); els.interpretation.textContent=`${summary.headline} The final-year value reflects both the repricing of the original debt and the additional debt created by the primary deficit and prior modeled interest costs. This is a scenario illustration, not a forecast of official federal net-interest outlays or Treasury yields.`;
    renderChart(result); renderTables(result);
  }

  function calculateAndRender(){
    if(!reference) return;
    const raw=rawInputs(); const errors=Core().validateScenarioInputs(raw); setValidation(errors); const invalid=errors.length>0;
    [els.copy,els.csv,els.report].forEach(b=>{ if(b)b.disabled=invalid; }); if(invalid) return null;
    const result=Core().calculate(raw); renderResult(result); return result;
  }

  function buildSummary(result=lastResult){
    if(!result) return '';
    const i=result.inputs,s=result.selected; const basis=els.debtBasis.value==='public'?'Debt Held by the Public':els.debtBasis.value==='total'?'Total Public Debt Outstanding':'Custom scenario';
    const lines=[
      'Carrowmont — US Debt Interest Cost Scenario',
      `Treasury reference date: ${reference.asOfDate}`,
      `Starting debt basis: ${basis}`,
      `Starting modeled debt: ${fmtMoney(i.startingDebt,0)}`,
      `Existing average interest rate: ${fmtRatePercent(i.existingAverageRate*100)}`,
      `Rate on refinanced and new borrowing: ${fmtRatePercent(i.refinancingRate*100)}`,
      `Annual primary deficit before interest: ${fmtMoney(i.primaryDeficit,0)}`,
      `Starting-debt refinancing window: ${i.refinancingWindow} years`,
      `Projection period: ${i.projectionYears} years`,
      `Opening annualized interest estimate: ${fmtMoney(s.openingAnnualizedInterest,0)}`,
      `Final-year modeled interest cost: ${fmtMoney(s.finalYearInterest,0)}`,
      `Cumulative modeled interest: ${fmtMoney(s.cumulativeInterest,0)}`,
      `Final modeled debt: ${fmtMoney(s.finalDebt,0)}`,
      '', 'Rate sensitivity:'
    ];
    result.sensitivity.forEach(x=>lines.push(`${x.label} (${fmtRatePercent(x.ratePercent)}): final-year interest ${fmtMoney(x.result.finalYearInterest,0)}, cumulative interest ${fmtMoney(x.result.cumulativeInterest,0)}, final debt ${fmtMoney(x.result.finalDebt,0)}.`));
    lines.push('', 'Educational scenario analysis only. This does not predict Treasury yields, federal policy, a U.S. default or official future net-interest outlays.'); return lines.join('\n');
  }

  async function copySummary(){ if(!lastResult)return; try{ await navigator.clipboard.writeText(buildSummary()); setAction('Summary copied.'); }catch{ setAction('Copy was blocked by the browser. Please try again.',true); } }

  function csvText(result=lastResult){
    const rows=[['Carrowmont US Debt Interest Cost Calculator'],['Reference date',reference.asOfDate],['Source',reference.sourceName],[],['Scenario inputs'],['Field','Value'],['Debt basis',els.debtBasis.value],['Starting modeled debt USD',result.inputs.startingDebt],['Existing average interest rate percent',result.inputs.existingAverageRate*100],['Rate on refinanced and new borrowing percent',result.inputs.refinancingRate*100],['Annual primary deficit before interest USD',result.inputs.primaryDeficit],['Refinancing window years',result.inputs.refinancingWindow],['Projection period years',result.inputs.projectionYears],[],['Selected-rate year-by-year detail'],['Year','Legacy starting debt remaining USD','Original debt refinanced USD','Debt at new rate before year-end additions USD','Modeled interest cost USD','Primary deficit before interest USD','Closing modeled debt USD','Effective modeled rate percent']];
    result.selected.annualRows.forEach(r=>rows.push([r.year,r.legacyStartingDebtRemaining,r.refinancedOriginalDebt,r.newRateDebtBeforeYearEndAdditions,r.modeledInterestCost,r.primaryDeficit,r.closingDebt,r.effectiveModeledRate*100]));
    rows.push([],['Rate sensitivity comparison'],['Scenario','New/refinancing rate percent','Final-year modeled interest cost USD','Cumulative modeled interest USD','Final modeled debt USD','Change in final-year interest vs selected USD']); result.sensitivity.forEach(s=>rows.push([s.label,s.ratePercent,s.result.finalYearInterest,s.result.cumulativeInterest,s.result.finalDebt,s.changeInFinalYearInterestVsSelected]));
    rows.push([],['Disclaimer','Educational deterministic scenario only; not a forecast of official federal net-interest outlays or Treasury yields.']); return rows.map(r=>r.map(escapeCsv).join(',')).join('\n');
  }
  function downloadCsv(){ if(!lastResult)return; const blob=new Blob([csvText()],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a'); a.href=url;a.download='carrowmont-us-debt-interest-cost-scenario.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setAction('CSV downloaded.'); }

  async function generateReport(){ if(!lastResult||!window.CarrowmontUSDebtInterestPdf)return; const old=els.report.textContent; els.report.disabled=true; els.report.textContent='Generating Report…'; try{ await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))); await window.CarrowmontUSDebtInterestPdf.generate(lastResult,{chartSvg:els.chart,reference,basisLabel:els.debtBasis.options[els.debtBasis.selectedIndex].text}); setAction('Report has been downloaded.'); }catch(error){ console.error(error); setAction('The report could not be generated. Please try again.',true); }finally{ els.report.disabled=false; els.report.textContent=old; } }

  async function loadReference(){
    const response=await fetch('data/us-debt-reference.json',{cache:'no-store'}); if(!response.ok) throw new Error(`Reference data HTTP ${response.status}`); const data=await response.json(); if(!data||!/^\d{4}-\d{2}-\d{2}$/.test(data.asOfDate)||!(data.debtHeldByPublic>0)||!(data.totalPublicDebtOutstanding>=data.debtHeldByPublic)) throw new Error('Reference data failed validation.'); reference=Object.freeze(data);
    els.referenceDebt.textContent=fmtCompactMoney(reference.debtHeldByPublic,1); els.referenceMeta.textContent=`U.S. Treasury reference · as of ${fmtDate(reference.asOfDate)}`; els.sourceDateCopy.textContent=`The starting debt is a validated U.S. Treasury reference snapshot as of ${fmtDate(reference.asOfDate)}. The page never calls the Treasury API in your browser; the bundled reference is updated through a protected maintenance workflow.`; applyOfficialBasis('public'); calculateAndRender();
  }

  els.calculate.addEventListener('click',()=>{ setAction(''); calculateAndRender(); }); els.reset.addEventListener('click',resetDefaults); els.copy.addEventListener('click',copySummary); els.csv.addEventListener('click',downloadCsv); els.report.addEventListener('click',generateReport);
  els.debtBasis.addEventListener('change',()=>{ applyOfficialBasis(els.debtBasis.value); calculateAndRender(); }); els.startingDebt.addEventListener('input',()=>{ markCustom(); });
  [els.existingRate,els.refiRate,els.primaryDeficit,els.refiWindow,els.projection].forEach(el=>el.addEventListener('change',calculateAndRender));
  window.addEventListener('resize',()=>{ if(lastResult)renderChart(lastResult); });

  loadReference().catch(error=>{ console.error(error); els.referenceDebt.textContent='Reference unavailable'; els.referenceMeta.textContent='The bundled Treasury reference could not be loaded.'; setValidation(['The calculator cannot run until its validated local reference data is available.']); [els.calculate,els.copy,els.csv,els.report].forEach(b=>{if(b)b.disabled=true;}); });
})();
