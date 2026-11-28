import React, { useEffect, useState } from 'react';
import Home from '../presentation/pages/Home';
import Calculator from '../presentation/pages/Calculator';
import ChatSheet from '../presentation/components/widgets/ChatSheet';
import { LangProvider } from '../presentation/i18n/lang';

// Hash routing: "#/calculator" shows the tax calculator, anything else is the landing page.
const isCalc = () => window.location.hash.startsWith('#/calculator');

const App: React.FC = () => {
  const [calc, setCalc] = useState(isCalc);

  useEffect(() => {
    const onHash = () => {
      const next = isCalc();
      setCalc((prev) => {
        if (prev !== next) {
          window.scrollTo(0, 0);
          // Coming back to the landing page from a link like #pricing: scroll once it has rendered.
          const id = window.location.hash.slice(1);
          if (!next && id) window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 700);
        }
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink selection:bg-leaf selection:text-ink">
      <LangProvider>
        {calc ? <Calculator /> : <Home />}
        <ChatSheet />
      </LangProvider>
    </div>
  );
};

export default App;
