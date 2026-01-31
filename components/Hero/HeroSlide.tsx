'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

interface HeroSlideProps {
    slide: {
        id: number;
        image: string;
        tag: string;
        title: string;
        description: string;
        ctaPrimary: string;
        ctaSecondary: string;
        color: string;
        overlayColor: string;
        shadowColor: string;
    };
    isActive: boolean;
}

const HeroSlide: React.FC<HeroSlideProps> = ({ slide, isActive }) => {
    // Animation variants
    const textVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: custom * 0.15 + 0.3, // Stagger effect
                duration: 0.8,
                ease: "easeOut"
            }
        })
    };

    const imageVariants: Variants = {
        hidden: { scale: 1.1 },
        visible: {
            scale: 1,
            transition: {
                duration: 6, // Slow zoom-out (Ken Burns effect)
                ease: "linear"
            }
        }
    };

    return (
        <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-gray-900">
            {/* Background Image with Ken Burns Effect */}
            <motion.div
                className="absolute inset-0 h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                variants={imageVariants}
            />

            {/* Dynamic Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.overlayColor} via-black/20 to-black/60 opacity-80 md:opacity-60`}></div>

            {/* Absolute Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-12 lg:p-14 max-w-[1280px] mx-auto w-full">
                <div className="max-w-3xl">
                    {/* Animated Tag */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate={isActive ? "visible" : "hidden"}
                        variants={textVariants}
                        className="mb-4"
                    >
                        <span className={`inline-block rounded-full bg-gradient-to-r ${slide.color} px-5 py-1.5 text-[10px] mobile-s:text-xs font-black uppercase tracking-widest text-white shadow-lg ${slide.shadowColor}`}>
                            {slide.tag}
                        </span>
                    </motion.div>

                    {/* Animated Title */}
                    <motion.h1
                        custom={1}
                        initial="hidden"
                        animate={isActive ? "visible" : "hidden"}
                        variants={textVariants}
                        className="mb-4 text-4xl font-black leading-[1.1] tracking-tighter text-white md:text-6xl lg:text-7xl drop-shadow-2xl"
                    >
                        {slide.title}
                    </motion.h1>

                    {/* Animated Description */}
                    <motion.p
                        custom={2}
                        initial="hidden"
                        animate={isActive ? "visible" : "hidden"}
                        variants={textVariants}
                        className="mb-8 text-base font-semibold text-gray-100 md:text-xl max-w-lg leading-relaxed drop-shadow-lg"
                    >
                        {slide.description}
                    </motion.p>

                    {/* Animated Buttons */}
                    <motion.div
                        custom={3}
                        initial="hidden"
                        animate={isActive ? "visible" : "hidden"}
                        variants={textVariants}
                        className="flex flex-wrap gap-4"
                    >
                        <Link
                            href="/products"
                            className={`group/btn relative inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r ${slide.color} px-8 text-sm md:text-base font-black text-white hover:text-white overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg ${slide.shadowColor}`}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></span>
                            <span className="material-symbols-outlined mr-2 text-[20px] md:text-[22px] relative z-10">local_mall</span>
                            <span className="relative z-10">{slide.ctaPrimary}</span>
                        </Link>

                        <button className="inline-flex h-14 items-center justify-center rounded-full glass px-6 md:px-8 text-sm md:text-base font-bold text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
                            <span className="material-symbols-outlined mr-2 text-[18px] md:text-[20px]">celebration</span>
                            {slide.ctaSecondary}
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlide;
