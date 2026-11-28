import React, { ReactNode } from 'react';
import { MaskWords } from './Motion';

// --- Button (renders a link when href is given) ---
type Variant = 'primary' | 'accent' | 'outline' | 'light';

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  href?: string;
  fullWidth?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  target?: string;
  disabled?: boolean;
}

// 3D keys: a solid lower edge that squashes down when pressed.
const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-deep [--edge:#071d4d]',
  accent: 'bg-leaf text-ink hover:bg-[#8cc93f] [--edge:#4a7f12]',
  outline: 'border border-ink/30 bg-surface text-ink hover:border-ink hover:bg-ink hover:text-white [--edge:rgb(var(--c-ink)/.35)]',
  light: 'bg-white text-ink hover:bg-paper [--edge:#aab4c5]',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  href,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  target,
  disabled,
}) => {
  const classes = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold transition-[background-color,color,border-color,transform,box-shadow] duration-100 shadow-[0_4px_0_0_var(--edge)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--edge)] motion-reduce:active:translate-y-0 ${
    fullWidth ? 'w-full' : ''
  } ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        target={target ?? (external ? '_blank' : undefined)}
        rel={external ? 'noopener' : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

// --- Section wrapper ---
export const Section: React.FC<{
  children: ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
}> = ({ children, id, className = '', innerClassName = '' }) => (
  <section id={id} className={`px-5 py-16 sm:px-8 md:px-10 md:py-28 ${className}`}>
    <div className={`mx-auto max-w-6xl ${innerClassName}`}>{children}</div>
  </section>
);

// --- Section heading: words rise out of a mask, intro fades in after ---
export const SectionHeading: React.FC<{
  title: string;
  intro?: ReactNode;
  onDark?: boolean;
}> = ({ title, intro, onDark = false }) => (
  <div data-reveal>
    <h2
      className={`font-display text-[32px] font-semibold leading-[1.06] tracking-tight sm:text-4xl md:text-5xl ${
        onDark ? 'text-white' : 'text-ink'
      }`}
    >
      <MaskWords text={title} />
    </h2>
    {intro && (
      <p
        className={`rv-fade mt-4 max-w-md text-[16px] leading-relaxed md:mt-5 md:text-[17px] ${
          onDark ? 'text-white/70' : 'text-muted'
        }`}
        style={{ '--d': '250ms' } as React.CSSProperties}
      >
        {intro}
      </p>
    )}
  </div>
);
