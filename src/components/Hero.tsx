import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroSlides, type HeroSlide } from '../data/landingData.ts';
import { SilkRibbon } from './ui/SilkRibbon.tsx';
import { MagneticWrapper } from './ui/MagneticWrapper.tsx';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const silkParallaxRef = useRef<HTMLDivElement>(null);
  const heroStageParallaxRef = useRef<HTMLDivElement>(null);
  const pointerShiftRef = useRef<HTMLDivElement>(null);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideStep, setSlideStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = right-to-left, -1 = left-to-right
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const isFinePointerRef = useRef<boolean>(false);
  const isReducedMotionRef = useRef<boolean>(false);

  const activeSlide: HeroSlide = heroSlides[currentSlideIndex];
  const totalSlides = heroSlides.length;

  // Check pointer and reduced-motion capabilities
  useEffect(() => {
    if (typeof window === 'undefined') return;
    isFinePointerRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // GSAP ScrollTrigger: Dual-layer vertical parallax scrub
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (silkParallaxRef.current && heroRef.current) {
        gsap.to(silkParallaxRef.current, {
          y: 48,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      if (heroStageParallaxRef.current && heroRef.current) {
        gsap.to(heroStageParallaxRef.current, {
          y: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Next Slide: Coordinated Right-to-Left Transition
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    setSlideStep((prev) => prev + 1);
  }, [totalSlides]);

  // Previous Slide: Coordinated Left-to-Right Transition
  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setSlideStep((prev) => prev - 1);
  }, [totalSlides]);

  // Keyboard navigation (ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Subtle Autoplay (7.5 seconds), paused on hover or reduced-motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 7500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch gesture support for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  // Subtle dual-axis pointer parallax on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isFinePointerRef.current || isReducedMotionRef.current || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const deltaX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const deltaY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    if (pointerShiftRef.current) {
      gsap.to(pointerShiftRef.current, {
        x: deltaX * 10,
        y: deltaY * 6,
        duration: 0.85,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (pointerShiftRef.current) {
      gsap.to(pointerShiftRef.current, {
        x: 0,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  // Soft, continuous editorial easing curve (velvety acceleration, gentle deceleration)
  const editorialEase = [0.22, 1, 0.36, 1] as const;

  // Unified slide container:
  // Both the exiting slide and entering slide move SIMULTANEOUSLY with a uniform separation gap.
  // Using custom={direction} guarantees the exact correct direction whether moving forward or backward.
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '110%' : '-110%',
      opacity: 0,
    }),
    center: {
      x: '0%',
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-110%' : '110%',
      opacity: 0,
    }),
  };

  // 1. Ảnh Nhỏ (Small Photo Variants): Foreground agile card
  // "Người nhanh": Moves fastest, leads the entry and exit with subtle floating rotation
  const smallPhotoVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      rotate: dir > 0 ? -6 : 6,
      opacity: 0.5,
    }),
    center: {
      x: 0,
      rotate: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -90 : 90,
      rotate: dir > 0 ? 4 : -4,
      opacity: 0,
    }),
  };

  // 2. Ảnh Lớn (Large Photo Variants): Midground majestic anchor
  // "Người vừa": Steady, rich inertia following the small photo
  const largePhotoVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 25 : -25,
      scale: 0.98,
      opacity: 0.7,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      scale: 0.98,
      opacity: 0,
    }),
  };

  // 3. Headline Variants: Editorial Didone typography
  // "Nối tiếp sau": Glides in cadence
  const headlineVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? -35 : 35,
      opacity: 0.4,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? 35 : -35,
      opacity: 0.2,
    }),
  };

  // 4. Supporting Text & CTA Variants:
  // "Nối tiếp cuối cùng": Slower, fluid landing
  const copyCtaVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0.3,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? 55 : -55,
      opacity: 0.1,
    }),
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Lychee Layers Editorial Hero"
      className="relative min-h-dvh flex flex-col justify-between pt-24 sm:pt-28 pb-6 sm:pb-8 px-5 sm:px-8 lg:px-14 overflow-hidden bg-[#FAF7F2] text-[#2A2523] select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        1. CONNECTED ETHEREAL BLUSH SILK RIBBON WAVE
        Glides horizontally in unison with slide changes.
        GSAP ScrollTrigger applies smooth vertical parallax scrub.
      */}
      <div ref={silkParallaxRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <SilkRibbon slideStep={slideStep} opacity={0.92} />
      </div>

      {/* 
        2. MAIN HERO EDITORIAL GRID: Synchronized Simultaneous Carousel
        Slides move together separated by a uniform gap.
        heroStageParallaxRef provides scroll-linked vertical displacement.
        pointerShiftRef provides smooth dual-axis pointer tilt on desktop.
      */}
      <div
        ref={heroStageParallaxRef}
        className="flex-1 w-full max-w-7xl mx-auto flex items-center justify-center my-auto py-4 sm:py-6 relative z-20 will-change-transform"
      >
        <div ref={pointerShiftRef} className="w-full relative">
        
        {/* Stationary Left Carousel Arrow */}
        <div className="absolute -left-3 sm:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-40">
          <button
            type="button"
            onClick={prevSlide}
            className="group p-2 sm:p-3 text-[#2A2523]/45 hover:text-[#2A2523] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2A2523] active:scale-[0.92]"
            aria-label="Previous editorial composition"
          >
            <span className="font-light text-2xl sm:text-3xl lg:text-4xl leading-none inline-block transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
          </button>
        </div>

        {/* Stationary Right Carousel Arrow */}
        <div className="absolute -right-3 sm:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-40">
          <button
            type="button"
            onClick={nextSlide}
            className="group p-2 sm:p-3 text-[#2A2523]/45 hover:text-[#2A2523] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2A2523] active:scale-[0.92]"
            aria-label="Next editorial composition"
          >
            <span className="font-light text-2xl sm:text-3xl lg:text-4xl leading-none inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Stationary Slide Indicator (01 | 03) */}
        <div className="absolute right-2 sm:right-4 lg:right-6 top-1 sm:top-2 z-40 flex flex-col items-center gap-1.5 text-xs font-mono tracking-widest text-[#8A7E78]">
          <span className="font-semibold text-[#2A2523]">{activeSlide.index}</span>
          <div className="w-[1px] h-8 bg-[#2A2523]/25 relative overflow-hidden">
            <motion.div
              className="w-full bg-[#9E5D52]"
              initial={{ height: 0 }}
              animate={{ height: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-[#8A7E78]/70">0{totalSlides}</span>
        </div>

        {/* Sliding Viewport Container */}
        <div className="w-full relative overflow-hidden">
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
              key={activeSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.95,
                ease: editorialEase,
              }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
              {/* ================= LEFT COLUMN: Pure Feminine & Elegant Typography ================= */}
              <div className="lg:col-span-5 flex flex-col items-start z-30">
                {/* Oversized Didone Serif Headline with Italic Accent */}
                <motion.div
                  custom={direction}
                  variants={headlineVariants}
                  transition={{
                    duration: 0.98,
                    ease: editorialEase,
                    delay: 0.07,
                  }}
                  className="space-y-0.5 sm:space-y-1 mb-5 sm:mb-6"
                >
                  <h1 className="font-serif-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[86px] font-normal leading-[0.88] text-[#2A2523] tracking-tight">
                    <span className="block">{activeSlide.headline.line1}</span>
                    <span className="block italic text-[#9E5D52] font-normal my-0.5">
                      {activeSlide.headline.line2}
                    </span>
                    <span className="block">{activeSlide.headline.line3}</span>
                  </h1>
                </motion.div>

                {/* Supporting Copy & CTA: Glides in continuous succession */}
                <motion.div
                  custom={direction}
                  variants={copyCtaVariants}
                  transition={{
                    duration: 1.02,
                    ease: editorialEase,
                    delay: 0.11,
                  }}
                  className="flex flex-col items-start"
                >


                  {/* Primary CTA Button: Pill-shaped in soft blush satin */}
                  <div className="pt-1">
                    <MagneticWrapper strength={6}>
                      <a
                        href={activeSlide.primaryCta.href}
                        className="group relative inline-flex items-center gap-3 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 bg-[#F1DDE0]/85 hover:bg-[#F1DDE0] text-[#2A2523] border border-[#2A2523]/12 shadow-[0_4px_16px_rgba(241,221,224,0.6)] text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-300 active:scale-[0.97]"
                      >
                        <span>{activeSlide.primaryCta.label}</span>
                        <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    </MagneticWrapper>
                  </div>
                </motion.div>
              </div>

              {/* ================= RIGHT COLUMN: 1 Ảnh Lớn & 1 Ảnh Nhỏ ================= */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[400px] sm:min-h-[480px] lg:min-h-[540px]">
                <div className="relative w-full max-w-[580px] flex items-center justify-center">
                  
                  {/* 1. ẢNH LỚN: Main Fashion Photograph - Steady, regal inertia */}
                  <motion.div
                    custom={direction}
                    variants={largePhotoVariants}
                    transition={{
                      duration: 0.92,
                      ease: editorialEase,
                      delay: 0.05,
                    }}
                    className="relative z-20 w-[300px] sm:w-[430px] md:w-[490px] lg:w-[540px] aspect-[16/11] bg-white p-2.5 sm:p-3 pb-3 sm:pb-3.5 shadow-[0_24px_55px_rgba(42,37,35,0.14)] border border-[#2A2523]/8 transition-transform duration-500 hover:scale-[1.01]"
                  >
                    <div className="relative w-full h-full overflow-hidden bg-[#ECE5DD]">
                      <img
                        src={activeSlide.mainImage.src}
                        alt={activeSlide.mainImage.alt}
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* 2. ẢNH NHỎ: Floating Accent Card - Swift velocity ("người nhanh"), delicate tilt */}
                  {activeSlide.floatingCards[0] && (
                    <motion.div
                      custom={direction}
                      variants={smallPhotoVariants}
                      transition={{
                        duration: 0.82,
                        ease: editorialEase,
                        delay: 0,
                      }}
                      className={`absolute ${activeSlide.floatingCards[0].positionClass} ${activeSlide.floatingCards[0].sizeClass} aspect-[3/4] bg-white p-2 sm:p-2.5 pb-2.5 sm:pb-3 shadow-[0_20px_48px_rgba(42,37,35,0.18)] border border-[#2A2523]/10 ${activeSlide.floatingCards[0].rotation} transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-40 z-30 cursor-pointer`}
                    >
                      <div className="relative w-full h-full overflow-hidden bg-[#ECE5DD]">
                        <img
                          src={activeSlide.floatingCards[0].image}
                          alt={activeSlide.floatingCards[0].alt}
                          loading="eager"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </div>

      {/* 3. HERO FOOTER: Minimalist Scroll Cue & Slide Pagination */}
      <div className="w-full max-w-7xl mx-auto flex items-end justify-between pt-4 border-t border-[#2A2523]/8 relative z-20">
        <a
          href="#story"
          className="group inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8A7E78] hover:text-[#2A2523] transition-colors focus:outline-none"
          aria-label="Scroll down to explore Lychee Layers story"
        >
          <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">↓</span>
          <span>SCROLL</span>
        </a>

        {/* Minimalist Slide Pagination */}
        <div className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8A7E78]/70 font-mono">
          {activeSlide.index} / 0{totalSlides}
        </div>
      </div>
    </section>
  );
};
