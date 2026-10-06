import React from 'react';
import { motion } from 'framer-motion';
import { Car, Flame, BedDouble, Compass, CheckCircle2 } from 'lucide-react';
import { Card3D } from '../common/Card3D';

export const ComfortSection: React.FC = () => {
  const comfortPillars = [
    {
      icon: Car,
      title: 'Secure Parking',
      subtitle: 'Private Courtyard Compound',
      description: 'Private, gated courtyard parking directly inside the lodge property. Safe and locked at night for cars, SUVs, and touring motorcycles.',
      details: 'Spacious driveway · Gated compound · Overnight security'
    },
    {
      icon: Flame,
      title: 'Hot Water',
      subtitle: 'Dedicated In-Room Geysers',
      description: 'Individual electrical water heaters in every attached bathroom ensure a hot, refreshing bath at any hour, day or night.',
      details: 'Instant heating · Clean attached bath · Western toilets'
    },
    {
      icon: BedDouble,
      title: 'Comfortable Rooms',
      subtitle: 'Quiet Restful Atmosphere',
      description: 'Hygienic rooms with fresh white cotton linens, silent air-conditioning options, ceiling fans, and refreshing mountain airflow.',
      details: 'Fresh clean linen · Quiet environment · Daily upkeep'
    },
    {
      icon: Compass,
      title: 'Local Guidance',
      subtitle: 'Valparai Route & Check-Post Advisory',
      description: 'Direct advice from our front desk on the 40 hairpin bends, ghat road fog conditions, and forest check-post operating hours.',
      details: 'Check-post timings · Fog updates · Hairpin bend driving advice'
    }
  ];

  return (
    <section id="comfort" className="py-20 sm:py-28 px-4 sm:px-8 bg-lodge-bg text-lodge-dark">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-lodge-surface border border-lodge-border text-lodge-primary text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Essential Comfort</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-lodge-dark mb-4">
            Everything You Need for a Comfortable Stop
          </h2>
          <p className="text-base text-lodge-muted leading-relaxed font-light">
            Thoughtfully planned amenities focused on what truly matters to travellers and families before embarking on the hills.
          </p>
        </div>

        {/* 4 Feature Blocks with Tactile 3D Tilt Physics & Layered Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {comfortPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="h-full"
              >
                <Card3D maxTilt={9} scale={1.02} className="h-full">
                  <div className="card-luxury p-8 sm:p-9 flex flex-col justify-between h-full transform-style-3d">
                    <div>
                      <div className="w-12 h-12 rounded-none bg-lodge-surface/80 border border-[rgba(18,58,99,0.08)] flex items-center justify-center text-lodge-primary mb-6 shadow-sm translate-z-30">
                        <Icon className="w-6 h-6 text-lodge-primary" />
                      </div>

                      <span className="text-[11px] font-semibold text-lodge-secondary uppercase tracking-[0.08em] block mb-1 translate-z-10">
                        {pillar.subtitle}
                      </span>
                      
                      <h3 className="text-xl font-semibold text-lodge-dark mb-3 tracking-tight translate-z-20">
                        {pillar.title}
                      </h3>

                      <p className="text-sm text-lodge-muted leading-relaxed font-light mb-6 translate-z-10">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-lodge-border/80 flex items-center gap-2 text-xs text-lodge-dark font-medium translate-z-20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lodge-primary flex-shrink-0" />
                      <span className="text-lodge-muted">{pillar.details}</span>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};