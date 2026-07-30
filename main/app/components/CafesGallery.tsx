'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Americano', binomial: 'Americano, 5DT', photo: { url: '/cafes/americano_5dt.webp', text: 'americano', pos: '50% 50%' } },
  { common: 'Cappuccino', binomial: 'Cappuccino, 6DT', photo: { url: '/cafes/Cappuccino_6dt.webp', text: 'cappuccino', pos: '50% 50%' } },
  { common: 'Espresso', binomial: 'Espresso, 5DT', photo: { url: '/cafes/Espresso_5dt.webp', text: 'espresso', pos: '50% 50%' } },
  { common: 'Latte', binomial: 'Latte, 6DT', photo: { url: '/cafes/latte_6dt.webp', text: 'latte', pos: '50% 50%' } },
];

export default function CafesGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
