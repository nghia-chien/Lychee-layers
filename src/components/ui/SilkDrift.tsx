import React, { useRef, useEffect } from 'react';

interface SilkDriftProps {
  readonly className?: string;
  readonly interactive?: boolean;
}

export const SilkDrift: React.FC<SilkDriftProps> = ({ className = '', interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive || typeof window === 'undefined') return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!media.matches) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = relX * 28; // Subtle 28px max shift
      targetY = relY * 28;

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Primary soft blush silk gradient mesh */}
      <div
        className="animate-silk-drift absolute -top-[20%] -left-[10%] w-[120%] h-[140%] opacity-40 blur-[90px]"
        style={{
          background:
            'radial-gradient(ellipse at 30% 25%, #F7E7E2 0%, #FAF7F2 45%, #EAC8BF 85%, transparent 100%)',
        }}
      />

      {/* Secondary rose accent highlight */}
      <div
        className="animate-silk-drift absolute top-[35%] -right-[15%] w-[85%] h-[85%] opacity-30 blur-[100px]"
        style={{
          animationDelay: '-10s',
          background:
            'radial-gradient(circle at 70% 60%, #EAC8BF 0%, #F5ECE8 50%, transparent 80%)',
        }}
      />

      {/* Tertiary champagne warm focal glow with subtle pointer interaction */}
      <div
        ref={glowRef}
        className="absolute top-[20%] left-[25%] w-[60%] h-[60%] opacity-25 blur-[120px] will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, #C5A880 0%, #FAF7F2 60%, transparent 80%)',
        }}
      />
    </div>
  );
};
