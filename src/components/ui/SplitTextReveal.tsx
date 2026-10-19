import React, { useRef, useState, useEffect } from 'react';

interface SplitTextRevealProps {
  readonly text: string;
  readonly as?: 'h1' | 'h2' | 'h3' | 'span';
  readonly className?: string;
  readonly wordClassName?: string;
  readonly delay?: number; // ms
  readonly stagger?: number; // ms, default 70ms
  readonly duration?: number; // ms, default 900ms
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 70,
  duration = 900,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const words = text.split(' ');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsReducedMotion(true);
        setIsVisible(true);
        return;
      }
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    // Check if already in viewport
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = setTimeout(() => setIsVisible(true), 40 + delay);
      return () => clearTimeout(timer);
    }

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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block ${className}`}
      aria-label={text}
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0 pb-1 -mb-1"
          aria-hidden="true"
        >
          <span
            className={`inline-block will-change-transform ${wordClassName}`}
            style={{
              transform: isReducedMotion || isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 115%, 0)',
              opacity: isReducedMotion || isVisible ? 1 : 0.001,
              transitionDuration: isReducedMotion ? '0.01ms' : `${duration}ms`,
              transitionDelay: isReducedMotion ? '0ms' : `${delay + idx * stagger}ms`,
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
