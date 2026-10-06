import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Clock, MapPin } from 'lucide-react';
import { Card3D } from '../common/Card3D';

export const ValparaiGateway: React.FC = () => {
  const milestones = [
    { name: 'Aliyar Dam & Reservoir', distance: '1.2 km', time: '3 mins', note: 'Boating, gardens & park' },
    { name: 'Forest Check-Post', distance: '1.5 km', time: '4 mins', note: 'Gateway to Anamalai Tiger corridor' },
    { name: 'Monkey Falls', distance: '5.8 km', time: '12 mins', note: 'Natural cascading mountain spring' },
    { name: 'Valparai Hill Town', distance: '42 km', time: '1 hr 30 mins', note: 'Across 40 scenic hairpin bends' },
  ];

  return (
    <section id="valparai" className="py-20 sm:py-28 px-4 sm:px-8 bg-lodge-soft border-y border-lodge-border">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-lodge-surface border border-lodge-border text-lodge-primary text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Scenic Foothills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-lodge-dark mb-4">
            Stay at the Gateway to Valparai
          </h2>
          <p className="text-base text-lodge-muted leading-relaxed font-light">
            Sri Balaji Lodge sits at Aliyar, close to the beginning of the scenic climb through the Anamalai Hills.
          </p>
        </div>

        {/* Large Scenic Photography Banner with 3D Tilt Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <Card3D maxTilt={5} scale={1.01} className="w-full">
            <div className="relative rounded-none overflow-hidden shadow-card border border-[rgba(18,58,99,0.08)] group transform-style-3d">
              <img
                src="/images/real_valparai_ghat_road.jpg"
                alt="Majestic Anamalai mountain peaks and winding Valparai road"
                className="w-full h-[340px] sm:h-[460px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute top-5 left-5 translate-z-30">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-black/60 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-blue-300" />
                  <span>Anamalai Mountains &amp; Ghat Road</span>
                </span>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 max-w-xl translate-z-30">
                <div className="glass-ultra-dark p-5 sm:p-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.08em] text-blue-300 font-semibold block mb-1">
                    The 40 Hairpin Bends
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 tracking-tight">
                    Start Your Mountain Journey Well-Rested
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                    Ascending the 42 km ghat road requires alertness and clear daylight. An overnight stop at Sri Balaji Lodge puts you just 4 minutes from the morning check-post opening.
                  </p>
                </div>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* Key Distances Strip (3D Tactile Cards with Layered Z-Depth) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {milestones.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="h-full"
            >
              <Card3D maxTilt={10} scale={1.03} className="h-full">
                <div className="card-luxury p-5 flex flex-col justify-between h-full transform-style-3d">
                  <div>
                    <div className="flex items-center justify-between text-xs text-lodge-secondary font-medium mb-2 translate-z-20">
                      <span className="inline-flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-lodge-primary" />
                        <span>{item.time}</span>
                      </span>
                      <span className="font-semibold text-lodge-primary text-sm">{item.distance}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-lodge-dark mb-1 tracking-tight translate-z-10">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-lodge-muted mt-2 pt-2 border-t border-lodge-border/70 font-light translate-z-10">
                    {item.note}
                  </p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Forest Check-Post Advisory Note (Glass Ultra Light with 3D Float) */}
        <Card3D maxTilt={6} scale={1.01} className="w-full">
          <div className="glass-ultra-light p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transform-style-3d">
            <div className="flex items-start gap-3.5 translate-z-20">
              <div className="w-10 h-10 rounded-none bg-lodge-primary/10 flex items-center justify-center text-lodge-primary flex-shrink-0 mt-0.5 shadow-xs">
                <Clock className="w-4 h-4 text-lodge-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-lodge-dark tracking-tight">
                  Forest Check-Post Advisory (Entry Gate 1.5 km Ahead)
                </h4>
                <p className="text-xs text-lodge-muted mt-0.5 leading-relaxed font-light">
                  The vehicular gate operates strictly between <strong>6:00 AM and 6:00 PM</strong>. Single-use plastic bottles are strictly prohibited beyond the check-post.
                </p>
              </div>
            </div>
            <div className="text-xs text-lodge-secondary font-medium whitespace-nowrap bg-white px-4 py-2.5 rounded-none border border-[rgba(18,58,99,0.08)] shadow-sm self-end sm:self-center translate-z-30 min-h-[48px] flex items-center">
              Gate Hours: 6:00 AM – 6:00 PM
            </div>
          </div>
        </Card3D>

      </div>
    </section>
  );
};