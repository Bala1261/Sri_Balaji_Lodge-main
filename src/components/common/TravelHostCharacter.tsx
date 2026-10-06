import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export interface TravelHostCharacterProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TravelHostCharacter: React.FC<TravelHostCharacterProps> = ({
  className = '',
  size = 'md',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Responsive max width sizing
  const sizeClasses = {
    sm: 'max-w-[220px] sm:max-w-[260px]',
    md: 'max-w-[260px] sm:max-w-[320px] lg:max-w-[360px]',
    lg: 'max-w-[300px] sm:max-w-[380px] lg:max-w-[420px]',
  }[size];

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft, Luminous Radial Aura / Circular Backlight Behind Silhouette ONLY */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-emerald-500/25 via-blue-500/20 to-transparent blur-3xl pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-blue-400/20 blur-2xl pointer-events-none -z-10"
      />

      {/* 3D Character Body with Natural Floating Idle Physics (No Card Container) */}
      <motion.div
        animate={{
          y: isHovered ? [-2, -10, -2] : [0, -7, 0],
          rotate: isHovered ? [-0.6, 0.6, -0.6] : [-0.3, 0.3, -0.3],
        }}
        transition={{
          duration: isHovered ? 3 : 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative z-10 w-full ${sizeClasses} flex items-center justify-center cursor-pointer`}
      >
        {/* Full-body 100% Transparent Cutout Character - No Box Background */}
        <img
          src="/images/travel_host_waving_transparent.png"
          alt="Friendly 3D animated travel host welcoming guests to Sri Balaji Lodge"
          className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:scale-[1.02]"
          loading="eager"
        />

        {/* Welcoming Interactive Floating Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0.92, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-14 -right-2 sm:-right-4 bg-white/95 text-lodge-dark px-3 py-1.5 shadow-2xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 border border-white/30 rounded-none pointer-events-none z-20"
        >
          <Sparkles className="w-3.5 h-3.5 text-lodge-primary" />
          <span>24/7 Warm Welcome</span>
        </motion.div>
      </motion.div>

      {/* Ambient Ground Contact Shadow (Breathes in sync with Character) */}
      <motion.div
        animate={{
          scaleX: isHovered ? [0.88, 0.98, 0.88] : [0.92, 1.02, 0.92],
          opacity: isHovered ? [0.35, 0.55, 0.35] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: isHovered ? 3 : 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-44 sm:w-60 h-4 sm:h-5 bg-black/60 blur-md rounded-none -mt-4 z-0 pointer-events-none"
      />
    </div>
  );
};

export default TravelHostCharacter;
