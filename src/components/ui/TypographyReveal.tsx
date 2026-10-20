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
  const outerRef = useRef<HTMLElement>(null);
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

    const node = outerRef.current;
    if (!node) return;

    // Initial viewport check: reveal immediately if already in view
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            timer = setTimeout(() => setIsVisible(true), delay);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: '80px 0px 80px 0px',
      }
    );

    observer.observe(node);

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <Component
      ref={outerRef as any}
      className={`mask-reveal-container ${className}`}
    >
      <div
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
