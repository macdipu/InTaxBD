import React, { useState } from 'react';
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

const Home: React.FC = () => {
  // The hero fee finder and the pricing table share one selected tier.
  const [tierIndex, setTierIndex] = useState(1);
  const contact = ContentRepository.getContact();

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero tierIndex={tierIndex} onTierChange={setTierIndex} />
        <Services />
        <Pricing tierIndex={tierIndex} onTierChange={setTierIndex} />
        <Process />
        <Documents />
        <FAQ />
        <AboutContact />
      </main>

      {/* Sticky mobile actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-rule bg-paper/95 p-3 backdrop-blur lg:hidden">
        <Button variant="outline" fullWidth href={contact.phoneHref}>
          <Phone className="h-4 w-4" aria-hidden="true" /> Call
        </Button>
        <Button variant="primary" fullWidth href={`https://wa.me/${contact.whatsappNumber}`}>
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default Home;
