'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Caramel', binomial: 'Frappuccino caramel, 10DT', photo: { url: '/frappucino/caramel_10dt.jpeg', text: 'frappuccino caramel', pos: '50% 50%' } },
  { common: 'Classique', binomial: 'Frappuccino classique, 13DT', photo: { url: '/frappucino/classique_13dt.jpeg', text: 'frappuccino classique', pos: '50% 50%' } },
  { common: 'Noisette', binomial: 'Frappuccino noisette, 15DT', photo: { url: '/frappucino/noisette_15dt.jpeg', text: 'frappuccino noisette', pos: '50% 50%' } },
  { common: 'Pistacchio', binomial: 'Frappuccino pistacchio, 16DT', photo: { url: '/frappucino/Pistacchio_16dt.jpeg', text: 'frappuccino pistacchio', pos: '50% 50%' } },
  { common: 'Speculoos', binomial: 'Frappuccino speculoos, 14DT', photo: { url: '/frappucino/Speculoos_14dt.jpeg', text: 'frappuccino speculoos', pos: '50% 50%' } },
];

export default function FrappuccinoGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
