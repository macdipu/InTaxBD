import React from 'react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { Rule, Tick } from '../ui/Motion';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import { scrollToId } from '../layout/Navbar';

// Where each line of service usually starts on the fee scale.
const startingTier: Record<string, number> = { individual: 1, business: 3, special: 1 };

const Services: React.FC<{ onTierChange: (i: number) => void }> = ({ onTierChange }) => {
  const services = ContentRepository.getServices();
  const additional = ContentRepository.getAdditionalServices();

  const seeFee = (id: string) => {
    onTierChange(startingTier[id] ?? 1);
    scrollToId('pricing');
  };

  return (
    <Section id="services" className="border-t border-rule bg-surface">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              title="Who we file for"
              intro="Pick the line that matches you. Fees start at 1,500 Tk and depend on your income or assets."
            />
            <div data-reveal className="relative mt-6 max-w-md pl-4">
              <span className="rv-bar absolute inset-y-0 left-0 w-[3px] rounded bg-leaf" aria-hidden="true" />
              <p className="rv-fade text-lg font-bold leading-snug text-ink" style={{ '--d': '200ms' } as React.CSSProperties}>
                Your return is handled by CA professionals, Income Tax Practitioners (ITP), income tax lawyers and qualified accountants, working as one team.
              </p>
            </div>
            <p className="mt-6 max-w-md text-[15px] text-muted">
              We also handle {additional.slice(0, -1).join(', ')} and {additional[additional.length - 1]}.
            </p>
            <Button
              variant="primary"
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}
              className="mt-7 hidden lg:inline-flex"
            >
              Get a free consultation
            </Button>
          </div>
        </div>

        <div className="lg:col-span-8">
          {services.map((service) => (
            <div key={service.id} data-reveal className="nudge-row">
              <Rule className="text-ink" />
              <div className="grid gap-4 py-7 md:grid-cols-12 md:gap-8 md:py-8">
                <div className="md:col-span-5">
                  <h3 className="nudge font-display text-2xl font-semibold leading-tight tracking-tight">
                    {service.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => seeFee(service.id)}
                    className="mt-3 hidden min-h-[44px] text-[15px] font-semibold text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand md:inline-block"
                  >
                    See the fee
                  </button>
                </div>
                <ul className="space-y-2.5 md:col-span-7 md:space-y-3">
                  {service.description.map((item, i) => (
                    <li key={item} className="flex items-start gap-3 text-[17px] text-ink">
                      <Tick className="mt-1 h-4 w-4 shrink-0 text-leaf-deep" delay={350 + i * 70} strokeWidth={3} />
                      <span className="rv-fade" style={{ '--d': `${300 + i * 70}ms` } as React.CSSProperties}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => seeFee(service.id)}
                  className="min-h-[44px] justify-self-start text-[15px] font-semibold text-brand underline decoration-brand/30 underline-offset-4 md:hidden"
                >
                  See the fee
                </button>
              </div>
            </div>
          ))}
          <Button
            variant="primary"
            fullWidth
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}
            className="mt-2 lg:hidden"
          >
            Get a free consultation
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Services;
