'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Caramel', binomial: 'Macchiato caramel, 9DT', photo: { url: '/macchiato/caramel_9dt.jpeg', text: 'macchiato caramel', pos: '50% 50%' } },
  { common: 'Dolce', binomial: 'Macchiato dolce, 8DT', photo: { url: '/macchiato/dolce_8dt.jpeg', text: 'macchiato dolce', pos: '50% 50%' } },
  { common: 'Noisette', binomial: 'Macchiato noisette, 13DT', photo: { url: '/macchiato/noisette_13dt.jpeg', text: 'macchiato noisette', pos: '50% 50%' } },
  { common: 'Nutella', binomial: 'Macchiato nutella, 11DT', photo: { url: '/macchiato/nutella_11dt.jpeg', text: 'macchiato nutella', pos: '50% 50%' } },
  { common: 'Pistachio', binomial: 'Macchiato pistachio, 15DT', photo: { url: '/macchiato/pistachio_15dt.jpeg', text: 'macchiato pistachio', pos: '50% 50%' } },
  { common: 'Speculoos', binomial: 'Macchiato speculoos, 14DT', photo: { url: '/macchiato/speculoos_14dt.jpeg', text: 'macchiato speculoos', pos: '50% 50%' } },
];

export default function MacchiatoGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
