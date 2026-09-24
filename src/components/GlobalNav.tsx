import React from 'react';
import { Plus, Settings, ChevronRight, Play, ArrowLeft } from 'lucide-react';
import { NirnikSymbol } from './NirnikLogo';
import type { NavItem } from './Sidebar';
import type { JourneyPhase } from './journey/types';

interface GlobalNavProps {
  currentNav: NavItem;
  onSelectNav: (nav: NavItem) => void;
  onNewDecision: () => void;
  onOpenSettings: () => void;
  viewMode: 'home' | 'journey' | 'results';
  currentPhase?: JourneyPhase;
  completedPhases?: Set<JourneyPhase>;
  onSelectPhase?: (phase: JourneyPhase) => void;
  decisionTitle?: string | null;
  isDemo?: boolean;
  onExitDemo?: () => void;
  onBackToHome?: () => void;
}

const PHASES: Array<{ id: JourneyPhase; step: string; label: string }> = [
  { id: 'FRAME', step: '01', label: 'Frame' },
  { id: 'GROUND', step: '02', label: 'Ground' },
  { id: 'CHALLENGE', step: '03', label: 'Challenge' },
  { id: 'DECIDE', step: '04', label: 'Decide' },
  { id: 'RECORD', step: '05', label: 'Record' },
];

export const GlobalNav: React.FC<GlobalNavProps> = ({
  currentNav,
  onSelectNav,
  onNewDecision,
  onOpenSettings,
  viewMode,
  currentPhase = 'FRAME',
  completedPhases = new Set(),
  onSelectPhase,
  decisionTitle,
  isDemo = false,
  onExitDemo,
  onBackToHome,
}) => {
  const isInJourney = viewMode === 'journey';

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E8E8EA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand or Breadcrumb */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            type="button"
            onClick={onBackToHome || (() => onSelectNav('overview'))}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] rounded-lg p-1 group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#17191C] text-white flex items-center justify-center font-serif text-sm font-semibold tracking-tight shadow-2xs group-hover:bg-[#2D3139] transition-colors">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base tracking-tight font-medium text-[#17191C] leading-none">
                NIRNIK
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#777B86] leading-none mt-0.5 hidden sm:block">
                Decision Workspace
              </span>
            </div>
          </button>

          {/* Desktop Primary Nav Links (when on home / library) */}
          {!isInJourney && (
            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-[#E8E8EA]">
              <button
                type="button"
                onClick={() => onSelectNav('overview')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  currentNav === 'overview'
                    ? 'text-[#17191C] bg-[#F2F2F3]'
                    : 'text-[#777B86] hover:text-[#17191C] hover:bg-[#FAF9F6]'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => onSelectNav('decisions')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  currentNav === 'decisions'
                    ? 'text-[#17191C] bg-[#F2F2F3]'
                    : 'text-[#777B86] hover:text-[#17191C] hover:bg-[#FAF9F6]'
                }`}
              >
                Decisions
              </button>
              <button
                type="button"
                onClick={() => onSelectNav('evidence')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  currentNav === 'evidence'
                    ? 'text-[#17191C] bg-[#F2F2F3]'
                    : 'text-[#777B86] hover:text-[#17191C] hover:bg-[#FAF9F6]'
                }`}
              >
                Evidence
              </button>
              <button
                type="button"
                onClick={() => onSelectNav('claims')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  currentNav === 'claims'
                    ? 'text-[#17191C] bg-[#F2F2F3]'
                    : 'text-[#777B86] hover:text-[#17191C] hover:bg-[#FAF9F6]'
                }`}
              >
                Claims
              </button>
            </nav>
          )}

          {/* When in decision journey, display subtle context breadcrumb */}
          {isInJourney && (
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-[#E8E8EA] text-xs">
              <span className="text-[#777B86]">Workspace</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#B0B4BC]" />
              <span className="font-medium text-[#17191C] truncate max-w-[260px]">
                {decisionTitle || 'New Decision'}
              </span>
            </div>
          )}
        </div>

        {/* Center: Phase progression when in workspace */}
        {isInJourney && (
          <nav
            aria-label="Decision phases"
            className="hidden lg:flex items-center gap-1 bg-[#FAF9F6] border border-[#E8E8EA] rounded-full p-1 shadow-2xs"
          >
            {PHASES.map((phase) => {
              const isActive = currentPhase === phase.id;
              const isCompleted = completedPhases.has(phase.id);

              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => onSelectPhase?.(phase.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                    isActive
                      ? 'bg-[#17191C] text-white shadow-2xs font-medium'
                      : isCompleted
                      ? 'text-[#174A3A] bg-[#DDEBE4]/50 hover:bg-[#DDEBE4]'
                      : 'text-[#777B86] hover:text-[#17191C] hover:bg-[#F2F2F3]'
                  }`}
                >
                  <span className={isActive ? 'text-[#FBE1D1]' : 'opacity-70'}>
                    {phase.step}
                  </span>
                  <span className="uppercase tracking-wider font-sans font-medium text-[11px]">
                    {phase.label}
                  </span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {isDemo && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FBE1D1] border border-[#E8C5B2] text-[#5D2A1A] text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5D2A1A] animate-pulse" />
              <span className="font-semibold tracking-wider uppercase text-[10px]">Demo Mode</span>
              {onExitDemo && (
                <button
                  type="button"
                  onClick={onExitDemo}
                  className="ml-1 text-[10px] underline hover:text-black cursor-pointer"
                >
                  Exit
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={onNewDecision}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-[#17191C] hover:bg-[#2D3139] shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ New decision</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Settings"
            className="p-1.5 rounded-full text-[#777B86] hover:text-[#17191C] hover:bg-[#F2F2F3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C]"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Stepper row when in Journey */}
      {isInJourney && (
        <div className="lg:hidden flex items-center justify-between px-4 py-2 border-t border-[#E8E8EA] bg-[#FAF9F6] overflow-x-auto gap-2">
          {PHASES.map((phase) => {
            const isActive = currentPhase === phase.id;
            const isCompleted = completedPhases.has(phase.id);

            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => onSelectPhase?.(phase.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#17191C] text-white font-medium'
                    : isCompleted
                    ? 'text-[#174A3A] bg-[#DDEBE4]'
                    : 'text-[#777B86] hover:text-[#17191C]'
                }`}
              >
                <span>{phase.step}</span>
                <span className="font-sans uppercase tracking-wider">{phase.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
