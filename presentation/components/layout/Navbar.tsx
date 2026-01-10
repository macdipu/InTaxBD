import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '../ui/GlassComponents';
import logo from '@/assets/jpg/logo.jpg';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Documents', href: '#documents' },
  { name: 'FAQ', href: '#faq' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy Logic
      // We look for the section that is currently active in the viewport.
      // We use a specific offset (e.g., 150px from top) to trigger the switch 
      // when the user scrolls into the section.
      const scrollPosition = window.scrollY + 150; 

      // We iterate through all links. If multiple sections match (e.g. nested sections),
      // the last one in the list that matches will become active.
      // This is desirable for the 'Contact' section which sits inside 'About'.
      let currentSection = 'home';
      
      for (const link of navLinks) {
        const sectionId = link.href.substring(1);
        const section = document.getElementById(sectionId);
        
        if (section) {
          // getBoundingClientRect().top is relative to the viewport.
          // We add window.scrollY to get the absolute document position.
          // This handles nested elements (like #contact inside #about) correctly,
          // whereas offsetTop can be relative to a positioned parent.
          const rect = section.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const offsetHeight = rect.height;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
             currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check to set active state on load
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Calculate position with offset for fixed header
      // 100px provides enough breathing room for the title to not be hidden by the navbar
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileOpen(false);
      // Manually set active section immediately for better UX
      setActiveSection(targetId);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-panel border-b border-white/10 py-3 shadow-lg' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
             <img src={logo} alt="InTaxBD" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
               const isActive = activeSection === link.href.substring(1);
               return (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-all duration-300 relative cursor-pointer ${
                    isActive ? 'text-brand-secondary scale-105' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-secondary rounded-full shadow-[0_0_10px_#0ea5e9]"></span>
                  )}
                </a>
               );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="primary" className="!px-4 !py-2 text-sm" onClick={() => window.location.href='tel:01717170575'}>
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        isMobileOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full justify-center items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-2xl font-light transition-colors cursor-pointer ${
                activeSection === link.href.substring(1) ? 'text-brand-secondary font-medium' : 'text-white hover:text-brand-secondary'
              }`}
            >
              {link.name}
            </a>
          ))}
          <Button variant="primary" className="mt-4" onClick={() => window.location.href = 'tel:01717170575'}>
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;