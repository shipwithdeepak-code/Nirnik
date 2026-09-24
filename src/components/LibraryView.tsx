import React, { useState } from 'react';
import { FileText, Bookmark, ChevronRight, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import type { Claim } from '../types/claims';
import { demoWorkoutClaims } from '../data/demoWorkoutDecision';

interface LibraryViewProps {
  type: 'evidence' | 'claims';
  onSelectClaim?: (claim: Claim) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  type,
  onSelectClaim,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'FACT' | 'INFERENCE' | 'ASSUMPTION'>('ALL');

  const claims = demoWorkoutClaims;
  const filteredClaims =
    activeFilter === 'ALL'
      ? claims
      : claims.filter((c) => c.epistemicStatus === activeFilter);

  return (
    <div className="max-w-4xl mx-auto py-12 sm:py-16 px-4 sm:px-6 space-y-10">
      <div className="space-y-2 pb-4 border-b border-[#E8E8EA]">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#777B86]">
          {type === 'evidence' ? 'Research & Telemetry' : 'Epistemic Claims'}
        </div>
        <h1
          className="text-3xl sm:text-4xl font-normal tracking-tight text-[#17191C]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          {type === 'evidence' ? 'Evidence Library' : 'Claims Library'}
        </h1>
        <p className="text-xs text-[#626862] leading-relaxed max-w-2xl font-light">
          {type === 'evidence'
            ? 'Empirical sources, holdout telemetry, and research artifacts referenced across decisions.'
            : 'Structured claims cataloged by epistemic status: verified facts, inferences, assumptions, and unknowns.'}
        </p>
      </div>

      {type === 'evidence' ? (
        <div className="space-y-4">
          {/* Source 1 */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#DDEBE4] text-[#174A3A]">
                  Empirical Telemetry
                </span>
                <span className="font-mono text-[11px] text-[#777B86]">Sep 2026</span>
              </div>
              <span className="text-[11px] font-mono text-[#777B86]">
                Used in 4 claims
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-semibold text-[#17191C]">
                Beta Pilot Adherence Telemetry Log
              </h2>
              <p className="text-xs text-[#626862] leading-relaxed">
                4,820 active athletes tracked over 14 days with dynamic workout plan adjustments. Observed a +16.1% net lift in active adherence compared to static holdout group.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#F2F2F3] text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#174A3A] uppercase font-semibold">
                  Claims Supported
                </span>
                <p className="text-[#17191C] leading-snug">
                  Personalized recommendations increase weekly workout frequency (+16.1%).
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#B54747] uppercase font-semibold">
                  Claims Contradicted
                </span>
                <p className="text-[#17191C] leading-snug">
                  Claim that static plans provide equal user satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* Source 2 */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#DDEBE4] text-[#174A3A]">
                  Qualitative Research
                </span>
                <span className="font-mono text-[11px] text-[#777B86]">Aug 2026</span>
              </div>
              <span className="text-[11px] font-mono text-[#777B86]">
                Used in 2 claims
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-semibold text-[#17191C]">
                Q2 Subscription Exit Survey Interviews
              </h2>
              <p className="text-xs text-[#626862] leading-relaxed">
                41% of churned subscribers cite rigid or fatigue-mismatched static routines as their direct cancellation trigger in exit surveys.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#F2F2F3] text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#174A3A] uppercase font-semibold">
                  Claims Supported
                </span>
                <p className="text-[#17191C] leading-snug">
                  Rigid static routines are a primary driver of subscription churn.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#777B86] uppercase font-semibold">
                  Claims Contradicted
                </span>
                <p className="text-[#626862] leading-snug">
                  None.
                </p>
              </div>
            </div>
          </div>

          {/* Source 3 */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#FAF0F0] text-[#B54747]">
                  Incident Log
                </span>
                <span className="font-mono text-[11px] text-[#777B86]">Jul 2026</span>
              </div>
              <span className="text-[11px] font-mono text-[#777B86]">
                Used in 2 claims
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-semibold text-[#17191C]">
                Pilot Muscular Strain Incident Reports
              </h2>
              <p className="text-xs text-[#626862] leading-relaxed">
                Analysis of 3 muscle strain incidents where compound movements were recommended after consecutive high-strain sessions without rest warnings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#F2F2F3] text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#174A3A] uppercase font-semibold">
                  Claims Supported
                </span>
                <p className="text-[#17191C] leading-snug">
                  Consecutive high-strain compound lifts increase injury risks for novice lifters.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#B54747] uppercase font-semibold">
                  Claims Contradicted
                </span>
                <p className="text-[#17191C] leading-snug">
                  Claim that standard volume caps provide sufficient safety guardrails.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* CLAIMS VIEW */
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 pb-2">
            {(['ALL', 'FACT', 'INFERENCE', 'ASSUMPTION'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#17191C] text-white font-medium'
                    : 'bg-[#FFFFFF] border border-[#E8E8EA] text-[#777B86] hover:text-[#17191C]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="space-y-3.5">
            {filteredClaims.map((claim) => (
              <div
                key={claim.id}
                onClick={() => onSelectClaim?.(claim)}
                className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] hover:border-[#17191C] transition-all cursor-pointer shadow-2xs group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono ${
                        claim.epistemicStatus === 'FACT'
                          ? 'bg-[#DDEBE4] text-[#174A3A] font-semibold'
                          : claim.epistemicStatus === 'INFERENCE'
                          ? 'bg-[#F2F2F3] text-[#17191C]'
                          : 'bg-[#FDF6ED] text-[#A66B16]'
                      }`}
                    >
                      {claim.epistemicStatus === 'FACT'
                        ? 'SUPPORTED'
                        : claim.epistemicStatus === 'INFERENCE'
                        ? 'INFERRED'
                        : 'UNPROVEN'}
                    </span>
                    {claim.loadBearing === 'LOAD_BEARING' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#FAF0F0] text-[#B54747]">
                        Load-bearing
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-[#777B86]">
                    Used in: AI Workout Recommendations
                  </span>
                </div>

                <h2 className="text-sm sm:text-base font-semibold text-[#17191C] leading-snug group-hover:text-[#174A3A] transition-colors">
                  {claim.text}
                </h2>

                <div className="flex items-center justify-between pt-2 border-t border-[#F2F2F3] text-xs font-mono text-[11px] text-[#777B86]">
                  <span>
                    {claim.origin.kind === 'ARTIFACT'
                      ? '3 evidence sources'
                      : claim.origin.kind === 'MODEL_INFERENCE'
                      ? '1 weak evidence source'
                      : '0 empirical sources (assumption)'}
                  </span>
                  <span className="group-hover:text-[#17191C] inline-flex items-center gap-1 transition-colors">
                    <span>Inspect claim</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
