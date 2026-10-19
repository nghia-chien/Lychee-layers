import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brandStoryContent } from '../data/landingData.ts';
import { TypographyReveal } from './ui/TypographyReveal.tsx';
import { SplitTextReveal } from './ui/SplitTextReveal.tsx';
import { DelicateLineDraw } from './ui/DelicateLineDraw.tsx';
import { ImageReveal } from './ui/ImageReveal.tsx';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BrandStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const detailImageParallaxRef = useRef<HTMLDivElement>(null);
  const mainImageParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Subtle relative parallax between main photo and offset detail photo
      if (detailImageParallaxRef.current && sectionRef.current) {
        gsap.to(detailImageParallaxRef.current, {
          y: -32,
          rotate: 1.8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
      }

      if (mainImageParallaxRef.current && sectionRef.current) {
        gsap.to(mainImageParallaxRef.current, {
          y: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative min-h-dvh flex flex-col justify-center py-24 px-6 sm:px-8 lg:px-12 bg-[#FAF7F2] border-t border-[#2A2523]/8 select-none"
    >
      <div className="max-w-7xl mx-auto w-full my-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b border-[#2A2523]/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9968B] font-semibold block mb-2">
              {brandStoryContent.sectionTag}
            </span>
            <SplitTextReveal
              text={brandStoryContent.title}
              as="h2"
              className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2A2523] font-normal tracking-tight"
            />
          </div>
          <p className="text-sm text-[#8A7E78] font-light max-w-sm sm:text-right">
            {brandStoryContent.subtitle}
          </p>
        </div>

        {/* 45/55 Editorial Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (45% / 5 cols): Restrained Sticky Image Frame */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative">
              {/* Primary Story Photo with Image Reveal */}
              <div
                ref={mainImageParallaxRef}
                className="shadow-[0_20px_50px_rgba(42,37,35,0.08)] bg-white p-3 border border-[#2A2523]/8 will-change-transform"
              >
                <ImageReveal
                  src={brandStoryContent.mainImage}
                  alt="Lychee Layers Brand Story Portrait"
                  aspectRatio="aspect-[4/5]"
                />
                <div className="pt-3 px-1 flex items-center justify-between text-[#8A7E78] text-[10px] tracking-[0.2em] uppercase">
                  <span>Fig. 01 — Essence</span>
                  <span>Lychee Layers Studio</span>
                </div>
              </div>

              {/* Offset Detail Shot (Editorial layering with parallax) */}
              <div
                ref={detailImageParallaxRef}
                className="hidden sm:block absolute -bottom-8 -right-8 w-44 shadow-[0_15px_35px_rgba(42,37,35,0.12)] bg-white p-2 border border-[#2A2523]/8 z-20 will-change-transform"
              >
                <ImageReveal
                  src={brandStoryContent.detailImage}
                  alt="Lychee Layers Detail Shot"
                  aspectRatio="aspect-[3/4]"
                  delay={180}
                />
              </div>

              {/* Decorative Delicate Line Under Image */}
              <div className="mt-8 hidden lg:block">
                <DelicateLineDraw direction="horizontal" strokeColor="#C9968B" delay={300} />
              </div>
            </div>
          </div>

          {/* Right Column (55% / 7 cols): Scroll Storytelling Content & Pillars */}
          <div className="lg:col-span-7 flex flex-col space-y-12">
            {/* Story Paragraphs with Typography Transitions & Editorial Drop Cap */}
            <div className="space-y-6 text-[#544B47] text-base sm:text-lg font-light leading-relaxed">
              <TypographyReveal delay={0} duration={850}>
                <p className="first-letter:font-serif-editorial first-letter:text-5xl first-letter:float-left first-letter:mr-3.5 first-letter:text-[#9E5D52] first-letter:leading-[0.85] first-letter:font-normal">
                  {brandStoryContent.paragraphs[0]}
                </p>
              </TypographyReveal>
              {brandStoryContent.paragraphs.slice(1).map((p, idx) => (
                <TypographyReveal key={idx + 1} delay={(idx + 1) * 140} duration={850}>
                  <p>{p}</p>
                </TypographyReveal>
              ))}
            </div>

            {/* 3 Mục Nội Dung Triết Lý: Feminine, Elegant, Artistic (Ít Chữ Nhất Có Thể) */}
            <div className="pt-8 border-t border-[#2A2523]/10 space-y-3.5">
              {brandStoryContent.pillars.map((pillar, idx) => {
                const offsetStyles = [
                  'sm:mr-6 bg-white/40 hover:bg-white/80 border-[#2A2523]/8 hover:border-[#C9968B]/50',
                  'sm:ml-8 bg-white/70 hover:bg-white/95 border-[#C9968B]/30 hover:border-[#C9968B]/70 shadow-[0_8px_30px_rgba(201,150,139,0.06)]',
                  'sm:ml-16 bg-white/40 hover:bg-white/80 border-[#2A2523]/8 hover:border-[#C9968B]/50',
                ];

                return (
                  <div
                    key={idx}
                    className={`group relative p-5 sm:p-6 border transition-all duration-300 rounded-[2px] ${offsetStyles[idx]}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-6">
                      <div className="flex items-baseline gap-3 shrink-0">
                        <span className="font-serif-editorial italic text-2xl sm:text-3xl text-[#C9968B] font-light leading-none group-hover:translate-x-1 transition-transform duration-300">
                          {pillar.roman}.
                        </span>
                        <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#2A2523] group-hover:text-[#9E5D52] font-normal tracking-tight transition-colors duration-300">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#736862] font-light leading-relaxed sm:text-right">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Subtle Rose Hairline Indicator on Hover */}
                    <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-[#C9968B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

