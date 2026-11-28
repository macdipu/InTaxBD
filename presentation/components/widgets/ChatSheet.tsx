import React, { useEffect, useRef, useState } from 'react';
import { Send, X, CheckCheck, MessageCircle } from 'lucide-react';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import AnimatedLogo from '../ui/AnimatedLogo';

// Opens the chat from anywhere: openChat('optional draft text')
export const openChat = (draft?: string) => window.dispatchEvent(new CustomEvent('intaxbd:chat', { detail: { draft } }));

interface Msg { id: number; from: 'us' | 'you'; text: string; link?: string }

const QUICK = [
  'How much will my tax return cost?',
  'Which documents do I need?',
  'I am a freelancer with foreign income.',
  'Can you file before the deadline?',
];

// A WhatsApp-style chat. Sending opens WhatsApp with the message ready, where the team replies.
const ChatSheet: React.FC = () => {
  const contact = ContentRepository.getContact();
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const nid = () => ++idRef.current;

  const greet = () => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => (m.length ? m : [{ id: nid(), from: 'us', text: 'Assalamu alaikum! Welcome to InTaxBD. How can we help with your income tax return?' }]));
    }, 900);
  };

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<{ draft?: string }>).detail?.draft;
      if (d) setDraft(d);
      setOpen(true);
    };
    window.addEventListener('intaxbd:chat', onOpen);
    return () => window.removeEventListener('intaxbd:chat', onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (msgs.length === 0) greet();
    const t = window.setTimeout(() => inputRef.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    if (window.matchMedia('(max-width: 1023px)').matches) document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [msgs, typing]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const link = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(/^hello intaxbd/i.test(text) ? text : `Hello InTaxBD, ${text}`)}`;
    const win = window.open(link, '_blank', 'noopener');
    setMsgs((m) => [...m, { id: nid(), from: 'you', text }]);
    setDraft('');
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, {
        id: nid(), from: 'us',
        text: win ? 'Thanks! We opened WhatsApp with your message. Press send there and a team member will reply.' : 'Thanks! Tap below to open WhatsApp with your message. A team member will reply there.',
        link: win ? undefined : link,
      }]);
    }, 800);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Desktop launcher (phones use the Chat tab in the bottom bar) */}
      <button type="button" onClick={() => setOpen(true)} aria-label="Open chat"
        className={`fixed bottom-6 right-6 z-[55] hidden h-14 w-14 place-items-center rounded-full bg-leaf text-ink shadow-[0_5px_0_0_#4a7f12] transition-all active:translate-y-[3px] active:shadow-[0_2px_0_0_#4a7f12] lg:grid ${open ? 'pointer-events-none scale-75 opacity-0' : 'scale-100 opacity-100'}`}>
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className={`fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <section
        role="dialog" aria-label="Chat with InTaxBD" aria-hidden={!open} {...(!open ? { inert: true } : {})}
        className={`fixed inset-x-0 bottom-0 z-[70] flex h-[78dvh] max-h-[640px] flex-col overflow-hidden rounded-t-3xl border border-rule bg-paper shadow-2xl transition-transform duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none lg:inset-x-auto lg:bottom-6 lg:right-6 lg:h-[560px] lg:w-[380px] lg:rounded-2xl ${open ? 'translate-y-0' : 'translate-y-[110%]'}`}
      >
        {/* header */}
        <header className="flex items-center gap-3 bg-ink px-4 py-3 text-[rgb(var(--c-on-ink))]">
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1.5">
            <AnimatedLogo className="h-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[17px] font-semibold leading-tight">InTaxBD</p>
            <p className="flex items-center gap-1.5 text-[12px] opacity-80"><span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />Tax experts on WhatsApp</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        {/* messages */}
        <div className="flex-1 space-y-2 overflow-y-auto bg-[radial-gradient(circle,rgb(var(--c-rule)/.6)_1px,transparent_1.2px)] [background-size:18px_18px] px-3.5 py-4" aria-live="polite">
          {msgs.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}>
              <div className={`pop-in max-w-[82%] rounded-2xl px-3.5 py-2 text-[15px] leading-snug shadow-sm ${m.from === 'you' ? 'rounded-br-sm bg-leaf text-ink' : 'rounded-bl-sm bg-surface text-ink'}`}>
                {m.text}
                {m.link && (
                  <a href={m.link} target="_blank" rel="noopener" className="mt-2 block rounded-lg bg-leaf px-3 py-2 text-center font-semibold text-ink">Open WhatsApp</a>
                )}
                {m.from === 'you' && <CheckCheck className="ml-1.5 inline h-3.5 w-3.5 align-[-2px] text-brand" aria-hidden="true" />}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start" aria-label="InTaxBD is typing">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-surface px-4 py-3 shadow-sm">
                {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${i * 140}ms` }} />)}
              </div>
            </div>
          )}
          {msgs.length > 0 && msgs.every((m) => m.from === 'us') && !typing && (
            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK.map((q) => (
                <button key={q} type="button" onClick={() => { setDraft(q); inputRef.current?.focus(); }}
                  className="min-h-[40px] rounded-full border border-brand/40 bg-surface px-3.5 text-[13.5px] font-semibold text-brand">
                  {q}
                </button>
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* composer */}
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-end gap-2 border-t border-rule bg-surface px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5">
          <textarea
            ref={inputRef} rows={1} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={onKeyDown}
            placeholder="Type your message…" aria-label="Type your message"
            className="max-h-28 min-h-[44px] flex-1 resize-none rounded-3xl border border-ink/20 bg-paper px-4 py-[11px] text-[16px] outline-none focus:border-brand"
          />
          <button type="submit" disabled={!draft.trim()} aria-label="Send message"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-leaf text-ink shadow-[0_3px_0_0_#4a7f12] transition-[transform,box-shadow,opacity] active:translate-y-[2px] active:shadow-[0_1px_0_0_#4a7f12] disabled:opacity-40">
            <Send className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>
      </section>
    </>
  );
};

export default ChatSheet;
