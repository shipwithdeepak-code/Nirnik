import React from 'react';
import { X, ExternalLink, Link2, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import type { Claim } from '../../types/claims';

interface ClaimDrawerProps {
  claim: Claim | null;
  onClose: () => void;
}

export const ClaimDrawer: React.FC<ClaimDrawerProps> = ({ claim, onClose }) => {
  if (!claim) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 h-full shadow-2xl border-l border-stone-200 dark:border-stone-800 flex flex-col justify-between p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-stone-500">{claim.id}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  claim.epistemicStatus === 'FACT'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : claim.epistemicStatus === 'INFERENCE'
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                    : claim.epistemicStatus === 'ASSUMPTION'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                }`}
              >
                {claim.epistemicStatus}
              </span>
              {claim.loadBearing === 'LOAD_BEARING' && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  Load-bearing
                </span>
              )}
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

          {/* Statement */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold mb-1.5">
              Statement
            </h4>
            <p className="text-sm font-sans text-stone-900 dark:text-stone-100 leading-relaxed font-medium">
              {claim.text}
            </p>
          </div>

          {/* Origin / Provenance */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40 space-y-2">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Epistemic Origin ({claim.origin.kind})
            </h4>
            <div className="text-xs text-stone-700 dark:text-stone-300 space-y-1">
              {claim.origin.kind === 'ARTIFACT' && (
                <div>
                  <span className="font-semibold">Observed in artifact: </span>
                  <p className="text-stone-600 dark:text-stone-400 mt-0.5">{claim.origin.evidence}</p>
                </div>
              )}
              {claim.origin.kind === 'MODEL_INFERENCE' && (
                <div>
                  <span className="font-semibold">Reasoning: </span>
                  <p className="text-stone-600 dark:text-stone-400 mt-0.5">{claim.origin.reasoning}</p>
                  {claim.origin.derivedFrom.length > 0 && (
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      <span className="text-[10px] text-stone-400">Derived from: </span>
                      {claim.origin.derivedFrom.map((id) => (
                        <span
                          key={id}
                          className="px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-700 font-mono text-[10px]"
                        >
                          {id}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {claim.origin.kind === 'MODEL_ASSUMPTION' && (
                <div>
                  <span className="font-semibold">Unverified premise: </span>
                  <p className="text-stone-600 dark:text-stone-400 mt-0.5">{claim.origin.reason}</p>
                </div>
              )}
              {claim.origin.kind === 'PM_INPUT' && (
                <div>
                  <span className="font-semibold">Entered by PM in field: </span>
                  <span className="font-mono">{claim.origin.field}</span>
                </div>
              )}
              {claim.origin.kind === 'PM_EVIDENCE' && (
                <div>
                  <span className="font-semibold">Pasted by PM as evidence</span>
                </div>
              )}
            </div>
          </div>

          {/* Supports & Dependants */}
          {claim.supports && claim.supports.length > 0 && (
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold mb-1.5">
                Downstream Dependants ({claim.supports.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {claim.supports.map((dep, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-xs font-mono text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                  >
                    {dep.dependantId} ({dep.dependantKind})
                  </span>
                ))}
              </div>
            </div>
          )}
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
