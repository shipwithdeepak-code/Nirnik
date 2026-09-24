import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  Share2,
  FileText,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Bookmark,
  Check,
  Layers,
  ArrowRight,
} from 'lucide-react';
import type { Decision } from '../../types/decision';
import type { Claim } from '../../types/claims';
import type { DemoSpecialistDetail } from '../../data/demoWorkoutDecision';

interface RecordStepProps {
  decision: Decision | null;
  decisionQuestion: string;
  finalChoice: string;
  finalRationale: string;
  claims: Claim[];
  specialists: DemoSpecialistDetail[];
  onStartNewDecision: () => void;
  onOpenDecisionsList: () => void;
  isDemo?: boolean;
}

export const RecordStep: React.FC<RecordStepProps> = ({
  decision,
  decisionQuestion,
  finalChoice,
  finalRationale,
  claims,
  specialists,
  onStartNewDecision,
  onOpenDecisionsList,
  isDemo = false,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'evidence' | 'jury' | 'provenance'>('summary');
  const [copied, setCopied] = useState(false);

  const choiceTitle =
    finalChoice === 'CONDITIONAL'
      ? 'Launch with conditions'
      : finalChoice === 'FULL'
      ? 'Launch'
      : finalChoice === 'PAUSE'
      ? 'Do not launch yet'
      : 'Reject';

  const handleExportMarkdown = () => {
    const md = `# DECISION RECORD
**${decisionQuestion}**

## DECISION
${choiceTitle}

## CONFIDENCE
Moderate (Upper bound set by empirical 8-week pilot)

## WHY
${finalRationale}

- 2 reasons supported the decision (adherence lift & churn driver reduction).
- 1 major concern addressed via novice guardrails.
- 3 assumptions challenged during jury deliberation.

## WHAT CHANGED
Full global rollout → Controlled 20% opt-in pilot cohort with mandatory novice guardrails.

## KEY UNKNOWN
Longitudinal 90-day retention decay past novelty effect.

## NEXT EVIDENCE (OPEN LOOP)
Track 60-day cohort retention and muscle strain incidents from the 20% phased pilot group.

## WHAT WOULD CHANGE OUR MIND
If 60-day cohort retention drops below 32% or injury reports escalate.

## DECIDED BY
Product Lead (Human Decision Maker)

## RECORDED
${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
Tamper-evident record ID: ${decision?.versions[0]?.id || 'VER-5n7w32b356k5iuvc32f22bvi5i'}
`;
    void navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 sm:py-16 px-4 sm:px-6 space-y-10">
      {/* SECTION 17 — FIRST VIEWPORT: FIVE IMMEDIATE ANSWERS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E8EA]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#777B86]">
              DECISION RECORD · EXECUTIVE SUMMARY
            </span>
            <h1
              className="text-2xl sm:text-3xl font-normal text-[#17191C] leading-snug"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {decisionQuestion}
            </h1>
          </div>

          <div className="self-start sm:self-auto flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                finalChoice === 'CONDITIONAL'
                  ? 'bg-[#DDEBE4] text-[#174A3A]'
                  : finalChoice === 'FULL'
                  ? 'bg-[#F2F2F3] text-[#17191C]'
                  : finalChoice === 'PAUSE'
                  ? 'bg-[#FDF6ED] text-[#A66B16]'
                  : 'bg-[#FAF0F0] text-[#B54747]'
              }`}
            >
              {choiceTitle}
            </span>
          </div>
        </div>

        {/* 5 KEY ANSWERS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1">
            <span className="font-mono text-[10px] uppercase text-[#777B86] block">Confidence</span>
            <span className="font-semibold text-[#17191C] block text-sm">Moderate · 84%</span>
            <span className="text-[11px] text-[#626862] block leading-snug">Bounded by 8-week pilot telemetry</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1">
            <span className="font-mono text-[10px] uppercase text-[#777B86] block">Why Committed</span>
            <span className="font-semibold text-[#174A3A] block text-sm">+16.1% Lift Proven</span>
            <span className="text-[11px] text-[#626862] block leading-snug">Adherence lift justifies controlled rollout</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1">
            <span className="font-mono text-[10px] uppercase text-[#777B86] block">Biggest Concern</span>
            <span className="font-semibold text-[#B54747] block text-sm">Retention Decay</span>
            <span className="text-[11px] text-[#626862] block leading-snug">Novelty wear-off not yet tested past 60d</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1">
            <span className="font-mono text-[10px] uppercase text-[#777B86] block">Next Action</span>
            <span className="font-semibold text-[#17191C] block text-sm">Run 20% Pilot</span>
            <span className="text-[11px] text-[#626862] block leading-snug">Track 60-day cohort retention holdout</span>
          </div>
        </div>

        {/* Primary Executive Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E8E8EA]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportMarkdown}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#17191C] bg-[#FFFFFF] hover:bg-[#F2F2F3] border border-[#E8E8EA] transition-all cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#174A3A]" />
                  <span>Copied Markdown</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Decision Record</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenDecisionsList}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#17191C] bg-[#FFFFFF] hover:bg-[#F2F2F3] border border-[#E8E8EA] transition-all cursor-pointer shadow-2xs"
            >
              <span>Inspect in Stored Decisions →</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onStartNewDecision}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#17191C] hover:bg-[#2D3139] shadow-sm transition-all cursor-pointer"
          >
            <span>+ New decision</span>
          </button>
        </div>
      </div>

      {/* SECTION 16 — PROGRESSIVE DISCLOSURE TABS */}
      <div className="space-y-4">
        {/* Tab Headers */}
        <div className="flex items-center gap-1 border-b border-[#E8E8EA] pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
              activeTab === 'summary'
                ? 'bg-[#17191C] text-white shadow-2xs'
                : 'text-[#777B86] hover:text-[#17191C]'
            }`}
          >
            Decision Record
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('evidence')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
              activeTab === 'evidence'
                ? 'bg-[#17191C] text-white shadow-2xs'
                : 'text-[#777B86] hover:text-[#17191C]'
            }`}
          >
            Evidence & Claims ({claims.length || 8})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('jury')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
              activeTab === 'jury'
                ? 'bg-[#17191C] text-white shadow-2xs'
                : 'text-[#777B86] hover:text-[#17191C]'
            }`}
          >
            Jury Deliberation (4 Jurors)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('provenance')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
              activeTab === 'provenance'
                ? 'bg-[#17191C] text-white shadow-2xs'
                : 'text-[#777B86] hover:text-[#17191C]'
            }`}
          >
            Provenance & Storage
          </button>
        </div>

        {/* TAB 1: DECISION RECORD DETAIL */}
        {activeTab === 'summary' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-6 shadow-2xs text-xs">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#777B86]">Executive Rationale</span>
              <p className="text-sm text-[#17191C] leading-relaxed">
                {finalRationale}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8E8EA]">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#777B86]">What Changed</span>
                <p className="text-[#17191C] leading-relaxed">
                  Full rollout → Controlled 20% opt-in cohort with mandatory novice guardrails.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#777B86]">Key Unknown</span>
                <p className="text-[#17191C] leading-relaxed">
                  Retention impact remains unproven past 60 days.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#777B86]">Next Evidence</span>
                <p className="text-[#17191C] leading-relaxed">
                  Track 60-day cohort retention from the 20% phased pilot group.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#777B86]">What Would Change Our Mind</span>
                <p className="text-[#17191C] leading-relaxed">
                  Retention dropping below 32% or recurring novice muscle strains.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E8EA] flex items-center justify-between text-[11px] font-mono text-[#777B86]">
              <span>Decided by: Product Lead (PM)</span>
              <span>Recorded: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        )}

        {/* TAB 2: EVIDENCE & CLAIMS */}
        {activeTab === 'evidence' && (
          <div className="space-y-3">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-1.5 text-xs shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      claim.epistemicStatus === 'FACT'
                        ? 'bg-[#DDEBE4] text-[#174A3A]'
                        : claim.epistemicStatus === 'INFERENCE'
                        ? 'bg-[#F2F2F3] text-[#17191C]'
                        : 'bg-[#FDF6ED] text-[#A66B16]'
                    }`}
                  >
                    {claim.epistemicStatus}
                  </span>
                  <span className="font-mono text-[10px] text-[#777B86]">
                    Confidence {claim.confidence ?? 80}%
                  </span>
                </div>
                <p className="text-sm font-medium text-[#17191C]">{claim.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: JURY DELIBERATION */}
        {activeTab === 'jury' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {specialists.map((sp) => (
              <div
                key={sp.id}
                className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 text-xs shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-[#777B86]">{sp.title}</span>
                  <span className="font-mono text-[10px] text-[#174A3A]">{sp.confidence}% conf</span>
                </div>
                <h4 className="font-semibold text-sm text-[#17191C]">{sp.stance}</h4>
                <p className="text-[#626862] leading-relaxed">{sp.reasoning}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: PROVENANCE */}
        {activeTab === 'provenance' && (
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-3 text-xs shadow-2xs">
            <span className="font-mono text-[10px] uppercase text-[#777B86] block">Integrity & Storage</span>
            <div className="font-mono text-[11px] space-y-1.5 text-[#17191C] bg-[#FAF9F6] p-4 rounded-2xl border border-[#E8E8EA]">
              <div>Decision ID: {decision?.id || 'DEC-f7kfytfphvwiezkabhvcd3dc4c'}</div>
              <div>Version ID: {decision?.versions[0]?.id || 'VER-5n7w32b356k5iuvc32f22bvi5i'}</div>
              <div>State: {decision?.versions[0]?.outcome.kind || 'COMMITTED'}</div>
              <div>Storage Engine: Local IndexedDB (No telemetry leaks)</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
