import React, { useRef, useState, useEffect } from 'react';

interface ImageRevealProps {
  readonly src: string;
  readonly alt: string;
  readonly className?: string;
  readonly imgClassName?: string;
  readonly aspectRatio?: string;
  readonly delay?: number;
  readonly priority?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectRatio = 'aspect-[3/4]',
  delay = 0,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#ECE5DD] ${aspectRatio} ${className}`}
    >
      {/* Editorial delicate border frame */}
      <div
        className="absolute inset-0 pointer-events-none z-10 border border-[#2A2523]/10"
        aria-hidden="true"
      />

      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
        style={{
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(1.06) translateY(2%)',
          opacity: isVisible ? 1 : 0.01,
          filter: isVisible ? 'blur(0px)' : 'blur(4px)',
          transition: `transform 950ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms, opacity 850ms ease-out ${delay}ms, filter 700ms ease-out ${delay}ms`,
        }}
      />
    </div>
  );
};
