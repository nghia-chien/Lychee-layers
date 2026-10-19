import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { conceptsData, type ConceptItem } from '../data/landingData.ts';
import { TypographyReveal } from './ui/TypographyReveal.tsx';
import { MagneticWrapper } from './ui/MagneticWrapper.tsx';
import { SatinButton } from './ui/SatinButton.tsx';
import { ImageReveal } from './ui/ImageReveal.tsx';

export const ExploreConcepts: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState<ConceptItem>(conceptsData[0]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Motion variants for editorial staggered appearance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.08,
        delayChildren: isReducedMotion ? 0 : 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: isReducedMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as const, // ease-editorial-silk
      },
    },
  };

  return (
    <section
      id="concepts"
      className="relative min-h-dvh flex flex-col justify-center py-24 px-6 sm:px-8 lg:px-12 bg-[#F4EFEA] border-t border-[#2A2523]/8"
    >
      <div className="max-w-7xl mx-auto w-full my-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b border-[#2A2523]/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9968B] font-semibold block mb-2">
              02 / CONCEPTS
            </span>
            <TypographyReveal as="h2">
              <span className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2A2523] font-normal tracking-tight">
                Choose Your Mood
              </span>
            </TypographyReveal>
          </div>
          <p className="text-sm text-[#8A7E78] font-light max-w-md sm:text-right">
            Năm dòng concept nhiếp ảnh nghệ thuật được thiết kế may đo cho từng cung bậc cảm xúc.
          </p>
        </div>

        {/* Asymmetric Staggered Floating Editorial Concept Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6 items-stretch"
        >
          {conceptsData.map((concept, index) => {
            const isSelected = activeConcept.id === concept.id;
            // Subtle staggered vertical offsets for editorial uneven rhythm
            const offsetClasses = [
              'lg:translate-y-0',
              'lg:translate-y-6',
              'lg:-translate-y-4',
              'lg:translate-y-8',
              'lg:translate-y-2',
            ][index % 5];

            // Idle organic breathing levitation class when unselected and motion is enabled
            const levitationClass =
              !isSelected && !isReducedMotion
                ? `animate-concept-levitate-${index % 5} group-hover:[animation-play-state:paused]`
                : '';

            return (
              <motion.div
                key={concept.id}
                variants={cardVariants}
                className={`w-full ${offsetClasses}`}
              >
                <div className={`h-full ${levitationClass}`}>
                  <MagneticWrapper strength={6} className="w-full h-full">
                    <div
                      onClick={() => setActiveConcept(concept)}
                      className={`group relative h-full flex flex-col bg-white p-3 sm:p-3.5 border cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2523] ${
                        isSelected
                          ? 'border-[#2A2523] shadow-[0_20px_44px_rgba(42,37,35,0.14)] -translate-y-1.5 ring-1 ring-[#2A2523]/25 z-10 opacity-100'
                          : 'border-[#2A2523]/8 opacity-75 hover:opacity-100 hover:border-[#C9968B] hover:-translate-y-1 shadow-[0_8px_24px_rgba(42,37,35,0.04)] hover:shadow-[0_14px_32px_rgba(42,37,35,0.08)]'
                      }`}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveConcept(concept);
                        }
                      }}
                      aria-label={`Xem concept ${concept.title}`}
                    >
                      {/* Card Number & Tag */}
                      <div className="flex items-center justify-between pb-2 text-[10px] uppercase tracking-[0.2em] text-[#8A7E78]">
                        <span
                          className={`font-serif-editorial text-sm font-medium transition-colors duration-300 ${
                            isSelected ? 'text-[#2A2523] font-semibold' : 'text-[#C9968B]'
                          }`}
                        >
                          {concept.index}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded-[2px] transition-all duration-300 ${
                            isSelected
                              ? 'bg-[#2A2523] text-[#FAF7F2] font-medium'
                              : 'bg-transparent text-[#8A7E78]'
                          }`}
                        >
                          {concept.tag}
                        </span>
                      </div>

                      {/* Concept Image with Reveal & Same-Concept Hover Swap */}
                      <div className="relative overflow-hidden aspect-[3/4] bg-[#ECE5DD] mb-3">
                        {/* Primary Concept Image */}
                        <ImageReveal
                          src={concept.image}
                          alt={concept.title}
                          aspectRatio="aspect-[3/4]"
                          imgClassName={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${
                            concept.hoverImage ? 'group-hover:opacity-0' : ''
                          }`}
                        />

                        {/* Secondary Companion Image (Cùng Concept) with Smooth Silk Crossfade */}
                        {concept.hoverImage && (
                          <img
                            src={concept.hoverImage}
                            alt={`${concept.title} — góc nhìn thứ hai`}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none z-10"
                          />
                        )}
                        {/* Hover Overlay with Concept Cue */}
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#2A2523]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-white font-medium">
                            {concept.hoverCaption || 'Khám phá moodboard →'}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="mt-auto pt-1">
                        <h3
                          className={`font-serif-editorial text-lg transition-colors duration-300 ${
                            isSelected ? 'text-[#9E5D52]' : 'text-[#2A2523] group-hover:text-[#9E5D52]'
                          }`}
                        >
                          {concept.title}
                        </h3>
                        <p className="text-xs text-[#544B47] font-light leading-relaxed mt-1 line-clamp-3">
                          {concept.description}
                        </p>
                      </div>

                      {/* Bottom selection indicator line */}
                      <div
                        className={`h-[2px] mt-3 transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#2A2523] w-full'
                            : 'bg-transparent w-0 group-hover:w-12 group-hover:bg-[#C9968B]'
                        }`}
                      />
                    </div>
                  </MagneticWrapper>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected Concept Preview Bar / CTA */}
        <div className="mt-16 pt-8 border-t border-[#2A2523]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-xs text-[#544B47] min-h-[38px]">
            <span className="uppercase tracking-[0.2em] text-[#8A7E78] shrink-0">Đang chọn:</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConcept.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 flex-wrap"
              >
                <span className="font-serif-editorial text-xl sm:text-2xl text-[#2A2523] font-medium tracking-tight">
                  {activeConcept.title}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-[#EAC8BF]/50 text-[#9E5D52] font-medium border border-[#9E5D52]/15">
                  {activeConcept.tag}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <SatinButton href="#booking" size="md" variant="primary">
              Tư Vấn Concept Này
            </SatinButton>
          </div>
        </div>
      </div>
    </section>
  );
};
