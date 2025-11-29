# Mapleon - Quick Reference Guide

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📂 Project Structure at a Glance

```
/app/
├── src/
│   ├── components/      # 9 reusable components
│   ├── pages/          # 17 page components
│   ├── utils/          # Mock data & utilities
│   ├── App.tsx         # Router configuration
│   └── index.tsx       # App entry point
├── public/             # Static assets
├── package.json        # Dependencies
└── vite.config.ts      # Build configuration
```

---

## 🎨 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18.3.1 |
| **Language** | TypeScript 5.5.4 |
| **Build Tool** | Vite 5.2.0 |
| **Styling** | Tailwind CSS 3.4.17 |
| **Router** | React Router DOM 6.26.2 |
| **Maps** | React Leaflet 4.2.1 |
| **Icons** | Lucide React 0.522.0 |
| **Deployment** | Firebase Hosting |

---

## 📱 Application Type

**Mapleon** - A location-based social discovery platform for local businesses
- TikTok-style feed
- Interactive maps
- Booking system
- Social features
- Frontend-only (no backend/database)
- All data is mocked

---

## 🎯 Core Features

1. **TikTok-Style Feed** - Vertical scrolling business posts
2. **Interactive Map** - Leaflet-based map with business markers
3. **Booking System** - Reserve tables at businesses
4. **Social Features** - Like, comment, share, follow
5. **Business Discovery** - Explore and search businesses
6. **User Profiles** - Personal profiles with posts
7. **Messaging** - Direct messaging (UI only)
8. **Notifications** - Notification center (UI only)

---

## 📄 Main Pages (17 Total)

| Page | Route | Purpose |
|------|-------|---------|
| Onboarding | `/` | Splash screen |
| Interest Selection | `/interests` | Choose categories |
| Home Feed | `/home` | Main TikTok-style feed |
| Explore | `/explore` | Discovery page |
| Map View | `/map` | Interactive map |
| Bookings | `/bookings` | Reservation system |
| Messages | `/messages` | Message list |
| Chat | `/chat` | Individual chat |
| Profile | `/profile` | User profile |
| Settings | `/settings` | App settings |
| Business Detail | `/business/:id` | Business info |
| Notifications | `/notifications` | Notification center |
| Favorites | `/favorites` | Saved businesses |
| Search Results | `/search` | Search results |
| Help | `/help` | Help center |
| Privacy Policy | `/privacy` | Privacy policy |
| Terms of Service | `/terms` | Terms of service |

---

## 🧩 Reusable Components (9 Total)

| Component | Purpose |
|-----------|---------|
| `BottomNav` | Bottom navigation bar (5 tabs) |
| `BusinessCard` | Business preview card |
| `Button` | Reusable button (5 variants) |
| `CommentsModal` | Comments overlay |
| `DiscoveryCard` | Discovery grid item |
| `FeedPost` | TikTok-style post |
| `GlassCard` | Glass-morphism card |
| `ShareSheet` | Share action sheet |
| `TrendingCard` | Trending item card |

---

## 🎨 Color Palette

```javascript
// Mapleon Theme Colors
{
  coral: '#FF7A57',      // Primary
  pink: '#FF4D7A',       // Secondary
  magenta: '#F53DFF',    // Accent
  purple: '#A54DFF',     // Accent
  teal: '#1DA9A1',       // Action
  aqua: '#146C78',       // Action
  slate: '#0D1A20',      // Text
  gray: '#E7ECEF',       // Background
  'teal-tint': '#CCE7E5', // Light
  success: '#3BE5A9',    // Success
  warning: '#FFB84D',    // Warning
  error: '#FF5E5E'       // Error
}
```

---

## 📊 Mock Data Types

### Business
```typescript
interface Business {
  id: string;
  name: string;
  category: 'restaurant' | 'gym' | 'salon' | 'cafe' | 'service';
  image: string;
  description: string;
  rating: number;
  reviews: number;
  distance: number;
  openNow: boolean;
  location: { lat: number; lng: number; };
  profileImage?: string;
}
```

### Post
```typescript
interface Post {
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
```

### Message
```typescript
interface Message {
  id: string;
  businessName: string;
  businessCategory: string;
  message: string;
  timestamp: string;
  unread: number;
  profileImage: string;
}
```

---

## 🔧 Key Configuration

### Vite Config
```typescript
// vite.config.ts
server: {
  host: '0.0.0.0',
  port: 3000,
  strictPort: true
}
```

### Tailwind Config
- Custom Mapleon colors
- Gradient backgrounds
- Custom animations (pulse-glow, float, slide-up)
- Neumorphic shadows

### TypeScript Config
- Target: ES2020
- Strict mode: enabled
- JSX: react-jsx

---

## 📦 Important Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Router & route definitions |
| `src/index.tsx` | React entry point |
| `src/utils/mockData.ts` | All mock data |
| `src/index.css` | Global styles & Tailwind |
| `tailwind.config.js` | Tailwind customization |
| `vite.config.ts` | Build configuration |
| `package.json` | Dependencies & scripts |

---

## 🗺️ Navigation Flow

```
Onboarding (/)
    ↓
Interest Selection (/interests)
    ↓
Home Feed (/home) ← Main Page
    ├→ Explore (/explore)
    ├→ Map View (/map)
    ├→ Bookings (/bookings)
    ├→ Messages (/messages) → Chat (/chat)
    ├→ Profile (/profile) → Settings (/settings)
    └→ Business Detail (/business/:id)
```

---

## 🎯 Bottom Navigation Tabs

1. **Home** (HomeIcon) → `/home` - Main feed
2. **Near Me** (MapPinIcon) → `/map` - Map view
3. **Bookings** (CalendarIcon) → `/bookings` - Reservations
4. **Messages** (MessageCircleIcon) → `/messages` - Chats
5. **Profile** (UserIcon) → `/profile` - User profile

---

## 🔍 Search & Discovery Features

### Explore Page
- Text search
- Trending carousel
- Category filters (6 categories)
- Discovery grid
- Camera search (coming soon)

### Map Page
- Search on map
- Category filters (5 categories)
- Business markers
- User location marker
- "Near Me" button
- Business card preview

---

## 💡 Key Features Implementation

### TikTok-Style Feed
- **File:** `src/pages/HomeFeed.tsx`
- Snap scrolling: `snap-y snap-mandatory`
- Full-screen posts
- Overlay UI with actions

### Interactive Map
- **File:** `src/pages/MapView.tsx`
- Leaflet integration
- Custom marker icons
- Category-based filtering
- Click to preview business

### Booking System
- **File:** `src/pages/Bookings.tsx`
- Business selection cards
- Date picker (HTML5)
- Party size (1-8)
- Time slots grid
- Confirmation modal

---

## 🎨 CSS Utilities

### Custom Classes
- `.glass-card` - Glass-morphism effect
- `.neumorphic-card` - Soft shadow card
- `.gradient-text` - Gradient text
- `.gradient-border` - Gradient border
- `.snap-container` - Snap scroll
- `.line-clamp-2` - 2-line truncate

### Animations
- `animate-pulse-glow` - Pulsing glow
- `animate-float` - Floating effect
- `animate-slide-up` - Slide up entrance

---

## 📱 Responsive Design

### Breakpoints
- Default: Mobile-first
- `sm:` prefix: 640px and up (tablets)
- Touch-friendly tap targets
- Flexible layouts

### Mobile Optimizations
- No scrollbars (hidden)
- Tap highlight removed
- Smooth scroll behavior
- Snap scrolling on feed
- Touch-optimized interactions

---

## 🐛 Known Limitations

1. ❌ **No Backend** - All data is mocked
2. ❌ **No Authentication** - User system is UI-only
3. ❌ **No Real-time Features** - Messaging is static
4. ❌ **No Geolocation** - Location features are simulated
5. ❌ **No Image Uploads** - Uses predefined images
6. ❌ **No Payments** - Booking has no payment processing
7. ❌ **Incomplete Pages** - Some pages are placeholders

---

## 🚀 Quick Start Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Open `http://localhost:3000`
- [ ] Start exploring the code!

---

## 📚 Learning Path

### Beginner
1. Start with `src/App.tsx` - understand routing
2. Look at `src/pages/Onboarding.tsx` - simple page
3. Check `src/components/Button.tsx` - reusable component
4. Review `src/utils/mockData.ts` - data structure

### Intermediate
5. Study `src/pages/HomeFeed.tsx` - complex interactions
6. Explore `src/components/FeedPost.tsx` - TikTok-style post
7. Examine `src/pages/MapView.tsx` - Leaflet integration
8. Understand `src/components/CommentsModal.tsx` - modal pattern

### Advanced
9. Analyze `src/pages/Profile.tsx` - comprehensive page
10. Review `tailwind.config.js` - custom theme
11. Study `vite.config.ts` - build optimization
12. Plan backend integration strategy

---

## 🎯 Next Steps for Development

### Immediate
- [ ] Add backend API
- [ ] Implement authentication
- [ ] Set up database
- [ ] Enable real-time messaging

### Short-term
- [ ] Integrate geolocation
- [ ] Add search functionality
- [ ] Implement favorites system
- [ ] Add push notifications

### Long-term
- [ ] Payment integration
- [ ] Analytics tracking
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Accessibility audit

---

## 📞 Quick Help

### Common Issues

**Port 3000 already in use?**
```bash
# Change port in vite.config.ts or:
npm run dev -- --port 3001
```

**TypeScript errors?**
```bash
# Check tsconfig.json
# Ensure all types are installed
npm install --save-dev @types/react @types/leaflet
```

**Tailwind not working?**
- Check `tailwind.config.js` content paths
- Ensure `@import` statements in `index.css`
- Restart dev server

**Map not displaying?**
- Check Leaflet CSS import in `MapView.tsx`
- Verify marker icon URLs
- Check browser console for errors

---

## 🔗 Useful Links

- **React Docs:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/
- **Vite:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **React Router:** https://reactrouter.com/
- **Leaflet:** https://leafletjs.com/
- **Lucide Icons:** https://lucide.dev/

---

## 📝 Cheat Sheet

### Create New Page
```typescript
// 1. Create file: src/pages/NewPage.tsx
import React from 'react';
import { BottomNav } from '../components/BottomNav';

export function NewPage() {
  return (
    <div className="min-h-screen bg-mapleon-gray pb-24">
      <h1>New Page</h1>
      <BottomNav />
    </div>
  );
}

// 2. Add route in src/App.tsx
import { NewPage } from './pages/NewPage';
// ...
<Route path="/new" element={<NewPage />} />
```

### Create New Component
```typescript
// src/components/NewComponent.tsx
import React from 'react';

interface NewComponentProps {
  title: string;
}

export function NewComponent({ title }: NewComponentProps) {
  return <div className="p-4">{title}</div>;
}
```

### Add New Color
```javascript
// tailwind.config.js
colors: {
  mapleon: {
    // ... existing colors
    newcolor: '#123456'
  }
}
// Use: bg-mapleon-newcolor, text-mapleon-newcolor
```

---

**Version:** 1.0.0  
**Last Updated:** 2025  
**Status:** Development

---

*For detailed documentation, see CODEBASE_INDEX.md*
