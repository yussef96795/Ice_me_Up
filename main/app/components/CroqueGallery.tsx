'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const croqueItems: GalleryItem[] = [
  {
    common: 'Croque Monsieur Jambon Fromage',
    binomial: 'Jambon, fromage, 15DT',
    photo: {
      url: '/croque/croque-monsieur_jambon_fromage_15dt.jpeg',
      text: 'croque monsieur jambon fromage',
      pos: '50% 50%'
    }
  },
  {
    common: 'Croque Monsieur Thon Fromage',
    binomial: 'Thon, fromage, 15DT',
    photo: {
      url: '/croque/croque-monsieur_Thon_fromage_15dt.jpeg',
      text: 'croque monsieur thon fromage',
      pos: '50% 50%'
    }
  }
];

export default function CroqueGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={croqueItems} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
