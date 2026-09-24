import React, { useState } from 'react';
import {
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  FileQuestion,
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';
import type { Claim } from '../../types/claims';
import type { DemoUnknownItem } from '../../data/demoWorkoutDecision';

interface GroundStepProps {
  claims: Claim[];
  unknowns: DemoUnknownItem[];
  onUpdateUnknown: (unknownId: string, updates: Partial<DemoUnknownItem>) => void;
  onOpenClaimDetail: (claim: Claim) => void;
  isDemo?: boolean;
}

export const GroundStep: React.FC<GroundStepProps> = ({
  claims,
  unknowns,
  onUpdateUnknown,
  onOpenClaimDetail,
  isDemo = false,
}) => {
  const [epistemicFilter, setEpistemicFilter] = useState<'ALL' | 'FACT' | 'INFERENCE' | 'ASSUMPTION' | 'UNKNOWN'>('ALL');
  const [resolvingUnknownId, setResolvingUnknownId] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  const factsCount = claims.filter((c) => c.epistemicStatus === 'FACT').length;
  const inferencesCount = claims.filter((c) => c.epistemicStatus === 'INFERENCE').length;
  const assumptionsCount = claims.filter((c) => c.epistemicStatus === 'ASSUMPTION').length;
  const unknownsCount = claims.filter((c) => c.epistemicStatus === 'UNKNOWN').length;

  const filteredClaims =
    epistemicFilter === 'ALL'
      ? claims
      : claims.filter((c) => c.epistemicStatus === epistemicFilter);

  const handleMarkAcceptable = (u: DemoUnknownItem) => {
    onUpdateUnknown(u.id, {
      status: 'ACCEPTABLE',
      resolutionNote: 'Accepted as reasonable operational risk for this rollout phase.',
    });
  };

  const handleSaveResolution = (id: string) => {
    if (!resolutionText.trim()) return;
    onUpdateUnknown(id, {
      status: 'RESOLVED',
      resolutionNote: resolutionText.trim(),
    });
    setResolvingUnknownId(null);
    setResolutionText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            PHASE 02 · GROUND
          </span>
          {isDemo && (
            <span className="text-[11px] font-mono text-stone-500">
              Deterministic Claim Spine
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-50 font-normal">
          What does the Jury actually know?
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Separating verified facts from inferences, load-bearing assumptions, and unanswered unknowns.
        </p>
      </div>

      {/* Epistemic UI: 4 Interactive Filter Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
            Epistemic Breakdown
          </h2>
          {epistemicFilter !== 'ALL' && (
            <button
              type="button"
              onClick={() => setEpistemicFilter('ALL')}
              className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline"
            >
              Show all ({claims.length})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* FACTS */}
          <button
            type="button"
            onClick={() => setEpistemicFilter(epistemicFilter === 'FACT' ? 'ALL' : 'FACT')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              epistemicFilter === 'FACT'
                ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30'
                : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                FACTS
              </span>
              <span className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">
                {factsCount}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
              Observable empirical data from logs, surveys, or benchmarks.
            </p>
          </button>

          {/* INFERENCES */}
          <button
            type="button"
            onClick={() => setEpistemicFilter(epistemicFilter === 'INFERENCE' ? 'ALL' : 'INFERENCE')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              epistemicFilter === 'INFERENCE'
                ? 'border-sky-500 bg-sky-500/10 ring-2 ring-sky-500/30'
                : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-sky-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono font-bold uppercase text-sky-600 dark:text-sky-400">
                INFERENCES
              </span>
              <span className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">
                {inferencesCount}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
              Logical deductions derived directly from observed facts.
            </p>
          </button>

          {/* ASSUMPTIONS */}
          <button
            type="button"
            onClick={() => setEpistemicFilter(epistemicFilter === 'ASSUMPTION' ? 'ALL' : 'ASSUMPTION')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              epistemicFilter === 'ASSUMPTION'
                ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30'
                : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                ASSUMPTIONS
              </span>
              <span className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">
                {assumptionsCount}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
              Unverified beliefs accepted as true for this decision.
            </p>
          </button>

          {/* UNKNOWNS */}
          <button
            type="button"
            onClick={() => setEpistemicFilter(epistemicFilter === 'UNKNOWN' ? 'ALL' : 'UNKNOWN')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              epistemicFilter === 'UNKNOWN'
                ? 'border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/30'
                : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-purple-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono font-bold uppercase text-purple-600 dark:text-purple-400">
                UNKNOWNS
              </span>
              <span className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">
                {unknownsCount}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
              Critical missing information that could reverse the call.
            </p>
          </button>
        </div>
      </section>

      {/* Claim Spine Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
              Claim Spine ({filteredClaims.length} Claims)
            </h2>
            <p className="text-xs text-stone-500">
              Every position in Product Jury explicitly cites these addressable claim IDs.
            </p>
          </div>
          <span className="text-[11px] font-mono text-stone-500 hidden sm:inline">
            Click any row to inspect citations
          </span>
        </div>

        <div className="space-y-2">
          {filteredClaims.map((claim) => (
            <div
              key={claim.id}
              onClick={() => onOpenClaimDetail(claim)}
              className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-700 cursor-pointer transition-all flex items-start gap-3 group"
            >
              {/* Epistemic Badge */}
              <div className="pt-0.5 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    claim.epistemicStatus === 'FACT'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : claim.epistemicStatus === 'INFERENCE'
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                      : claim.epistemicStatus === 'ASSUMPTION'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                  }`}
                >
                  {claim.epistemicStatus}
                </span>
              </div>

              {/* Text & Claim ID */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] font-mono font-medium text-stone-400 dark:text-stone-500">
                    {claim.id}
                  </span>
                  {claim.loadBearing === 'LOAD_BEARING' && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Load-bearing
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-sans leading-relaxed group-hover:text-stone-950 dark:group-hover:text-white transition-colors">
                  {claim.text}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Critical Unknowns Section */}
      <section className="space-y-4 pt-2">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
            Critical Unknowns ({unknowns.length})
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            What could change this decision if revealed later? Address, accept, or test them before the Jury deliberates.
          </p>
        </div>

        <div className="space-y-3">
          {unknowns.map((u) => {
            const isResolved = u.status === 'RESOLVED';
            const isAcceptable = u.status === 'ACCEPTABLE';

            return (
              <div
                key={u.id}
                className={`p-4 rounded-xl border transition-all ${
                  isResolved
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : isAcceptable
                    ? 'border-sky-500/30 bg-sky-500/5'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-stone-400">{u.id}</span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                        isResolved
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : isAcceptable
                          ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400'
                          : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {u.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  {u.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 dark:text-stone-400 mb-3 bg-stone-50/70 dark:bg-stone-800/40 p-3 rounded-lg border border-stone-200/50 dark:border-stone-700/30">
                  <div>
                    <span className="font-semibold block text-[10px] font-mono uppercase text-stone-500 mb-0.5">
                      Why it matters
                    </span>
                    <p className="leading-snug">{u.whyItMatters}</p>
                  </div>
                  <div>
                    <span className="font-semibold block text-[10px] font-mono uppercase text-stone-500 mb-0.5">
                      What would resolve it
                    </span>
                    <p className="leading-snug">{u.whatWouldResolveIt}</p>
                  </div>
                </div>

                {u.resolutionNote && (
                  <div className="text-xs p-2.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 mb-3 text-stone-700 dark:text-stone-300">
                    <span className="font-semibold">Action taken: </span>
                    {u.resolutionNote}
                  </div>
                )}

                {/* Resolution Actions */}
                {resolvingUnknownId === u.id ? (
                  <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300">
                      Add evidence or define validation test:
                    </label>
                    <textarea
                      rows={2}
                      value={resolutionText}
                      onChange={(e) => setResolutionText(e.target.value)}
                      placeholder="e.g. Added a 20% novice volume restriction to our feature spec..."
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setResolvingUnknownId(null)}
                        className="px-2.5 py-1 text-xs text-stone-500 hover:text-stone-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveResolution(u.id)}
                        className="px-3 py-1 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-xs font-medium rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleMarkAcceptable(u)}
                      className="px-2.5 py-1 rounded text-xs font-medium bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
                    >
                      Mark acceptable uncertainty
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setResolvingUnknownId(u.id);
                        setResolutionText(u.resolutionNote || '');
                      }}
                      className="px-2.5 py-1 rounded text-xs font-medium border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      Add evidence / test
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
