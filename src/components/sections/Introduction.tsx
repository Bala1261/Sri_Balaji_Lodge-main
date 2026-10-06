import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass } from 'lucide-react';
import { Card3D } from '../common/Card3D';

export const Introduction: React.FC = () => {
  const [photoMode, setPhotoMode] = useState<'rapids' | 'scenery' | 'property'>('rapids');

  const photoDetails = {
    rapids: {
      src: '/images/real_aliyar_river_rapids.jpg',
      webp: '/images/real_aliyar_river_rapids.webp',
      alt: 'Rushing Aliyar river rapids and coconut palms near Sri Balaji Lodge',
      title: 'Aliyar River Rapids & Palms',
      caption: 'The rushing mountain river waters and tropical palm groves right at the Aliyar foothills, just moments from Sri Balaji Lodge.',
    },
    scenery: {
      src: '/images/real_aliyar_river_scenery.jpg',
      webp: '/images/real_aliyar_river_scenery.webp',
      alt: 'Aliyar river and misty Anamalai foothills near Sri Balaji Lodge',
      title: 'Serene River & Foothill Mist',
      caption: 'The tranquil waterway and coconut groves at Aliyar, right beside our lodge. Flowing canal waters and mountain peaks.',
    },
    property: {
      src: '/images/real_balaji_exterior_daytime.jpg',
      webp: '/images/real_balaji_exterior_daytime.webp',
      alt: 'Daytime photograph of Sri Balaji Lodge exterior and parking courtyard',
      title: 'Sri Balaji Lodge & Courtyard',
      caption: 'Bright daylight view of the two-storey lodge, arched windows, and secure courtyard parking for guests.',
    }
  };

  const currentPhoto = photoDetails[photoMode];

  return (
    <section id="intro" className="relative py-20 sm:py-28 px-4 sm:px-8 bg-lodge-soft border-b border-lodge-border scroll-mt-20">
      {/* Backward-compatibility anchor for #about navigation */}
      <div id="about" className="absolute -top-24 left-0 pointer-events-none" />

      {/* =========================================================================
          EXPANDED "ABOUT" SECTION (MONUMENTAL ARCHITECTURAL HERO CARD)
          Generous Spatial Footprint, Prominent Typography & Sharp Box Aesthetics
          ========================================================================= */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <Card3D maxTilt={5} scale={1.01} className="w-full">
            <div className="card-luxury p-8 sm:p-12 lg:p-16 border border-[rgba(18,58,99,0.12)] shadow-[0_25px_60px_-15px_rgba(18,35,60,0.08)] bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                
                {/* Left Column: Expanded Asymmetrical Photography Window */}
                <div className="lg:col-span-6">
                  <div className="relative group overflow-hidden rounded-none shadow-xl border border-[rgba(18,58,99,0.12)] bg-lodge-dark h-[440px] sm:h-[500px] lg:h-[560px] w-full">
                    {/* Render all photos stacked with CSS transitions for instantaneous, flicker-free switching */}
                    {(Object.keys(photoDetails) as Array<keyof typeof photoDetails>).map((key) => {
                      const item = photoDetails[key];
                      const isActive = photoMode === key;
                      return (
                        <div
                          key={key}
                          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                            isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                          }`}
                        >
                          <picture>
                            <source srcSet={item.webp} type="image/webp" />
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              loading="eager"
                              decoding="async"
                            />
                          </picture>
                        </div>
                      );
                    })}

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/25 to-black/30 pointer-events-none" />

                    {/* Top Switcher Buttons */}
                    <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 flex flex-wrap items-center justify-between gap-2 z-30">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-black/60 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20">
                        <span>Aliyar &middot; Foothill Views</span>
                      </span>

                      {/* Photo Toggle Buttons */}
                      <div className="inline-flex rounded-none bg-black/70 backdrop-blur-md border border-white/20 p-1 gap-1">
                        <button
                          type="button"
                          onClick={() => setPhotoMode('rapids')}
                          className={`px-3 py-1.5 text-xs font-semibold transition-all rounded-none ${
                            photoMode === 'rapids'
                              ? 'bg-white text-lodge-dark shadow-sm'
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          River Rapids
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhotoMode('scenery')}
                          className={`px-3 py-1.5 text-xs font-semibold transition-all rounded-none ${
                            photoMode === 'scenery'
                              ? 'bg-white text-lodge-dark shadow-sm'
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          River Mist
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhotoMode('property')}
                          className={`px-3 py-1.5 text-xs font-semibold transition-all rounded-none ${
                            photoMode === 'property'
                              ? 'bg-white text-lodge-dark shadow-sm'
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          Lodge Facade
                        </button>
                      </div>
                    </div>

                    {/* Bottom Scenic Caption Card */}
                    <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 z-30">
                      <div className="bg-black/75 backdrop-blur-md p-4 sm:p-5 rounded-none text-white border border-white/15 shadow-2xl">
                        <div className="mb-1.5">
                          <span className="font-semibold text-sm sm:text-base tracking-tight block text-white">
                            {currentPhoto.title}
                          </span>
                        </div>
                        <p className="text-xs text-white/85 font-light leading-relaxed">
                          {currentPhoto.caption}
                        </p>

                        {/* Interactive Thumbnail Previews */}
                        <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-white/15">
                          {(Object.keys(photoDetails) as Array<keyof typeof photoDetails>).map((key) => {
                            const item = photoDetails[key];
                            const isSelected = photoMode === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setPhotoMode(key)}
                                className={`relative h-11 w-16 overflow-hidden rounded-none border-2 transition-all cursor-pointer ${
                                  isSelected ? 'border-amber-400 scale-105 shadow-md ring-1 ring-amber-400/50' : 'border-white/30 opacity-65 hover:opacity-100'
                                }`}
                                title={item.title}
                              >
                                <img
                                  src={item.src}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                  loading="eager"
                                />
                              </button>
                            );
                          })}
                          <span className="text-[11px] text-white/60 ml-auto hidden sm:inline">
                            Tap to switch view
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Prominent Typography & Four Expansive Heritage Facts */}
                <div className="lg:col-span-6">
                  {/* Eyebrow */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-lodge-surface border border-lodge-border text-lodge-primary text-xs font-semibold tracking-wider uppercase mb-5">
                    <span>About Sri Balaji Lodge</span>
                  </div>

                  {/* Prominent Architectural Heading */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-lodge-dark leading-[1.12] mb-6">
                    A Comfortable Pause <br />
                    <span className="font-semibold text-lodge-primary">Before The Road Rises.</span>
                  </h2>

                  {/* Expansive Narrative Description */}
                  <p className="text-base sm:text-lg text-lodge-muted leading-relaxed font-light mb-6">
                    For more than four decades, Sri Balaji Lodge has welcomed families, road travellers, and motorcycle tourers looking for a peaceful stay at the base of the Anamalai Hills.
                  </p>

                  {/* Architectural Pull Quote with Hairline Accent */}
                  <div className="border-l-2 border-lodge-primary/40 pl-5 py-2 mb-8 bg-lodge-surface/40">
                    <p className="text-sm sm:text-base text-lodge-dark/90 leading-relaxed font-normal italic">
                      &ldquo;Situated right on Valparai Main Road, we provide clean rooms, hot water geysers, gated courtyard parking, and reliable route advice before you drive up the 40 hairpin bends.&rdquo;
                    </p>
                  </div>

                  {/* Four Expansive Heritage & Pillar Fact Cards */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-5 pt-4 pb-8 border-t border-lodge-border/80">
                    <div className="p-4 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)]">
                      <span className="block text-2xl sm:text-3xl font-semibold text-lodge-primary tracking-tight">1980</span>
                      <span className="text-xs text-lodge-dark font-medium block mt-1">Established</span>
                      <span className="text-[11px] text-lodge-muted font-light mt-0.5 block">Four decades of foothill hospitality</span>
                    </div>

                    <div className="p-4 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)]">
                      <span className="block text-2xl sm:text-3xl font-semibold text-lodge-primary tracking-tight">1.5 km</span>
                      <span className="text-xs text-lodge-dark font-medium block mt-1">To Forest Check-Post</span>
                      <span className="text-[11px] text-lodge-muted font-light mt-0.5 block">Gate open 6:00 AM &ndash; 6:00 PM</span>
                    </div>

                    <div className="p-4 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)]">
                      <span className="block text-2xl sm:text-3xl font-semibold text-lodge-primary tracking-tight">24/7</span>
                      <span className="text-xs text-lodge-dark font-medium block mt-1">Front Desk Service</span>
                      <span className="text-[11px] text-lodge-muted font-light mt-0.5 block">Attended check-in &amp; direct phone booking</span>
                    </div>

                    <div className="p-4 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)]">
                      <span className="block text-2xl sm:text-3xl font-semibold text-lodge-primary tracking-tight">40 Bends</span>
                      <span className="text-xs text-lodge-dark font-medium block mt-1">Foothill Base</span>
                      <span className="text-[11px] text-lodge-muted font-light mt-0.5 block">Rest before the mountain climb</span>
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#rooms"
                      className="btn-blue-luxury px-6 py-3 text-sm font-semibold gap-2 shadow-md min-h-[48px]"
                    >
                      <span>Explore Rooms &amp; Tariffs</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <a
                      href="#location"
                      className="px-5 py-3 rounded-none bg-lodge-surface text-lodge-primary hover:bg-lodge-surface/80 border border-[rgba(18,58,99,0.12)] text-sm font-semibold transition-colors min-h-[48px] inline-flex items-center gap-2"
                    >
                      <Compass className="w-4 h-4 text-lodge-primary" />
                      <span>View Route Directions</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </Card3D>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;