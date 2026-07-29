'use client';

import Masonry, { MasonryItem } from './Masonry';

export type { MasonryItem };

const items: MasonryItem[] = [
  { id: 1,  img: '/mansory_drinks/Hot_iced_tea_glasses_202607281958.jpeg',                       title: 'Hot/Iced Tea',     height: 600 },
  { id: 2,  img: '/mansory_drinks/Milkshake_overflowing_with_toppings_202607281958.jpeg',        title: 'Milkshake',        height: 800 },
  { id: 3,  img: '/mansory_drinks/Three_smoothie_glasses_side_by_202607281958.jpeg',             title: 'Smoothie',         height: 550 },
  { id: 4,  img: '/mansory_drinks/Evian_bottle_soda_glass_202607281958.jpeg',                    title: 'Boissons',         height: 700 },
  { id: 5,  img: '/mansory_drinks/Four_fresh_juice_glasses_202607281958.jpeg',                   title: 'Jus',              height: 600 },
  { id: 6,  img: '/mansory_drinks/Espresso_cup_on_caf%C3%A9_table_202607281958.jpeg',            title: 'Boissons Chaudes', height: 900 },
  { id: 7,  img: '/mansory_drinks/Mojito_in_tall_glass_202607281958.jpeg',                       title: 'Mojito',           height: 500 },
  { id: 8,  img: '/mansory_drinks/Matcha_drinks_on_marble_surface_202607281958.jpeg',            title: 'Matcha',           height: 750 },
  { id: 9,  img: '/mansory_drinks/Caramel_macchiato_on_saucer_202607281958.jpeg',                title: 'Macchiato',        height: 600 },
  { id: 10, img: '/mansory_drinks/Frappuccino_with_whipped_cream_c%E2%80%A6_202607281958.jpeg',  title: 'Frappuccino',      height: 650 },
  { id: 11, img: '/mansory_drinks/Affogato_with_vanilla_ice_cream_202607281958.jpeg',            title: 'Affogato',         height: 800 },
  { id: 12, img: '/mansory_drinks/Iced_latte_with_straw_202607281958.jpeg',                      title: 'Iced Coffee',      height: 550 },
  { id: 13, img: '/cafes/Cappuccino_6dt.jpeg',                                                   title: 'Cafés',            height: 700 },
];

export default function DrinksMasonry({
  onItemClick,
}: {
  onItemClick?: (item: MasonryItem) => void;
}) {
  return (
    <Masonry
      items={items}
      animateFrom="bottom"
      blurToFocus
      stagger={0.04}
      onItemClick={onItemClick}
    />
  );
}
