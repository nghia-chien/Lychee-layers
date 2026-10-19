import React, { useRef, useEffect, useCallback } from 'react';

interface MagneticWrapperProps {
  readonly children: React.ReactNode;
  readonly strength?: number; // subtle pixel range, default 8px
  readonly className?: string;
}

export const MagneticWrapper: React.FC<MagneticWrapperProps> = ({
  children,
  strength = 8,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const targetPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const isFinePointer = useRef<boolean>(false);
  const isReducedMotion = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointerMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    isFinePointer.current = finePointerMedia.matches;

    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion.current = reducedMotionMedia.matches;

    const pointerListener = (e: MediaQueryListEvent) => {
      isFinePointer.current = e.matches;
    };
    const motionListener = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
    };

    finePointerMedia.addEventListener('change', pointerListener);
    reducedMotionMedia.addEventListener('change', motionListener);

    return () => {
      finePointerMedia.removeEventListener('change', pointerListener);
      reducedMotionMedia.removeEventListener('change', motionListener);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const animate = useCallback(() => {
    const el = elementRef.current;
    if (!el) {
      rafId.current = null;
      return;
    }

    // Damped silk spring lerp (0.16 creates organic velvet inertia without bounce)
    const factor = 0.16;
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * factor;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * factor;

    const dx = targetPos.current.x - currentPos.current.x;
    const dy = targetPos.current.y - currentPos.current.y;

    el.style.transform = `translate3d(${currentPos.current.x.toFixed(2)}px, ${currentPos.current.y.toFixed(2)}px, 0)`;

    // Check if motion has settled back to rest
    if (
      Math.abs(dx) < 0.05 &&
      Math.abs(dy) < 0.05 &&
      targetPos.current.x === 0 &&
      targetPos.current.y === 0
    ) {
      currentPos.current.x = 0;
      currentPos.current.y = 0;
      el.style.transform = '';
      rafId.current = null;
      return;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  const startAnimation = useCallback(() => {
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isFinePointer.current || isReducedMotion.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp movement within subtle strength
      targetPos.current.x = Math.max(Math.min(deltaX * strength, strength), -strength);
      targetPos.current.y = Math.max(Math.min(deltaY * strength, strength), -strength);

      startAnimation();
    },
    [strength, startAnimation]
  );

  const handleMouseLeave = useCallback(() => {
    targetPos.current.x = 0;
    targetPos.current.y = 0;
    startAnimation();
  }, [startAnimation]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      <div ref={elementRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
};

