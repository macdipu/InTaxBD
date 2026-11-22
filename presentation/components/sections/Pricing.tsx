import React, { useLayoutEffect, useRef, useState } from 'react';
import { MessageCircle, BadgePercent } from 'lucide-react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { Odometer, Rule, PenMark } from '../ui/Motion';
import { ContentRepository } from '../../../data/repositories/contentRepository';

interface PricingProps {
  tierIndex: number;
  onTierChange: (index: number) => void;
}

const Pricing: React.FC<PricingProps> = ({ tierIndex, onTierChange }) => {
  const tiers = ContentRepository.getPricing();
  const contact = ContentRepository.getContact();
  const year = ContentRepository.getTaxYear();
  const tier = tiers[tierIndex];

  // One highlight bar slides to the selected row.
  const listRef = useRef<HTMLUListElement>(null);
  const [bar, setBar] = useState({ y: 0, h: 0 });
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    // Measure against the list itself (not offsetParent), and again whenever
    // the list changes size (fonts loading, rotation, text wrapping).
    const measure = () => {
      const row = list.children[tierIndex] as HTMLElement | undefined;
      if (!row) return;
      const r = row.getBoundingClientRect();
      const l = list.getBoundingClientRect();
      setBar({ y: r.top - l.top, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [tierIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = Math.min(tiers.length - 1, Math.max(0, tierIndex + delta));
    onTierChange(next);
    (listRef.current?.children[next]?.querySelector('button') as HTMLButtonElement | null)?.focus();
  };

  const specialMessage = `Hello InTaxBD, I'm a new client and would like to ask about special pricing for my ${year.assessmentYear} return. My total income/assets is ${tier.label}. Reference (if any): `;
  const message = `Hello InTaxBD, my total income/assets is ${tier.label}. I would like to file my ${year.assessmentYear} return.`;

  return (
    <Section id="pricing">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            title="One fee, set by your income"
            intro={
              <>
                <PenMark delay={500}>No hidden costs.</PenMark> The fee follows your total gross income or assets, and you
                see it before we start.
              </>
            }
          />
          <div data-reveal className="relative mt-6 hidden max-w-md pl-4 lg:block">
            <span className="rv-bar absolute inset-y-0 left-0 w-[3px] rounded bg-leaf" aria-hidden="true" />
            <p className="text-[15px] leading-relaxed text-muted">
              All fees exclude VAT and government taxes. For custom business engagements, call or message us for a
              quote.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7" data-reveal>
          <div className="flex justify-between pb-3 text-sm text-muted" aria-hidden="true">
            <span>Total income or assets</span>
            <span>Advisory fee</span>
          </div>
          <Rule className="text-ink" />

          <div className="relative overflow-hidden">
            {/* sliding highlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 border-l-[3px] border-leaf bg-leaf/15 transition-[transform,height] duration-[450ms] ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
              style={{ transform: `translateY(${bar.y}px)`, height: bar.h }}
            />
            <ul ref={listRef} onKeyDown={onKeyDown} aria-label="Advisory fee by total income or assets" className="relative">
              {tiers.map((t, i) => {
                const selected = i === tierIndex;
                return (
                  <li key={t.id} className="border-b border-rule">
                    <button
                      type="button"
                      onClick={() => onTierChange(i)}
                      aria-pressed={selected}
                      tabIndex={selected ? 0 : -1}
                      className="flex min-h-[56px] w-full items-end gap-2 px-3 py-3.5 text-left transition-colors hover:bg-ink/[.03] sm:gap-3 md:py-4"
                    >
                      <span
                        className={`text-[16px] transition-[font-weight] sm:text-[17px] ${selected ? 'font-semibold text-ink' : 'text-ink/85'}`}
                      >
                        {t.label}
                      </span>
                      <span className="leader" style={{ '--d': `${150 + i * 60}ms` } as React.CSSProperties} aria-hidden="true" />
                      <span
                        className={`shrink-0 font-display text-lg tracking-tight transition-colors sm:text-xl ${
                          selected ? 'font-bold text-brand' : 'font-semibold'
                        }`}
                      >
                        {t.price}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Your fee */}
          <div className="mt-6 flex flex-col gap-4 rounded-xl bg-night p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6 on-dark">
            <div aria-live="polite">
              <p className="text-sm text-white/60">Your fee for {tier.label}</p>
              <p className="mt-1 font-display text-4xl font-semibold leading-none tracking-tight text-leaf">
                <Odometer value={tier.price} />
              </p>
            </div>
            <Button variant="accent" href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`} className="sm:shrink-0">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Send this on WhatsApp
            </Button>
          </div>

          {/* Special pricing for new and referred clients */}
          <div data-reveal className="mt-4 flex flex-col gap-4 rounded-xl border border-leaf/60 bg-leaf/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-leaf text-ink">
                <BadgePercent className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                  First time with us, or referred by someone?
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                  Feel free to contact us for <PenMark delay={400}>special pricing</PenMark>.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(specialMessage)}`}
              className="sm:shrink-0"
            >
              Ask about special pricing
            </Button>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted lg:hidden">
            All fees exclude VAT and government taxes. For custom business engagements, call or message us for a quote.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
