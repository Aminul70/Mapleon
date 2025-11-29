# Complete UI/UX Design Upgrade Plan
## Business Discovery Platform - Professional Redesign Specification

---

## 📋 Document Information

**Version:** 1.0  
**Last Updated:** November 29, 2024  
**Project Type:** Social Media Platform for Business Discovery  
**Target Audience:** Business Owners, Travelers, Foreigners, General Users  

---

## 🎯 Executive Summary

This document provides a comprehensive blueprint for redesigning the Business Discovery Platform - a TikTok/Instagram-style social media application focused on connecting users with local businesses through video content. The redesign aims to deliver a premium, modern, and intuitive experience that differentiates the platform while maintaining familiar social media patterns.

### Key Objectives
- Transform the visual identity to feel premium and trustworthy
- Create clear differentiation between Business Owner and User accounts
- Improve discoverability and engagement with business content
- Implement a cohesive design system across all screens
- Enhance location-based features for travel and discovery
- Optimize for both content consumption and business promotion

---

## 📊 Current State Analysis

### Existing Features
- ✅ Vertical scroll reel-style feed
- ✅ Like, comment, share functionality
- ✅ Business profile display
- ✅ Location/directions feature
- ✅ Booking capability
- ✅ Bottom navigation
- ✅ Notifications

### Identified Issues
- ❌ Generic visual design lacking brand identity
- ❌ No clear distinction between account types
- ❌ Limited business discovery features
- ❌ Basic profile layouts
- ❌ Inconsistent spacing and typography
- ❌ Missing business-specific features (hours, menu, gallery)
- ❌ Limited filtering and search capabilities
- ❌ No follower/following management

---

## 🎨 Design System Foundation

### Brand Identity

#### Core Values
1. **Discovery** - Help users find amazing local businesses
2. **Authenticity** - Real businesses, real experiences
3. **Community** - Connect travelers and locals with businesses
4. **Simplicity** - Easy to use for everyone

#### Visual Direction
- Modern, clean, and spacious layouts
- Professional yet approachable
- Travel and discovery inspired
- High-quality imagery focused
- Location-aware design elements

### Color Palette

#### Primary Colors
```css
--primary-brand: #FF6B35        /* Vibrant Orange - Energy, Discovery */
--primary-dark: #E85A2A          /* Darker Orange - Active states */
--primary-light: #FF8555         /* Lighter Orange - Hover states */
--primary-subtle: #FFF4F0        /* Very Light - Backgrounds */
```

#### Secondary Colors
```css
--secondary-teal: #2DD4BF        /* Teal - Location, Maps */
--secondary-purple: #A855F7      /* Purple - Premium features */
--secondary-blue: #3B82F6        /* Blue - Links, Information */
```

#### Neutral Colors
```css
--neutral-900: #0F172A          /* Headings, Primary Text */
--neutral-800: #1E293B          /* Body Text */
--neutral-700: #334155          /* Secondary Text */
--neutral-600: #475569          /* Disabled Text */
--neutral-500: #64748B          /* Borders */
--neutral-400: #94A3B8          /* Icons */
--neutral-300: #CBD5E1          /* Light Borders */
--neutral-200: #E2E8F0          /* Dividers */
--neutral-100: #F1F5F9          /* Light Backgrounds */
--neutral-50: #F8FAFC           /* Page Background */
--white: #FFFFFF                /* Pure White */
```

#### Semantic Colors
```css
--success: #10B981              /* Success states */
--warning: #F59E0B              /* Warnings */
--error: #EF4444                /* Errors */
--info: #3B82F6                 /* Information */
```

#### Business Account Colors
```css
--business-badge: #F59E0B       /* Gold - Business badge */
--business-highlight: #FEF3C7   /* Light Gold - Business backgrounds */
```

### Typography

#### Font Family
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Plus Jakarta Sans', 'Inter', sans-serif; /* For headings */
```

#### Font Sizes & Weights
```css
/* Display */
--text-display-lg: 48px / 1.1 / 700
--text-display-md: 36px / 1.2 / 700
--text-display-sm: 30px / 1.2 / 700

/* Headings */
--text-h1: 24px / 1.3 / 700
--text-h2: 20px / 1.4 / 600
--text-h3: 18px / 1.4 / 600
--text-h4: 16px / 1.5 / 600

/* Body */
--text-body-lg: 16px / 1.6 / 400
--text-body-md: 15px / 1.6 / 400
--text-body-sm: 14px / 1.5 / 400
--text-body-xs: 13px / 1.5 / 400

/* Labels */
--text-label-lg: 14px / 1.4 / 500
--text-label-md: 13px / 1.4 / 500
--text-label-sm: 12px / 1.4 / 500
--text-label-xs: 11px / 1.3 / 500
```

### Spacing System
```css
--space-0: 0px
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

### Border Radius
```css
--radius-sm: 6px              /* Small elements */
--radius-md: 12px             /* Cards, inputs */
--radius-lg: 16px             /* Large cards */
--radius-xl: 24px             /* Hero sections */
--radius-full: 9999px         /* Pills, avatars */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

### Animations
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-bounce: 500ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## 📱 Screen-by-Screen Redesign

### 1. Home Feed (Reel View)

#### Current Issues
- Basic icon design
- Limited information visible during video playback
- No category filtering
- No business type indicators

#### New Design Specifications

##### A. Video Player Component
```
Structure:
┌─────────────────────────────────┐
│     [Notification] [Filter]     │ ← Top Bar
│                                  │
│                                  │
│       VIDEO CONTENT AREA         │
│                                  │
│                                  │
│                                  │
│   [❤️ Like]     │
│   [💬 Comment]  │ ← Action Bar (Right)
│   [📤 Share]    │
│   [🔖 Save]     │
│   [📍 Directions]│
│                                  │
├──────────────────────────────────┤
│ [Profile] BusinessName           │
│ Category • Location              │ ← Business Info Bar
│ ⭐ 4.8 (234) • 2.3km away       │
│                                  │
│ Description text...              │
│                                  │
│ [Book Now] [View Profile]        │
└──────────────────────────────────┘
│    [Home] [Search] [+] [❤️] [👤] │ ← Bottom Nav
└──────────────────────────────────┘
```

##### B. Top Bar (Sticky, appears on scroll up)
- **Notification Icon**: Top right with red badge
- **Filter Icon**: Top left with category filters dropdown
- **Background**: Gradient overlay for readability

##### C. Action Buttons (Right Side)
**Playing State:**
- Small circular frosted glass buttons (56px)
- White icons with subtle drop shadow
- Stacked vertically with 16px gap
- Smooth scale animation on press

**Paused State:**
- Expanded horizontal pills showing counts
- Icons + numbers in readable typography
- Gray background with strong contrast
- Smooth width transition (0.4s ease)

**Buttons Order (top to bottom):**
1. **Like Button**
   - Heart icon
   - Filled when liked (red animation)
   - Show count: "2.1K"
   
2. **Comment Button**
   - Chat bubble icon
   - Show count: "234"
   - Opens comment modal
   
3. **Share Button**
   - Share icon
   - Show count: "89"
   - Opens share sheet
   
4. **Save Button** (NEW)
   - Bookmark icon
   - Filled when saved
   - Personal collection feature
   
5. **Directions Button**
   - Map pin icon
   - Opens map with route
   - Shows distance: "2.3km"

##### D. Business Information Bar (Bottom)
```
Layout:
┌─────────────────────────────────────────┐
│ [Avatar]  BusinessName        [Badge]  │
│ 48px      H3 Bold             Gold     │
│                                         │
│ 🏪 Category • 📍 Location              │
│ Label-md                                │
│                                         │
│ ⭐ 4.8 (234 reviews) • 2.3km away      │
│ Label-sm • Secondary color              │
│                                         │
│ "Amazing coffee and cozy atmosphere..." │
│ Body-sm • 2 lines max • "more" link    │
│                                         │
│ [Book Now →] [View Full Profile]       │
│ Primary CTA   Ghost Button             │
└─────────────────────────────────────────┘
```

**Business Badge Indicator:**
- Gold crown or star icon
- "Business" label
- Only shown for business accounts
- Positioned next to business name

**Interactive Elements:**
- Tap business name/avatar → Full profile
- Tap category → Filter by category
- Tap location → Open map view
- Tap rating → View all reviews
- Tap "more" → Expand full caption

##### E. Video Interaction
- **Single Tap**: Pause/Play (center play/pause icon animation)
- **Double Tap**: Like (heart burst animation)
- **Long Press**: Show quick actions menu
- **Swipe Up/Down**: Next/Previous video
- **Pinch**: Not allowed (locked aspect ratio)

##### F. Category Filter (Top Left Icon)
```
Filter Dropdown:
┌─────────────────────────────┐
│ Discover Businesses         │
│ ─────────────────────────── │
│ ✓ All Categories            │
│   🍽️ Restaurants             │
│   ☕ Cafes & Bars            │
│   💪 Fitness & Gyms          │
│   ✂️ Salons & Spas           │
│   🏨 Hotels & Stays          │
│   🎨 Art & Entertainment     │
│   🛍️ Shopping & Retail       │
│   + More...                  │
│ ─────────────────────────── │
│ 📍 Near Me                   │
│ 🔥 Trending Now              │
│ ⭐ Top Rated                 │
└─────────────────────────────┘
```

---

### 2. Search & Explore Page

#### Purpose
Dedicated discovery page for finding businesses by category, location, or search

#### Layout Structure
```
┌───────────────────────────────────────┐
│ [🔍 Search businesses, places...]    │ ← Search Bar
├───────────────────────────────────────┤
│                                       │
│ Quick Filters (Horizontal Scroll)     │
│ [Near Me] [Trending] [Top Rated]...   │
│                                       │
├───────────────────────────────────────┤
│ Categories                            │
│                                       │
│ ┌──────┐ ┌──────┐ ┌──────┐          │
│ │ 🍽️   │ │ ☕   │ │ 💪   │          │ ← Category Cards
│ │Rest. │ │Cafes │ │Gyms  │          │    (Grid 3 cols)
│ └──────┘ └──────┘ └──────┘          │
│ ┌──────┐ ┌──────┐ ┌──────┐          │
│ │ ✂️   │ │ 🏨   │ │ 🎨   │          │
│ │Salons│ │Hotels│ │ Arts │          │
│ └──────┘ └──────┘ └──────┘          │
│                                       │
├───────────────────────────────────────┤
│ Trending Near You                     │
│                                       │
│ [Business Card 1]                     │
│ [Business Card 2]                     │ ← List View
│ [Business Card 3]                     │
│ ...                                   │
└───────────────────────────────────────┘
```

#### Components

##### A. Search Bar
- Full-width with rounded corners (radius-lg)
- Magnifying glass icon on left
- Filter icon on right
- Placeholder: "Search businesses, places..."
- Auto-suggestions appear below

##### B. Quick Filters
- Horizontal scrollable chips
- Active state: Primary color fill
- Inactive: Neutral outline
- Filters: Near Me, Trending, Top Rated, New, Open Now

##### C. Category Cards
- 3 columns grid
- Square aspect ratio
- Emoji/icon + category name
- Gradient background per category
- Tap to filter feed by category

##### D. Business Cards (List View)
```
┌─────────────────────────────────────┐
│ ┌──────┐                            │
│ │ IMG  │  Business Name      [Save] │
│ │120px │  ⭐ 4.8 • Category         │
│ │      │  📍 2.3km • $$ • Open      │
│ └──────┘  "Great coffee shop..."    │
└─────────────────────────────────────┘
```

---

### 3. Profile Screen

#### Two Profile Types

##### A. Business Owner Profile

```
┌─────────────────────────────────────────┐
│          [Settings] [Share]              │
├─────────────────────────────────────────┤
│                                          │
│           [Cover Photo]                  │ ← Hero Image
│              1200x400                    │
│                                          │
│     ┌────────┐                          │
│     │Profile │  [Edit Profile]          │ ← Avatar overlaps
│     │ 120px  │                          │    cover photo
│     └────────┘                          │
│                                          │
│     BusinessName     [Business Badge]   │ ← H1
│     Category • Location                  │ ← H4
│     ⭐ 4.8 (234 reviews)                │
│                                          │
│     "Description of business..."         │ ← Body text
│                                          │
│     [📞 Call] [📍 Directions] [🌐 Web] │ ← Action buttons
│                                          │
├─────────────────────────────────────────┤
│ Business Info                            │
│ ─────────────────────────────────────── │
│ 🕒 Hours: Mon-Fri 9AM-6PM               │
│ 📱 Phone: +1 234 567 8900               │
│ 📧 Email: info@business.com             │
│ 🏠 Address: 123 Main St, City           │
│ 💰 Price Range: $$                      │
│ ─────────────────────────────────────── │
│                                          │
│ [About] [Posts] [Photos] [Reviews]      │ ← Tabs
├─────────────────────────────────────────┤
│                                          │
│     Content Area (Tab Content)           │
│                                          │
└─────────────────────────────────────────┘
```

**Business Profile Features:**
1. **Cover Photo**: Full-width hero image (uploaded by business)
2. **Business Badge**: Verified business indicator
3. **Action Buttons**: Call, Directions, Website
4. **Business Hours**: Expandable section with weekly schedule
5. **Contact Information**: Phone, email, address
6. **Tabs**:
   - **About**: Full description, amenities, services
   - **Posts**: All video content (grid view)
   - **Photos**: Photo gallery (grid view)
   - **Reviews**: User reviews and ratings

##### B. User Profile (Normal User)

```
┌─────────────────────────────────────────┐
│          [Settings] [Share]              │
├─────────────────────────────────────────┤
│                                          │
│     ┌────────┐                          │
│     │Profile │  [Edit Profile]          │ ← Avatar
│     │ 120px  │                          │
│     └────────┘                          │
│                                          │
│     Username                             │ ← H1
│     Member since 2024                    │ ← Caption
│                                          │
│     "Bio text here..."                   │ ← Bio
│                                          │
│   [234]       [1.2K]      [890]         │ ← Stats
│   Saved       Following    Followers     │
│                                          │
│                                          │
├─────────────────────────────────────────┤
│ [Saved] [Following] [Activity]          │ ← Tabs
├─────────────────────────────────────────┤
│                                          │
│     Content Area (Tab Content)           │
│                                          │
└─────────────────────────────────────────┘
```

**User Profile Features:**
1. **No Cover Photo**: Simpler design
2. **No Business Badge**: Clear visual difference
3. **Stats**: Saved posts, Following count, Followers
4. **Tabs**:
   - **Saved**: Bookmarked videos/businesses
   - **Following**: Businesses they follow
   - **Activity**: Recent interactions

---

### 4. Posts Tab (Business Profile)

#### Grid Layout
```
┌─────────────────────────────────────────┐
│ [Grid] [List]                    Filter │ ← View toggles
├─────────────────────────────────────────┤
│                                          │
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │Video │ │Video │ │Video │             │ ← 3 col grid
│ │ 1    │ │ 2    │ │ 3    │             │
│ │❤️2.1K│ │❤️890 │ │❤️3.5K│             │
│ └──────┘ └──────┘ └──────┘             │
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │Video │ │Video │ │Video │             │
│ │ 4    │ │ 5    │ │ 6    │             │
│ │❤️1.2K│ │❤️654 │ │❤️2.8K│             │
│ └──────┘ └──────┘ └──────┘             │
│                                          │
└─────────────────────────────────────────┘
```

#### Features
- 3-column grid of video thumbnails
- Like count overlay on bottom
- Play icon overlay on center
- Tap to open full-screen video
- Filter by date, popularity, views
- Toggle between grid and list view

---

### 5. Followers / Following Screen

#### Layout
```
┌─────────────────────────────────────────┐
│ ← Back    Following (1,234)              │ ← Header
├─────────────────────────────────────────┤
│ [🔍 Search following...]                 │ ← Search bar
├─────────────────────────────────────────┤
│ [All] [Businesses] [Users]               │ ← Filter tabs
├─────────────────────────────────────────┤
│                                          │
│ ┌──────┐                                 │
│ │Avatar│  Business Name      [Following]│ ← List item
│ │ 56px │  Category • 2.3km away          │
│ └──────┘                                 │
│ ─────────────────────────────────────── │
│ ┌──────┐                                 │
│ │Avatar│  Another Business   [Follow]   │
│ │ 56px │  Category • 5.1km away          │
│ └──────┘                                 │
│ ─────────────────────────────────────── │
│ ┌──────┐                                 │
│ │Avatar│  User Name          [Following]│
│ │ 56px │  Member since 2024              │
│ └──────┘                                 │
│                                          │
└─────────────────────────────────────────┘
```

#### Features
- Search bar for filtering
- Separate tabs for Businesses and Users
- Follow/Following button with state
- Tap anywhere to view profile
- Sort by: Recent, Alphabetical, Distance (for businesses)
- Show mutual connections
- Batch management (Select multiple to unfollow)

---

### 6. Notifications Screen

#### Layout
```
┌─────────────────────────────────────────┐
│ Notifications               [Mark Read]  │ ← Header
├─────────────────────────────────────────┤
│ [All] [Mentions] [Businesses]            │ ← Filter tabs
├─────────────────────────────────────────┤
│                                          │
│ Today                                    │ ← Section header
│                                          │
│ ┌──────┐                                 │
│ │Avatar│  UserName liked your comment   │ ← Notification
│ │ 40px │  2 minutes ago                  │    item
│ └──────┘                            [❤️]│
│ ─────────────────────────────────────── │
│ ┌──────┐                                 │
│ │Avatar│  BusinessName posted new video │
│ │ 40px │  1 hour ago              [📹]  │
│ └──────┘                                 │
│ ─────────────────────────────────────── │
│                                          │
│ Yesterday                                │
│                                          │
│ ┌──────┐                                 │
│ │Avatar│  UserName started following you│
│ │ 40px │  Yesterday              [Follow]│
│ └──────┘                                 │
│                                          │
└─────────────────────────────────────────┘
```

#### Notification Types
1. **Likes**: Someone liked your comment
2. **Comments**: New comment on a post you follow
3. **Follows**: New follower
4. **Mentions**: Tagged in a comment
5. **Business Updates**: Businesses you follow posted
6. **Bookings**: Booking confirmation/reminder (for businesses)

---

### 7. Settings Screen

#### Layout
```
┌─────────────────────────────────────────┐
│ ← Back    Settings                       │
├─────────────────────────────────────────┤
│                                          │
│ Account                                  │ ← Section
│ ─────────────────────────────────────── │
│ Edit Profile                          → │ ← Menu item
│ ─────────────────────────────────────── │
│ Account Type                          → │
│ (Business / Personal)                    │
│ ─────────────────────────────────────── │
│ Privacy & Security                    → │
│ ─────────────────────────────────────── │
│                                          │
│ Preferences                              │
│ ─────────────────────────────────────── │
│ Notifications                         → │
│ ─────────────────────────────────────── │
│ Language                    English   → │
│ ─────────────────────────────────────── │
│ Location Services              [Toggle] │
│ ─────────────────────────────────────── │
│                                          │
│ Content                                  │
│ ─────────────────────────────────────── │
│ Saved Posts                           → │
│ ─────────────────────────────────────── │
│ Blocked Accounts                      → │
│ ─────────────────────────────────────── │
│                                          │
│ Support                                  │
│ ─────────────────────────────────────── │
│ Help Center                           → │
│ ─────────────────────────────────────── │
│ Report a Problem                      → │
│ ─────────────────────────────────────── │
│ Terms & Privacy                       → │
│ ─────────────────────────────────────── │
│                                          │
│ [Log Out]                                │
│                                          │
└─────────────────────────────────────────┘
```

---

### 8. Map View

#### Purpose
Show all nearby businesses on an interactive map

#### Layout
```
┌─────────────────────────────────────────┐
│ ← [Search bar...]           [List View] │ ← Top overlay
├─────────────────────────────────────────┤
│                                          │
│           Interactive Map                │
│                                          │
│     📍 📍   📍                           │ ← Business pins
│   📍      📍    📍                       │
│        📍    📍                          │
│                                          │
│              [📍 Your Location]          │
│                                          │
├─────────────────────────────────────────┤
│ ┌────────────────────────────────────┐  │ ← Bottom sheet
│ │ BusinessName              [→]      │  │   (swipe up to
│ │ ⭐ 4.8 • Cafe • 2.3km             │  │    expand)
│ │ [Get Directions]                   │  │
│ └────────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

#### Features
- Custom map pins (different colors per category)
- Cluster pins when zoomed out
- Tap pin to show business card preview
- Current location indicator
- Get directions button
- Filter businesses on map by category
- Toggle between map and list view

---

### 9. Comments Modal

#### Layout
```
┌─────────────────────────────────────────┐
│ Comments (234)              [✕ Close]   │ ← Header
├─────────────────────────────────────────┤
│                                          │
│ ┌──────┐                                 │
│ │Avatar│  UserName           2h ago     │ ← Comment
│ │ 40px │  This place is amazing! ❤️     │
│ └──────┘  [❤️ 12] [Reply]               │
│     │                                    │
│     └─ ┌──────┐                         │ ← Reply
│        │Avatar│  Author         1h ago  │
│        │ 32px │  Thank you! 🙏         │
│        └──────┘  [❤️ 3]                 │
│ ─────────────────────────────────────── │
│ ┌──────┐                                 │
│ │Avatar│  AnotherUser        30m ago    │
│ │ 40px │  Great coffee!                 │
│ └──────┘  [❤️ 5] [Reply]                │
│ ─────────────────────────────────────── │
│                                          │
├─────────────────────────────────────────┤
│ [Avatar] [Write a comment...]      [→] │ ← Input bar
└─────────────────────────────────────────┘
```

#### Features
- Scrollable comments list
- Like comments
- Reply to comments (threaded)
- Tag users with @
- Emoji picker
- Report/Delete options
- Sort by: Top, Newest, Oldest

---

### 10. Booking Flow (Business Feature)

#### Step 1: Booking Sheet
```
┌─────────────────────────────────────────┐
│ Book at BusinessName        [✕ Close]   │
├─────────────────────────────────────────┤
│                                          │
│ Select Date                              │
│ ┌─────────────────────────────────────┐ │
│ │      March 2024          < >        │ │
│ │ Su Mo Tu We Th Fr Sa                │ │
│ │                 1  2  3             │ │
│ │  4  5  6  7  8  9 10                │ │
│ │ 11 12 13 14 [15] 16 17              │ │ ← Selected
│ │ 18 19 20 21 22 23 24                │ │
│ │ 25 26 27 28 29 30 31                │ │
│ └─────────────────────────────────────┘ │
│                                          │
│ Select Time                              │
│ [9:00 AM] [10:00 AM] [11:00 AM]         │
│ [1:00 PM] [2:00 PM] [3:00 PM]           │
│                                          │
│ Party Size                               │
│ [ - ]    2 people    [ + ]              │
│                                          │
│ Special Requests (Optional)              │
│ [Text area...]                           │
│                                          │
│ [Continue to Confirm]                    │
│                                          │
└─────────────────────────────────────────┘
```

---

### 11. Bottom Navigation

#### Redesigned Bottom Nav
```
┌─────────────────────────────────────────┐
│                                          │
│  [Home]  [Search]  [+]  [Saved]  [Me]   │
│   🏠      🔍      ⊕      ❤️      👤     │
│  Active  Inactive              Badge    │
│                                          │
└─────────────────────────────────────────┘
```

#### Navigation Items
1. **Home** (Feed icon)
   - Main video feed
   - Active state: Orange fill

2. **Search** (Magnifying glass)
   - Explore/search page
   
3. **Create** (Plus icon) - BUSINESS ONLY
   - Upload new video
   - Larger, elevated button
   - Opens upload flow
   
4. **Saved** (Bookmark icon)
   - Saved/bookmarked content
   - Replaces "Messages" for users
   
5. **Profile** (Avatar)
   - User/business profile
   - Red dot for notifications

---

## 🎭 Account Type Differentiation

### Visual Distinctions

#### Business Owner Account
✅ Gold/orange verified badge next to name  
✅ "Business" label in profile  
✅ Cover photo in profile  
✅ Contact buttons (Call, Website, Directions)  
✅ Business hours and info section  
✅ Upload button in bottom nav  
✅ Posts tab shows their videos  
✅ Reviews tab visible  
✅ Analytics dashboard access  
✅ Booking management  

#### Normal User Account
✅ No badge (or different color badge if verified person)  
✅ "Member" label in profile  
✅ No cover photo  
✅ No contact buttons  
✅ No business hours  
✅ No upload button (hidden in nav)  
✅ Saved tab instead of Posts  
✅ No reviews tab  
✅ No analytics  
✅ Personal bookmarks and collections  

### Functional Differences

| Feature | Business Owner | Normal User |
|---------|---------------|-------------|
| Upload Videos | ✅ Yes | ❌ No |
| Business Profile | ✅ Yes | ❌ No |
| Booking System | ✅ Receive bookings | ✅ Make bookings |
| Comments | ✅ Yes | ✅ Yes |
| Likes | ✅ Yes | ✅ Yes |
| Save Posts | ✅ Yes | ✅ Yes |
| Share | ✅ Yes | ✅ Yes |
| Follow | ✅ Yes | ✅ Yes |
| Analytics | ✅ Yes | ❌ No |
| Promote Posts | ✅ Yes (future) | ❌ No |

---

## 🧩 Component Library

### Buttons

#### Primary Button
```tsx
Style:
- Background: Primary orange gradient
- Text: White, semibold
- Height: 48px
- Border radius: 12px
- Shadow: md
- Hover: Scale 1.02
- Active: Scale 0.98
- Disabled: 40% opacity
```

#### Secondary Button
```tsx
Style:
- Background: Neutral-100
- Text: Neutral-900, semibold
- Border: 1px neutral-300
- Height: 48px
- Border radius: 12px
- Hover: Background neutral-200
- Active: Scale 0.98
```

#### Ghost Button
```tsx
Style:
- Background: Transparent
- Text: Primary-brand, medium
- Height: 40px
- Hover: Background primary-subtle
- Active: Scale 0.98
```

#### Icon Button
```tsx
Style:
- Size: 40x40px
- Background: Neutral-100 or transparent
- Border radius: Full
- Icon size: 20px
- Hover: Background neutral-200
- Active: Scale 0.95
```

### Cards

#### Business Card
```tsx
Style:
- Background: White
- Border: 1px neutral-200
- Border radius: 16px
- Padding: 16px
- Shadow: sm (hover: md)
- Transition: all 0.3s

Layout:
- Thumbnail (120x120px, rounded-lg)
- Title (H3)
- Rating + Category
- Distance + Price + Status
- Description (2 lines)
```

#### Video Card (Grid)
```tsx
Style:
- Aspect ratio: 9:16
- Border radius: 12px
- Overflow: hidden
- Thumbnail with gradient overlay
- Like count overlay (bottom)
- Play icon overlay (center)
```

### Inputs

#### Text Input
```tsx
Style:
- Height: 48px
- Background: Neutral-50
- Border: 1px neutral-300
- Border radius: 12px
- Padding: 0 16px
- Font size: 15px
- Focus: Border primary-brand, shadow-md
- Error: Border error color
```

#### Search Input
```tsx
Style:
- Same as text input
- Icon on left (magnifying glass)
- Clear button on right (when text present)
- Autocomplete dropdown below
```

### Badges

#### Business Badge
```tsx
Style:
- Background: Gold/orange gradient
- Text: White, label-sm, semibold
- Height: 24px
- Border radius: full
- Icon: Crown or star
- Padding: 0 12px
```

#### Category Badge
```tsx
Style:
- Background: Neutral-100
- Text: Neutral-700, label-sm
- Height: 28px
- Border radius: full
- Padding: 0 12px
- Icon optional (emoji or small icon)
```

### Avatars

#### Sizes
- XS: 32px
- SM: 40px
- MD: 56px
- LG: 80px
- XL: 120px

#### Style
```tsx
- Border radius: Full
- Border: 2px white (over images)
- Shadow: sm
- Placeholder: Neutral-200 with initials
- Online indicator: Green dot (bottom right)
```

---

## 🎬 Animations & Interactions

### Micro-interactions

#### Like Animation
```
1. Scale up 1.2x
2. Burst particle effect (red hearts)
3. Scale down to 1.0x
4. Fill heart icon red
Duration: 600ms
```

#### Follow Button
```
1. Fade out "Follow" text
2. Scale button slightly
3. Change color to gray
4. Fade in "Following" text
5. Add checkmark icon
Duration: 400ms
```

#### Save/Bookmark
```
1. Icon flips vertically
2. Fill with color
3. Subtle bounce effect
Duration: 500ms
```

#### Pull to Refresh
```
1. Pull down gesture
2. Show loading spinner
3. Rotate with elastic ease
4. Fade out and refresh content
```

### Page Transitions
```
Default: Slide from right (300ms ease-out)
Modal: Scale from center + fade (250ms)
Bottom Sheet: Slide up (400ms ease-out-cubic)
Tab Switch: Cross-fade (200ms)
```

### Loading States
```
Skeleton Screens:
- Show layout structure
- Shimmer animation (gray to lighter gray)
- Replace with content when loaded
- No spinners for content
```

---

## 📐 Layout & Grid System

### Mobile Grid
```
Container: 100vw
Padding: 16px (mobile), 24px (tablet)
Columns: 4 (mobile), 8 (tablet), 12 (desktop)
Gutter: 16px
Max width: 1280px (centered)
```

### Breakpoints
```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px
```

### Safe Areas
```
Top: 60px (nav bar)
Bottom: 80px (bottom nav)
Sides: 16px minimum
```

---

## 🚀 Implementation Phases

### Phase 1: Foundation (Week 1-2)
**Goal:** Establish design system and core components

**Tasks:**
1. Set up design tokens (colors, typography, spacing)
2. Create base component library
   - Buttons (Primary, Secondary, Ghost, Icon)
   - Cards (Business, Video, User)
   - Inputs (Text, Search)
   - Avatars (all sizes)
   - Badges (Business, Category)
3. Implement new color palette
4. Set up typography system
5. Create animation utilities

**Deliverables:**
- Design tokens file
- Component library (Storybook or similar)
- Updated global styles
- Documentation for components

**Testing:**
- Visual regression tests
- Component unit tests
- Responsive testing

---

### Phase 2: Home Feed Redesign (Week 3)
**Goal:** Upgrade main video feed experience

**Tasks:**
1. Redesign video player component
2. Update action buttons (right side)
   - Implement smooth transitions
   - Add save/bookmark button
   - Improve icon design
3. Redesign business information bar (bottom)
   - Add business badge
   - Improve layout and typography
   - Add rating and distance
4. Implement category filter (top)
5. Update video interactions
   - Pause/play animation
   - Like animation
   - Double-tap to like

**Deliverables:**
- New HomeFeed component
- Updated FeedPost component
- Action buttons with animations
- Business info bar
- Filter dropdown

**Testing:**
- User interaction testing
- Animation performance
- Accessibility testing
- Cross-device testing

---

### Phase 3: Profile Screens (Week 4)
**Goal:** Differentiate and upgrade profile experiences

**Tasks:**
1. Create Business Profile
   - Cover photo support
   - Business badge implementation
   - Contact buttons
   - Business hours section
   - Info section redesign
   - Tabs (About, Posts, Photos, Reviews)
2. Create User Profile
   - Simplified layout
   - Stats display (Saved, Following, Followers)
   - Tabs (Saved, Following, Activity)
3. Implement profile edit flows
4. Add account type switching

**Deliverables:**
- BusinessProfile component
- UserProfile component
- ProfileEdit component
- Account settings

**Testing:**
- Profile data loading
- Tab navigation
- Image upload functionality
- Account switching

---

### Phase 4: Discovery & Search (Week 5)
**Goal:** Build dedicated search and explore features

**Tasks:**
1. Create Search/Explore page
   - Search bar with auto-suggestions
   - Quick filters
   - Category grid
   - Trending businesses list
2. Implement search functionality
   - Search API integration
   - Autocomplete
   - Recent searches
3. Create Map View
   - Interactive map with pins
   - Business markers by category
   - Location services integration
   - Get directions feature
4. Build filter system
   - Category filters
   - Distance filters
   - Rating filters
   - Price range filters

**Deliverables:**
- Explore page
- Search functionality
- Map view component
- Filter system

**Testing:**
- Search performance
- Map interaction
- Location accuracy
- Filter combinations

---

### Phase 5: Social Features (Week 6)
**Goal:** Enhance social interactions

**Tasks:**
1. Redesign Followers/Following screen
   - List view with search
   - Filter tabs
   - Follow/unfollow actions
2. Update Notifications screen
   - Notification types
   - Grouping by date
   - Action buttons
3. Redesign Comments modal
   - Threaded replies
   - Like comments
   - Emoji support
   - Tag users
4. Create Share sheet
   - Share options
   - Copy link
   - Social media integration

**Deliverables:**
- Followers/Following screens
- Notifications system
- Comments modal
- Share sheet

**Testing:**
- Real-time notification delivery
- Comment threading
- Social sharing
- Follow/unfollow actions

---

### Phase 6: Business Features (Week 7)
**Goal:** Implement business-specific functionality

**Tasks:**
1. Create Booking System
   - Date/time picker
   - Party size selection
   - Special requests
   - Confirmation flow
2. Build Analytics Dashboard (Business only)
   - Video views
   - Engagement metrics
   - Follower growth
   - Booking stats
3. Implement Upload Flow (Business only)
   - Video upload
   - Add caption and location
   - Category selection
   - Post scheduling
4. Create Review System
   - Leave review
   - Rating stars
   - Photo upload
   - Sort and filter

**Deliverables:**
- Booking system
- Analytics dashboard
- Video upload flow
- Review system

**Testing:**
- Booking flow end-to-end
- Video upload (large files)
- Analytics accuracy
- Review submission

---

### Phase 7: Polish & Optimization (Week 8)
**Goal:** Finalize design and optimize performance

**Tasks:**
1. Implement Settings screen
   - Account settings
   - Privacy settings
   - Notification preferences
   - Language and region
2. Add empty states
   - No content messages
   - Illustrations
   - Call-to-action buttons
3. Implement error states
   - Network errors
   - 404 pages
   - Permission errors
4. Optimize performance
   - Image lazy loading
   - Video preloading
   - Code splitting
   - Bundle optimization
5. Add loading states
   - Skeleton screens
   - Progress indicators
   - Shimmer effects
6. Accessibility improvements
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
7. Responsive design refinements
   - Tablet layouts
   - Desktop layouts
   - Orientation handling

**Deliverables:**
- Settings screen
- Empty states
- Error handling
- Performance optimizations
- Accessibility improvements
- Responsive layouts

**Testing:**
- Performance benchmarking
- Accessibility audit
- Cross-browser testing
- Device testing
- Load testing

---

### Phase 8: Testing & Launch (Week 9-10)
**Goal:** Comprehensive testing and production release

**Tasks:**
1. Comprehensive QA
   - All user flows
   - Edge cases
   - Error scenarios
2. Beta testing
   - Internal team testing
   - Limited user beta
   - Feedback collection
3. Bug fixes and refinements
4. Documentation
   - User guide
   - Developer documentation
   - Design system docs
5. Production deployment
   - Staged rollout
   - Monitoring setup
   - Analytics tracking

**Deliverables:**
- QA report
- Beta feedback summary
- Bug fix releases
- Documentation
- Production deployment

**Testing:**
- End-to-end testing
- Regression testing
- Performance monitoring
- User acceptance testing

---

## 📊 Success Metrics

### Key Performance Indicators (KPIs)

#### User Engagement
- Daily Active Users (DAU)
- Video completion rate
- Average session duration
- Videos watched per session
- Engagement rate (likes, comments, shares)

#### Discovery
- Search usage rate
- Category filter usage
- Business profile visits from feed
- Direction requests
- Bookmark/save rate

#### Business Metrics
- Business account sign-ups
- Video upload frequency
- Booking conversion rate
- Business follower growth
- Review submission rate

#### Technical Performance
- Page load time (< 2 seconds)
- Video start time (< 1 second)
- App crash rate (< 0.1%)
- API response time (< 500ms)
- Lighthouse score (> 90)

### User Satisfaction
- App store rating (target: 4.5+)
- Net Promoter Score (NPS)
- User feedback sentiment
- Feature adoption rate
- User retention (D1, D7, D30)

---

## 🔍 Quality Assurance Checklist

### Design Consistency
- [ ] All screens follow design system
- [ ] Typography is consistent
- [ ] Color palette is correctly applied
- [ ] Spacing follows grid system
- [ ] Icons are consistent style
- [ ] Shadows and elevations are correct
- [ ] Border radius is consistent

### Functionality
- [ ] All buttons are clickable
- [ ] Forms validate correctly
- [ ] Navigation works properly
- [ ] Search returns results
- [ ] Filters work correctly
- [ ] Video playback is smooth
- [ ] Maps load and interact properly
- [ ] Booking flow completes
- [ ] Notifications deliver
- [ ] Profile updates save

### Responsiveness
- [ ] Mobile layout (320px - 639px)
- [ ] Tablet layout (640px - 1023px)
- [ ] Desktop layout (1024px+)
- [ ] Portrait and landscape
- [ ] Touch targets (min 44x44px)
- [ ] Text readability at all sizes

### Performance
- [ ] Images optimized
- [ ] Videos compressed
- [ ] Code minified
- [ ] Bundle size optimized
- [ ] Lazy loading implemented
- [ ] Caching strategy in place
- [ ] API calls optimized

### Accessibility
- [ ] Alt text for images
- [ ] ARIA labels present
- [ ] Keyboard navigation
- [ ] Screen reader compatible
- [ ] Color contrast (WCAG AA)
- [ ] Focus indicators visible
- [ ] Form labels associated

### Cross-browser
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

### Account Types
- [ ] Business badge displays correctly
- [ ] Upload button only for businesses
- [ ] Profile differences clear
- [ ] Business features restricted to business accounts
- [ ] User features work for both types

---

## 📝 Technical Implementation Guidelines

### Frontend Stack
```
Framework: React (18+) or React Native
Language: TypeScript
Styling: Tailwind CSS + CSS Modules
State: React Context + Hooks or Zustand
Routing: React Router (web) or React Navigation (mobile)
Maps: Mapbox or Google Maps
Video: Video.js or React Player
Forms: React Hook Form + Zod
API: Axios or Fetch
```

### File Structure
```
src/
├── components/          # Reusable components
│   ├── buttons/
│   ├── cards/
│   ├── inputs/
│   ├── modals/
│   └── ...
├── screens/            # Page-level components
│   ├── HomeFeed/
│   ├── Profile/
│   ├── Search/
│   └── ...
├── hooks/              # Custom hooks
├── contexts/           # React contexts
├── services/           # API services
├── utils/              # Utility functions
├── types/              # TypeScript types
├── constants/          # Constants & enums
├── assets/             # Images, icons
└── styles/             # Global styles, tokens
```

### Component Architecture
```tsx
// Example component structure
import React from 'react';
import styles from './Component.module.css';

interface ComponentProps {
  // Props with TypeScript
}

export const Component: React.FC<ComponentProps> = ({ 
  // Destructured props
}) => {
  // Hooks
  // State
  // Effects
  // Handlers
  
  return (
    // JSX
  );
};
```

### State Management
```
Global State (Context/Zustand):
- User authentication
- User profile data
- App settings
- Theme preferences

Local State (useState):
- Form inputs
- UI toggles
- Component-specific state

Server State (React Query):
- API data
- Cached responses
- Background sync
```

### API Integration
```typescript
// Example API service
export const businessAPI = {
  getBusinessProfile: (id: string) => 
    api.get(`/businesses/${id}`),
  
  updateBusiness: (id: string, data: BusinessData) =>
    api.put(`/businesses/${id}`, data),
    
  getNearbyBusinesses: (lat: number, lng: number, radius: number) =>
    api.get(`/businesses/nearby`, { params: { lat, lng, radius } }),
};
```

### Component Naming Conventions
```
Components: PascalCase (BusinessCard.tsx)
Files: PascalCase for components, camelCase for utilities
CSS Modules: Component.module.css
Hooks: use prefix (useAuth.ts)
Contexts: Context suffix (AuthContext.tsx)
Types: Type/Interface suffix (UserType.ts)
```

---

## 🎨 Design Assets Needed

### Icons
- [ ] Navigation icons (Home, Search, Profile, etc.)
- [ ] Action icons (Like, Comment, Share, Save, etc.)
- [ ] Category icons (Restaurant, Cafe, Gym, etc.)
- [ ] Map markers (custom per category)
- [ ] Business badge icon
- [ ] Verification checkmark
- [ ] Notification type icons

### Illustrations
- [ ] Empty state illustrations
- [ ] Error state illustrations
- [ ] Onboarding illustrations
- [ ] 404 page illustration
- [ ] Loading states

### Images
- [ ] Default avatar placeholder
- [ ] Default cover photo
- [ ] App logo (various sizes)
- [ ] Splash screen
- [ ] App store screenshots

### Animations
- [ ] Like/heart burst animation
- [ ] Follow button transition
- [ ] Loading spinner
- [ ] Pull-to-refresh animation
- [ ] Skeleton screen shimmer

---

## 🌐 Internationalization (i18n)

### Supported Languages (Initial)
- English (default)
- Spanish
- French
- German
- Japanese
- Chinese (Simplified)

### Implementation
```typescript
// Example i18n structure
{
  "en": {
    "home": {
      "title": "Discover",
      "filter": "Filter by category"
    },
    "profile": {
      "edit": "Edit Profile",
      "followers": "Followers"
    }
  }
}
```

### Best Practices
- Use translation keys, not hardcoded strings
- Support RTL languages (Arabic, Hebrew)
- Format dates/times per locale
- Format numbers/currency per locale
- Translate all user-facing text
- Keep translations short for mobile

---

## 🔐 Security & Privacy

### Data Protection
- Encrypt sensitive data in transit (HTTPS)
- Secure user authentication (JWT/OAuth)
- Validate all user inputs
- Sanitize user-generated content
- Implement rate limiting
- Use secure password policies

### Privacy Features
- Clear privacy policy
- Granular privacy settings
- Data export functionality
- Account deletion option
- Block/report users
- Content moderation

### Business Data
- Verify business ownership
- Secure business information
- Protect customer booking data
- Secure payment processing (if applicable)

---

## 📱 Platform-Specific Considerations

### iOS
- Follow iOS Human Interface Guidelines
- Use native navigation patterns
- Support Face ID/Touch ID
- Implement haptic feedback
- Handle notch and safe areas
- Support dark mode

### Android
- Follow Material Design guidelines
- Use native navigation patterns
- Support biometric authentication
- Implement proper back button behavior
- Handle various screen sizes
- Support dark mode

### Web
- Progressive Web App (PWA) capabilities
- Responsive design
- Browser compatibility
- SEO optimization
- Social media meta tags
- Fast initial load

---

## 🎓 User Onboarding

### First-Time User Flow
```
1. Splash Screen (2s)
   ↓
2. Welcome Screen
   - App overview
   - Key features
   - [Get Started]
   ↓
3. Account Type Selection
   - Business Owner
   - Regular User
   ↓
4. Sign Up / Login
   - Email + Password
   - Social login options
   ↓
5. Profile Setup
   Business: Business name, category, location, photo
   User: Username, interests, photo (optional)
   ↓
6. Interest Selection
   - Choose categories of interest
   - At least 3 selections
   ↓
7. Location Permission
   - Request location access
   - Explain benefits
   - [Allow] or [Skip]
   ↓
8. Notification Permission
   - Request notification access
   - Explain notification types
   - [Allow] or [Skip]
   ↓
9. Feed Tutorial
   - Quick interactive tutorial
   - Swipe to scroll
   - Tap to pause
   - [Got it]
   ↓
10. Enter Home Feed
```

### Tutorial Tooltips
- Show once per feature
- Dismissible
- Non-intrusive
- Can be replayed in settings

---

## 🔄 Future Enhancements (Post-MVP)

### Phase 2 Features
1. **Direct Messaging**
   - Chat with businesses
   - Inquiry about services
   - Share locations/posts

2. **Stories Feature**
   - 24-hour temporary content
   - Business announcements
   - Special offers

3. **Live Streaming**
   - Live business tours
   - Q&A sessions
   - Events coverage

4. **Advanced Analytics**
   - Audience demographics
   - Peak engagement times
   - Conversion tracking

5. **Advertising Platform**
   - Promoted posts for businesses
   - Sponsored content
   - Ad manager dashboard

6. **Collections**
   - Create custom collections
   - Share collections
   - Collaborative collections

7. **Augmented Reality (AR)**
   - AR business previews
   - Virtual tours
   - AR wayfinding

8. **Multi-language Support**
   - More languages
   - Auto-translation for comments
   - Regional content

---

## 📞 Support & Maintenance

### Post-Launch Support
- Bug fix releases (weekly)
- Feature updates (monthly)
- Performance monitoring
- User feedback collection
- Analytics review
- A/B testing

### Monitoring
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Analytics (Google Analytics, Mixpanel)
- User feedback (in-app)
- App store reviews

---

## ✅ Acceptance Criteria

### Design
- [ ] All screens match design specifications
- [ ] Design system is consistently applied
- [ ] Animations are smooth (60fps)
- [ ] Responsive on all screen sizes
- [ ] Accessible (WCAG AA compliant)
- [ ] Dark mode implemented (if applicable)

### Functionality
- [ ] All user flows work end-to-end
- [ ] No critical bugs
- [ ] Search returns accurate results
- [ ] Video playback is reliable
- [ ] Bookings process correctly
- [ ] Notifications deliver reliably
- [ ] Location features work accurately

### Performance
- [ ] App loads in < 2 seconds
- [ ] Videos start in < 1 second
- [ ] Smooth scrolling (60fps)
- [ ] No memory leaks
- [ ] Optimized bundle size
- [ ] Efficient API calls

### Business Requirements
- [ ] Business and user accounts differentiated
- [ ] Business profiles complete with all info
- [ ] Upload feature works (business only)
- [ ] Booking system functional
- [ ] Location discovery accurate
- [ ] Reviews system working

---

## 📚 Resources & References

### Design Inspiration
- Instagram (social features)
- TikTok (video feed)
- Yelp (business discovery)
- Google Maps (location features)
- Airbnb (booking experience)

### Design Tools
- Figma (design and prototyping)
- Adobe XD (alternative)
- Principle (animations)
- Lottie (animation export)

### Development Resources
- React Documentation
- TypeScript Handbook
- Tailwind CSS Documentation
- React Navigation Documentation
- Mapbox Documentation

### Testing Tools
- Jest (unit testing)
- React Testing Library
- Cypress (E2E testing)
- Lighthouse (performance)
- axe DevTools (accessibility)

---

## 🚦 Go-Live Checklist

### Pre-Launch
- [ ] All features implemented and tested
- [ ] Design QA completed
- [ ] Performance optimization done
- [ ] Accessibility audit passed
- [ ] Security audit completed
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] App store assets prepared
- [ ] Marketing materials ready
- [ ] Support documentation created
- [ ] Beta testing completed
- [ ] Feedback incorporated

### Launch Day
- [ ] Production deployment
- [ ] Monitoring enabled
- [ ] Analytics tracking active
- [ ] Error logging configured
- [ ] Support team briefed
- [ ] Social media announcement
- [ ] App store submission
- [ ] Press release (if applicable)

### Post-Launch
- [ ] Monitor error rates
- [ ] Track user feedback
- [ ] Analyze key metrics
- [ ] Address critical issues immediately
- [ ] Plan first update
- [ ] Collect user testimonials
- [ ] Iterate based on data

---

## 📝 Version History

**v1.0** - November 29, 2024
- Initial design upgrade plan
- Complete UI/UX specifications
- Implementation roadmap
- Component library definitions
- Testing guidelines

---

## 🤝 Contributors & Contact

### Design Team
- Lead Designer: [To be assigned]
- UI/UX Designer: [To be assigned]
- Visual Designer: [To be assigned]

### Development Team
- Frontend Lead: [To be assigned]
- Backend Lead: [To be assigned]
- Mobile Developer: [To be assigned]

### Product Team
- Product Manager: [To be assigned]
- Business Analyst: [To be assigned]

---

## 📄 License & Usage

This design specification document is proprietary and confidential. It is intended solely for use by the development team working on the Business Discovery Platform. Unauthorized distribution or reproduction is prohibited.

---

**End of Document**

For questions or clarifications, please contact the product team.

Last updated: November 29, 2024
