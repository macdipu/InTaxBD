import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Pricing from '../components/sections/Pricing';
import Process from '../components/sections/Process';
import Documents from '../components/sections/Documents';
import FAQ from '../components/sections/FAQ';
import AboutContact from '../components/sections/AboutContact';

const Home: React.FC = () => {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Process />
        <Documents />
        <FAQ />
        <AboutContact />
      </main>
    </div>
  );
};

export default Home;