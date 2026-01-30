# PLAN-hero-images.md

> **Task**: Generate & Add AI Images for Hero Carousel
> **Style**: Realistic Photos (Studio-quality fruit photography)
> **Storage**: Local (`public/images/hero/`)
> **Status**: APPROVED

## 1. Overview
Generate 3 custom AI images for the Hero Carousel slides, matching the existing color themes and content.

## 2. Image Requirements

### Slide 1: Vitamin C Theme (Orange/Yellow)
- **Subject**: Fresh oranges/citrus fruits
- **Style**: Vibrant, energetic, morning sunlight
- **Colors**: Orange, yellow, warm tones
- **Mood**: Fresh, awakening, health boost

### Slide 2: Summer Vibes (Red/Pink)
- **Subject**: Strawberries/watermelon
- **Style**: Juicy, refreshing, summer feeling
- **Colors**: Red, pink, fresh green leaves
- **Mood**: Sweet, romantic, summer freshness

### Slide 3: Organic/Healthy (Green)
- **Subject**: Avocado/kiwi/green fruits
- **Style**: Premium, organic, natural
- **Colors**: Green, earth tones
- **Mood**: Calm, healthy, premium quality

## 3. Technical Specs
- **Resolution**: 1920x1080px minimum (landscape)
- **Format**: WebP (optimized for web)
- **File Size**: <200KB each (after optimization)
- **Save Location**: `public/images/hero/slide-1.webp`, `slide-2.webp`, `slide-3.webp`

## 4. Task Breakdown

### Phase 1: Image Generation
- [ ] Generate Slide 1 (Orange/Citrus theme)
- [ ] Generate Slide 2 (Strawberry/Summer theme)
- [ ] Generate Slide 3 (Avocado/Green theme)

### Phase 2: Integration
- [ ] Save images to `public/images/hero/`
- [ ] Update `components/Hero/data.ts` with local paths
- [ ] Test image loading and performance

### Phase 3: Verification
- [ ] Visual check: Images match theme?
- [ ] Performance check: Load time acceptable?
- [ ] Mobile check: Images look good on small screens?

## 5. Next Steps
Run `/create` or ask to "Proceed" to start generating images.
