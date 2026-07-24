'use client';

import { useState } from 'react';
import FrameSequence from './components/FrameSequence';
import HeroOverlay from './components/HeroOverlay';
import FlavourModal from './components/FlavourModal';
import LocationOverlay from './components/LocationOverlay';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <main>
      <FrameSequence />
      <HeroOverlay
        onOpenMenu={() => setMenuOpen(true)}
        onOpenLocations={() => setLocationOpen(true)}
      />
      <FlavourModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <LocationOverlay isOpen={locationOpen} onClose={() => setLocationOpen(false)} />
    </main>
  );
}