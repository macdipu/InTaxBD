import React from 'react';
import letters from '@/assets/png/logo-layers/letters.webp';
import x from '@/assets/png/logo-layers/x.webp';
import bd from '@/assets/png/logo-layers/bd.webp';
import check from '@/assets/png/logo-layers/check.webp';
import arrow from '@/assets/png/logo-layers/arrow.webp';

// The InTaxBD logo split into its five parts (cut from assets/png/logo.png), stacked
// on one canvas so each part can move on its own. Animations live in index.html (.ilogo).
// `intro` plays the build-up once; otherwise the logo is static and reacts to hover/focus
// of its closest `.ilogo-link` ancestor.

interface AnimatedLogoProps {
  intro?: boolean;
  className?: string;
}

const layers = [
  { src: letters, name: 'letters' },
  { src: x, name: 'x' },
  { src: bd, name: 'bd' },
  { src: check, name: 'check' },
  { src: arrow, name: 'arrow' },
];

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ intro = false, className = '' }) => (
  <span role="img" aria-label="InTaxBD" className={`ilogo ${intro ? 'ilogo--intro' : ''} ${className}`}>
    {layers.map((l) => (
      <img key={l.name} src={l.src} alt="" aria-hidden="true" draggable={false} className={`l-${l.name}`} />
    ))}
  </span>
);

export default AnimatedLogo;
