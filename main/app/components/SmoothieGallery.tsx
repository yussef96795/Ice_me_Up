'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Ananas', binomial: 'Smoothie ananas, 14DT', photo: { url: '/smoothie/Annanas_smoothie_14dt.webp', text: 'smoothie ananas', pos: '50% 50%' } },
  { common: 'Fraise Citron', binomial: 'Smoothie fraise citron, 14DT', photo: { url: '/smoothie/Fraise_citron_smoothie_14dt.webp', text: 'smoothie fraise citron', pos: '50% 50%' } },
  { common: 'Kiwi Banane', binomial: 'Smoothie kiwi banane, 14DT', photo: { url: '/smoothie/Kiwi_banana_smoothie_14dt.webp', text: 'smoothie kiwi banane', pos: '50% 50%' } },
  { common: 'Mangue', binomial: 'Smoothie mangue, 14DT', photo: { url: '/smoothie/Mango_smoothie_14dt.webp', text: 'smoothie mangue', pos: '50% 50%' } },
];

export default function SmoothieGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
