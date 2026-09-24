import React from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface NextActionBarProps {
  onBack?: () => void;
  canBack?: boolean;
  backLabel?: string;
  nextLabel: string;
  onNext: () => void;
  canNext?: boolean;
  isLoading?: boolean;
  orientationText?: string;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const NextActionBar: React.FC<NextActionBarProps> = ({
  onBack,
  canBack = true,
  backLabel = 'Back',
  nextLabel,
  onNext,
  canNext = true,
  isLoading = false,
  orientationText,
  secondaryAction,
}) => {
  return (
    <footer className="sticky bottom-0 z-30 w-full border-t border-[#E5E7E2] bg-[#FFFFFF]/95 backdrop-blur-md px-4 sm:px-6 py-2.5 shadow-xs">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Back / secondary */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          {canBack && onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#626862] hover:text-[#171A18] rounded-md hover:bg-[#F2F3EF] transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{backLabel}</span>
            </button>
          )}

          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              disabled={isLoading}
              className="text-xs text-[#626862] hover:text-[#171A18] underline underline-offset-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A]"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>

        {/* Center orientation microcopy */}
        {orientationText && (
          <p className="text-xs text-[#8A908A] text-center hidden md:block max-w-md truncate">
            {orientationText}
          </p>
        )}

        {/* Dominant Next Action */}
        <div className="w-full sm:w-auto flex justify-end">
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext || isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#174A3A] hover:bg-[#10372C] shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{nextLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
