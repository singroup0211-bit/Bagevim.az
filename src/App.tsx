import React, { useState } from 'react';
import { VILLAS, Villa } from './data/villas';
import { VillaFilters } from './utils/ticker';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedVillas } from './components/FeaturedVillas';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { VillaModal } from './components/VillaModal';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<VillaFilters>({
    region: 'Bütün regionlar',
    type: 'Bütün növlər',
  });

  const handleNavigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Floating Translucent Oval Header with 'Bron et' button */}
      <Header
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Infinite Marquee and 'Azərbaycanın bütün bağ evləri' */}
        <HeroSection
          villas={VILLAS}
          onSelectVilla={(villa) => setSelectedVilla(villa)}
          onFilterChange={(filters) => setActiveFilters(filters)}
        />

        {/* Featured Villas Grid Section with Real Photography */}
        <FeaturedVillas
          villas={VILLAS}
          activeFilters={activeFilters}
          onSelectVilla={(villa) => setSelectedVilla(villa)}
          onFilterChange={(filters) => setActiveFilters(filters)}
        />

        {/* About & Trust Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Villa Details & Photo Modal */}
      <VillaModal
        villa={selectedVilla}
        onClose={() => setSelectedVilla(null)}
      />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
