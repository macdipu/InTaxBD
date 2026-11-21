import React from 'react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const Process: React.FC = () => {
  const steps = ContentRepository.getProcessSteps();

  return (
    <Section id="how-it-works" className="border-t border-rule bg-surface">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              title="Six steps from first message to filed return"
              intro="You are only needed at the start and at confirmation. We handle the rest."
            />
            <Button variant="primary" href="#contact" className="mt-8">
              Book a free consultation
            </Button>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {steps.map((step, i) => (
            <li key={step.id} className="relative flex gap-6 pb-10 last:pb-0">
              {i < steps.length - 1 && (
                <span className="absolute left-[19px] top-11 h-[calc(100%-2.75rem)] w-px bg-rule" aria-hidden="true" />
              )}
              <span
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink bg-paper font-display text-base font-semibold"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-1 text-[16px] text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
};

export default Process;
