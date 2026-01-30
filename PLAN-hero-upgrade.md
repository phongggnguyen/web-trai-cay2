# PLAN-hero-upgrade.md

> **Task**: Upgrade Hero Section to Dynamic Carousel
> **Focus**: Visual Experience (Aesthetic > Pure Speed)
> **Status**: APPROVED

## 1. Overview
Upgrade the current static Hero section to a **Dynamic Slider/Carousel**.
-   **Goal**: Showcase multiple promotions/messages (3-5 slides).
-   **Style**: "Bold & Vibrant" maintained. Smooth transitions, text animations, and premium feel.
-   **Content**: Use high-quality placeholder images (Unsplash/Pexels) since user has no banners.

## 2. Technical Decisions
-   **Carousel Library**: `swiper` (Standard, robust, great effect support) or `embla-carousel-react` (Lightweight).
    -   *Decision*: **Swiper** (Supports 'Creative' effects out of the box, easier for "Visual Experience").
-   **Animation**: `framer-motion` (for text staggering and element entrance).
-   **Images**: Direct URLs from Unsplash (High Res).

## 3. File Structure
```
app/
├── components/
│   ├── Hero/
│   │   ├── HeroCarousel.tsx   [NEW] (Main wrapper)
│   │   ├── HeroSlide.tsx      [NEW] (Individual slide)
│   │   └── data.ts            [NEW] (Slide content)
```

## 4. Task Breakdown

### Phase 1: Setup & Assets [(Frontend-Specialist)]
- [x] **Install Dependencies**: `npm install swiper framer-motion`
- [x] **Define Slide Data**: Create 3 thematic slides (Vitamin C, Summer Vibes, Organic).
- [x] **Asset Sourcing**: Select 3 matching images from Unsplash.

### Phase 2: Implementation [(Frontend-Specialist)]
- [x] **Create `HeroSlide.tsx`**:
    -   Layout: Background image + Gradient Overlay + Text Content.
    -   Animation: Text enters from bottom, image smooth zoom (Ken Burns effect).
- [x] **Create `HeroCarousel.tsx`**:
    -   Config: Autoplay (5s), Loop, Pagination (Dots), Navigation (Arrows).
    -   Effect: 'Fade' or 'Creative' transition for premium feel.
- [x] **Integrate**: Replace static Hero in `app/page.tsx` with `<HeroCarousel />`.

### Phase 3: Polish & Visuals [(Frontend-Design)]
- [ ] **Custom Navigation**: Style arrow buttons (Glassmorphism).
- [ ] **Custom Pagination**: Style active/inactive dots.
- [ ] **Mobile Adjustments**: Ensure text is readable on mobile (adjust overlay opacity).

## 5. Verification Plan (Phase X)
- [ ] **Visual Check**:
    -   Slides transition smoothly?
    -   Images look sharp but load reasonably fast?
- [ ] **Mobile Check**: Touch swipe works? Content fits screen?
- [ ] **Console Check**: No hydration errors usually caused by sliders.

## 6. Next Steps
Run `/create` or simply ask to "Proceed with plan" to start implementation.
