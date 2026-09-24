import React from 'react';
import {
  ChevronRight,
  Shield,
  HelpCircle,
  Search,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

interface TopBarProps {
  breadcrumb: {
    section: string;
    item?: string;
    onSectionClick?: () => void;
  };
  isDemo?: boolean;
  onExitDemo?: () => void;
  onOpenSettings?: () => void;
  onOpenSearch?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  breadcrumb,
  isDemo = false,
  onExitDemo,
  onOpenSettings,
  onOpenSearch,
}) => {
  return (
    <header className="h-14 bg-[#FFFFFF] border-b border-[#E5E7E2] px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-20">
      {/* Left Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[#626862] min-w-0">
        <button
          type="button"
          onClick={breadcrumb.onSectionClick}
          disabled={!breadcrumb.onSectionClick}
          className={`font-medium transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] truncate ${
            breadcrumb.onSectionClick
              ? 'hover:text-[#171A18] cursor-pointer'
              : 'cursor-default text-[#8A908A]'
          }`}
        >
          {breadcrumb.section}
        </button>

        {breadcrumb.item && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#8A908A] shrink-0" />
            <span
              className="text-[#171A18] font-medium truncate max-w-[280px] sm:max-w-md lg:max-w-xl"
              title={breadcrumb.item}
            >
              {breadcrumb.item}
            </span>
          </>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Demo mode badge / exit */}
        {isDemo && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#DDEBE4] text-[#174A3A] text-xs font-medium border border-[#174A3A]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#174A3A]" />
            <span>Demo active</span>
            {onExitDemo && (
              <button
                type="button"
                onClick={onExitDemo}
                className="ml-1 text-[11px] underline hover:text-[#10372C] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A]"
              >
                Exit
              </button>
            )}
          </div>
        )}

        {/* Quick search shortcut */}
        {onOpenSearch && (
          <button
            type="button"
            onClick={onOpenSearch}
            title="Search (⌘K)"
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md border border-[#E5E7E2] bg-[#F7F7F4] text-xs text-[#8A908A] hover:border-[#D6D9D2] hover:text-[#171A18] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="text-[10px] font-mono px-1 py-0.2 rounded bg-[#FFFFFF] border border-[#E5E7E2]">
              ⌘K
            </kbd>
          </button>
        )}

        {/* Standing limits & Settings */}
        {onOpenSettings && (
          <button
            type="button"
            onClick={onOpenSettings}
            title="Integrity & Limitations"
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-[#626862] hover:text-[#171A18] hover:bg-[#F2F3EF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            <Shield className="w-3.5 h-3.5 text-[#174A3A]" />
            <span className="hidden md:inline font-medium">Device store</span>
          </button>
        )}

        {/* Minimal User Avatar/Control */}
        <div className="w-7 h-7 rounded-full bg-[#DDEBE4] text-[#174A3A] flex items-center justify-center font-medium text-xs border border-[#174A3A]/20">
          PM
        </div>
      </div>
    </header>
  );
};
