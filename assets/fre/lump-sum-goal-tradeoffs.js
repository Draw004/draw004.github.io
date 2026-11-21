(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontLumpSumGoalTradeoffs = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const VERSION = 'lump-sum-goal-tradeoffs-v1.0';
  const RULESET_VERSION = 'batch12b4-2026-11';
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
      emergency: overrides.emergency || root.CarrowmontEmergencyFundCore,
      debtPayoff: overrides.debtPayoff || root.CarrowmontDebtPayoffCore,
      goal: overrides.goal || root.CarrowmontGoalCore,
      compound: overrides.compound || root.CarrowmontCompoundCore
    };
    if (!deps.emergency?.calculate) throw new Error('Missing deterministic Emergency Fund core.');
    if (!deps.debtPayoff?.simulateStrategy || !deps.debtPayoff?.paymentGuard) throw new Error('Missing deterministic Debt Payoff core.');
    if (!deps.goal?.calculate) throw new Error('Missing deterministic Goal Planner core.');
    if (!deps.compound?.calculate) throw new Error('Missing deterministic Compound Interest core.');
    return deps;
  }

  function normalizeFacts(facts = {}) {
    return freeze({
      lumpSumAmount: nonNegative(facts.lumpSumAmount),
      essentialExpenses: nonNegative(facts.essentialExpenses),
      emergencySavings: nonNegative(facts.emergencySavings),
      emergencyTargetMonths: Math.min(24, Math.max(1, nonNegative(facts.emergencyTargetMonths, 6) || 6)),
      debtBalance: nonNegative(facts.debtBalance),
      debtAprPct: nonNegative(facts.debtAprPct),
      debtMonthlyPayment: nonNegative(facts.debtMonthlyPayment),
      goalTargetAmount: nonNegative(facts.goalTargetAmount),
      goalCurrentSavings: nonNegative(facts.goalCurrentSavings),
      goalYearsAway: nonNegative(facts.goalYearsAway),
      goalMonthlyContribution: nonNegative(facts.goalMonthlyContribution),
      assumedLongTermReturnPct: nonNegative(facts.assumedLongTermReturnPct, 5),
      investmentHorizonYears: nonNegative(facts.investmentHorizonYears)
    });
  }

  function simulateDebt(deps, balance, aprPct, monthlyPayment) {
    if (!(balance > 0) || !(monthlyPayment > 0)) return null;
    const debt = [{ id:'focus-debt', label:'Debt being compared', balance, annualRatePct:aprPct, minimumPayment:monthlyPayment }];
    return freeze({
      guard: freeze({ ...deps.debtPayoff.paymentGuard(debt, 0) }),
      result: freeze({ ...deps.debtPayoff.simulateStrategy(debt, 0, 'avalanche') })
    });
  }

  function goalInput(facts, existing) {
    return {
      today: facts.goalTargetAmount,
      inflation: 0,
      years: facts.goalYearsAway,
      existing,
      ret: facts.assumedLongTermReturnPct / 100,
      monthly: facts.goalMonthlyContribution,
      contributionFrequency: 'monthly',
      futureLump: 0,
      futureLumpYear: 0
    };
  }

  function create(overrides = {}) {
    const deps = resolveDependencies(overrides);

    function evaluate(rawFacts = {}, options = {}) {
      const facts = normalizeFacts(rawFacts);
      const currency = options.currency || 'USD';
      if (!(facts.lumpSumAmount > 0)) throw new Error('Lump sum must be greater than zero.');
      if (!(facts.investmentHorizonYears >= 1) || !Number.isInteger(facts.investmentHorizonYears)) throw new Error('Investment horizon must be a whole number of years of at least one.');
      if (facts.goalTargetAmount > 0 && (!(facts.goalYearsAway >= 1) || !Number.isInteger(facts.goalYearsAway))) throw new Error('Goal horizon must be a whole number of years of at least one.');
      if (facts.debtBalance > 0 && !(facts.debtMonthlyPayment > 0)) throw new Error('Debt payment must be greater than zero when debt is included.');

      const emergencyInput = {
        essentialExpenses: facts.essentialExpenses,
        debtPayments: facts.debtBalance > 0 ? facts.debtMonthlyPayment : 0,
        emergencySavings: facts.emergencySavings,
        targetMonths: facts.emergencyTargetMonths,
        monthlyContribution: 0
      };
      const emergency = deps.emergency.calculate(emergencyInput);
      const emergencyAll = deps.emergency.calculate({ ...emergencyInput, emergencySavings:facts.emergencySavings + facts.lumpSumAmount });

      let debt = null;
      if (facts.debtBalance > 0) {
        const baseline = simulateDebt(deps, facts.debtBalance, facts.debtAprPct, facts.debtMonthlyPayment);
        const applied = Math.min(facts.lumpSumAmount, facts.debtBalance);
        const balanceAfter = Math.max(0, facts.debtBalance - applied);
        const after = balanceAfter > 0 ? simulateDebt(deps, balanceAfter, facts.debtAprPct, facts.debtMonthlyPayment) : null;
        const baselinePaid = baseline?.result?.status === 'paid_off';
        const afterPaid = balanceAfter === 0 || after?.result?.status === 'paid_off';
        const interestAfter = balanceAfter === 0 ? 0 : (afterPaid ? after.result.totalInterest : null);
        const monthsAfter = balanceAfter === 0 ? 0 : (afterPaid ? after.result.months : null);
        debt = freeze({
          appliedAmount: applied,
          balanceAfter,
          paymentCoversFirstMonthInterest: Boolean(baseline?.guard?.ok),
          baselineStatus: baseline?.result?.status || 'unavailable',
          baselineInterest: baselinePaid ? baseline.result.totalInterest : null,
          baselineMonths: baselinePaid ? baseline.result.months : null,
          afterStatus: balanceAfter === 0 ? 'paid_off' : (after?.result?.status || 'unavailable'),
          interestAfter,
          monthsAfter,
          modeledInterestSaved: baselinePaid && interestAfter !== null ? Math.max(0, baseline.result.totalInterest - interestAfter) : null,
          modeledMonthsSaved: baselinePaid && monthsAfter !== null ? Math.max(0, baseline.result.months - monthsAfter) : null,
          baselineTrace: baseline,
          afterTrace: after
        });
      }

      let goal = null;
      let goalBaselineInput = null;
      if (facts.goalTargetAmount > 0) {
        goalBaselineInput = goalInput(facts, facts.goalCurrentSavings);
        const baseline = deps.goal.calculate(goalBaselineInput);
        const allInput = goalInput(facts, facts.goalCurrentSavings + facts.lumpSumAmount);
        const afterAll = deps.goal.calculate(allInput);
        goal = freeze({ baseline, afterAll, baselineInput:freeze({ ...goalBaselineInput }), allInput:freeze({ ...allInput }) });
      }

      const investAllInput = {
        principal: facts.lumpSumAmount,
        annualRate: facts.assumedLongTermReturnPct,
        years: facts.investmentHorizonYears,
        compounding: 'monthly',
        contributionEnabled: false,
        contribution: 0,
        contributionFrequency: 'monthly',
        contributionTiming: 'end',
        inflationEnabled: false,
        inflation: 0
      };
      const investAll = deps.compound.calculate(investAllInput);
      if (!investAll.ok) throw new Error(investAll.errors?.join(' ') || 'Compound Interest calculation failed.');

      let remaining = facts.lumpSumAmount;
      const emergencyAllocation = Math.min(remaining, Math.max(0, emergency.targetGap || 0));
      remaining -= emergencyAllocation;
      const debtIsHigherPriority = Boolean(facts.debtBalance > 0 && facts.debtAprPct > facts.assumedLongTermReturnPct);
      const debtAllocation = debtIsHigherPriority ? Math.min(remaining, facts.debtBalance) : 0;
      remaining -= debtAllocation;
      const goalNeedToday = goal ? Math.max(0, goal.baseline.lumpToday || 0) : 0;
      const goalAllocation = Math.min(remaining, goalNeedToday);
      remaining -= goalAllocation;
      const investmentAllocation = Math.max(0, remaining);

      const emergencySplit = deps.emergency.calculate({ ...emergencyInput, emergencySavings:facts.emergencySavings + emergencyAllocation });
      const debtBalanceAfterSplit = Math.max(0, facts.debtBalance - debtAllocation);
      const goalSplit = goal ? deps.goal.calculate(goalInput(facts, facts.goalCurrentSavings + goalAllocation)) : null;
      const investSplit = investmentAllocation > 0 ? deps.compound.calculate({ ...investAllInput, principal:investmentAllocation }) : null;

      const split = freeze({
        emergencyAllocation,
        debtAllocation,
        goalAllocation,
        investmentAllocation,
        emergencyRunwayMonthsAfter: emergencySplit.fullLossRunwayMonths,
        emergencyTargetGapAfter: emergencySplit.targetGap,
        debtBalanceAfter: debtBalanceAfterSplit,
        goalFundingPctAfter: goalSplit ? round(goalSplit.funding * 100, 2) : null,
        goalGapAfter: goalSplit ? goalSplit.gap : null,
        investmentEndingValue: investSplit?.ok ? investSplit.endingValue : 0,
        investmentGrowth: investSplit?.ok ? investSplit.growth : 0
      });

      const issues = [];
      if ((emergency.targetGap || 0) > 0) issues.push('an emergency-reserve gap');
      if (debtIsHigherPriority) issues.push('debt whose entered rate is above the long-term return assumption');
      if (goal && goal.baseline.gap > 0) issues.push('an underfunded goal');
      const diagnosis = issues.length
        ? `The entered lump sum is competing with ${issues.join(', ')}. Carrowmont models each use separately, then applies the existing Protect → Reduce → Build → Grow priority logic for a combined split.`
        : 'The entered emergency reserve meets its target, no higher-cost debt outranks the return assumption, and the entered goal is funded on its current path. The modeled priority split therefore leaves the lump sum available for long-term investing.';

      const alternatives = [];
      alternatives.push(freeze({
        id:'priority-split',
        label:'Modeled priority split',
        emergencyAllocation:split.emergencyAllocation,
        debtAllocation:split.debtAllocation,
        goalAllocation:split.goalAllocation,
        investmentAllocation:split.investmentAllocation,
        emergencyTargetGapAfter:split.emergencyTargetGapAfter,
        debtBalanceAfter:split.debtBalanceAfter,
        goalFundingPctAfter:split.goalFundingPctAfter,
        investmentEndingValue:split.investmentEndingValue
      }));
      alternatives.push(freeze({
        id:'emergency-first',
        label:'Use the lump sum for emergency savings',
        amountAdded:facts.lumpSumAmount,
        runwayMonthsBefore:emergency.fullLossRunwayMonths,
        runwayMonthsAfter:emergencyAll.fullLossRunwayMonths,
        targetGapBefore:emergency.targetGap,
        targetGapAfter:emergencyAll.targetGap
      }));
      if (debt) alternatives.push(freeze({
        id:'debt-first',
        label:'Use the lump sum to pay down the debt',
        amountApplied:debt.appliedAmount,
        debtBalanceAfter:debt.balanceAfter,
        modeledInterestSaved:debt.modeledInterestSaved,
        modeledMonthsSaved:debt.modeledMonthsSaved,
        paymentCoversFirstMonthInterest:debt.paymentCoversFirstMonthInterest
      }));
      if (goal) alternatives.push(freeze({
        id:'goal-first',
        label:'Use the lump sum for the goal',
        goalFundingPctBefore:round(goal.baseline.funding * 100, 2),
        goalFundingPctAfter:round(goal.afterAll.funding * 100, 2),
        goalGapBefore:goal.baseline.gap,
        goalGapAfter:goal.afterAll.gap,
        lumpSumNeededTodayBefore:goal.baseline.lumpToday
      }));
      alternatives.push(freeze({
        id:'invest-first',
        label:'Invest the lump sum for the long term',
        investmentHorizonYears:facts.investmentHorizonYears,
        assumedLongTermReturnPct:facts.assumedLongTermReturnPct,
        endingValue:investAll.endingValue,
        modeledGrowth:investAll.growth
      }));

      const assumptions = [
        freeze({ id:'emergencyTargetMonths', value:facts.emergencyTargetMonths, note:'User-entered emergency-fund target; Carrowmont does not impose a universal target.' }),
        freeze({ id:'assumedLongTermReturnPct', value:facts.assumedLongTermReturnPct, note:'Illustrative return assumption used for goal growth, debt rate comparison and long-term investing. It is not a forecast or guarantee.' }),
        freeze({ id:'investmentHorizonYears', value:facts.investmentHorizonYears, note:'User-entered whole-year horizon for the long-term investment illustration.' })
      ];
      if (debt) assumptions.push(freeze({ id:'debtFocus', value:'one-debt comparison', note:'The debt path models the single debt balance, APR and required payment entered in this Ask journey. Use the Debt Payoff tool for multiple-debt ordering.' }));
      if (goal) assumptions.push(freeze({ id:'goalTargetTreatment', value:'future-target', note:'The entered goal target is treated as the amount required at the goal date, matching Money Priorities; no additional inflation assumption is added here.' }));

      const trace = [freeze({ engineId:'emergency-fund-runway', input:freeze({ ...emergencyInput }), output:emergency })];
      if (debt?.baselineTrace) trace.push(freeze({ engineId:'debt-payoff', input:freeze({ balance:facts.debtBalance, annualRatePct:facts.debtAprPct, minimumPayment:facts.debtMonthlyPayment }), output:debt.baselineTrace.result }));
      if (goal) trace.push(freeze({ engineId:'goal-planner', input:freeze({ ...goalBaselineInput }), output:goal.baseline }));
      trace.push(freeze({ engineId:'compound-interest', input:freeze({ ...investAllInput }), output:investAll }));

      const nextSteps = [
        'Review the modeled split beside the all-in alternatives before moving any money.',
        debt && !debt.paymentCoversFirstMonthInterest ? 'The entered debt payment may not cover the first modeled month of interest; review that debt in the detailed Debt Payoff tool before relying on payoff timing.' : 'If you choose the debt path, confirm any prepayment fees, tax effects or lender rules that are outside this model.',
        'Keep near-term money accessible and treat the investment return as an assumption, not a promise.'
      ];

      return freeze({
        version: VERSION,
        rulesetVersion: RULESET_VERSION,
        situation: 'Use a lump sum across competing priorities',
        diagnosis,
        recommendation: freeze({
          headline: 'Use the lump sum in layers instead of assuming one destination fits everything.',
          action: 'Follow the modeled priority order: close the emergency-reserve gap first, then higher-cost debt when its APR exceeds the entered return assumption, then the underfunded goal, and invest only the remainder intended for the long term.',
          rationale: 'This follows Carrowmont’s existing Protect → Reduce → Build → Grow ordering while still showing what happens if the same lump sum is directed entirely to each available option.'
        }),
        confidence: freeze({
          level: 'MEDIUM_HIGH',
          basis: 'Emergency-runway, debt-payoff, goal-funding and compound-growth figures come from existing deterministic Carrowmont engines. The investment return remains a user-entered assumption and taxes, fees, product terms and market volatility are not inferred.'
        }),
        importantNumbers: freeze({
          currency,
          lumpSumAmount:facts.lumpSumAmount,
          emergencyRunwayMonthsBefore:emergency.fullLossRunwayMonths,
          emergencyTargetGapBefore:emergency.targetGap,
          debtBalance:facts.debtBalance,
          debtAprPct:facts.debtBalance > 0 ? facts.debtAprPct : null,
          goalFundingPctBefore:goal ? round(goal.baseline.funding * 100, 2) : null,
          goalGapBefore:goal ? goal.baseline.gap : null,
          assumedLongTermReturnPct:facts.assumedLongTermReturnPct,
          investmentHorizonYears:facts.investmentHorizonYears,
          priorityEmergencyAllocation:split.emergencyAllocation,
          priorityDebtAllocation:split.debtAllocation,
          priorityGoalAllocation:split.goalAllocation,
          priorityInvestmentAllocation:split.investmentAllocation
        }),
        alternatives: freeze(alternatives),
        nextSteps: freeze(nextSteps),
        assumptions: freeze(assumptions),
        whatCouldChangeAnswer: freeze([
          'A change in essential monthly costs or your chosen emergency-fund target.',
          'A different debt balance, contractual APR, payment or prepayment rule.',
          'A different goal amount, time horizon, existing savings or monthly contribution.',
          'A different realistic long-term return assumption or investment horizon.',
          'Taxes, fees, liquidity needs or market risk that are outside the deterministic calculations.'
        ]),
        trace: freeze(trace),
        allocation: split
      });
    }

    return freeze({ VERSION, RULESET_VERSION, normalizeFacts, evaluate });
  }

  return freeze({ VERSION, RULESET_VERSION, normalizeFacts, create });
});
