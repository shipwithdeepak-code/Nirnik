import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  FileText,
  Bookmark,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import type { Claim } from '../../types/claims';
import type { DemoUnknownItem } from '../../data/demoWorkoutDecision';

interface GroundStepProps {
  claims: Claim[];
  unknowns: DemoUnknownItem[];
  onUpdateUnknown: (unknownId: string, updates: Partial<DemoUnknownItem>) => void;
  onOpenClaimDetail: (claim: Claim) => void;
  onContinueToChallenge?: () => void;
  isDemo?: boolean;
}

export const GroundStep: React.FC<GroundStepProps> = ({
  claims,
  unknowns,
  onUpdateUnknown,
  onOpenClaimDetail,
  onContinueToChallenge,
  isDemo = false,
}) => {
  const [expandedSection, setExpandedSection] = useState<'claims' | 'unknowns' | 'evidence' | null>(
    'claims'
  );
  const [selectedFilter, setSelectedFilter] = useState<
    'ALL' | 'FACT' | 'INFERENCE' | 'ASSUMPTION' | 'UNKNOWN'
  >('ALL');

  const factsCount = claims.filter((c) => c.epistemicStatus === 'FACT').length;
  const inferencesCount = claims.filter((c) => c.epistemicStatus === 'INFERENCE').length;
  const assumptionsCount = claims.filter((c) => c.epistemicStatus === 'ASSUMPTION').length;
  const unknownsCount = claims.filter((c) => c.epistemicStatus === 'UNKNOWN').length;

  const filteredClaims =
    selectedFilter === 'ALL'
      ? claims
      : claims.filter((c) => c.epistemicStatus === selectedFilter);

  // Subtle epistemic pill styling (restrained labels, not giant colorful badges)
  const getEpistemicPill = (status: string) => {
    switch (status) {
      case 'FACT':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium tracking-wide bg-[#DDEBE4] text-[#174A3A]">
            FACT
          </span>
        );
      case 'INFERENCE':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium tracking-wide bg-[#F2F3EF] text-[#626862] border border-[#E5E7E2]">
            INFERENCE
          </span>
        );
      case 'ASSUMPTION':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium tracking-wide bg-[#FDF6ED] text-[#A66B16] border border-[#F0DBC0]">
            ASSUMPTION
          </span>
        );
      case 'UNKNOWN':
      default:
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium tracking-wide bg-[#FAF0F0] text-[#B54747] border border-[#F4D0D0]">
            UNKNOWN
          </span>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 space-y-8">
      {/* Step Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171A18]">
          What does this decision depend on?
        </h1>
        <p className="mt-2 text-sm text-[#626862] leading-relaxed">
          Grounding exposes the empirical facts, logical inferences, and unproven assumptions the decision stands on.
        </p>
      </div>

      {/* Compact Summary Cards (3-column summary) */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() =>
            setExpandedSection(expandedSection === 'evidence' ? null : 'evidence')
          }
          className={`p-3.5 rounded-xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
            expandedSection === 'evidence'
              ? 'bg-[#FFFFFF] border-[#174A3A] shadow-xs'
              : 'bg-[#FFFFFF] border-[#E5E7E2] hover:border-[#D6D9D2]'
          }`}
        >
          <div className="flex items-center justify-between text-[#8A908A] mb-1">
            <span className="text-xs font-medium text-[#626862]">Evidence</span>
            <FileText className="w-3.5 h-3.5" />
          </div>
          <div className="text-lg font-semibold text-[#171A18]">12 sources</div>
          <div className="text-[11px] text-[#8A908A] mt-0.5">3 primary audits</div>
        </button>

        <button
          type="button"
          onClick={() =>
            setExpandedSection(expandedSection === 'claims' ? null : 'claims')
          }
          className={`p-3.5 rounded-xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
            expandedSection === 'claims'
              ? 'bg-[#FFFFFF] border-[#174A3A] shadow-xs'
              : 'bg-[#FFFFFF] border-[#E5E7E2] hover:border-[#D6D9D2]'
          }`}
        >
          <div className="flex items-center justify-between text-[#8A908A] mb-1">
            <span className="text-xs font-medium text-[#626862]">Claims</span>
            <Bookmark className="w-3.5 h-3.5" />
          </div>
          <div className="text-lg font-semibold text-[#171A18]">{claims.length || 8} claims</div>
          <div className="text-[11px] text-[#8A908A] mt-0.5">
            {factsCount} facts · {assumptionsCount} assumptions
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setExpandedSection(expandedSection === 'unknowns' ? null : 'unknowns')
          }
          className={`p-3.5 rounded-xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
            expandedSection === 'unknowns'
              ? 'bg-[#FFFFFF] border-[#174A3A] shadow-xs'
              : 'bg-[#FFFFFF] border-[#E5E7E2] hover:border-[#D6D9D2]'
          }`}
        >
          <div className="flex items-center justify-between text-[#8A908A] mb-1">
            <span className="text-xs font-medium text-[#626862]">Unknowns</span>
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <div className="text-lg font-semibold text-[#171A18]">
            {unknowns.length || 3} unresolved
          </div>
          <div className="text-[11px] text-[#A66B16] mt-0.5">Require mitigation</div>
        </button>
      </div>

      {/* Progressive Disclosure: Section Details */}
      {expandedSection === 'claims' && (
        <section className="space-y-4 pt-2">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-[#E5E7E2]">
            <span className="text-xs font-medium text-[#171A18]">
              Claims on the decision
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              {(['ALL', 'FACT', 'INFERENCE', 'ASSUMPTION', 'UNKNOWN'] as const).map(
                (filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A] ${
                      selectedFilter === filter
                        ? 'bg-[#174A3A] text-white'
                        : 'text-[#626862] hover:bg-[#F2F3EF]'
                    }`}
                  >
                    {filter === 'ALL' ? 'All' : filter}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Claims List in Natural Language */}
          <div className="space-y-2">
            {filteredClaims.map((claim) => (
              <div
                key={claim.id}
                onClick={() => onOpenClaimDetail(claim)}
                className="p-3.5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] hover:border-[#D6D9D2] hover:shadow-2xs transition-all cursor-pointer flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    {getEpistemicPill(claim.epistemicStatus)}
                    <span className="text-[11px] font-mono text-[#8A908A] opacity-75">
                      {claim.id}
                    </span>
                  </div>
                  <p className="text-xs text-[#171A18] font-normal leading-relaxed">
                    {claim.text}
                  </p>
                </div>
                <div className="text-[11px] text-[#8A908A] group-hover:text-[#174A3A] flex items-center gap-1 shrink-0 pt-0.5">
                  <span className="hidden sm:inline">Provenance</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {expandedSection === 'unknowns' && (
        <section className="space-y-3 pt-2">
          <div className="text-xs font-medium text-[#171A18] pb-1 border-b border-[#E5E7E2]">
            Unresolved Unknowns & Potential Blocker Items
          </div>
          <div className="space-y-2.5">
            {unknowns.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#A66B16] font-medium">
                    {item.id}
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      item.status === 'RESOLVED'
                        ? 'bg-[#DDEBE4] text-[#174A3A]'
                        : item.status === 'ACCEPTABLE'
                        ? 'bg-[#F2F3EF] text-[#626862]'
                        : 'bg-[#FAF0F0] text-[#B54747]'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#171A18]">{item.question}</p>
                <p className="text-xs text-[#626862] leading-relaxed">
                  <strong className="text-[#171A18]">Why it matters:</strong> {item.whyItMatters}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {expandedSection === 'evidence' && (
        <section className="space-y-3 pt-2">
          <div className="text-xs font-medium text-[#171A18] pb-1 border-b border-[#E5E7E2]">
            Evidence Repository & Source Dossier
          </div>
          <div className="p-4 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-3 text-xs text-[#626862]">
            <p>
              12 primary empirical artifacts verified against the claim spine, including:
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-[#171A18]">
              <li>Cohort engagement benchmark (N=4,820 active athletes)</li>
              <li>LLM hallucination safety log & latency distribution test</li>
              <li>User opt-in consent telemetry from pilot beta</li>
              <li>Customer success ticket backlog on workout confusion</li>
            </ul>
          </div>
        </section>
      )}

      {/* Dominant Next Action */}
      <div className="pt-6 border-t border-[#E5E7E2] flex items-center justify-between">
        <p className="text-xs text-[#8A908A]">
          Step 2 of 5 · Claims and unknowns proceed to Specialist Challenge
        </p>

        {onContinueToChallenge && (
          <button
            type="button"
            onClick={onContinueToChallenge}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#174A3A] hover:bg-[#10372C] shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            <span>Continue to Challenge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
