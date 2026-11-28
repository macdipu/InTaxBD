import React, { createContext, useContext, useEffect, useState } from 'react';
import { translateBn } from './bn';

export type Lang = 'en' | 'bn';

// Bangla copy: please have a native speaker review before launch.
const dict = {
  en: {
    'nav.Services': 'Services', 'nav.Pricing': 'Pricing', 'nav.Tax calculator': 'Tax calculator', 'nav.How it works': 'How it works',
    'nav.Documents': 'Documents', 'nav.FAQ': 'FAQ', 'nav.About': 'About',
    'hero.title': 'File your income tax return in 48 hours.',
    'hero.sub': 'For individuals, freelancers, NRBs and businesses in Bangladesh. You send the documents. We calculate, confirm the figures with you, and submit to the NBR.',
    'hero.fees': 'See all fees', 'hero.how': 'How filing works',
    'fee.title': 'Find your fee', 'fee.help': 'Your total yearly income or assets. Not sure? Pick the closest, we will confirm.',
    'fee.advisory': 'Advisory fee', 'fee.vat': 'Excluding VAT. You see the fee before we start.', 'fee.cta': 'Confirm my exact fee on WhatsApp',
    'fee.t1': 'Free to ask', 'fee.t2': 'No payment now', 'fee.t3': 'Nothing filed until you approve',
    'bar.call': 'Call', 'bar.confirm': 'Confirm my fee',
    'start.title': 'Which one are you?', 'start.sub': 'Tap one. We show your fee, services and documents.',
    'calc.nav': 'Calculate my tax', 'calc.title': 'What will my income tax be?',
    'calc.intro': 'For anyone, from no income to many income sources. Answer in order. Your tax updates on the right (or below on a phone).',
    'calc.s1': 'About you', 'calc.s2': 'Income', 'calc.s3': 'Reduce tax', 'calc.s4': 'Your tax',
    'calc.result': 'Your estimated income tax', 'calc.total': 'Total tax', 'calc.expert': 'Check this with an expert',
    'calc.back': 'Back', 'calc.next': 'What happens next',
  },
  bn: {
    'nav.Services': 'সেবা', 'nav.Pricing': 'ফি', 'nav.Tax calculator': 'কর ক্যালকুলেটর', 'nav.How it works': 'কীভাবে কাজ করে',
    'nav.Documents': 'কাগজপত্র', 'nav.FAQ': 'প্রশ্নোত্তর', 'nav.About': 'আমাদের সম্পর্কে',
    'hero.title': '৪৮ ঘণ্টায় আপনার আয়কর রিটার্ন জমা দিন।',
    'hero.sub': 'বাংলাদেশের ব্যক্তি, ফ্রিল্যান্সার, প্রবাসী ও ব্যবসার জন্য। আপনি কাগজপত্র পাঠান। আমরা হিসাব করি, আপনার সাথে মিলিয়ে নিই এবং এনবিআরে জমা দিই।',
    'hero.fees': 'সব ফি দেখুন', 'hero.how': 'রিটার্ন জমার ধাপ',
    'fee.title': 'আপনার ফি জানুন', 'fee.help': 'আপনার বছরের মোট আয় বা সম্পদ। নিশ্চিত না হলে কাছাকাছিটি বেছে নিন, আমরা মিলিয়ে নেব।',
    'fee.advisory': 'পরামর্শ ফি', 'fee.vat': 'ভ্যাট ছাড়া। কাজ শুরুর আগেই ফি জানতে পারবেন।', 'fee.cta': 'হোয়াটসঅ্যাপে সঠিক ফি জেনে নিন',
    'fee.t1': 'জিজ্ঞেস করা ফ্রি', 'fee.t2': 'এখন কোনো টাকা নয়', 'fee.t3': 'আপনার অনুমোদন ছাড়া জমা হবে না',
    'bar.call': 'কল', 'bar.confirm': 'আমার ফি জানুন',
    'start.title': 'আপনি কোনটি?', 'start.sub': 'একটি বেছে নিন। আমরা ফি, সেবা ও কাগজপত্র দেখাব।',
    'calc.nav': 'আমার কর হিসাব করুন', 'calc.title': 'আমার আয়কর কত হবে?',
    'calc.intro': 'আয় নেই থেকে অনেক আয়ের উৎস, সবার জন্য। ক্রমানুসারে উত্তর দিন। আপনার কর ডানে (ফোনে নিচে) দেখা যাবে।',
    'calc.s1': 'আপনার তথ্য', 'calc.s2': 'আয়', 'calc.s3': 'কর কমান', 'calc.s4': 'আপনার কর',
    'calc.result': 'আপনার আনুমানিক আয়কর', 'calc.total': 'মোট কর', 'calc.expert': 'বিশেষজ্ঞের সাথে মিলিয়ে নিন',
    'calc.back': 'ফিরে যান', 'calc.next': 'এরপর কী হবে',
  },
} as const;

type Key = keyof (typeof dict)['en'];
interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: Key | string, fallback?: string) => string; tx: (english: string) => string }

const LangContext = createContext<Ctx>({ lang: 'en', setLang: () => {}, t: (k, f) => f ?? k, tx: (e) => e });

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return localStorage.getItem('intaxbd-lang') === 'bn' ? 'bn' : 'en'; } catch { return 'en'; }
  });
  useEffect(() => { document.documentElement.lang = lang === 'bn' ? 'bn' : 'en'; }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('intaxbd-lang', l); } catch { /* ignore */ }
  };
  const t = (k: string, fallback?: string) => (dict[lang] as Record<string, string>)[k] ?? fallback ?? (dict.en as Record<string, string>)[k] ?? k;
  const tx = (english: string) => (lang === 'bn' ? translateBn(english) : english);
  useDomTranslate(lang);
  return <LangContext.Provider value={{ lang, setLang, t, tx }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);

export const LangToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, setLang } = useLang();
  return (
    <button type="button" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} aria-label={lang === 'en' ? 'বাংলায় দেখুন' : 'View in English'}
      className={`inline-flex h-11 min-w-[44px] items-center justify-center rounded-full border border-ink/25 px-3 text-[14px] font-bold text-ink transition-colors hover:bg-ink/10 ${className}`}>
      {lang === 'en' ? 'বাং' : 'EN'}
    </button>
  );
};


// ---- Whole-page translation -------------------------------------------------
// In Bangla mode every visible text node and a few attributes are looked up in the dictionary (bn.ts).
// Originals are remembered so English can be restored, and a MutationObserver keeps newly rendered
// content translated. Text that is not in the dictionary stays English.
const ATTRS = ['aria-label', 'placeholder', 'title', 'alt'] as const;
const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE']);

const useDomTranslate = (lang: Lang) => {
  useEffect(() => {
    const textOrig = new Map<Text, { en: string; bn: string }>();
    const attrOrig = new Map<Element, Record<string, { en: string; bn: string }>>();
    const originalTitle = document.title;
    let busy = false;

    const doText = (node: Text) => {
      const parent = node.parentElement;
      if (!parent || SKIP.has(parent.tagName) || parent.closest('[data-no-translate]')) return;
      const rec = textOrig.get(node);
      if (rec && node.data === rec.bn) return; // already translated by us
      const en = node.data; // new or React-updated English text
      const bn = translateBn(en);
      if (bn !== en) { textOrig.set(node, { en, bn }); node.data = bn; } else textOrig.delete(node);
    };
    const doAttrs = (el: Element) => {
      if (el.closest('[data-no-translate]')) return;
      for (const a of ATTRS) {
        const v = el.getAttribute(a);
        if (!v) continue;
        const rec = attrOrig.get(el)?.[a];
        if (rec && v === rec.bn) continue;
        const bn = translateBn(v);
        if (bn !== v) {
          const r = attrOrig.get(el) ?? {};
          r[a] = { en: v, bn };
          attrOrig.set(el, r);
          el.setAttribute(a, bn);
        }
      }
    };
    const walk = (root: Node) => {
      if (root.nodeType === Node.TEXT_NODE) return doText(root as Text);
      if (root.nodeType !== Node.ELEMENT_NODE) return;
      const el = root as Element;
      if (SKIP.has(el.tagName)) return;
      doAttrs(el);
      const tw = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
      let n: Node | null = tw.nextNode();
      while (n) {
        n.nodeType === Node.TEXT_NODE ? doText(n as Text) : doAttrs(n as Element);
        n = tw.nextNode();
      }
    };

    if (lang !== 'bn') return;
    document.title = 'InTaxBD - বাংলাদেশে আয়কর রিটার্ন জমা';
    const run = (fn: () => void) => { busy = true; try { fn(); } finally { busy = false; } };
    run(() => walk(document.body));
    const mo = new MutationObserver((muts) => {
      if (busy) return;
      run(() => {
        for (const m of muts) {
          if (m.type === 'characterData') doText(m.target as Text);
          else if (m.type === 'attributes') doAttrs(m.target as Element);
          else m.addedNodes.forEach((n) => walk(n));
        }
      });
    });
    mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: [...ATTRS] });

    return () => {
      mo.disconnect();
      textOrig.forEach((rec, node) => { if (node.isConnected && node.data === rec.bn) node.data = rec.en; });
      attrOrig.forEach((rec, el) => Object.entries(rec).forEach(([a, r]) => { if (el.getAttribute(a) === r.bn) el.setAttribute(a, r.en); }));
      document.title = originalTitle;
    };
  }, [lang]);
};
