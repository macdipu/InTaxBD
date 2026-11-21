import React, { ReactNode } from 'react';

// --- Button (renders a link when href is given) ---
type Variant = 'primary' | 'accent' | 'outline' | 'light';

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  href?: string;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-deep',
  accent: 'bg-leaf text-ink hover:bg-[#8cc93f]',
  outline: 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-white',
  light: 'bg-white text-ink hover:bg-paper',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  href,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
}) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold transition-colors ${
    fullWidth ? 'w-full' : ''
  } ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

// --- Section wrapper ---
export const Section: React.FC<{
  children: ReactNode;
  id?: string;
  className?: string;
}> = ({ children, id, className = '' }) => (
  <section id={id} className={`px-5 py-20 md:px-10 md:py-28 ${className}`}>
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
);

// --- Section heading: left aligned, one job ---
export const SectionHeading: React.FC<{
  title: string;
  intro?: string;
  onDark?: boolean;
}> = ({ title, intro, onDark = false }) => (
  <div>
    <h2
      className={`font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl ${
        onDark ? 'text-white' : 'text-ink'
      }`}
    >
      {title}
    </h2>
    {intro && (
      <p className={`mt-5 max-w-md text-[17px] leading-relaxed ${onDark ? 'text-white/70' : 'text-muted'}`}>
        {intro}
      </p>
    )}
  </div>
);
