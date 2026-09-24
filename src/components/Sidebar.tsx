import React from 'react';
import {
  LayoutDashboard,
  FolderArchive,
  Layers,
  FileText,
  Bookmark,
  Play,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  ExternalLink,
} from 'lucide-react';
import { NirnikLogo, NirnikSymbol } from './NirnikLogo';

export type NavItem =
  | 'overview'
  | 'decisions'
  | 'templates'
  | 'evidence'
  | 'claims'
  | 'settings';

interface SidebarProps {
  currentNav: NavItem;
  onSelectNav: (nav: NavItem) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNewDecision: () => void;
  onStartDemo: () => void;
  isDemoActive?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentNav,
  onSelectNav,
  isCollapsed,
  onToggleCollapse,
  onNewDecision,
  onStartDemo,
  isDemoActive = false,
}) => {
  return (
    <aside
      className={`relative flex flex-col shrink-0 h-screen bg-[#FFFFFF] border-r border-[#E5E7E2] transition-all duration-200 z-30 select-none ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
      aria-label="Application sidebar"
    >
      {/* Brand & Collapse Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-[#E5E7E2]">
        {isCollapsed ? (
          <button
            type="button"
            onClick={() => onSelectNav('overview')}
            title="nirnik overview"
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#F2F3EF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            <NirnikSymbol size={20} variant="green" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onSelectNav('overview')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] rounded-md px-1 py-0.5"
          >
            <NirnikLogo size={20} variant="green" />
          </button>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1 rounded-md text-[#8A908A] hover:text-[#171A18] hover:bg-[#F2F3EF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Primary Action Button */}
      <div className="p-3 border-b border-[#E5E7E2]">
        {isCollapsed ? (
          <button
            type="button"
            onClick={onNewDecision}
            title="New decision"
            className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-[#174A3A] hover:bg-[#10372C] text-white shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNewDecision}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#174A3A] hover:bg-[#10372C] text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New decision</span>
          </button>
        )}
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5 text-[13px]">
        {/* Workspace section */}
        <div>
          {!isCollapsed && (
            <div className="px-2 pb-1.5 text-[11px] font-medium tracking-wide text-[#8A908A] uppercase">
              Workspace
            </div>
          )}
          <nav className="space-y-0.5">
            <button
              type="button"
              onClick={() => onSelectNav('overview')}
              title={isCollapsed ? 'Overview' : undefined}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
                currentNav === 'overview'
                  ? 'bg-[#F2F3EF] text-[#171A18]'
                  : 'text-[#626862] hover:bg-[#F2F3EF]/60 hover:text-[#171A18]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0 text-[#626862]" />
              {!isCollapsed && <span>Overview</span>}
            </button>

            <button
              type="button"
              onClick={() => onSelectNav('decisions')}
              title={isCollapsed ? 'Decisions' : undefined}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
                currentNav === 'decisions'
                  ? 'bg-[#F2F3EF] text-[#171A18]'
                  : 'text-[#626862] hover:bg-[#F2F3EF]/60 hover:text-[#171A18]'
              }`}
            >
              <FolderArchive className="w-4 h-4 shrink-0 text-[#626862]" />
              {!isCollapsed && <span>Decisions</span>}
            </button>

            <button
              type="button"
              onClick={() => onSelectNav('templates')}
              title={isCollapsed ? 'Templates' : undefined}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
                currentNav === 'templates'
                  ? 'bg-[#F2F3EF] text-[#171A18]'
                  : 'text-[#626862] hover:bg-[#F2F3EF]/60 hover:text-[#171A18]'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0 text-[#626862]" />
              {!isCollapsed && <span>Templates</span>}
            </button>
          </nav>
        </div>

        {/* Library section */}
        <div>
          {!isCollapsed && (
            <div className="px-2 pb-1.5 text-[11px] font-medium tracking-wide text-[#8A908A] uppercase">
              Library
            </div>
          )}
          <nav className="space-y-0.5">
            <button
              type="button"
              onClick={() => onSelectNav('evidence')}
              title={isCollapsed ? 'Evidence' : undefined}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
                currentNav === 'evidence'
                  ? 'bg-[#F2F3EF] text-[#171A18]'
                  : 'text-[#626862] hover:bg-[#F2F3EF]/60 hover:text-[#171A18]'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0 text-[#626862]" />
              {!isCollapsed && <span>Evidence</span>}
            </button>

            <button
              type="button"
              onClick={() => onSelectNav('claims')}
              title={isCollapsed ? 'Claims' : undefined}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
                currentNav === 'claims'
                  ? 'bg-[#F2F3EF] text-[#171A18]'
                  : 'text-[#626862] hover:bg-[#F2F3EF]/60 hover:text-[#171A18]'
              }`}
            >
              <Bookmark className="w-4 h-4 shrink-0 text-[#626862]" />
              {!isCollapsed && <span>Claims</span>}
            </button>
          </nav>
        </div>

        {/* Demo Mode section */}
        <div className="pt-2 border-t border-[#E5E7E2]">
          <button
            type="button"
            onClick={onStartDemo}
            title={isCollapsed ? 'Demo mode (3 min)' : undefined}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md font-medium text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
              isDemoActive
                ? 'bg-[#DDEBE4] text-[#174A3A] border border-[#174A3A]/30'
                : 'text-[#174A3A] bg-[#DDEBE4]/50 hover:bg-[#DDEBE4] border border-[#174A3A]/20'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-[#174A3A] text-[#174A3A] shrink-0" />
            {!isCollapsed && (
              <div className="flex items-center justify-between w-full">
                <span>Demo mode</span>
                <span className="text-[10px] font-mono text-[#174A3A]/80">3 min</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Footer / Settings */}
      <div className="p-2 border-t border-[#E5E7E2]">
        <button
          type="button"
          onClick={() => onSelectNav('settings')}
          title={isCollapsed ? 'Settings' : undefined}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
            currentNav === 'settings'
              ? 'bg-[#F2F3EF] text-[#171A18]'
              : 'text-[#626862] hover:bg-[#F2F3EF]/60 hover:text-[#171A18]'
          }`}
        >
          <Settings className="w-4 h-4 shrink-0 text-[#626862]" />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
};
