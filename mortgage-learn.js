(function(){
  'use strict';
  var L=window.CarrowmontLocale;
  if(!L)return;

  function profile(region){
    var map={
      IN:{kicker:'HOME LOAN PREPAYMENT GUIDE',calculator:'Home Loan Prepayment / Foreclosure Calculator',decisionCalculator:'Home Loan Prepayment vs Investing Calculator',context:'For India, Carrowmont uses home-loan, EMI and prepayment / foreclosure terminology. The examples remain universal loan maths; confirm lender-specific charges, tax treatment and rules before acting.'},
      US:{kicker:'MORTGAGE PAYOFF GUIDE',calculator:'Mortgage Payoff Calculator',decisionCalculator:'Mortgage Prepayment vs Investing Calculator',context:'For the United States, Carrowmont uses mortgage, extra-principal and payoff terminology. Servicer processing, taxes and any prepayment penalty can affect the real result.'},
      CA:{kicker:'MORTGAGE PREPAYMENT GUIDE',calculator:'Mortgage Prepayment & Payoff Calculator',decisionCalculator:'Mortgage Prepayment vs Investing Calculator',context:'For Canada, Carrowmont uses mortgage prepayment and amortization terminology. Prepayment privileges and penalties are contract-specific, and fixed-rate compounding conventions can differ from a general illustration.'},
      GB:{kicker:'MORTGAGE OVERPAYMENT GUIDE',calculator:'Mortgage Overpayment Calculator',decisionCalculator:'Mortgage Overpayment vs Investing Calculator',context:'For the UK, Carrowmont uses mortgage overpayment and early-repayment terminology. Check any annual overpayment allowance, Early Repayment Charge and tax treatment in the actual situation.'},
      AU:{kicker:'HOME LOAN EXTRA REPAYMENT GUIDE',calculator:'Home Loan Extra Repayments Calculator',decisionCalculator:'Extra Home Loan Repayments vs Investing Calculator',context:'For Australia, Carrowmont uses home-loan and extra-repayment terminology. Fixed-rate conditions, redraw, offset, lender fees and tax treatment can change the real-world result.'},
      NZ:{kicker:'HOME LOAN EXTRA REPAYMENT GUIDE',calculator:'Home Loan Extra Repayments Calculator',decisionCalculator:'Extra Home Loan Repayments vs Investing Calculator',context:'For New Zealand, Carrowmont uses home-loan and extra-repayment terminology. Contract limits, break fees and tax treatment can affect the real result.'},
      IE:{kicker:'MORTGAGE OVERPAYMENT GUIDE',calculator:'Mortgage Overpayment Calculator',decisionCalculator:'Mortgage Overpayment vs Investing Calculator',context:'For Ireland, Carrowmont uses mortgage overpayment and early-repayment terminology. Check the loan contract for any applicable limits or charges and consider local tax treatment.'}
    };
    return map[region]||{kicker:'MORTGAGE / HOME LOAN GUIDE',calculator:'Mortgage / Home Loan Payoff Calculator',decisionCalculator:'Mortgage / Home Loan Prepayment vs Investing Calculator',context:'Carrowmont keeps the loan maths universal and uses general mortgage / home-loan terminology for this country profile. Confirm local lender rules, fees, tax treatment and interest conventions before acting.'};
  }
  function terms(){
    return L.getMortgageTerms?L.getMortgageTerms():{homeLoanMarket:false,mortgageMarket:false,noun:'mortgage or home loan',nounCap:'Mortgage / home loan',familyName:'Mortgage / Home Loan Decision Centre',learnGuides:'Home Loan & Mortgage guides',payoffLabel:'Mortgage / Home Loan Payoff'};
  }
  function setText(el,value){if(el&&value)el.textContent=value;}
  function capitalizeAfterColon(value){
    return String(value||'').replace(/(:[^A-Za-z]*)([a-z])/g,function(_,prefix,letter){return prefix+letter.toUpperCase();});
  }
  function selectedPath(){return (window.location.pathname||'').replace(/\/+$/,'');}
  function articleTitle(path,p,t){
    if(path.endsWith('/mortgage-prepayment-vs-investing.html'))return t.learnPrepayTitle||((p.decisionCalculator||'').replace(/ Calculator$/,'')+': How should the trade-off be compared?');
    if(path.endsWith('/mortgage-refinance-break-even.html'))return t.learnRefiTitle||'When does refinancing or a balance transfer break even?';
    if(path.endsWith('/mortgage-rate-rise-payment-stress.html'))return t.learnStressTitle||'How much could your mortgage payment rise if rates increase?';
    if(path.endsWith('/one-extra-mortgage-payment-a-year.html'))return 'One extra '+t.noun+' payment a year: How much time and interest could it save?';
    if(path.endsWith('/monthly-extra-vs-annual-lump-sum-mortgage.html'))return 'Monthly extra vs one annual lump sum: Which pays off a '+t.noun+' faster?';
    if(path.endsWith('/biweekly-fortnightly-mortgage-payments.html'))return 'Biweekly or fortnightly '+t.noun+' payments: Where do the savings actually come from?';
    if(path.endsWith('/extra-mortgage-payments-early-vs-late.html'))return 'Why extra '+t.noun+' payments made earlier can save more';
    if(path.endsWith('/pay-off-mortgage-five-years-early.html'))return 'How much extra do you need to pay to clear a '+t.noun+' five years earlier?';
    return '';
  }
  function pageKicker(path,p,t){
    var region=L.getRegion();
    if(path.endsWith('/mortgage-refinance-break-even.html')){
      if(region==='IN')return 'HOME LOAN BALANCE TRANSFER GUIDE';
      if(['GB','IE'].includes(region))return 'REMORTGAGE / MORTGAGE SWITCH GUIDE';
      if(['AU','NZ'].includes(region))return 'HOME LOAN REFINANCE GUIDE';
      if(['US','CA'].includes(region))return 'MORTGAGE REFINANCE GUIDE';
      return 'MORTGAGE / HOME LOAN REFINANCE GUIDE';
    }
    if(path.endsWith('/mortgage-rate-rise-payment-stress.html')){
      return t.homeLoanMarket?'HOME LOAN RATE-STRESS GUIDE':t.mortgageMarket?'MORTGAGE RATE-STRESS GUIDE':'MORTGAGE / HOME LOAN RATE-STRESS GUIDE';
    }
    return p.kicker;
  }
  function pageContext(path,p,t){
    var region=L.getRegion();
    if(path.endsWith('/mortgage-refinance-break-even.html')){
      if(region==='IN')return 'For India, Carrowmont uses home-loan balance-transfer wording. Enter the actual switching costs, charges and cashback from the offer; Carrowmont does not invent lender fees or eligibility rules.';
      if(['GB','IE'].includes(region))return 'Carrowmont uses familiar remortgage / mortgage-switch wording here. Enter the actual fees, charges and incentives from the offer; product rules and eligibility remain lender-specific.';
      if(['AU','NZ'].includes(region))return 'Carrowmont uses home-loan refinance wording here. Enter the actual switching costs, fees and incentives from the offer; lender rules and eligibility remain specific to the product.';
      if(['US','CA'].includes(region))return 'Carrowmont uses mortgage refinance wording here. Enter the actual closing or switching costs and incentives from the offer; lender rules and eligibility remain product-specific.';
      return 'Carrowmont keeps the refinance maths universal. Enter the actual switching costs and incentives from the offer and confirm local lender rules before acting.';
    }
    if(path.endsWith('/mortgage-rate-rise-payment-stress.html')){
      if(region==='IN')return 'For India, Carrowmont uses home-loan and EMI / payment wording. Rate changes are scenarios, not forecasts, and the household-budget section is optional.';
      if(['AU','NZ'].includes(region))return 'Carrowmont uses home-loan repayment wording. Rate changes are scenarios, not forecasts, and the household-budget section is optional.';
      if(t.mortgageMarket)return 'Carrowmont uses mortgage-payment wording. Rate changes are scenarios, not forecasts, and the household-budget section is optional.';
      return 'Carrowmont uses general mortgage / home-loan wording. Rate changes are scenarios, not forecasts, and the household-budget section is optional.';
    }
    return p.context;
  }
  function localizeLoanWords(value,t){
    if(!value)return value;
    var v=value;
    if(t.homeLoanMarket){
      v=v.replace(/Mortgage \/ Home Loan/g,'Home Loan').replace(/mortgage \/ home loan/g,'home loan');
      v=v.replace(/Home Loan & Mortgage guides/g,'Home Loan guides').replace(/Home Loans & Mortgages/g,'Home Loans');
      v=v.replace(/mortgage or home[- ]loan/gi,'home loan').replace(/mortgage\/home[- ]loan/gi,'home loan');
      v=v.replace(/\bMortgages\b/g,'Home loans').replace(/\bmortgages\b/g,'home loans');
      v=v.replace(/\bMortgage\b/g,'Home loan').replace(/\bmortgage\b/g,'home loan');
    }else if(t.mortgageMarket){
      v=v.replace(/Mortgage \/ Home Loan/g,'Mortgage').replace(/mortgage \/ home loan/g,'mortgage');
      v=v.replace(/Home Loan & Mortgage guides/g,'Mortgage guides').replace(/Home Loans & Mortgages/g,'Mortgages');
      v=v.replace(/mortgage or home[- ]loan/gi,'mortgage').replace(/mortgage\/home[- ]loan/gi,'mortgage');
      v=v.replace(/home[- ]loan or mortgage/gi,'mortgage');
      v=v.replace(/\bHome loans\b/g,'Mortgages').replace(/\bhome loans\b/g,'mortgages');
      v=v.replace(/\bHome loan\b/g,'Mortgage').replace(/\bhome loan\b/g,'mortgage').replace(/\bhome-loan\b/g,'mortgage');
    }
    return v;
  }
  function updateVisibleFrame(p,t){
    var hero=document.querySelector('.learn-page-hero');
    var title=hero&&hero.querySelector('h1');
    var localizedTitle=articleTitle(selectedPath(),p,t);if(title&&localizedTitle)title.textContent=capitalizeAfterColon(localizedTitle);
    if(hero){var intro=hero.querySelector('p:not(.article-meta)');if(intro)intro.textContent=localizeLoanWords(intro.textContent,t);}
    document.querySelectorAll('main h2, main h3').forEach(function(el){if(!el.closest('.reference-note'))el.textContent=localizeLoanWords(el.textContent,t);});
    document.querySelectorAll('.guide-answer p').forEach(function(el){el.textContent=localizeLoanWords(el.textContent,t);});
    document.querySelectorAll('.learn-more-row a[href="/learn.html#home-loans"]').forEach(function(a){a.textContent='← Back to '+t.learnGuides;});
    document.querySelectorAll('.guide-index strong,.guide-index small').forEach(function(el){el.textContent=localizeLoanWords(el.textContent,t);});
    document.querySelectorAll('.footer-col a[href="/mortgage-payoff-calculator/"]').forEach(function(a){a.textContent=t.payoffLabel;});
  }
  function apply(){
    var region=L.getRegion(),p=profile(region),t=terms(),path=selectedPath();
    var k=document.getElementById('articleKicker');if(k)k.textContent=pageKicker(path,p,t);
    var c=document.getElementById('mortgageLocaleContext');if(c)c.textContent=pageContext(path,p,t);
    document.querySelectorAll('[data-cm-mortgage-term="loan"]').forEach(function(el){el.textContent=t.noun;});
    document.querySelectorAll('[data-cm-mortgage-term="calculator"]').forEach(function(el){el.textContent=p.calculator;});
    document.querySelectorAll('[data-cm-mortgage-term="decision-calculator"]').forEach(function(el){el.textContent=p.decisionCalculator;});
    document.querySelectorAll('.learn-tool-return a[href="/mortgage-payoff-calculator/"]').forEach(function(a){
      var label=a.querySelector('span');if(label){label.textContent='Continue with the '+p.calculator;label.setAttribute('data-cm-mortgage-term','calculator-return');}
      a.setAttribute('aria-label','Continue with the '+p.calculator);
    });
    document.querySelectorAll('.learn-tool-return a[href="/mortgage-payoff-calculator/prepayment-vs-investing.html"]').forEach(function(a){
      var label=a.querySelector('span');if(label){label.textContent='Continue with the '+p.decisionCalculator;label.setAttribute('data-cm-mortgage-term','decision-calculator-return');}
      a.setAttribute('aria-label','Continue with the '+p.decisionCalculator);
    });
    document.querySelectorAll('[data-cm-mortgage-term="calculator-return"]').forEach(function(el){el.textContent='Continue with the '+p.calculator;});
    document.querySelectorAll('[data-cm-mortgage-term="decision-calculator-return"]').forEach(function(el){el.textContent='Continue with the '+p.decisionCalculator;});
    updateVisibleFrame(p,t);
  }
  function schedule(){apply();if(window.requestAnimationFrame)window.requestAnimationFrame(apply);window.setTimeout(apply,0);window.setTimeout(apply,120);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
  window.addEventListener('carrowmont:localechange',schedule);window.addEventListener('pageshow',schedule);
})();
