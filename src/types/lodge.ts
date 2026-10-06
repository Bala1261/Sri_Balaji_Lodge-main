export interface Room {
  id: string;
  name: string;
  tagline: string;
  pricePerNight: number;
  maxGuests: number;
  bedType: string;
  roomSize: string;
  description: string;
  detailedDescription: string;
  image: string;
  secondaryImages?: string[];
  amenities: string[];
  acOption: 'A/C Included' | 'Non-A/C' | 'A/C or Non-A/C Available';
  isPopular?: boolean;
  isRealPhoto?: boolean;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface RouteMilestone {
  id: string;
  name: string;
  distanceFromLodge: string;
  travelTime: string;
  highlight: string;
  description: string;
  advice: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  reviewText: string;
  stayType: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Rooms' | 'Property & Parking' | 'Valparai Foothills';
  image: string;
  caption: string;
  isRealPhoto?: boolean;
}

export interface BookingInquiry {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomPreference: string;
  guests: string;
  specialRequests?: string;
}
