(function () {
  'use strict';
  const core = window.CarrowmontBorrowingHealthCore;
  const locale = window.CarrowmontLocale;
  if (!core || !locale) return;

  const byId = id => document.getElementById(id);
  const ids = ['grossMonthlyIncome','takeHomeMonthlyIncome','essentialNonDebtExpenses','housingDebtPayment','otherLoanPayments','creditCardMinimums','otherDebtPayments','proposedNewDebtPayment','incomeDropPct'];
  let lastResult = null;
  const value = id => { const n = Number(byId(id)?.value); return Number.isFinite(n) ? n : 0; };
  const state = () => Object.fromEntries(ids.map(id => [id, value(id)]));
  const money = n => locale.formatMoney(n, { maximumFractionDigits:0 });
  const pct = n => n == null || !Number.isFinite(n) ? 'Not available' : `${n.toFixed(n >= 10 ? 1 : 2).replace(/\.0$/,'')}%`;
  const setText = (id,text) => { const el=byId(id); if(el) el.textContent=text; };

  function statusCopy(r){
    switch(r.classification){
      case 'CURRENT_DEFICIT': return {tone:'risk',label:'CURRENT CASH FLOW NEEDS ATTENTION',headline:`Current DTI is ${pct(r.currentGrossDtiPct)}.`,text:`Using the take-home income and essential costs entered, required debt and essentials exceed monthly take-home income by ${money(Math.abs(r.currentCashRoom))}.`};
      case 'PROPOSED_DEFICIT': return {tone:'risk',label:'PROPOSED PAYMENT CREATES A SHORTFALL',headline:`DTI would rise from ${pct(r.currentGrossDtiPct)} to ${pct(r.proposedGrossDtiPct)}.`,text:`The proposed payment would move the modeled monthly cash room to ${money(r.proposedCashRoom)} after debt and essential costs.`};
      case 'PROPOSED_TIGHTENING': return {tone:'warn',label:'PROPOSED BORROWING TIGHTENS THE BUDGET',headline:`DTI would rise from ${pct(r.currentGrossDtiPct)} to ${pct(r.proposedGrossDtiPct)}.`,text:r.proposedCashRoom==null?'Add take-home income if you also want to see the effect on monthly cash room.':`After the proposed payment, modeled monthly cash room is ${money(r.proposedCashRoom)} after debt and essential costs.`};
      case 'CASHFLOW_VIEW': return {tone:'',label:'CURRENT BORROWING PICTURE',headline:`Current DTI is ${pct(r.currentGrossDtiPct)}.`,text:`Modeled monthly cash room after debt and essential costs is ${money(r.currentCashRoom)}. Add a proposed payment to compare another borrowing scenario.`};
      case 'RATIO_ONLY': return {tone:'warn',label:'RATIO VIEW ONLY',headline:`Current DTI is ${pct(r.currentGrossDtiPct)}.`,text:'Add take-home income and essential non-debt costs to see how much monthly cash room remains after required payments.'};
      default:return {tone:'risk',label:'ADD GROSS MONTHLY INCOME',headline:'Debt-to-income cannot be calculated yet.',text:'Enter gross monthly income and required monthly debt payments.'};
    }
  }

  function render(r){
    lastResult=r; const s=statusCopy(r); const card=byId('statusCard'); if(card) card.dataset.tone=s.tone;
    setText('statusLabel',s.label);setText('statusHeadline',s.headline);setText('statusText',s.text);
    setText('currentDebtValue',money(r.currentDebtPayments));setText('currentDtiValue',pct(r.currentGrossDtiPct));setText('proposedDtiValue',pct(r.proposedGrossDtiPct));
    setText('proposedDtiNote',r.proposedNewDebtPayment>0?`${money(r.proposedNewDebtPayment)} proposed monthly payment included`:'No proposed payment entered');
    const current=Math.max(0,Math.min(100,r.currentGrossDtiPct||0)), proposed=Math.max(0,Math.min(100,r.proposedGrossDtiPct||0));
    if(byId('currentDtiBar')) byId('currentDtiBar').style.width=`${current}%`; if(byId('proposedDtiBar')) byId('proposedDtiBar').style.width=`${proposed}%`;
    setText('currentDtiBarText',pct(r.currentGrossDtiPct));setText('proposedDtiBarText',pct(r.proposedGrossDtiPct));
    if(r.currentCashRoom==null){setText('cashRoomValue','Add take-home income');setText('cashRoomText','Cash room needs take-home income. Essential costs improve this view further.');}
    else{setText('cashRoomValue',money(r.proposedNewDebtPayment>0?r.proposedCashRoom:r.currentCashRoom));setText('cashRoomText',r.proposedNewDebtPayment>0?`Current room is ${money(r.currentCashRoom)}; the proposed payment reduces it by ${money(r.proposedNewDebtPayment)}.`:'After current debt payments and essential non-debt costs entered.');}
    setText('stressDtiValue',pct(r.stressedGrossDtiPct));setText('stressDtiText',`With a ${r.assumptions.incomeDropPct}% gross-income drop, modeled gross income becomes ${money(r.stressedGrossIncome)} and the ${r.proposedNewDebtPayment>0?'proposed':'current'} debt payment load is shown above.`);
    setText('referenceText','Debt-to-income definitions, underwriting limits and affordability tests vary by lender, product and country. Carrowmont shows the arithmetic and cash-flow effect; it does not apply a universal approval threshold or predict loan approval.');
    const warnings=byId('warnings'); if(warnings){warnings.replaceChildren(...r.warnings.map(message=>{const div=document.createElement('div');div.className='bh-warning';div.textContent=message;return div;}));}
  }
  function calculate(){render(core.calculate(state()));setText('actionMessage','');}
  function summaryText(){if(!lastResult)return'';const r=lastResult;return ['Carrowmont Debt-to-Income & Borrowing Health result',`Current monthly debt payments: ${money(r.currentDebtPayments)}`,`Current gross-income DTI: ${pct(r.currentGrossDtiPct)}`,`Proposed new monthly debt payment: ${money(r.proposedNewDebtPayment)}`,`Gross-income DTI after proposed payment: ${pct(r.proposedGrossDtiPct)}`,`Current monthly cash room: ${r.currentCashRoom==null?'Not calculated':money(r.currentCashRoom)}`,`Monthly cash room after proposed payment: ${r.proposedCashRoom==null?'Not calculated':money(r.proposedCashRoom)}`,`Income-drop stress: ${r.assumptions.incomeDropPct}%`,`Stressed gross-income DTI: ${pct(r.stressedGrossDtiPct)}`,'DTI is context, not a universal safe/unsafe cutoff or lender-approval prediction.',`Methodology version: ${r.methodologyVersion}`].join('\n');}
  async function copySummary(){try{await navigator.clipboard.writeText(summaryText());setText('actionMessage','Summary copied.');}catch(_){setText('actionMessage','Copy was not available in this browser.');}}
  const csvCell=v=>/[",\n]/.test(String(v??''))?`"${String(v??'').replace(/"/g,'""')}"`:String(v??'');
  function downloadCsv(){if(!lastResult)return;const r=lastResult,a=r.assumptions;const rows=[['Carrowmont Debt-to-Income & Borrowing Health'],['Methodology version',r.methodologyVersion],['Currency',locale.getCurrency()],['Gross monthly income',a.grossMonthlyIncome],['Take-home monthly income',a.takeHomeMonthlyIncome],['Essential non-debt expenses',a.essentialNonDebtExpenses],['Housing debt payment',a.housingDebtPayment],['Other loan payments',a.otherLoanPayments],['Credit-card minimums',a.creditCardMinimums],['Other debt payments',a.otherDebtPayments],['Current monthly debt payments',r.currentDebtPayments],['Current gross-income DTI %',r.currentGrossDtiPct??''],['Proposed new monthly debt payment',r.proposedNewDebtPayment],['Proposed monthly debt payments',r.proposedDebtPayments],['Proposed gross-income DTI %',r.proposedGrossDtiPct??''],['Current monthly cash room',r.currentCashRoom??''],['Proposed monthly cash room',r.proposedCashRoom??''],['Income-drop stress %',a.incomeDropPct],['Stressed gross income',r.stressedGrossIncome],['Stressed gross-income DTI %',r.stressedGrossDtiPct??''],['Important','Not a lender-approval estimate or universal DTI cutoff']];const blob=new Blob([rows.map(row=>row.map(csvCell).join(',')).join('\n')+'\n'],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='carrowmont-debt-to-income-borrowing-health.csv';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);setText('actionMessage','CSV has been downloaded.');}
  async function generateReport(){if(!lastResult||!window.CarrowmontBorrowingHealthPdfRenderer)return;try{setText('actionMessage','Preparing report...');await window.CarrowmontBorrowingHealthPdfRenderer.generate({result:lastResult,currency:locale.getCurrency(),locale:locale.getLocale()});setText('actionMessage','Report has been downloaded.');}catch(error){console.error(error);setText('actionMessage','The report could not be generated.');}}
  byId('calculateBtn')?.addEventListener('click',calculate);ids.forEach(id=>byId(id)?.addEventListener('input',calculate));byId('copySummaryBtn')?.addEventListener('click',copySummary);byId('downloadCsvBtn')?.addEventListener('click',downloadCsv);byId('generateReportBtn')?.addEventListener('click',generateReport);window.addEventListener('carrowmont:localechange',()=>render(core.calculate(state())));calculate();
})();
