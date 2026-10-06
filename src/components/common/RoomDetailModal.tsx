import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, BedDouble, Bath, Check, Phone, MessageSquare, ArrowUpRight, Camera } from 'lucide-react';
import { Room } from '../../types/lodge';
import { lodgeInfo } from '../../data/lodgeData';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (roomName: string) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, onClose, onBookRoom }) => {
  const [activeImg, setActiveImg] = useState<string>(room?.image || '');

  useEffect(() => {
    if (room) {
      setActiveImg(room.image);
    }
  }, [room]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (room) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [room, onClose]);

  if (!room) return null;

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
          className="relative w-full max-w-2xl bg-white rounded-none border border-[rgba(18,58,99,0.08)] shadow-2xl overflow-hidden z-10 my-auto text-lodge-dark"
        >
          {/* Close Button with 48px Touch Target */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-12 h-12 rounded-none bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 flex items-center justify-center transition-colors min-h-[48px] min-w-[48px]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Room Photo Banner with Glassmorphism Overlay */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-lodge-soft">
            <img
              src={activeImg || room.image}
              alt={room.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6">
              <div className="glass-ultra-dark p-4 rounded-none text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.08em] text-blue-300 font-semibold block mb-0.5">
                    {room.acOption}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {room.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-semibold text-white">&#8377;{room.pricePerNight.toLocaleString()}</span>
                  <span className="text-xs text-white/80 block font-light"> / night</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Thumbnail Selector */}
          {room.secondaryImages && room.secondaryImages.length > 0 && (
            <div className="px-6 sm:px-8 py-2.5 bg-lodge-soft/60 flex items-center gap-2 overflow-x-auto border-b border-lodge-border/80">
              <span className="text-[11px] text-lodge-muted font-medium mr-1 flex items-center gap-1 whitespace-nowrap">
                <Camera className="w-3.5 h-3.5 text-lodge-primary" />
                <span>Photos:</span>
              </span>
              {[room.image, ...room.secondaryImages].map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(img)}
                  className={`w-14 h-10 overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImg === img ? 'border-lodge-primary scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${i + 1}`}
                >
                  <img src={img} alt={`${room.name} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Modal Content */}
          <div className="p-6 sm:p-8 max-h-[55vh] overflow-y-auto">
            {/* Quick Spec Pills */}
            <div className="flex flex-wrap gap-2.5 pb-6 border-b border-lodge-border/80 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium">
                <Users className="w-3.5 h-3.5 text-lodge-primary" />
                <span>Max {room.maxGuests} Guests</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium">
                <BedDouble className="w-3.5 h-3.5 text-lodge-primary" />
                <span>{room.bedType}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium">
                <Bath className="w-3.5 h-3.5 text-lodge-primary" />
                <span>Attached Bath & Geyser</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium">
                <span>{room.roomSize}</span>
              </span>
            </div>

            {/* Detailed Description */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-lodge-dark uppercase tracking-[0.08em] mb-2">
                Room Overview
              </h4>
              <p className="text-sm text-lodge-muted leading-relaxed font-light">
                {room.detailedDescription}
              </p>
            </div>

            {/* Room Amenities */}
            <div>
              <h4 className="text-xs font-semibold text-lodge-dark uppercase tracking-[0.08em] mb-3">
                Key Inclusions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-lodge-muted font-light">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-lodge-primary flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Actions Footer with 48px Accessible Tap Targets */}
          <div className="p-4 sm:p-6 bg-lodge-soft/80 border-t border-lodge-border/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`}
                className="flex-1 sm:flex-none min-h-[48px] py-2.5 px-4 rounded-none bg-white border border-[rgba(18,58,99,0.12)] text-lodge-dark text-xs font-medium hover:bg-lodge-surface flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-lodge-primary" />
                <span>Call Desk</span>
              </a>

              <a
                href={`https://wa.me/${lodgeInfo.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello Sri Balaji Lodge, I am inquiring to book the ${room.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none min-h-[48px] py-2.5 px-4 rounded-none bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium hover:bg-emerald-100 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookRoom(room.name);
              }}
              className="w-full sm:w-auto min-h-[48px] btn-blue-luxury py-2.5 px-6 text-xs sm:text-sm font-semibold shadow-md gap-1.5"
            >
              <span>Check Availability</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};