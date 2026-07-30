'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Americano', binomial: 'Café glacé americano, 7DT', photo: { url: '/iced%20coffee/americano_7dt.webp', text: 'iced coffee americano', pos: '50% 50%' } },
  { common: 'Caramel Macchiato', binomial: 'Caramel macchiato glacé, 10DT', photo: { url: '/iced%20coffee/caramel_macchiato_10dt.webp', text: 'iced caramel macchiato', pos: '50% 50%' } },
  { common: 'Dolce', binomial: 'Café glacé dolce, 8DT', photo: { url: '/iced%20coffee/dolce_8dt.webp', text: 'iced coffee dolce', pos: '50% 50%' } },
  { common: 'Latte', binomial: 'Latte glacé, 8DT', photo: { url: '/iced%20coffee/latte_8dt.webp', text: 'iced latte', pos: '50% 50%' } },
];

export default function IcedCoffeeGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
