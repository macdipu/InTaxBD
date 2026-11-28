import React, { useEffect, useMemo, useState } from 'react';
import { MessageCircle, Info, Plus, X, HelpCircle, RotateCcw, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/Primitives';
import Navbar from '../components/layout/Navbar';
import { useLang } from '../i18n/lang';
import DeadlineChip from '../components/widgets/DeadlineChip';
import NbrNews from '../components/widgets/NbrNews';
import TabBar from '../components/layout/TabBar';
import ChatBubble from '../components/widgets/ChatBubble';
import { ContentRepository } from '../../data/repositories/contentRepository';
import { calculateTax, TAX_RULES, TaxInput, TaxpayerCategory } from '../../domain/tax/bangladeshTax';

const tk = (v: number) => `${Math.round(v).toLocaleString('en-IN')} Tk`;
const clean = (s: string) => Number(s.replace(/[^\d]/g, '')) || 0;
const fmt = (s: string) => (s ? clean(s).toLocaleString('en-IN') : '');
const uid = () => Math.random().toString(36).slice(2, 8);

type Period = 'year' | 'month';
interface LineDef { id: string; label: string; help?: string; sign: 1 | -1; period: Period }
interface Extra { id: string; label: string; v: string; p: Period; sign: 1 | -1 }
interface HeadState {
  mode: 'total' | 'items';
  period: Period;
  total: string;
  lines: Record<string, { v: string; p: Period }>;
  extras: Extra[];
}
interface HeadDef {
  id: string;
  title: string;
  intro: string;
  totalLabel: string;
  totalHelp: string;
  example: string;
  defaultPeriod: Period;
  lines: LineDef[];
  addLabel: string;
  tip?: string;
  /** whether "minus" lines exist (costs) */
  hasCosts?: boolean;
}

const HEADS: HeadDef[] = [
  {
    id: 'salary', title: 'Salary', intro: 'Money from a job: company, bank, NGO, school, government.',
    totalLabel: 'Total salary', totalHelp: 'Everything you get from your employer before any tax is cut', example: 'Example: 45,000 a month',
    defaultPeriod: 'month', addLabel: 'Add another pay item',
    tip: 'Look at your payslip or salary certificate. Use the gross amount, before deductions.',
    lines: [
      { id: 'basic', label: 'Basic salary', sign: 1, period: 'month' },
      { id: 'hra', label: 'House rent allowance', sign: 1, period: 'month' },
      { id: 'medical', label: 'Medical allowance', sign: 1, period: 'month' },
      { id: 'conv', label: 'Conveyance allowance', sign: 1, period: 'month' },
      { id: 'festival', label: 'Festival bonus', help: 'Eid bonus, usually twice a year', sign: 1, period: 'year' },
      { id: 'other', label: 'Other allowances or overtime', sign: 1, period: 'month' },
    ],
  },
  {
    id: 'business', title: 'Business or freelance', intro: 'A shop, company profit, consulting, or online / freelance work.',
    totalLabel: 'Profit for the year', totalHelp: 'What you earned minus what you spent running it', example: 'Example: 8,00,000 profit in the year',
    defaultPeriod: 'year', addLabel: 'Add another item', hasCosts: true,
    tip: 'Not sure of profit? Switch to "Break it down" and enter sales and costs. We subtract for you.',
    lines: [
      { id: 'sales', label: 'Total sales or fees received', sign: 1, period: 'year' },
      { id: 'cogs', label: 'Cost of goods or materials', sign: -1, period: 'year' },
      { id: 'staff', label: 'Staff pay', sign: -1, period: 'year' },
      { id: 'rentcost', label: 'Shop or office rent', sign: -1, period: 'year' },
      { id: 'util', label: 'Utilities, internet, transport', sign: -1, period: 'year' },
    ],
  },
  {
    id: 'rent', title: 'House or shop rent', intro: 'Rent you receive from a property you own.',
    totalLabel: 'Rent received', totalHelp: 'Total rent paid to you, before any cost', example: 'Example: 20,000 a month',
    defaultPeriod: 'month', addLabel: 'Add another rent or cost', hasCosts: true,
    tip: 'A standard 25% deduction on rent is applied for you. Add only real extra costs such as loan interest.',
    lines: [
      { id: 'rent1', label: 'Rent received (property 1)', sign: 1, period: 'month' },
      { id: 'rent2', label: 'Rent received (property 2)', sign: 1, period: 'month' },
      { id: 'interest', label: 'Home loan interest paid', sign: -1, period: 'year' },
      { id: 'landtax', label: 'Land tax or council tax', sign: -1, period: 'year' },
      { id: 'insure', label: 'Insurance on the property', sign: -1, period: 'year' },
    ],
  },
  {
    id: 'agri', title: 'Farming', intro: 'Income from crops, fish, livestock or poultry.',
    totalLabel: 'Net farming income', totalHelp: 'Sales minus the cost of farming', example: 'Example: 3,00,000 for the year',
    defaultPeriod: 'year', addLabel: 'Add another item', hasCosts: true,
    lines: [
      { id: 'sales', label: 'Sales of produce', sign: 1, period: 'year' },
      { id: 'costs', label: 'Seeds, feed, labour and other costs', sign: -1, period: 'year' },
    ],
  },
  {
    id: 'other', title: 'Other income', intro: 'Bank interest, dividend, pension, gifts, or anything else.',
    totalLabel: 'Total other income', totalHelp: 'All other money you received in the year', example: 'Example: 40,000 for the year',
    defaultPeriod: 'year', addLabel: 'Add another income',
    lines: [
      { id: 'interest', label: 'Bank or savings interest', sign: 1, period: 'year' },
      { id: 'dividend', label: 'Dividend from shares', sign: 1, period: 'year' },
      { id: 'pension', label: 'Pension', sign: 1, period: 'month' },
      { id: 'other', label: 'Anything else', sign: 1, period: 'year' },
    ],
  },
  {
    id: 'invest', title: 'Your investments', intro: 'Money you put into approved savings. This can give you a tax rebate.',
    totalLabel: 'Total invested', totalHelp: 'Everything you invested in the year', example: 'Example: 3,00,000 for the year',
    defaultPeriod: 'year', addLabel: 'Add another investment',
    tip: 'Keep the receipts. We will check which ones qualify when you file.',
    lines: [
      { id: 'sanchay', label: 'Savings certificates (Sanchayapatra)', sign: 1, period: 'year' },
      { id: 'dps', label: 'DPS or fixed savings', sign: 1, period: 'month' },
      { id: 'life', label: 'Life insurance premium', sign: 1, period: 'year' },
      { id: 'shares', label: 'Shares or mutual funds', sign: 1, period: 'year' },
      { id: 'zakat', label: 'Zakat fund or approved donation', sign: 1, period: 'year' },
    ],
  },
  {
    id: 'paid', title: 'Tax you already paid', intro: 'Tax cut from your pay or paid in advance. It reduces what you owe now.',
    totalLabel: 'Total tax already paid', totalHelp: 'TDS certificates and advance tax receipts', example: 'Example: 5,000 a month cut from salary',
    defaultPeriod: 'year', addLabel: 'Add another payment',
    lines: [
      { id: 'tdssal', label: 'Tax cut from salary (TDS)', sign: 1, period: 'month' },
      { id: 'tdsbank', label: 'Tax cut from bank interest', sign: 1, period: 'year' },
      { id: 'adv', label: 'Advance tax paid', sign: 1, period: 'year' },
      { id: 'car', label: 'Tax paid on a car or other items', sign: 1, period: 'year' },
    ],
  },
];

const PROFILES: { id: string; label: string; heads: string[]; note?: string }[] = [
  { id: 'none', label: 'No income now', heads: [], note: 'Student, unemployed or homemaker' },
  { id: 'salary', label: 'I have a job', heads: ['salary'] },
  { id: 'business', label: 'Business or freelance', heads: ['business'] },
  { id: 'rent', label: 'I earn rent', heads: ['rent'] },
  { id: 'agri', label: 'Farming', heads: ['agri'] },
  { id: 'other', label: 'Pension, interest, other', heads: ['other'] },
];

const TRIGGERS = [
  'I own a car or jeep',
  'I have a trade licence',
  'I own a house or flat in a city corporation area',
  'I am a member of a professional body (doctor, lawyer, engineer, accountant)',
  'I already have a TIN and filed last year',
  'I want a tax certificate for a bank loan, visa, tender or business',
];

const emptyHead = (d: HeadDef): HeadState => ({
  mode: 'total', period: d.defaultPeriod, total: '',
  lines: Object.fromEntries(d.lines.map((l) => [l.id, { v: '', p: l.period }])), extras: [],
});

const headTotals = (d: HeadDef, h: HeadState) => {
  const k = (p: Period) => (p === 'month' ? 12 : 1);
  if (h.mode === 'total') return { plus: clean(h.total) * k(h.period), minus: 0 };
  let plus = 0;
  let minus = 0;
  d.lines.forEach((l) => {
    const a = clean(h.lines[l.id]?.v ?? '') * k(h.lines[l.id]?.p ?? l.period);
    l.sign === 1 ? (plus += a) : (minus += a);
  });
  h.extras.forEach((x) => {
    const a = clean(x.v) * k(x.p);
    x.sign === 1 ? (plus += a) : (minus += a);
  });
  return { plus, minus };
};

const KEY = 'intaxbd-calc-v1';

const Calculator: React.FC = () => {
  const contact = ContentRepository.getContact();
  const { t } = useLang();
  const docs = ContentRepository.getDocuments();

  const initial = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (raw) return raw;
    } catch { /* ignore */ }
    return null;
  };
  const saved = useMemo(initial, []);

  const [category, setCategory] = useState<TaxpayerCategory>(saved?.category ?? 'general');
  const [firstTime, setFirstTime] = useState<boolean>(saved?.firstTime ?? false);
  const [profiles, setProfiles] = useState<string[]>(saved?.profiles ?? []);
  const [showAll, setShowAll] = useState<boolean>(saved?.showAll ?? false);
  const [heads, setHeads] = useState<Record<string, HeadState>>(
    saved?.heads ?? Object.fromEntries(HEADS.map((d) => [d.id, emptyHead(d)])),
  );
  const [triggers, setTriggers] = useState<number[]>(saved?.triggers ?? []);
  const [wealth, setWealth] = useState<string>(saved?.wealth ?? '');

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ category, firstTime, profiles, showAll, heads, triggers, wealth }));
    } catch { /* storage unavailable */ }
  }, [category, firstTime, profiles, showAll, heads, triggers, wealth]);

  const reset = () => {
    setCategory('general'); setFirstTime(false); setProfiles([]); setShowAll(false);
    setHeads(Object.fromEntries(HEADS.map((d) => [d.id, emptyHead(d)]))); setTriggers([]); setWealth('');
  };

  const toggleProfile = (id: string) =>
    setProfiles((p) => (id === 'none' ? (p.includes('none') ? [] : ['none']) : (p.includes(id) ? p.filter((x) => x !== id) : [...p.filter((x) => x !== 'none'), id])));

  const incomeHeadIds = ['salary', 'business', 'rent', 'agri', 'other'];
  const visibleIncome = showAll ? incomeHeadIds : incomeHeadIds.filter((id) => PROFILES.some((p) => profiles.includes(p.id) && p.heads.includes(id)));
  const hasIncomeProfile = visibleIncome.length > 0;
  const onlyNone = profiles.length > 0 && profiles.every((p) => p === 'none') && !showAll;

  const T = (id: string) => headTotals(HEADS.find((h) => h.id === id)!, heads[id]);
  const input: TaxInput = {
    category, firstTime,
    salary: T('salary').plus,
    business: Math.max(0, T('business').plus - T('business').minus),
    rentReceived: T('rent').plus,
    rentInterestAndTaxes: T('rent').minus,
    agriculture: Math.max(0, T('agri').plus - T('agri').minus),
    otherIncome: T('other').plus,
    investment: T('invest').plus,
    taxPaid: T('paid').plus,
    netWealth: clean(wealth),
    mustFileTrigger: triggers.length > 0,
  };
  const r = calculateTax(input);
  const hasIncome = r.totalIncome > 0;
  const maxBand = Math.max(1, ...r.bands.map((b) => b.tax));

  const message = `Hello InTaxBD, I used the tax calculator for AY ${TAX_RULES.assessmentYear}. Total income about ${tk(r.totalIncome)}, estimated tax ${tk(r.totalTax)}. Please confirm my exact tax and help me file.`;

  const categories: [TaxpayerCategory, string][] = [
    ['general', 'General'], ['womanOrSenior', 'Woman or 65+'], ['disabled', 'Person with disability'], ['freedomFighter', 'Freedom fighter'],
  ];

  const setHead = (id: string, patch: Partial<HeadState>) => setHeads((h) => ({ ...h, [id]: { ...h[id], ...patch } }));

  const needDocs = docs.filter((d) => d.id === 'all' || (d.id === 'employees' && (visibleIncome.includes('salary'))) || (d.id === 'business' && visibleIncome.includes('business')) || d.id === 'new');

  const steps = [
    { n: 1, t: t('calc.s1') },
    { n: 2, t: t('calc.s2') },
    { n: 3, t: t('calc.s3') },
    { n: 4, t: t('calc.s4') },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 pb-48 pt-24 sm:px-8 md:px-10 md:pt-36 lg:pb-16">
        <p className="text-sm font-semibold text-leaf-deep">Assessment Year {TAX_RULES.assessmentYear} · Income year {TAX_RULES.incomeYear}</p>
        <h1 className="mt-2 font-display text-[34px] font-semibold leading-[1.05] tracking-tight sm:text-5xl">{t('calc.title')}</h1>
        <p className="mt-3 max-w-xl text-[17px] text-muted">
          {t('calc.intro')}
        </p>
        <div className="mt-5"><DeadlineChip /></div>

        <ol className="mt-6 flex gap-2 overflow-x-auto pb-1 text-[13px] font-semibold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {steps.map((s) => (
            <li key={s.n} className="shrink-0">
              <a href={`#/calculator`} onClick={(e) => { e.preventDefault(); document.getElementById(`step-${s.n}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="flex min-h-[40px] items-center gap-2 rounded-full border border-rule bg-surface px-3.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-leaf text-[12px] text-ink">{s.n}</span>{s.t}
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            {/* Step 1 */}
            <section id="step-1" className="scroll-mt-24">
              <StepTitle n={1} title="Tell us about you" />
              <p className="mt-2 text-[15px] text-muted">Tap everything that is true. You can pick more than one.</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PROFILES.map((p) => {
                  const on = profiles.includes(p.id);
                  return (
                    <button key={p.id} type="button" onClick={() => toggleProfile(p.id)} aria-pressed={on}
                      className={`min-h-[56px] rounded-lg border-2 px-3 py-2 text-left text-[15px] font-semibold transition-colors ${on ? 'border-leaf-deep bg-leaf/15' : 'border-rule bg-surface hover:border-ink/40'}`}>
                      {p.label}
                      {p.note && <span className="block text-[12px] font-normal text-muted">{p.note}</span>}
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 text-[15px] font-semibold">Who is filing?<Help text="The tax-free amount is higher for women, people 65 or older, people with disability and freedom fighters." /></p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {categories.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => setCategory(id)} aria-pressed={category === id}
                    className={`min-h-[48px] rounded-lg border-2 px-3 text-[15px] font-semibold transition-colors ${category === id ? 'border-ink bg-ink text-white' : 'border-rule bg-surface hover:border-ink/40'}`}>
                    {label}
                  </button>
                ))}
              </div>
              <label className="mt-3 flex min-h-[48px] cursor-pointer items-center gap-3 text-[16px]">
                <input type="checkbox" checked={firstTime} onChange={(e) => setFirstTime(e.target.checked)} className="h-5 w-5 accent-[#6FA832]" />
                This is my first time paying income tax
              </label>
            </section>

            {/* Step 2 */}
            <section id="step-2" className="scroll-mt-24">
              <StepTitle n={2} title="Your income this year" />
              {profiles.length === 0 && !showAll && (
                <Notice>Pick at least one option in step 1, or <button type="button" onClick={() => setShowAll(true)} className="font-semibold text-brand underline">show every income type</button>.</Notice>
              )}
              {onlyNone && (
                <Notice good>
                  <b>No income means no tax to pay.</b> Your tax-free limit is {tk(r.threshold)}. You can still get a TIN and file a return, which helps with a bank account,
                  loan, visa, job or a future business. Tick anything in step 3 that applies to you.
                </Notice>
              )}
              <div className="mt-4 space-y-5">
                {visibleIncome.map((id) => (
                  <HeadCard key={id} def={HEADS.find((h) => h.id === id)!} state={heads[id]} set={(patch) => setHead(id, patch)} />
                ))}
              </div>
              {profiles.length > 0 && !showAll && (
                <button type="button" onClick={() => setShowAll(true)} className="mt-4 min-h-[44px] text-[15px] font-semibold text-brand underline">
                  I have another type of income
                </button>
              )}
              {showAll && (
                <button type="button" onClick={() => setShowAll(false)} className="mt-4 min-h-[44px] text-[15px] font-semibold text-muted underline">
                  Show only my income types
                </button>
              )}
            </section>

            {/* Step 3 */}
            <section id="step-3" className="scroll-mt-24">
              <StepTitle n={3} title="Ways to pay less" />
              <div className="mt-4 space-y-5">
                {hasIncomeProfile || showAll ? (
                  <>
                    <HeadCard def={HEADS.find((h) => h.id === 'invest')!} state={heads.invest} set={(p) => setHead('invest', p)} />
                    <HeadCard def={HEADS.find((h) => h.id === 'paid')!} state={heads.paid} set={(p) => setHead('paid', p)} />
                  </>
                ) : (
                  <Notice>Add income in step 2 to see investment and tax-paid options.</Notice>
                )}

                <div className="rounded-xl border border-rule bg-surface p-4">
                  <p className="font-display text-lg font-semibold tracking-tight">Do any of these apply to you?<Help text="Even with a low income, owning these can mean you must file a return and pay a minimum tax. This is general guidance. We confirm it for you." /></p>
                  <ul className="mt-2">
                    {TRIGGERS.map((t, i) => (
                      <li key={t}>
                        <label className="flex min-h-[48px] cursor-pointer items-center gap-3 py-1 text-[15px]">
                          <input type="checkbox" checked={triggers.includes(i)} onChange={() => setTriggers((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))} className="h-5 w-5 shrink-0 accent-[#6FA832]" />
                          {t}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-rule bg-surface p-4">
                  <label htmlFor="wealth" className="font-display text-lg font-semibold tracking-tight">Net wealth (advanced)<Help text="All your assets (land, flats, cars, savings, gold) minus loans. A surcharge only applies above 4 crore Tk. Leave blank if below." /></label>
                  <MoneyInput id="wealth" value={wealth} onChange={setWealth} className="mt-2" />
                </div>
              </div>
            </section>

            {/* Documents to expect */}
            {hasIncome && (
              <section className="rounded-xl bg-leaf/10 p-4">
                <p className="font-display text-lg font-semibold tracking-tight">Papers to keep ready</p>
                <ul className="mt-2 space-y-1 text-[15px]">
                  {needDocs.map((d) => <li key={d.id}><b>{d.category}:</b> {d.items.join(', ')}</li>)}
                </ul>
              </section>
            )}

            <Glossary />
          </div>

          {/* Result */}
          <aside id="step-4" className="min-w-0 scroll-mt-24 lg:col-span-5">
            <div className="rounded-xl border border-ink bg-surface p-5 shadow-[5px_5px_0_0_#0E1B33] sm:p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto" aria-live="polite">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-muted">{t('calc.result')}</p>
                <button type="button" onClick={reset} className="inline-flex min-h-[32px] items-center gap-1 text-[13px] font-semibold text-muted hover:text-ink">
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Start over
                </button>
              </div>
              <p className="mt-1 font-display text-[44px] font-semibold leading-none tracking-tight text-brand sm:text-5xl">{tk(r.totalTax)}</p>
              {r.totalTax > 0 && <p className="mt-1 text-sm text-muted">About {tk(r.totalTax / 12)} a month if you set it aside.</p>}
              <p className="mt-2 text-sm text-muted">
                {!hasIncome && !r.belowLimitButTriggered
                  ? 'Add your income to see your tax.'
                  : r.belowLimitButTriggered
                    ? 'Your income is within the tax-free limit, but what you ticked in step 3 may still mean you need to file. Minimum tax is shown.'
                    : r.mustFile
                      ? 'Your income is above the tax-free limit, so you need to file a return.'
                      : 'Your income is within the tax-free limit. Many people still file to keep a tax certificate.'}
              </p>

              <dl className="mt-5 space-y-2 border-t border-rule pt-4 text-[15px]">
                <Row label="Taxable income" value={tk(r.totalIncome)} />
                {r.salaryExempt > 0 && <Row label="Salary part not taxed" value={`− ${tk(r.salaryExempt)}`} muted />}
                <Row label="Tax-free limit" value={tk(r.threshold)} muted />
                <Row label="Tax on slabs" value={tk(r.taxBeforeRebate)} />
                {r.rebate > 0 && <Row label="Investment rebate" value={`− ${tk(r.rebate)}`} good />}
                {r.minimumApplied && <Row label="Minimum tax applied" value={tk(r.taxAfterRebate)} />}
                {r.surcharge > 0 && <Row label={`Wealth surcharge (${r.surchargeRate * 100}%)`} value={`+ ${tk(r.surcharge)}`} />}
                <Row label={t('calc.total')} value={tk(r.totalTax)} bold />
                {r.taxPaid > 0 && <Row label="Already paid" value={`− ${tk(r.taxPaid)}`} muted />}
                {(hasIncome || r.belowLimitButTriggered) && (
                  <div className={`mt-2 rounded-lg p-3 text-[15px] font-semibold ${r.balance > 0 ? 'bg-brand/10 text-brand' : 'bg-leaf/20 text-ink'}`}>
                    {r.balance > 0 ? `You still need to pay ${tk(r.balance)}` : r.balance < 0 ? `You may get back ${tk(-r.balance)}` : 'Nothing more to pay'}
                  </div>
                )}
              </dl>

              {r.extraRebateAvailable > 0 && (
                <p className="mt-4 flex items-start gap-2.5 rounded-lg bg-leaf/15 p-3 text-[14px] leading-snug">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-leaf-deep" aria-hidden="true" />
                  <span>Invest about <b>{tk(r.extraRebateAvailable / TAX_RULES.rebate.investmentRate)}</b> more in approved savings and your tax could drop by up to <b>{tk(r.extraRebateAvailable)}</b>.</span>
                </p>
              )}
              {visibleIncome.includes('salary') && input.taxPaid === 0 && input.salary > r.threshold && (
                <p className="mt-3 text-[13px] text-muted">Tip: tax is often already cut from salary. Add it under "Tax you already paid" so you do not pay twice.</p>
              )}

              {r.bands.some((b) => b.amount > 0) && (
                <div className="mt-5 border-t border-rule pt-4">
                  <p className="text-sm font-semibold">How your tax builds up</p>
                  <ul className="mt-3 space-y-3">
                    {r.bands.filter((b) => b.amount > 0).map((b) => (
                      <li key={b.label}>
                        <div className="flex justify-between gap-3 text-[13px]">
                          <span className="min-w-0 text-muted">{(b.rate * 100).toFixed(0)}% on {tk(b.amount)}</span>
                          <span className="shrink-0 font-semibold">{tk(b.tax)}</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-rule">
                          <div className="h-full rounded-full bg-leaf-deep transition-[width] duration-500 ease-out motion-reduce:transition-none" style={{ width: `${(b.tax / maxBand) * 100}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button variant="accent" fullWidth className="mt-6" href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> {t('calc.expert')}
              </Button>
            </div>

            <p className="mt-4 flex items-start gap-2.5 text-[13px] leading-relaxed text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                An estimate for common cases. It does not cover capital gains, foreign income, company tax, or special exemptions.
                Rates can change with each Finance Act. A qualified accountant will confirm your exact tax.
              </span>
            </p>
          </aside>
        </div>

        <NbrNews className="mt-14 border-t border-rule pt-10" />

        <section className="mt-14 border-t border-rule pt-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight">{t('calc.next')}</h2>
          <ol className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ['Send your papers', 'Photos or PDFs on WhatsApp are fine.'],
              ['We confirm your exact tax', 'A qualified accountant checks every figure and shows you before filing.'],
              ['We file within 48 hours', 'We submit to the NBR and send your acknowledgement receipt.'],
            ].map(([a, b], i) => (
              <li key={a} className="flex gap-3 rounded-xl border border-rule bg-surface p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-leaf font-bold text-ink">{i + 1}</span>
                <span><span className="block font-semibold">{a}</span><span className="block text-[14px] text-muted">{b}</span></span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="accent" href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`}>
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> {t('calc.expert')}
            </Button>
            <Button variant="outline" href="#pricing">See our fees</Button>
          </div>
        </section>
      </main>

      {/* Phone: always-visible result bar, tap to jump to the full breakdown */}
      <button type="button" onClick={() => document.getElementById('step-4')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] left-3 z-40 flex w-[calc(100%-1.5rem)] min-h-[56px] items-center justify-between gap-3 rounded-2xl bg-ink px-5 text-left text-white shadow-lg lg:hidden">
        <span>
          <span className="block text-[12px] text-white/70">{t('calc.result')}</span>
          <span className="block font-display text-2xl font-semibold leading-tight text-leaf">{tk(r.totalTax)}</span>
        </span>
        <span className="rounded-full bg-leaf px-4 py-2 text-[14px] font-semibold text-ink">See breakdown</span>
      </button>

      <TabBar active="calc" waText={message} />

      <ChatBubble hide={false} title="Not sure about your numbers?" body="Send us what you have. We will work it out with you." waText={message} />
    </div>
  );
};

const StepTitle: React.FC<{ n: number; title: string }> = ({ n, title }) => (
  <h2 className="flex items-center gap-3 font-display text-2xl font-semibold tracking-tight">
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-leaf text-base text-ink">{n}</span>
    {title}
  </h2>
);

const Notice: React.FC<{ good?: boolean; children: React.ReactNode }> = ({ good, children }) => (
  <p className={`mt-3 rounded-lg border p-3.5 text-[15px] leading-relaxed ${good ? 'border-leaf/60 bg-leaf/10' : 'border-rule bg-surface text-muted'}`}>{children}</p>
);

const Help: React.FC<{ text: string }> = ({ text }) => {
  const [open, setOpen] = useState(false);
  return (
    <span className="inline">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="What does this mean?" className="ml-1.5 inline-grid h-6 w-6 translate-y-1 place-items-center rounded-full text-brand">
        <HelpCircle className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
      {open && <span className="mt-1.5 block rounded-md bg-brand/10 p-2.5 text-[13px] font-normal leading-snug text-ink">{text}</span>}
    </span>
  );
};

const MoneyInput: React.FC<{ id: string; value: string; onChange: (v: string) => void; className?: string; placeholder?: string; label?: string }> = ({ id, value, onChange, className = '', placeholder = '0', label }) => (
  <div className={`relative ${className}`}>
    <input id={id} aria-label={label} type="text" inputMode="numeric" autoComplete="off" placeholder={placeholder} value={fmt(value)} onChange={(e) => onChange(e.target.value)}
      className="block w-full min-w-0 rounded-md border border-ink/25 bg-surface py-3 pl-4 pr-12 text-[18px] outline-none focus:border-brand" />
    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">Tk</span>
  </div>
);

const PeriodToggle: React.FC<{ value: Period; onChange: (p: Period) => void }> = ({ value, onChange }) => (
  <div className="inline-flex shrink-0 overflow-hidden rounded-md border border-ink/25 text-[13px] font-semibold" role="group" aria-label="Per month or per year">
    {(['month', 'year'] as Period[]).map((p) => (
      <button key={p} type="button" onClick={() => onChange(p)} aria-pressed={value === p}
        className={`min-h-[36px] px-2.5 ${value === p ? 'bg-ink text-white' : 'bg-surface text-ink'}`}>
        {p === 'month' ? 'Monthly' : 'Yearly'}
      </button>
    ))}
  </div>
);

const HeadCard: React.FC<{ def: HeadDef; state: HeadState; set: (p: Partial<HeadState>) => void }> = ({ def, state, set }) => {
  const t = headTotals(def, state);
  const net = def.hasCosts ? t.plus - t.minus : t.plus;
  const setLine = (id: string, patch: Partial<{ v: string; p: Period }>) => set({ lines: { ...state.lines, [id]: { ...state.lines[id], ...patch } } });
  const setExtra = (id: string, patch: Partial<Extra>) => set({ extras: state.extras.map((x) => (x.id === id ? { ...x, ...patch } : x)) });

  return (
    <div className="rounded-xl border border-rule bg-surface p-4 sm:p-5">
      <h3 className="font-display text-xl font-semibold tracking-tight">{def.title}</h3>
      <p className="text-[14px] text-muted">{def.intro}</p>

      <div className="mt-3 inline-flex overflow-hidden rounded-md border border-ink/25 text-[14px] font-semibold" role="group" aria-label="How to enter">
        {([['total', 'One total'], ['items', 'Break it down']] as const).map(([m, label]) => (
          <button key={m} type="button" onClick={() => set({ mode: m })} aria-pressed={state.mode === m}
            className={`min-h-[40px] px-3.5 ${state.mode === m ? 'bg-ink text-white' : 'bg-surface text-ink'}`}>{label}</button>
        ))}
      </div>

      {state.mode === 'total' ? (
        <div className="mt-4">
          <label className="block text-[15px] font-semibold">{def.totalLabel}<Help text={def.totalHelp} /></label>
          <div className="mt-1.5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <MoneyInput id={`${def.id}-total`} label={def.totalLabel} value={state.total} onChange={(v) => set({ total: v })} className="min-w-0 flex-1" />
            <PeriodToggle value={state.period} onChange={(p) => set({ period: p })} />
          </div>
          <p className="mt-1.5 text-[13px] text-muted">{def.example}</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3.5">
          {def.lines.map((l) => (
            <div key={l.id}>
              <label htmlFor={`${def.id}-${l.id}`} className="block text-[15px] font-semibold">
                {l.label}{l.sign === -1 && <span className="ml-1.5 rounded bg-ink/10 px-1.5 py-0.5 text-[11px] font-bold text-ink/70">minus</span>}
              </label>
              {l.help && <p className="text-[13px] text-muted">{l.help}</p>}
              <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center">
                <MoneyInput id={`${def.id}-${l.id}`} value={state.lines[l.id].v} onChange={(v) => setLine(l.id, { v })} className="min-w-0 flex-1" />
                <PeriodToggle value={state.lines[l.id].p} onChange={(p) => setLine(l.id, { p })} />
              </div>
            </div>
          ))}

          {state.extras.map((x) => (
            <div key={x.id} className="rounded-lg border border-dashed border-ink/30 p-3">
              <div className="flex items-center gap-2">
                <input type="text" value={x.label} onChange={(e) => setExtra(x.id, { label: e.target.value })} placeholder="What is it?" aria-label="Item name"
                  className="min-w-0 flex-1 rounded-md border border-ink/25 bg-surface px-3 py-2.5 text-[16px] outline-none focus:border-brand" />
                <button type="button" onClick={() => set({ extras: state.extras.filter((e) => e.id !== x.id) })} aria-label="Remove this item" className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-muted hover:bg-ink/5">
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              {def.hasCosts && (
                <div className="mt-2 inline-flex overflow-hidden rounded-md border border-ink/25 text-[13px] font-semibold" role="group" aria-label="Adds or subtracts">
                  {([[1, 'Adds to income'], [-1, 'Is a cost']] as const).map(([sg, label]) => (
                    <button key={sg} type="button" onClick={() => setExtra(x.id, { sign: sg })} aria-pressed={x.sign === sg}
                      className={`min-h-[34px] px-2.5 ${x.sign === sg ? 'bg-ink text-white' : 'bg-surface'}`}>{label}</button>
                  ))}
                </div>
              )}
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <MoneyInput id={`${def.id}-${x.id}`} label={x.label || 'Amount'} value={x.v} onChange={(v) => setExtra(x.id, { v })} className="min-w-0 flex-1" />
                <PeriodToggle value={x.p} onChange={(p) => setExtra(x.id, { p })} />
              </div>
            </div>
          ))}

          <button type="button" onClick={() => set({ extras: [...state.extras, { id: uid(), label: '', v: '', p: def.defaultPeriod, sign: def.hasCosts ? -1 : 1 }] })}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold text-brand">
            <Plus className="h-4 w-4" aria-hidden="true" /> {def.addLabel}
          </button>
        </div>
      )}

      {net !== 0 && (
        <p className="mt-4 rounded-md bg-leaf/15 px-3 py-2 text-[15px] font-semibold">
          {def.hasCosts && t.minus > 0 ? `${tk(t.plus)} − ${tk(t.minus)} = ` : state.mode === 'items' ? 'Sum: ' : state.period === 'month' && state.mode === 'total' ? `${tk(clean(state.total))} × 12 = ` : 'Yearly total: '}
          {tk(net)}{def.hasCosts && net < 0 ? ' (a loss counts as zero)' : ''}
        </p>
      )}
      {def.tip && <p className="mt-3 flex items-start gap-2 text-[13px] text-muted"><Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{def.tip}</p>}
    </div>
  );
};

const GLOSS: [string, string][] = [
  ['Tax-free limit', 'The part of your yearly income that is not taxed at all. Tax starts only on income above it.'],
  ['Slab', 'Income is taxed in steps. Each step has its own rate, so only the part inside a step is taxed at that rate.'],
  ['TDS', 'Tax Deducted at Source. Your employer or bank cuts it before paying you. It counts as tax you already paid.'],
  ['Advance tax', 'Tax you pay during the year before you file. It is also deducted from what you owe.'],
  ['Rebate', 'A reduction on your tax for investing in approved savings.'],
  ['Minimum tax', 'The least tax a person above the limit must pay, even if the slabs give a smaller number.'],
  ['TIN', 'Taxpayer Identification Number. You need one to file a return. We can help you get it.'],
  ['Assessment year', 'The year in which you file. It follows the income year, which is the year you earned the money.'],
];

const Glossary: React.FC = () => (
  <section>
    <h2 className="font-display text-2xl font-semibold tracking-tight">Words explained</h2>
    <div className="mt-3 divide-y divide-rule rounded-xl border border-rule bg-surface">
      {GLOSS.map(([t, d]) => (
        <details key={t} className="group px-4">
          <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 text-[16px] font-semibold">
            {t}<Plus className="h-4 w-4 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="pb-4 text-[15px] text-muted">{d}</p>
        </details>
      ))}
    </div>
  </section>
);

const Row: React.FC<{ label: string; value: string; bold?: boolean; muted?: boolean; good?: boolean }> = ({ label, value, bold, muted, good }) => (
  <div className={`flex items-baseline justify-between gap-3 ${bold ? 'border-t border-rule pt-2 text-[17px] font-bold' : ''} ${muted ? 'text-muted' : ''} ${good ? 'text-leaf-deep' : ''}`}>
    <dt className="min-w-0">{label}</dt>
    <dd className="shrink-0 font-semibold">{value}</dd>
  </div>
);

export default Calculator;
