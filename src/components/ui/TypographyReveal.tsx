import React, { useRef, useState, useEffect } from 'react';

interface TypographyRevealProps {
  readonly children: React.ReactNode;
  readonly as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  readonly delay?: number; // ms
  readonly duration?: number; // ms, default 850ms
  readonly className?: string;
  readonly textClassName?: string;
}

export const TypographyReveal: React.FC<TypographyRevealProps> = ({
  children,
  as: Component = 'div',
  delay = 0,
  duration = 850,
  className = '',
  textClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.matches) {
        setIsReducedMotion(true);
        setIsVisible(true);
        return;
      }
    }

    // 2. Resilience: If IntersectionObserver is not supported, reveal immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    // 3. Initial Viewport Check (Above the fold / already in view on load or reload)
    const rect = node.getBoundingClientRect();
    const inInitialView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inInitialView) {
      const initialTimer = setTimeout(() => setIsVisible(true), 40 + delay);
      return () => clearTimeout(initialTimer);
    }

    // 4. Robust IntersectionObserver for below-the-fold content
    // Triggers when the element comes within 40px of entering the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <Component className={`mask-reveal-container ${className}`}>
      <div
        ref={containerRef}
        className={`transition-all ${textClassName}`}
        style={{
          transform: isReducedMotion || isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 105%, 0)',
          opacity: isReducedMotion || isVisible ? 1 : 0.001,
          transitionDuration: isReducedMotion ? '0.01ms' : `${duration}ms`,
          transitionDelay: isReducedMotion ? '0ms' : `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: isVisible ? 'auto' : 'transform, opacity',
        }}
      >
        {children}
      </div>
    </Component>
  );
};

