import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Section, SectionTitle } from '../ui/GlassComponents';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const FAQ: React.FC = () => {
  const faqs = ContentRepository.getFaq();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <Section id="faq">
      <SectionTitle title="Frequently Asked Questions" center />
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id} 
              className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-brand-secondary/50 bg-white/5' : ''}`}
            >
              <button 
                onClick={() => toggle(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`font-medium ${isOpen ? 'text-brand-secondary' : 'text-white'}`}>
                  {faq.question}
                </span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-brand-secondary" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </button>
              
              <div 
                className={`px-6 text-gray-300 text-sm transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-48 py-4 opacity-100 border-t border-white/5' : 'max-h-0 py-0 opacity-0'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default FAQ;