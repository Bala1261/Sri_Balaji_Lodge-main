import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, CalendarDays, ArrowUpRight } from 'lucide-react';
import { lodgeInfo } from '../../data/lodgeData';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Strict 4-Item Navigation per User Specification
  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#intro' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#location' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3 sm:py-5 px-4 sm:px-8 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Capsule */}
        <a
          href="#"
          className={`flex items-center gap-2.5 px-4 py-2.5 transition-all duration-300 ${
            isScrolled ? 'glass-nav-scrolled text-lodge-dark' : 'glass-nav-top text-white'
          }`}
          aria-label="Sri Balaji Lodge Homepage"
        >
          <span className="w-2.5 h-2.5 rounded-none bg-blue-400"></span>
          <span className="font-semibold tracking-tight text-sm sm:text-base">
            Sri Balaji Lodge
          </span>
          <span className={`text-[11px] px-2.5 py-0.5 rounded-none font-medium ${
            isScrolled ? 'bg-lodge-surface text-lodge-primary' : 'bg-white/10 border border-white/15 text-white/90'
          }`}>
            Est. 1980
          </span>
        </a>

        {/* Desktop Navigation Links — Strictly: Home, About, Gallery, Contact */}
        <nav
          className={`hidden md:flex items-center gap-1.5 px-3.5 py-1.5 transition-all duration-300 ${
            isScrolled ? 'glass-nav-scrolled text-lodge-dark' : 'glass-nav-top text-white'
          }`}
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-4 py-1.5 text-xs font-medium rounded-none transition-colors ${
                isScrolled
                  ? 'text-lodge-dark/80 hover:text-lodge-primary hover:bg-lodge-soft'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`}
            className={`hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-none text-xs font-medium transition-all min-h-[42px] ${
              isScrolled
                ? 'bg-lodge-soft text-lodge-dark border border-lodge-border hover:bg-lodge-surface hover:text-lodge-primary'
                : 'btn-glass-secondary min-h-[42px]'
            }`}
            aria-label={`Call Front Desk at ${lodgeInfo.phonePrimary}`}
          >
            <Phone className="w-3.5 h-3.5 text-blue-300" />
            <span>Call Desk</span>
          </a>

          <a
            href="#plan-your-stay"
            className={`px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 gap-1.5 min-h-[42px] rounded-none inline-flex items-center justify-center ${
              isScrolled
                ? 'btn-blue-luxury shadow-md min-h-[42px]'
                : 'btn-primary-luxury shadow-luxury-cta min-h-[42px]'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Check Availability</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-3 rounded-none transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${
              isScrolled ? 'glass-nav-scrolled text-lodge-dark' : 'glass-nav-top text-white'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slick Animated Mobile Slide-Over / Drop-Down Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-3 max-w-sm mx-auto pointer-events-auto"
          >
            <div className="glass-ultra-light p-6 text-lodge-dark shadow-2xl rounded-none border border-[rgba(18,58,99,0.08)]">
              <div className="flex items-center justify-between pb-3.5 border-b border-lodge-border/60">
                <span className="font-semibold text-sm text-lodge-primary">Sri Balaji Lodge &middot; Aliyar</span>
                <span className="text-xs text-lodge-muted">Since 1980</span>
              </div>

              {/* Strict 4-Item Nav Links for Mobile */}
              <nav className="flex flex-col py-3.5 gap-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm text-lodge-dark hover:bg-lodge-surface rounded-none transition-colors font-medium min-h-[48px] flex items-center"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="pt-3.5 border-t border-lodge-border/60 flex flex-col gap-2.5">
                <a
                  href="#plan-your-stay"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full btn-blue-luxury min-h-[48px] py-3 px-4 text-xs font-semibold gap-1.5 shadow-md rounded-none inline-flex items-center justify-center"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Check Availability</span>
                </a>

                <a
                  href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`}
                  className="w-full min-h-[48px] py-2.5 px-4 rounded-none bg-lodge-soft border border-lodge-border text-lodge-dark text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-lodge-surface transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-lodge-primary" />
                  <span>Call Front Desk: {lodgeInfo.phonePrimary}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};