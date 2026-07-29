'use client';

import Masonry, { MasonryItem } from './Masonry';

const items: MasonryItem[] = [
  { id: 1, img: '/mansory_pastry/crepe_sucree.jpeg',     title: 'Crêpes Sucrées',     height: 600 },
  { id: 2, img: '/mansory_pastry/Crepe_salee.jpeg',      title: 'Crêpes Salées',      height: 800 },
  { id: 3, img: '/mansory_pastry/gauffre.jpeg',           title: 'Gaufres',            height: 500 },
  { id: 4, img: '/mansory_pastry/croque-monsieur.jpeg',   title: 'Croques-Monsieur',   height: 700 },
  { id: 5, img: '/mansory_pastry/Pain_Perdu_16dt.jpeg',   title: 'Pain Perdu — 16DT',  height: 650 },
  { id: 6, img: '/mansory_pastry/Gateau.jpeg',            title: 'Gâteaux',            height: 900 },
  { id: 7, img: '/mansory_pastry/Menu_Enfant_13dt.jpeg',  title: 'Menu Enfant — 13DT', height: 500 },
  { id: 8, img: '/mansory_pastry/pancakes.jpeg',          title: 'Pancakes',           height: 750 },
  { id: 9, img: '/mansory_pastry/Panini.jpeg',            title: 'Paninis',            height: 600 },
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
