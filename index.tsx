import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Boot loader (markup in index.html): let the logo finish building on the first visit,
// keep it brief on later loads in the same session, then fade it out.
const hideBootLoader = () => {
  const html = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let seen = false;
  try {
    seen = sessionStorage.getItem('intaxbd-intro') === '1';
    sessionStorage.setItem('intaxbd-intro', '1');
  } catch {
    /* storage blocked: treat as first visit */
  }
  const minMs = reduce || seen ? 250 : 1900;

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    html.classList.add('boot-done');
    html.classList.remove('is-booting');
    window.setTimeout(() => document.getElementById('boot')?.remove(), 600);
  };
  const afterMin = () => window.setTimeout(finish, Math.max(0, minMs - performance.now()));

  if (document.readyState === 'complete') afterMin();
  else window.addEventListener('load', afterMin, { once: true });
  window.setTimeout(finish, 6000); // never hold the page hostage to a slow asset
};
hideBootLoader();