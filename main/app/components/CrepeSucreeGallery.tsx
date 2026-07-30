'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const crepeSucreeItems: GalleryItem[] = [
  {
    common: 'Crêpe Spéculoos',
    binomial: 'Spéculoos, 15DT',
    photo: {
      url: '/crepe%20sucree/crepe_speculoos_15dt.jpeg',
      text: 'crêpe spéculoos',
      pos: '50% 50%'
    }
  },
  {
    common: 'Crêpe Pistache',
    binomial: 'Pistache, 19DT',
    photo: {
      url: '/crepe%20sucree/crepe_pistache_19dt.jpeg',
      text: 'crêpe pistache',
      pos: '50% 50%'
    }
  },
  {
    common: 'Crêpe Nutella',
    binomial: 'Nutella, 15DT',
    photo: {
      url: '/crepe%20sucree/crepe_nutella_15dt.jpeg',
      text: 'crêpe nutella',
      pos: '50% 50%'
    }
  },
  {
    common: 'Crêpe Dubai',
    binomial: 'Dubai chocolate, 20DT',
    photo: {
      url: '/crepe%20sucree/crepe_dubai_20dt.jpeg',
      text: 'crêpe dubai chocolate',
      pos: '50% 50%'
    }
  }
];

export default function CrepeSucreeGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={crepeSucreeItems} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
