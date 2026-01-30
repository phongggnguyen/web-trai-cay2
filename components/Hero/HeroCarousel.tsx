'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, Pagination, Navigation } from 'swiper/modules';
import { heroSlides } from './data';
import HeroSlide from './HeroSlide';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroCarousel = () => {
    return (
        <div className="relative px-4 py-6 md:px-10 lg:py-8">
            <div className="mx-auto max-w-[1280px]">
                {/* Main Swiper Container */}
                <div className="relative min-h-[500px] md:min-h-[550px] lg:min-h-[550px] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <Swiper
                        modules={[Autoplay, EffectCreative, Pagination, Navigation]}
                        effect={'creative'}
                        creativeEffect={{
                            prev: {
                                shadow: true,
                                translate: ['-20%', 0, -1],
                            },
                            next: {
                                translate: ['100%', 0, 0],
                            },
                        }}
                        loop={true}
                        speed={1000}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            el: '.hero-pagination', // Custom pagination element
                        }}
                        navigation={{
                            nextEl: '.hero-next',
                            prevEl: '.hero-prev',
                        }}
                        className="h-full w-full"
                    >
                        {heroSlides.map((slide) => (
                            <SwiperSlide key={slide.id} className="h-full w-full">
                                {({ isActive }) => (
                                    <HeroSlide slide={slide} isActive={isActive} />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Arrows */}
                    <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3">
                        <button className="hero-prev flex h-12 w-12 items-center justify-center rounded-full glass hover:bg-white/20 text-white transition-all active:scale-95 disabled:opacity-50">
                            <span className="material-symbols-outlined text-2xl">arrow_back</span>
                        </button>
                        <button className="hero-next flex h-12 w-12 items-center justify-center rounded-full glass hover:bg-white/20 text-white transition-all active:scale-95 disabled:opacity-50">
                            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                        </button>
                    </div>

                    {/* Custom Pagination Container */}
                    <div className="hero-pagination absolute bottom-8 left-1/2 md:left-12 transform -translate-x-1/2 md:translate-x-0 z-20 flex gap-2 justify-center md:justify-start"></div>
                </div>
            </div>

            {/* CSS Injection for custom Swiper styling */}
            <style jsx global>{`
        .hero-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #4cdf20; /* Primary Green */
        }
      `}</style>
        </div>
    );
};

export default HeroCarousel;
