import React from 'react';
import { ArrowRight, CheckCircle, ShieldCheck, Clock, Users } from 'lucide-react';
import { Button } from '../ui/GlassComponents';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const Hero: React.FC = () => {
  const stats = ContentRepository.getHeroStats();
  const orbitingServices = ContentRepository.getOrbitingServices();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: Content */}
        <div className="space-y-8 animate-fade-in-up pt-10 md:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-brand-secondary/30">
            <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></span>
            <span className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Tax Season 2024-25</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Expert Tax Advisory <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-blue-400">
              Services in Bangladesh
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
            Use this tag line. Simplifying Tax for Individuals & Businesses- expert guidance for Tax, VAT, Company & Compliance
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" onClick={() => document.getElementById('pricing')?.scrollIntoView()}>
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="glass" onClick={() => document.getElementById('services')?.scrollIntoView()}>
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.id}>
                <div className="flex items-baseline gap-2 mb-1">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm font-semibold text-brand-secondary">{stat.label}</p>
                </div>
                <p className="text-xs text-gray-400 leading-snug">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Floating Glass UI */}
        <div className="relative h-[500px] hidden lg:flex items-center justify-center">
          
          {/* Main Floating Dashboard Card */}
          <div className="absolute z-20 w-80 p-6 glass-panel rounded-2xl animate-float flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-success w-8 h-8" />
                <div>
                  <p className="text-sm font-bold text-white">Tax Status</p>
                  <p className="text-xs text-brand-success">Verified Compliant</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-brand-success rounded-full"></div>
            </div>
            
            <div className="space-y-3">
              <div className="h-2 bg-white/10 rounded-full w-full overflow-hidden">
                <div className="h-full bg-brand-secondary w-[85%] rounded-full"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Filing Progress</span>
                <span>85%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
               <div className="p-3 bg-white/5 rounded-lg text-center">
                 <Clock className="w-5 h-5 text-brand-secondary mx-auto mb-1" />
                 <span className="text-xs text-gray-300">Fast 48h</span>
               </div>
               <div className="p-3 bg-white/5 rounded-lg text-center">
                 <Users className="w-5 h-5 text-brand-secondary mx-auto mb-1" />
                 <span className="text-xs text-gray-300">Expert Team</span>
               </div>
            </div>
          </div>

          {/* Orbit System */}
          <div className="orbit-container w-[450px] h-[450px] rounded-full border border-white/5 absolute z-10 flex items-center justify-center">
             {/* Orbit Items */}
             {orbitingServices.map((service, index) => {
               const angle = (index / orbitingServices.length) * 360;
               const radius = 225; // Half of width
               // We position them using standard absolute positioning + transforms in the CSS via inline styles for rotation
               const style = {
                 transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                 position: 'absolute' as 'absolute',
               };
               
               return (
                 <div key={index} style={style} className="orbit-item origin-center">
                   <div className="glass-card px-4 py-2 rounded-full whitespace-nowrap text-xs font-medium text-brand-light border-brand-secondary/30 hover:scale-110 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all cursor-default backdrop-blur-md">
                     {service}
                   </div>
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;