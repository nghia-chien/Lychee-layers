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
          <div className="lg:col-span-7 flex flex-col space-y-10">
            {/* Story Paragraphs with Typography Transitions */}
            <div className="space-y-6 text-[#544B47] text-base sm:text-lg font-light leading-relaxed">
              {brandStoryContent.paragraphs.map((p, idx) => (
                <TypographyReveal key={idx} delay={idx * 140} duration={850}>
                  <p>{p}</p>
                </TypographyReveal>
              ))}
            </div>

            {/* Core Values & Pillars: Head & P Only */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-[#2A2523]/10">
              {brandStoryContent.pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="text-[11px] font-mono text-[#C9968B] tracking-wider block">
                    [{pillar.number}]
                  </span>
                  <h3 className="font-serif-editorial text-lg sm:text-xl text-[#2A2523] font-normal tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#544B47] font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Atelier Statement: Head & P */}
            <div className="pt-6 border-t border-[#2A2523]/10 space-y-2">
              <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#2A2523] font-normal tracking-tight">
                Nghệ Thuật Của Sự Tinh Tế
              </h3>
              <p className="text-sm sm:text-base text-[#544B47] font-light leading-relaxed">
                Chúng tôi không chỉ bấm máy, mà cùng bạn kiến tạo những khung hình lưu giữ thanh xuân và chiều sâu cảm xúc theo năm tháng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

