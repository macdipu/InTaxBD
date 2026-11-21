import React from 'react';
import { Check } from 'lucide-react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const Services: React.FC = () => {
  const services = ContentRepository.getServices();
  const additional = ContentRepository.getAdditionalServices();

  return (
    <Section id="services" className="border-t border-rule bg-surface">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            title="Who we file for"
            intro="Pick the line that matches you. Fees start at 1,500 Tk and depend on your income or assets."
          />
          <p className="mt-6 max-w-md text-[15px] text-muted">
            We also handle {additional.join(' and ')}.
          </p>
          <Button variant="primary" href="#contact" className="mt-8">
            Get a free consultation
          </Button>
        </div>

        <div className="lg:col-span-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="grid gap-4 border-t border-ink py-8 md:grid-cols-12 md:gap-8"
            >
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight md:col-span-5">
                {service.title}
              </h3>
              <ul className="space-y-3 md:col-span-7">
                {service.description.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[17px] text-ink">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-leaf-deep" strokeWidth={3} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Services;
