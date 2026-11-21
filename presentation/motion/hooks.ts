import { useEffect, useState, RefObject } from 'react';

// True once the boot loader has gone, so nothing animates hidden behind it.
export const useBootReady = (): boolean => {
  const [ready, setReady] = useState(
    () => typeof document === 'undefined' || !document.documentElement.classList.contains('is-booting'),
  );
  useEffect(() => {
    if (ready) return;
    const on = () => setReady(true);
    window.addEventListener('intaxbd:ready', on, { once: true });
    // In case the event fired between first render and this effect.
    if (!document.documentElement.classList.contains('is-booting')) on();
    return () => window.removeEventListener('intaxbd:ready', on);
  }, [ready]);
  return ready;
};

export const usePrefersReducedMotion = (): boolean => {
  const [reduce, setReduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
};

// One observer for the whole page: every [data-reveal] element gets [data-in]
// the first time it scrolls into view. CSS does the rest.
export const useRevealObserver = () => {
  const ready = useBootReady();
  useEffect(() => {
    if (!ready) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = '';
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    );
    const scan = () =>
      document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])').forEach((el) => io.observe(el));
    scan();
    // Pick up elements that mount later (e.g. conditionally rendered blocks).
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [ready]);
};

// Fires once when the element is on screen (after the boot loader).
export const useInView = (ref: RefObject<Element | null>, margin = '0px 0px -10% 0px'): boolean => {
  const ready = useBootReady();
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ready || inView || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ready, inView, ref, margin]);
  return inView;
};

// Live visibility (not once) — used to show/hide the mobile action bar.
export const useVisible = (id: string): boolean => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [id]);
  return visible;
};
