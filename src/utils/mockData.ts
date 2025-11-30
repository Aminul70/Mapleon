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
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  distance: number;
  trending?: boolean;
  profileImage: string;
  username: string;
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
  description: 'Your daily dose of warmth & wifi',
  rating: 4.7,
  reviews: 321,
  distance: 1.2,
  openNow: true,
  location: {
    lat: 40.7589,
    lng: -73.9851
  },
  profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
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
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
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
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
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
  profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200'
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
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
}];
export const mockPosts: Post[] = [{
  id: '1',
  businessId: '1',
  businessName: 'BrewHavenCafe',
  businessCategory: 'Cafe',
  image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
  caption: 'Cozy mornings & fresh brews! #localcafe #brunchspot',
  likes: 2100,
  comments: 350,
  shares: 122,
  distance: 1.2,
  trending: true,
  profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
  username: 'Coffee_Lover92'
}, {
  id: '2',
  businessId: '2',
  businessName: 'UrbanOasisGym',
  businessCategory: 'Fitness',
  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  caption: 'New HIIT classes starting Monday! Join us #fitness #transformation',
  likes: 1850,
  comments: 210,
  shares: 95,
  distance: 0.8,
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  username: 'FitLife_Coach'
}, {
  id: '3',
  businessId: '3',
  businessName: 'SalonBellaVista',
  businessCategory: 'Beauty',
  image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
  caption: 'Spring makeover season! Book your appointment #beauty #hairgoals',
  likes: 1420,
  comments: 180,
  shares: 67,
  distance: 2.1,
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  username: 'StyleQueen_'
}, {
  id: '4',
  businessId: '4',
  businessName: 'TuscanyGrill',
  businessCategory: 'Restaurant',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
  caption: 'Fresh pasta made daily! Taste the difference #italianfood #pasta',
  likes: 3200,
  comments: 520,
  shares: 245,
  distance: 1.5,
  trending: true,
  profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
  username: 'ChefMario_'
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