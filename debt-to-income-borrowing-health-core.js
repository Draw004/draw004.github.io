(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontBorrowingHealthCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = 'debt-to-income-borrowing-health-v1.0';

  const num = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
  const round = (value, digits = 8) => {
    if (!Number.isFinite(value)) return value;
    const factor = 10 ** digits;
    return Math.round((value + Number.EPSILON) * factor) / factor;
  };
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const ratioPct = (part, whole) => whole > 0 ? round((part / whole) * 100, 6) : null;

  function normalize(input = {}) {
    return Object.freeze({
      grossMonthlyIncome: Math.max(0, num(input.grossMonthlyIncome)),
      takeHomeMonthlyIncome: Math.max(0, num(input.takeHomeMonthlyIncome)),
      essentialNonDebtExpenses: Math.max(0, num(input.essentialNonDebtExpenses)),
      housingDebtPayment: Math.max(0, num(input.housingDebtPayment)),
      otherLoanPayments: Math.max(0, num(input.otherLoanPayments)),
      creditCardMinimums: Math.max(0, num(input.creditCardMinimums)),
      otherDebtPayments: Math.max(0, num(input.otherDebtPayments)),
      proposedNewDebtPayment: Math.max(0, num(input.proposedNewDebtPayment)),
      incomeDropPct: clamp(num(input.incomeDropPct, 10), 0, 90)
    });
  }

  function classify(result) {
    if (!result.ok) return 'NEEDS_GROSS_INCOME';
    if (result.currentCashRoom != null && result.currentCashRoom < 0) return 'CURRENT_DEFICIT';
    if (result.proposedNewDebtPayment > 0 && result.proposedCashRoom != null && result.proposedCashRoom < 0) return 'PROPOSED_DEFICIT';
    if (result.proposedNewDebtPayment > 0) return 'PROPOSED_TIGHTENING';
    if (result.currentCashRoom != null) return 'CASHFLOW_VIEW';
    return 'RATIO_ONLY';
  }

  function calculate(input = {}) {
    const assumptions = normalize(input);
    const currentDebtPayments = assumptions.housingDebtPayment + assumptions.otherLoanPayments + assumptions.creditCardMinimums + assumptions.otherDebtPayments;
    const proposedDebtPayments = currentDebtPayments + assumptions.proposedNewDebtPayment;
    const stressedGrossIncome = assumptions.grossMonthlyIncome * (1 - assumptions.incomeDropPct / 100);
    const currentGrossDtiPct = ratioPct(currentDebtPayments, assumptions.grossMonthlyIncome);
    const proposedGrossDtiPct = ratioPct(proposedDebtPayments, assumptions.grossMonthlyIncome);
    const stressedGrossDtiPct = ratioPct(proposedDebtPayments, stressedGrossIncome);
    const currentTakeHomeDebtPct = ratioPct(currentDebtPayments, assumptions.takeHomeMonthlyIncome);
    const proposedTakeHomeDebtPct = ratioPct(proposedDebtPayments, assumptions.takeHomeMonthlyIncome);
    const hasCashflowView = assumptions.takeHomeMonthlyIncome > 0;
    const currentCashRoom = hasCashflowView ? assumptions.takeHomeMonthlyIncome - currentDebtPayments - assumptions.essentialNonDebtExpenses : null;
    const proposedCashRoom = hasCashflowView ? assumptions.takeHomeMonthlyIncome - proposedDebtPayments - assumptions.essentialNonDebtExpenses : null;
    const proposedPaymentShareOfCurrentRoomPct = currentCashRoom != null && currentCashRoom > 0
      ? ratioPct(assumptions.proposedNewDebtPayment, currentCashRoom)
      : null;
    const dtiIncreasePctPoints = currentGrossDtiPct != null && proposedGrossDtiPct != null
      ? round(proposedGrossDtiPct - currentGrossDtiPct, 6)
      : null;
    const warnings = [];

    if (assumptions.grossMonthlyIncome <= 0) warnings.push('Enter gross monthly income to calculate debt-to-income ratios.');
    if (assumptions.takeHomeMonthlyIncome > assumptions.grossMonthlyIncome && assumptions.grossMonthlyIncome > 0) warnings.push('Take-home income is higher than gross income. Check the two income figures before relying on the cash-flow view.');
    if (!hasCashflowView) warnings.push('Add take-home income if you want Carrowmont to show monthly cash room after debt payments.');
    if (hasCashflowView && assumptions.essentialNonDebtExpenses <= 0) warnings.push('Essential non-debt expenses are zero, so monthly cash room does not yet reflect normal living costs.');
    if (assumptions.proposedNewDebtPayment <= 0) warnings.push('Add a proposed new monthly debt payment if you want to compare another borrowing scenario.');
    if (assumptions.incomeDropPct > 0 && stressedGrossIncome <= 0) warnings.push('The stress test leaves no modeled gross income, so a stressed DTI ratio cannot be calculated.');

    const result = {
      ok: assumptions.grossMonthlyIncome > 0,
      methodologyVersion: VERSION,
      assumptions,
      currentDebtPayments: round(currentDebtPayments, 2),
      proposedDebtPayments: round(proposedDebtPayments, 2),
      proposedNewDebtPayment: round(assumptions.proposedNewDebtPayment, 2),
      currentGrossDtiPct,
      proposedGrossDtiPct,
      dtiIncreasePctPoints,
      currentTakeHomeDebtPct,
      proposedTakeHomeDebtPct,
      stressedGrossIncome: round(stressedGrossIncome, 2),
      stressedGrossDtiPct,
      currentCashRoom: currentCashRoom == null ? null : round(currentCashRoom, 2),
      proposedCashRoom: proposedCashRoom == null ? null : round(proposedCashRoom, 2),
      proposedPaymentShareOfCurrentRoomPct,
      warnings: Object.freeze([...warnings])
    };
    return Object.freeze({ ...result, classification: classify(result) });
  }

  return Object.freeze({ VERSION, normalize, calculate });
});
