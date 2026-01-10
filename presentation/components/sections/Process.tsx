import React from 'react';
import { Section, SectionTitle, Button } from '../ui/GlassComponents';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const Process: React.FC = () => {
  const steps = ContentRepository.getProcessSteps();

  return (
    <Section id="how-it-works">
      <SectionTitle title="How It Works" center />
      
      <div className="relative">
        {/* Connector Line (Desktop) */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden md:block" />
        
        <div className="grid md:grid-cols-6 gap-6 relative z-10">
          {steps.map((step) => (
            <div key={step.id} className="group relative">
               {/* Step Card */}
               <div className="glass-panel p-6 rounded-2xl h-full flex flex-col items-center text-center transition-transform group-hover:-translate-y-2 border-brand-secondary/10 group-hover:border-brand-secondary/40">
                 <div className="w-10 h-10 rounded-full bg-brand-secondary/20 text-brand-secondary flex items-center justify-center font-bold text-sm mb-4 border border-brand-secondary/30">
                   {step.stepNumber}
                 </div>
                 <h4 className="font-bold text-white text-sm mb-2 leading-tight">{step.title}</h4>
                 <p className="text-xs text-gray-400">{step.description}</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <Button variant="primary" className="mx-auto">
          Book Free Consultation
        </Button>
      </div>
    </Section>
  );
};

export default Process;