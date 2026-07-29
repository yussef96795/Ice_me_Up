'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Blue Mojito', binomial: 'Mojito bleu, 13DT', photo: { url: '/mojito/Blue_mojito_13dt.jpeg', text: 'blue mojito', pos: '50% 50%' } },
  { common: 'Classic Mojito', binomial: 'Mojito classique, 11DT', photo: { url: '/mojito/Classic_mojito_11dt.jpeg', text: 'classic mojito', pos: '50% 50%' } },
  { common: 'Energetic Mojito', binomial: 'Mojito énergétique, 16DT', photo: { url: '/mojito/energetic_mojito_16dt.jpeg', text: 'energetic mojito', pos: '50% 50%' } },
  { common: 'Red Mojito', binomial: 'Mojito rouge, 13DT', photo: { url: '/mojito/Red_mojito_13dt.jpeg', text: 'red mojito', pos: '50% 50%' } },
];

export default function MojitoGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
