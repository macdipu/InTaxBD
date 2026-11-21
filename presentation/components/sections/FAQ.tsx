import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Primitives';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const FAQ: React.FC = () => {
  const faqs = ContentRepository.getFaq();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="faq" className="border-t border-rule bg-surface">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading title="Questions people ask" intro="Can't find yours? Message us on WhatsApp." />
        </div>

        <div className="lg:col-span-8">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="border-b border-rule first:border-t first:border-t-ink">
                <h3>
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${faq.id}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-xl font-semibold leading-snug tracking-tight">
                      {faq.question}
                    </span>
                    <Plus
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-${faq.id}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-[17px] leading-relaxed text-muted">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
