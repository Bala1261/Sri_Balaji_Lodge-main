import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone } from 'lucide-react';
import { lodgeInfo } from '../../data/lodgeData';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-8 overflow-hidden text-white">
      {/* Background Scenic Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/real_balaji_exterior_dusk.jpg')` }}
      />

      {/* Subtle Semi-Translucent Dark Overlay for Atmospheric Depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.08em] text-blue-300 font-semibold block mb-4">
            Welcoming Travellers Since 1980
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-tight text-white mb-6 leading-tight">
            Rest Well. <br />
            <span className="font-semibold text-white">Wake Ready for the Hills.</span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto font-light leading-relaxed mb-10">
            Comfortable rooms, hot water geysers, and peaceful foothill hospitality before your morning drive up to Valparai.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="btn-primary-luxury px-8 py-4 text-sm font-semibold gap-3 shadow-luxury-cta"
            >
              <span>Check Availability</span>
              <span className="w-6 h-6 rounded-none bg-lodge-surface flex items-center justify-center transition-transform group-hover:rotate-[8deg]">
                <ArrowUpRight className="w-3.5 h-3.5 text-lodge-primary" />
              </span>
            </button>

            <a
              href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`}
              className="btn-glass-secondary px-6 py-4 text-sm font-medium gap-2"
            >
              <Phone className="w-4 h-4 text-blue-300" />
              <span>Call Front Desk ({lodgeInfo.phonePrimary})</span>
            </a>
          </div>

          <p className="text-xs text-white/60 mt-8 font-light">
            Annu Nagar, Aliyar, Pollachi &ndash; Valparai Main Road &middot; 1.5 km to Forest Check-Post
          </p>
        </motion.div>
      </div>
    </section>
  );
};