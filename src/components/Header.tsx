import React from 'react';
import { PlusCircle, History, Play } from 'lucide-react';
import { NirnikLogo } from './NirnikLogo';

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
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E5E7E2] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                if (onHome) onHome();
                else if (onNavigate) onNavigate('workspace');
              }}
              className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] rounded-md px-1 py-0.5"
            >
              <NirnikLogo size={20} variant="green" />
              {isDemo && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#DDEBE4] text-[#174A3A] border border-[#174A3A]/20">
                  DEMO MODE
                </span>
              )}
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5">
            {isDemo && onExitDemo && (
              <button
                type="button"
                onClick={onExitDemo}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#FAF0F0] hover:bg-[#F4D0D0] text-[#B54747] border border-[#F4D0D0] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B54747]"
              >
                Exit demo
              </button>
            )}

            {onNewReview && (
              <button
                type="button"
                onClick={onNewReview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#174A3A] hover:bg-[#10372C] text-white shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New decision</span>
              </button>
            )}

            {onOpenDecisions && (
              <button
                type="button"
                onClick={onOpenDecisions}
                aria-current={decisionsActive ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
                  decisionsActive
                    ? 'bg-[#F2F3EF] text-[#171A18] border-[#D6D9D2]'
                    : 'bg-white text-[#626862] border-[#E5E7E2] hover:bg-[#F2F3EF]'
                }`}
              >
                <span>Decisions</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
