import React, { useState } from 'react';
import {
  FileText,
  Bookmark,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle as QuestionIcon,
  ShieldCheck,
  ChevronRight,
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
  const [activeTab, setActiveTab] = useState<'claims' | 'evidence' | 'unknowns'>('claims');
  const [selectedFilter, setSelectedFilter] = useState<
    'ALL' | 'FACT' | 'INFERENCE' | 'ASSUMPTION'
  >('ALL');

  const factsCount = claims.filter((c) => c.epistemicStatus === 'FACT').length;
  const inferencesCount = claims.filter((c) => c.epistemicStatus === 'INFERENCE').length;
  const assumptionsCount = claims.filter((c) => c.epistemicStatus === 'ASSUMPTION').length;
  const openUnknownsCount = unknowns.filter((u) => u.status === 'OPEN').length;

  const filteredClaims =
    selectedFilter === 'ALL'
      ? claims
      : claims.filter((c) => c.epistemicStatus === selectedFilter);

  const getEpistemicBadge = (status: string) => {
    switch (status) {
      case 'FACT':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-[#DDEBE4] text-[#174A3A]">
            Observed Fact
          </span>
        );
      case 'INFERENCE':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-[#F2F2F3] text-[#17191C] border border-[#E8E8EA]">
            Logical Inference
          </span>
        );
      case 'ASSUMPTION':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-[#FDF6ED] text-[#A66B16] border border-[#F0DBC0]">
            Unproven Assumption
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 sm:py-16 px-4 sm:px-6 space-y-12">
      {/* Step Heading */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E8E8EA] text-[10px] font-mono uppercase tracking-widest text-[#777B86]">
          <span>02 GROUND</span>
          <span className="text-[#B0B4BC]">·</span>
          <span>Epistemic Grounding</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-normal tracking-tight text-[#17191C]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Ground the decision
        </h1>
        <p className="text-sm text-[#626862] leading-relaxed max-w-2xl font-light">
          What do we actually know? Grounding separates observed evidence from unverified assumptions and explicit unknowns before challenging the logic.
        </p>
      </div>

      {/* 3 Large Product Artifact Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Evidence Artifact */}
        <button
          type="button"
          onClick={() => setActiveTab('evidence')}
          className={`p-5 rounded-3xl border text-left transition-all cursor-pointer shadow-2xs ${
            activeTab === 'evidence'
              ? 'bg-[#FFFFFF] border-[#17191C] ring-1 ring-[#17191C]'
              : 'bg-[#FFFFFF] border-[#E8E8EA] hover:border-[#D6D9D2]'
          }`}
        >
          <div className="flex items-center justify-between text-[#777B86] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#777B86]">Evidence</span>
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-2xl font-normal text-[#17191C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            3 primary sources
          </div>
          <div className="text-xs text-[#777B86] mt-1">
            2 supporting · 1 contradictory
          </div>
        </button>

        {/* Claims Artifact */}
        <button
          type="button"
          onClick={() => setActiveTab('claims')}
          className={`p-5 rounded-3xl border text-left transition-all cursor-pointer shadow-2xs ${
            activeTab === 'claims'
              ? 'bg-[#FFFFFF] border-[#17191C] ring-1 ring-[#17191C]'
              : 'bg-[#FFFFFF] border-[#E8E8EA] hover:border-[#D6D9D2]'
          }`}
        >
          <div className="flex items-center justify-between text-[#777B86] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#777B86]">Claims</span>
            <Bookmark className="w-4 h-4" />
          </div>
          <div className="text-2xl font-normal text-[#17191C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            {claims.length || 8} material claims
          </div>
          <div className="text-xs text-[#777B86] mt-1">
            {factsCount} facts · {assumptionsCount} assumptions
          </div>
        </button>

        {/* Unknowns Artifact */}
        <button
          type="button"
          onClick={() => setActiveTab('unknowns')}
          className={`p-5 rounded-3xl border text-left transition-all cursor-pointer shadow-2xs ${
            activeTab === 'unknowns'
              ? 'bg-[#FFFFFF] border-[#17191C] ring-1 ring-[#17191C]'
              : 'bg-[#FFFFFF] border-[#E8E8EA] hover:border-[#D6D9D2]'
          }`}
        >
          <div className="flex items-center justify-between text-[#777B86] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#777B86]">Unknowns</span>
            <QuestionIcon className="w-4 h-4 text-[#A66B16]" />
          </div>
          <div className="text-2xl font-normal text-[#17191C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            {unknowns.length || 3} critical unknowns
          </div>
          <div className="text-xs text-[#777B86] mt-1">
            {openUnknownsCount} unmeasured risks
          </div>
        </button>
      </div>

      {/* DETAILED CONTENT SECTIONS ACCORDING TO ACTIVE TAB */}

      {/* SECTION A: CLAIMS VIEW */}
      {activeTab === 'claims' && (
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E8E8EA]">
            <div>
              <h2 className="text-sm font-semibold text-[#17191C]">
                Material Claims
              </h2>
              <p className="text-xs text-[#777B86]">
                Human-readable statements with epistemic status and provenance links.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5">
              {(['ALL', 'FACT', 'INFERENCE', 'ASSUMPTION'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-colors ${
                    selectedFilter === filter
                      ? 'bg-[#17191C] text-white font-medium'
                      : 'bg-[#FFFFFF] border border-[#E8E8EA] text-[#777B86] hover:text-[#17191C]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredClaims.map((claim) => (
              <div
                key={claim.id}
                onClick={() => onOpenClaimDetail(claim)}
                className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] hover:border-[#17191C] transition-all cursor-pointer shadow-2xs group space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getEpistemicBadge(claim.epistemicStatus)}
                    {claim.loadBearing === 'LOAD_BEARING' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-[#FAF0F0] text-[#B54747]">
                        Load-bearing
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#777B86] group-hover:text-[#17191C] inline-flex items-center gap-1 transition-colors">
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <p className="text-sm sm:text-base font-normal text-[#17191C] leading-relaxed">
                  {claim.text}
                </p>

                <div className="flex items-center justify-between text-xs text-[#777B86] pt-2 border-t border-[#F2F2F3] font-mono text-[11px]">
                  <span>
                    {claim.origin.kind === 'ARTIFACT'
                      ? 'Evidence: Telemetry Artifact'
                      : claim.origin.kind === 'MODEL_INFERENCE'
                      ? 'Inferred from pilot baseline'
                      : 'Unverified model assumption'}
                  </span>
                  <span>Confidence: {claim.confidence ?? 80}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION B: EVIDENCE SOURCES VIEW */}
      {activeTab === 'evidence' && (
        <div className="space-y-4 pt-2">
          <div className="pb-2 border-b border-[#E8E8EA]">
            <h2 className="text-sm font-semibold text-[#17191C]">
              Evidence Sources
            </h2>
            <p className="text-xs text-[#777B86]">
              Artifacts collected during pilot telemetry, exit interviews, and latency benchmarking.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#DDEBE4] text-[#174A3A]">
                  Supporting · Empirical
                </span>
                <span className="font-mono text-[#777B86] text-[11px]">5,000 users · 8 weeks</span>
              </div>
              <h3 className="text-sm font-semibold text-[#17191C]">
                Beta Pilot Adherence Telemetry
              </h3>
              <p className="text-xs text-[#626862] leading-relaxed">
                Demonstrated a +16.1% net lift in 30-day active workout completion (48.2% vs 32.1% control, p &lt; 0.001).
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#DDEBE4] text-[#174A3A]">
                  Supporting · Qualitative
                </span>
                <span className="font-mono text-[#777B86] text-[11px]">n=1,420 members</span>
              </div>
              <h3 className="text-sm font-semibold text-[#17191C]">
                Q2 Subscription Exit Survey Logs
              </h3>
              <p className="text-xs text-[#626862] leading-relaxed">
                41% of churned subscribers cite rigid, repetitive, or fatigue-mismatched static routines as their direct cancellation trigger.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#FAF0F0] text-[#B54747]">
                  Contradictory / Risk
                </span>
                <span className="font-mono text-[#777B86] text-[11px]">3 reported incidents</span>
              </div>
              <h3 className="text-sm font-semibold text-[#17191C]">
                Pilot Muscular Strain Incident Reports
              </h3>
              <p className="text-xs text-[#626862] leading-relaxed">
                3 beta participants reported muscular strains when heavy compound barbell movements were recommended after consecutive high-strain training days.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION C: UNKNOWN-FIRST INTERACTION */}
      {activeTab === 'unknowns' && (
        <div className="space-y-4 pt-2">
          <div className="pb-2 border-b border-[#E8E8EA]">
            <h2 className="text-sm font-semibold text-[#17191C]">
              What Don’t We Know?
            </h2>
            <p className="text-xs text-[#626862] leading-relaxed">
              Explicit uncertainty is a first-class citizen in Nirnik. You can investigate an unknown or consciously choose to leave it unknown before committing.
            </p>
          </div>

          <div className="space-y-4">
            {unknowns.map((u, idx) => (
              <div
                key={u.id}
                className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-4 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-[#777B86]">
                    0{idx + 1} UNKNOWN
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      u.status === 'ACCEPTABLE'
                        ? 'bg-[#F2F2F3] text-[#777B86]'
                        : 'bg-[#FDF6ED] text-[#A66B16]'
                    }`}
                  >
                    {u.status === 'ACCEPTABLE' ? 'Left as Unknown' : 'Open Unknown'}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#17191C] leading-snug">
                  {u.question}
                </h3>

                <div className="text-xs space-y-1.5 text-[#626862] bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#E8E8EA]">
                  <div>
                    <span className="font-medium text-[#17191C]">Why it matters: </span>
                    {u.whyItMatters}
                  </div>
                  <div>
                    <span className="font-medium text-[#17191C]">Current data: </span>
                    {u.currentEvidence}
                  </div>
                </div>

                {/* Real PM Interaction: Investigate or Leave Unknown */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateUnknown(u.id, {
                        status: u.status === 'ACCEPTABLE' ? 'OPEN' : 'ACCEPTABLE',
                        resolutionNote:
                          u.status === 'ACCEPTABLE'
                            ? undefined
                            : 'Acknowledged by PM: Bound risk via 20% opt-in rollout rather than blocking the launch.',
                      })
                    }
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                      u.status === 'ACCEPTABLE'
                        ? 'bg-[#FAF9F6] text-[#777B86] border border-[#E8E8EA]'
                        : 'bg-[#FFFFFF] border border-[#E8E8EA] text-[#17191C] hover:bg-[#F2F2F3]'
                    }`}
                  >
                    {u.status === 'ACCEPTABLE' ? 'Reopen Unknown' : 'Leave Unknown'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onUpdateUnknown(u.id, {
                        status: 'RESOLVED',
                        resolutionNote: 'Investigated and resolved through holdout guardrails.',
                      })
                    }
                    className="px-4 py-2 rounded-full text-xs font-medium text-white bg-[#17191C] hover:bg-[#2D3139] shadow-2xs transition-all"
                  >
                    Investigate & Mitigate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 10 — SUFFICIENCY GATE */}
      <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#777B86]">
              Sufficiency Gate
            </span>
            <h3 className="text-base font-semibold text-[#17191C]">
              Is there enough evidence to challenge this decision?
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDEBE4] text-[#174A3A] text-xs font-mono font-medium self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enough to challenge · Not enough to conclude</span>
          </div>
        </div>

        <p className="text-xs text-[#626862] leading-relaxed">
          You have enough empirical telemetry to stress-test the proposal against specialist challenge, but not enough longitudinal data to establish causality past 60 days.
        </p>

        {/* Known / Unknown / Limitation Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#174A3A] font-semibold block">Known</span>
            <span className="text-[#17191C] block leading-snug">
              +16.1% workout completion lift in 5,000 active beta cohort.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#A66B16] font-semibold block">Unknown</span>
            <span className="text-[#17191C] block leading-snug">
              Long-term 90-day retention curve after initial novelty effect fades.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#5D2A1A] font-semibold block">Limitation</span>
            <span className="text-[#17191C] block leading-snug">
              Beta pilot over-indexed on daily motivated gymgoers without injury histories.
            </span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onContinueToChallenge}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-semibold text-white bg-[#17191C] hover:bg-[#2D3139] shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] cursor-pointer"
          >
            <span>Challenge the decision →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
