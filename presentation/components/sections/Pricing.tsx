import React from 'react';
import { Section, SectionTitle, GlassCard } from '../ui/GlassComponents';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const Pricing: React.FC = () => {
  const tiers = ContentRepository.getPricing();

  return (
    <Section id="pricing">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
           <SectionTitle title="Transparent Pricing" subtitle="Tax Advisory Fee Structure" />
           <p className="text-gray-300 mb-8">
             We believe in clear, upfront pricing with no hidden costs. Our fee structure is based on your total gross income or assets.
           </p>
           <div className="p-6 bg-brand-secondary/10 border border-brand-secondary/20 rounded-2xl">
              <h4 className="text-brand-secondary font-bold mb-2">Note:</h4>
              <p className="text-sm text-gray-300">
                All fees are exclusive of VAT and government taxes. Contact us for custom enterprise solutions.
              </p>
           </div>
        </div>

        <div className="lg:col-span-7">
          <GlassCard className="!p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="p-5 font-semibold text-white">Total Income / Asset</th>
                    <th className="p-5 font-semibold text-brand-secondary text-right">Advisory Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tiers.map((tier) => (
                    <tr key={tier.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-5 text-gray-300 text-sm md:text-base">{tier.label}</td>
                      <td className="p-5 text-white font-bold text-right text-sm md:text-base">{tier.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;