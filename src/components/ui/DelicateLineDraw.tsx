import React, { useRef, useState, useEffect } from 'react';

interface DelicateLineDrawProps {
  readonly className?: string;
  readonly direction?: 'horizontal' | 'curve' | 'vertical' | 'arc';
  readonly duration?: number; // ms, default 1100ms
  readonly delay?: number;
  readonly strokeColor?: string;
}

export const DelicateLineDraw: React.FC<DelicateLineDrawProps> = ({
  className = '',
  direction = 'curve',
  duration = 1100,
  delay = 100,
  strokeColor = '#C9968B',
}) => {
  const lineRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (direction === 'horizontal') {
    return (
      <svg
        className={`w-full h-[2px] overflow-visible ${className}`}
        viewBox="0 0 400 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          ref={lineRef}
          d="M0 1H400"
          stroke={strokeColor}
          strokeWidth="1"
          strokeDasharray="400"
          strokeDashoffset={isVisible ? '0' : '400'}
          style={{
            transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
          }}
        />
      </svg>
    );
  }

  if (direction === 'vertical') {
    return (
      <svg
        className={`w-[2px] h-full min-h-[60px] overflow-visible ${className}`}
        viewBox="0 0 2 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          ref={lineRef}
          d="M1 0V120"
          stroke={strokeColor}
          strokeWidth="1"
          strokeDasharray="120"
          strokeDashoffset={isVisible ? '0' : '120'}
          style={{
            transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
          }}
        />
      </svg>
    );
  }

  // Romantic editorial arch / organic S-curve
  return (
    <svg
      className={`w-32 sm:w-48 h-8 overflow-visible ${className}`}
      viewBox="0 0 160 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        ref={lineRef}
        d="M2 15C40 2 80 28 120 15C135 10 150 18 158 15"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="200"
        strokeDashoffset={isVisible ? '0' : '200'}
        style={{
          transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
        }}
      />
    </svg>
  );
};
