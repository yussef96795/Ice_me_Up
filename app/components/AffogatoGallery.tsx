'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Chocolat', binomial: 'Affogato chocolat, 10DT', photo: { url: '/affogato/Chocolat_10dt.jpeg', text: 'affogato chocolat', pos: '50% 50%' } },
  { common: 'Classique', binomial: 'Affogato classique, 8DT', photo: { url: '/affogato/classique_8dt.jpeg', text: 'affogato classique', pos: '50% 50%' } },
  { common: 'Noisette', binomial: 'Affogato noisette, 11DT', photo: { url: '/affogato/Noisette_11dt.jpeg', text: 'affogato noisette', pos: '50% 50%' } },
  { common: 'Pistachio', binomial: 'Affogato pistachio, 13DT', photo: { url: '/affogato/Pistachio_13dt.jpeg', text: 'affogato pistachio', pos: '50% 50%' } },
];

export default function AffogatoGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
