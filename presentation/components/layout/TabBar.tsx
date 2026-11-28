import React from 'react';
import { Home as HomeIcon, BadgePercent, Calculator, FileText, MessageCircle } from 'lucide-react';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import { scrollToId } from './Navbar';
import { openChat } from '../widgets/ChatSheet';

// Native-app style bottom navigation for phones and tablets.
const TabBar: React.FC<{ active: string; waText: string }> = ({ active, waText }) => {
  const contact = ContentRepository.getContact();
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'pricing', label: 'Fees', icon: BadgePercent },
    { id: 'calc', label: 'Calculate', icon: Calculator, href: '#/calculator' },
    { id: 'documents', label: 'Papers', icon: FileText },
  ];
  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    // On the calculator page these tabs go back to the landing page and scroll to the section.
    if (window.location.hash.startsWith('#/calculator')) {
      window.location.hash = `#${id}`;
      return;
    }
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else scrollToId(id);
  };
  const idx = tabs.findIndex((t) => t.id === active);
  return (
    <nav aria-label="App" className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] lg:hidden">
      <div className="pointer-events-auto relative mx-auto max-w-md rounded-[28px] border border-rule bg-surface/90 shadow-[0_10px_30px_-8px_rgba(8,18,40,.35)] backdrop-blur-xl">
        {/* sliding highlight behind the active tab */}
        <span
          aria-hidden="true"
          className="absolute inset-y-1.5 left-1.5 w-[calc((100%-12px)/5)] rounded-[22px] bg-brand/15 transition-[transform,opacity] duration-300 ease-[cubic-bezier(.34,1.3,.64,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(${Math.max(idx, 0) * 100}%)`, opacity: idx < 0 ? 0 : 1 }}
        />
        <ul className="relative grid grid-cols-5 items-center px-1.5 py-1.5">
          {tabs.map(({ id, label, icon: Icon, href }) => {
            const on = active === id;
            return (
              <li key={id}>
                <a href={href ?? `#${id}`} onClick={href ? undefined : (e) => go(e, id)} aria-current={on ? 'page' : undefined}
                  className={`tab relative flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-[22px] text-[11px] transition-colors ${on ? 'font-bold text-brand' : 'font-medium text-muted'}`}>
                  <Icon className={`h-[22px] w-[22px] transition-transform duration-300 ${on ? '-translate-y-px scale-110' : ''}`} strokeWidth={on ? 2.4 : 1.8} aria-hidden="true" />
                  {label}
                </a>
              </li>
            );
          })}
          <li>
            <button type="button" onClick={() => openChat(waText)}
              className="tab flex min-h-[52px] w-full flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-ink">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-leaf shadow-[0_3px_0_0_#4a7f12]">
                <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              Chat
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TabBar;
