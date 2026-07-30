'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Eau 0.5L', binomial: 'Eau minérale 0.5L, 2DT', photo: { url: '/Boissons/eau_0.5L_2dt.jpeg', text: 'eau minérale 0.5L', pos: '50% 50%' } },
  { common: 'Eau 1L', binomial: 'Eau minérale 1L, 4DT', photo: { url: '/Boissons/eau_1L_4dt.jpeg', text: 'eau minérale 1L', pos: '50% 50%' } },
  { common: 'Energy Drink', binomial: 'Boisson énergisante, 9DT', photo: { url: '/Boissons/Energy_drink_9dt.jpeg', text: 'energy drink', pos: '50% 50%' } },
  { common: 'Soda', binomial: 'Soda, 3DT', photo: { url: '/Boissons/soda_3dt.jpeg', text: 'soda', pos: '50% 50%' } },
];

export default function BoissonsGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
