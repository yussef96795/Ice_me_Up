'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const items: GalleryItem[] = [
  { common: 'Iced Matcha', binomial: 'Matcha glacé, 8DT', photo: { url: '/matcha/Iced_matcha_8dt.webp', text: 'iced matcha', pos: '50% 50%' } },
  { common: 'Strawberry Matcha', binomial: 'Matcha fraise, 9DT', photo: { url: '/matcha/Strawberry_matcha_9dt.webp', text: 'strawberry matcha', pos: '50% 50%' } },
  { common: 'Vanilla Matcha', binomial: 'Matcha vanille, 9DT', photo: { url: '/matcha/Vanilla_matcha_9dt.webp', text: 'vanilla matcha', pos: '50% 50%' } },
];

export default function MatchaGallery() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularGallery items={items} radius={500} autoRotateSpeed={0.015} />
    </div>
  );
}
