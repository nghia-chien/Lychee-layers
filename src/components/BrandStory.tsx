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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (45% / 5 cols): Restrained Sticky Image Frame */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Primary Story Video with Editorial Frame */}
              <div
                ref={mainImageParallaxRef}
                className="shadow-[0_20px_50px_rgba(42,37,35,0.08)] bg-white p-3 border border-[#2A2523]/8 will-change-transform"
              >
                <div className="relative overflow-hidden bg-[#ECE5DD] aspect-[4/5] group">
                  {/* Editorial delicate border frame */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10 border border-[#2A2523]/10"
                    aria-hidden="true"
                  />

                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    className="w-full h-full object-cover object-center will-change-transform transition-transform duration-700 group-hover:scale-[1.02]"
                  >
                    <source src={brandStoryContent.video || '/v1.mp4'} type="video/mp4" />
                    <source src="/video/v1.mp4" type="video/mp4" />
                    Trình duyệt không hỗ trợ phát video.
                  </video>

                  {/* Subtle Studio Editorial Badge */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white text-[9px] tracking-[0.18em] uppercase font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5B5AB] animate-pulse" />
                    <span>Film Reel</span>
                  </div>
                </div>

                <div className="pt-3 px-1 flex items-center justify-between text-[#8A7E78] text-[10px] tracking-[0.2em] uppercase">
                  <span>Fig. 01 — Behind The Lens</span>
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

          {/* Right Column (55% / 7 cols): Vertically Centered Storytelling */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:self-center my-auto space-y-8">
            {/* Story Paragraphs with Typography Transitions & Editorial Styling */}
            <div className="space-y-6 text-[#544B47] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              {brandStoryContent.paragraphs.map((p, idx) => (
                <TypographyReveal key={idx} delay={idx * 140} duration={850}>
                  <p>{p}</p>
                </TypographyReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

