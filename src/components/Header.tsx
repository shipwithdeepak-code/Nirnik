import React from 'react';
import { Scale, PlusCircle, History, Sparkles, FileText, Layers } from 'lucide-react';

interface HeaderProps {
  currentTab?: 'workspace' | 'results';
  hasResults?: boolean;
  onNavigate?: (tab: 'workspace' | 'results') => void;
  onOpenHistory?: () => void;
  onLoadSample?: () => void;
  onNewReview?: () => void;
  onOpenDecisions?: () => void;
  decisionsActive?: boolean;
  isDemo?: boolean;
  onExitDemo?: () => void;
  onHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab = 'workspace',
  hasResults = false,
  onNavigate,
  onOpenHistory,
  onLoadSample,
  onNewReview,
  onOpenDecisions,
  decisionsActive,
  isDemo = false,
  onExitDemo,
  onHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                if (onHome) onHome();
                else if (onNavigate) onNavigate('workspace');
              }}
              className="flex items-center gap-3 text-left group transition-opacity hover:opacity-90"
            >
              <div className="w-9 h-9 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 group-hover:border-amber-400/50 transition-colors">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold tracking-tight text-base text-white">
                    Product Jury
                  </span>
                  {isDemo ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold bg-amber-500 text-stone-950 shadow-xs animate-pulse">
                      DEMO MODE
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      PREVIEW v0.1
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-400 font-normal tracking-tight hidden sm:block">
                  Challenge the product. Defend the decision.
                </p>
              </div>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {isDemo && onExitDemo && (
              <button
                type="button"
                onClick={onExitDemo}
                className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-stone-800 hover:bg-stone-700 text-amber-400 border border-amber-500/30 transition-colors"
              >
                Exit demo
              </button>
            )}

            {onNewReview && (
              <button
                type="button"
                onClick={onNewReview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-stone-100 hover:bg-white text-stone-950 shadow-xs transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New decision</span>
              </button>
            )}

            {onOpenDecisions && (
              <button
                onClick={onOpenDecisions}
                aria-current={decisionsActive ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  decisionsActive
                    ? 'bg-stone-800 text-white border-stone-600'
                    : 'bg-stone-800/60 hover:bg-stone-800 text-stone-300 border-stone-700/50 hover:border-stone-600'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-stone-400" />
                <span>Decisions</span>
              </button>
            )}

            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-stone-800/60 hover:bg-stone-800 text-stone-300 border border-stone-700/50 hover:border-stone-600 transition-colors"
              >
                <History className="w-3.5 h-3.5 text-stone-400" />
                <span>History</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
