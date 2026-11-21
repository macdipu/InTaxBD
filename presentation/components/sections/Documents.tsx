import React, { useEffect, useState } from 'react';
import { Printer, MessageCircle } from 'lucide-react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { Odometer, Rule, Stamp, Tick } from '../ui/Motion';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import PrintChecklist from './PrintChecklist';

const STORAGE_KEY = 'intaxbd-docs-ready';

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ready]));
    } catch {
      /* storage unavailable: ticks just won't persist */
    }
  }, [ready]);

  const keys = docs.flatMap((d) => d.items.map((_, i) => `${d.id}-${i}`));
  const total = keys.length;
  const count = keys.filter((k) => ready.has(k)).length;
  const allDone = count === total;

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
          intro={`Tick each one as you find it. Your ticks are saved on this device. For Assessment Year ${year.assessmentYear} we need papers covering the income year ${year.incomeYear}.`}
        />
        <Button variant="outline" onClick={() => window.print()} className="group hidden shrink-0 md:inline-flex">
          <Printer className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
          Print or save as PDF
        </Button>
      </div>
      <PrintChecklist ready={ready} />

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
          <p className="font-semibold text-ink">Everything is ready. Send it over and we'll start your return.</p>
          <Button variant="accent" href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`} className="sm:shrink-0">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Send my documents
          </Button>
        </div>
      )}

      <div className="mt-8 grid gap-x-12 gap-y-8 md:mt-12 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
        {docs.map((doc) => {
          const done = doc.items.every((_, i) => ready.has(`${doc.id}-${i}`));
          return (
            <fieldset key={doc.id} data-reveal>
              <legend className="sr-only">{doc.category}</legend>
              <Rule className="text-ink" />
              <h3 className="flex items-center justify-between pt-4 font-display text-xl font-semibold tracking-tight" aria-hidden="true">
                {doc.category}
                <Tick mode="toggle" on={done} className="h-5 w-5 text-leaf-deep" strokeWidth={3} />
              </h3>
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
                          className={`strike text-[17px] leading-snug transition-colors duration-300 ${
                            checked ? 'on text-muted' : 'text-ink'
                          }`}
                        >
                          {item}
                        </span>
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
