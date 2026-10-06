import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Navigation, Compass, Calendar, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { lodgeInfo } from '../../data/lodgeData';
import { Card3D } from '../common/Card3D';
import { RangeCalendarModal, formatDisplayDate, formatDateKey, calculateNights } from '../common/RangeCalendarModal';

interface LocationSectionProps {
  onOpenBooking?: (roomName?: string, checkInDate?: string, checkOutDate?: string) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenBooking }) => {
  // Pre-seed with tomorrow to day after tomorrow for instant usability
  const initialDates = () => {
    const d1 = new Date();
    d1.setDate(d1.getDate() + 1);
    const d2 = new Date();
    d2.setDate(d2.getDate() + 2);
    return {
      start: formatDateKey(d1),
      end: formatDateKey(d2),
    };
  };

  const [checkIn, setCheckIn] = useState(() => initialDates().start);
  const [checkOut, setCheckOut] = useState(() => initialDates().end);
  const [guests, setGuests] = useState('2 Guests');
  const [roomType, setRoomType] = useState('Standard Room');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeCalendarField, setActiveCalendarField] = useState<'checkIn' | 'checkOut'>('checkIn');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking(roomType, checkIn, checkOut);
    }
  };

  return (
    <section id="location" className="py-20 sm:py-28 px-4 sm:px-8 bg-lodge-soft border-y border-lodge-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-lodge-surface border border-lodge-border text-lodge-primary text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Location &amp; Direct Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-lodge-dark mb-4">
            Location &amp; Travel Directions
          </h2>
          <p className="text-base text-lodge-muted leading-relaxed font-light">
            Conveniently located right along the Pollachi &ndash; Valparai Main Road, 1.2 km before Aliyar Dam. Plan your stay or get direct travel directions below.
          </p>
        </div>

        {/* =========================================================================
            CLEAN TWO-COLUMN GRID:
            Left Column: Address, landmark details, travel times, and map buttons
            Right Column: Embedded "Plan Your Stay" booking card (#plan-your-stay)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: ADDRESS, LANDMARKS, TIMINGS & TRAVEL DIRECTIONS
              ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 h-full flex flex-col justify-between"
          >
            <Card3D maxTilt={5} scale={1.01} className="h-full">
              <div className="card-luxury p-8 sm:p-10 flex flex-col justify-between h-full transform-style-3d bg-white">
                <div>
                  {/* Lodge Header */}
                  <div className="pb-6 border-b border-lodge-border/80 mb-6 translate-z-20">
                    <span className="text-[11px] uppercase tracking-[0.08em] text-lodge-secondary font-semibold block mb-1">
                      Foothill Hospitality Since 1980
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-lodge-dark tracking-tight">
                      Sri Balaji Lodge
                    </h3>
                    <address className="not-italic text-sm text-lodge-muted leading-relaxed font-light mt-2">
                      Annu Nagar, Aliyar, <br />
                      Valparai Main Road, Pollachi Taluk, <br />
                      Tamil Nadu &ndash; 642101
                    </address>
                    <p className="text-xs text-lodge-secondary mt-2 flex items-center gap-1.5 font-medium">
                      <Compass className="w-3.5 h-3.5 text-lodge-primary" />
                      <span>Landmark: 1.2 km before Aliyar Dam, on the main highway</span>
                    </p>
                  </div>

                  {/* Check-in / Check-out Details */}
                  <div className="grid grid-cols-2 gap-4 pb-6 border-b border-lodge-border/80 mb-6 text-xs translate-z-20">
                    <div className="p-3.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)]">
                      <span className="text-lodge-muted block font-light">Check-in Time</span>
                      <span className="font-semibold text-lodge-dark text-sm mt-0.5 block">12:00 PM</span>
                      <span className="text-[11px] text-lodge-muted font-light">Early check-in on request</span>
                    </div>
                    <div className="p-3.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)]">
                      <span className="text-lodge-muted block font-light">Check-out Time</span>
                      <span className="font-semibold text-lodge-dark text-sm mt-0.5 block">11:00 AM</span>
                      <span className="text-[11px] text-lodge-muted font-light">Late checkout on request</span>
                    </div>
                  </div>

                  {/* Driving Distances */}
                  <div className="text-xs text-lodge-muted mb-8 space-y-2.5 font-light translate-z-10">
                    <div className="flex justify-between pb-1.5 border-b border-lodge-border/40">
                      <span>From Pollachi Town / Railway Station</span>
                      <span className="font-medium text-lodge-dark">24 km &middot; 30 mins</span>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-lodge-border/40">
                      <span>From Coimbatore International Airport</span>
                      <span className="font-medium text-lodge-dark">68 km &middot; 1 hr 45 mins</span>
                    </div>
                    <div className="flex justify-between">
                      <span>From Valparai Hill Station</span>
                      <span className="font-medium text-lodge-dark">42 km &middot; 1 hr 30 mins</span>
                    </div>
                  </div>

                  {/* Compact Map Window */}
                  <div className="relative w-full h-[180px] overflow-hidden rounded-none border border-[rgba(18,58,99,0.12)] mb-8">
                    <iframe
                      title="Sri Balaji Lodge Location on Google Maps"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.3642398717833!2d76.97232237583688!3d10.491223964724943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba836b28054c2ab%3A0xebe769b7636e053f!2sSri%20Balaji%20Lodge!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      className="w-full h-full border-0 absolute inset-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

                {/* Direct Action Buttons with 48px Minimum Height & Z-Lift */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 translate-z-30">
                  <a
                    href="https://maps.google.com/?q=Sri+Balaji+Lodge+Aliyar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-blue-luxury flex-1 py-3 px-5 text-xs sm:text-sm font-semibold gap-2 shadow-md min-h-[48px] rounded-none"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`}
                    className="py-3 px-5 rounded-none bg-lodge-surface border border-[rgba(18,58,99,0.12)] text-lodge-dark text-xs sm:text-sm font-semibold hover:bg-lodge-soft hover:text-lodge-primary transition-all flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-lodge-primary" />
                    <span>Call Desk</span>
                  </a>

                  <a
                    href={`https://wa.me/${lodgeInfo.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Sri Balaji Lodge, I am inquiring about room availability and directions.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-none bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-semibold hover:bg-emerald-100 transition-all flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>
            </Card3D>
          </motion.div>

          {/* =====================================================================
              RIGHT COLUMN: RELOCATED "PLAN YOUR STAY" RESERVATION FORM CARD
              Anchor: #plan-your-stay (Smooth scrolled from header CTA buttons)
              ===================================================================== */}
          <motion.div
            id="plan-your-stay"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 h-full scroll-mt-28"
          >
            <Card3D maxTilt={5} scale={1.01} className="h-full">
              <div className="card-luxury p-8 sm:p-10 flex flex-col justify-between h-full transform-style-3d bg-white border border-[rgba(18,58,99,0.12)] shadow-[0_20px_50px_rgba(18,35,60,0.08)]">
                <div>
                  {/* Card Header with Z-depth */}
                  <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 mb-6 border-b border-lodge-border/80 translate-z-20">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-none bg-lodge-surface text-[10px] tracking-wider uppercase font-semibold text-lodge-primary mb-1.5 border border-lodge-border">
                        <span>Direct Booking</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold text-lodge-dark tracking-tight">
                        Plan Your Stay
                      </h3>
                      <p className="text-xs sm:text-sm text-lodge-muted font-light mt-0.5">
                        Check availability directly with our 24/7 front desk
                      </p>
                    </div>

                    <div className="text-right translate-z-20">
                      <span className="text-[10px] uppercase tracking-[0.08em] text-lodge-secondary font-semibold block">Starting</span>
                      <span className="text-2xl font-semibold text-lodge-primary">&#8377;1,200</span>
                      <span className="text-xs text-lodge-muted font-light"> / night</span>
                    </div>
                  </div>

                  {/* Form UI */}
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    {/* Check-in & Check-out Date Triggers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 translate-z-20">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="label-luxury-light mb-0">Check-in Date</label>
                          <span className="text-[10px] text-lodge-secondary font-medium">12:00 PM</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCalendarField('checkIn');
                            setIsCalendarOpen(true);
                          }}
                          className="input-luxury-light w-full px-3.5 py-2.5 flex items-center justify-between text-left group hover:border-lodge-primary transition-colors focus-visible:border-lodge-primary"
                          aria-label="Select Check-in date"
                        >
                          <span className={`text-xs sm:text-sm ${checkIn ? 'text-lodge-dark font-medium' : 'text-lodge-muted'}`}>
                            {checkIn ? formatDisplayDate(checkIn) : 'Select Arrival'}
                          </span>
                          <Calendar className="w-4 h-4 text-lodge-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="label-luxury-light mb-0">Check-out Date</label>
                          <span className="text-[10px] text-lodge-secondary font-medium">11:00 AM</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCalendarField('checkOut');
                            setIsCalendarOpen(true);
                          }}
                          className="input-luxury-light w-full px-3.5 py-2.5 flex items-center justify-between text-left group hover:border-lodge-primary transition-colors focus-visible:border-lodge-primary"
                          aria-label="Select Check-out date"
                        >
                          <span className={`text-xs sm:text-sm ${checkOut ? formatDisplayDate(checkOut) : 'Select Departure'}`}>
                            {checkOut ? formatDisplayDate(checkOut) : 'Select Departure'}
                          </span>
                          <Calendar className="w-4 h-4 text-lodge-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                    </div>

                    {/* Stay Duration Micro Tag */}
                    {checkIn && checkOut && (
                      <div className="flex items-center justify-between px-3.5 py-2 bg-lodge-surface border border-lodge-border text-xs text-lodge-dark translate-z-20">
                        <span className="flex items-center gap-1.5 text-lodge-primary font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-lodge-primary" />
                          <span>Reserved Stay Duration</span>
                        </span>
                        <span className="font-semibold text-lodge-primary">
                          {calculateNights(checkIn, checkOut)} {calculateNights(checkIn, checkOut) === 1 ? 'Night' : 'Nights'}
                        </span>
                      </div>
                    )}

                    {/* Guests & Room Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 translate-z-20">
                      <div>
                        <label className="label-luxury-light">Guests &amp; Occupants</label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="input-luxury-light w-full px-3.5 py-2.5 min-h-[48px] cursor-pointer appearance-none text-xs sm:text-sm"
                        >
                          <option value="1 Guest">1 Guest</option>
                          <option value="2 Guests">2 Guests</option>
                          <option value="3 Guests">3 Guests</option>
                          <option value="4+ Guests">4+ Guests (Family)</option>
                        </select>
                      </div>

                      <div>
                        <label className="label-luxury-light">Preferred Room</label>
                        <select
                          value={roomType}
                          onChange={(e) => setRoomType(e.target.value)}
                          className="input-luxury-light w-full px-3.5 py-2.5 min-h-[48px] cursor-pointer appearance-none text-xs sm:text-sm"
                        >
                          <option value="Standard Room">Standard Room (&#8377;1,200/night)</option>
                          <option value="Deluxe Room">Deluxe AC Room (&#8377;1,800/night)</option>
                          <option value="Family Room">Family Suite Room (&#8377;2,800/night)</option>
                        </select>
                      </div>
                    </div>

                    {/* Included Amenities Checklist */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-lodge-muted translate-z-10">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Hot Water Geysers</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Gated Parking</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>24/7 Desk Check-in</span>
                      </div>
                    </div>

                    {/* Primary High-Contrast Modern Button */}
                    <div className="translate-z-30 pt-3">
                      <button
                        type="submit"
                        className="btn-blue-luxury w-full min-h-[50px] py-3.5 px-6 text-sm sm:text-base font-semibold gap-2.5 shadow-md group"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Check Availability &amp; Book</span>
                        <ArrowUpRight className="w-4 h-4 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Sub-card confirmation link */}
                <div className="mt-5 pt-4 border-t border-lodge-border/80 text-center translate-z-10">
                  <a
                    href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`}
                    className="text-xs text-lodge-muted hover:text-lodge-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Prefer instant phone booking?</span>
                    <span className="underline font-semibold text-lodge-primary">Call Front Desk ({lodgeInfo.phonePrimary})</span>
                  </a>
                </div>

              </div>
            </Card3D>

            {/* Interactive Range Calendar Popup Modal */}
            <RangeCalendarModal
              isOpen={isCalendarOpen}
              onClose={() => setIsCalendarOpen(false)}
              startDate={checkIn}
              endDate={checkOut}
              activeField={activeCalendarField}
              onSelectRange={(start, end) => {
                setCheckIn(start);
                setCheckOut(end);
              }}
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default LocationSection;