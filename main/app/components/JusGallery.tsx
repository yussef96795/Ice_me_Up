'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Citronnade', binomial: 'Citronnade fraîche, 3DT', photo: { url: '/Jus/citronnade_3dt.jpeg', text: 'citronnade fraîche', pos: '50% 50%' } },
  { common: 'Fraise', binomial: 'Jus de fraise, 4DT', photo: { url: '/Jus/fraise_4dt.jpeg', text: 'jus de fraise', pos: '50% 50%' } },
  { common: 'Kiwi Banane', binomial: 'Jus kiwi banane, 6DT', photo: { url: '/Jus/Kiwi_banana_6dt.jpeg', text: 'jus kiwi banane', pos: '50% 50%' } },
  { common: 'Mangue', binomial: 'Jus de mangue, 7DT', photo: { url: '/Jus/mangue_7dt.jpeg', text: 'jus de mangue', pos: '50% 50%' } },
];

export default function JusGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
