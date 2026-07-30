'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const pastryFlavors: GalleryItem[] = [
  {
    common: 'Crêpes Sucrées',
    binomial: 'Crêpes sucrées',
    photo: {
      url: '/mansory_pastry/crepe_sucree.webp',
      text: 'crêpes sucrées',
      pos: '50% 50%'
    }
  },
  {
    common: 'Crêpes Salées',
    binomial: 'Crêpes salées',
    photo: {
      url: '/mansory_pastry/Crepe_salee.webp',
      text: 'crêpes salées',
      pos: '50% 50%'
    }
  },
  {
    common: 'Gaufres',
    binomial: 'Gaufres croustillantes',
    photo: {
      url: '/mansory_pastry/gauffre.webp',
      text: 'gaufres croustillantes',
      pos: '50% 50%'
    }
  },
  {
    common: 'Croques-Monsieur',
    binomial: 'Croques classiques et gourmets',
    photo: {
      url: '/mansory_pastry/croque-monsieur.webp',
      text: 'croque monsieur grillé',
      pos: '50% 50%'
    }
  },
  {
    common: 'Pain Perdu',
    binomial: 'Pain perdu, 16DT',
    photo: {
      url: '/mansory_pastry/Pain_Perdu_16dt.webp',
      text: 'pain perdu à la vanille',
      pos: '50% 50%'
    }
  },
  {
    common: 'Gâteaux',
    binomial: 'Gâteaux faits maison',
    photo: {
      url: '/mansory_pastry/Gateau.webp',
      text: 'gâteau fait maison',
      pos: '50% 50%'
    }
  },
  {
    common: 'Menu Enfant',
    binomial: 'Menu enfant, 13DT',
    photo: {
      url: '/mansory_pastry/Menu_Enfant_13dt.webp',
      text: 'menu enfant',
      pos: '50% 50%'
    }
  },
  {
    common: 'Pancakes',
    binomial: 'Pancakes moelleux au sirop',
    photo: {
      url: '/mansory_pastry/pancakes.webp',
      text: 'pancakes moelleux',
      pos: '50% 50%'
    }
  },
  {
    common: 'Paninis',
    binomial: 'Paninis grillés au four',
    photo: {
      url: '/mansory_pastry/Panini.webp',
      text: 'panini grillé',
      pos: '50% 50%'
    }
  }
];

export default function PastryGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={pastryFlavors} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
