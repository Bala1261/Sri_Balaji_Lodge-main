import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { galleryData } from '../../data/lodgeData';
import { GalleryItem } from '../../types/lodge';
import { Card3D } from '../common/Card3D';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Property & Parking', 'Rooms', 'Valparai Foothills'];
  const filteredData = selectedCategory === 'All'
    ? galleryData
    : galleryData.filter(item => item.category === selectedCategory);

  const handleNext = () => {
    if (!activePhoto) return;
    const currentIndex = filteredData.findIndex(item => item.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredData.length;
    setActivePhoto(filteredData[nextIndex]);
  };

  const handlePrev = () => {
    if (!activePhoto) return;
    const currentIndex = filteredData.findIndex(item => item.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredData.length) % filteredData.length;
    setActivePhoto(filteredData[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-8 bg-lodge-bg text-lodge-dark">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-lodge-surface border border-lodge-border text-lodge-primary text-xs font-semibold tracking-wider uppercase mb-3">
            <Camera className="w-3.5 h-3.5 text-lodge-primary" />
            <span>Visual Tour &middot; Lodge &amp; Foothills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-lodge-dark mb-4">
            A Look Around Sri Balaji Lodge
          </h2>
          <p className="text-base text-lodge-muted leading-relaxed font-light">
            Explore our lodge rooms, secure courtyard parking, and the surrounding Aliyar &amp; Valparai foothills.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-none transition-all min-h-[40px] flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-lodge-primary text-white shadow-md'
                  : 'bg-lodge-surface text-lodge-muted hover:text-lodge-dark hover:bg-white border border-lodge-border'
              }`}
            >
              <span>{cat === 'All' ? 'All Photos' : cat}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-none ${
                selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-lodge-soft text-lodge-muted'
              }`}>
                {cat === 'All' ? galleryData.length : galleryData.filter(i => i.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Editorial Photo Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              onClick={() => setActivePhoto(item)}
              className={idx === 0 && selectedCategory === 'All' ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <Card3D maxTilt={8} scale={1.02} className="h-full">
                <div
                  className={`group relative overflow-hidden rounded-none border border-[rgba(18,58,99,0.08)] shadow-card cursor-pointer transform-style-3d ${
                    idx === 0 && selectedCategory === 'All' ? 'h-[320px] sm:h-[360px]' : 'h-[270px]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 translate-z-30">
                    <div className="glass-ultra-dark p-3.5 sm:p-4 text-white flex items-end justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.08em] text-blue-300 font-medium block">
                          {item.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                      <span className="w-8 h-8 rounded-none bg-white/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Clean Lightbox Dialog with Ultra-Airy Glassmorphism */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 modal-backdrop-glass flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full glass-ultra-dark rounded-none overflow-hidden shadow-2xl text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 w-12 h-12 rounded-none bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 flex items-center justify-center transition-colors min-h-[48px] min-w-[48px]"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-none bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 flex items-center justify-center transition-colors min-h-[48px] min-w-[48px]"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-none bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 flex items-center justify-center transition-colors min-h-[48px] min-w-[48px]"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Preview */}
              <div className="relative aspect-[16/10] bg-black/60 flex items-center justify-center">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Caption */}
              <div className="p-4 sm:p-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-semibold text-white tracking-tight">{activePhoto.title}</h4>
                  <p className="text-xs text-white/80 font-light mt-0.5 leading-relaxed">{activePhoto.caption}</p>
                </div>
                <span className="text-xs text-blue-300 font-medium px-3.5 py-1 rounded-none bg-white/10 border border-white/15 self-start sm:self-auto whitespace-nowrap">
                  {activePhoto.category}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};