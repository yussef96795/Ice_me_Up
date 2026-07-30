'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const hotTeaItems: GalleryItem[] = [
  { common: 'Passion Fruit', binomial: 'Thé passion fruit chaud, 7DT', photo: { url: '/hot%20tea/Passion_fruit_tea_7dt.webp', text: 'thé passion fruit chaud', pos: '50% 50%' } },
  { common: 'Peach', binomial: 'Thé pêche chaud, 7DT', photo: { url: '/hot%20tea/Peach_hot_tea_7dt.webp', text: 'thé pêche chaud', pos: '50% 50%' } },
  { common: 'Pineapple', binomial: 'Thé ananas chaud, 7DT', photo: { url: '/hot%20tea/Pineapple_hot_tea_7dt.webp', text: 'thé ananas chaud', pos: '50% 50%' } },
  { common: 'Strawberry', binomial: 'Thé fraise chaud, 7DT', photo: { url: '/hot%20tea/Strawberry_hot_tea_7dt.webp', text: 'thé fraise chaud', pos: '50% 50%' } },
  { common: 'Sweet Light', binomial: 'Sweet light, 5DT', photo: { url: '/hot%20tea/sweet_light_5dt.webp', text: 'sweet light', pos: '50% 50%' } },
];

const icedTeaItems: GalleryItem[] = [
  { common: 'Passion Fruit', binomial: 'Thé passion fruit glacé, 8DT', photo: { url: '/iced%20tea/passion_fruit_8dt.webp', text: 'thé passion fruit glacé', pos: '50% 50%' } },
  { common: 'Peach', binomial: 'Thé pêche glacé, 8DT', photo: { url: '/iced%20tea/peach_8dt.webp', text: 'thé pêche glacé', pos: '50% 50%' } },
  { common: 'Pineapple', binomial: 'Thé ananas glacé, 8DT', photo: { url: '/iced%20tea/pineapple_8dt.webp', text: 'thé ananas glacé', pos: '50% 50%' } },
  { common: 'Strawberry', binomial: 'Thé fraise glacé, 8DT', photo: { url: '/iced%20tea/strawberry_8dt.webp', text: 'thé fraise glacé', pos: '50% 50%' } },
  { common: 'Sweet Light', binomial: 'Sweet light, 8DT', photo: { url: '/iced%20tea/sweet_light_8dt.webp', text: 'sweet light glacé', pos: '50% 50%' } },
];

interface TeaGalleryProps {
  type?: 'hot' | 'iced';
}

export default function TeaGallery({ type = 'hot' }: TeaGalleryProps) {
  const items = type === 'iced' ? icedTeaItems : hotTeaItems;
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
