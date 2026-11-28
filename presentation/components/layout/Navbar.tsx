import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Primitives';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import AnimatedLogo from '../ui/AnimatedLogo';
import ThemeToggle from '../ui/ThemeToggle';
import { LangToggle, useLang } from '../../i18n/lang';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Tax calculator', href: '#/calculator' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Documents', href: '#documents' },
  { name: 'FAQ', href: '#faq' },
  { name: 'About', href: '#about' },
];

export const scrollToId = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  const header = document.querySelector('header')?.getBoundingClientRect().height ?? 72;
  const top = target.getBoundingClientRect().top + window.scrollY - header - 8;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const contact = ContentRepository.getContact();
  const year = ContentRepository.getTaxYear();
  const { t } = useLang();

  const progressRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [underline, setUnderline] = useState({ x: 0, w: 0, show: false });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setIsScrolled(y > 12);

      // Filing progress: how far down the page the visitor is.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

      // Scroll spy
      const trigger = y + window.innerHeight * 0.35;
      let current = '';
      for (const link of navLinks) {
        const section = document.getElementById(link.href.substring(1));
        if (!section) continue;
        const top = section.getBoundingClientRect().top + y;
        if (trigger >= top && trigger < top + section.offsetHeight) current = link.href.substring(1);
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // One underline that slides to the active link.
  useLayoutEffect(() => {
    const measure = () => {
      const el = linksRef.current?.querySelector<HTMLElement>(`[data-id="${activeSection}"]`);
      if (!el) return setUnderline((u) => ({ ...u, show: false }));
      setUnderline({ x: el.offsetLeft, w: el.offsetWidth, show: true });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeSection]);

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
    setIsMobileOpen(false);
    // Off the landing page (e.g. on the calculator) the section does not exist: go to it via the hash.
    if (href.startsWith('#/') || !document.getElementById(href.substring(1))) {
      window.location.hash = href;
      return;
    }
    setActiveSection(href.substring(1));
    // Let the body unlock before scrolling when the mobile sheet was open.
    requestAnimationFrame(() => scrollToId(href.substring(1)));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          isScrolled || isMobileOpen
            ? 'border-b border-rule bg-paper/90 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 transition-[padding] duration-300 sm:px-8 md:px-10 ${
            isScrolled ? 'py-2.5 md:py-3' : 'py-3.5 md:py-5'
          }`}
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="InTaxBD home"
            className="ilogo-link -m-1 shrink-0 rounded p-1"
          >
            <AnimatedLogo
              className={`transition-[height] duration-300 ${isScrolled ? 'h-9 md:h-11' : 'h-10 md:h-14'}`}
            />
          </a>

          <div ref={linksRef} className="relative hidden flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-7">
            {navLinks.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.name}
                  data-id={id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`whitespace-nowrap text-[15px] transition-colors ${
                    link.href === '#/calculator'
                      ? 'relative rounded-full bg-leaf px-3.5 py-1.5 font-semibold text-ink shadow-[0_3px_0_0_#4a7f12] hover:bg-[#8cc93f] active:translate-y-[2px] active:shadow-[0_1px_0_0_#4a7f12]'
                      : `py-1.5 font-medium ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
                  }`}
                >
                  {t('nav.' + link.name, link.name)}
                </a>
              );
            })}
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-[3px] rounded-full bg-leaf transition-[transform,width,opacity] duration-[400ms] ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
              style={{
                width: underline.w,
                transform: `translateX(${underline.x}px)`,
                opacity: underline.show ? 1 : 0,
              }}
            />
          </div>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <LangToggle />
            <ThemeToggle />
            <Button variant="primary" href={contact.phoneHref} className="!min-h-0 !px-4 !py-2.5">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call<span className="hidden 2xl:inline"> {contact.phoneDisplay}</span>
            </Button>
          </div>

          {/* Burger morphs into a close mark */}
          <div className="-mr-2 flex items-center gap-1 xl:hidden">
            <LangToggle className="!h-10" />
            <ThemeToggle className="!h-10 !w-10" />
          <button
            className="grid h-11 w-11 place-items-center"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-4 w-6" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute left-0 h-[2px] w-full rounded bg-ink transition-[transform,opacity] duration-300 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
                  style={{
                    top: `${i * 7}px`,
                    transform: isMobileOpen
                      ? i === 0
                        ? 'translateY(7px) rotate(45deg)'
                        : i === 2
                          ? 'translateY(-7px) rotate(-45deg)'
                          : 'scaleX(0)'
                      : 'none',
                    opacity: isMobileOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </span>
          </button>
          </div>
        </nav>

        {/* Filing progress: page scroll position */}
        <span
          ref={progressRef}
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-leaf"
          style={{ transform: 'scaleX(0)' }}
        />
      </header>

      {/* Mobile menu: a sheet that unrolls from the top */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-paper px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-24 transition-[clip-path] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none sm:px-8 xl:hidden ${
          isMobileOpen ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!isMobileOpen}
        {...(!isMobileOpen ? { inert: true } : {})}
      >
        <p className="text-sm font-medium text-muted">{`Filing for Assessment Year ${year.assessmentYear}`}</p>
        <nav aria-label="Mobile" className="mt-3 flex flex-col">
          {navLinks.map((link, i) => {
            const active = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center justify-between border-b border-rule py-3.5 font-display text-[28px] font-semibold tracking-tight transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                  active ? 'text-brand' : 'text-ink'
                } ${link.href === '#/calculator' ? 'rounded-xl bg-leaf/20 px-3' : ''} ${isMobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`}
                style={{ transitionDelay: isMobileOpen ? `${120 + i * 45}ms` : '0ms' }}
              >
                {t('nav.' + link.name, link.name)}
                {active && <span className="h-2.5 w-2.5 rounded-full bg-leaf" aria-hidden="true" />}
              </a>
            );
          })}
        </nav>
        <div
          className={`mt-auto grid grid-cols-2 gap-3 pt-6 transition-opacity delay-300 duration-500 ${
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button variant="outline" fullWidth href={contact.phoneHref}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call
          </Button>
          <Button variant="accent" fullWidth href={`https://wa.me/${contact.whatsappNumber}`}>
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
