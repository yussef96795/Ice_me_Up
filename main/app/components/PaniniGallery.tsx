'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const paniniItems: GalleryItem[] = [
  {
    common: 'Panini Jambon Fromage',
    binomial: 'Jambon, fromage, 15DT',
    photo: {
      url: '/panini/Panini_Jambon_fromage_15dt.webp',
      text: 'panini jambon fromage',
      pos: '50% 50%'
    }
  },
  {
    common: 'Panini Thon Fromage',
    binomial: 'Thon, fromage, 15DT',
    photo: {
      url: '/panini/Panini_Thon_fromage_15dt.webp',
      text: 'panini thon fromage',
      pos: '50% 50%'
    }
  }
];

export default function PaniniGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={paniniItems} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
