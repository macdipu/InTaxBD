import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Pricing from '../components/sections/Pricing';
import Process from '../components/sections/Process';
import Documents from '../components/sections/Documents';
import FAQ from '../components/sections/FAQ';
import AboutContact from '../components/sections/AboutContact';
import { Button } from '../components/ui/Primitives';
import { ContentRepository } from '../../data/repositories/contentRepository';
import { useRevealObserver, useVisible, useBootReady } from '../motion/hooks';

const Home: React.FC = () => {
  // The hero fee finder, services and the pricing table share one selected tier.
  const [tierIndex, setTierIndex] = useState(1);
  const contact = ContentRepository.getContact();
  useRevealObserver();

  // Mobile action bar: hidden while the hero slip (which has its own WhatsApp button)
  // or the contact form is on screen.
  const ready = useBootReady();
  const feeCardVisible = useVisible('fee-card');
  const contactVisible = useVisible('contact');
  const showBar = ready && !feeCardVisible && !contactVisible;

  // One soft pulse on the WhatsApp button the first time the bar appears.
  const [pulsed, setPulsed] = useState(false);
  useEffect(() => {
    if (showBar && !pulsed) {
      const t = window.setTimeout(() => setPulsed(true), 6000);
      return () => window.clearTimeout(t);
    }
  }, [showBar, pulsed]);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero tierIndex={tierIndex} onTierChange={setTierIndex} />
        <Services onTierChange={setTierIndex} />
        <Pricing tierIndex={tierIndex} onTierChange={setTierIndex} />
        <Process />
        <Documents />
        <FAQ />
        <AboutContact />
      </main>

      {/* Sticky mobile actions */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-rule bg-paper/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none lg:hidden ${
          showBar ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!showBar}
        {...(!showBar ? { inert: true } : {})}
      >
        <Button variant="outline" fullWidth href={contact.phoneHref}>
          <Phone className="h-4 w-4" aria-hidden="true" /> Call
        </Button>
        <Button
          variant="accent"
          fullWidth
          href={`https://wa.me/${contact.whatsappNumber}`}
          className={pulsed ? 'ring-pulse' : ''}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default Home;
