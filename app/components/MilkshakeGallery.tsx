'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Caramel Beurre Salé', binomial: 'Caramel beurre salé, 13DT', photo: { url: '/milk%20shake/Caramel_beurre_sale_13dt.jpeg', text: 'milkshake caramel beurre salé', pos: '50% 50%' } },
  { common: 'Chocolat au Lait', binomial: 'Chocolat au lait, 13DT', photo: { url: '/milk%20shake/chocolat_au_lait_13dt.jpeg', text: 'milkshake chocolat au lait', pos: '50% 50%' } },
  { common: 'Noisette', binomial: 'Noisette, 14DT', photo: { url: '/milk%20shake/noisette_14dt.jpeg', text: 'milkshake noisette', pos: '50% 50%' } },
  { common: 'Pistache', binomial: 'Pistache, 15DT', photo: { url: '/milk%20shake/pistache_15dt.jpeg', text: 'milkshake pistache', pos: '50% 50%' } },
  { common: 'Pistache Bianca', binomial: 'Pistache bianca, 15DT', photo: { url: '/milk%20shake/pistache_bianca_15dt.jpeg', text: 'milkshake pistache bianca', pos: '50% 50%' } },
  { common: 'Vanille', binomial: 'Vanille, 13DT', photo: { url: '/milk%20shake/vanille_13dt.jpeg', text: 'milkshake vanille', pos: '50% 50%' } },
];

export default function MilkshakeGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
