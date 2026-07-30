'use client';

import Masonry, { MasonryItem } from './Masonry';

const items: MasonryItem[] = [
  { id: 1,  img: '/flavors/Vanilla.webp',                title: 'Vanille',             height: 600 },
  { id: 2,  img: '/flavors/tiramisu.webp',              title: 'Tiramisu',            height: 800 },
  { id: 3,  img: '/flavors/speculoos.webp',             title: 'Spéculoos',           height: 550 },
  { id: 4,  img: '/flavors/snickers.webp',              title: 'Snickers',            height: 700 },
  { id: 5,  img: '/flavors/Salted_caramel.webp',        title: 'Caramel Salé',        height: 600 },
  { id: 6,  img: '/flavors/Pop_corn.webp',              title: 'Pop Corn',            height: 900 },
  { id: 7,  img: '/flavors/Pistachio_framboise.webp',   title: 'Pistache Framboise',  height: 500 },
  { id: 8,  img: '/flavors/Pistachio_cheesecake.webp',  title: 'Pistache Cheesecake', height: 750 },
  { id: 9,  img: '/flavors/Pistachio+noisette.webp',    title: 'Pistache Noisette',   height: 600 },
  { id: 10, img: '/flavors/Pistachio+bacalava.webp',    title: 'Pistache Baklava',    height: 650 },
  { id: 11, img: '/flavors/Pistacchio Praline.webp',     title: 'Praliné Pistache',    height: 800 },
  { id: 12, img: '/flavors/paris_brest.webp',           title: 'Paris-Brest',         height: 550 },
  { id: 13, img: '/flavors/Noisette.webp',              title: 'Noisette',            height: 700 },
  { id: 14, img: '/flavors/Milk Chocolate.webp',         title: 'Chocolat au Lait',    height: 600 },
  { id: 15, img: '/flavors/mango.webp',                 title: 'Mangue',              height: 900 },
  { id: 16, img: '/flavors/mango+coconut.webp',         title: 'Mangue Noix de Coco', height: 500 },
  { id: 17, img: '/flavors/Framboise.webp',             title: 'Framboise',           height: 750 },
  { id: 18, img: '/flavors/Fraise.webp',                 title: 'Fraise',              height: 600 },
  { id: 19, img: '/flavors/ferrero rocher.webp',        title: 'Ferrero Rocher',      height: 650 },
  { id: 20, img: '/flavors/dubai chocolate.webp',       title: 'Dubai Chocolate',     height: 800 },
  { id: 21, img: '/flavors/date+bannana.webp',          title: 'Datte Banane',        height: 550 },
  { id: 22, img: '/flavors/cookies.webp',               title: 'Cookies',             height: 700 },
  { id: 23, img: '/flavors/citron.webp',                title: 'Citron',              height: 600 },
  { id: 24, img: '/flavors/chocolate noir.webp',        title: 'Chocolat Noir',       height: 900 },
  { id: 25, img: '/flavors/chocolat noisette.webp',     title: 'Chocolat Noisette',   height: 500 },
  { id: 26, img: '/flavors/Açaí.webp',                  title: 'Açaí',                height: 750 },
  { id: 27, img: '/flavors/ashta.webp',                 title: 'Ashta',               height: 600 },
  { id: 28, img: '/flavors/amarena.webp',               title: 'Amarena',             height: 650 },
  { id: 29, img: '/flavors/almand_caramel.webp',        title: 'Amande Caramel',      height: 800 },
];

export default function ComposezGallery() {
  return (
    <div className="w-full h-full overflow-y-auto">
      <Masonry
        items={items}
        animateFrom="bottom"
        blurToFocus
        stagger={0.03}
      />
    </div>
  );
}
