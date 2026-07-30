'use client';

import Masonry, { MasonryItem } from './Masonry';

const items: MasonryItem[] = [
  { id: 1,  img: '/flavors/Vanilla.jpg',                title: 'Vanille',             height: 600 },
  { id: 2,  img: '/flavors/tiramisu.jpeg',              title: 'Tiramisu',            height: 800 },
  { id: 3,  img: '/flavors/speculoos.jpeg',             title: 'Spéculoos',           height: 550 },
  { id: 4,  img: '/flavors/snickers.jpeg',              title: 'Snickers',            height: 700 },
  { id: 5,  img: '/flavors/Salted_caramel.jpeg',        title: 'Caramel Salé',        height: 600 },
  { id: 6,  img: '/flavors/Pop_corn.jpeg',              title: 'Pop Corn',            height: 900 },
  { id: 7,  img: '/flavors/Pistachio_framboise.jpeg',   title: 'Pistache Framboise',  height: 500 },
  { id: 8,  img: '/flavors/Pistachio_cheesecake.jpeg',  title: 'Pistache Cheesecake', height: 750 },
  { id: 9,  img: '/flavors/Pistachio+noisette.jpeg',    title: 'Pistache Noisette',   height: 600 },
  { id: 10, img: '/flavors/Pistachio+bacalava.jpeg',    title: 'Pistache Baklava',    height: 650 },
  { id: 11, img: '/flavors/Pistacchio Praline.jpg',     title: 'Praliné Pistache',    height: 800 },
  { id: 12, img: '/flavors/paris_brest.jpeg',           title: 'Paris-Brest',         height: 550 },
  { id: 13, img: '/flavors/Noisette.jpeg',              title: 'Noisette',            height: 700 },
  { id: 14, img: '/flavors/Milk Chocolate.jpg',         title: 'Chocolat au Lait',    height: 600 },
  { id: 15, img: '/flavors/mango.jpeg',                 title: 'Mangue',              height: 900 },
  { id: 16, img: '/flavors/mango+coconut.jpeg',         title: 'Mangue Noix de Coco', height: 500 },
  { id: 17, img: '/flavors/Framboise.jpeg',             title: 'Framboise',           height: 750 },
  { id: 18, img: '/flavors/Fraise.jpg',                 title: 'Fraise',              height: 600 },
  { id: 19, img: '/flavors/ferrero rocher.jpeg',        title: 'Ferrero Rocher',      height: 650 },
  { id: 20, img: '/flavors/dubai chocolate.jpeg',       title: 'Dubai Chocolate',     height: 800 },
  { id: 21, img: '/flavors/date+bannana.jpeg',          title: 'Datte Banane',        height: 550 },
  { id: 22, img: '/flavors/cookies.jpeg',               title: 'Cookies',             height: 700 },
  { id: 23, img: '/flavors/citron.jpeg',                title: 'Citron',              height: 600 },
  { id: 24, img: '/flavors/chocolate noir.jpeg',        title: 'Chocolat Noir',       height: 900 },
  { id: 25, img: '/flavors/chocolat noisette.jpeg',     title: 'Chocolat Noisette',   height: 500 },
  { id: 26, img: '/flavors/Açaí.jpeg',                  title: 'Açaí',                height: 750 },
  { id: 27, img: '/flavors/ashta.jpeg',                 title: 'Ashta',               height: 600 },
  { id: 28, img: '/flavors/amarena.jpeg',               title: 'Amarena',             height: 650 },
  { id: 29, img: '/flavors/almand_caramel.jpeg',        title: 'Amande Caramel',      height: 800 },
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
