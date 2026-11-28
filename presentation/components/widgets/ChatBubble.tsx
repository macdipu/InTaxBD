import React, { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { ContentRepository } from '../../../data/repositories/contentRepository';

// Greets the visitor once per session after 20 seconds. Hidden while the contact form is on screen.
interface Props { waText: string; hide: boolean; title?: string; body?: string }
const ChatBubble: React.FC<Props> = ({ waText, hide, title = 'Need help finding your fee?', body = 'Message us on WhatsApp. A real person replies.' }) => {
  const contact = ContentRepository.getContact();
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (sessionStorage.getItem('intaxbd-bubble')) return; } catch { /* ignore */ }
    const id = window.setTimeout(() => setShow(true), 20000);
    return () => window.clearTimeout(id);
  }, []);
  const close = () => {
    setShow(false);
    try { sessionStorage.setItem('intaxbd-bubble', '1'); } catch { /* ignore */ }
  };
  const open = show && !hide;
  return (
    <div className={`fixed bottom-[88px] right-4 z-30 max-w-[290px] transition-all duration-500 motion-reduce:transition-none lg:bottom-6 lg:right-6 ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      aria-hidden={!open} {...(!open ? { inert: true } : {})}>
      <div className="relative rounded-2xl rounded-br-sm border border-rule bg-surface p-4 pr-9 shadow-lg">
        <button type="button" onClick={close} aria-label="Close" className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-ink/10">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="text-[15px] font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-[13px] text-muted">{body}</p>
        <a href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(waText)}`}
          onClick={close} className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-leaf px-4 text-[15px] font-semibold text-ink">
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat now
        </a>
      </div>
    </div>
  );
};

export default ChatBubble;
