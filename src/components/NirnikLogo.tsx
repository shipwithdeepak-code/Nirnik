import React from 'react';

interface NirnikLogoProps {
  size?: number;
  className?: string;
  variant?: 'green' | 'monochrome' | 'white';
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

/**
 * Geometric Nirnik symbol:
 * Multiple independent lines/perspectives converging gracefully into a single definitive focal point.
 * Not a literal arrow, perfectly balanced at 20px and larger scales.
 */
export const NirnikSymbol: React.FC<{
  size?: number;
  className?: string;
  variant?: 'green' | 'monochrome' | 'white';
}> = ({ size = 20, className = '', variant = 'green' }) => {
  const strokeColor =
    variant === 'green'
      ? '#174A3A'
      : variant === 'white'
      ? '#FFFFFF'
      : 'currentColor';

  const fillColor = strokeColor;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Top converging path */}
      <path
        d="M3.5 5.5C8 7.5 13.5 10 18 12"
        stroke={strokeColor}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Middle direct path */}
      <path
        d="M3.5 12H18"
        stroke={strokeColor}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom converging path */}
      <path
        d="M3.5 18.5C8 16.5 13.5 14 18 12"
        stroke={strokeColor}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Focal convergence node */}
      <circle cx="18.5" cy="12" r="2.25" fill={fillColor} />
    </svg>
  );
};

export const NirnikLogo: React.FC<NirnikLogoProps> = ({
  size = 20,
  className = '',
  variant = 'green',
  showWordmark = true,
  wordmarkClassName = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <NirnikSymbol size={size} variant={variant} />
      {showWordmark && (
        <span
          className={`font-semibold tracking-tight lowercase text-stone-900 ${
            wordmarkClassName || 'text-[15px]'
          }`}
          style={{ letterSpacing: '-0.025em' }}
        >
          nirnik
        </span>
      )}
    </div>
  );
};
