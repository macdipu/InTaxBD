import React from 'react';
import { MessageCircle, Check } from 'lucide-react';
import { Button } from '../ui/Primitives';
import { ContentRepository } from '../../../data/repositories/contentRepository';

interface HeroProps {
  tierIndex: number;
  onTierChange: (index: number) => void;
}

const Hero: React.FC<HeroProps> = ({ tierIndex, onTierChange }) => {
  const stats = ContentRepository.getHeroStats();
  const tiers = ContentRepository.getPricing();
  const year = ContentRepository.getTaxYear();
  const contact = ContentRepository.getContact();
  const tier = tiers[tierIndex];

  const message = `Hello InTaxBD, my total income/assets is ${tier.label}. I would like to file my ${year.assessmentYear} return.`;

  return (
    <section id="home" className="px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-12">
        {/* Left: the promise */}
        <div className="lg:col-span-7">
          <div className="rise inline-flex flex-col gap-0.5 rounded-xl border border-rule bg-surface px-4 py-2.5 text-sm">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
              Assessment Year: {year.assessmentYear}
            </p>
            <p className="pl-4 text-muted">Income Year: {year.incomeYear}</p>
          </div>

          <h1 className="rise rise-1 mt-7 font-display text-[44px] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[76px]">
            File your income tax return in 48 hours.
          </h1>

          <p className="rise rise-2 mt-7 max-w-lg text-lg leading-relaxed text-muted">
            For individuals, freelancers, NRBs and businesses in Bangladesh. You send the documents.
            We calculate, confirm the figures with you, and submit to the NBR.
          </p>

          <div className="rise rise-3 mt-9 flex flex-wrap gap-3">
            <Button variant="primary" href="#pricing">
              See all fees
            </Button>
            <Button variant="outline" href="#how-it-works">
              How filing works
            </Button>
          </div>
        </div>

        {/* Right: fee finder */}
        <div className="rise rise-3 lg:col-span-5">
          <div className="rounded-xl border border-ink bg-surface p-6 shadow-[6px_6px_0_0_#0E1B33] md:p-8">
            <h2 className="font-display text-xl font-semibold tracking-tight">Find your fee</h2>
            <p id="fee-help" className="mt-1 text-sm text-muted">
              Slide to your total income or assets for the year.
            </p>

            <div className="mt-6">
              <input
                type="range"
                min={0}
                max={tiers.length - 1}
                step={1}
                value={tierIndex}
                onChange={(e) => onTierChange(Number(e.target.value))}
                className="fee-range"
                aria-label="Total income or assets"
                aria-describedby="fee-help"
                aria-valuetext={`${tier.label}, fee ${tier.price}`}
              />
              <div className="mt-1 flex justify-between px-[14px]" aria-hidden="true">
                {tiers.map((t, i) => (
                  <span
                    key={t.id}
                    className={`h-2 w-px ${i <= tierIndex ? 'bg-ink' : 'bg-rule'}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-rule pt-5" aria-live="polite">
              <p className="text-sm text-muted">{tier.label}</p>
              <p className="mt-1 font-display text-6xl font-semibold tracking-tight text-brand">
                {tier.price}
              </p>
              <p className="mt-1 text-sm text-muted">Advisory fee, excluding VAT.</p>
            </div>

            <Button
              variant="accent"
              fullWidth
              className="mt-6"
              href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Start on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Proof strip */}
      <dl className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 border-t border-rule pt-8 md:mt-24 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id}>
            <dt className="flex items-center gap-2 text-sm font-medium text-muted">
              <Check className="h-4 w-4 text-leaf-deep" aria-hidden="true" />
              {stat.label}
            </dt>
            <dd className="mt-1">
              <span className="font-display text-3xl font-semibold tracking-tight">{stat.value}</span>
              <span className="mt-1 block text-sm leading-snug text-muted">{stat.description}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Hero;
