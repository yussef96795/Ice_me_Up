'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const drinkFlavors: GalleryItem[] = [
  {
    common: 'Milkshake',
    binomial: 'Milkshake crémeux',
    photo: {
      url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=900&auto=format&fit=crop&q=80',
      text: 'creamy milkshake in a tall glass',
      pos: '50% 40%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Smoothie',
    binomial: 'Smoothie tropical frais',
    photo: {
      url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=900&auto=format&fit=crop&q=80',
      text: 'fresh tropical smoothie',
      pos: '45% 35%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Boissons',
    binomial: 'Boissons fraîches',
    photo: {
      url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80',
      text: 'assorted cold drinks',
      pos: '50% 50%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Jus',
    binomial: 'Jus de fruits pressés',
    photo: {
      url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=900&auto=format&fit=crop&q=80',
      text: 'fresh pressed fruit juice',
      pos: '55% 40%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Boissons Chaudes',
    binomial: 'Boissons chaudes réconfortantes',
    photo: {
      url: 'https://images.unsplash.com/photo-1517575640949-817130ae2454?w=900&auto=format&fit=crop&q=80',
      text: 'hot beverage in a cozy cup',
      pos: '48% 45%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Mojito',
    binomial: 'Mojito à la menthe',
    photo: {
      url: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&auto=format&fit=crop&q=80',
      text: 'refreshing mojito with mint',
      pos: '50% 35%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Matcha',
    binomial: 'Matcha latte japonais',
    photo: {
      url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=900&auto=format&fit=crop&q=80',
      text: 'matcha green tea latte',
      pos: '52% 42%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Macchiato',
    binomial: 'Macchiato caramel',
    photo: {
      url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=900&auto=format&fit=crop&q=80',
      text: 'caramel macchiato coffee',
      pos: '47% 48%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Frappuccino',
    binomial: 'Frappuccino glacé',
    photo: {
      url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&auto=format&fit=crop&q=80',
      text: 'iced frappuccino blended drink',
      pos: '50% 40%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Affogato',
    binomial: 'Affogato al caffè',
    photo: {
      url: 'https://images.unsplash.com/photo-1574006852726-31f12ad0deb7?w=900&auto=format&fit=crop&q=80',
      text: 'affogato espresso over gelato',
      pos: '45% 35%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Iced Coffee',
    binomial: 'Café glacé français',
    photo: {
      url: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=900&auto=format&fit=crop&q=80',
      text: 'french iced coffee in a glass',
      pos: '50% 50%',
      by: 'Unsplash'
    }
  }
];

export default function DrinksGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={drinkFlavors} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
