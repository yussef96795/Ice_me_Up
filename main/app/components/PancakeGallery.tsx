'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const pancakeItems: GalleryItem[] = [
  {
    common: 'Pancake Nutella',
    binomial: 'Nutella, 15DT',
    photo: {
      url: '/pancake/pancake_nutella_15dt.jpeg',
      text: 'pancake nutella',
      pos: '50% 50%'
    }
  },
  {
    common: 'Pancake Pistache',
    binomial: 'Pistache, 19DT',
    photo: {
      url: '/pancake/pancake_pistacchio_19dt.jpeg',
      text: 'pancake pistache',
      pos: '50% 50%'
    }
  },
  {
    common: 'Pancake Fruits Rouges',
    binomial: 'Fruits rouges, 20DT',
    photo: {
      url: '/pancake/pancake_fruits_rouges_20dt.jpeg',
      text: 'pancake fruits rouges',
      pos: '50% 50%'
    }
  }
];

export default function PancakeGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={pancakeItems} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
