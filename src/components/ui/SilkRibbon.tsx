import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface SilkRibbonProps {
  readonly slideStep: number;
  readonly className?: string;
  readonly opacity?: number;
}

/**
 * SilkRibbon:
 * Chains together 'Ethereal Blush Silk Ribbon Wave.png' and 'Ethereal.png' into
 * one continuous connected ribbon wave.
 * Glides smoothly across the screen on slide change in perfect synchronization with the slides.
 */
export const SilkRibbon: React.FC<SilkRibbonProps> = ({
  slideStep,
  className = '',
  opacity = 0.92,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [blockWidth, setBlockWidth] = useState<number>(2800);

  useEffect(() => {
    const updateMetrics = () => {
      if (blockRef.current) {
        const w = blockRef.current.offsetWidth;
        if (w > 100) {
          setBlockWidth(w);
        }
      }
    };

    updateMetrics();
    const ro = new ResizeObserver(updateMetrics);
    if (blockRef.current) ro.observe(blockRef.current);
    window.addEventListener('resize', updateMetrics);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateMetrics);
    };
  }, []);

  // 1 Block = [Ethereal Blush Silk Ribbon Wave.png] + [Ethereal.png]
  // 3 slides per full block cycle -> stepDistance = blockWidth / 3
  const stepDistance = blockWidth / 3;

  // Base offset to frame the first wave centered gracefully behind the composition
  const baseOffset = blockWidth * 0.35;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Balanced, natural full-bleed ribbon container (no forced 3rem left padding) */}
      <div className="absolute top-[14%] sm:top-[16%] lg:top-[18%] -left-[10%] w-[125%] h-[380px] sm:h-[480px] lg:h-[560px] flex items-center overflow-hidden">
        {/*
          Smooth horizontal translation synchronized with carousel transitions.
          Uses soft luxury editorial curve [0.22, 1, 0.36, 1].
        */}
        <motion.div
          className="flex items-center shrink-0 w-max"
          style={{ opacity }}
          animate={{
            x: -(baseOffset + slideStep * stepDistance),
          }}
          transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Render repeating connected blocks: Block 0 is buffer, Blocks 1-7 for continuous progression */}
          {Array.from({ length: 8 }).map((_, blockIdx) => (
            <div
              key={blockIdx}
              ref={blockIdx === 0 ? blockRef : undefined}
              className="flex items-center shrink-0"
            >
              {/* 1. First Wave Segment: Ethereal Blush Silk Ribbon Wave */}
              <img
                src="/Ethereal Blush Silk Ribbon Wave.png"
                alt=""
                className="h-[340px] sm:h-[440px] lg:h-[520px] w-auto max-w-none object-contain select-none pointer-events-none shrink-0 -mr-16 sm:-mr-24 lg:-mr-32"
                style={{
                  filter: 'drop-shadow(0 16px 36px rgba(183, 128, 131, 0.22))',
                  maskImage:
                    'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                }}
              />

              {/* 2. Second Wave Segment: Ethereal (Seamlessly connected to the first) */}
              <img
                src="/Ethereal.png"
                alt=""
                className="h-[340px] sm:h-[440px] lg:h-[520px] w-auto max-w-none object-contain select-none pointer-events-none shrink-0 -mr-16 sm:-mr-24 lg:-mr-32"
                style={{
                  filter: 'drop-shadow(0 16px 36px rgba(183, 128, 131, 0.22))',
                  maskImage:
                    'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
