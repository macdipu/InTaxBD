import React from 'react';
import Home from '../presentation/pages/Home';

// Single page landing site with hash navigation, so Home renders directly.

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink selection:bg-leaf selection:text-ink">
      <Home />
    </div>
  );
};

export default App;
