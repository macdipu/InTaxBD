import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Section, SectionTitle, GlassCard, Button } from '../ui/GlassComponents';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const Documents: React.FC = () => {
  const docs = ContentRepository.getDocuments();

  return (
    <Section id="documents" className="bg-gradient-to-b from-brand-primary to-brand-dark">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
         <div>
           <SectionTitle title="Documents Required" />
           <div className="glass-panel inline-block px-4 py-2 rounded-lg border-brand-secondary/30">
             <span className="text-gray-400 text-sm mr-2">Income Period:</span>
             <span className="text-white font-mono">1 July 2024 – 30 June 2025</span>
           </div>
         </div>
         <Button variant="outline" className="mt-4 md:mt-0">
           <Download className="w-4 h-4" />
           Download Checklist (PDF)
         </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc) => (
          <GlassCard key={doc.id} className="hover:border-brand-secondary/30">
            <h4 className="text-lg font-bold text-brand-secondary mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {doc.category}
            </h4>
            <ul className="space-y-2">
              {doc.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
};

export default Documents;