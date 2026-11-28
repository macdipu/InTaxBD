import React, { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { openChat } from './ChatSheet';

// Greets the visitor 20 seconds after arriving. Closing it hides it for 6 hours (remembered in the browser).
const COOLDOWN_MS = 6 * 60 * 60 * 1000;
const KEY = 'intaxbd-bubble-closed';
let dismissed = false; // also covers browsers where storage is blocked
const coolingDown = () => {
  if (dismissed) return true;
  try {
    const t = Number(localStorage.getItem(KEY));
    return t > 0 && Date.now() - t < COOLDOWN_MS;
  } catch {
    return false;
  }
};
interface Props { waText: string; hide: boolean; title?: string; body?: string }
const ChatBubble: React.FC<Props> = ({ waText, hide, title = 'Need help finding your fee?', body = 'Message us on WhatsApp. A real person replies.' }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (coolingDown()) return;
    const id = window.setTimeout(() => setShow(true), 20000);
    return () => window.clearTimeout(id);
  }, []);
  const close = () => {
    setShow(false);
    dismissed = true;
    try { localStorage.setItem(KEY, String(Date.now())); } catch { /* ignore */ }
  };
  const open = show && !hide;
  const state = open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0';
  return (
    <>
      {/* Desktop only. Phones already have the Chat button in the bottom bar. */}
      <div className={`fixed bottom-24 right-6 z-30 hidden max-w-[290px] transition-all duration-500 motion-reduce:transition-none lg:block ${state}`}
        aria-hidden={!open} {...(!open ? { inert: true } : {})}>
        <div className="relative rounded-2xl rounded-br-sm border border-rule bg-surface p-4 pr-9 shadow-lg">
          <button type="button" onClick={close} aria-label="Close" className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-ink/10">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="text-[15px] font-semibold text-ink">{title}</p>
          <p className="mt-0.5 text-[13px] text-muted">{body}</p>
          <button type="button" onClick={() => { close(); openChat(waText); }} className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-leaf px-4 text-[15px] font-semibold text-ink shadow-[0_3px_0_0_#4a7f12] active:translate-y-[2px] active:shadow-[0_1px_0_0_#4a7f12]">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat now
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBubble;
