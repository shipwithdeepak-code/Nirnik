import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { JourneyPhase, JOURNEY_STEPS } from './types';

interface JourneyRailProps {
  currentPhase: JourneyPhase;
  completedPhases: Set<JourneyPhase>;
  onSelectPhase: (phase: JourneyPhase) => void;
  isDemo?: boolean;
}

const PHASE_ORDER: JourneyPhase[] = ['FRAME', 'GROUND', 'CHALLENGE', 'DECIDE', 'RECORD'];

export const JourneyRail: React.FC<JourneyRailProps> = ({
  currentPhase,
  completedPhases,
  onSelectPhase,
  isDemo = false,
}) => {
  const currentIndex = PHASE_ORDER.indexOf(currentPhase);

  return (
    <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 p-4 lg:p-6 backdrop-blur-sm">
      <div className="mb-4 hidden lg:block">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono tracking-widest text-stone-500 uppercase font-semibold">
            Decision Journey
          </span>
          {isDemo && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              DEMO
            </span>
          )}
        </div>
      </div>

      {/* Desktop vertical stepper */}
      <nav aria-label="Decision journey navigation" className="hidden lg:flex flex-col space-y-2">
        {JOURNEY_STEPS.map((step, idx) => {
          const isCurrent = step.id === currentPhase;
          const isCompleted = completedPhases.has(step.id);
          const isAccessible = isCompleted || idx <= currentIndex;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!isAccessible}
              onClick={() => isAccessible && onSelectPhase(step.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-150 flex items-start space-x-3 text-sm group ${
                isCurrent
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm font-medium'
                  : isCompleted
                  ? 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  : 'text-stone-400 dark:text-stone-600 cursor-not-allowed opacity-75'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-mono transition-colors ${
                  isCurrent
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : isCompleted
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                }`}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  step.number
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="truncate">{step.name}</span>
                  {isCurrent && (
                    <ChevronRight className="w-4 h-4 shrink-0 opacity-70" />
                  )}
                </div>
                <p
                  className={`text-[11px] truncate mt-0.5 ${
                    isCurrent
                      ? 'text-stone-300 dark:text-stone-600'
                      : 'text-stone-500 dark:text-stone-500'
                  }`}
                >
                  {step.shortDesc}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Mobile/Tablet compact horizontal stepper */}
      <div className="flex lg:hidden items-center justify-between overflow-x-auto py-1 gap-1">
        {JOURNEY_STEPS.map((step, idx) => {
          const isCurrent = step.id === currentPhase;
          const isCompleted = completedPhases.has(step.id);
          const isAccessible = isCompleted || idx <= currentIndex;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!isAccessible}
              onClick={() => isAccessible && onSelectPhase(step.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                  : isCompleted
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                  : 'text-stone-400 dark:text-stone-600 bg-stone-100 dark:bg-stone-800/40 opacity-60'
              }`}
            >
              <span className="font-mono text-[10px]">
                {isCompleted && !isCurrent ? '✓' : step.number}
              </span>
              <span>{step.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
