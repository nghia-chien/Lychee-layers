import React, { useRef, useEffect } from 'react';

export const AtmosphericBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaFine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!mediaFine.matches || mediaReduced.matches) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const relX = e.clientX / window.innerWidth - 0.5;
      const relY = e.clientY / window.innerHeight - 0.5;
      targetX = relX * 22; // subtle +/- 22px
      targetY = relY * 22;

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-30 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div ref={orbRef} className="w-full h-full relative will-change-transform">
        {/* Soft Champagne ambient luminous orb (Top Right) */}
        <div
          className="animate-silk-drift absolute -top-[10%] right-[5%] w-[700px] h-[700px] rounded-full opacity-[0.07] blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #C5A880 0%, #FAF7F2 60%, transparent 80%)',
          }}
        />

        {/* Delicate Blush ambient luminous orb (Center Left) */}
        <div
          className="animate-silk-drift absolute top-[45%] -left-[10%] w-[650px] h-[650px] rounded-full opacity-[0.09] blur-[130px]"
          style={{
            animationDelay: '-12s',
            background: 'radial-gradient(circle, #EAC8BF 0%, #F7E7E2 55%, transparent 75%)',
          }}
        />

        {/* Warm Rose hint near bottom (Bottom Center) */}
        <div
          className="animate-silk-drift absolute -bottom-[10%] left-[30%] w-[600px] h-[500px] rounded-full opacity-[0.06] blur-[120px]"
          style={{
            animationDelay: '-6s',
            background: 'radial-gradient(ellipse, #C9968B 0%, #FAF7F2 60%, transparent 80%)',
          }}
        />
      </div>
    </div>
  );
};
