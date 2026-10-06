import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ShieldCheck } from 'lucide-react';
import { Card3D } from '../common/Card3D';

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage" className="py-20 sm:py-28 px-4 sm:px-8 bg-lodge-soft border-y border-lodge-border">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-lodge-surface border border-lodge-border text-lodge-primary text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Our Roots</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-lodge-dark mb-4">
            Welcoming Travellers Since 1980
          </h2>
          <p className="text-base text-lodge-muted leading-relaxed font-light">
            More than forty years of dependable foothill hospitality on the road to the Anamalai Hills.
          </p>
        </div>

        {/* 1980 vs Today Comparison Cards with Tactile 3D Tilt Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* 1980 Beginnings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <Card3D maxTilt={8} scale={1.02} className="h-full">
              <div className="card-luxury p-8 sm:p-10 flex flex-col justify-between h-full transform-style-3d">
                <div>
                  <div className="flex items-center justify-between mb-6 translate-z-20">
                    <span className="text-3xl sm:text-4xl font-semibold text-lodge-primary tracking-tight">1980</span>
                    <span className="px-3.5 py-1 rounded-none bg-lodge-surface text-lodge-secondary text-xs font-medium border border-[rgba(18,58,99,0.08)]">
                      The Beginning
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-lodge-dark mb-3 tracking-tight translate-z-20">
                    A Foothill Waypoint for Travellers
                  </h3>
                  <p className="text-sm text-lodge-muted leading-relaxed font-light mb-6 translate-z-10">
                    Sri Balaji Lodge began as a dependable rest stop for travellers journeying by bus, car, and motorcycle between Pollachi and the tea estates of Valparai. In an era when mountain roads were rugged and stops were few, the lodge provided honest lodging, safe rest, and fresh drinking water.
                  </p>
                </div>

                <div className="pt-4 border-t border-lodge-border/70 text-xs text-lodge-muted flex items-center gap-2 font-light translate-z-10">
                  <Calendar className="w-3.5 h-3.5 text-lodge-primary" />
                  <span>Founded over four decades ago at the Aliyar junction</span>
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* Today Modern Continuity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="h-full"
          >
            <Card3D maxTilt={8} scale={1.02} className="h-full">
              <div className="card-luxury p-8 sm:p-10 flex flex-col justify-between h-full transform-style-3d">
                <div>
                  <div className="flex items-center justify-between mb-6 translate-z-20">
                    <span className="text-3xl sm:text-4xl font-semibold text-lodge-primary tracking-tight">Today</span>
                    <span className="px-3.5 py-1 rounded-none bg-lodge-surface text-lodge-secondary text-xs font-medium border border-[rgba(18,58,99,0.08)]">
                      Present Day
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-lodge-dark mb-3 tracking-tight translate-z-20">
                    The Same Simple Purpose Continues
                  </h3>
                  <p className="text-sm text-lodge-muted leading-relaxed font-light mb-6 translate-z-10">
                    Today, the same quiet commitment remains: clean and comfortable rooms, dedicated in-room water geysers, secure courtyard parking for private vehicles, and warm personal guidance from our family-run reception before you ascend the hills.
                  </p>
                </div>

                <div className="pt-4 border-t border-lodge-border/70 text-xs text-lodge-muted flex items-center gap-2 font-light translate-z-10">
                  <ShieldCheck className="w-3.5 h-3.5 text-lodge-primary" />
                  <span>Modernized rooms, 24/7 hot water, and gated courtyard parking</span>
                </div>
              </div>
            </Card3D>
          </motion.div>

        </div>

      </div>
    </section>
  );
};