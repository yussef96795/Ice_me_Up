'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const gauffreItems: GalleryItem[] = [
  {
    common: 'Gauffre Nutella',
    binomial: 'Nutella, 15DT',
    photo: {
      url: '/gauffre/gauffre_nutella_15dt.webp',
      text: 'gauffre nutella',
      pos: '50% 50%'
    }
  },
  {
    common: 'Gauffre Pistache',
    binomial: 'Pistache, 19DT',
    photo: {
      url: '/gauffre/gauffre_pistache_19dt.webp',
      text: 'gauffre pistache',
      pos: '50% 50%'
    }
  },
  {
    common: 'Gauffre Dubai',
    binomial: 'Dubai chocolate, 20DT',
    photo: {
      url: '/gauffre/gauffre_dubai_20dt.webp',
      text: 'gauffre dubai',
      pos: '50% 50%'
    }
  }
];

export default function GauffreGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={gauffreItems} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
