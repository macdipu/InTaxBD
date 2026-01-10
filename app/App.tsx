import React from 'react';
import Home from '../presentation/pages/Home';

// In a larger app, this would handle routing via React Router or HashRouter.
// Since this is a single page landing site with hash navigation, we render Home directly.

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-brand-light font-sans selection:bg-brand-secondary selection:text-white">
      <Home />
    </div>
  );
};

export default App;