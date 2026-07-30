'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const coupes: GalleryItem[] = [
  {
    common: 'Sorbets Lovers',
    binomial: 'Assortiment de sorbets, 18DT',
    photo: {
      url: '/nos%20coupes/Sorbets_lovers_18dt.jpeg',
      text: 'assortiment de sorbets',
      pos: '50% 50%'
    }
  },
  {
    common: 'Noisette Lovers',
    binomial: 'Coupe noisette, 22DT',
    photo: {
      url: '/nos%20coupes/Noissette_Lovers_22dt.jpeg',
      text: 'coupe noisette',
      pos: '50% 50%'
    }
  },
  {
    common: 'Pistacchio Lovers',
    binomial: 'Coupe pistache, 25DT',
    photo: {
      url: '/nos%20coupes/Pistacchio_lovers_25dt.jpeg',
      text: 'coupe pistache',
      pos: '50% 50%'
    }
  },
  {
    common: 'Chocolate Lovers',
    binomial: 'Coupe chocolat, 23DT',
    photo: {
      url: '/nos%20coupes/Chocolate_lovers_23dt.jpeg',
      text: 'coupe chocolat',
      pos: '50% 50%'
    }
  }
];

export default function NosCoupes() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={coupes} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
