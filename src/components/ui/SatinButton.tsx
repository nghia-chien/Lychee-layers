import React from 'react';

interface SatinButtonProps {
  readonly children: React.ReactNode;
  readonly href?: string;
  readonly onClick?: () => void;
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly className?: string;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly icon?: React.ReactNode;
  readonly ariaLabel?: string;
}

export const SatinButton: React.FC<SatinButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  icon,
  ariaLabel,
}) => {
  const sizeStyles = {
    sm: 'min-h-[44px] px-5 py-2.5 text-xs tracking-[0.16em]',
    md: 'min-h-[48px] px-7 py-3.5 text-xs sm:text-sm tracking-[0.18em]',
    lg: 'min-h-[52px] px-9 py-4 text-sm tracking-[0.2em]',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#2A2523] text-[#FAF7F2] border border-[#2A2523] hover:bg-[#3D3532] shadow-[0_4px_20px_rgba(42,37,35,0.08)]',
    secondary:
      'bg-[#EAC8BF] text-[#2A2523] border border-[#DFC0B6] hover:bg-[#E3BCB1] shadow-[0_4px_20px_rgba(234,200,191,0.25)]',
    outline:
      'bg-transparent text-[#2A2523] border border-[#2A2523]/40 hover:border-[#2A2523] hover:bg-[#2A2523]/5',
    ghost:
      'bg-transparent text-[#2A2523] border-transparent hover:bg-[#2A2523]/5',
  }[variant];

  const baseStyles =
    'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden font-medium uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2523] focus-visible:ring-offset-2 active:scale-[0.97] transition-transform';

  const content = (
    <>
      {/* Satin Shimmer Light Layer */}
      <span className="satin-button-shimmer" aria-hidden="true" />

      {/* Button Text & Icon */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};
