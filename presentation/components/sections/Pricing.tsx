import React from 'react';
import { Section, SectionHeading } from '../ui/Primitives';
import { ContentRepository } from '../../../data/repositories/contentRepository';

interface PricingProps {
  tierIndex: number;
  onTierChange: (index: number) => void;
}

const Pricing: React.FC<PricingProps> = ({ tierIndex, onTierChange }) => {
  const tiers = ContentRepository.getPricing();

  return (
    <Section id="pricing">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            title="One fee, set by your income"
            intro="No hidden costs. The fee follows your total gross income or assets, and you see it before we start."
          />
          <p className="mt-8 max-w-md border-l-[3px] border-leaf pl-4 text-[15px] leading-relaxed text-muted">
            All fees exclude VAT and government taxes. For custom business engagements, call or message us for a quote.
          </p>
        </div>

        <div className="lg:col-span-7">
          <table className="w-full">
            <caption className="sr-only">Advisory fee by total income or assets</caption>
            <thead>
              <tr className="border-b border-ink text-left text-sm text-muted">
                <th scope="col" className="pb-3 font-medium">Total income or assets</th>
                <th scope="col" className="pb-3 text-right font-medium">Advisory fee</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, i) => {
                const selected = i === tierIndex;
                return (
                  <tr
                    key={tier.id}
                    onClick={() => onTierChange(i)}
                    className={`cursor-pointer border-b border-rule transition-colors ${
                      selected ? 'bg-leaf/20' : 'hover:bg-surface'
                    }`}
                  >
                    <td className="py-4 pr-4 text-[17px]">
                      <span className="flex items-baseline gap-3">
                        <span className={selected ? 'font-semibold' : ''}>{tier.label}</span>
                        <span
                          className="min-w-4 flex-1 translate-y-[-4px] border-b border-dotted border-ink/30"
                          aria-hidden="true"
                        />
                      </span>
                    </td>
                    <td
                      className={`py-4 text-right font-display text-xl tracking-tight ${
                        selected ? 'font-bold text-brand' : 'font-semibold'
                      }`}
                    >
                      {tier.price}
                      {selected && <span className="sr-only"> (selected)</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
