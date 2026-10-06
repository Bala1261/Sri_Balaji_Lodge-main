import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Phone, MessageSquare, ShieldCheck, Calendar } from 'lucide-react';
import { roomsData, lodgeInfo } from '../../data/lodgeData';
import { RangeCalendarModal, formatDisplayDate } from './RangeCalendarModal';

interface BookingInquiryModalProps {
  isOpen: boolean;
  preselectedRoom?: string;
  preselectedCheckIn?: string;
  preselectedCheckOut?: string;
  onClose: () => void;
}

export const BookingInquiryModal: React.FC<BookingInquiryModalProps> = ({
  isOpen,
  preselectedRoom,
  preselectedCheckIn,
  preselectedCheckOut,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState(preselectedCheckIn || '');
  const [checkOut, setCheckOut] = useState(preselectedCheckOut || '');
  const [room, setRoom] = useState(preselectedRoom || roomsData[0].name);
  const [guests, setGuests] = useState('2 Guests');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeCalendarField, setActiveCalendarField] = useState<'checkIn' | 'checkOut'>('checkIn');

  useEffect(() => {
    if (preselectedRoom) {
      setRoom(preselectedRoom);
    }
  }, [preselectedRoom]);

  useEffect(() => {
    if (preselectedCheckIn) setCheckIn(preselectedCheckIn);
    if (preselectedCheckOut) setCheckOut(preselectedCheckOut);
  }, [preselectedCheckIn, preselectedCheckOut]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Sri Balaji Lodge (Aliyar),
I would like to inquire about room availability.

Details:
• Name: ${name || 'Traveller'}
• Contact: ${phone || 'Not provided'}
• Room: ${room}
• Guests: ${guests}
• Check-in: ${checkIn || 'To be confirmed'}
• Check-out: ${checkOut || 'To be confirmed'}

Could you please confirm availability and provide check-in assistance?`;

    const whatsappUrl = `https://wa.me/${lodgeInfo.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Ultra-Light & Airy Glassmorphism Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 modal-backdrop-glass"
        />

        {/* Modal Window with Refined Card Styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white rounded-none border border-[rgba(18,58,99,0.08)] shadow-2xl overflow-hidden z-10 my-auto text-lodge-dark"
        >
          {/* Close Button with 48px Touch Area */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-12 h-12 rounded-none bg-lodge-soft text-lodge-muted hover:text-lodge-dark hover:bg-lodge-surface flex items-center justify-center transition-colors min-h-[48px] min-w-[48px]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-6 sm:p-8 pb-4 border-b border-lodge-border/80 bg-lodge-soft/70">
            <span className="text-[11px] uppercase tracking-[0.08em] text-lodge-secondary font-semibold block mb-1">
              Direct Front Desk Inquiry
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-lodge-dark tracking-tight">
              Check Room Availability
            </h3>
            <p className="text-xs text-lodge-muted mt-1 font-light leading-relaxed">
              We respond promptly with real-time room availability, parking allocation, and directions.
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-none bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-lodge-dark mb-2 tracking-tight">
                  Inquiry Dispatched to Front Desk
                </h4>
                <p className="text-xs text-lodge-muted leading-relaxed max-w-sm mx-auto mb-6 font-light">
                  Thank you! WhatsApp has opened with your inquiry details. Our reception desk will confirm your room and parking space shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`}
                    className="btn-blue-luxury min-h-[48px] py-2.5 px-5 text-xs font-semibold shadow-md rounded-none"
                  >
                    Call Now: {lodgeInfo.phonePrimary}
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      onClose();
                    }}
                    className="py-2.5 px-5 rounded-none bg-lodge-soft border border-lodge-border text-xs font-medium text-lodge-dark hover:bg-lodge-surface transition-colors min-h-[48px]"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                {/* Interactive Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label-luxury-light">
                      Check-in Date
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCalendarField('checkIn');
                        setIsCalendarOpen(true);
                      }}
                      className="input-luxury-light w-full px-3 py-2 min-h-[48px] flex items-center justify-between text-left group hover:border-lodge-primary/40 transition-colors"
                      aria-label="Select Check-in date"
                    >
                      <span className={`text-xs ${checkIn ? 'text-lodge-dark font-medium' : 'text-lodge-muted/50'}`}>
                        {checkIn ? formatDisplayDate(checkIn) : 'Select Arrival'}
                      </span>
                      <Calendar className="w-3.5 h-3.5 text-lodge-primary opacity-70 group-hover:opacity-100" />
                    </button>
                  </div>

                  <div>
                    <label className="label-luxury-light">
                      Check-out Date
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCalendarField('checkOut');
                        setIsCalendarOpen(true);
                      }}
                      className="input-luxury-light w-full px-3 py-2 min-h-[48px] flex items-center justify-between text-left group hover:border-lodge-primary/40 transition-colors"
                      aria-label="Select Check-out date"
                    >
                      <span className={`text-xs ${checkOut ? formatDisplayDate(checkOut) : 'Select Departure'}`}>
                        {checkOut ? formatDisplayDate(checkOut) : 'Select Departure'}
                      </span>
                      <Calendar className="w-3.5 h-3.5 text-lodge-primary opacity-70 group-hover:opacity-100" />
                    </button>
                  </div>
                </div>

                {/* Room Preference & Guests */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label-luxury-light">
                      Room Preference
                    </label>
                    <select
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="input-luxury-light w-full px-3 py-2 min-h-[48px] cursor-pointer appearance-none"
                    >
                      {roomsData.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name} (&#8377;{r.pricePerNight})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-luxury-light">
                      Number of Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="input-luxury-light w-full px-3 py-2 min-h-[48px] cursor-pointer appearance-none"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4+ Guests">4+ Guests (Family)</option>
                    </select>
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="label-luxury-light">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anand Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-luxury-light w-full px-3 py-2 min-h-[48px] placeholder:text-lodge-muted/50"
                    />
                  </div>

                  <div>
                    <label className="label-luxury-light">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-luxury-light w-full px-3 py-2 min-h-[48px] placeholder:text-lodge-muted/50"
                    />
                  </div>
                </div>

                {/* Direct Action Buttons with 48px Minimum Height */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    className="btn-blue-luxury w-full min-h-[48px] py-3.5 px-4 text-xs sm:text-sm font-semibold gap-2 shadow-md rounded-none"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-200" />
                    <span>Inquire via WhatsApp</span>
                  </button>

                  <a
                    href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`}
                    className="w-full min-h-[48px] py-2.5 px-4 rounded-none bg-lodge-soft border border-lodge-border text-lodge-dark text-xs font-medium hover:bg-lodge-surface flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-lodge-primary" />
                    <span>Or Call Front Desk: {lodgeInfo.phonePrimary}</span>
                  </a>
                </div>
              </form>
            )}

            <div className="mt-4 pt-3.5 border-t border-lodge-border/70 text-center">
              <span className="text-[11px] text-lodge-muted flex items-center justify-center gap-1.5 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-lodge-primary" />
                <span>Direct front desk reservation &middot; Established 1980</span>
              </span>
            </div>
          </div>

          {/* Interactive Range Calendar Popup */}
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
    </AnimatePresence>
  );
};