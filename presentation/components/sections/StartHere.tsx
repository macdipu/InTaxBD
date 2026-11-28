import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import { useLang } from '../../i18n/lang';

// Each persona picks a starting fee tier, the services that fit and the document groups to gather.
const PERSONAS = [
  { id: 'salaried', label: 'Salaried', tier: 0, services: ['Individual tax return', 'Tax certificate support', 'Rebate planning'], docs: ['all', 'employees'] },
  { id: 'freelancer', label: 'Freelancer', tier: 1, services: ['Freelancer income tax', 'Tax planning', 'Tax certificate support'], docs: ['all', 'additional'] },
  { id: 'nrb', label: 'NRB (abroad)', tier: 1, services: ['NRB tax return', 'Investment & asset disclosure'], docs: ['all', 'new'] },
  { id: 'business', label: 'Business owner', tier: 2, services: ['Proprietorship / partnership return', 'Financial statements', 'VAT return'], docs: ['all', 'business'] },
  { id: 'company', label: 'Company', tier: 3, services: ['Company return', 'RJSC return', 'Financial statements', 'Internal audit & SOP'], docs: ['all', 'business'] },
] as const;

const StartHere: React.FC<{ onTierChange: (i: number) => void }> = ({ onTierChange }) => {
  const tiers = ContentRepository.getPricing();
  const docs = ContentRepository.getDocuments();
  const contact = ContentRepository.getContact();
  const { t } = useLang();
  const [pick, setPick] = useState<(typeof PERSONAS)[number] | null>(null);

  const choose = (p: (typeof PERSONAS)[number]) => {
    setPick(p);
    onTierChange(p.tier);
  };

  return (
    <Section id="start" className="border-t border-rule">
      <SectionHeading title={t('start.title')} intro={t('start.sub')} />
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {PERSONAS.map((p) => {
          const on = pick?.id === p.id;
          return (
            <button key={p.id} type="button" onClick={() => choose(p)} aria-pressed={on}
              className={`min-h-[72px] rounded-xl border-2 p-3.5 text-left font-display text-lg font-semibold tracking-tight transition-all ${
                on ? 'border-leaf-deep bg-leaf/15' : 'border-rule bg-surface hover:-translate-y-0.5 hover:border-ink/40'
              }`}>
              {p.label}
            </button>
          );
        })}
      </div>

      {pick && (
        <div key={pick.id} className="pop-in mt-5 grid gap-5 rounded-xl border border-ink bg-surface p-5 md:grid-cols-3 md:p-6">
          <div>
            <p className="text-sm text-muted">Fees start at</p>
            <p className="font-display text-4xl font-semibold tracking-tight text-brand">{tiers[pick.tier].price}</p>
            <p className="mt-1 text-[13px] text-muted">for {tiers[pick.tier].label}. Move the slider above to change.</p>
          </div>
          <div>
            <p className="text-sm font-semibold">We will help with</p>
            <ul className="mt-2 space-y-1 text-[15px]">{pick.services.map((s) => <li key={s}>• {s}</li>)}</ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Keep these ready</p>
            <ul className="mt-2 space-y-1 text-[15px]">
              {docs.filter((d) => (pick.docs as readonly string[]).includes(d.id)).map((d) => <li key={d.id}>• <b>{d.category}:</b> {d.items.join(', ')}</li>)}
            </ul>
          </div>
          <div className="md:col-span-3">
            <Button variant="accent" href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(`Hello InTaxBD, I am a ${pick.label.toLowerCase()} and would like to file my return.`)}`}>
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> Start as {pick.label}
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
};

export default StartHere;
