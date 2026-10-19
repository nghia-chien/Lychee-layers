import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { navLinks, studioInfo } from '../data/landingData.ts';
import { SatinButton } from './ui/SatinButton.tsx';
import { MagneticWrapper } from './ui/MagneticWrapper.tsx';

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const isReducedMotion = useRef(false);

  // Check prefers-reduced-motion
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

  // Smart Scroll: Hide on scroll down, reveal on scroll up with hysteresis
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 40);

      // If at top of the page, always show
      if (currentY < 60) {
        setIsVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      // Hysteresis threshold to prevent flickering
      const delta = currentY - lastScrollY.current;
      if (Math.abs(delta) > 10) {
        if (delta > 0 && currentY > 120) {
          // Scrolling down
          setIsVisible(false);
        } else if (delta < 0) {
          // Scrolling up
          setIsVisible(true);
        }
        lastScrollY.current = currentY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Tracking with IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionIds = ['hero', 'story', 'concepts', 'selected-works', 'lookbook', 'packages', 'booking'];
    const sectionToNavMap: Record<string, string> = {
      hero: '#hero',
      story: '#story',
      concepts: '#concepts',
      'selected-works': '#selected-works',
      lookbook: '#selected-works',
      packages: '#booking',
      booking: '#booking',
    };

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const mapped = sectionToNavMap[id];
              if (mapped) setActiveSection(mapped);
            }
          });
        },
        { threshold: 0.25, rootMargin: '-20% 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#2A2523]/8 py-3.5 shadow-[0_4px_30px_rgba(42,37,35,0.03)]'
          : 'bg-transparent py-5 sm:py-7 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Lychee Layers Editorial Logo */}
        <a
          href="#"
          className="group flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2A2523]"
          aria-label={`${studioInfo.brandName} - Trang chủ`}
        >
          <img
            src="/logo.png"
            alt={studioInfo.brandName}
            className="h-5 sm:h-6 lg:h-7 w-auto object-contain group-hover:opacity-80 transition-opacity"
          />
        </a>

        {/* Desktop Navigation Links with Sliding Underline Indicator */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10 relative"
          aria-label="Điều hướng chính"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`group text-xs uppercase tracking-[0.2em] relative py-1.5 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2A2523] ${
                  isActive ? 'text-[#2A2523] font-semibold' : 'text-[#8A7E78] hover:text-[#2A2523]'
                }`}
              >
                <span>{link.label}</span>

                {/* Active Sliding Underline Indicator */}
                {isActive ? (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#2A2523]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9968B] transition-all duration-300 group-hover:w-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA: Refined Pill Booking CTA with Magnetic Hover */}
        <div className="hidden sm:flex items-center gap-4">
          <MagneticWrapper strength={6}>
            <a
              href="#booking"
              className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2 border border-[#2A2523]/30 hover:border-[#2A2523] bg-transparent hover:bg-[#2A2523] text-[#2A2523] hover:text-[#FAF7F2] text-xs font-medium tracking-wider uppercase transition-all duration-250 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2523]"
            >
              <span>Đặt lịch chụp</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
          </MagneticWrapper>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 rounded-full text-[#2A2523] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2523]"
          aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-5 h-[1.5px] bg-[#2A2523] transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : '-translate-y-1'
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-[#2A2523] transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-1'
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 top-[60px] bg-black/30 backdrop-blur-xs z-40"
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden relative z-50 bg-[#FAF7F2] border-b border-[#2A2523]/10 px-6 py-6 shadow-2xl"
            >
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href;

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm uppercase tracking-[0.18em] py-2.5 border-b border-[#2A2523]/5 flex items-center justify-between transition-colors ${
                        isActive ? 'text-[#2A2523] font-semibold' : 'text-[#8A7E78]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C9968B]" />}
                    </a>
                  );
                })}

                <div className="pt-3">
                  <SatinButton
                    href="#booking"
                    size="md"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Đặt Lịch Chụp
                  </SatinButton>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
