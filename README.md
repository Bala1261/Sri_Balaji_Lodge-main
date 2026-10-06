# SRI BALAJI LODGE, ALIYAR — COMPLETE UI/UX REDESIGN

> **"A Peaceful Stay at the Gateway to Valparai"**  
> Established 1980 · Aliyar, Pollachi Taluk, Tamil Nadu

---

## 🏔️ Brand & Architectural Direction

Sri Balaji Lodge is an established foothill lodge welcoming travellers since **1980**. This redesigned website presents an elegant, calm, premium-feeling, and authentic digital hospitality experience inspired by sophisticated high-end nature-retreat and mountain-lodge concepts.

### Visual Identity & Design System
- **Palette (White + Blue Master System)**:
  * Main Background: `#FFFFFF` (Dominates the site)
  * Soft Background: `#F7FAFC`
  * Primary Blue: `#123A63`
  * Secondary Blue: `#1E5B8F`
  * Light Blue Surface: `#EAF3F9`
  * Dark Typography: `#17212B`
  * Secondary Typography: `#64717D`
  * Structural Border: `#DFE7EE`
  * Warm Accent: `#E6DDCF` (Subtle & sparing)
- **Typography**: **Rendol** typography loaded via `@font-face` with clean fallback, creating hierarchy strictly through size, weight, spacing, and opacity.
- **Glassmorphism**: Refined architectural glass used primarily over photography, inside the hero floating booking card, and floating navigation capsule.
- **Atmosphere**: Peaceful, clean, dependable, and professionally managed. All promotional advertising, OTA comparisons, discount tickers, flashing badges, and gamification have been completely eliminated.
- **Authentic Imagery**: Real documentary photography of the lodge exterior, clean rooms, private gated courtyard parking, Aliyar Dam, and the scenic route to Valparai.

---

## 🏛️ 12-Section Progressive Disclosure Architecture

1. **Floating Navigation (`Header.tsx`)**: Refined capsule (`backdrop-blur-xl bg-white/12 border-white/20`) transitioning smoothly on scroll to opaque white with subtle shadow. Links: Stay, Rooms, Comfort, Valparai, Gallery, Heritage, Location. Direct CTAs: *Call Desk* & *Check Availability*.
2. **Fullscreen Scenic Hero (`Hero.tsx`)**: Full-bleed mountain context photography (`scale: 1.04 → 1`), subtle cinematic dark gradient, background atmospheric watermark layer ("ALIYAR"), concise headline (*"Rest Before The Road Rises."*), signature rounded pill CTA with circular arrow badge, 2 micro trust pills, and a floating WildStay-style compact glass booking card.
3. **Minimal Introduction (`Introduction.tsx`)**: Asymmetrical editorial layout with Aliyar reservoir photography, quiet copy (*"A Comfortable Pause Before Valparai"*), and 3 simple facts (*1980 Established*, *1.5 km To Check-Post*, *24/7 Front Desk*).
4. **Rooms & Tariffs (`RoomsSection.tsx`)**: Primary conversion section with transparent rates:
   * **Deluxe Room (Featured)**: King bed, split A/C, attached geyser, ₹1,800/night.
   * **Standard Room**: Queen bed, natural foothill breeze, non-A/C, attached geyser, ₹1,200/night.
   * **Family Room**: Two double beds, spacious suite for families, ₹2,400/night.
5. **Essential Comfort (`ComfortSection.tsx`)**: 4 curated pillars: *Secure Courtyard Parking*, *Dedicated In-Room Geysers*, *Comfortable Rooms*, and *Local Guidance*.
6. **Gateway to Valparai (`ValparaiGateway.tsx`)**: Scenic Valparai ghat road imagery with exact distances (Aliyar Dam: 1.2 km, Check-Post: 1.5 km, Monkey Falls: 5.8 km, Valparai Town: 42 km) and forest check-post gate timings (6:00 AM – 6:00 PM).
7. **Editorial Photo Gallery (`GallerySection.tsx`)**: *"A Look Around"* — clean grid with subtle `1.025` hover scale and full-screen lightbox modal.
8. **Heritage Continuity (`HeritageSection.tsx`)**: *"Welcoming Travellers Since 1980"* — 1980 foundation vs Today's modern continuity.
9. **Verified Reviews (`ReviewsSection.tsx`)**: Verified Google 4.3★ badge with genuine traveler reflections (family road trips, motorcycle journeys).
10. **Location & Directions (`LocationSection.tsx`)**: Google Maps interactive embed, full postal address, travel times, and direct action buttons (*Get Directions*, *Call Desk*, *WhatsApp*).
11. **Final Emotional CTA (`FinalCTA.tsx`)**: Full-width landscape banner: *"Rest Well. Wake Ready for the Hills."*
12. **Dignified Footer (`Footer.tsx`)**: Heritage mark, quick links, contact address, 24/7 phone number, WhatsApp link, and copyright.

---

## 🛠️ Technology Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (Tailwind v3 with extended hospitality color tokens)
- **Icons**: Lucide React
- **Motion**: Framer Motion (subtle entrance reveals, modal scale transitions, prefers-reduced-motion compliant)
- **Zero Forbidden Overhead**: No Three.js, no WebGL, no gamification, no artificial urgency.

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```