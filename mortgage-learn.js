(function(){
  'use strict';
  var L=window.CarrowmontLocale;
  if(!L)return;
  function profile(region){
    var map={
      IN:{kicker:'HOME LOAN PREPAYMENT GUIDE',loan:'home loan',calculator:'Home Loan Prepayment / Foreclosure Calculator',decisionCalculator:'Home Loan Prepayment vs Investing Calculator',context:'For India, Carrowmont uses home-loan, EMI and prepayment / foreclosure terminology. The examples remain universal loan maths; confirm lender-specific charges, tax treatment and rules before acting.'},
      US:{kicker:'MORTGAGE PAYOFF GUIDE',loan:'mortgage',calculator:'Mortgage Payoff Calculator',decisionCalculator:'Mortgage Prepayment vs Investing Calculator',context:'For the United States, Carrowmont uses mortgage, extra-principal and payoff terminology. Servicer processing, taxes and any prepayment penalty can affect the real result.'},
      CA:{kicker:'MORTGAGE PREPAYMENT GUIDE',loan:'mortgage',calculator:'Mortgage Prepayment & Payoff Calculator',decisionCalculator:'Mortgage Prepayment vs Investing Calculator',context:'For Canada, Carrowmont uses mortgage prepayment and amortization terminology. Prepayment privileges and penalties are contract-specific, and fixed-rate compounding conventions can differ from a general illustration.'},
      GB:{kicker:'MORTGAGE OVERPAYMENT GUIDE',loan:'mortgage',calculator:'Mortgage Overpayment Calculator',decisionCalculator:'Mortgage Overpayment vs Investing Calculator',context:'For the UK, Carrowmont uses mortgage overpayment and early-repayment terminology. Check any annual overpayment allowance, Early Repayment Charge and tax treatment in the actual situation.'},
      AU:{kicker:'HOME LOAN EXTRA REPAYMENT GUIDE',loan:'home loan',calculator:'Home Loan Extra Repayments Calculator',decisionCalculator:'Extra Home Loan Repayments vs Investing Calculator',context:'For Australia, Carrowmont uses home-loan and extra-repayment terminology. Fixed-rate conditions, redraw, offset, lender fees and tax treatment can change the real-world result.'},
      NZ:{kicker:'HOME LOAN EXTRA REPAYMENT GUIDE',loan:'home loan',calculator:'Home Loan Extra Repayments Calculator',decisionCalculator:'Extra Home Loan Repayments vs Investing Calculator',context:'For New Zealand, Carrowmont uses home-loan and extra-repayment terminology. Contract limits, break fees and tax treatment can affect the real result.'},
      IE:{kicker:'MORTGAGE OVERPAYMENT GUIDE',loan:'mortgage',calculator:'Mortgage Overpayment Calculator',decisionCalculator:'Mortgage Overpayment vs Investing Calculator',context:'For Ireland, Carrowmont uses mortgage overpayment and early-repayment terminology. Check the loan contract for any applicable limits or charges and consider local tax treatment.'}
    };
    return map[region]||{kicker:'MORTGAGE / HOME LOAN GUIDE',loan:'mortgage or home loan',calculator:'Mortgage / Home Loan Payoff Calculator',decisionCalculator:'Mortgage / Home Loan Prepayment vs Investing Calculator',context:'Carrowmont keeps the loan maths universal and uses general mortgage / home-loan terminology for this country profile. Confirm local lender rules, fees, tax treatment and interest conventions before acting.'};
  }
  function apply(){
    var p=profile(L.getRegion());
    var k=document.getElementById('articleKicker'); if(k)k.textContent=p.kicker;
    var c=document.getElementById('mortgageLocaleContext'); if(c)c.textContent=p.context;
    document.querySelectorAll('[data-cm-mortgage-term="loan"]').forEach(function(el){el.textContent=p.loan;});
    document.querySelectorAll('[data-cm-mortgage-term="calculator"]').forEach(function(el){el.textContent=p.calculator;});
    document.querySelectorAll('[data-cm-mortgage-term="decision-calculator"]').forEach(function(el){el.textContent=p.decisionCalculator;});
    document.querySelectorAll('.learn-tool-return a[href="/mortgage-payoff-calculator/"]').forEach(function(a){
      var label=a.querySelector('span'); if(label){label.textContent='Continue with the '+p.calculator;label.setAttribute('data-cm-mortgage-term','calculator-return');}
      a.setAttribute('aria-label','Continue with the '+p.calculator);
    });
    document.querySelectorAll('.learn-tool-return a[href="/mortgage-payoff-calculator/prepayment-vs-investing.html"]').forEach(function(a){
      var label=a.querySelector('span'); if(label){label.textContent='Continue with the '+p.decisionCalculator;label.setAttribute('data-cm-mortgage-term','decision-calculator-return');}
      a.setAttribute('aria-label','Continue with the '+p.decisionCalculator);
    });
    document.querySelectorAll('[data-cm-mortgage-term="calculator-return"]').forEach(function(el){el.textContent='Continue with the '+p.calculator;});
    document.querySelectorAll('[data-cm-mortgage-term="decision-calculator-return"]').forEach(function(el){el.textContent='Continue with the '+p.decisionCalculator;});
  }
  function schedule(){apply();if(window.requestAnimationFrame)window.requestAnimationFrame(apply);window.setTimeout(apply,0);window.setTimeout(apply,120);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
  window.addEventListener('carrowmont:localechange',schedule);window.addEventListener('pageshow',schedule);
})();
