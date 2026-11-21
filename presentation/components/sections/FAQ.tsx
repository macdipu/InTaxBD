import React, { useState } from 'react';
import { Plus, MessageCircle } from 'lucide-react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { Rule } from '../ui/Motion';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const FAQ: React.FC = () => {
  const faqs = ContentRepository.getFaq();
  const contact = ContentRepository.getContact();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <Section id="faq" className="border-t border-rule bg-surface">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading title="Questions people ask" intro="Can't find yours? Ask us directly." />
            <Button variant="outline" href={`https://wa.me/${contact.whatsappNumber}`} className="mt-6 hidden lg:inline-flex">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Ask on WhatsApp
            </Button>
          </div>
        </div>

        <div className="lg:col-span-8" data-reveal>
          <Rule className="text-ink" />
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rv-fade relative border-b border-rule"
                style={{ '--d': `${100 + i * 50}ms` } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-3 left-0 w-[3px] origin-top rounded bg-leaf transition-transform duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                    isOpen ? 'scale-y-100' : 'scale-y-0'
                  }`}
                />
                <h3>
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${faq.id}`}
                    id={`faq-q-${faq.id}`}
                    className={`flex min-h-[60px] w-full items-center justify-between gap-5 py-4 text-left transition-[padding] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none md:py-5 ${
                      isOpen ? 'pl-4' : 'pl-0'
                    }`}
                  >
                    <span
                      className={`font-display text-[19px] font-semibold leading-snug tracking-tight transition-colors md:text-xl ${
                        isOpen ? 'text-brand' : 'text-ink'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] motion-reduce:transition-none ${
                        isOpen ? 'rotate-45 border-brand bg-brand text-white' : 'border-ink/25 text-ink'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-q-${faq.id}`}
                  className={`grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`max-w-2xl pb-6 pl-4 text-[16px] leading-relaxed text-muted transition-[opacity,transform] duration-300 motion-reduce:transition-none md:text-[17px] ${
                        isOpen ? 'translate-y-0 opacity-100 delay-100' : '-translate-y-1 opacity-0'
                      }`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <Button variant="outline" fullWidth href={`https://wa.me/${contact.whatsappNumber}`} className="mt-8 lg:hidden">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Ask on WhatsApp
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
