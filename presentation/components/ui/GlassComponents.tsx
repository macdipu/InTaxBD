import React, { ReactNode } from 'react';

// --- Glass Card ---
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hoverEffect = true 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 relative overflow-hidden ${hoverEffect ? 'cursor-default' : ''} ${className}`}
    >
      {/* Subtle sheen effect container */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// --- Glass Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  children: ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  const baseStyle = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2";
  const widthStyle = fullWidth ? "w-full" : "";
  
  let variantStyle = "";
  switch (variant) {
    case 'primary':
      variantStyle = "bg-brand-secondary text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:bg-sky-400 hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] border border-white/10";
      break;
    case 'secondary':
      variantStyle = "bg-white text-brand-primary hover:bg-gray-100 shadow-lg";
      break;
    case 'outline':
      variantStyle = "border border-brand-secondary/50 text-brand-secondary hover:bg-brand-secondary/10";
      break;
    case 'glass':
      variantStyle = "glass-panel text-white hover:bg-white/10 border-white/20";
      break;
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${widthStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Section Wrapper ---
export const Section: React.FC<{ children: ReactNode; id?: string; className?: string }> = ({ children, id, className = '' }) => (
  <section id={id} className={`py-20 px-4 md:px-8 relative ${className}`}>
    <div className="max-w-7xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

// --- Section Title ---
export const SectionTitle: React.FC<{ title: string; subtitle?: string; center?: boolean }> = ({ title, subtitle, center = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-secondary">
      {title}
    </h2>
    {subtitle && (
      <div className="w-20 h-1 bg-brand-secondary mt-4 rounded-full mx-auto md:mx-0 opacity-80" style={{ marginLeft: center ? 'auto' : 0 }} />
    )}
  </div>
);