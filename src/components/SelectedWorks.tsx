import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { selectedWorksData } from '../data/landingData.ts';
import { TypographyReveal } from './ui/TypographyReveal.tsx';
import { ImageReveal } from './ui/ImageReveal.tsx';
import { MagneticWrapper } from './ui/MagneticWrapper.tsx';

export const SelectedWorks: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Drag interaction refs
  const isMouseDownRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const rafId = useRef<number | null>(null);
  const isReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion.current = media.matches;
    const listener = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Synchronize gallery metrics: closest index, image parallax depth, and scroll progress
  const updateGalleryMetrics = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(itemCenter - containerCenter);

      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }

      // Parallax shift calculation for inner image wrapper
      const parallaxEl = parallaxRefs.current[idx];
      if (parallaxEl && !isReducedMotion.current) {
        // Normalized distance from container center
        const normalized = (itemCenter - containerCenter) / (containerRect.width * 0.75);
        // Subtle clamped translation (-16px to +16px) with 1.06 scale for zero boundary exposure
        const clampedOffset = Math.max(-16, Math.min(16, normalized * -24));
        parallaxEl.style.transform = `translate3d(${clampedOffset.toFixed(1)}px, 0, 0) scale(1.06)`;
      }
    });

    setActiveIdx((prev) => (prev !== closestIdx ? closestIdx : prev));

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll > 0) {
      const p = Math.max(0, Math.min(1, container.scrollLeft / maxScroll));
      setProgress(p);
    }
  }, []);

  const handleScroll = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame(updateGalleryMetrics);
  };

  useEffect(() => {
    const handleResize = () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateGalleryMetrics);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    updateGalleryMetrics();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateGalleryMetrics]);

  // Center a target card smoothly within the visible container
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    const targetEl = itemRefs.current[index];
    if (!container || !targetEl) return;

    const targetLeft = targetEl.offsetLeft - (container.clientWidth - targetEl.offsetWidth) / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: isReducedMotion.current ? 'auto' : 'smooth',
    });
  };

  // Mouse Drag-to-Scroll handlers (distinguishes drag vs click)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    isMouseDownRef.current = true;
    dragStartXRef.current = e.clientX;
    scrollStartLeftRef.current = scrollContainerRef.current.scrollLeft;
    hasDraggedRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current || !scrollContainerRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (!hasDraggedRef.current && Math.abs(deltaX) > 4) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }
    if (hasDraggedRef.current) {
      scrollContainerRef.current.scrollLeft = scrollStartLeftRef.current - deltaX;
    }
  };

  const handleMouseUpOrLeave = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    setIsDragging(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  return (
    <section
      id="selected-works"
      className="relative min-h-dvh flex flex-col justify-center py-24 px-6 sm:px-8 lg:px-12 bg-[#FAF7F2] border-t border-[#2A2523]/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full my-auto">
        {/* Section Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-[#2A2523]/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9968B] font-semibold block mb-2">
              03 / SELECTED WORKS
            </span>
            <TypographyReveal as="h2">
              <span className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2A2523] font-normal tracking-tight">
                Frames in Motion
              </span>
            </TypographyReveal>
          </div>

          <div className="flex items-center gap-6">
            {/* Smooth animated active counter */}
            <div className="flex items-center gap-1 font-serif-editorial text-sm tracking-[0.2em] text-[#8A7E78]">
              <div className="overflow-hidden inline-flex items-center justify-center min-w-[24px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#C9968B] font-medium text-base inline-block"
                  >
                    {String(activeIdx + 1).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-[#8A7E78]/60">/</span>
              <span>{String(selectedWorksData.length).padStart(2, '0')}</span>
            </div>

            {/* Gallery Navigation Controls with Magnetic Hover */}
            <div className="flex items-center gap-2">
              <MagneticWrapper strength={6}>
                <button
                  type="button"
                  disabled={activeIdx === 0}
                  onClick={() => scrollToCard(activeIdx - 1)}
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2523] ${activeIdx === 0
                      ? 'border-[#2A2523]/10 text-[#2A2523]/30 cursor-not-allowed'
                      : 'border-[#2A2523]/25 text-[#2A2523] hover:border-[#2A2523] hover:bg-[#2A2523] hover:text-[#FAF7F2]'
                    }`}
                  aria-label="Xem khung hình trước"
                >
                  ←
                </button>
              </MagneticWrapper>

              <MagneticWrapper strength={6}>
                <button
                  type="button"
                  disabled={activeIdx === selectedWorksData.length - 1}
                  onClick={() => scrollToCard(activeIdx + 1)}
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2523] ${activeIdx === selectedWorksData.length - 1
                      ? 'border-[#2A2523]/10 text-[#2A2523]/30 cursor-not-allowed'
                      : 'border-[#2A2523]/25 text-[#2A2523] hover:border-[#2A2523] hover:bg-[#2A2523] hover:text-[#FAF7F2]'
                    }`}
                  aria-label="Xem khung hình kế tiếp"
                >
                  →
                </button>
              </MagneticWrapper>
            </div>
          </div>
        </div>

        {/* Pinned / Horizontal Editorial Gallery Strip with Drag & Parallax */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-8 overflow-x-auto pb-8 pt-4 scrollbar-none transition-all ${isDragging
              ? 'cursor-grabbing select-none'
              : 'cursor-grab snap-x snap-mandatory'
            }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {selectedWorksData.map((item, index) => {
            const isActive = activeIdx === index;
            // Asymmetric vertical staggered placement for editorial magazine layout
            const verticalOffsets = [
              'mt-0',
              'mt-6 sm:mt-10',
              'mt-0 sm:mt-4',
              'mt-8 sm:mt-12',
              'mt-2 sm:mt-6',
              'mt-6 sm:mt-10',
            ][index % 6];

            return (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`flex-none w-[280px] sm:w-[340px] md:w-[380px] snap-center transition-transform duration-500 ${verticalOffsets}`}
              >
                <div
                  className={`group bg-white p-3 sm:p-4 border transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive
                      ? 'border-[#2A2523]/35 shadow-[0_22px_48px_rgba(42,37,35,0.12)] -translate-y-1'
                      : 'border-[#2A2523]/8 opacity-85 hover:opacity-100 hover:border-[#C9968B] shadow-[0_10px_28px_rgba(42,37,35,0.05)]'
                    }`}
                >
                  {/* Photo Frame with Mask Reveal & Parallax Depth */}
                  <div className="relative overflow-hidden aspect-[3/4] bg-[#ECE5DD] mb-4">
                    <div
                      ref={(el) => {
                        parallaxRefs.current[index] = el;
                      }}
                      className="w-full h-full will-change-transform"
                    >
                      <ImageReveal
                        src={item.image}
                        alt={item.title}
                        aspectRatio="aspect-[3/4]"
                        imgClassName="transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div
                      className={`absolute top-2 left-2 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${isActive
                          ? 'bg-[#2A2523] text-[#FAF7F2] font-medium'
                          : 'bg-[#FAF7F2]/90 backdrop-blur-xs text-[#2A2523]'
                        }`}
                    >
                      {item.category}
                    </div>
                  </div>

                  {/* Caption & Editorial Metadata */}
                  <div
                    className={`flex items-baseline justify-between pt-1 border-t transition-colors duration-300 ${isActive ? 'border-[#2A2523]/25' : 'border-[#2A2523]/6'
                      }`}
                  >
                    <div>
                      <h3
                        className={`font-serif-editorial text-lg sm:text-xl transition-colors duration-200 ${isActive
                            ? 'text-[#9E5D52]'
                            : 'text-[#2A2523] group-hover:text-[#9E5D52]'
                          }`}
                      >
                        {item.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7E78]">
                        Lychee Layers Archives
                      </span>
                    </div>
                    <span
                      className={`font-serif-editorial text-xs italic transition-colors duration-300 ${isActive ? 'text-[#9E5D52] font-semibold' : 'text-[#C9968B]'
                        }`}
                    >
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Filmstrip Progress Track */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7E78]">
          <div className="flex items-center gap-3 w-full max-w-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] shrink-0 font-medium text-[#C9968B]">
              01
            </span>
            <div className="relative flex-1 h-[2px] bg-[#2A2523]/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 left-0 bg-[#C9968B] rounded-full transition-[width] duration-150 ease-out"
                style={{ width: `${Math.max(12, progress * 100)}%` }}
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] shrink-0">
              {String(selectedWorksData.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
