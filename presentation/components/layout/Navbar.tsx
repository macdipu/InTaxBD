import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '../ui/Primitives';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import AnimatedLogo from '../ui/AnimatedLogo';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Documents', href: '#documents' },
  { name: 'FAQ', href: '#faq' },
  { name: 'About', href: '#about' },
];

const HEADER_OFFSET = 88;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const contact = ContentRepository.getContact();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);

      // Scroll spy: the last section whose top has passed the trigger line is active.
      const trigger = window.scrollY + 160;
      let current = '';
      for (const link of navLinks) {
        const section = document.getElementById(link.href.substring(1));
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (trigger >= top && trigger < top + rect.height) current = link.href.substring(1);
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.getElementById(href.substring(1));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsMobileOpen(false);
      setActiveSection(href.substring(1));
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
          isScrolled ? 'border-b border-rule bg-paper/90 backdrop-blur' : 'bg-transparent'
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-10"
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="InTaxBD home"
            className="ilogo-link"
          >
            <AnimatedLogo className="h-11 md:h-14" />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-1 text-[15px] font-medium transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full bg-leaf" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Button variant="primary" href={contact.phoneHref} className="!px-4 !py-2.5">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {contact.phoneDisplay}
            </Button>
          </div>

          <button
            className="-mr-2 p-2 lg:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-paper px-5 pb-10 pt-24 transition-transform duration-300 motion-reduce:transition-none lg:hidden ${
          isMobileOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
        aria-hidden={!isMobileOpen}
        {...(!isMobileOpen ? { inert: true } : {})}
      >
        <div className="flex h-full flex-col">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`border-b border-rule py-4 font-display text-3xl font-semibold tracking-tight ${
                activeSection === link.href.substring(1) ? 'text-brand' : 'text-ink'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="mt-auto">
            <Button variant="primary" fullWidth href={contact.phoneHref}>
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {contact.phoneDisplay}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
