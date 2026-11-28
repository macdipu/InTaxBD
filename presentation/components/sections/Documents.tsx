import React, { useEffect, useState } from 'react';
import { Printer, MessageCircle, Info } from 'lucide-react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { Odometer, Rule, Stamp, Tick } from '../ui/Motion';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import PrintChecklist from './PrintChecklist';

const STORAGE_KEY = 'intaxbd-docs-ready';

// Plain questions that decide which document groups a person sees.
const QUESTIONS: { id: string; q: string; hint: string }[] = [
  { id: 'employees', q: 'Do you work for a salary?', hint: 'A job at a company, bank, NGO or government office' },
  { id: 'business', q: 'Do you run a business or shop?', hint: 'Proprietorship, partnership or company' },
  { id: 'new', q: 'Is this your first time with InTaxBD?', hint: 'We need a few papers to set you up' },
  { id: 'additional', q: 'Any tax already deducted or paid, or inherited property?', hint: 'TDS, advance tax, or property from family' },
];

const loadReady = (): Set<string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
};

const Documents: React.FC = () => {
  const docs = ContentRepository.getDocuments();
  const year = ContentRepository.getTaxYear();
  const contact = ContentRepository.getContact();
  const [ready, setReady] = useState<Set<string>>(loadReady);
  const [yes, setYes] = useState<Set<string>>(new Set());
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ready]));
    } catch {
      /* storage unavailable: ticks just won't persist */
    }
  }, [ready]);

  const shown = docs.filter((d) => d.id === 'all' || yes.has(d.id));
  const keys = shown.flatMap((d) => d.items.map((_, i) => `${d.id}-${i}`));
  const total = keys.length;
  const count = keys.filter((k) => ready.has(k)).length;
  const allDone = count === total;

  const answer = (id: string) => {
    setAsked(true);
    setYes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggle = (key: string) =>
    setReady((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const message = `Hello InTaxBD, I have gathered my documents for Assessment Year ${year.assessmentYear} and I'm ready to send them.`;

  return (
    <Section id="documents">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
        <SectionHeading
          title="Documents to gather"
          intro={`Not sure what to bring? Look at the groups below and pick the ones that match you. For Assessment Year ${year.assessmentYear} we need papers from ${year.incomeYear}.`}
        />
        <Button variant="outline" onClick={() => window.print()} className="group hidden shrink-0 md:inline-flex">
          <Printer className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
          Print or save as PDF
        </Button>
      </div>
      <PrintChecklist ready={ready} />

      {/* A few quick questions decide what you need */}
      <div className="mt-8">
        <p className="font-display text-xl font-semibold tracking-tight">Answer a few quick questions</p>
        <p className="mt-1 text-[15px] text-muted">Tap every one that is true for you. We will show only the papers you need.</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {QUESTIONS.map(({ id, q, hint }) => {
            const on = yes.has(id);
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => answer(id)}
                  aria-pressed={on}
                  className={`flex min-h-[64px] w-full items-center gap-3.5 rounded-xl border-2 p-3.5 text-left transition-colors ${
                    on ? 'border-leaf-deep bg-leaf/15' : 'border-rule bg-surface hover:border-ink/40'
                  }`}
                >
                  <span className="flex-1">
                    <span className="block text-[16px] font-semibold text-ink">{q}</span>
                    <span className="block text-[13px] text-muted">{hint}</span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[13px] font-bold ${
                      on ? 'bg-leaf-deep text-white' : 'bg-ink/10 text-ink/70'
                    }`}
                  >
                    {on ? 'Yes' : 'Tap if yes'}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-sm text-muted">
          {asked
            ? 'Your list is below. Tick each paper as you find it. The ticks are only for you. Nothing is sent.'
            : 'Everyone needs the first group below. Tap an answer above to add more.'}
        </p>
      </div>

      {/* Progress meter: sticks under the header on phones while you tick */}
      <div className="sticky top-[56px] z-20 -mx-5 mt-8 border-b border-rule bg-paper/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 md:static md:mx-0 md:mt-10 md:rounded-xl md:border md:bg-surface md:p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[15px] font-semibold text-ink" aria-live="polite">
            <Odometer value={String(count)} /> of {total} ready
          </p>
          <div className="relative h-8">
            <Stamp show={allDone} className="!text-[12px]">
              All set
            </Stamp>
          </div>
        </div>
        <div className="mt-2.5 flex gap-1" aria-hidden="true">
          {keys.map((k) => (
            <span key={k} className="h-1.5 flex-1 overflow-hidden rounded-full bg-rule">
              <span
                className={`block h-full origin-left rounded-full bg-leaf-deep transition-transform duration-300 ease-out motion-reduce:transition-none ${
                  ready.has(k) ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </span>
          ))}
        </div>
      </div>

      {allDone && (
        <div className="pop-in mt-5 flex flex-col gap-3 rounded-xl bg-leaf/15 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-ink">You have everything. Send it over and we'll start your return.</p>
          <Button variant="accent" href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`} className="sm:shrink-0">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Send my documents
          </Button>
        </div>
      )}

      <p className="mt-6 flex items-start gap-3 rounded-lg border border-leaf/60 bg-leaf/10 p-3.5 text-[15px] text-ink">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-leaf-deep" aria-hidden="true" />
        <span>
          <span className="font-semibold">Your profile may need other documents too.</span> This list covers the usual
          papers. After you contact us, we check your situation and tell you exactly what else to send.
        </span>
      </p>

      <div className="mt-8 grid gap-x-12 gap-y-8 md:mt-12 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
        {shown.map((doc) => {
          const done = doc.items.every((_, i) => ready.has(`${doc.id}-${i}`));
          return (
            <fieldset key={doc.id} data-reveal>
              <legend className="sr-only">{doc.category}</legend>
              <Rule className="text-ink" />
              <h3 className="flex items-center justify-between pt-4 font-display text-xl font-semibold tracking-tight" aria-hidden="true">
                {doc.category}
                <Tick mode="toggle" on={done} className="h-5 w-5 text-leaf-deep" strokeWidth={3} />
              </h3>
              <p className="mt-0.5 text-sm font-semibold text-leaf-deep">{doc.whoFor}</p>
              <ul className="mt-2">
                {doc.items.map((item, idx) => {
                  const key = `${doc.id}-${idx}`;
                  const checked = ready.has(key);
                  return (
                    <li key={key}>
                      <label className="group flex min-h-[48px] cursor-pointer items-center gap-3.5 rounded-md py-2">
                        <input type="checkbox" checked={checked} onChange={() => toggle(key)} className="peer sr-only" />
                        <span
                          aria-hidden="true"
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand motion-reduce:transition-none ${
                            checked ? 'scale-100 border-leaf-deep bg-leaf-deep' : 'border-ink/40 bg-surface group-active:scale-90'
                          }`}
                        >
                          <Tick mode="toggle" on={checked} className="h-4 w-4 text-white" strokeWidth={3} />
                        </span>
                        <span
                          className={`text-[17px] leading-snug transition-colors duration-300 ${
                            'text-ink'
                          }`}
                        >
                          {item}
                        </span>
                        {checked && (
                          <span className="pop-in ml-auto rounded-full bg-leaf/20 px-2.5 py-0.5 text-[12px] font-semibold text-leaf-deep">
                            Have it
                          </span>
                        )}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          );
        })}
      </div>

      <Button variant="outline" fullWidth onClick={() => window.print()} className="mt-10 md:hidden">
        <Printer className="h-4 w-4" aria-hidden="true" />
        Print or save as PDF
      </Button>
    </Section>
  );
};

export default Documents;
