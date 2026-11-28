import { useLang } from '../../i18n/lang';
import React, { useEffect, useRef, useState } from 'react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { Stamp, Tick, PenMark } from '../ui/Motion';
import { useBootReady } from '../../motion/hooks';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import { scrollToId } from '../layout/Navbar';
import ReturnTracker from '../widgets/ReturnTracker';

const Process: React.FC = () => {
  const { lang } = useLang();
  const steps = ContentRepository.getProcessSteps();
  const listRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(0); // how many steps the rail has passed
  const [railBottom, setRailBottom] = useState(24);
  const ready = useBootReady();

  // The green rail fills with scroll; each step it passes is ticked off.
  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const items = Array.from(list.children) as HTMLElement[];
      const last = items[items.length - 1];
      const bottom = list.offsetHeight - (last.offsetTop + 20);
      setRailBottom(bottom);

      // Rail runs from the first marker centre (20px) to the last one.
      const line = window.innerHeight * 0.62; // the "reading line"
      const span = rect.height - bottom - 20;
      const progress = Math.min(1, Math.max(0, (line - rect.top - 20) / span));
      if (railRef.current) railRef.current.style.transform = `scaleY(${progress})`;

      let count = 0;
      for (const li of items) if (rect.top + li.offsetTop + 20 <= line) count++;
      setReached(count);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ready]);

  return (
    <Section id="how-it-works" className="border-t border-rule bg-surface">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              title="Six steps from first message to filed return"
              intro={
                lang === 'bn' ? (
                  <>
                    আপনাকে লাগবে শুধু <PenMark delay={500}>শুরুতে</PenMark> আর <PenMark delay={800}>অনুমোদনের সময়</PenMark>। বাকি সব আমরা সামলাই।
                  </>
                ) : (
                  <>
                    You are only needed at <PenMark delay={500}>the start</PenMark> and at{' '}
                    <PenMark delay={800}>confirmation</PenMark>. We handle the rest.
                  </>
                )
              }
            />
            <ReturnTracker steps={steps} reached={reached} />
            <Button
              variant="primary"
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}
              className="mt-8 hidden lg:inline-flex"
            >
              Book a free consultation
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div ref={wrapRef} className="relative">
          {/* rail track + fill, from the first marker's centre to the last */}
          <span className="absolute left-[19px] top-5 w-[2px] bg-rule" style={{ bottom: railBottom }} aria-hidden="true" />
          <span
            ref={railRef}
            className="absolute left-[19px] top-5 w-[2px] origin-top bg-leaf"
            style={{ transform: 'scaleY(0)', bottom: railBottom }}
            aria-hidden="true"
          />

          <ol ref={listRef} className="relative">
            {steps.map((step, i) => {
              const done = i < reached;
              return (
                <li key={step.id} className="relative flex gap-5 pb-9 last:pb-0 md:gap-6 md:pb-11">
                  <span
                    className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-display text-base font-semibold transition-[background-color,border-color,color,transform] duration-300 motion-reduce:transition-none ${
                      done ? 'scale-105 border-ink bg-ink text-white' : 'border-ink/40 bg-paper text-ink'
                    }`}
                    aria-hidden="true"
                  >
                    <span className={`absolute transition-opacity duration-200 ${done ? 'opacity-0' : 'opacity-100'}`}>{i + 1}</span>
                    <Tick mode="toggle" on={done} className="h-5 w-5 text-leaf" strokeWidth={2.8} />
                  </span>
                  <div className="min-w-0 pt-1.5">
                    <h3
                      className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 md:text-[22px] ${
                        done ? 'text-ink' : 'text-ink/55'
                      }`}
                    >
                      <span className="sr-only">{`Step ${i + 1}:`} </span>
                      {step.title}
                    </h3>
                    <p className="mt-1 max-w-md text-[16px] leading-relaxed text-muted">{step.description}</p>

                    {i === 3 && (
                      <div className="mt-3 h-8">
                        {done && (
                          <span className="pop-in inline-flex items-center gap-1.5 rounded-full bg-leaf/20 px-3 py-1 text-sm font-semibold text-leaf-deep">
                            You approve here
                          </span>
                        )}
                      </div>
                    )}
                    {i === 4 && (
                      <div className="mt-3 h-9">
                        <Stamp show={done}>Submitted to NBR</Stamp>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
          </div>

          <Button
            variant="primary"
            fullWidth
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}
            className="mt-10 lg:hidden"
          >
            Book a free consultation
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Process;
