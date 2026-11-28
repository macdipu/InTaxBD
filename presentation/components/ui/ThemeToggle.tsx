import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const flip = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('intaxbd-theme', next ? 'dark' : 'light'); } catch { /* ignore */ }
    setDark(next);
  };
  return (
    <button type="button" onClick={flip} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={dark}
      className={`grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/10 ${className}`}>
      {dark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
