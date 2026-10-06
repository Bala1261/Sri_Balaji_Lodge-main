import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Phone, ShieldCheck, MapPin, Sparkles, Camera, CheckCircle2 } from 'lucide-react';
import { lodgeInfo } from '../../data/lodgeData';

interface HeroProps {
  onOpenBooking?: (roomName?: string, checkInDate?: string, checkOutDate?: string) => void;
}

const heroViews = [
  {
    id: 'dusk',
    label: 'Evening Glow',
    icon: '🌙',
    image: '/images/real_balaji_exterior_dusk.jpg',
    tag: 'Evening View with Illuminated Facade & Parking'
  },
  {
    id: 'day',
    label: 'Daytime View',
    icon: '☀️',
    image: '/images/real_balaji_exterior_daytime.jpg',
    tag: 'Daytime Architecture & Courtyard Parking'
  },
  {
    id: 'mountain',
    label: 'Mountain Pass',
    icon: '⛰️',
    image: '/images/real_valparai_ghat_road.jpg',
    tag: 'Anamalai Peaks & Valparai Ghat Road'
  },
  {
    id: 'rapids',
    label: 'River Rapids',
    icon: '🌊',
    image: '/images/real_aliyar_river_rapids.jpg',
    tag: 'Aliyar River Rapids & Tropical Foothills'
  }
];

export const Hero: React.FC<HeroProps> = () => {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-14 sm:pb-20 px-4 sm:px-8 overflow-hidden">
      {/* Full-bleed Real Photography Background Layers */}
      {heroViews.map((view, idx) => (
        <motion.div
          key={view.id}
          initial={false}
          animate={{
            opacity: idx === activeHeroIndex ? 1 : 0,
            scale: idx === activeHeroIndex ? 1 : 1.03
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('${view.image}')` }}
        />
      ))}

      {/* Atmospheric Dark Overlays for Deep Contrast and Text Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30 pointer-events-none" />

      {/* Atmospheric Background Brand Typography Layer */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute inset-x-0 top-1/4 -translate-y-1/2 select-none pointer-events-none text-center font-bold tracking-widest text-[16vw] text-white leading-none z-0"
        aria-hidden="true"
      >
        ALIYAR
      </motion.div>

      {/* =========================================================================
          HERO CONTENT CONTAINER: BALANCED 2-COLUMN LAYOUT
          Left: Title, Description, Primary CTAs & Trust Badges
          Right: Standalone 3D Waving Character with Clean Visual Space
          ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* =====================================================================
              LEFT COLUMN: EXPANSIVE HOME WELCOME & HOSPITALITY POSITIONING
              ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 xl:col-span-7 text-white"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white/10 backdrop-blur-md border border-white/15 text-xs tracking-wider uppercase mb-5 text-white/90">
              <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
              <span>SRI BALAJI LODGE &middot; ALIYAR FOOTHILLS &middot; ESTD. 1980</span>
            </div>

            {/* Prominent Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white leading-[1.08] mb-6">
              Rest Before <br />
              <span className="font-semibold text-white">The Road Rises.</span>
            </h1>

            {/* Generous Supporting Description */}
            <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-xl font-light leading-relaxed mb-8">
              Welcoming travellers since 1980 with comfortable rooms, hot water geysers, secure courtyard parking, and warm foothill hospitality at the gateway to the 40 Valparai hairpin bends.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-7">
              <a
                href="#rooms"
                className="group btn-primary-luxury px-7 py-3.5 text-sm sm:text-base font-semibold gap-3 min-h-[48px] rounded-none shadow-luxury-cta"
              >
                <span>Explore Rooms</span>
                <span className="w-6 h-6 rounded-none bg-lodge-surface flex items-center justify-center transition-transform group-hover:rotate-[8deg]">
                  <ArrowUpRight className="w-3.5 h-3.5 text-lodge-primary" />
                </span>
              </a>

              <a
                href="#plan-your-stay"
                className="btn-glass-secondary px-6 py-3.5 text-sm sm:text-base font-medium gap-2 min-h-[48px] rounded-none"
              >
                <Calendar className="w-4 h-4 text-blue-300" />
                <span>Check Availability</span>
              </a>

              <a
                href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`}
                className="btn-glass-secondary px-5 py-3.5 text-sm sm:text-base font-medium gap-2 min-h-[48px] rounded-none"
              >
                <Phone className="w-4 h-4 text-blue-300" />
                <span>Call Front Desk</span>
              </a>
            </div>

            {/* View Switcher Control */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-1 p-1 rounded-none bg-black/60 backdrop-blur-md border border-white/25 text-xs shadow-lg">
                <span className="px-2.5 py-1 text-[11px] text-white/80 font-medium flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-blue-300" />
                  <span className="hidden sm:inline">Views:</span>
                </span>
                {heroViews.map((view, idx) => (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveHeroIndex(idx)}
                    className={`px-3 py-1.5 rounded-none text-xs transition-all flex items-center gap-1.5 min-h-[36px] ${
                      idx === activeHeroIndex
                        ? 'bg-white text-lodge-dark shadow-sm font-semibold'
                        : 'text-white/80 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    <span>{view.icon}</span>
                    <span>{view.label}</span>
                  </button>
                ))}
              </div>

              {/* View Description Tag */}
              <span className="text-[11px] text-white/90 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/20 inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-300" />
                <span>{heroViews[activeHeroIndex].tag}</span>
              </span>
            </div>

            {/* Micro Trust Pills (Ultra-Airy Glassmorphism) */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/90">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none glass-ultra-dark">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                <span>Since 1980 &middot; Four decades of foothill hospitality</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none glass-ultra-dark">
                <MapPin className="w-3.5 h-3.5 text-blue-300" />
                <span>1.5 km to Valparai forest check-post</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none glass-ultra-dark">
                <span className="w-2 h-2 rounded-none bg-emerald-400" />
                <span>Free Courtyard Parking</span>
              </div>
            </div>
          </motion.div>

          {/* =====================================================================
              RIGHT COLUMN: STANDALONE 3D WAVING TRAVEL CHARACTER
              (Zero dark box background, pure transparent cutout with luminous aura)
              ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative select-none"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] flex flex-col items-center justify-center">
              
              {/* Soft, Luminous Radial Aura / Circular Backlight Behind Character Silhouette ONLY */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-emerald-500/25 via-blue-500/20 to-transparent blur-3xl pointer-events-none -z-10"
              />
              <div
                aria-hidden="true"
                className="absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-blue-400/20 blur-2xl pointer-events-none -z-10"
              />

              {/* Floating Animated 3D Character (Pure Silhouette Cutout Over Mountain View) */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [-0.4, 0.4, -0.4],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 w-full flex items-center justify-center cursor-pointer"
              >
                {/* 100% Transparent Cutout Character - No Dark Box or Slate Container */}
                <img
                  src="/images/travel_host_waving_transparent.png"
                  alt="Friendly 3D travel host waving welcome at Sri Balaji Lodge"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:scale-[1.02]"
                  loading="eager"
                />

                {/* Welcoming Floating Pill */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-16 -right-2 sm:-right-4 bg-white/95 text-lodge-dark px-3.5 py-1.5 shadow-2xl text-xs font-semibold flex items-center gap-1.5 border border-white/30 rounded-none pointer-events-none z-20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-lodge-primary" />
                  <span>24/7 Warm Welcome</span>
                </motion.div>
              </motion.div>

              {/* Synchronized Breathing Ground Contact Shadow */}
              <motion.div
                animate={{
                  scaleX: [0.9, 1.02, 0.9],
                  opacity: [0.35, 0.55, 0.35],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-48 sm:w-60 h-4 sm:h-5 bg-black/60 blur-md rounded-none -mt-4 z-0 pointer-events-none"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 text-center pt-6 select-none">
        <a
          href="#intro"
          className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
          aria-label="Scroll to introduction"
        >
          <span className="w-1.5 h-1.5 rounded-none bg-white/60 animate-pulse" />
          <span>Explore Sri Balaji Lodge</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;