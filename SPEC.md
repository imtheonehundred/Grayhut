# NOIR ESSENCE - Luxury Perfume E-Commerce

## Concept & Vision

NOIR ESSENCE is a cinematic, high-end perfume e-commerce experience that evokes the sophistication of a Parisian haute couture house. The website feels like stepping into a dimly lit boutique where gold accents catch the light, and every interaction feels deliberate and luxurious. The design draws inspiration from Dior's minimal elegance meets Tom Ford's bold sensuality.

## Design Language

### Aesthetic Direction
- **Reference**: Dior Beauty meets Tom Ford Beauty - dark, sensual, cinematic
- **Mood**: Exclusive, intimate, prestigious
- **Feel**: Like unboxing a luxury item in a velvet-lined boutique

### Color Palette
```
Primary:     #1f1f1f (Rich Black)
Secondary:   #5a0f1c (Deep Burgundy/Maroon)
Accent:      #d4af37 (Metallic Gold)
Background:  #0d0d0d (Near Black)
Surface:     #1a1a1a (Dark Gray)
Text:        #f5f5f5 (Off White)
Text Muted:  #888888 (Gray)
```

### Typography
- **Titles**: "Playfair Display" (serif) - elegant, luxury feel
- **Body**: "Inter" (sans-serif) - clean, modern readability
- **Accent**: "Cormorant Garamond" - for special callouts

### Spatial System
- Base unit: 4px
- Section padding: 80px-120px vertical
- Container max-width: 1400px
- Card padding: 24px-32px

### Motion Philosophy
- **Entrance**: Fade up with stagger (400ms ease-out, 80ms stagger)
- **Hover**: Scale 1.02-1.05 with gold glow
- **Transitions**: Smooth 300-500ms with cubic-bezier(0.4, 0, 0.2, 1)
- **Scroll**: Parallax on hero, reveal on scroll for sections
- **Micro-interactions**: Button pulse on hover, subtle shimmer on gold elements

### Visual Assets
- **Icons**: Lucide React (thin stroke, elegant)
- **Images**: High-quality perfume bottle images (placeholder URLs from Unsplash)
- **Decorative**: Gold gradient lines, glassmorphism cards, particle effects

## Layout & Structure

### Page Flow (Visual Pacing)
1. **Hero** (100vh) - Immersive, cinematic, breathing space
2. **Featured Perfumes** - Dense grid, product-focused
3. **Categories** - Visual break, large imagery
4. **Special Offer** - Urgency, countdown creates tension
5. **About Brand** - Storytelling, slower pace
6. **Testimonials** - Social proof, human element
7. **Newsletter** - Call to action, intimacy
8. **Footer** - Closure, comprehensive links

### Responsive Strategy
- Desktop: Full experience with all effects
- Tablet: Simplified grid (2 cols), maintained animations
- Mobile: Single column, reduced animations, touch-optimized

## Features & Interactions

### Shopping Cart System
- Slide-out drawer from right
- Add/remove items with quantity controls
- Running total with gold accent
- Checkout button (non-functional demo)
- Persist to localStorage

### Product Cards
- Image with zoom on hover (scale 1.1)
- Gold border glow on hover
- Quick "Add to Cart" button appears on hover
- Price in gold accent

### Search & Filter
- Search bar with live filtering
- Filter by: Category, Price range, Gender
- Sort by: Price (low/high), Newest, Name
- Animated filter panel

### Special Offer Countdown
- Days, Hours, Minutes, Seconds
- Flip/scale animation on each tick
- Urgent red accent when < 24 hours

### Testimonials Slider
- Auto-play with pause on hover
- Dot indicators
- Smooth crossfade transition
- Avatar images with gold ring border

## Component Inventory

### 1. Navbar
- **Default**: Transparent, logo centered, links on sides
- **Scrolled**: Glassmorphism background, subtle shadow
- **Mobile**: Hamburger menu, full-screen overlay

### 2. Hero Section
- Full viewport height
- Centered text with gradient overlay
- Animated particles/smoke effect (CSS)
- "Shop Now" CTA with gold gradient border

### 3. ProductCard
- **Default**: Dark surface, image, name, price
- **Hover**: Scale up, gold glow, "Add to Cart" visible
- **Loading**: Skeleton with shimmer
- **In Cart**: Checkmark indicator

### 4. CategoryCard
- Large background image
- Overlay gradient
- Centered text with gold accent line
- Hover: Image zoom, text glow

### 5. CountdownTimer
- Four boxes (D/H/M/S)
- Gold border, dark fill
- Number flip animation
- Red accent when urgent

### 6. TestimonialCard
- Quote text in italic serif
- Avatar with gold ring
- Name and title below
- Star rating in gold

### 7. NewsletterInput
- Dark input with gold border
- Placeholder in muted text
- Submit button with gold gradient
- Success state with checkmark

### 8. CartDrawer
- Slide from right (300ms)
- Overlay backdrop (50% black)
- Item list with quantity controls
- Sticky checkout button at bottom

### 9. Button Variants
- **Primary**: Gold gradient background, dark text
- **Secondary**: Transparent, gold border
- **Ghost**: Text only with underline on hover
- **Icon**: Circle, gold on hover

### 10. Footer
- Three columns: Links, Social, Contact
- Gold divider line
- Copyright with current year

## Technical Approach

### Stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom config
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State**: React useState/useContext (no Redux needed)

### Architecture
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── FeaturedPerfumes.jsx
│   │   ├── Categories.jsx
│   │   ├── SpecialOffer.jsx
│   │   ├── AboutBrand.jsx
│   │   ├── Testimonials.jsx
│   │   └── Newsletter.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── CountdownTimer.jsx
│   │   ├── TestimonialCard.jsx
│   │   ├── CartDrawer.jsx
│   │   └── SearchFilter.jsx
│   └── effects/
│       └── ParticleEffect.jsx
├── context/
│   └── CartContext.jsx
├── data/
│   └── products.js
├── App.jsx
├── index.css
└── main.jsx
```

### Data Model
```javascript
Product {
  id: number,
  name: string,
  brand: string,
  price: number,
  originalPrice?: number,
  image: string,
  category: string, // men | women | unisex | arabian | luxury
  gender: string,   // male | female | unisex
  notes: { top: string, middle: string, base: string },
  description: string,
  inStock: boolean,
  isFeatured: boolean,
  isNew: boolean
}

CartItem {
  product: Product,
  quantity: number
}
```

### Performance Optimizations
- Lazy load images below fold
- Use CSS transforms for animations (GPU accelerated)
- Debounce search input
- Memoize filtered results
