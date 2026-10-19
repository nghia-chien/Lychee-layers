import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  editorialCollections,
  type EditorialCollection,
} from '../data/landingData.ts';

export const Lookbook: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState<EditorialCollection>(
    editorialCollections[0]
  );
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);

  // Modal gallery state for "xem lướt xem ảnh trong lookbook"
  const [modalPhotoIndex, setModalPhotoIndex] = useState<number | null>(null);
  const [modalDirection, setModalDirection] = useState<1 | -1>(1);
  const touchStartXRef = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveTriggerRef = useRef<HTMLElement | null>(null);

  const totalPhotos = activeCollection.photos.length;
  const mainPhoto =
    activeCollection.photos[selectedPhotoIndex] || activeCollection.photos[0];
  const allFourPhotos = activeCollection.photos.slice(0, 4);

  // Next photo in modal gallery
  const nextModalPhoto = useCallback(() => {
    if (modalPhotoIndex === null) return;
    setModalDirection(1);
    setModalPhotoIndex((prev) => (prev! + 1) % totalPhotos);
  }, [modalPhotoIndex, totalPhotos]);

  // Previous photo in modal gallery
  const prevModalPhoto = useCallback(() => {
    if (modalPhotoIndex === null) return;
    setModalDirection(-1);
    setModalPhotoIndex((prev) => (prev! - 1 + totalPhotos) % totalPhotos);
  }, [modalPhotoIndex, totalPhotos]);

  // Keyboard navigation & accessibility focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalPhotoIndex === null) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setModalPhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextModalPhoto();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevModalPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalPhotoIndex, nextModalPhoto, prevModalPhoto]);

  // Body scroll lock & focus management for modal
  useEffect(() => {
    if (modalPhotoIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 60);

      return () => {
        document.body.style.overflow = originalOverflow;
        clearTimeout(timer);
        lastActiveTriggerRef.current?.focus();
      };
    }
  }, [modalPhotoIndex]);

  // Touch gesture support for mobile swiping in modal
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diffX > 45) {
      nextModalPhoto();
    } else if (diffX < -45) {
      prevModalPhoto();
    }
    touchStartXRef.current = null;
  };

  // Overlay word for main tilted polaroid
  const moodOverlayMap: Record<string, string> = {
    'col-romance': 'LÃNG MẠN',
    'col-muse': 'HIỆN ĐẠI',
    'col-vintage': 'COQUETTE',
    'col-duo': 'PHỐ THỊ',
    'col-satin': 'HOÀNG KIM',
    'col-expression': 'BIỂU CẢM',
    'col-retro': 'CỔ ĐIỂN',
  };

  const titleWords = activeCollection.title.split(' ');
  const firstWord = titleWords[0]?.toUpperCase() || '';
  const secondWord = titleWords.slice(1).join(' ').toUpperCase() || '';

  const overlayWord =
    moodOverlayMap[activeCollection.id] ||
    (titleWords.length > 1
      ? titleWords[titleWords.length - 1].toUpperCase()
      : activeCollection.mood.toUpperCase());

  // Quadruple collections for continuous, seamless marquee loop from right to left
  const marqueeList = [
    ...editorialCollections,
    ...editorialCollections,
    ...editorialCollections,
    ...editorialCollections,
  ];

  const currentModalPhoto =
    modalPhotoIndex !== null ? activeCollection.photos[modalPhotoIndex] : null;

  const editorialEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="lookbook"
      aria-label="Editorial Lookbook"
      className="relative w-full min-h-dvh flex flex-col justify-between bg-[#EAE5DC] text-[#1C1917] border-t border-[#1C1917]/10 select-none overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.45) 0%, transparent 85%),
          repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(0, 0, 0, 0.006) 12px, rgba(0, 0, 0, 0.006) 24px)`,
      }}
    >
      {/* ARCHITECTURAL DRAFTING GUIDELINES (Matches mockup lines) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Dominant slanting guideline dividing left and right halves */}
        <line
          x1="53%"
          y1="0%"
          x2="55.8%"
          y2="100%"
          stroke="#1C1917"
          strokeOpacity="0.32"
          strokeWidth="1.2"
        />
        {/* Horizontal dividing guideline on right side */}
        <line
          x1="54.8%"
          y1="64%"
          x2="100%"
          y2="61.2%"
          stroke="#1C1917"
          strokeOpacity="0.28"
          strokeWidth="1.2"
        />
      </svg>

      {/* SECTION HEADER: 04 / EDITORIAL LOOKBOOK (Matching other sections) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1C1917]/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9968B] font-semibold block mb-2">
              04 / EDITORIAL LOOKBOOK
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: editorialEase }}
              className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal tracking-tight"
            >
              The Feminine Archive
            </motion.h2>
          </div>
          <p className="text-sm text-[#8A7E78] font-light max-w-sm sm:text-right">
            Tuyển tập các bộ sưu tập ảnh tạp chí mang tinh thần lãng mạn và thanh lịch.
          </p>
        </div>
      </div>

      {/* MAIN EDITORIAL COMPOSITION (Collage Layout Matching Reference Mockup) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center">
          
          {/* ================= LEFT SPREAD: TILTED POLAROID + OVERLAPPING FILMSTRIP ================= */}
          <div className="lg:col-span-7 flex justify-center items-center py-2 lg:py-4">
            <div className="relative w-full max-w-[380px] sm:max-w-[430px] lg:max-w-[450px] xl:max-w-[480px]">
              
              {/* PRIMARY TILTED POLAROID POSTER */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2.8 }}
                transition={{ duration: 0.6, ease: editorialEase }}
                className="relative bg-white p-3 sm:p-4 pb-8 sm:pb-10 shadow-[0_22px_60px_rgba(28,25,23,0.16)] border border-[#1C1917]/10 w-[84%] sm:w-[82%]"
              >
                {/* Main Photo Container */}
                <div
                  onClick={(e) => {
                    lastActiveTriggerRef.current = e.currentTarget;
                    setModalPhotoIndex(selectedPhotoIndex);
                  }}
                  className="group relative aspect-[3/4] bg-[#ECE5DD] overflow-hidden cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      lastActiveTriggerRef.current = e.currentTarget;
                      setModalPhotoIndex(selectedPhotoIndex);
                    }
                  }}
                  aria-label={`Xem ảnh kích thước lớn: ${mainPhoto.title}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeCollection.id}-${selectedPhotoIndex}`}
                      initial={{
                        clipPath: 'inset(0 100% 0 0)',
                        opacity: 0.6,
                        scale: 1.03,
                      }}
                      animate={{
                        clipPath: 'inset(0 0% 0 0)',
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: editorialEase,
                      }}
                      className="w-full h-full relative"
                    >
                      <img
                        src={mainPhoto.image}
                        alt={mainPhoto.title}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom Bold Serif Overlay Word (e.g. "LÃNG MẠN") */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeCollection.id}-${overlayWord}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, delay: 0.15, ease: editorialEase }}
                      className="absolute left-3 sm:left-4 bottom-2 sm:bottom-3 z-20 pointer-events-none select-none"
                    >
                      <span className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.24em] text-black/90 uppercase block drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]">
                        {overlayWord}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* OVERLAPPING 4-PHOTO FILMSTRIP (Attached on right edge of polaroid) */}
              <motion.div
                initial={{ opacity: 0, x: 20, rotate: 2.5 }}
                animate={{ opacity: 1, x: 0, rotate: 1.4 }}
                transition={{ duration: 0.6, delay: 0.12, ease: editorialEase }}
                className="absolute right-0 sm:right-[-2%] top-[6%] sm:top-[8%] w-[33%] sm:w-[31%] max-w-[155px] bg-white p-1.5 sm:p-2 shadow-[0_18px_45px_rgba(28,25,23,0.18)] border border-[#1C1917]/12 z-20 flex flex-col gap-1.5 sm:gap-2"
              >
                {allFourPhotos.map((photo, pIdx) => {
                  const isSelected = selectedPhotoIndex === pIdx;
                  return (
                    <div
                      key={`${activeCollection.id}-${photo.id}`}
                      onClick={() => setSelectedPhotoIndex(pIdx)}
                      className={`group relative w-full aspect-[4/3] overflow-hidden bg-stone-200 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-2 border-[#1E3A2B] shadow-xs'
                          : 'border border-black/10 opacity-85 hover:opacity-100 hover:scale-[1.02]'
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedPhotoIndex(pIdx);
                        }
                      }}
                      aria-label={`Chọn ảnh ${pIdx + 1}: ${photo.title}`}
                    >
                      <img
                        src={photo.image}
                        alt={photo.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  );
                })}
              </motion.div>

            </div>
          </div>

          {/* ================= RIGHT SPREAD: TILTED STORY CARD + MONOGRAM PLAQUE ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[360px] sm:min-h-[440px] py-2 lg:py-6 lg:pl-4 xl:pl-8">
            
            {/* 1. TOP RIGHT: TILTED STORY & CTA CARD */}
            <motion.div
              key={activeCollection.id}
              initial={{ opacity: 0, y: 14, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -2.8 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: editorialEase }}
              className="bg-white/95 p-6 sm:p-7 lg:p-8 border border-[#1C1917]/15 shadow-[0_16px_40px_rgba(28,25,23,0.08)] max-w-md w-full self-start lg:self-auto backdrop-blur-xs"
            >
              {/* Italic Serif Title */}
              <h3 className="font-serif-editorial italic text-2xl sm:text-3xl text-[#2E2824] leading-tight">
                {activeCollection.title}
              </h3>

              {/* Concept Description */}
              <p className="text-xs sm:text-sm text-[#544B47] font-light leading-relaxed mt-2.5 sm:mt-3 mb-5 sm:mb-6">
                {activeCollection.description}
              </p>

              {/* Solid Dark CTA Button */}
              <a
                href="#booking"
                className="w-full bg-[#1C1917] text-[#FAF7F2] py-3 sm:py-3.5 px-5 sm:px-6 text-xs sm:text-sm font-medium tracking-wider uppercase text-center block hover:bg-[#352F2C] transition-all active:scale-[0.99] shadow-xs cursor-pointer"
              >
                TƯ VẤN CONCEPT NÀY →
              </a>
            </motion.div>

            {/* 2. BOTTOM RIGHT: PLAQUE / MASTHEAD BOX (MONOGRAM) */}
            <div className="mt-8 lg:mt-auto self-end max-w-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCollection.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: editorialEase }}
                  className="font-serif-editorial font-bold text-[#1E3A2B] text-2xl sm:text-3xl lg:text-4xl leading-[1.02] tracking-wide uppercase text-right sm:text-left"
                >
                  <div>{firstWord}</div>
                  <div>{secondWord}</div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR: SEPARATED CONTINUOUS MARQUEE (RIGHT TO LEFT) ================= */}
      <div className="relative z-20 w-full bg-[#E2DDD4]/90 backdrop-blur-xs border-t border-b border-[#1C1917]/14 py-2.5 sm:py-3 overflow-hidden shadow-xs shrink-0 mt-auto">
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-3 sm:gap-4 py-0.5 w-max">
            {marqueeList.map((col, idx) => {
              const isSelected = activeCollection.id === col.id;
              return (
                <button
                  key={`${col.id}-${idx}`}
                  type="button"
                  onClick={() => {
                    if (activeCollection.id !== col.id) {
                      setActiveCollection(col);
                      setSelectedPhotoIndex(0);
                      setModalPhotoIndex(null);
                    }
                  }}
                  className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer focus:outline-none shrink-0 border ${
                    isSelected
                      ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] shadow-sm'
                      : 'bg-white text-[#544B47] hover:bg-[#FAF7F2] hover:text-[#1C1917] border-[#1C1917]/10'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={`font-mono text-[10px] ${
                      isSelected ? 'text-[#C9968B]' : 'text-[#8F847D]'
                    }`}
                  >
                    [{col.index}]
                  </span>
                  <span className="font-medium whitespace-nowrap">{col.title}</span>
                  <span
                    className={`text-[10px] font-serif-editorial italic normal-case ${
                      isSelected ? 'text-[#C9968B]' : 'text-[#A0958D]'
                    }`}
                  >
                    — {col.mood}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 
        EDITORIAL LOOKBOOK PHOTO SLIDER LIGHTBOX ("xem lướt xem ảnh trong lookbook")
        Velvet Backdrop & Dialog Entrance/Exit, Body Scroll Lock, Keyboard & Focus Management.
      */}
      <AnimatePresence>
        {modalPhotoIndex !== null && currentModalPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: editorialEase }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-[#1C1917]/90 backdrop-blur-md select-none"
            onClick={() => setModalPhotoIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Xem lướt lookbook: ${currentModalPhoto.title}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: editorialEase }}
              className="relative max-w-5xl w-full h-[90vh] max-h-[820px] bg-[#FAF7F2] p-4 sm:p-6 lg:p-7 border border-[#1C1917]/20 shadow-[0_30px_90px_rgba(0,0,0,0.55)] flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header: Collection Title + Counter + Close Button */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1C1917]/10 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="font-serif-editorial text-lg sm:text-2xl text-[#1C1917]">
                    {activeCollection.title}
                  </span>
                  <span className="text-xs font-mono text-[#C9968B] tracking-wider uppercase">
                    [{modalPhotoIndex + 1} / {totalPhotos}]
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setModalPhotoIndex(null)}
                    className="p-1.5 text-[#1C1917]/60 hover:text-[#1C1917] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917] cursor-pointer rounded-full hover:bg-black/5"
                    aria-label="Đóng cửa sổ xem ảnh"
                  >
                    <span className="text-lg leading-none block">✕</span>
                  </button>
                </div>
              </div>

              {/* Modal Stage: Prev Arrow + Animated Photo Container (3:4) + Next Arrow */}
              <div className="relative flex-1 min-h-0 w-full flex items-center justify-center my-2 sm:my-3 overflow-hidden">
                {/* Prev Photo Arrow */}
                <button
                  type="button"
                  onClick={prevModalPhoto}
                  className="absolute left-1 sm:left-3 z-30 p-2 sm:p-3 text-[#1C1917]/50 hover:text-[#1C1917] hover:bg-white/80 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1C1917] cursor-pointer backdrop-blur-xs shadow-xs"
                  aria-label="Xem ảnh trước"
                >
                  <span className="font-light text-2xl sm:text-3xl leading-none block">←</span>
                </button>

                {/* Next Photo Arrow */}
                <button
                  type="button"
                  onClick={nextModalPhoto}
                  className="absolute right-1 sm:right-3 z-30 p-2 sm:p-3 text-[#1C1917]/50 hover:text-[#1C1917] hover:bg-white/80 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1C1917] cursor-pointer backdrop-blur-xs shadow-xs"
                  aria-label="Xem ảnh kế tiếp"
                >
                  <span className="font-light text-2xl sm:text-3xl leading-none block">→</span>
                </button>

                {/* Animated Photo Transition (Strictly 3:4 Aspect Ratio) */}
                <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-2">
                  <AnimatePresence custom={modalDirection} mode="wait">
                    <motion.div
                      key={`${activeCollection.id}-photo-${modalPhotoIndex}`}
                      custom={modalDirection}
                      initial={{
                        opacity: 0,
                        x: modalDirection > 0 ? 45 : -45,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        x: modalDirection > 0 ? -45 : 45,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: editorialEase,
                      }}
                      className="relative max-h-full max-w-full flex items-center justify-center"
                    >
                      <div className="bg-white p-2 sm:p-3 pb-3 sm:pb-4 shadow-xl border border-[#1C1917]/12 max-h-[58vh] sm:max-h-[62vh] aspect-[3/4] flex flex-col">
                        <div className="flex-1 min-h-0 w-full aspect-[3/4] overflow-hidden bg-[#ECE5DD] relative">
                          <img
                            src={currentModalPhoto.image}
                            alt={currentModalPhoto.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="pt-2 px-1 flex items-center justify-between text-[#1C1917]">
                          <span className="font-serif-editorial text-sm sm:text-base font-medium">
                            {currentModalPhoto.title}
                          </span>
                          <span className="text-[10px] font-mono text-[#C9968B] tracking-wider uppercase">
                            KHUNG HÌNH 0{modalPhotoIndex + 1}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Modal Bottom: Thumbnail Navigation Strip */}
              <div className="pt-2.5 border-t border-[#1C1917]/10 flex items-center justify-between gap-4 shrink-0">
                {/* Thumbnails Row (Strictly 3:4) */}
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1">
                  {activeCollection.photos.map((thumb, tIdx) => {
                    const isActive = modalPhotoIndex === tIdx;
                    return (
                      <button
                        key={thumb.id}
                        type="button"
                        onClick={() => {
                          setModalDirection(tIdx > modalPhotoIndex ? 1 : -1);
                          setModalPhotoIndex(tIdx);
                        }}
                        className={`relative w-11 sm:w-14 aspect-[3/4] overflow-hidden rounded-xs border transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9E5D52] shrink-0 ${
                          isActive
                            ? 'border-[#9E5D52] ring-2 ring-[#9E5D52]/40 scale-105 shadow-md'
                            : 'border-[#1C1917]/15 opacity-60 hover:opacity-100 hover:scale-102'
                        }`}
                        aria-label={`Chuyển tới ảnh ${thumb.title}`}
                      >
                        <img
                          src={thumb.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Consultation Button in Modal */}
                <a
                  href="#booking"
                  onClick={() => setModalPhotoIndex(null)}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#1C1917] text-[#FAF7F2] text-[11px] sm:text-xs font-medium uppercase tracking-wider hover:bg-[#38322F] transition-colors shrink-0"
                >
                  <span>Tư Vấn Concept Này</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


