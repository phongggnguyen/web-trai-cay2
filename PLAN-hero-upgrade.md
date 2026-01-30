# PLAN-hero-upgrade.md

> **Task**: Upgrade Hero Section to Dynamic Carousel
> **Focus**: Visual Experience (Aesthetic > Pure Speed)
> **Status**: APPROVED

## 1. Overview
Upgrade the current static Hero section to a **Dynamic Slider/Carousel**.
-   **Goal**: Showcase multiple promotions/messages (3-5 slides).
-   **Style**: "Bold & Vibrant" maintained. Smooth transitions, text animations, and premium feel.
-   **Content**: Use customized AI-generated images.

## 2. Technical Decisions
-   **Carousel Library**: `swiper` (Standard, robust, great effect support).
-   **Animation**: `framer-motion` (for text staggering and element entrance).
-   **Images**: Local AI-generated images (`public/images/hero/`).

## 3. File Structure
```
app/
├── components/
│   ├── Hero/
│   │   ├── HeroCarousel.tsx   [MODIFIED] (Center Navigation)
│   │   ├── HeroSlide.tsx      [NEW] (Individual slide)
│   │   └── data.ts            [NEW] (Slide content)
```

## 4. Task Breakdown

### Phase 1: Setup & Assets [(Frontend-Specialist)]
- [x] **Install Dependencies**: `npm install swiper framer-motion`
- [x] **Define Slide Data**: Create 3 thematic slides (Vitamin C, Summer Vibes, Organic).
- [x] **Asset Sourcing**: Generate and save 3 AI images locally.

### Phase 2: Implementation [(Frontend-Specialist)]
- [x] **Create `HeroSlide.tsx`**: Layout + Animation.
- [x] **Create `HeroCarousel.tsx`**: Swiper config + Custom Styling.
- [x] **Integrate**: Replace static Hero in `app/page.tsx`.

### Phase 3: Polish & Visuals [(Frontend-Design)]
- [x] **Redesign Navigation**: Reposition arrows to Center (Option A).
- [/] **Mobile Adjustments**: Ensure text is readable on mobile (adjust overlay opacity).

## 5. Verification Plan (Phase X)
- [ ] **Visual Check**:
    -   Arrows are centered vertically?
    -   Arrows don't overlap text awkwardly?
    -   Hover effects work?
- [ ] **Mobile Check**: Touch swipe works? Content fits screen?

## 6. Next Steps
Move arrows in `HeroCarousel.tsx`.
