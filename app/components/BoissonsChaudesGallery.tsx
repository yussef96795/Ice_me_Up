'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Chocolat Chaud', binomial: 'Chocolat chaud, 7DT', photo: { url: '/boissons%20chaudes/chocolat_chaud_7dt.jpeg', text: 'chocolat chaud', pos: '50% 50%' } },
  { common: 'Chocolat Viennois', binomial: 'Chocolat viennois, 9DT', photo: { url: '/boissons%20chaudes/chocolat_viennois_9dt.jpeg', text: 'chocolat viennois', pos: '50% 50%' } },
  { common: 'Noisette', binomial: 'Noisette, 11DT', photo: { url: '/boissons%20chaudes/noisette_11dt.jpeg', text: 'noisette', pos: '50% 50%' } },
  { common: 'Nutella', binomial: 'Nutella, 9DT', photo: { url: '/boissons%20chaudes/Nutella_9dt.jpeg', text: 'nutella', pos: '50% 50%' } },
  { common: 'Pistachio', binomial: 'Pistachio, 13DT', photo: { url: '/boissons%20chaudes/Pistachio_13dt.jpeg', text: 'pistachio', pos: '50% 50%' } },
  { common: 'Speculoos', binomial: 'Speculoos, 12DT', photo: { url: '/boissons%20chaudes/speculoos_12dt.jpeg', text: 'speculoos', pos: '50% 50%' } },
];

export default function BoissonsChaudesGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
