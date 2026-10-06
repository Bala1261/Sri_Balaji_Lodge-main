import { Room, Facility, RouteMilestone, Review, GalleryItem } from '../types/lodge';

export const lodgeInfo = {
  name: "Sri Balaji Lodge",
  tagline: "A Peaceful Stay at the Gateway to Valparai",
  establishedYear: "1980",
  address: "Valparai Main Road, Annu Nagar, Aliyar, Pollachi Taluk, Tamil Nadu 642101",
  landmark: "1.2 km before Aliyar Dam, on the main road to Valparai",
  phonePrimary: "+91 83003 22898",
  phoneFormatted: "+91 83003 22898",
  phoneSecondary: "+91 99424 82898",
  whatsappNumber: "+918300322898",
  email: "stay@sribalajilodge.com",
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",
  frontDeskHours: "24 Hours / 7 Days",
  googleRating: 4.3,
  reviewCount: 348,
  coordinates: {
    lat: 10.4912,
    lng: 76.9745
  },
  keyDistances: [
    { label: "Aliyar Dam & Park", distance: "1.2 km", travelTime: "3 mins" },
    { label: "Forest Check-Post", distance: "1.5 km", travelTime: "4 mins" },
    { label: "Monkey Falls", distance: "5.8 km", travelTime: "12 mins" },
    { label: "Valparai (40 Bends)", distance: "42 km", travelTime: "1 hr 30 mins" },
    { label: "Pollachi Junction", distance: "24 km", travelTime: "30 mins" },
    { label: "Coimbatore Airport", distance: "68 km", travelTime: "1 hr 45 mins" }
  ]
};

export const roomsData: Room[] = [
  {
    id: "standard-room",
    name: "Standard Room",
    tagline: "Comfortable queen-bed accommodation for couples and solo travellers",
    pricePerNight: 1200,
    maxGuests: 2,
    bedType: "Queen-size Bed",
    roomSize: "180 sq.ft",
    acOption: "Non-A/C",
    description: "Peaceful, comfortable accommodation for couples and solo travellers.",
    detailedDescription: "Designed for travellers seeking a restful overnight pause before driving up to Valparai. Features a comfortable queen-size bed with clean cotton sheets, fresh towels, an attached private bathroom with a dedicated water heater geyser, ceiling fan, and large windows that catch the cool foothill breeze.",
    image: "/images/standard_room_interior.jpg",
    secondaryImages: [
      "/images/real_balaji_deluxe_ac_room.jpg",
      "/images/real_balaji_room_double_cot.jpg",
      "/images/real_balaji_exterior_daytime.jpg"
    ],
    amenities: [
      "Attached Western Bathroom",
      "24/7 Hot Water Geyser",
      "Fresh White Cotton Linen",
      "High-Speed Wi-Fi",
      "Ceiling Fan & Good Ventilation",
      "Luggage Bench & Wardrobe",
      "Quiet Courtyard Facing"
    ]
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    tagline: "Air-conditioned comfort with Haier split A/C & LED TV",
    pricePerNight: 1800,
    maxGuests: 2,
    bedType: "Solid Teak Wood Cot",
    roomSize: "230 sq.ft",
    acOption: "A/C Included",
    isPopular: true,
    isRealPhoto: true,
    description: "Air-conditioned room with Haier split A/C, solid wooden cot, wall-mounted flat LED TV, and wooden wardrobe with dressing mirror.",
    detailedDescription: "Our most popular choice for couples and travellers. Features a high-efficiency Haier inverter split air conditioner, solid teak wood cot with comfortable mattress, wall-mounted flat-screen LED TV with cable, matching wooden wardrobe with full-length dressing mirror, writing desk, window with roll-up bamboo blinds, and an attached modern bathroom with 24/7 hot water geyser.",
    image: "/images/real_balaji_deluxe_ac_room.jpg",
    secondaryImages: [
      "/images/real_balaji_deluxe_tv_wardrobe.jpg",
      "/images/real_balaji_room_double_cot.jpg",
      "/images/real_balaji_exterior_dusk.jpg"
    ],
    amenities: [
      "Haier Inverter Split Air Conditioner",
      "Solid Teak Wood Cot with Clean Linens",
      "Wall-Mounted Flat Screen LED TV",
      "Wooden Wardrobe with Full-Length Mirror",
      "Attached Bathroom with 24/7 Geyser",
      "Roll-up Wooden Bamboo Window Blinds",
      "High-Speed Wi-Fi",
      "Wooden Writing Desk & Luggage Area"
    ]
  },
  {
    id: "family-room",
    name: "Family Room",
    tagline: "Generous space for families with children",
    pricePerNight: 2400,
    maxGuests: 4,
    bedType: "Two Double Beds",
    roomSize: "320 sq.ft",
    acOption: "A/C or Non-A/C Available",
    isRealPhoto: true,
    description: "Spacious multi-bed accommodation with two solid wooden cots and clean tiled interior.",
    detailedDescription: "Carefully planned for families touring Valparai and Anamalai Tiger Reserve. Features two full double beds with solid wooden cots, hygienic wall tiles, ceiling fan, curtained windows, clean attached bathroom with instant geyser heating, and peaceful courtyard ambience.",
    image: "/images/real_balaji_room_double_cot.jpg",
    secondaryImages: [
      "/images/real_balaji_deluxe_ac_room.jpg",
      "/images/real_balaji_deluxe_tv_wardrobe.jpg",
      "/images/real_balaji_exterior_dusk.jpg"
    ],
    amenities: [
      "Two Full Double Beds",
      "Air Conditioning & Dual Ceiling Fans",
      "Large Attached Bathroom with Geyser",
      "Seating Area with Coffee Table",
      "Generous Luggage & Storage Space",
      "High-Speed Wi-Fi",
      "Safe Private Courtyard Access"
    ]
  }
];

export const comfortFeatures: Facility[] = [
  {
    id: "courtyard-parking",
    title: "Secure Parking",
    description: "Private, enclosed gated parking directly inside the lodge compound. Completely safe for cars, SUVs, and touring motorcycles.",
    icon: "Car"
  },
  {
    id: "hot-water",
    title: "Hot Water",
    description: "Dedicated in-room electrical water heaters (geysers) ensure an instant, refreshing hot bath at any hour.",
    icon: "Flame"
  },
  {
    id: "comfortable-rooms",
    title: "Comfortable Rooms",
    description: "Clean, well-ventilated rooms with fresh white cotton linens and attached hygienic bathrooms.",
    icon: "BedDouble"
  },
  {
    id: "local-guidance",
    title: "Local Guidance",
    description: "Direct advice from our front desk on the 40 hairpin bends, ghat road fog, and forest check-post timings.",
    icon: "Compass"
  }
];

export const valparaiRouteData: RouteMilestone[] = [
  {
    id: "aliyar-dam",
    name: "Aliyar Dam & Park",
    distanceFromLodge: "1.2 km",
    travelTime: "3 mins",
    highlight: "Scenic reservoir, boating & gardens",
    description: "A calm, picturesque reservoir nestled against the foothills. Ideal for an evening stroll, boating, and family garden visits.",
    advice: "Best visited between 4:00 PM and 6:00 PM when the mountain breeze sets in."
  },
  {
    id: "checkpost",
    name: "Forest Check-Post",
    distanceFromLodge: "1.5 km",
    travelTime: "4 mins",
    highlight: "Gateway to the Valparai Ghat Road",
    description: "The official gateway where vehicular entry into the Anamalai Tiger Reserve corridor begins.",
    advice: "Gate open 6:00 AM - 6:00 PM. Single-use plastic bottles are prohibited."
  },
  {
    id: "monkey-falls",
    name: "Monkey Falls",
    distanceFromLodge: "5.8 km",
    travelTime: "12 mins",
    highlight: "Natural perennial waterfall",
    description: "Fresh mountain spring cascading down rock formations right beside the ghat road.",
    advice: "Forest department entry fee applies. Early mornings are clearest."
  },
  {
    id: "valparai-town",
    name: "Valparai Town",
    distanceFromLodge: "42 km",
    travelTime: "1 hr 30 mins",
    highlight: "End of the 40 hairpin bends",
    description: "The serene hill station surrounded by sprawling tea gardens, Sholayar Dam, and rainforests.",
    advice: "Starting fresh in the morning from Sri Balaji Lodge allows you to enjoy the 40 hairpin bends in daylight."
  }
];

export const reviewsData: Review[] = [
  {
    id: "rev-1",
    author: "Karthik Subramanian",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    date: "February 2026",
    stayType: "Family Road Trip",
    reviewText: "We reached Aliyar around 9 PM after a long drive from Chennai. Sri Balaji Lodge was right on the main road and checking in took less than 2 minutes. The room was thoroughly clean, beds had fresh white linen, and hot water in the geyser was immediate. Private parking inside the compound gave peace of mind."
  },
  {
    id: "rev-2",
    author: "Prashanth Nair",
    location: "Kochi, Kerala",
    rating: 5,
    date: "January 2026",
    stayType: "Motorcycle Road Trip",
    reviewText: "Rode up on a Royal Enfield Himalayan. Safe parking was my top priority, and Sri Balaji Lodge has a locked courtyard gate at night. The owner gave exact advice about the check-post opening time at 6:00 AM. Clean, honest pricing, hot bath, and peaceful sleep."
  },
  {
    id: "rev-3",
    author: "Dr. Senthil Nathan & Family",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    date: "December 2025",
    stayType: "Family Holiday",
    reviewText: "Dependable foothill lodge. We stayed in the Family Room with our children and elderly parents. Very spacious, well-ventilated, and completely peaceful at night. Aliyar Dam is just a 3-minute drive down the road. Highly recommended for family travellers."
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Lodge Exterior at Dusk",
    category: "Property & Parking",
    image: "/images/real_balaji_exterior_dusk.jpg",
    caption: "Evening view of Sri Balaji Lodge showing illuminated facade, booking signboard, and secure parking courtyard",
    isRealPhoto: true
  },
  {
    id: "gal-2",
    title: "Deluxe A/C Room & Teak Bed",
    category: "Rooms",
    image: "/images/real_balaji_deluxe_ac_room.jpg",
    caption: "Guest room interior showing Haier inverter split air conditioner, solid wooden cot, roll-up bamboo blinds, and glossy tiled floor",
    isRealPhoto: true
  },
  {
    id: "gal-3",
    title: "Spacious Family Double-Cot Room",
    category: "Rooms",
    image: "/images/real_balaji_room_double_cot.jpg",
    caption: "Room interior showing two solid wooden cots, patterned linens, cooling ceramic tiles, and ceiling fan",
    isRealPhoto: true
  },
  {
    id: "gal-4",
    title: "In-Room LED TV & Wooden Wardrobe",
    category: "Rooms",
    image: "/images/real_balaji_deluxe_tv_wardrobe.jpg",
    caption: "Wooden wardrobe with dressing mirror, flat-screen LED TV, and work desk table in the Deluxe Room",
    isRealPhoto: true
  },
  {
    id: "gal-5",
    title: "Aliyar River Rapids & Monsoon Clouds",
    category: "Valparai Foothills",
    image: "/images/real_aliyar_river_rapids.jpg",
    caption: "Rushing river rapids and tropical coconut palm groves near the lodge under dramatic monsoon skies",
    isRealPhoto: true
  },
  {
    id: "gal-6",
    title: "Daytime Architecture & Courtyard",
    category: "Property & Parking",
    image: "/images/real_balaji_exterior_daytime.jpg",
    caption: "Daytime view showing distinct arched upper windows, Balaji Lodge signboard, and spacious open parking",
    isRealPhoto: true
  },
  {
    id: "gal-7",
    title: "Anamalai Mountain Range & Ghat Highway",
    category: "Valparai Foothills",
    image: "/images/real_valparai_ghat_road.jpg",
    caption: "Spectacular granite peaks and winding road towards Valparai, starting just 1.5 km past the lodge",
    isRealPhoto: true
  },
  {
    id: "gal-8",
    title: "Serene Aliyar Waterway & Palm Groves",
    category: "Valparai Foothills",
    image: "/images/real_aliyar_river_scenery.jpg",
    caption: "Gentle flowing river waters surrounded by lush coconut groves and mountain silhouettes near Aliyar Dam",
    isRealPhoto: true
  },
  {
    id: "gal-9",
    title: "Highway Frontage & Gated Entrance",
    category: "Property & Parking",
    image: "/images/real_balaji_lodge_street_view.jpg",
    caption: "Direct roadside view on Valparai Main Road showing wide gates, safe vehicle entry, and foothill background",
    isRealPhoto: true
  }
];