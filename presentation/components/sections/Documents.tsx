import React, { useState } from 'react';
import { Printer } from 'lucide-react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const Documents: React.FC = () => {
  const docs = ContentRepository.getDocuments();
  const year = ContentRepository.getTaxYear();
  const [ready, setReady] = useState<Set<string>>(new Set());

  const total = docs.reduce((n, d) => n + d.items.length, 0);

  const toggle = (key: string) =>
    setReady((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <Section id="documents">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          title="Documents to gather"
          intro={`Tick each one as you find it. We need papers covering your income period, ${year.incomePeriod}.`}
        />
        <div className="no-print flex shrink-0 flex-col gap-3 md:items-end">
          <p className="text-sm font-medium text-muted" aria-live="polite">
            {ready.size} of {total} ready
          </p>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print checklist
          </Button>
        </div>
      </div>

      <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <fieldset key={doc.id} className="border-t border-ink pt-4">
            <legend className="sr-only">{doc.category}</legend>
            <h3 className="font-display text-xl font-semibold tracking-tight" aria-hidden="true">
              {doc.category}
            </h3>
            <ul className="mt-4 space-y-1">
              {doc.items.map((item, idx) => {
                const key = `${doc.id}-${idx}`;
                const checked = ready.has(key);
                return (
                  <li key={key}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-md py-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(key)}
                        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#3F6B0C]"
                      />
                      <span
                        className={`text-[17px] leading-snug ${
                          checked ? 'text-muted line-through decoration-1' : 'text-ink'
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
        ))}
      </div>
    </Section>
  );
};

export default Documents;
