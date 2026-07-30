'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';
import TiltedCard from './TiltedCard';

interface YaourtsGalleryProps {
  toppings: number;
  basePrice: number;
}

export default function YaourtsGallery({ toppings, basePrice }: YaourtsGalleryProps) {
  const toppingCost = toppings === 0 ? 0 : toppings === 1 ? 4 : 7;
  const price = basePrice + toppingCost;

  const oneToppingItems: GalleryItem[] = [
    {
      common: 'Fruits Rouges',
      binomial: `${price}DT`,
      photo: { url: '/yaourts%20glaces/fruits_rouges_1%20topping.jpeg', text: 'yaourt glacé fruits rouges', pos: '50% 50%' }
    },
    {
      common: 'Pistache',
      binomial: `${price}DT`,
      photo: { url: '/yaourts%20glaces/pistache_1topping.jpeg', text: 'yaourt glacé pistache', pos: '50% 50%' }
    },
    {
      common: 'Speculoos',
      binomial: `${price}DT`,
      photo: { url: '/yaourts%20glaces/speculoos_1%20topping.jpeg', text: 'yaourt glacé speculoos', pos: '50% 50%' }
    }
  ];

  const twoToppingItems: GalleryItem[] = [
    {
      common: 'Dubaï',
      binomial: `${price}DT`,
      photo: { url: '/yaourts%20glaces/dubai_2%20toppings.jpeg', text: 'yaourt glacé dubaï', pos: '50% 50%' }
    },
    {
      common: 'Fraise Pistache Kunefa',
      binomial: `${price}DT`,
      photo: { url: '/yaourts%20glaces/frasie_pistache_kunefa_2%20toppings.jpeg', text: 'yaourt glacé fraise pistache kunefa', pos: '50% 50%' }
    }
  ];

  if (toppings === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <TiltedCard
          imageSrc="/yaourts%20glaces/classique_0toppings.jpeg"
          altText="yaourt glacé classique"
          captionText=""
          containerHeight="400px"
          containerWidth="400px"
          imageHeight="400px"
          imageWidth="400px"
          rotateAmplitude={12}
          scaleOnHover={1.05}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent
          overlayContent={`${price}DT · Classique` as any}
        />
      </div>
    );
  }

  const items = toppings === 2 ? twoToppingItems : oneToppingItems;
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
