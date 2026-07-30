'use client';

import { useState } from 'react';
import FrameSequence from './components/FrameSequence';
import HeroOverlay from './components/HeroOverlay';
import PastryMenu from './components/PastryMenu';
import LocationOverlay from './components/LocationOverlay';
import GelatoMenu from './components/GelatoMenu';
import DrinksMenu from './components/DrinksMenu';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gelatoMenuOpen, setGelatoMenuOpen] = useState(false);
  const [drinksMenuOpen, setDrinksMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <main>
      <FrameSequence />
      <HeroOverlay
        onOpenMenu={() => setMenuOpen(true)}
        onOpenGelato={() => setGelatoMenuOpen(true)}
        onOpenDrinks={() => setDrinksMenuOpen(true)}
        onOpenLocations={() => setLocationOpen(true)}
      />
      <PastryMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <GelatoMenu isOpen={gelatoMenuOpen} onClose={() => setGelatoMenuOpen(false)} />
      <DrinksMenu isOpen={drinksMenuOpen} onClose={() => setDrinksMenuOpen(false)} />
      <LocationOverlay isOpen={locationOpen} onClose={() => setLocationOpen(false)} />
    </main>
  );
}