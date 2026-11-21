import React, { useEffect, useRef, useState } from 'react';
import { useInView, usePrefersReducedMotion } from '../../motion/hooks';

// --- Write: each word rises out of a mask. Parent needs [data-reveal]. ---
export const MaskWords: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => (
  <>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">
      {text.split(' ').map((word, i, arr) => (
        <React.Fragment key={i}>
          <span className="mw">
            <span style={{ '--i': i, '--d': `${delay}ms` } as React.CSSProperties}>{word}</span>
          </span>
          {i < arr.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  </>
);

// --- Rule: a ledger line that draws in. Parent needs [data-reveal]. ---
export const Rule: React.FC<{ className?: string; delay?: number }> = ({ className = 'text-ink', delay = 0 }) => (
  <span aria-hidden="true" className={`rv-rule ${className}`} style={{ '--d': `${delay}ms` } as React.CSSProperties} />
);

// --- Tick: the logo's check mark, drawn with a stroke. ---
// mode "reveal" draws when a [data-reveal] ancestor comes in; "toggle" draws when `on`.
export const Tick: React.FC<{
  className?: string;
  delay?: number;
  mode?: 'reveal' | 'toggle';
  on?: boolean;
  strokeWidth?: number;
}> = ({ className = '', delay = 0, mode = 'reveal', on = false, strokeWidth = 2.6 }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className={`${mode === 'reveal' ? 'tick' : `tick-t ${on ? 'on' : ''}`} ${className}`}
    style={{ '--d': `${delay}ms` } as React.CSSProperties}
  >
    <path
      d="M3 8.6l3.2 3.1L13.2 4.4"
      pathLength={1}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- Fill: odometer. Digits roll; only changed digits move. ---
const DIGITS = '0123456789'.split('');
export const Odometer: React.FC<{ value: string; active?: boolean; className?: string }> = ({
  value,
  active = true,
  className = '',
}) => {
  const chars = value.split('');
  return (
    <span className={`odo ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="odo">
        {chars.map((c, i) => {
          const pos = chars.length - i; // key from the right so the ones column stays put
          if (/\d/.test(c)) {
            const d = active ? Number(c) : 0;
            return (
              <span key={`d${pos}`} className="odo-col">
                <span className="odo-strip" style={{ transform: `translateY(-${d * 10}%)` }}>
                  {DIGITS.map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </span>
              </span>
            );
          }
          return (
            <span key={`c${pos}${c}`} className="odo-char">
              {c === ' ' ? ' ' : c}
            </span>
          );
        })}
      </span>
    </span>
  );
};

// --- Fill: count up a leading number ("500+", "100%", "48h") once in view. ---
export const CountUp: React.FC<{ value: string; className?: string; duration?: number }> = ({
  value,
  className = '',
  duration = 1200,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduce = usePrefersReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    if (reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target, duration]);

  if (!match) {
    return (
      <span ref={ref} className={`${className} ${inView ? 'swap-in' : 'opacity-0'}`}>
        {value}
      </span>
    );
  }
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
    </span>
  );
};

// --- Stamp: a round seal. Change `stampKey` to stamp again. ---
export const Stamp: React.FC<{
  show: boolean;
  lifted?: boolean;
  stampKey?: number | string;
  children: React.ReactNode;
  className?: string;
}> = ({ show, lifted = false, stampKey, children, className = '' }) => (
  <span
    key={stampKey}
    aria-hidden={!show}
    className={`stamp ${show ? (lifted ? 'lift' : 'on') : ''} ${className}`}
  >
    <Tick mode="toggle" on={show && !lifted} className="h-3.5 w-3.5" strokeWidth={3} />
    {children}
  </span>
);

// --- Pen: a hand-drawn underline that draws itself. Parent needs [data-reveal]. ---
export const PenUnderline: React.FC<{ className?: string; delay?: number }> = ({ className = '', delay = 0 }) => (
  <svg
    viewBox="0 0 200 12"
    preserveAspectRatio="none"
    aria-hidden="true"
    className={`pen-u ${className}`}
    style={{ '--d': `${delay}ms` } as React.CSSProperties}
  >
    <path d="M3 8 C 40 3, 90 4, 130 6 S 185 9, 197 4" pathLength={1} fill="none" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

// Emphasise a word or phrase with the pen underline.
export const PenMark: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = 'font-semibold text-ink',
}) => (
  <span className={`relative inline-block ${className}`}>
    {children}
    <PenUnderline className="absolute -bottom-1.5 left-0 h-2.5 w-full" delay={delay} />
  </span>
);
