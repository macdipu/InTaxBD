import React from 'react';
import { User, Building, Briefcase, Check } from 'lucide-react';
import { Section, SectionTitle, GlassCard, Button } from '../ui/GlassComponents';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const iconMap: Record<string, React.ReactNode> = {
  User: <User className="w-8 h-8 text-brand-secondary" />,
  Building: <Building className="w-8 h-8 text-brand-secondary" />,
  Briefcase: <Briefcase className="w-8 h-8 text-brand-secondary" />,
};

const Services: React.FC = () => {
  const services = ContentRepository.getServices();

  return (
    <Section id="services" className="bg-brand-primary/30">
      <SectionTitle title="Our Tax Services" center />
      
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <GlassCard key={service.id} className="flex flex-col h-full hover:border-brand-secondary/50">
            <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mb-6 border border-brand-secondary/20">
              {iconMap[service.iconName]}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
            
            <ul className="space-y-3 flex-grow mb-8">
              {service.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                  <Check className="w-4 h-4 text-brand-success mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto">
               <span className="text-xs text-brand-secondary/80 font-medium block mb-2">Starting from 1,500 Tk</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="primary" className="mx-auto">
          Get Free Consultation
        </Button>
      </div>
    </Section>
  );
};

export default Services;