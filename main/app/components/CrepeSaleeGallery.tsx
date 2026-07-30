'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const crepeSaleeItems: GalleryItem[] = [
  {
    common: 'Crêpe Thon Fromage (M)',
    binomial: 'Thon, fromage, 15DT',
    photo: {
      url: '/crepe%20salee/Crepe_thon_fromage_15dt.webp',
      text: 'crêpe thon fromage moyenne',
      pos: '50% 50%'
    }
  },
  {
    common: 'Crêpe Thon Fromage (L)',
    binomial: 'Thon, fromage, 17DT',
    photo: {
      url: '/crepe%20salee/Crepe_thon_fromage_17dt.webp',
      text: 'crêpe thon fromage large',
      pos: '50% 50%'
    }
  },
  {
    common: 'Crêpe Jambon Fromage',
    binomial: 'Jambon, fromage, 15DT',
    photo: {
      url: '/crepe%20salee/crepe_jambon_froamge_15dt.webp',
      text: 'crêpe jambon fromage',
      pos: '50% 50%'
    }
  },
  {
    common: 'Crêpe Poulet Champignons',
    binomial: 'Poulet, champignons, 20DT',
    photo: {
      url: '/crepe%20salee/crepe_champignions_poulet_20dt.webp',
      text: 'crêpe poulet champignons',
      pos: '50% 50%'
    }
  }
];

export default function CrepeSaleeGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={crepeSaleeItems} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
