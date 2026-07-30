'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const specialitesItems: GalleryItem[] = [
  {
    common: 'Bubble Waffle',
    binomial: 'Gaufre bubble, 14DT',
    photo: {
      url: '/nos%20specialites/Bubble_waffle_14dt.jpeg',
      text: 'bubble waffle glacé',
      pos: '50% 50%'
    }
  },
  {
    common: 'Ice Cream Spaghetti',
    binomial: 'Spaghetti glacé, 14DT',
    photo: {
      url: '/nos%20specialites/Ice_cream_spaghetti_14dt.jpeg',
      text: 'spaghetti glacé à la crème',
      pos: '50% 50%'
    }
  },
  {
    common: 'Layered Ice Cream',
    binomial: 'Coupe glacée 2 toppings, 18DT',
    photo: {
      url: '/nos%20specialites/Layered_ice_cream_+2_toppings_18dt.jpeg',
      text: 'coupe glacée layered avec toppings',
      pos: '50% 50%'
    }
  },
  {
    common: 'Ice Cream Slice',
    binomial: 'Tranche glacée 1 topping, 15DT',
    photo: {
      url: '/nos%20specialites/Ice_cream_slice_+1_topping_15dt.jpeg',
      text: 'tranche de glace avec topping',
      pos: '50% 50%'
    }
  },
  {
    common: 'Croissant Farci',
    binomial: 'Croissant farci 2 boules, 12DT',
    photo: {
      url: '/nos%20specialites/Croissant_farci_2_boules_12dt.jpeg',
      text: 'croissant farci à la glace',
      pos: '50% 50%'
    }
  },
  {
    common: 'Banana Split',
    binomial: 'Banana split, 20DT',
    photo: {
      url: '/nos%20specialites/Banana_split_20dt.jpeg',
      text: 'banana split glacé',
      pos: '50% 50%'
    }
  }
];

export default function NosSpecialites() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={specialitesItems} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
