import React, { useState } from 'react';
import { FileText, Bookmark, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react';
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
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'FACT' | 'INFERENCE' | 'ASSUMPTION' | 'UNKNOWN'>('ALL');

  const claims = demoWorkoutClaims;
  const filteredClaims =
    activeFilter === 'ALL'
      ? claims
      : claims.filter((c) => c.epistemicStatus === activeFilter);

  return (
    <div className="max-w-4xl mx-auto py-10 sm:py-14 px-4 sm:px-6 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171A18]">
          {type === 'evidence' ? 'Evidence Library' : 'Claims Spine Library'}
        </h1>
        <p className="mt-1 text-sm text-[#626862]">
          {type === 'evidence'
            ? 'Empirical sources, holdout telemetry, and research artifacts referenced across decisions.'
            : 'Structured claims cataloged by epistemic status: verified facts, inferences, assumptions, and unknowns.'}
        </p>
      </div>

      {type === 'evidence' ? (
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A908A]">
              Active Evidence Sources
            </h3>
            <div className="divide-y divide-[#E5E7E2] text-xs">
              <div className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-semibold text-[#171A18]">
                    Athlete Beta Cohort Telemetry Log
                  </div>
                  <p className="text-[#626862]">
                    4,820 active athletes tracked over 14 days with dynamic workout plan adjustments.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#174A3A] shrink-0 font-medium">
                  Verified Data
                </span>
              </div>

              <div className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-semibold text-[#171A18]">
                    Inference Latency SLA Report
                  </div>
                  <p className="text-[#626862]">
                    Edge model inference distribution: p50=180ms, p95=340ms across 250,000 synthetic calls.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#287A52] shrink-0 font-medium">
                  Benchmarked
                </span>
              </div>

              <div className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-semibold text-[#171A18]">
                    Customer Support Escalation Audit
                  </div>
                  <p className="text-[#626862]">
                    Analysis of 12 injury and confusion tickets from previous automatic adjustments pilot.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#A66B16] shrink-0 font-medium">
                  Qualitative
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Epistemic Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {(['ALL', 'FACT', 'INFERENCE', 'ASSUMPTION', 'UNKNOWN'] as const).map(
              (f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A] ${
                    activeFilter === f
                      ? 'bg-[#174A3A] text-white'
                      : 'bg-[#FFFFFF] border border-[#E5E7E2] text-[#626862] hover:bg-[#F2F3EF]'
                  }`}
                >
                  {f === 'ALL' ? 'All Claims' : f}
                </button>
              )
            )}
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E7E2] rounded-xl divide-y divide-[#E5E7E2] overflow-hidden">
            {filteredClaims.map((claim) => (
              <div
                key={claim.id}
                onClick={() => onSelectClaim?.(claim)}
                className="p-4 flex items-start justify-between gap-4 text-xs hover:bg-[#F2F3EF]/50 transition-colors cursor-pointer group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded tracking-wide ${
                        claim.epistemicStatus === 'FACT'
                          ? 'bg-[#DDEBE4] text-[#174A3A]'
                          : claim.epistemicStatus === 'ASSUMPTION'
                          ? 'bg-[#FDF6ED] text-[#A66B16]'
                          : claim.epistemicStatus === 'UNKNOWN'
                          ? 'bg-[#FAF0F0] text-[#B54747]'
                          : 'bg-[#F2F3EF] text-[#626862]'
                      }`}
                    >
                      {claim.epistemicStatus}
                    </span>
                    <span className="font-mono text-[11px] text-[#8A908A]">
                      {claim.id}
                    </span>
                  </div>
                  <p className="text-[#171A18] font-normal leading-relaxed">
                    {claim.text}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A908A] group-hover:text-[#174A3A] shrink-0 pt-0.5" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
