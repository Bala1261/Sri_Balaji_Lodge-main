import React from 'react';
import { Phone, MessageSquare, MapPin, Navigation, ShieldCheck } from 'lucide-react';
import { lodgeInfo } from '../../data/lodgeData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[rgba(18,58,99,0.08)] text-lodge-dark py-14 sm:py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-lodge-border/70">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-none bg-lodge-primary" />
              <h3 className="text-lg font-semibold text-lodge-dark tracking-tight">
                Sri Balaji Lodge
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-none bg-lodge-surface text-lodge-primary font-medium border border-[rgba(18,58,99,0.08)]">
                Since 1980
              </span>
            </div>
            <p className="text-xs text-lodge-muted leading-relaxed font-light max-w-sm mb-5">
              A peaceful, dependable foothill lodge welcoming families, motorists, and travellers before their journey to Valparai.
            </p>
            <div className="text-xs text-lodge-secondary flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-lodge-primary" />
              <span>Gated Courtyard Parking &middot; 24/7 Hot Water &middot; Front Desk</span>
            </div>
          </div>

          {/* Quick Navigation — Strictly Streamlined */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-lodge-dark uppercase tracking-[0.08em] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-lodge-muted font-light">
              <li><a href="#" className="hover:text-lodge-primary transition-colors py-1 block">Home</a></li>
              <li><a href="#intro" className="hover:text-lodge-primary transition-colors py-1 block">About</a></li>
              <li><a href="#gallery" className="hover:text-lodge-primary transition-colors py-1 block">Gallery</a></li>
              <li><a href="#location" className="hover:text-lodge-primary transition-colors py-1 block">Contact</a></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold text-lodge-dark uppercase tracking-[0.08em] mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-lodge-muted font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-lodge-primary flex-shrink-0 mt-0.5" />
                <span>Annu Nagar, Aliyar, Valparai Main Road, Tamil Nadu 642101</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-lodge-primary flex-shrink-0" />
                <a href={`tel:${lodgeInfo.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-lodge-primary font-medium text-lodge-dark">
                  {lodgeInfo.phonePrimary} (24/7 Desk)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <a
                  href={`https://wa.me/${lodgeInfo.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 font-medium text-emerald-800"
                >
                  WhatsApp Inquiries
                </a>
              </p>
              <p className="flex items-center gap-2 pt-1">
                <Navigation className="w-3.5 h-3.5 text-lodge-primary flex-shrink-0" />
                <a
                  href="https://maps.google.com/?q=Sri+Balaji+Lodge+Aliyar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lodge-primary font-medium hover:underline"
                >
                  Open in Google Maps
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-lodge-muted gap-3">
          <p>&copy; {new Date().getFullYear()} Sri Balaji Lodge, Aliyar. All rights reserved.</p>
          <p className="text-[11px] text-lodge-muted/80 font-light">
            A Peaceful Foothill Stay at the Gateway to Valparai &middot; Established 1980
          </p>
        </div>
      </div>
    </footer>
  );
};