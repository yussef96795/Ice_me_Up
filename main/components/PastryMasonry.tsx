'use client';

import Masonry, { MasonryItem } from './Masonry';

const items: MasonryItem[] = [
  { id: 1, img: '/mansory_pastry/crepe_sucree.webp',     title: 'Crêpes Sucrées',     height: 600 },
  { id: 2, img: '/mansory_pastry/Crepe_salee.webp',      title: 'Crêpes Salées',      height: 800 },
  { id: 3, img: '/mansory_pastry/gauffre.webp',           title: 'Gaufres',            height: 500 },
  { id: 4, img: '/mansory_pastry/croque-monsieur.webp',   title: 'Croques-Monsieur',   height: 700 },
  { id: 5, img: '/mansory_pastry/Pain_Perdu_16dt.webp',   title: 'Pain Perdu — 16DT',  height: 650 },
  { id: 6, img: '/mansory_pastry/Gateau.webp',            title: 'Gâteaux',            height: 900 },
  { id: 7, img: '/mansory_pastry/Menu_Enfant_13dt.webp',  title: 'Menu Enfant — 13DT', height: 500 },
  { id: 8, img: '/mansory_pastry/pancakes.webp',          title: 'Pancakes',           height: 750 },
  { id: 9, img: '/mansory_pastry/Panini.webp',            title: 'Paninis',            height: 600 },
];

export default function PastryMasonry({
  onItemClick,
}: {
  onItemClick?: (item: MasonryItem) => void;
}) {
  return (
    <Masonry
      items={items}
      animateFrom="bottom"
      blurToFocus
      stagger={0.05}
      onItemClick={onItemClick}
    />
  );
}
