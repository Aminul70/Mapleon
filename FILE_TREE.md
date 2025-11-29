# Mapleon - Complete File Tree

```
/app/
│
├── 📄 README.md                          # Project documentation
├── 📄 package.json                       # npm dependencies & scripts
├── 📄 package-lock.json                  # Locked dependency versions
├── 📄 tsconfig.json                      # TypeScript configuration
├── 📄 tsconfig.node.json                 # TypeScript config for Node
├── 📄 vite.config.ts                     # Vite bundler configuration
├── 📄 tailwind.config.js                 # Tailwind CSS configuration
├── 📄 postcss.config.js                  # PostCSS configuration
├── 📄 firebase.json                      # Firebase hosting config
├── 📄 index.html                         # HTML entry point
├── 📄 CODEBASE_INDEX.md                  # This comprehensive index
│
├── 📁 public/                            # Static assets
│   └── 🖼️  44077014651.png              # App logo/favicon
│
└── 📁 src/                               # Source code directory
    │
    ├── 📄 index.tsx                      # React app entry point
    ├── 📄 App.tsx                        # Main app with routing
    ├── 📄 App.css                        # Component-level styles
    ├── 📄 index.css                      # Global styles & Tailwind
    │
    ├── 📁 components/                    # Reusable components (9 files)
    │   │
    │   ├── 📄 BottomNav.tsx             # Bottom navigation bar
    │   │   ├── 5 navigation tabs
    │   │   ├── Dynamic active states
    │   │   └── Dark/light mode support
    │   │
    │   ├── 📄 BusinessCard.tsx          # Business preview card
    │   │   ├── Business info display
    │   │   ├── Rating & distance
    │   │   └── View details button
    │   │
    │   ├── 📄 Button.tsx                # Reusable button
    │   │   ├── 5 variants (primary, secondary, ghost, white, dark)
    │   │   ├── 3 sizes (sm, md, lg)
    │   │   └── Full-width option
    │   │
    │   ├── 📄 CommentsModal.tsx         # Comments overlay
    │   │   ├── Full-screen modal
    │   │   ├── Comment threading
    │   │   ├── Like comments
    │   │   └── Add new comments
    │   │
    │   ├── 📄 DiscoveryCard.tsx         # Discovery grid item
    │   │   ├── Image card
    │   │   ├── Title & subtitle
    │   │   └── Size variants
    │   │
    │   ├── 📄 FeedPost.tsx              # TikTok-style post
    │   │   ├── Full-screen display
    │   │   ├── Like/comment/share
    │   │   ├── Business info overlay
    │   │   ├── Book a table CTA
    │   │   └── Collapsible captions
    │   │
    │   ├── 📄 GlassCard.tsx             # Glass-morphism card
    │   │   ├── Backdrop blur effect
    │   │   └── Semi-transparent
    │   │
    │   ├── 📄 ShareSheet.tsx            # Share action sheet
    │   │   ├── Social media options
    │   │   ├── Copy link
    │   │   ├── Save post
    │   │   └── Report functionality
    │   │
    │   └── 📄 TrendingCard.tsx          # Trending item card
    │       ├── Gradient backgrounds
    │       ├── Icon display
    │       └── Title & subtitle
    │
    ├── 📁 pages/                         # Page components (17 files)
    │   │
    │   ├── 📄 Onboarding.tsx            # App splash screen
    │   │   ├── Logo animation
    │   │   ├── Location request
    │   │   └── Radar effect
    │   │
    │   ├── 📄 InterestSelection.tsx     # Interest picker
    │   │   ├── Category selection
    │   │   ├── Multi-select
    │   │   └── Personalization
    │   │
    │   ├── 📄 HomeFeed.tsx              # Main feed page
    │   │   ├── TikTok-style scrolling
    │   │   ├── Vertical snap behavior
    │   │   ├── Notification bell
    │   │   └── Bottom navigation
    │   │
    │   ├── 📄 Explore.tsx               # Discovery page
    │   │   ├── Search bar
    │   │   ├── Trending carousel
    │   │   ├── Category filters
    │   │   ├── Discovery grid
    │   │   └── Camera search
    │   │
    │   ├── 📄 MapView.tsx               # Interactive map
    │   │   ├── Leaflet map integration
    │   │   ├── Business markers
    │   │   ├── Category filters
    │   │   ├── User location marker
    │   │   ├── Search on map
    │   │   ├── "Near Me" button
    │   │   └── Business card preview
    │   │
    │   ├── 📄 Bookings.tsx              # Reservation system
    │   │   ├── Business selection
    │   │   ├── Date picker
    │   │   ├── Party size selector
    │   │   ├── Time slot grid
    │   │   ├── Booking summary
    │   │   └── Confirmation modal
    │   │
    │   ├── 📄 Messages.tsx              # Message list
    │   │   ├── Conversation list
    │   │   ├── Unread badges
    │   │   └── Navigate to chat
    │   │
    │   ├── 📄 ChatView.tsx              # Individual chat
    │   │   └── [Implementation TBD]
    │   │
    │   ├── 📄 Profile.tsx               # User profile
    │   │   ├── Cover & profile images
    │   │   ├── User stats
    │   │   ├── Interests display
    │   │   ├── Achievements/badges
    │   │   ├── Posts/Liked/Saved tabs
    │   │   ├── Photo grid
    │   │   ├── Edit profile modal
    │   │   └── Share profile
    │   │
    │   ├── 📄 Settings.tsx              # App settings
    │   │   ├── Profile editing
    │   │   ├── Notification toggles
    │   │   ├── Location services
    │   │   ├── Privacy settings
    │   │   ├── Help & support links
    │   │   └── Logout functionality
    │   │
    │   ├── 📄 BusinessDetail.tsx        # Business details
    │   │   ├── Image carousel
    │   │   ├── Business info
    │   │   ├── Rating & reviews
    │   │   ├── Tabs (Info/Photos/Reviews)
    │   │   ├── Book a table CTA
    │   │   ├── Call now button
    │   │   ├── Mini map preview
    │   │   └── Share functionality
    │   │
    │   ├── 📄 Notifications.tsx         # Notification center
    │   │   └── [Implementation TBD]
    │   │
    │   ├── 📄 Favorites.tsx             # Saved businesses
    │   │   └── [Implementation TBD]
    │   │
    │   ├── 📄 SearchResults.tsx         # Search results
    │   │   └── [Implementation TBD]
    │   │
    │   ├── 📄 Help.tsx                  # Help center
    │   │   └── [Implementation TBD]
    │   │
    │   ├── 📄 PrivacyPolicy.tsx         # Privacy policy
    │   │   └── [Implementation TBD]
    │   │
    │   └── 📄 TermsOfService.tsx        # Terms of service
    │       └── [Implementation TBD]
    │
    └── 📁 utils/                         # Utility functions
        │
        └── 📄 mockData.ts               # All mock data & types
            ├── Business interface
            ├── Post interface
            ├── Message interface
            ├── mockBusinesses[] (5 businesses)
            ├── mockPosts[] (4 posts)
            ├── mockMessages[] (4 messages)
            └── categories[] (5 categories)
```

---

## 📊 Statistics

### File Count
- **Total Files:** 45+
- **TypeScript/TSX Files:** 28
- **Configuration Files:** 7
- **Documentation Files:** 3
- **Static Assets:** 1

### Code Distribution
- **Pages:** 17 components
- **Reusable Components:** 9 components
- **Utilities:** 1 file
- **Entry Points:** 2 files (index.tsx, App.tsx)

### Lines of Code (Estimated)
- **Total LOC:** ~6,000+
- **TypeScript/TSX:** ~5,500 lines
- **CSS/Styles:** ~100 lines
- **Config:** ~400 lines

---

## 🎯 Component Dependency Map

```
App.tsx (Router)
├── Onboarding
│   └── Button
├── InterestSelection
│   └── Button
├── HomeFeed
│   ├── FeedPost
│   │   ├── CommentsModal
│   │   └── ShareSheet
│   └── BottomNav
├── Explore
│   ├── TrendingCard
│   ├── DiscoveryCard
│   └── BottomNav
├── MapView
│   ├── BusinessCard
│   │   └── Button
│   └── BottomNav
├── Bookings
│   └── BottomNav
├── Messages
│   └── BottomNav
├── ChatView
│   └── BottomNav
├── Profile
│   └── BottomNav
├── Settings
│   └── BottomNav
├── BusinessDetail
│   ├── Button
│   └── BottomNav
├── Notifications
│   └── BottomNav
├── Favorites
│   └── BottomNav
└── SearchResults
    └── BottomNav
```

---

## 🔍 File Purpose Quick Reference

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Dependencies & npm scripts |
| `tsconfig.json` | TypeScript compiler settings |
| `vite.config.ts` | Vite bundler configuration |
| `tailwind.config.js` | Tailwind CSS customization |
| `postcss.config.js` | PostCSS plugins |
| `firebase.json` | Firebase hosting config |

### Entry Files
| File | Purpose |
|------|---------|
| `index.html` | HTML entry point |
| `src/index.tsx` | React app bootstrap |
| `src/App.tsx` | Router & route definitions |

### Style Files
| File | Purpose |
|------|---------|
| `src/index.css` | Global styles & Tailwind imports |
| `src/App.css` | Component-specific styles |

### Data Files
| File | Purpose |
|------|---------|
| `src/utils/mockData.ts` | All mock data & TypeScript interfaces |

---

## 📦 Component Size Reference

### Small Components (<100 lines)
- Button.tsx
- GlassCard.tsx
- TrendingCard.tsx
- DiscoveryCard.tsx

### Medium Components (100-200 lines)
- BottomNav.tsx
- BusinessCard.tsx
- Onboarding.tsx
- Messages.tsx
- Settings.tsx (with modal)
- Bookings.tsx
- Explore.tsx

### Large Components (200-300 lines)
- FeedPost.tsx
- CommentsModal.tsx
- ShareSheet.tsx
- MapView.tsx
- BusinessDetail.tsx

### Extra Large Components (300+ lines)
- Profile.tsx (~370 lines)
- HomeFeed.tsx (with nested logic)

---

## 🎨 Asset Locations

### Images
All images are sourced from Unsplash CDN:
- Business images: Various Unsplash photos
- Profile images: Unsplash portrait photos
- Icons: Lucide React icon library
- Logo: `/public/44077014651.png`

### Fonts
- **Primary Font:** Inter (Google Fonts CDN)
- **Weights:** 300, 400, 500, 600, 700, 800

### Map Tiles
- **Provider:** OpenStreetMap
- **URL:** `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

---

## 🚀 Build Output Structure

When built (`npm run build`), creates:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [various asset files]
└── public/
    └── 44077014651.png
```

---

## 🔗 Route-to-File Mapping

| Route | File | Component |
|-------|------|-----------|
| `/` | `src/pages/Onboarding.tsx` | Onboarding |
| `/interests` | `src/pages/InterestSelection.tsx` | InterestSelection |
| `/home` | `src/pages/HomeFeed.tsx` | HomeFeed |
| `/explore` | `src/pages/Explore.tsx` | Explore |
| `/map` | `src/pages/MapView.tsx` | MapView |
| `/bookings` | `src/pages/Bookings.tsx` | Bookings |
| `/messages` | `src/pages/Messages.tsx` | Messages |
| `/chat` | `src/pages/ChatView.tsx` | ChatView |
| `/profile` | `src/pages/Profile.tsx` | Profile |
| `/settings` | `src/pages/Settings.tsx` | Settings |
| `/business/:id` | `src/pages/BusinessDetail.tsx` | BusinessDetail |
| `/notifications` | `src/pages/Notifications.tsx` | Notifications |
| `/favorites` | `src/pages/Favorites.tsx` | Favorites |
| `/search` | `src/pages/SearchResults.tsx` | SearchResults |
| `/help` | `src/pages/Help.tsx` | Help |
| `/privacy` | `src/pages/PrivacyPolicy.tsx` | PrivacyPolicy |
| `/terms` | `src/pages/TermsOfService.tsx` | TermsOfService |

---

*End of File Tree Documentation*
