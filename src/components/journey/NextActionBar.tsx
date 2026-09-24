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
    <footer className="sticky bottom-0 z-30 w-full border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-4 sm:px-6 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Back / secondary */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          {canBack && onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{backLabel}</span>
            </button>
          )}

          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              disabled={isLoading}
              className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline underline-offset-4"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>

        {/* Center orientation microcopy */}
        {orientationText && (
          <p className="text-xs text-stone-500 dark:text-stone-400 text-center hidden md:block max-w-xl truncate">
            {orientationText}
          </p>
        )}

        {/* Dominant Next Action */}
        <div className="w-full sm:w-auto flex justify-end">
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext || isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-40 disabled:cursor-not-allowed group active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{nextLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
