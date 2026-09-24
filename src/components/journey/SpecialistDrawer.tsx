import React from 'react';
import { X, ShieldCheck, AlertTriangle, Scale, CheckCircle2, ChevronRight } from 'lucide-react';
import type { DemoSpecialistDetail } from '../../data/demoWorkoutDecision';

interface SpecialistDrawerProps {
  specialist: DemoSpecialistDetail | null;
  onClose: () => void;
  onSelectClaim?: (claimId: string) => void;
}

export const SpecialistDrawer: React.FC<SpecialistDrawerProps> = ({
  specialist,
  onClose,
  onSelectClaim,
}) => {
  if (!specialist) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 h-full shadow-2xl border-l border-stone-200 dark:border-stone-800 flex flex-col justify-between p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                  {specialist.title}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    specialist.stanceType === 'positive'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : specialist.stanceType === 'warning'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {specialist.stance}
                </span>
              </div>
              <p className="text-xs font-mono text-stone-500">{specialist.role}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Confidence and Stance */}
          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40 flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Evaluator Confidence:
            </span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
              {specialist.confidence}%
            </span>
          </div>

          {/* Key Concern */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold mb-1">
              Core Position / Objection
            </h4>
            <p className="text-sm text-stone-800 dark:text-stone-200 font-medium leading-relaxed italic bg-amber-500/5 dark:bg-amber-500/10 p-3.5 rounded-lg border border-amber-500/20">
              &ldquo;{specialist.keyConcern}&rdquo;
            </p>
          </div>

          {/* Detailed Reasoning */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold mb-1.5">
              Full Epistemic Argument
            </h4>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
              {specialist.reasoning}
            </p>
          </div>

          {/* Citations */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold mb-2">
              Claims Cited ({specialist.evidenceCitations.length})
            </h4>
            <div className="space-y-1.5">
              {specialist.evidenceCitations.map((claimId) => (
                <div
                  key={claimId}
                  onClick={() => onSelectClaim?.(claimId)}
                  className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-700/60 bg-stone-50/50 dark:bg-stone-800/30 hover:border-amber-500/50 cursor-pointer flex items-center justify-between text-xs group"
                >
                  <span className="font-mono text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    {claimId}
                  </span>
                  <span className="text-[11px] text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 flex items-center gap-1">
                    <span>Inspect</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
