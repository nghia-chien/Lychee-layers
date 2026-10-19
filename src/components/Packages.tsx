import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { packagesData, experienceSteps, type PackageItem } from '../data/landingData.ts';
import { TypographyReveal } from './ui/TypographyReveal.tsx';
import { SatinButton } from './ui/SatinButton.tsx';
import { MagneticWrapper } from './ui/MagneticWrapper.tsx';
import { DelicateLineDraw } from './ui/DelicateLineDraw.tsx';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Packages: React.FC = () => {
  const [selectedPkg, setSelectedPkg] = useState<string>(packagesData[0].id);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const workflowContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const stepCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodeDotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // GSAP ScrollTrigger for Animated Champagne Connecting Path & Active Step Nodes
  useEffect(() => {
    if (typeof window === 'undefined' || !workflowContainerRef.current) return;

    if (isReducedMotion) {
      if (pathRef.current) pathRef.current.style.strokeDashoffset = '0';
      if (mobileLineRef.current) mobileLineRef.current.style.transform = 'scaleY(1)';
      return;
    }

    const ctx = gsap.context(() => {
      // Measure path total length for precise stroke drawing
      if (pathRef.current) {
        const totalLength = pathRef.current.getTotalLength();
        pathRef.current.style.strokeDasharray = `${totalLength}`;
        pathRef.current.style.strokeDashoffset = `${totalLength}`;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: workflowContainerRef.current,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      });

      if (pathRef.current) {
        tl.to(
          pathRef.current,
          {
            strokeDashoffset: 0,
            ease: 'none',
          },
          0
        );
      }

      if (mobileLineRef.current) {
        tl.to(
          mobileLineRef.current,
          {
            scaleY: 1,
            ease: 'none',
          },
          0
        );
      }

      // Stagger illuminate each workflow card and dot as the path arrives
      stepCardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const activationTime = (idx / 3) * 0.9;
        tl.to(
          card,
          {
            borderColor: 'rgba(201, 150, 139, 0.45)',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 12px 30px rgba(201, 150, 139, 0.08)',
            duration: 0.2,
            ease: 'power1.out',
          },
          activationTime
        );

        const dot = nodeDotsRef.current[idx];
        if (dot) {
          tl.to(
            dot,
            {
              backgroundColor: '#2A2523',
              scale: 1.3,
              duration: 0.2,
              ease: 'back.out(1.5)',
            },
            activationTime
          );
        }
      });
    }, workflowContainerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Motion variants for sequential workflow reveal
  const workflowVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.09,
        delayChildren: isReducedMotion ? 0 : 0.06,
      },
    },
  };

  const stepCardVariants = {
    hidden: {
      opacity: 0,
      y: isReducedMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Motion variants for package cards reveal
  const packageGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.12,
        delayChildren: isReducedMotion ? 0 : 0.08,
      },
    },
  };

  const packageCardVariants = {
    hidden: {
      opacity: 0,
      y: isReducedMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="packages"
      className="relative min-h-dvh flex flex-col justify-center py-24 px-6 sm:px-8 lg:px-12 bg-[#F4EFEA] border-t border-[#2A2523]/8"
    >
      <div className="max-w-7xl mx-auto w-full my-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b border-[#2A2523]/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9968B] font-semibold block mb-2">
              05 / PACKAGES & EXPERIENCE
            </span>
            <TypographyReveal as="h2">
              <span className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2A2523] font-normal tracking-tight">
                The Art of the Experience
              </span>
            </TypographyReveal>
          </div>
          <div className="max-w-sm sm:text-right">
            <p className="text-sm text-[#8A7E78] font-light">
              Quy trình chuẩn mực tạo nên những thước hình lưu giữ thanh xuân và chiều sâu thần thái.
            </p>
          </div>
        </div>

        {/* Part 1: The 4-Step Experience Workflow with Animated Champagne Connecting Path */}
        <div ref={workflowContainerRef} className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2A2523] font-medium">
              Hành Trình Chụp Ảnh Tại Lychee Layers
            </span>
            <div className="hidden sm:block">
              <DelicateLineDraw direction="horizontal" strokeColor="#C9968B" />
            </div>
          </div>

          {/* Desktop Connecting Silk Path (S-curve traversing the 4 columns) */}
          <div className="hidden lg:block relative mb-8 w-full overflow-visible" aria-hidden="true">
            <svg
              viewBox="0 0 1000 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-9 overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Background base guide track */}
              <path
                d="M 118 18 C 245 4, 245 32, 372 18 C 500 4, 500 32, 628 18 C 755 4, 755 32, 882 18"
                stroke="#C9968B"
                strokeOpacity="0.22"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Active champagne silk path drawn on scroll */}
              <path
                ref={pathRef}
                d="M 118 18 C 245 4, 245 32, 372 18 C 500 4, 500 32, 628 18 C 755 4, 755 32, 882 18"
                stroke="#C9968B"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="transition-opacity duration-300"
              />
              {/* 4 Checkpoint Nodes matching the 4 column centers */}
              {[118, 372, 628, 882].map((cx, i) => (
                <g key={i}>
                  <circle
                    cx={cx}
                    cy="18"
                    r="4"
                    fill="#FAF7F2"
                    stroke="#C9968B"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx={cx}
                    cy="18"
                    r="1.8"
                    fill="#C9968B"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Workflow Cards Grid */}
          <div className="relative">
            {/* Mobile / Tablet vertical connecting track */}
            <div
              className="lg:hidden absolute left-3 sm:left-4 top-6 bottom-6 w-[1.5px] bg-[#C9968B]/20 pointer-events-none"
              aria-hidden="true"
            >
              <div
                ref={mobileLineRef}
                className="w-full h-full bg-[#C9968B] origin-top scale-y-0"
              />
            </div>

            <motion.div
              variants={workflowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
            >
              {experienceSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={stepCardVariants}
                  className="h-full"
                >
                  <div
                    ref={(el) => {
                      stepCardsRef.current[index] = el;
                    }}
                    className="group relative h-full bg-white/70 p-6 border border-[#2A2523]/8 transition-all duration-300 hover:bg-white hover:border-[#2A2523] hover:shadow-[0_14px_32px_rgba(42,37,35,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2523] cursor-default"
                    tabIndex={0}
                    role="article"
                    aria-label={`Bước ${step.number}: ${step.title}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-serif-editorial text-3xl font-light text-[#C9968B] group-hover:text-[#2A2523] transition-colors duration-300">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-serif-editorial text-lg text-[#2A2523] font-medium mb-2 group-hover:text-[#9E5D52] transition-colors duration-200">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#544B47] font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Part 2: Package Comparison Cards */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#2A2523] font-medium block">
                Các Gói Dịch Vụ Định Hướng
              </span>
              <span className="text-xs text-[#8A7E78] font-light">
                *Báo giá và chi tiết quyền lợi sẽ được studio điều chỉnh theo concept thực tế của bạn.
              </span>
            </div>
          </div>

          <motion.div
            variants={packageGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          >
            {packagesData.map((pkg: PackageItem) => {
              const isCurrent = selectedPkg === pkg.id;

              return (
                <motion.div
                  key={pkg.id}
                  variants={packageCardVariants}
                  className="h-full"
                >
                  <div
                    onClick={() => setSelectedPkg(pkg.id)}
                    className={`relative h-full flex flex-col p-8 bg-white border transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2523] ${
                      pkg.isPopular
                        ? 'featured-card group-featured border-[#2A2523] ring-1 ring-[#2A2523]/25 shadow-[0_24px_56px_rgba(42,37,35,0.12)] lg:-translate-y-2.5 z-10'
                        : isCurrent
                        ? 'border-[#2A2523] shadow-[0_16px_40px_rgba(42,37,35,0.08)] -translate-y-1'
                        : 'border-[#2A2523]/10 hover:border-[#C9968B] shadow-[0_8px_30px_rgba(42,37,35,0.04)] hover:shadow-[0_18px_44px_rgba(42,37,35,0.09)] hover:-translate-y-1'
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isCurrent}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPkg(pkg.id);
                      }
                    }}
                  >
                    {/* Featured Package Delicate Satin Shimmer */}
                    {pkg.isPopular && (
                      <span className="package-satin-shimmer" aria-hidden="true" />
                    )}

                    {/* Badge */}
                    {pkg.badge && (
                      <div
                        className={`absolute -top-3 left-8 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                          pkg.isPopular
                            ? 'bg-[#2A2523] text-[#FAF7F2]'
                            : 'bg-[#C9968B] text-[#FAF7F2]'
                        }`}
                      >
                        {pkg.badge}
                      </div>
                    )}

                    {/* Package Title & Subtitle */}
                    <div className="mb-6 pt-2">
                      <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#2A2523]">
                        {pkg.name}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#C9968B] font-medium mt-1">
                        {pkg.subtitle}
                      </p>
                    </div>

                    {/* Price Notice */}
                    <div className="py-4 border-y border-[#2A2523]/8 mb-6">
                      <span className="text-xs text-[#8A7E78] uppercase tracking-[0.15em] block mb-1">
                        Mức Đầu Tư
                      </span>
                      <span className="font-serif-editorial text-xl sm:text-2xl text-[#2A2523] font-medium">
                        {pkg.priceNotice}
                      </span>
                    </div>

                    {/* Inclusions List */}
                    <ul className="space-y-3.5 mb-8 flex-1">
                      {pkg.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-[#544B47] leading-relaxed"
                        >
                          <span className="text-[#C9968B] text-sm leading-none mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Satin Button CTA */}
                    <div className="pt-2">
                      <MagneticWrapper strength={6} className="w-full">
                        <SatinButton
                          href="#booking"
                          size="md"
                          variant={pkg.isPopular || isCurrent ? 'primary' : 'outline'}
                          className="w-full"
                        >
                          Chọn Gói & Đặt Lịch
                        </SatinButton>
                      </MagneticWrapper>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
