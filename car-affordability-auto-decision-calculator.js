(function () {
  'use strict';
  const core = window.CarrowmontCarAffordabilityCore;
  const loan = window.CarrowmontLoanCore;
  const borrowingHealth = window.CarrowmontBorrowingHealthCore;
  const emergencyFund = window.CarrowmontEmergencyFundCore;
  const locale = window.CarrowmontLocale;
  if (!core || !loan || !borrowingHealth || !emergencyFund || !locale) return;

  const byId = id => document.getElementById(id);
  const ids = ['vehiclePrice','downPayment','tradeInCredit','upfrontTaxesFees','annualRate','termMonths','grossMonthlyIncome','takeHomeMonthlyIncome','essentialMonthlyExpenses','existingMonthlyDebtPayments','monthlyRunningCosts','emergencySavings','emergencySavingsUsedForPurchase','emergencyTargetMonths','rateStressIncreasePctPoints','runningCostStressPct','alternativeVehiclePrice','extraDownPaymentScenario','longerTermMonthsScenario'];
  const monetaryIds=['vehiclePrice','downPayment','tradeInCredit','upfrontTaxesFees','grossMonthlyIncome','takeHomeMonthlyIncome','essentialMonthlyExpenses','existingMonthlyDebtPayments','monthlyRunningCosts','emergencySavings','emergencySavingsUsedForPurchase','alternativeVehiclePrice','extraDownPaymentScenario'];
  const HANDOFF_KEY='carrowmont_handoff_car_affordability_v1';
  const STARTER_MONTHLY={INR:10000,USD:500,CAD:500,GBP:500,AUD:500,NZD:500,EUR:500,CNY:3000,JPY:50000,KRW:500000,SGD:500,AED:2000,SAR:2000,CHF:500,BRL:1000,MXN:5000,ZAR:5000,IDR:1000000,MYR:1000,THB:10000,PHP:10000,VND:5000000,HKD:5000,TWD:10000,RUB:20000,ARS:500000,ILS:1000,COP:500000,RON:1000,PKR:50000,CZK:5000,EGP:10000,PEN:1000,KZT:50000,NGN:50000,MAD:1000,KWD:200,UZS:1000000,KES:10000,TRY:10000,BDT:50000,CLP:500000,DKK:3000,OMR:200,QAR:2000,NOK:5000,PLN:1000,SEK:5000};
  let lastResult = null;
  let usingStarterValues = false;
  let applyingProgrammaticValues = false;
  let contextualActionMessageActive = false;
  const value = id => { const n = Number(byId(id)?.value); return Number.isFinite(n) ? n : 0; };
  const state = () => Object.fromEntries(ids.map(id => [id, value(id)]));
  const engines = () => ({ loan, borrowingHealth, emergencyFund });
  const money = n => locale.formatMoney(Number(n)||0, { maximumFractionDigits:0 });
  const pct = n => n == null || !Number.isFinite(n) ? 'Not available' : `${n.toFixed(n >= 10 ? 1 : 2).replace(/\.0$/,'')}%`;
  const months = n => n == null || !Number.isFinite(n) ? 'Not available' : `${n.toFixed(n >= 10 ? 1 : 2).replace(/\.0$/,'')} months`;
  const setText = (id,text) => { const el=byId(id); if(el) el.textContent=text; };
  const roundStarter=(value,unit)=>{ const step=Math.max(1,unit); return Math.round(value/step)*step; };
  function starterDefaults(currency=locale.getCurrency()){
    const m=STARTER_MONTHLY[currency]||STARTER_MONTHLY.USD;
    return {
      vehiclePrice:roundStarter(m*60,m), downPayment:roundStarter(m*12,m), tradeInCredit:0, upfrontTaxesFees:roundStarter(m*3,m),
      annualRate:9, termMonths:60, grossMonthlyIncome:roundStarter(m*13,m), takeHomeMonthlyIncome:roundStarter(m*10,m), essentialMonthlyExpenses:roundStarter(m*5,m),
      existingMonthlyDebtPayments:roundStarter(m,m), monthlyRunningCosts:roundStarter(m,m), emergencySavings:roundStarter(m*30,m), emergencySavingsUsedForPurchase:0, emergencyTargetMonths:6,
      rateStressIncreasePctPoints:2, runningCostStressPct:20, alternativeVehiclePrice:roundStarter(m*50,m), extraDownPaymentScenario:roundStarter(m*6,m), longerTermMonthsScenario:72
    };
  }
  function applyValues(values){
    applyingProgrammaticValues=true;
    try{
      for(const id of ids){
        if(!Object.prototype.hasOwnProperty.call(values,id)) continue;
        const n=Number(values[id]); if(!Number.isFinite(n)||n<0) continue;
        const el=byId(id); if(el) el.value=String(n);
      }
    }finally{ applyingProgrammaticValues=false; }
  }
  function applyStarterDefaults(message=true){
    applyValues(starterDefaults()); usingStarterValues=true;
    if(message){ contextualActionMessageActive=true; setText('actionMessage',`Illustrative starter values updated for ${locale.getCurrency()}. They are round examples, not exchange-rate conversions.`); }
  }
  function consumeAskHandoff(){
    let raw=null; try{ raw=sessionStorage.getItem(HANDOFF_KEY); if(raw) sessionStorage.removeItem(HANDOFF_KEY); }catch(_err){}
    if(!raw) return false;
    let payload; try{ payload=JSON.parse(raw); }catch(_err){ return false; }
    const now=Date.now();
    if(payload?.version!==1||!payload.input||!Number.isFinite(Number(payload.createdAt))||now-Number(payload.createdAt)>15*60*1000||Number(payload.expiresAt||0)<now) return false;
    if(payload.country&&payload.currency&&typeof locale.setLocale==='function'&&(locale.getRegion()!==payload.country||locale.getCurrency()!==payload.currency)){
      locale.setLocale(payload.country,payload.currency);
    }
    applyValues(payload.input); usingStarterValues=false;
    contextualActionMessageActive=true;
    setText('actionMessage','Values carried over from Ask Carrowmont. Review or edit any assumption before relying on the result.');
    return true;
  }

  function statusCopy(r){
    if(!r.ok) return {tone:'risk',label:'CHECK THE INPUTS',headline:'This purchase cannot be modeled yet.',text:(r.errors||[])[0]||'Add the required purchase and household figures.'};
    switch(r.classification){
      case 'MONTHLY_SHORTFALL': return {tone:'risk',label:'MONTHLY SHORTFALL',headline:`This purchase would leave ${money(r.afterCashRoom)} per month.`,text:'The modeled loan payment and running costs push household cash room below zero after essentials and existing debt.'};
      case 'STRESS_SHORTFALL': return {tone:'warn',label:'STRESS SCENARIO NEEDS ATTENTION',headline:`Base cash room is ${money(r.afterCashRoom)} per month.`,text:`Under your higher-rate and higher-running-cost stress inputs, monthly cash room falls to ${money(r.stressCashRoom)}.`};
      case 'BELOW_CHOSEN_RUNWAY_TARGET': return {tone:'warn',label:'EMERGENCY RUNWAY BELOW YOUR TARGET',headline:`The purchase leaves about ${months(r.runwayAfterMonths)} of modeled runway.`,text:`Your chosen emergency-runway target is ${r.runwayTargetMonths} months. The purchase increases ongoing monthly need and may also use part of the reserve.`};
      case 'BUFFER_REDUCED': return {tone:'warn',label:'EMERGENCY BUFFER REDUCED',headline:`The purchase leaves ${money(r.afterCashRoom)} per month of modeled cash room.`,text:`You chose to use emergency savings toward the purchase, leaving about ${months(r.runwayAfterMonths)} of modeled runway.`};
      default: return {tone:'',label:'MODELED PURCHASE PICTURE',headline:`This purchase leaves ${money(r.afterCashRoom)} per month after modeled costs.`,text:`The car adds ${money(r.allInMonthlyCarCost)} per month including the loan payment and running costs you entered. Review the emergency runway and stress scenario before deciding.`};
    }
  }

  function comparisonText(item){
    const paymentChange=item.monthlyPaymentDifference<0?`${money(Math.abs(item.monthlyPaymentDifference))} less per month`:`${money(item.monthlyPaymentDifference)} more per month`;
    const interestChange=item.totalInterestDifference<0?`${money(Math.abs(item.totalInterestDifference))} less total interest`:`${money(item.totalInterestDifference)} more total interest`;
    if(item.id==='lower-price') return `${item.label}: ${money(item.vehiclePrice)} vehicle price → ${money(item.monthlyPayment)} payment (${paymentChange}; ${interestChange}).`;
    if(item.id==='more-down') return `${item.label}: ${money(item.downPayment)} total down payment → ${money(item.monthlyPayment)} payment (${paymentChange}; ${interestChange}; ${money(item.extraUpfrontCash)} extra upfront cash).`;
    return `${item.label}: ${item.termMonths} months → ${money(item.monthlyPayment)} payment (${paymentChange}; ${interestChange}).`;
  }

  function render(r){
    lastResult=r;
    const s=statusCopy(r), card=byId('statusCard'); if(card) card.dataset.tone=s.tone;
    setText('statusLabel',s.label); setText('statusHeadline',s.headline); setText('statusText',s.text);
    if(!r.ok){ ['loanAmountValue','monthlyPaymentValue','allInCostValue','cashRoomValue','runwayValue','stressCashRoomValue','totalInterestValue','currentDtiText','afterDtiText'].forEach(id=>setText(id,'-')); return; }
    setText('loanAmountValue',money(r.loanAmount));
    setText('monthlyPaymentValue',money(r.monthlyLoanPayment));
    setText('monthlyPaymentNote',`${r.assumptions.termMonths} months at ${r.assumptions.annualRate}%`);
    setText('allInCostValue',money(r.allInMonthlyCarCost));
    setText('cashRoomValue',money(r.afterCashRoom));
    setText('cashRoomText',`Before the car, modeled monthly room is ${money(r.currentCashRoom)}. The car reduces it by ${money(r.allInMonthlyCarCost)}.`);
    setText('runwayValue',months(r.runwayAfterMonths));
    setText('runwayText',`Before purchase: ${months(r.runwayBeforeMonths)}. Your selected target is ${r.runwayTargetMonths} months; modeled target gap after purchase is ${money(r.runwayTargetGap)}.`);
    setText('stressCashRoomValue',money(r.stressCashRoom));
    setText('stressCashRoomText',`At ${r.stressedRate}% interest and ${r.assumptions.runningCostStressPct}% higher running costs, modeled all-in car cost becomes ${money(r.stressedAllInMonthlyCarCost)} per month.`);
    setText('totalInterestValue',money(r.loanTotalInterest));
    setText('totalInterestText',`${money(r.loanTotalRepayment)} total modeled loan repayments over ${r.assumptions.termMonths} months.`);
    setText('currentDtiText',pct(r.currentGrossDtiPct)); setText('afterDtiText',pct(r.afterGrossDtiPct));
    const current=Math.max(0,Math.min(100,r.currentGrossDtiPct||0)), after=Math.max(0,Math.min(100,r.afterGrossDtiPct||0));
    if(byId('currentDtiBar')) byId('currentDtiBar').style.width=`${current}%`; if(byId('afterDtiBar')) byId('afterDtiBar').style.width=`${after}%`;
    const comparisonList=byId('comparisonList');
    if(comparisonList){
      if(!r.comparisons.length){ const div=document.createElement('div'); div.className='car-warning'; div.textContent='Add an alternative price, extra down payment or longer term to compare another scenario.'; comparisonList.replaceChildren(div); }
      else comparisonList.replaceChildren(...r.comparisons.map(item=>{const div=document.createElement('div');div.className='car-warning';div.textContent=comparisonText(item);return div;}));
    }
    const warnings=byId('warnings'); if(warnings){warnings.replaceChildren(...r.warnings.map(message=>{const div=document.createElement('div');div.className='car-warning';div.textContent=message;return div;}));}
  }

  function calculate(){ try{render(core.calculate(state(),engines()));if(!contextualActionMessageActive)setText('actionMessage','');}catch(error){console.error(error);render({ok:false,errors:['A required Carrowmont engine could not be loaded.'],warnings:[]});} }
  function summaryText(){
    if(!lastResult||!lastResult.ok)return''; const r=lastResult;
    return ['Carrowmont Car Affordability & Auto Decision result',`Vehicle price: ${money(r.vehiclePrice)}`,`Loan amount: ${money(r.loanAmount)}`,`Monthly loan payment: ${money(r.monthlyLoanPayment)}`,`Monthly running costs: ${money(r.monthlyRunningCosts)}`,`All-in monthly car cost: ${money(r.allInMonthlyCarCost)}`,`Monthly cash room before car: ${money(r.currentCashRoom)}`,`Monthly cash room after car: ${money(r.afterCashRoom)}`,`Current gross-income DTI: ${pct(r.currentGrossDtiPct)}`,`Gross-income DTI after car loan: ${pct(r.afterGrossDtiPct)}`,`Emergency runway before purchase: ${months(r.runwayBeforeMonths)}`,`Emergency runway after purchase: ${months(r.runwayAfterMonths)}`,`Stress monthly cash room: ${money(r.stressCashRoom)}`,'No universal car-affordability cutoff or lender-approval prediction is applied.',`Methodology version: ${r.methodologyVersion}`].join('\n');
  }
  async function copySummary(){try{await navigator.clipboard.writeText(summaryText());setText('actionMessage','Summary copied.');}catch(_){setText('actionMessage','Copy was not available in this browser.');}}
  const csvCell=v=>/[",\n]/.test(String(v??''))?`"${String(v??'').replace(/"/g,'""')}"`:String(v??'');
  function downloadCsv(){ if(!lastResult||!lastResult.ok)return; const r=lastResult,a=r.assumptions; const rows=[['Carrowmont Car Affordability & Auto Decision'],['Methodology version',r.methodologyVersion],['Currency',locale.getCurrency()],['Vehicle price',r.vehiclePrice],['Down payment',a.downPayment],['Trade-in credit',a.tradeInCredit],['Upfront taxes / fees',a.upfrontTaxesFees],['Loan amount',r.loanAmount],['Annual rate %',a.annualRate],['Term months',a.termMonths],['Monthly loan payment',r.monthlyLoanPayment],['Monthly running costs',r.monthlyRunningCosts],['All-in monthly car cost',r.allInMonthlyCarCost],['Take-home monthly income',a.takeHomeMonthlyIncome],['Essential monthly expenses',a.essentialMonthlyExpenses],['Existing monthly debt payments',a.existingMonthlyDebtPayments],['Monthly cash room before car',r.currentCashRoom],['Monthly cash room after car',r.afterCashRoom],['Gross-income DTI before %',r.currentGrossDtiPct??''],['Gross-income DTI after %',r.afterGrossDtiPct??''],['Emergency savings before',a.emergencySavings],['Emergency savings used for purchase',a.emergencySavingsUsedForPurchase],['Emergency reserve after purchase',r.reserveAfterPurchase],['Emergency runway before months',r.runwayBeforeMonths??''],['Emergency runway after months',r.runwayAfterMonths??''],['Chosen runway target months',r.runwayTargetMonths],['Stress interest rate %',r.stressedRate],['Stress running costs',r.stressedRunningCosts],['Stress monthly cash room',r.stressCashRoom],['Important','No universal affordability cutoff or lender-approval prediction']]; const blob=new Blob([rows.map(row=>row.map(csvCell).join(',')).join('\n')+'\n'],{type:'text/csv;charset=utf-8'}); const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='carrowmont-car-affordability-auto-decision.csv';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);setText('actionMessage','CSV has been downloaded.'); }
  async function generateReport(){if(!lastResult?.ok||!window.CarrowmontCarAffordabilityPdfRenderer)return;try{setText('actionMessage','Preparing report...');await window.CarrowmontCarAffordabilityPdfRenderer.generate({result:lastResult,currency:locale.getCurrency(),locale:locale.getLocale()});setText('actionMessage','Report has been downloaded.');}catch(error){console.error(error);setText('actionMessage','The report could not be generated.');}}

  byId('calculateBtn')?.addEventListener('click',()=>{ contextualActionMessageActive=false; calculate(); });
  ids.forEach(id=>byId(id)?.addEventListener('input',()=>{ if(!applyingProgrammaticValues){ if(monetaryIds.includes(id)) usingStarterValues=false; contextualActionMessageActive=false; } calculate(); }));
  byId('copySummaryBtn')?.addEventListener('click',copySummary); byId('downloadCsvBtn')?.addEventListener('click',downloadCsv); byId('generateReportBtn')?.addEventListener('click',generateReport);
  const usedHandoff=consumeAskHandoff();
  if(!usedHandoff) applyStarterDefaults(false);
  window.addEventListener('carrowmont:localechange',()=>{ if(usingStarterValues) applyStarterDefaults(true); calculate(); });
  calculate();
})();
