import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import StartHere from '../components/sections/StartHere';
import ChatBubble from '../components/widgets/ChatBubble';
import Services from '../components/sections/Services';
import Pricing from '../components/sections/Pricing';
import Process from '../components/sections/Process';
import Documents from '../components/sections/Documents';
import FAQ from '../components/sections/FAQ';
import AboutContact from '../components/sections/AboutContact';
import { Section } from '../components/ui/Primitives';
import TabBar from '../components/layout/TabBar';
import NbrNews from '../components/widgets/NbrNews';
import { ContentRepository } from '../../data/repositories/contentRepository';
import { useLang } from '../i18n/lang';
import { useRevealObserver, useVisible } from '../motion/hooks';

const Home: React.FC = () => {
  // The hero fee finder, services and the pricing table share one selected tier.
  const [tierIndex, setTierIndex] = useState(0);
  const contact = ContentRepository.getContact();
  const tiers = ContentRepository.getPricing();
  const { t } = useLang();
  useRevealObserver();

  // Mobile action bar: hidden while the hero slip (which has its own WhatsApp button)
  // or the contact form is on screen.
  const contactVisible = useVisible('contact');
  const pricingVisible = useVisible('pricing');
  const docsVisible = useVisible('documents');
  const active = contactVisible ? 'contact' : docsVisible ? 'documents' : pricingVisible ? 'pricing' : 'home';

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero tierIndex={tierIndex} onTierChange={setTierIndex} />
        <StartHere onTierChange={setTierIndex} />
        <Services onTierChange={setTierIndex} />
        <Pricing tierIndex={tierIndex} onTierChange={setTierIndex} />
        <Process />
        <Documents />
        <Section id="nbr-news-section" className="border-t border-rule empty:hidden"><NbrNews /></Section>
        <FAQ />
        <AboutContact />
      </main>

      <ChatBubble hide={contactVisible} waText={`Hello InTaxBD, I need help finding my fee. My income/assets is around ${tiers[tierIndex].label}.`} />

      <TabBar active={active} waText={`Hello InTaxBD, my total income/assets is ${tiers[tierIndex].label}. Please confirm my exact fee.`} />
    </div>
  );
};

export default Home;
