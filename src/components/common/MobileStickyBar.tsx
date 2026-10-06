import React from 'react';
import { Phone, MessageSquare, CalendarDays } from 'lucide-react';
import { lodgeInfo } from '../../data/lodgeData';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  return (
    <aside
      aria-label="Quick mobile booking actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/92 backdrop-blur-[16px] border-t border-[rgba(18,58,99,0.08)] shadow-[0_-10px_25px_-5px_rgba(18,35,60,0.06)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Call Action with 48px Accessible Tap Target */}
        <a
          href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`}
          className="flex-1 min-h-[48px] py-2.5 px-3 rounded-none bg-lodge-soft border border-[rgba(18,58,99,0.1)] text-lodge-dark text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-lodge-surface transition-colors shadow-xs"
          aria-label={`Call Front Desk: ${lodgeInfo.phonePrimary}`}
        >
          <Phone className="w-3.5 h-3.5 text-lodge-primary" />
          <span>Call</span>
        </a>

        {/* WhatsApp Action with 48px Accessible Tap Target */}
        <a
          href={`https://wa.me/${lodgeInfo.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Sri Balaji Lodge, I am inquiring about room availability.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[48px] py-2.5 px-3 rounded-none bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors shadow-xs"
          aria-label="Inquire on WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
          <span>WhatsApp</span>
        </a>

        {/* Check Availability Primary Action with 48px Accessible Tap Target */}
        <button
          onClick={onOpenBooking}
          className="flex-[1.4] min-h-[48px] btn-blue-luxury py-2.5 px-3.5 text-xs font-semibold gap-1.5 shadow-md"
          aria-label="Check Room Availability"
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Availability</span>
        </button>
      </div>
    </aside>
  );
};