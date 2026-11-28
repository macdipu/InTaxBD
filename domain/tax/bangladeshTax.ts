// Bangladesh individual income tax estimator.
// All rates live in TAX_RULES so they can be updated each year in one place.
// Figures follow the Income Tax Act 2023 as amended for Assessment Year 2026-27.
// This is an ESTIMATE. Confirm every rate against the current Finance Act / NBR notice before relying on it.

export type TaxpayerCategory = 'general' | 'womanOrSenior' | 'disabled' | 'freedomFighter';

export const TAX_RULES = {
  assessmentYear: '2026-2027',
  incomeYear: '01 July 2025 to 30 June 2026',
  // Tax-free threshold by taxpayer category.
  threshold: {
    general: 400000,
    womanOrSenior: 450000,
    disabled: 525000,
    freedomFighter: 525000,
  } as Record<TaxpayerCategory, number>,
  // Rates applied after the tax-free threshold: [width of band, rate]. null width = the rest.
  bands: [
    { width: 300000, rate: 0.1 },
    { width: 400000, rate: 0.15 },
    { width: 500000, rate: 0.2 },
    { width: 2000000, rate: 0.25 },
    { width: null as number | null, rate: 0.3 },
  ],
  minimumTax: 5000,
  minimumTaxFirstTime: 1000,
  // Salary: exempt part is the lower of one third of salary or this cap.
  salaryExemptCap: 450000,
  // House rent: standard deduction on rent received.
  rentDeductionRate: 0.25,
  // Investment rebate: lowest of (rate x taxable income), (rate x investment), cap.
  rebate: { incomeRate: 0.03, investmentRate: 0.1, cap: 750000 },
  // Surcharge on tax for high net wealth.
  surcharge: [
    { above: 500000000, rate: 0.35 },
    { above: 200000000, rate: 0.3 },
    { above: 100000000, rate: 0.2 },
    { above: 40000000, rate: 0.1 },
  ],
};

export interface TaxInput {
  category: TaxpayerCategory;
  firstTime: boolean;
  salary: number; // yearly gross salary, bonuses and allowances
  business: number; // yearly net profit
  rentReceived: number; // yearly rent received
  rentInterestAndTaxes: number; // loan interest, land tax, insurance on the rented property
  agriculture: number; // net agricultural income
  otherIncome: number; // interest, dividend, freelance, other
  investment: number; // eligible investment for rebate
  netWealth: number;
  taxPaid: number; // TDS and advance tax already paid
  mustFileTrigger: boolean; // owns a car, trade licence, city property etc.
}

export interface Band {
  label: string;
  rate: number;
  amount: number; // income falling in this band
  tax: number;
}

export interface TaxResult {
  salaryExempt: number;
  salaryTaxable: number;
  rentTaxable: number;
  totalIncome: number;
  threshold: number;
  bands: Band[];
  taxBeforeRebate: number;
  rebate: number;
  taxAfterRebate: number;
  minimumApplied: boolean;
  surchargeRate: number;
  surcharge: number;
  totalTax: number;
  taxPaid: number;
  balance: number; // positive = still to pay, negative = refundable
  mustFile: boolean;
  belowLimitButTriggered: boolean;
  extraInvestmentForMaxRebate: number; // more investment that would still raise the rebate
  extraRebateAvailable: number;
}

const n = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);

export const calculateTax = (raw: TaxInput): TaxResult => {
  const R = TAX_RULES;
  const salary = n(raw.salary);
  const salaryExempt = Math.min(salary / 3, R.salaryExemptCap);
  const salaryTaxable = salary - salaryExempt;
  const rentTaxable = Math.max(0, n(raw.rentReceived) * (1 - R.rentDeductionRate) - n(raw.rentInterestAndTaxes));
  const totalIncome = salaryTaxable + rentTaxable + n(raw.business) + n(raw.agriculture) + n(raw.otherIncome);

  const threshold = R.threshold[raw.category];
  let left = Math.max(0, totalIncome - threshold);
  let lower = threshold;
  const bands: Band[] = [];
  let tax = 0;
  for (const b of R.bands) {
    const amount = b.width === null ? left : Math.min(left, b.width);
    const upper = b.width === null ? null : lower + b.width;
    bands.push({
      label: upper === null ? `Above ${lower.toLocaleString('en-IN')}` : `${lower.toLocaleString('en-IN')} to ${upper.toLocaleString('en-IN')}`,
      rate: b.rate,
      amount,
      tax: amount * b.rate,
    });
    tax += amount * b.rate;
    left -= amount;
    if (upper !== null) lower = upper;
  }

  const taxBeforeRebate = tax;
  const rebate = Math.min(
    taxBeforeRebate,
    R.rebate.incomeRate * totalIncome,
    R.rebate.investmentRate * n(raw.investment),
    R.rebate.cap,
  );
  let taxAfterRebate = taxBeforeRebate - rebate;

  // Minimum tax applies once income is above the tax-free threshold.
  const overLimit = totalIncome > threshold;
  const mustFile = overLimit || raw.mustFileTrigger;
  const min = raw.firstTime ? R.minimumTaxFirstTime : R.minimumTax;
  const minimumApplied = mustFile && taxAfterRebate < min;
  if (minimumApplied) taxAfterRebate = min;

  const wealth = n(raw.netWealth);
  const surchargeRate = R.surcharge.find((s) => wealth > s.above)?.rate ?? 0;
  const surcharge = taxAfterRebate * surchargeRate;
  // How much more investment would still earn rebate?
  const maxRebate = Math.min(taxBeforeRebate, R.rebate.incomeRate * totalIncome, R.rebate.cap);
  const investmentForMax = R.rebate.investmentRate > 0 ? maxRebate / R.rebate.investmentRate : 0;
  const extraInvestmentForMaxRebate = Math.max(0, Math.round(investmentForMax - n(raw.investment)));
  const extraRebateAvailable = Math.max(0, Math.round(maxRebate - rebate));

  const totalTax = Math.round(taxAfterRebate + surcharge);
  const taxPaid = n(raw.taxPaid);

  return {
    salaryExempt,
    salaryTaxable,
    rentTaxable,
    totalIncome,
    threshold,
    bands,
    taxBeforeRebate: Math.round(taxBeforeRebate),
    rebate: Math.round(rebate),
    taxAfterRebate: Math.round(taxAfterRebate),
    minimumApplied,
    surchargeRate,
    surcharge: Math.round(surcharge),
    totalTax,
    taxPaid,
    balance: totalTax - taxPaid,
    mustFile,
    belowLimitButTriggered: !overLimit && raw.mustFileTrigger,
    extraInvestmentForMaxRebate,
    extraRebateAvailable,
  };
};
