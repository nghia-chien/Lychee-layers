import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { studioInfo } from '../data/landingData.ts';
import { TypographyReveal } from './ui/TypographyReveal.tsx';
import { SilkDrift } from './ui/SilkDrift.tsx';
import { SatinButton } from './ui/SatinButton.tsx';
import { MagneticWrapper } from './ui/MagneticWrapper.tsx';
import { DelicateLineDraw } from './ui/DelicateLineDraw.tsx';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover.tsx';
import { Calendar } from './ui/calendar.tsx';
import { cn } from '../lib/utils.ts';

export const Closing: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    concept: 'personal',
    date: '',
    message: '',
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Realistic inquiry simulation with instant visual feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.12,
        delayChildren: isReducedMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="booking"
      className="relative min-h-dvh flex flex-col justify-center py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#F4EFEA]/80 via-[#FAF7F2] to-[#FAF7F2] border-t border-[#2A2523]/8 overflow-hidden"
    >
      {/* Silk Drift Ambient Gradient with Interactive Champagne Depth */}
      <SilkDrift />

      <div className="max-w-7xl mx-auto w-full my-auto z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Editorial Headline & Studio Contact Details */}
          <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9968B] font-semibold block mb-3">
                06 / BOOKING & CONSULTATION
              </span>

              {/* Typography Mask Reveal */}
              <div className="space-y-2 mb-6">
                <TypographyReveal as="h2">
                  <span className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2A2523] font-normal leading-[1.05] block">
                    {studioInfo.closingHeadline1}
                  </span>
                </TypographyReveal>

                <TypographyReveal as="div" delay={150}>
                  <span className="font-serif-editorial italic text-3xl sm:text-4xl lg:text-5xl text-[#9E5D52] font-normal block">
                    {studioInfo.closingHeadline2}
                  </span>
                </TypographyReveal>
              </div>

              <TypographyReveal as="div" delay={250}>
                <p className="text-base text-[#544B47] font-light leading-relaxed max-w-lg mb-8">
                  {studioInfo.closingDescription}
                </p>
              </TypographyReveal>

              <DelicateLineDraw direction="horizontal" strokeColor="#C9968B" className="max-w-xs mb-8" />
            </div>

            {/* Studio Contact Cards with Refined Hover Feedback */}
            <div className="space-y-4 pt-4 border-t border-[#2A2523]/8 text-xs text-[#544B47]">
              <div className="p-3 bg-white/40 border border-[#2A2523]/5 rounded-[2px] transition-colors hover:bg-white/80">
                <span className="uppercase tracking-[0.2em] text-[#8A7E78] block mb-1">
                  Vị Trí Studio
                </span>
                <p className="font-medium text-[#2A2523]">{studioInfo.addressNotice}</p>
              </div>

              <div className="p-3 bg-white/40 border border-[#2A2523]/5 rounded-[2px] transition-colors hover:bg-white/80">
                <span className="uppercase tracking-[0.2em] text-[#8A7E78] block mb-1">
                  Trực Tuyến & Hotline
                </span>
                <p className="font-medium text-[#2A2523]">{studioInfo.hotlineNotice}</p>
                <p className="text-[#8A7E78] mt-0.5">Instagram: {studioInfo.instagramHandle}</p>
              </div>

              <div className="p-3 bg-white/40 border border-[#2A2523]/5 rounded-[2px] transition-colors hover:bg-white/80">
                <span className="uppercase tracking-[0.2em] text-[#8A7E78] block mb-1">
                  Thời Gian Tiếp Khách
                </span>
                <p className="text-[#544B47]">{studioInfo.workingHours}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Refined Booking Inquiry Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 bg-white/92 backdrop-blur-md p-6 sm:p-10 border border-[#2A2523]/10 shadow-[0_24px_64px_rgba(42,37,35,0.08)] relative"
          >
            <div className="mb-6 pb-4 border-b border-[#2A2523]/8">
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#2A2523] font-medium">
                Gửi Yêu Cầu Tư Vấn Concept
              </h3>
              <p className="text-xs text-[#8A7E78] mt-1 font-light">
                Ekip sẽ phản hồi trong vòng 2 giờ làm việc kèm moodboard gợi ý.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.1 }}
                    className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#EAC8BF]/50 border border-[#C9968B]/40 flex items-center justify-center text-[#2A2523] text-2xl font-light"
                  >
                    ✓
                  </motion.div>
                  <h4 className="font-serif-editorial text-2xl sm:text-3xl text-[#2A2523] mb-2 font-normal">
                    Đã Nhận Yêu Cầu Của Bạn
                  </h4>
                  <p className="text-xs text-[#544B47] max-w-sm mx-auto leading-relaxed mb-8 font-light">
                    Cảm ơn bạn đã gửi thông tin đến Lychee Layers Studio. Chuyên viên Art Director sẽ liên hệ qua điện thoại hoặc Zalo để cùng bạn phác thảo bộ ảnh độc bản.
                  </p>
                  <SatinButton
                    onClick={() => {
                      setIsSuccess(false);
                      setSelectedDate(undefined);
                      setFormState({
                        name: '',
                        phone: '',
                        concept: 'personal',
                        date: '',
                        message: '',
                      });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Gửi Yêu Cầu Khác
                  </SatinButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-[0.16em] text-[#2A2523] mb-1.5 font-medium">
                      Họ và Tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Nguyễn Phương Thảo"
                      className="w-full min-h-[46px] px-4 bg-[#FAF7F2] border border-[#2A2523]/15 text-xs text-[#2A2523] placeholder:text-[#8A7E78]/60 focus:outline-none focus:border-[#2A2523] focus:ring-1 focus:ring-[#2A2523]/20 focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs uppercase tracking-[0.16em] text-[#2A2523] mb-1.5 font-medium">
                        Số Điện Thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="0912 345 678"
                        className="w-full min-h-[46px] px-4 bg-[#FAF7F2] border border-[#2A2523]/15 text-xs text-[#2A2523] placeholder:text-[#8A7E78]/60 focus:outline-none focus:border-[#2A2523] focus:ring-1 focus:ring-[#2A2523]/20 focus:bg-white transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="concept" className="block text-xs uppercase tracking-[0.16em] text-[#2A2523] mb-1.5 font-medium">
                        Concept Quan Tâm
                      </label>
                      <select
                        id="concept"
                        value={formState.concept}
                        onChange={(e) => setFormState({ ...formState, concept: e.target.value })}
                        className="w-full min-h-[46px] px-3 bg-[#FAF7F2] border border-[#2A2523]/15 text-xs text-[#2A2523] focus:outline-none focus:border-[#2A2523] focus:ring-1 focus:ring-[#2A2523]/20 focus:bg-white transition-all duration-200"
                      >
                        <option value="personal">Personal Editorial</option>
                        <option value="fine-art">Fine Art Poetic</option>
                        <option value="costume">Costume & Haute Couture</option>
                        <option value="portrait">Classic Studio Portrait</option>
                        <option value="custom">Custom Curated Story</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-date" className="block text-xs uppercase tracking-[0.16em] text-[#2A2523] mb-1.5 font-medium">
                      Ngày Chụp Dự Kiến
                    </label>
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <button
                          id="booking-date"
                          type="button"
                          className={cn(
                            "w-full min-h-[46px] px-4 bg-[#FAF7F2] border border-[#2A2523]/15 text-xs text-[#2A2523] flex items-center justify-between text-left transition-all duration-200 cursor-pointer",
                            "hover:border-[#2A2523]/40 focus:outline-none focus:border-[#2A2523] focus:ring-1 focus:ring-[#2A2523]/20 focus:bg-white",
                            !selectedDate && "text-[#8A7E78]/70"
                          )}
                        >
                          <span className="flex items-center gap-2.5 truncate">
                            <CalendarIcon className="size-3.5 text-[#C9968B] shrink-0" />
                            {selectedDate ? (
                              <span className="text-[#2A2523] font-medium capitalize">
                                {format(selectedDate, 'EEEE, dd/MM/yyyy', { locale: vi })}
                              </span>
                            ) : (
                              <span>Chọn ngày chụp dự kiến</span>
                            )}
                          </span>
                          <ChevronDown
                            className={cn(
                              "size-3.5 text-[#8A7E78] shrink-0 transition-transform duration-200",
                              isCalendarOpen && "rotate-180 text-[#2A2523]"
                            )}
                          />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 border border-[#2A2523]/15 bg-[#FAF7F2] shadow-[0_20px_50px_rgba(42,37,35,0.14)]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date);
                            setFormState((prev) => ({
                              ...prev,
                              date: date ? format(date, 'yyyy-MM-dd') : '',
                            }));
                            setIsCalendarOpen(false);
                          }}
                          locale={vi}
                          disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-[0.16em] text-[#2A2523] mb-1.5 font-medium">
                      Ghi Chú Hoặc Mong Muốn Riêng
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Chia sẻ về tone màu bạn yêu thích, dịp đặc biệt hoặc layout mong muốn..."
                      className="w-full p-4 bg-[#FAF7F2] border border-[#2A2523]/15 text-xs text-[#2A2523] placeholder:text-[#8A7E78]/60 focus:outline-none focus:border-[#2A2523] focus:ring-1 focus:ring-[#2A2523]/20 focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <MagneticWrapper strength={6} className="w-full">
                      <SatinButton
                        type="submit"
                        size="lg"
                        variant="primary"
                        className="w-full"
                      >
                        {isSubmitting ? 'Đang Gửi Yêu Cầu...' : 'Gửi Yêu Cầu Đặt Lịch Chụp'}
                      </SatinButton>
                    </MagneticWrapper>
                  </div>

                  <p className="text-[10px] text-[#8A7E78] text-center pt-2">
                    Thông tin của bạn được cam kết bảo mật theo tiêu chuẩn studio cao cấp.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
