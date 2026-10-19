import React from 'react';
import { motion } from 'motion/react';
import { studioInfo } from '../data/landingData.ts';
import { MagneticWrapper } from './ui/MagneticWrapper.tsx';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2A2523] text-[#FAF7F2] py-16 px-6 sm:px-8 lg:px-12 border-t border-[#FAF7F2]/10 relative overflow-hidden">
      {/* Subtle bottom ambient warm glow */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[160px] opacity-15 blur-[80px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, #C9968B 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
        <div>
          <img
            src={studioInfo.logoLightUrl}
            alt={studioInfo.brandName}
            className="h-7 sm:h-8 w-auto object-contain mb-3"
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9968B] font-medium block mt-1">
            {studioInfo.brandTagline}
          </span>
          <p className="text-xs text-[#FAF7F2]/60 font-light mt-3 max-w-sm leading-relaxed">
            Nơi mỗi khung hình là một trang tạp chí thời trang nghệ thuật lưu giữ vẻ đẹp độc bản của bạn.
          </p>
        </div>

        {/* Social Links with Editorial Underline Reveal & Scroll-to-Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 text-xs tracking-[0.16em] uppercase text-[#FAF7F2]/70">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-1 text-[#FAF7F2]/75 hover:text-[#FAF7F2] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9968B]"
          >
            <span>Instagram</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9968B] transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-1 text-[#FAF7F2]/75 hover:text-[#FAF7F2] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9968B]"
          >
            <span>Facebook</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9968B] transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-1 text-[#FAF7F2]/75 hover:text-[#FAF7F2] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9968B]"
          >
            <span>Zalo Studio</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9968B] transition-all duration-300 group-hover:w-full" />
          </a>

          <MagneticWrapper strength={6}>
            <button
              type="button"
              onClick={scrollToTop}
              className="group text-[#FAF7F2] hover:text-[#C9968B] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9968B] flex items-center gap-2 py-1"
              aria-label="Cuộn lên đầu trang"
            >
              <span>Về Đầu Trang</span>
              <motion.span
                className="inline-block transition-transform duration-300 group-hover:-translate-y-1"
              >
                ↑
              </motion.span>
            </button>
          </MagneticWrapper>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#FAF7F2]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF7F2]/40 gap-4 relative z-10">
        <span>© {new Date().getFullYear()} {studioInfo.brandName}. All rights reserved.</span>
        <span className="font-serif-editorial italic text-xs tracking-wider text-[#FAF7F2]/50">
          Immersive Fashion Editorial Experience
        </span>
      </div>
    </footer>
  );
};
