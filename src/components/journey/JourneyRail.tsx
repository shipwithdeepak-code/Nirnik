import React from 'react';
import { Check } from 'lucide-react';
import { JourneyPhase, JOURNEY_STEPS } from './types';

interface JourneyRailProps {
  currentPhase: JourneyPhase;
  completedPhases: Set<JourneyPhase>;
  onSelectPhase: (phase: JourneyPhase) => void;
  isDemo?: boolean;
}

const PHASE_ORDER: JourneyPhase[] = ['FRAME', 'GROUND', 'CHALLENGE', 'DECIDE', 'RECORD'];

/**
 * Restrained, persistent horizontal stepper:
 * 01 Frame — 02 Ground — 03 Challenge — 04 Decide — 05 Record
 *
 * Current step: brand green
 * Completed: subtle check
 * Future: muted
 */
export const JourneyRail: React.FC<JourneyRailProps> = ({
  currentPhase,
  completedPhases,
  onSelectPhase,
  isDemo = false,
}) => {
  const currentIndex = PHASE_ORDER.indexOf(currentPhase);

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-[#E5E7E2] px-4 sm:px-8 py-3 select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between sm:justify-center sm:gap-6 overflow-x-auto scrollbar-none">
        {JOURNEY_STEPS.map((step, idx) => {
          const isCurrent = step.id === currentPhase;
          const isCompleted = completedPhases.has(step.id);
          const isAccessible = isCompleted || idx <= currentIndex;

          return (
            <React.Fragment key={step.id}>
              {/* Stepper Node Button */}
              <button
                type="button"
                disabled={!isAccessible}
                onClick={() => isAccessible && onSelectPhase(step.id)}
                className={`group flex items-center gap-2 text-xs transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] shrink-0 py-1 ${
                  !isAccessible
                    ? 'cursor-not-allowed opacity-50 text-[#8A908A]'
                    : isCurrent
                    ? 'text-[#174A3A] font-semibold'
                    : isCompleted
                    ? 'text-[#171A18] hover:text-[#174A3A] font-medium'
                    : 'text-[#8A908A] hover:text-[#626862]'
                }`}
              >
                {/* Node icon or number */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono transition-colors ${
                    isCurrent
                      ? 'bg-[#174A3A] text-white font-bold'
                      : isCompleted
                      ? 'bg-[#DDEBE4] text-[#174A3A]'
                      : 'bg-[#F2F3EF] text-[#8A908A]'
                  }`}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  ) : (
                    step.number
                  )}
                </div>

                {/* Step label */}
                <span className="capitalize">{step.name.toLowerCase()}</span>
              </button>

              {/* Separator dash */}
              {idx < JOURNEY_STEPS.length - 1 && (
                <div
                  className={`hidden sm:block w-6 h-px transition-colors ${
                    idx < currentIndex ? 'bg-[#174A3A]' : 'bg-[#E5E7E2]'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
