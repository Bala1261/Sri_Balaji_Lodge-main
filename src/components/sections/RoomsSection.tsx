import React from 'react';
import { motion } from 'framer-motion';
import { Users, BedDouble, Bath, ArrowUpRight, Flame, Wind, Sparkles } from 'lucide-react';
import { roomsData } from '../../data/lodgeData';
import { Room } from '../../types/lodge';
import { Card3D } from '../common/Card3D';

interface RoomsSectionProps {
  onSelectRoom: (room: Room) => void;
  onBookRoom: (roomName: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoom, onBookRoom }) => {
  const deluxeRoom = roomsData.find(r => r.id === 'deluxe-room') || roomsData[1];
  const otherRooms = roomsData.filter(r => r.id !== deluxeRoom.id);

  return (
    <section id="rooms" className="py-20 sm:py-28 px-4 sm:px-8 bg-lodge-soft border-y border-lodge-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-lodge-surface border border-lodge-border text-lodge-primary text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Accommodation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-lodge-dark mb-4">
            Choose Your Stay
          </h2>
          <p className="text-base text-lodge-muted leading-relaxed font-light">
            Simple, comfortable rooms designed for a peaceful night before your journey.
          </p>
        </div>

        {/* Featured Room (Deluxe Room with 3D Tilt & Parallax Physics) */}
        {deluxeRoom && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <Card3D maxTilt={6} scale={1.015} className="w-full">
              <div className="card-luxury overflow-hidden transform-style-3d">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Image side */}
                  <div className="lg:col-span-7 relative overflow-hidden min-h-[300px] sm:min-h-[380px]">
                    <img
                      src={deluxeRoom.image}
                      alt={deluxeRoom.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 translate-z-30 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-lodge-primary/95 backdrop-blur-md text-white text-xs font-semibold shadow-md">
                        <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                        <span>Most Popular Choice</span>
                      </span>
                    </div>
                  </div>

                  {/* Info side with Layered Z-Depth */}
                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-4 mb-2 translate-z-20">
                        <h3 className="text-2xl font-semibold text-lodge-dark tracking-tight">
                          {deluxeRoom.name}
                        </h3>
                        <div className="text-right">
                          <span className="text-2xl font-semibold text-lodge-primary">&#8377;{deluxeRoom.pricePerNight.toLocaleString()}</span>
                          <span className="text-xs text-lodge-muted block"> / night</span>
                        </div>
                      </div>

                      <p className="text-sm text-lodge-muted leading-relaxed mb-6 font-light translate-z-10">
                        {deluxeRoom.description}
                      </p>

                      {/* Badges lifting in 3D */}
                      <div className="flex flex-wrap gap-2 mb-8 translate-z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium shadow-xs">
                          <Users className="w-3.5 h-3.5 text-lodge-primary" />
                          <span>{deluxeRoom.maxGuests} Guests</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium shadow-xs">
                          <BedDouble className="w-3.5 h-3.5 text-lodge-primary" />
                          <span>{deluxeRoom.bedType}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium shadow-xs">
                          <Wind className="w-3.5 h-3.5 text-lodge-primary" />
                          <span>Air Conditioning</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium shadow-xs">
                          <Flame className="w-3.5 h-3.5 text-lodge-primary" />
                          <span>Hot Water Geyser</span>
                        </span>
                      </div>
                    </div>

                    {/* Actions with Z-Lift */}
                    <div className="pt-6 border-t border-lodge-border/80 flex items-center justify-between gap-3 translate-z-30">
                      <button
                        onClick={() => onSelectRoom(deluxeRoom)}
                        className="text-xs sm:text-sm font-semibold text-lodge-primary hover:text-lodge-secondary flex items-center gap-1.5 transition-colors min-h-[48px] px-2"
                      >
                        <span>View Room Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onBookRoom(deluxeRoom.name)}
                        className="btn-blue-luxury px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-md min-h-[48px]"
                      >
                        Reserve Room
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>
          </motion.div>
        )}

        {/* Secondary Rooms Grid (Standard Room & Family Room) with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherRooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="h-full"
            >
              <Card3D maxTilt={8} scale={1.02} className="h-full">
                <div className="card-luxury overflow-hidden flex flex-col justify-between h-full group transform-style-3d">
                  <div>
                    {/* Image */}
                    <div className="relative overflow-hidden h-[240px] sm:h-[260px]">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 translate-z-20">
                        <span className="px-3.5 py-1.5 rounded-none bg-white/90 backdrop-blur-md border border-[rgba(18,58,99,0.08)] text-xs font-semibold text-lodge-dark shadow-sm">
                          {room.acOption}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-baseline justify-between gap-4 mb-2 translate-z-20">
                        <h3 className="text-xl font-semibold text-lodge-dark tracking-tight">
                          {room.name}
                        </h3>
                        <div className="text-right">
                          <span className="text-xl font-semibold text-lodge-primary">&#8377;{room.pricePerNight.toLocaleString()}</span>
                          <span className="text-xs text-lodge-muted block"> / night</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-lodge-muted leading-relaxed mb-6 font-light translate-z-10">
                        {room.description}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4 translate-z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium shadow-xs">
                          <Users className="w-3.5 h-3.5 text-lodge-primary" />
                          <span>{room.maxGuests} Guests</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium shadow-xs">
                          <BedDouble className="w-3.5 h-3.5 text-lodge-primary" />
                          <span>{room.bedType}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-lodge-soft/80 border border-[rgba(18,58,99,0.08)] text-xs text-lodge-dark font-medium shadow-xs">
                          <Bath className="w-3.5 h-3.5 text-lodge-primary" />
                          <span>Attached Bath</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-lodge-border/80 flex items-center justify-between gap-3 translate-z-30">
                    <button
                      onClick={() => onSelectRoom(room)}
                      className="text-xs sm:text-sm font-semibold text-lodge-primary hover:text-lodge-secondary flex items-center gap-1.5 transition-colors min-h-[48px] px-2"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onBookRoom(room.name)}
                      className="px-5 py-2.5 rounded-none bg-lodge-surface text-lodge-primary hover:bg-lodge-primary hover:text-white border border-[rgba(18,58,99,0.12)] text-xs sm:text-sm font-semibold transition-all shadow-sm min-h-[48px]"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};