import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileStickyBar } from './components/common/MobileStickyBar';
import { RoomDetailModal } from './components/common/RoomDetailModal';
import { BookingInquiryModal } from './components/common/BookingInquiryModal';

// 12-Section Architecture per Master Prompt Specification
import { Hero } from './components/sections/Hero';
import { Introduction } from './components/sections/Introduction';
import { RoomsSection } from './components/sections/RoomsSection';
import { ComfortSection } from './components/sections/ComfortSection';
import { ValparaiGateway } from './components/sections/ValparaiGateway';
import { GallerySection } from './components/sections/GallerySection';
import { HeritageSection } from './components/sections/HeritageSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { LocationSection } from './components/sections/LocationSection';
import { FinalCTA } from './components/sections/FinalCTA';

import { Room } from './types/lodge';

export const App: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedRoomName, setPreselectedRoomName] = useState<string | undefined>(undefined);
  const [preselectedDates, setPreselectedDates] = useState<{ start?: string; end?: string }>({});

  const handleOpenBooking = (roomName?: string, checkInDate?: string, checkOutDate?: string) => {
    setPreselectedRoomName(roomName);
    setPreselectedDates({ start: checkInDate, end: checkOutDate });
    setIsBookingOpen(true);
  };

  const handleBookFromRoom = (roomName: string) => {
    setPreselectedRoomName(roomName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-lodge-bg text-lodge-dark">
      {/* 01 - Floating Navigation */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Experience Flow */}
      <main id="main-content" tabIndex={-1} className="outline-none flex-1">
        {/* 02 - Fullscreen Scenic Hero with Layered Composition & Booking Card */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 03 - Minimal Introduction (Asymmetrical Editorial Layout) */}
        <Introduction />

        {/* 04 - Rooms & Transparent Tariffs (Primary Conversion Section) */}
        <RoomsSection
          onSelectRoom={setSelectedRoom}
          onBookRoom={handleBookFromRoom}
        />

        {/* 05 - Essential Comfort (4 Curated Feature Pillars) */}
        <ComfortSection />

        {/* 06 - Gateway to Valparai (Scenic Composition & Distance Guide) */}
        <ValparaiGateway />

        {/* 07 - Editorial Photo Gallery with Clean Lightbox */}
        <GallerySection />

        {/* 08 - Heritage (Welcoming Travellers Since 1980) */}
        <HeritageSection />

        {/* 09 - Verified Guest Reviews & Google Rating */}
        <ReviewsSection />

        {/* 10 - Location & Travel Directions (Map + Relocated Plan Your Stay Card) */}
        <LocationSection onOpenBooking={handleOpenBooking} />

        {/* 11 - Final Emotional Call to Action */}
        <FinalCTA onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* 12 - Hospitality Footer */}
      <Footer />

      {/* Mobile Sticky Floating Action Bar */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />

      {/* Room Detail Modal Dialog */}
      <RoomDetailModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onBookRoom={handleBookFromRoom}
      />

      {/* Direct Booking Inquiry Modal Dialog */}
      <BookingInquiryModal
        isOpen={isBookingOpen}
        preselectedRoom={preselectedRoomName}
        preselectedCheckIn={preselectedDates.start}
        preselectedCheckOut={preselectedDates.end}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default App;