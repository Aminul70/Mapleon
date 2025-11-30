export interface Business {
  id: string;
  name: string;
  category: 'restaurant' | 'gym' | 'salon' | 'cafe' | 'service';
  image: string;
  description: string;
  rating: number;
  reviews: number;
  distance: number;
  openNow: boolean;
  location: {
    lat: number;
    lng: number;
  };
  profileImage?: string;
  coverImage?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  hours?: {
    [key: string]: string;
  };
  amenities?: string[];
  photos?: string[];
  isBusiness?: boolean;
  verified?: boolean;
  // New fields for enhanced business profile
  tagline?: string;
  operatingHours?: {
    [day: string]: { open: string; close: string; closed: boolean };
  };
  specialHours?: { date: string; open: string; close: string; note?: string }[];
  customAmenities?: string[];
  certifications?: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    linkedin?: string;
    youtube?: string;
  };
  services?: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    category?: string;
  }>;
  responseRate?: number;
  responseTime?: string;
  analytics?: {
    views: number;
    profileVisits: number;
    bookings: number;
    weeklyViews?: number;
    monthlyViews?: number;
  };
  is24x7?: boolean;
  temporarilyClosed?: boolean;
  serviceRadius?: number;
  multipleLocations?: Array<{
    id: string;
    name: string;
    address: string;
    location: { lat: number; lng: number };
  }>;
}

export interface User {
  id: string;
  username: string;
  name: string;
  bio?: string;
  profileImage: string;
  coverImage?: string;
  accountType: 'business' | 'user';
  stats: {
    posts?: number;
    saved: number;
    followers: number;
    following: number;
  };
  interests?: string[];
  memberSince: string;
  verified?: boolean;
  // New fields for enhanced user profile
  email?: string;
  phone?: string;
  location?: string;
  privacySettings?: {
    profileVisibility: 'public' | 'private' | 'friends';
    showActivity: boolean;
    showLocation: boolean;
    allowSearch: boolean;
  };
  notificationSettings?: {
    push: {
      likes: boolean;
      comments: boolean;
      followers: boolean;
      messages: boolean;
      bookings: boolean;
      nearbyEvents: boolean;
    };
    email: {
      digest: boolean;
      promotional: boolean;
      important: boolean;
    };
    inApp: {
      sound: boolean;
      badge: boolean;
    };
  };
  preferences?: {
    language: string;
    measurementUnit: 'miles' | 'km';
    currency: string;
    defaultMapView: 'standard' | 'satellite' | 'hybrid';
  };
}

export interface Review {
  id: string;
  businessId: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
  photos?: string[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'business_post' | 'booking';
  userId: string;
  userName: string;
  userImage: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedId?: string;
}

export interface Booking {
  id: string;
  businessId: string;
  businessName: string;
  date: string;
  time: string;
  partySize: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  specialRequests?: string;
}

export interface Post {
  id: string;
  businessId: string;
  businessName: string;
  businessCategory: string;
  image: string;
  video?: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  distance: number;
  rating: number;
  reviews: number;
  trending?: boolean;
  profileImage: string;
  username: string;
  isBusiness?: boolean;
  verified?: boolean;
}

export interface Message {
  id: string;
  businessName: string;
  businessCategory: string;
  message: string;
  timestamp: string;
  unread: number;
  profileImage: string;
}

export const mockBusinesses: Business[] = [{
  id: '1',
  name: 'BrewHaven Cafe',
  category: 'cafe',
  image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
  description: 'Your daily dose of warmth & wifi. Specialty coffee, fresh pastries, and a cozy atmosphere for work or relaxation.',
  rating: 4.7,
  reviews: 321,
  distance: 1.2,
  openNow: true,
  location: {
    lat: 40.7589,
    lng: -73.9851
  },
  profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
  coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
  phone: '+1 (555) 123-4567',
  email: 'hello@brewhaven.com',
  website: 'www.brewhaven.com',
  address: '123 Main St, New York, NY 10001',
  priceRange: '$$',
  hours: {
    'Monday': '7:00 AM - 8:00 PM',
    'Tuesday': '7:00 AM - 8:00 PM',
    'Wednesday': '7:00 AM - 8:00 PM',
    'Thursday': '7:00 AM - 8:00 PM',
    'Friday': '7:00 AM - 9:00 PM',
    'Saturday': '8:00 AM - 9:00 PM',
    'Sunday': '8:00 AM - 7:00 PM',
  },
  amenities: ['WiFi', 'Outdoor Seating', 'Takeout', 'Pet Friendly'],
  photos: [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
  ],
  isBusiness: true,
  verified: true,
}, {
  id: '2',
  name: 'Urban Oasis Gym',
  category: 'gym',
  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  description: 'Transform your body, elevate your mind',
  rating: 4.9,
  reviews: 567,
  distance: 0.8,
  openNow: true,
  location: {
    lat: 40.7614,
    lng: -73.9776
  },
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  isBusiness: true,
  verified: true,
}, {
  id: '3',
  name: 'Salon Bella Vista',
  category: 'salon',
  image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
  description: 'Where style meets sophistication',
  rating: 4.8,
  reviews: 234,
  distance: 2.1,
  openNow: true,
  location: {
    lat: 40.7489,
    lng: -73.968
  },
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  isBusiness: true,
  verified: false,
}, {
  id: '4',
  name: 'Tuscany Grill',
  category: 'restaurant',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
  description: 'Authentic Italian cuisine',
  rating: 4.6,
  reviews: 892,
  distance: 1.5,
  openNow: true,
  location: {
    lat: 40.758,
    lng: -73.9855
  },
  profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
  isBusiness: true,
  verified: true,
}, {
  id: '5',
  name: 'The Daily Brew',
  category: 'cafe',
  image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
  description: 'Coffee crafted with passion',
  rating: 4.5,
  reviews: 445,
  distance: 0.5,
  openNow: true,
  location: {
    lat: 40.7505,
    lng: -73.9934
  },
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
  isBusiness: true,
  verified: false,
}, {
  id: '6',
  name: 'Chic Boutique',
  category: 'service',
  image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
  description: 'Your style destination - Fashion that speaks volumes. Latest trends and timeless classics.',
  rating: 4.8,
  reviews: 412,
  distance: 1.3,
  openNow: true,
  location: {
    lat: 40.7528,
    lng: -73.9765
  },
  profileImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200',
  coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
  phone: '+1 (555) 234-5678',
  email: 'hello@chicboutique.com',
  website: 'www.chicboutique.com',
  address: '456 Fashion Ave, New York, NY 10018',
  priceRange: '$$$',
  hours: {
    'Monday': '10:00 AM - 8:00 PM',
    'Tuesday': '10:00 AM - 8:00 PM',
    'Wednesday': '10:00 AM - 8:00 PM',
    'Thursday': '10:00 AM - 8:00 PM',
    'Friday': '10:00 AM - 9:00 PM',
    'Saturday': '10:00 AM - 9:00 PM',
    'Sunday': '11:00 AM - 7:00 PM',
  },
  amenities: ['Personal Styling', 'Gift Wrapping', 'Alterations', 'Online Shopping'],
  photos: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
  ],
  isBusiness: true,
  verified: true,
}, {
  id: '7',
  name: 'Glow Beauty Parlor',
  category: 'salon',
  image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
  description: 'Unleash your natural beauty - Expert beauty treatments and makeup artistry.',
  rating: 4.9,
  reviews: 528,
  distance: 1.1,
  openNow: true,
  location: {
    lat: 40.7603,
    lng: -73.9748
  },
  profileImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200',
  coverImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200',
  phone: '+1 (555) 345-6789',
  email: 'info@glowbeauty.com',
  website: 'www.glowbeauty.com',
  address: '789 Beauty Lane, New York, NY 10022',
  priceRange: '$$',
  hours: {
    'Monday': '9:00 AM - 7:00 PM',
    'Tuesday': '9:00 AM - 7:00 PM',
    'Wednesday': '9:00 AM - 7:00 PM',
    'Thursday': '9:00 AM - 8:00 PM',
    'Friday': '9:00 AM - 8:00 PM',
    'Saturday': '9:00 AM - 8:00 PM',
    'Sunday': '10:00 AM - 6:00 PM',
  },
  amenities: ['Facial Treatments', 'Makeup Services', 'Bridal Packages', 'Spa Services'],
  photos: [
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800',
  ],
  isBusiness: true,
  verified: true,
}, {
  id: '8',
  name: 'PowerFit Gym',
  category: 'gym',
  image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
  description: 'Get fit, stay strong - State-of-the-art fitness center with expert trainers.',
  rating: 4.7,
  reviews: 651,
  distance: 0.9,
  openNow: true,
  location: {
    lat: 40.7556,
    lng: -73.9862
  },
  profileImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200',
  coverImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200',
  phone: '+1 (555) 456-7890',
  email: 'contact@powerfit.com',
  website: 'www.powerfit.com',
  address: '321 Fitness Blvd, New York, NY 10019',
  priceRange: '$$',
  hours: {
    'Monday': '5:00 AM - 11:00 PM',
    'Tuesday': '5:00 AM - 11:00 PM',
    'Wednesday': '5:00 AM - 11:00 PM',
    'Thursday': '5:00 AM - 11:00 PM',
    'Friday': '5:00 AM - 10:00 PM',
    'Saturday': '7:00 AM - 9:00 PM',
    'Sunday': '7:00 AM - 9:00 PM',
  },
  amenities: ['Personal Training', '24/7 Access', 'Group Classes', 'Sauna & Steam'],
  photos: [
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  ],
  isBusiness: true,
  verified: true,
}, {
  id: '9',
  name: 'Serenity Salon & Spa',
  category: 'salon',
  image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800',
  description: 'Relax, rejuvenate, renew - Premium salon and spa services in a tranquil setting.',
  rating: 4.8,
  reviews: 398,
  distance: 1.6,
  openNow: true,
  location: {
    lat: 40.7467,
    lng: -73.9812
  },
  profileImage: 'https://images.unsplash.com/photo-1595475884562-073c5f128b7b?w=200',
  coverImage: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200',
  phone: '+1 (555) 567-8901',
  email: 'hello@serenitysalon.com',
  website: 'www.serenitysalon.com',
  address: '654 Spa Street, New York, NY 10017',
  priceRange: '$$$',
  hours: {
    'Monday': '9:00 AM - 8:00 PM',
    'Tuesday': '9:00 AM - 8:00 PM',
    'Wednesday': '9:00 AM - 8:00 PM',
    'Thursday': '9:00 AM - 9:00 PM',
    'Friday': '9:00 AM - 9:00 PM',
    'Saturday': '8:00 AM - 8:00 PM',
    'Sunday': '10:00 AM - 6:00 PM',
  },
  amenities: ['Hair Styling', 'Manicure & Pedicure', 'Massage Therapy', 'Body Treatments'],
  photos: [
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
  ],
  isBusiness: true,
  verified: true,
}];

export const mockPosts: Post[] = [{
  id: '1',
  businessId: '9',
  businessName: 'Serenity Salon & Spa',
  businessCategory: 'salon',
  image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800',
  video: 'https://customer-assets.emergentagent.com/job_codebase-idx-1/artifacts/5ioknqp0_SALON.mp4',
  caption: 'Experience luxury at Serenity Salon & Spa! 💇‍♀️✨ Transform your look with our expert stylists and premium treatments. From precision cuts to vibrant colors and relaxing spa services. Book your appointment today! #SalonLife #BeautyTransformation',
  likes: 3420,
  comments: 485,
  shares: 156,
  distance: 1.6,
  rating: 4.8,
  reviews: 398,
  trending: true,
  profileImage: 'https://images.unsplash.com/photo-1595475884562-073c5f128b7b?w=200',
  username: 'serenitysalon',
  isBusiness: true,
  verified: true,
}, {
  id: '2',
  businessId: '8',
  businessName: 'PowerFit Gym',
  businessCategory: 'gym',
  image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
  video: 'https://customer-assets.emergentagent.com/job_codebase-idx-1/artifacts/93hmhu0a_FITNESS%20CENTER%20GYM.mp4',
  caption: 'Push your limits at PowerFit! 💪🔥 State-of-the-art equipment, expert trainers, and an incredible community. Join us for HIIT classes, strength training, and personalized fitness plans. Your transformation starts here! #FitnessGoals #GymLife',
  likes: 2890,
  comments: 342,
  shares: 128,
  distance: 0.9,
  rating: 4.7,
  reviews: 651,
  trending: true,
  profileImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200',
  username: 'powerfitgym',
  isBusiness: true,
  verified: true,
}, {
  id: '3',
  businessId: '7',
  businessName: 'Glow Beauty Parlor',
  businessCategory: 'salon',
  image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
  video: 'https://customer-assets.emergentagent.com/job_codebase-idx-1/artifacts/gm58fzl4_BEAUTY%20PARLOR.mp4',
  caption: 'Unleash your natural beauty at Glow Beauty Parlor! ✨💄 Expert makeup artistry, luxurious facial treatments, and bridal packages. Let us enhance your natural radiance. Book your glow-up session today! #BeautyParlor #MakeupArtistry',
  likes: 3150,
  comments: 420,
  shares: 178,
  distance: 1.1,
  rating: 4.9,
  reviews: 528,
  trending: true,
  profileImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200',
  username: 'glowbeauty',
  isBusiness: true,
  verified: true,
}, {
  id: '4',
  businessId: '1',
  businessName: 'BrewHaven Cafe',
  businessCategory: 'cafe',
  image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
  video: 'https://customer-assets.emergentagent.com/job_codebase-idx-1/artifacts/0cwv1q8f_CAFE%20%20COFFEE%20SHOP.mp4',
  caption: 'Start your day right at BrewHaven Cafe! ☕🥐 Specialty coffee, fresh pastries, and the perfect cozy atmosphere for work or relaxation. Come experience the perfect blend of comfort and quality. WiFi, great vibes, and amazing coffee! #CoffeeLover #CafeLife',
  likes: 2650,
  comments: 398,
  shares: 145,
  distance: 1.2,
  rating: 4.7,
  reviews: 321,
  trending: true,
  profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
  username: 'brewhavencafe',
  isBusiness: true,
  verified: true,
}, {
  id: '5',
  businessId: '6',
  businessName: 'Chic Boutique',
  businessCategory: 'service',
  image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
  video: 'https://customer-assets.emergentagent.com/job_codebase-idx-1/artifacts/n7t87k4w_FASION%20CLOTHING%20STORE.mp4',
  caption: 'Step into style at Chic Boutique! 👗✨ Discover the latest fashion trends and timeless classics. From casual chic to elegant evening wear, we have everything you need to express your unique style. Personal styling services available! #Fashion #StyleGoals',
  likes: 2980,
  comments: 367,
  shares: 201,
  distance: 1.3,
  rating: 4.8,
  reviews: 412,
  trending: true,
  profileImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200',
  username: 'chicboutique',
  isBusiness: true,
  verified: true,
}];

export const mockMessages: Message[] = [{
  id: '1',
  businessName: 'The Daily Brew',
  businessCategory: 'cafe',
  message: 'Sounds good! See you at 7 PM.',
  timestamp: '6:45 PM',
  unread: 3,
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
}, {
  id: '2',
  businessName: 'Urban Oasis Gym',
  businessCategory: 'gym',
  message: 'Your new class schedule ready!',
  timestamp: 'Yesterday',
  unread: 0,
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
}, {
  id: '3',
  businessName: 'Salon Bella Vista',
  businessCategory: 'salon',
  message: 'Thanks for your visit!',
  timestamp: 'Yesterday',
  unread: 1,
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
}, {
  id: '4',
  businessName: 'Burger Hub',
  businessCategory: 'restaurant',
  message: 'Your order is confirmed.',
  timestamp: '3 days ago',
  unread: 0,
  profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200'
}];

export const categories = [{
  id: 'all',
  name: 'All',
  icon: 'Sparkles',
  color: '#FF6B35'
}, {
  id: 'restaurant',
  name: 'Restaurants',
  icon: 'UtensilsCrossed',
  color: '#FF7A57'
}, {
  id: 'gym',
  name: 'Gyms',
  icon: 'Dumbbell',
  color: '#1DA9A1'
}, {
  id: 'salon',
  name: 'Salons',
  icon: 'Scissors',
  color: '#A54DFF'
}, {
  id: 'cafe',
  name: 'Coffee',
  icon: 'Coffee',
  color: '#FF4D7A'
}, {
  id: 'service',
  name: 'More',
  icon: 'Sparkles',
  color: '#3BE5A9'
}];

export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Food enthusiast | Traveler | Coffee addict ☕',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    accountType: 'user',
    stats: {
      saved: 234,
      followers: 1234,
      following: 890,
    },
    interests: ['restaurant', 'cafe'],
    memberSince: '2024',
    verified: false,
  },
  {
    id: 'b1',
    username: 'brewhavencafe',
    name: 'BrewHaven Cafe',
    bio: 'Your daily dose of warmth & wifi | Est. 2020',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
    accountType: 'business',
    stats: {
      posts: 45,
      saved: 0,
      followers: 3200,
      following: 120,
    },
    memberSince: '2020',
    verified: true,
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    businessId: '1',
    userId: 'u1',
    userName: 'John Doe',
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    rating: 5,
    comment: 'Amazing coffee and cozy atmosphere! The baristas are super friendly and the wifi is great for working.',
    date: '2024-11-25',
    photos: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400'],
  },
  {
    id: 'r2',
    businessId: '1',
    userId: 'u2',
    userName: 'Sarah Smith',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    rating: 4,
    comment: 'Great coffee spot! A bit crowded during morning rush but totally worth it.',
    date: '2024-11-20',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    userId: 'u2',
    userName: 'Sarah Smith',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    message: 'liked your comment',
    timestamp: '2 minutes ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'business_post',
    userId: 'b1',
    userName: 'BrewHaven Cafe',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    message: 'posted a new video',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'follow',
    userId: 'u3',
    userName: 'Mike Johnson',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    message: 'started following you',
    timestamp: 'Yesterday',
    read: true,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'bk1',
    businessId: '1',
    businessName: 'BrewHaven Cafe',
    date: '2024-12-15',
    time: '14:00',
    partySize: 2,
    status: 'confirmed',
  },
  {
    id: 'bk2',
    businessId: '4',
    businessName: 'Tuscany Grill',
    date: '2024-12-20',
    time: '19:00',
    partySize: 4,
    status: 'pending',
    specialRequests: 'Window seat please',
  },
];