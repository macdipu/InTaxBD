import React from 'react';
import { Phone, Mail, Globe, MapPin, Send } from 'lucide-react';
import { Section, GlassCard, Button } from '../ui/GlassComponents';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const AboutContact: React.FC = () => {
  const leader = ContentRepository.getLeadership();

  return (
    <Section id="about" className="relative pb-0">
      <div className="grid lg:grid-cols-2 gap-16 mb-20">
        {/* About & Leadership */}
        <div>
           <h2 className="text-3xl font-bold text-white mb-6">About InTaxBD</h2>
           <p className="text-gray-300 mb-6 leading-relaxed">
             InTaxBD is a leading tax consultancy firm specializing in income tax filing and advisory services 
             for individuals and businesses across Bangladesh.
           </p>
           
           <div className="grid grid-cols-2 gap-6 mb-8">
             <div>
               <h4 className="text-brand-secondary font-bold mb-1">Mission</h4>
               <p className="text-xs text-gray-400">To simplify tax compliance and provide expert guidance to every taxpayer in Bangladesh.</p>
             </div>
             <div>
               <h4 className="text-brand-secondary font-bold mb-1">Values</h4>
               <p className="text-xs text-gray-400">Integrity, transparency, confidentiality, excellence.</p>
             </div>
           </div>

           <GlassCard className="flex items-center gap-4 border-l-4 border-l-brand-secondary">
              <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                 {/* Placeholder for Leader Image */}
                 <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-xs text-gray-400">IMG</div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{leader.name}</h3>
                <p className="text-brand-secondary text-sm font-medium">{leader.role}</p>
                <div className="text-xs text-gray-400 mt-1">
                  {leader.qualifications.map((q, i) => (
                    <span key={i} className="block">{q}</span>
                  ))}
                </div>
              </div>
           </GlassCard>
        </div>

        {/* Contact Form & Details */}
        <div id="contact">
          <GlassCard className="h-full">
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            
            <form className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="glass-input w-full p-3 rounded-lg text-sm" />
                <input type="text" placeholder="Phone" className="glass-input w-full p-3 rounded-lg text-sm" />
              </div>
              <input type="email" placeholder="Email" className="glass-input w-full p-3 rounded-lg text-sm" />
              <textarea placeholder="Message" rows={4} className="glass-input w-full p-3 rounded-lg text-sm resize-none"></textarea>
              <Button variant="primary" fullWidth>
                Send Message <Send className="w-4 h-4" />
              </Button>
            </form>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <a href="tel:01717170575" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                  <Phone className="w-4 h-4" />
                </div>
                <span>01717170575 (Phone & WhatsApp)</span>
              </a>
              <a href="mailto:intaxbd.ca@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                  <Mail className="w-4 h-4" />
                </div>
                <span>intaxbd.ca@gmail.com</span>
              </a>
              <a href="https://www.intaxbd.online" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                  <Globe className="w-4 h-4" />
                </div>
                <span>www.intaxbd.online</span>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} InTaxBD. All rights reserved.</p>
        <p className="mt-2 text-xs">Certified Tax Professionals | Dhaka, Bangladesh</p>
      </div>

      {/* Sticky Mobile Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-brand-dark/90 backdrop-blur-lg border-t border-white/10 lg:hidden z-50 flex gap-4">
        <Button variant="secondary" fullWidth onClick={() => window.location.href='tel:01717170575'}>
          <Phone className="w-4 h-4" /> Call
        </Button>
        <Button variant="primary" fullWidth onClick={() => window.location.href='https://wa.me/8801717170575'}>
           WhatsApp
        </Button>
      </div>
    </Section>
  );
};

export default AboutContact;