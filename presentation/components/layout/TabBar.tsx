import React from 'react';
import { Home as HomeIcon, BadgePercent, Calculator, FileText, MessageCircle } from 'lucide-react';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import { scrollToId } from './Navbar';

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
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else scrollToId(id);
  };
  return (
    <nav aria-label="App" className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-5 items-end px-1 pt-1.5">
        {tabs.map(({ id, label, icon: Icon, href }) => {
          const on = active === id;
          return (
            <li key={id}>
              <a href={href ?? `#${id}`} onClick={href ? undefined : (e) => go(e, id)} aria-current={on ? 'page' : undefined}
                className={`tab flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-lg text-[11px] font-semibold transition-colors ${on ? 'text-brand' : 'text-muted'}`}>
                <span className={`grid h-7 w-12 place-items-center rounded-full transition-colors ${on ? 'bg-brand/15' : ''}`}>
                  <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                </span>
                {label}
              </a>
            </li>
          );
        })}
        <li>
          <a href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener"
            className="tab flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-ink">
            <span className="grid h-9 w-9 -translate-y-1 place-items-center rounded-full bg-leaf shadow-md">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="-mt-1">Chat</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default TabBar;
