(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontMoneyPriorities = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const VERSION = 'money-priorities-v1.0';
  const RULESET_VERSION = 'batch5-2026-11';
  const finite = value => Number.isFinite(Number(value));
  const num = (value, fallback = 0) => finite(value) ? Number(value) : fallback;
  const nonNegative = (value, fallback = 0) => Math.max(0, num(value, fallback));
  const round = (value, digits = 2) => {
    if (!Number.isFinite(value)) return value;
    const factor = 10 ** digits;
    return Math.round((value + Number.EPSILON) * factor) / factor;
  };
  const freeze = value => Object.freeze(value);

  function resolveDependencies(overrides = {}) {
    const deps = {
      budget: overrides.budget || root.CarrowmontBudgetCore,
      emergency: overrides.emergency || root.CarrowmontEmergencyFundCore,
      goal: overrides.goal || root.CarrowmontGoalCore,
      priority: overrides.priority || root.CarrowmontFrePriorityFramework
    };
    if (!deps.budget?.calculate) throw new Error('Missing deterministic Budget core.');
    if (!deps.emergency?.calculate) throw new Error('Missing deterministic Emergency Fund core.');
    if (!deps.goal?.calculate) throw new Error('Missing deterministic Goal core.');
    if (!deps.priority?.STAGES || !deps.priority?.compare) throw new Error('Missing FRE priority framework.');
    return deps;
  }

  function normalizeFacts(facts = {}) {
    return freeze({
      monthlyIncome: nonNegative(facts.monthlyIncome),
      essentialExpenses: nonNegative(facts.essentialExpenses),
      flexibleExpenses: nonNegative(facts.flexibleExpenses),
      monthlyDebtPayments: nonNegative(facts.monthlyDebtPayments),
      emergencySavings: nonNegative(facts.emergencySavings),
      emergencyTargetMonths: Math.min(24, Math.max(1, nonNegative(facts.emergencyTargetMonths, 3) || 3)),
      debtBalance: nonNegative(facts.debtBalance),
      highestDebtAprPct: nonNegative(facts.highestDebtAprPct),
      assumedLongTermReturnPct: num(facts.assumedLongTermReturnPct, 5),
      retirementSavings: nonNegative(facts.retirementSavings),
      retirementMonthlyContribution: nonNegative(facts.retirementMonthlyContribution),
      goalTargetAmount: nonNegative(facts.goalTargetAmount),
      goalCurrentSavings: nonNegative(facts.goalCurrentSavings),
      goalYearsAway: nonNegative(facts.goalYearsAway),
      goalMonthlyContribution: nonNegative(facts.goalMonthlyContribution)
    });
  }

  function stageMeta(priority, id) {
    const stage = priority.get(id);
    if (!stage) throw new Error(`Unknown priority stage: ${id}`);
    return stage;
  }

  function makeMove(stage, status, headline, action, impact, rationale, numbersUsed = {}, assumptions = [], whatCouldChange = []) {
    return freeze({
      stage: stage.id,
      stageLabel: stage.label,
      stageOrder: stage.order,
      status,
      headline,
      action,
      impact,
      rationale,
      numbersUsed: freeze({ ...numbersUsed }),
      assumptions: freeze([...assumptions]),
      whatCouldChange: freeze([...whatCouldChange])
    });
  }

  function create(overrides = {}) {
    const deps = resolveDependencies(overrides);

    function evaluate(rawFacts = {}, options = {}) {
      const facts = normalizeFacts(rawFacts);
      const currency = options.currency || 'USD';

      const budgetState = {
        incomes: [{ amount:facts.monthlyIncome, frequency:'monthly' }],
        essential: [
          { amount:facts.essentialExpenses, frequency:'monthly' },
          { amount:facts.monthlyDebtPayments, frequency:'monthly' }
        ],
        flexible: [{ amount:facts.flexibleExpenses, frequency:'monthly' }],
        savings: [
          { amount:facts.retirementMonthlyContribution, frequency:'monthly' },
          { amount:facts.goalMonthlyContribution, frequency:'monthly' }
        ],
        emergencyCurrent: facts.emergencySavings,
        emergencyTargetMonths: facts.emergencyTargetMonths,
        primaryPayFrequency: 'monthly'
      };
      const budget = deps.budget.calculate(budgetState);
      const emergencyInput = {
        essentialExpenses: facts.essentialExpenses,
        debtPayments: facts.monthlyDebtPayments,
        emergencySavings: facts.emergencySavings,
        targetMonths: facts.emergencyTargetMonths,
        monthlyContribution: 0
      };
      const emergency = deps.emergency.calculate(emergencyInput);

      let goal = null;
      let goalInput = null;
      if (facts.goalTargetAmount > 0) {
        goalInput = {
          today: facts.goalTargetAmount,
          inflation: 0,
          years: facts.goalYearsAway,
          existing: facts.goalCurrentSavings,
          ret: facts.assumedLongTermReturnPct / 100,
          monthly: facts.goalMonthlyContribution,
          contributionFrequency: 'monthly',
          futureLump: 0,
          futureLumpYear: 0
        };
        goal = deps.goal.calculate(goalInput);
      }

      const stages = {};
      const assumptions = [
        freeze({ id:'emergencyTargetMonths', value:facts.emergencyTargetMonths, note:'User-entered emergency-fund target.' }),
        freeze({ id:'assumedLongTermReturnPct', value:facts.assumedLongTermReturnPct, note:'Illustrative return assumption used only for debt-versus-growth and goal screening; not a forecast.' }),
        freeze({ id:'retirementScreen', value:'contribution-status', note:'Batch 5 checks whether retirement saving is active; it does not claim retirement adequacy. Use the Retirement Planner for a full readiness calculation.' })
      ];
      if (goal) assumptions.push(freeze({ id:'goalTargetTreatment', value:'future-target', note:'The entered goal target is treated as the amount required at the goal date, so no separate inflation assumption is added in this priority screen.' }));

      const stabilize = stageMeta(deps.priority, 'stabilize');
      if (facts.monthlyIncome <= 0 || budget.remaining < 0) {
        stages.stabilize = makeMove(stabilize, 'urgent', 'Restore positive monthly cash flow first.', 'Close the monthly cash-flow gap before committing more money to later-stage goals.', 'Immediate', 'The Budget & Cash Flow engine shows that entered monthly outgo is above entered take-home income.', {
          monthlyIncome: budget.income,
          monthlyOutgo: budget.essential + budget.flexible + budget.saving,
          cashFlowRemaining: budget.remaining
        }, [], ['Higher income.', 'Lower essential, flexible, debt or planned saving outgo.', 'A change in the monthly amounts entered.']);
      } else if (budget.remaining === 0) {
        stages.stabilize = makeMove(stabilize, 'needs_attention', 'Create some monthly breathing room.', 'Build a positive monthly margin before increasing later-stage commitments.', 'High', 'The entered plan currently uses all modeled take-home income, leaving no monthly room for shocks.', {
          monthlyIncome: budget.income,
          cashFlowRemaining: budget.remaining
        }, [], ['Higher income.', 'Lower monthly spending or commitments.']);
      } else {
        stages.stabilize = makeMove(stabilize, 'on_track', 'Keep the monthly plan positive.', 'Preserve the positive cash-flow margin while working on the next priority.', 'Maintain', 'The Budget & Cash Flow engine shows positive monthly room after the costs and planned contributions entered.', {
          cashFlowRemaining: budget.remaining
        }, [], ['A drop in income.', 'Higher essential, debt or flexible spending.']);
      }

      const protect = stageMeta(deps.priority, 'protect');
      if ((emergency.fullLossRunwayMonths || 0) < 1) {
        stages.protect = makeMove(protect, 'urgent', 'Build a first emergency cash buffer.', 'Direct available monthly room toward accessible emergency savings before taking more financial risk.', 'Immediate', 'The Emergency Fund engine shows less than one month of unavoidable costs covered.', {
          emergencyRunwayMonths: emergency.fullLossRunwayMonths,
          emergencyTargetMonths: facts.emergencyTargetMonths,
          emergencyTargetGap: emergency.targetGap
        }, [], ['Higher liquid emergency savings.', 'Lower unavoidable monthly costs.', 'A different user-chosen emergency target.']);
      } else if (emergency.targetGap > 0) {
        stages.protect = makeMove(protect, 'needs_attention', 'Build the emergency reserve toward your chosen target.', 'Continue adding to accessible reserves until the modeled target gap is closed.', 'High', 'You have some emergency runway, but the deterministic engine still shows a gap to the target you entered.', {
          emergencyRunwayMonths: emergency.fullLossRunwayMonths,
          emergencyTargetMonths: facts.emergencyTargetMonths,
          emergencyTargetGap: emergency.targetGap
        }, [], ['Higher liquid emergency savings.', 'A change in essential costs or debt payments.', 'A different target month count.']);
      } else {
        stages.protect = makeMove(protect, 'on_track', 'Maintain the emergency reserve.', 'Keep the reserve accessible and revisit it when household costs or stability change.', 'Maintain', 'The Emergency Fund engine shows no remaining gap to the target entered.', {
          emergencyRunwayMonths: emergency.fullLossRunwayMonths,
          emergencyTargetGap: emergency.targetGap
        }, [], ['Higher essential costs or debt payments.', 'A larger emergency target.', 'Using part of the reserve for another purpose.']);
      }

      const reduce = stageMeta(deps.priority, 'reduce');
      if (facts.debtBalance <= 0) {
        stages.reduce = makeMove(reduce, 'on_track', 'No interest-bearing debt balance was entered.', 'Keep avoiding expensive debt while protecting cash flow.', 'Maintain', 'The priority screen has no debt balance to rank for repayment.', {
          debtBalance: facts.debtBalance
        }, [], ['Taking on new debt.', 'Adding a balance that was not included in this screen.']);
      } else if (facts.highestDebtAprPct > facts.assumedLongTermReturnPct) {
        stages.reduce = makeMove(reduce, 'needs_attention', 'Prioritize the higher-cost debt before increasing modeled growth exposure.', 'Use available surplus for the expensive debt while preserving the emergency reserve.', 'High', 'The highest contractual debt rate entered is above the illustrative long-term return assumption used in this screen.', {
          debtBalance: facts.debtBalance,
          highestDebtAprPct: facts.highestDebtAprPct,
          assumedLongTermReturnPct: facts.assumedLongTermReturnPct,
          monthlyDebtPayments: facts.monthlyDebtPayments
        }, [assumptions[1]], ['A lower debt APR.', 'A different realistic after-tax return assumption.', 'Fees, tax treatment, liquidity needs or debt terms not captured here.']);
      } else {
        stages.reduce = makeMove(reduce, 'monitor', 'The debt rate does not outrank the growth assumption on rate alone.', 'Keep required payments current and use the detailed debt-versus-investment tools before making an optional extra-payment decision.', 'Review', 'The entered debt APR is at or below the illustrative return assumption, so rate comparison alone does not make extra repayment the higher priority.', {
          debtBalance: facts.debtBalance,
          highestDebtAprPct: facts.highestDebtAprPct,
          assumedLongTermReturnPct: facts.assumedLongTermReturnPct
        }, [assumptions[1]], ['A higher debt rate.', 'A lower realistic return assumption.', 'A change in liquidity or risk tolerance.']);
      }

      const build = stageMeta(deps.priority, 'build');
      if (!goal) {
        stages.build = makeMove(build, 'not_applicable', 'No funded goal was entered for this screen.', 'Add a specific goal later when there is an amount and time horizon you want Carrowmont to evaluate.', 'Later', 'Money Priorities does not invent a goal when none is entered.', {
          goalTargetAmount: facts.goalTargetAmount
        }, [], ['Adding a defined financial goal.']);
      } else if (goal.funding < 1) {
        stages.build = makeMove(build, 'needs_attention', 'Your entered goal is not fully funded on the current modeled path.', 'Increase the goal contribution, add a lump sum, extend the timeline or reduce the target after higher-priority resilience needs are protected.', facts.goalYearsAway <= 3 ? 'High' : 'Medium', 'The Goal Planner engine projects a shortfall using the amount, timeline, savings, contribution and return assumption entered.', {
          goalTargetAmount: facts.goalTargetAmount,
          goalProjectedValue: goal.projected,
          goalGap: goal.gap,
          goalFundingPct: round(goal.funding * 100, 2),
          goalYearsAway: facts.goalYearsAway
        }, [assumptions[1], assumptions.find(item => item.id === 'goalTargetTreatment')].filter(Boolean), ['A different target amount.', 'A higher or lower monthly goal contribution.', 'A longer or shorter time horizon.', 'A different return assumption.']);
      } else {
        stages.build = makeMove(build, 'on_track', 'The entered goal is funded on the current modeled path.', 'Keep the contribution plan on track and recheck it when the target, timeline or assumptions change.', 'Maintain', 'The Goal Planner engine projects the entered goal at or above 100% funded under the current assumptions.', {
          goalFundingPct: round(goal.funding * 100, 2),
          goalProjectedValue: goal.projected,
          goalTargetAmount: facts.goalTargetAmount
        }, [assumptions[1], assumptions.find(item => item.id === 'goalTargetTreatment')].filter(Boolean), ['A higher target amount.', 'Lower contributions.', 'A shorter timeline.', 'A lower return assumption.']);
      }

      const grow = stageMeta(deps.priority, 'grow');
      if (facts.retirementMonthlyContribution <= 0) {
        stages.grow = makeMove(grow, 'needs_attention', 'Establish a retirement-saving habit if you are still accumulating.', 'Use the Retirement Planner to set a proper target, then start a sustainable recurring contribution once earlier priorities are stable.', 'Medium', 'No recurring retirement contribution was entered. Batch 5 treats this only as a contribution-status flag, not a retirement-adequacy verdict.', {
          retirementSavings: facts.retirementSavings,
          retirementMonthlyContribution: facts.retirementMonthlyContribution
        }, [assumptions[2]], ['Already being retired or drawing down rather than accumulating.', 'A pension or other retirement provision not entered here.', 'Starting or changing a recurring retirement contribution.']);
      } else {
        stages.grow = makeMove(grow, 'on_track', 'Keep retirement saving active and check adequacy separately.', 'Continue the recurring contribution while using the Retirement Planner for a full target and readiness assessment.', 'Maintain', 'A positive recurring retirement contribution is present, but this priority screen deliberately does not claim that the amount is sufficient.', {
          retirementSavings: facts.retirementSavings,
          retirementMonthlyContribution: facts.retirementMonthlyContribution
        }, [assumptions[2]], ['A change in retirement goal or contribution.', 'A pension or other retirement asset not entered here.', 'A full Retirement Planner assessment showing a material gap.']);
      }

      const optimize = stageMeta(deps.priority, 'optimize');
      stages.optimize = makeMove(optimize, 'later', 'Optimize only after the foundations above are addressed.', 'Then review financing, allocation, timing, taxes and other trade-offs with the relevant detailed Carrowmont tools.', 'Later', 'Optimization should not outrank a cash-flow deficit, inadequate emergency resilience, expensive debt or an underfunded near-term goal.', {
        cashFlowRemaining: budget.remaining,
        emergencyRunwayMonths: emergency.fullLossRunwayMonths
      }, [], ['Clearing earlier priority gaps.', 'A material change in debt, goals, income or liquidity.']);

      const actionableStatuses = new Set(['urgent', 'needs_attention']);
      const all = Object.values(stages);
      const actionable = all.filter(item => actionableStatuses.has(item.status)).sort((a,b) => deps.priority.compare(a.stage,b.stage));
      const maintenance = all.filter(item => ['on_track','monitor'].includes(item.status) && !actionableStatuses.has(item.status)).sort((a,b) => deps.priority.compare(a.stage,b.stage));
      const fallback = [stages.optimize];
      const moves = [];
      for (const item of [...actionable, ...maintenance, ...fallback]) {
        if (!item || moves.some(existing => existing.stage === item.stage)) continue;
        moves.push(item);
        if (moves.length === 3) break;
      }

      const first = moves[0] || stages.optimize;
      const attentionCount = actionable.length;
      const diagnosis = attentionCount > 0
        ? `Carrowmont found ${attentionCount} area${attentionCount === 1 ? '' : 's'} needing action and ranked them using the locked Stabilize → Protect → Reduce → Build → Grow → Optimize framework.`
        : 'No urgent foundation gap appears in the facts entered, so the next moves focus on maintaining progress and then optimizing.';

      const changeFactors = [];
      for (const move of moves) {
        for (const item of move.whatCouldChange) if (!changeFactors.includes(item)) changeFactors.push(item);
      }

      const trace = [
        freeze({ engineId:'budget-cash-flow', input:freeze({ ...budgetState }), output:budget }),
        freeze({ engineId:'emergency-fund-runway', input:freeze({ ...emergencyInput }), output:emergency })
      ];
      if (goal) trace.push(freeze({ engineId:'goal-planner', input:freeze({ ...goalInput }), output:goal }));

      return freeze({
        version: VERSION,
        rulesetVersion: RULESET_VERSION,
        situation: 'Your Money Priorities',
        diagnosis,
        recommendation: freeze({
          headline: `Your first priority: ${first.stageLabel}`,
          action: first.action,
          rationale: first.rationale
        }),
        confidence: freeze({
          level: 'MEDIUM_HIGH',
          basis: 'Cash-flow, emergency-runway and goal figures come from deterministic Carrowmont engines. Debt ordering uses the entered APR versus an explicit return assumption. Retirement is screened for contribution activity only, not adequacy.'
        }),
        priorityMoves: freeze(moves.map(item => freeze({ ...item }))),
        whatCouldChangeAnswer: freeze(changeFactors.slice(0, 6)),
        importantNumbers: freeze({
          currency,
          monthlyIncome: budget.income,
          monthlyOutgo: budget.essential + budget.flexible + budget.saving,
          cashFlowRemaining: budget.remaining,
          emergencyRunwayMonths: emergency.fullLossRunwayMonths,
          emergencyTargetGap: emergency.targetGap,
          debtBalance: facts.debtBalance,
          highestDebtAprPct: facts.highestDebtAprPct,
          assumedLongTermReturnPct: facts.assumedLongTermReturnPct,
          goalFundingPct: goal ? round(goal.funding * 100, 2) : null,
          goalGap: goal ? goal.gap : null,
          retirementSavings: facts.retirementSavings,
          retirementMonthlyContribution: facts.retirementMonthlyContribution
        }),
        alternatives: freeze(moves.map((item, index) => freeze({ id:item.stage, label:`${index + 1}. ${item.stageLabel}`, impact:item.impact, action:item.action }))),
        nextSteps: freeze(moves.map(item => item.action)),
        assumptions: freeze(assumptions),
        trace: freeze(trace),
        stageEvidence: freeze(Object.fromEntries(Object.entries(stages).map(([key,value]) => [key, value])))
      });
    }

    return freeze({ VERSION, RULESET_VERSION, normalizeFacts, evaluate });
  }

  return freeze({ VERSION, RULESET_VERSION, normalizeFacts, create });
});
