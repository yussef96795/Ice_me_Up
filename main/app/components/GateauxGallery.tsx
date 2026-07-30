'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const gateauxItems: GalleryItem[] = [
  {
    common: 'Tiramisu Classique',
    binomial: 'Mascarpone, café, 18DT',
    photo: {
      url: '/gateaux/Tiramisu_classique_18dt.webp',
      text: 'tiramisu classique',
      pos: '50% 50%'
    }
  },
  {
    common: 'Tiramisu Pistache',
    binomial: 'Pistache, mascarpone, 22DT',
    photo: {
      url: '/gateaux/Tiramisu_pistache_22dt.webp',
      text: 'tiramisu pistache',
      pos: '50% 50%'
    }
  },
  {
    common: 'Dubai Cake',
    binomial: 'Pistache, crème de sésame, 28DT',
    photo: {
      url: '/gateaux/Dubai_Cake_28dt.webp',
      text: 'dubai cake',
      pos: '50% 50%'
    }
  },
  {
    common: 'Mousse au Chocolat',
    binomial: 'Chocolat noir, 18DT',
    photo: {
      url: '/gateaux/Chocolate_mousse_18dt.webp',
      text: 'mousse au chocolat',
      pos: '50% 50%'
    }
  }
];

export default function GateauxGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={gateauxItems} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
