import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight, MessageSquareQuote } from 'lucide-react';
import { reviewsData, lodgeInfo } from '../../data/lodgeData';
import { Card3D } from '../common/Card3D';

export const ReviewsSection: React.FC = () => {
  const primaryReview = reviewsData[0];
  const secondaryReviews = reviewsData.slice(1, 3);

  return (
    <section id="reviews" className="py-20 sm:py-28 px-4 sm:px-8 bg-lodge-bg text-lodge-dark">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Verified Google Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-lodge-surface border border-lodge-border text-lodge-primary text-xs font-semibold tracking-wider uppercase mb-3">
              <span>Guest Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-lodge-dark">
              Honest Feedback from Travellers
            </h2>
            <p className="text-base text-lodge-muted leading-relaxed font-light mt-2 max-w-xl">
              Authentic reflections from families, road motorists, and weekend visitors who stayed with us.
            </p>
          </div>

          {/* Restrained Luxury Google Rating Card with 3D Float */}
          <Card3D maxTilt={10} scale={1.03} className="self-start md:self-auto">
            <div className="card-luxury p-4 sm:p-5 flex items-center gap-4 transform-style-3d">
              <div className="w-12 h-12 rounded-none bg-lodge-surface border border-[rgba(18,58,99,0.08)] flex items-center justify-center shadow-xs translate-z-20">
                <span className="text-xl font-bold text-lodge-primary">4.3</span>
              </div>
              <div className="translate-z-10">
                <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-lodge-muted block font-light">
                  Verified Google Rating &middot; {lodgeInfo.reviewCount} Reviews
                </span>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Reviews Layout: 1 Primary + 2 Compact Snippets with 3D Tilt & Ambient Shadow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Primary Featured Review */}
          {primaryReview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 h-full"
            >
              <Card3D maxTilt={7} scale={1.015} className="h-full">
                <div className="card-luxury p-8 sm:p-10 flex flex-col justify-between h-full transform-style-3d">
                  <div>
                    <MessageSquareQuote className="w-10 h-10 text-lodge-primary/20 mb-6 translate-z-30" />
                    <p className="text-base sm:text-lg text-lodge-dark font-light leading-relaxed mb-8 translate-z-20">
                      "{primaryReview.reviewText}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-lodge-border/80 flex items-center justify-between translate-z-10">
                    <div>
                      <h4 className="text-sm font-semibold text-lodge-dark tracking-tight">
                        {primaryReview.author}
                      </h4>
                      <span className="text-xs text-lodge-muted font-light">
                        {primaryReview.location} &middot; {primaryReview.stayType}
                      </span>
                    </div>
                    <span className="text-xs text-lodge-secondary font-medium">
                      {primaryReview.date}
                    </span>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          )}

          {/* 2 Compact Review Snippets */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryReviews.map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-1"
              >
                <Card3D maxTilt={9} scale={1.02} className="h-full">
                  <div className="card-luxury p-6 flex flex-col justify-between h-full transform-style-3d">
                    <p className="text-xs sm:text-sm text-lodge-dark font-light leading-relaxed mb-4 translate-z-20">
                      "{rev.reviewText}"
                    </p>

                    <div className="pt-3.5 border-t border-lodge-border/70 flex items-center justify-between translate-z-10">
                      <div>
                        <h5 className="text-xs font-semibold text-lodge-dark tracking-tight">
                          {rev.author}
                        </h5>
                        <span className="text-[11px] text-lodge-muted font-light">
                          {rev.location} &middot; {rev.stayType}
                        </span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>

        </div>

        {/* View on Google Link */}
        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/maps/search/Sri+Balaji+Lodge+Aliyar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-lodge-primary hover:text-lodge-secondary transition-colors min-h-[48px] px-3"
          >
            <span>View Verified Google Reviews</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};