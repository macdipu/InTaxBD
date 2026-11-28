import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, TrendingDown } from 'lucide-react';
import { Button } from '../ui/Primitives';
import { MaskWords, Odometer, Stamp, Rule, Tick, CountUp } from '../ui/Motion';
import { useInView, usePrefersReducedMotion } from '../../motion/hooks';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import { scrollToId } from '../layout/Navbar';

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
  const reduce = usePrefersReducedMotion();

  // Slip timeline: slide in → fee rolls up from zero → "Ready to file" stamp lands.
  const slipRef = useRef<HTMLDivElement>(null);
  const slipIn = useInView(slipRef, '0px');
  const [rolled, setRolled] = useState(false);
  const [stamped, setStamped] = useState(false);
  useEffect(() => {
    if (!slipIn) return;
    if (reduce) {
      setRolled(true);
      setStamped(true);
      return;
    }
    const a = window.setTimeout(() => setRolled(true), 650);
    const b = window.setTimeout(() => setStamped(true), 1400);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [slipIn, reduce]);

  // While dragging, the stamp lifts; on release it stamps the new fee.
  const [lifted, setLifted] = useState(false);
  const [stampKey, setStampKey] = useState(0);
  const restamp = () => {
    setLifted(false);
    setStampKey((k) => k + 1);
  };
  const onPointerDown = () => {
    if (!stamped) return;
    setLifted(true);
    window.addEventListener('pointerup', restamp, { once: true });
    window.addEventListener('pointercancel', restamp, { once: true });
  };

  const message = `Hello InTaxBD, my total income/assets is ${tier.label}. I would like to file my ${year.assessmentYear} return.`;
  const fill = (tierIndex / (tiers.length - 1)) * 100;

  return (
    <section id="home" className="px-5 pb-14 pt-24 sm:px-8 md:px-10 md:pb-24 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left: the promise */}
        <div className="lg:col-span-7 lg:pt-4" data-reveal>
          <div className="rv-fade inline-flex flex-col gap-0.5 rounded-xl border border-rule bg-surface px-4 py-2.5 text-sm">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <span className="relative h-2 w-2 rounded-full bg-leaf ping" aria-hidden="true" />
              Assessment Year {year.assessmentYear}
            </p>
            <p className="pl-4 text-[13px] text-muted">Income year {year.incomeYear}</p>
          </div>

          <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.02] tracking-tight min-[400px]:text-[46px] sm:text-6xl md:mt-7 lg:text-[76px]">
            <MaskWords text="File your income tax return in 48 hours." delay={80} />
          </h1>

          <p
            className="rv-fade mt-5 max-w-lg text-[17px] leading-relaxed text-muted md:mt-7 md:text-lg"
            style={{ '--d': '420ms' } as React.CSSProperties}
          >
            For individuals, freelancers, NRBs and businesses in Bangladesh. You send the documents. We
            calculate, confirm the figures with you, and submit to the NBR.
          </p>

          <div
            className="rv-fade mt-9 hidden flex-wrap gap-3 lg:flex"
            style={{ '--d': '520ms' } as React.CSSProperties}
          >
            <Button variant="primary" href="#pricing" onClick={(e) => { e.preventDefault(); scrollToId('pricing'); }}>
              See all fees
            </Button>
            <Button variant="outline" href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToId('how-it-works'); }}>
              How filing works
            </Button>
          </div>
        </div>

        {/* Right: the return slip (fee finder) */}
        <div className="lg:col-span-5">
          <div
            id="fee-card"
            ref={slipRef}
            data-reveal
            className={`slip relative rounded-xl border border-ink bg-surface p-5 shadow-[5px_5px_0_0_#0E1B33] sm:p-6 md:p-6 md:shadow-[6px_6px_0_0_#0E1B33] ${
              stamped ? 'thud' : ''
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-xl font-semibold tracking-tight">Find your fee</h2>
              <span className="text-sm font-medium text-muted">AY {year.assessmentYear}</span>
            </div>
            <Rule className="mt-3 text-ink" delay={500} />

            <p id="fee-help" className="mt-4 text-sm text-muted">
              Your total yearly income or assets. Not sure? Pick the closest, we will confirm.
            </p>
            <p className="mt-1 h-8 overflow-hidden font-display text-[22px] font-semibold tracking-tight" aria-hidden="true">
              <span key={tier.id} className="swap-in">
                {tier.label}
              </span>
            </p>

            <div className="mt-3">
              <input
                type="range"
                min={0}
                max={tiers.length - 1}
                step={1}
                value={tierIndex}
                onChange={(e) => onTierChange(Number(e.target.value))}
                onPointerDown={onPointerDown}
                onKeyUp={() => stamped && restamp()}
                className="fee-range"
                style={{ '--fill': `${fill}%` } as React.CSSProperties}
                aria-label="Total income or assets"
                aria-describedby="fee-help"
                aria-valuetext={`${tier.label}, fee ${tier.price}`}
              />
              <div className="flex justify-between px-[15px]" aria-hidden="true">
                {tiers.map((t, i) => (
                  <span
                    key={t.id}
                    className={`h-2 w-px transition-colors duration-200 ${i <= tierIndex ? 'bg-ink' : 'bg-rule'}`}
                    style={{ transitionDelay: `${Math.abs(i - tierIndex) * 25}ms` }}
                  />
                ))}
              </div>
              <div className="mt-1.5 flex justify-between text-xs text-muted" aria-hidden="true">
                <span>Below 4 lacs</span>
                <span>Over 1 crore</span>
              </div>
            </div>

            <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Quick pick">
              {tiers.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => { onTierChange(i); if (stamped) restamp(); }}
                  aria-pressed={i === tierIndex}
                  className={`min-h-[36px] shrink-0 rounded-full border px-3 text-[13px] font-semibold transition-colors ${
                    i === tierIndex ? 'border-ink bg-ink text-white' : 'border-rule text-ink hover:border-ink'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <Rule className="mt-3 text-rule" delay={650} />

            <div className="relative pt-3" aria-live="polite">
              <p className="text-sm text-muted">Advisory fee</p>
              <p className="mt-1 font-display text-[52px] font-semibold leading-none tracking-tight text-brand sm:text-6xl">
                <Odometer value={tier.price} active={rolled} />
              </p>
              <p className="mt-2 text-sm text-muted">Excluding VAT. You see the fee before we start.</p>


              <Stamp
                show={stamped}
                lifted={lifted}
                stampKey={stampKey}
                className="absolute right-0 top-3 sm:right-1"
              >
                Ready to file
              </Stamp>
            </div>

            <Button
              variant="accent"
              fullWidth
              className="mt-4"
              href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Confirm my exact fee on WhatsApp
            </Button>
            <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12.5px] text-muted">
              {['Free to ask', 'No payment now', 'Nothing filed until you approve'].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Tick className="h-3 w-3 text-leaf-deep" delay={0} strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="group mt-4 block w-full rounded-lg border border-leaf/60 bg-leaf/10 p-3.5 text-left transition-colors hover:bg-leaf/20"
            >
              <span className="block text-[15px] font-semibold text-ink">Know someone who uses InTaxBD? Pay less.</span>
              <span className="mt-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
                <span className="rounded-md bg-surface px-2 py-2">
                  <span className="block text-[11px] text-muted">Normal fee</span>
                  <span className="block font-display text-lg font-semibold text-ink/60 line-through decoration-2">{tier.price}</span>
                </span>
                <TrendingDown className="h-5 w-5 text-leaf-deep transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                <span className="rounded-md bg-leaf px-2 py-2">
                  <span className="block text-[11px] text-ink/70">With a reference</span>
                  <span className="block font-display text-lg font-semibold text-ink">Lower fee</span>
                </span>
              </span>
              <span className="mt-2 block text-[13px] leading-snug text-muted">
                Tell us who referred you. We confirm your lower fee before we start. Tap to add.
              </span>
            </button>
          </div>

          {/* Mobile: secondary links sit under the slip */}
          <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
            <Button variant="outline" href="#pricing" onClick={(e) => { e.preventDefault(); scrollToId('pricing'); }} className="!px-3">
              All fees
            </Button>
            <Button variant="outline" href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToId('how-it-works'); }} className="!px-3">
              How it works
            </Button>
          </div>
        </div>
      </div>

      {/* Proof strip */}
      <dl data-reveal className="mx-auto mt-14 max-w-6xl md:mt-24">
        <Rule className="text-rule" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 pt-7 md:grid-cols-4 md:gap-x-8 md:pt-8">
          {stats.map((stat, i) => (
            <div key={stat.id} className="flex flex-col">
              <dt className="order-2 mt-1 text-sm leading-snug text-muted">
                <span className="flex items-start gap-1.5">
                  <Tick className="mt-[3px] h-3.5 w-3.5 shrink-0 text-leaf-deep" delay={300 + i * 90} />
                  {stat.description}
                </span>
              </dt>
              <dd className="order-1 font-display text-[34px] font-semibold leading-none tracking-tight md:text-4xl">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </div>
      </dl>
    </section>
  );
};

export default Hero;
