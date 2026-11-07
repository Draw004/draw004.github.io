(function (root, factory) {
  'use strict';
  const api = factory(root.CarrowmontFreEngineCatalog);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFreIntentRouter = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (catalog) {
  'use strict';

  const VERSION = 1;
  const INTENTS = Object.freeze({
    EMERGENCY_RUNWAY:'emergency-runway',
    BORROWING_HEALTH:'borrowing-health',
    DEBT_VS_SAVINGS:'debt-vs-savings',
    CAR_AFFORDABILITY:'car-affordability',
    HOME_AFFORDABILITY:'home-affordability',
    MORTGAGE_PREPAY_VS_INVEST:'mortgage-prepay-vs-invest',
    DEBT_PAYOFF:'debt-payoff',
    CREDIT_CARD_PAYOFF:'credit-card-payoff',
    RETIREMENT_READINESS:'retirement-readiness',
    GOAL_FUNDING:'goal-funding',
    LOAN_COST:'loan-cost',
    INFLATION_IMPACT:'inflation-impact',
    RECURRING_INVESTMENT:'recurring-investment',
    GENERAL:'general-financial-question'
  });

  const ROUTES = Object.freeze({
    [INTENTS.EMERGENCY_RUNWAY]: Object.freeze({ priorityStage:'protect', engineIds:['emergency-fund-runway'], requirements:[
      { path:'cashFlow.essentialExpenses', label:'Essential monthly expenses' },
      { path:'resilience.liquidSavings', label:'Emergency savings available now' }
    ]}),
    [INTENTS.BORROWING_HEALTH]: Object.freeze({ priorityStage:'reduce', engineIds:['debt-to-income-borrowing-health'], requirements:[
      { path:'cashFlow.grossMonthlyIncome', label:'Gross monthly income' },
      { path:'debt.monthlyPayments', label:'Required monthly debt payments' }
    ]}),
    [INTENTS.DEBT_VS_SAVINGS]: Object.freeze({ priorityStage:'reduce', engineIds:['budget-cash-flow','debt-payoff','compound-interest'], requirements:[
      { path:'cashFlow.monthlyIncome', label:'Monthly take-home income' },
      { path:'cashFlow.essentialExpenses', label:'Essential monthly expenses' },
      { path:'resilience.liquidSavings', label:'Cash savings' },
      { path:'debt.totalBalance', label:'Total debt balance' },
      { path:'debt.highestApr', label:'Highest debt interest rate' }
    ]}),
    [INTENTS.CAR_AFFORDABILITY]: Object.freeze({ priorityStage:'build', engineIds:['car-affordability'], requirements:[
      { path:'cashFlow.monthlyIncome', label:'Monthly take-home income' },
      { path:'cashFlow.essentialExpenses', label:'Essential monthly expenses' },
      { path:'debt.monthlyPayments', label:'Existing monthly debt payments' },
      { path:'purchase.carPrice', label:'Expected car price' }
    ]}),
    [INTENTS.HOME_AFFORDABILITY]: Object.freeze({ priorityStage:'build', engineIds:['home-affordability'], requirements:[
      { path:'cashFlow.monthlyIncome', label:'Monthly take-home income' },
      { path:'cashFlow.essentialExpenses', label:'Essential monthly expenses' },
      { path:'debt.monthlyPayments', label:'Existing monthly debt payments' },
      { path:'housing.downPayment', label:'Available deposit or down payment', allowEstimate:true }
    ]}),
    [INTENTS.MORTGAGE_PREPAY_VS_INVEST]: Object.freeze({ priorityStage:'optimize', engineIds:['mortgage-prepay-vs-invest'], requirements:[
      { path:'housing.loanBalance', label:'Current mortgage or home-loan balance' },
      { path:'housing.loanRate', label:'Mortgage or home-loan interest rate' },
      { path:'housing.extraCash', label:'Extra money available to allocate' },
      { path:'investing.expectedReturn', label:'Expected investment return', allowEstimate:true }
    ]}),
    [INTENTS.CREDIT_CARD_PAYOFF]: Object.freeze({ priorityStage:'reduce', engineIds:['credit-card-payoff-comparison'], requirements:[
      { path:'debt.creditCardBalance', label:'Credit-card balance' },
      { path:'debt.highestApr', label:'Credit-card annual interest rate' },
      { path:'debt.monthlyPayments', label:'Current minimum monthly payment' }
    ]}),
    [INTENTS.DEBT_PAYOFF]: Object.freeze({ priorityStage:'reduce', engineIds:['debt-payoff'], requirements:[
      { path:'debt.totalBalance', label:'Debt balances' },
      { path:'debt.monthlyPayments', label:'Monthly debt payment budget' }
    ]}),
    [INTENTS.RETIREMENT_READINESS]: Object.freeze({ priorityStage:'grow', engineIds:['retirement'], requirements:[
      { path:'profile.currentAge', label:'Current age' },
      { path:'retirement.targetAge', label:'Target retirement age' },
      { path:'retirement.currentAssets', label:'Current retirement savings' },
      { path:'retirement.monthlyContribution', label:'Current retirement contribution' }
    ]}),
    [INTENTS.GOAL_FUNDING]: Object.freeze({ priorityStage:'build', engineIds:['goal-planner','recurring-investment'], requirements:[
      { path:'goal.targetAmount', label:'Goal amount' },
      { path:'goal.yearsAway', label:'Years until the goal' },
      { path:'goal.currentSavings', label:'Savings already set aside', allowEstimate:true }
    ]}),
    [INTENTS.LOAN_COST]: Object.freeze({ priorityStage:'reduce', engineIds:['loan'], requirements:[
      { path:'loan.principal', label:'Loan amount' },
      { path:'loan.annualRate', label:'Annual interest rate' },
      { path:'loan.termMonths', label:'Loan term' }
    ]}),
    [INTENTS.INFLATION_IMPACT]: Object.freeze({ priorityStage:'build', engineIds:['inflation'], requirements:[
      { path:'scenario.amount', label:'Amount to test' },
      { path:'scenario.years', label:'Number of years' },
      { path:'scenario.inflationRate', label:'Inflation rate', allowEstimate:true }
    ]}),
    [INTENTS.RECURRING_INVESTMENT]: Object.freeze({ priorityStage:'grow', engineIds:['recurring-investment'], requirements:[
      { path:'investing.recurringContribution', label:'Recurring investment amount' },
      { path:'investing.years', label:'Investment period' },
      { path:'investing.expectedReturn', label:'Expected annual return', allowEstimate:true }
    ]})
  });

  const RULES = Object.freeze([
    [INTENTS.DEBT_VS_SAVINGS, /\b(debt|loan|credit card).{0,40}\b(save|saving|invest)|\b(save|saving|invest).{0,40}\b(debt|loan|credit card)/i],
    [INTENTS.EMERGENCY_RUNWAY, /\b(emergency fund|runway|months? of expenses|without income|lose my job|job loss)\b/i],
    [INTENTS.BORROWING_HEALTH, /\b(debt[- ]?to[- ]?income|dti|borrowing health|debt burden)\b|\b(afford|take on|add).{0,24}\b(another|new).{0,10}\b(loan|debt|payment)\b/i],
    [INTENTS.CAR_AFFORDABILITY, /\b(afford|buy|finance).{0,24}\b(car|vehicle|auto)\b|\b(car|vehicle|auto).{0,24}\bafford/i],
    [INTENTS.HOME_AFFORDABILITY, /\b(afford|buy).{0,24}\b(home|house|property)\b|\b(home|house|property).{0,24}\bafford/i],
    [INTENTS.MORTGAGE_PREPAY_VS_INVEST, /\b(mortgage|home loan).{0,40}\b(prepay|overpay|extra payment).{0,40}\binvest|\binvest.{0,40}\b(mortgage|home loan).{0,40}\b(prepay|overpay)/i],
    [INTENTS.RETIREMENT_READINESS, /\b(retire|retirement|retiring)\b/i],
    [INTENTS.CREDIT_CARD_PAYOFF, /\b(credit card|card).{0,35}\b(pay off|payoff|repay|minimum payment|interest)\b|\b(pay off|payoff|repay).{0,35}\b(credit card|card)\b/i],
    [INTENTS.DEBT_PAYOFF, /\b(pay off|payoff|clear|repay).{0,30}\b(debt|loan|credit card)\b/i],
    [INTENTS.GOAL_FUNDING, /\b(goal|target).{0,30}\b(save|saving|fund|invest)|\bhow much.{0,20}\bsave.{0,20}\bfor\b/i],
    [INTENTS.INFLATION_IMPACT, /\b(inflation|purchasing power|future cost)\b/i],
    [INTENTS.LOAN_COST, /\b(loan|emi).{0,30}\b(cost|payment|interest|repay)/i],
    [INTENTS.RECURRING_INVESTMENT, /\b(sip|recurring investment|monthly investment|regular investment)\b/i]
  ]);

  function classifyText(text) {
    const value = typeof text === 'string' ? text.trim() : '';
    if (!value) return Object.freeze({ intent:INTENTS.GENERAL, matchedRule:null });
    for (const [intent, pattern] of RULES) {
      if (pattern.test(value)) return Object.freeze({ intent, matchedRule:String(pattern) });
    }
    return Object.freeze({ intent:INTENTS.GENERAL, matchedRule:null });
  }

  function engineStatus(id) {
    return catalog?.get?.(id)?.status || 'UNKNOWN_ENGINE';
  }

  function routeForIntent(intent) {
    const route = ROUTES[intent];
    if (!route) return Object.freeze({ intent:INTENTS.GENERAL, status:'NEEDS_CLARIFICATION', priorityStage:null, engineIds:[], engineStatus:[], requirements:[] });
    const statuses = route.engineIds.map(id => ({ id, status:engineStatus(id) }));
    let status = 'READY_FOR_ADAPTERS';
    if (statuses.some(item => item.status === 'PLANNED_ENGINE' || item.status === 'UNKNOWN_ENGINE')) status = 'BLOCKED_MISSING_ENGINE';
    else if (statuses.some(item => item.status === 'EXTRACT_PURE_CORE_BEFORE_FRE')) status = 'PENDING_CORE_EXTRACTION';
    return Object.freeze({ intent, status, priorityStage:route.priorityStage, engineIds:[...route.engineIds], engineStatus:statuses, requirements:route.requirements.map(item => ({ ...item })) });
  }

  function resolve(input = {}) {
    const classified = input.intent ? { intent:input.intent, matchedRule:null } : classifyText(input.text);
    return Object.freeze({ ...classified, route:routeForIntent(classified.intent) });
  }

  return Object.freeze({ VERSION, INTENTS, ROUTES, classifyText, routeForIntent, resolve });
});
