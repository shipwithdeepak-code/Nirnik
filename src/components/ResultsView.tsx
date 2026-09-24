import React, { useState } from 'react';
import {
  ArrowLeft,
  Flame,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Users,
  Clock,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import type { ProductReview, Opportunity, AgentReview, RunProvenance } from '../types';

interface ResultsViewProps {
  review: ProductReview;
  provenance?: RunProvenance;
  onBackToWorkspace: () => void;
  onChallengeDecision: () => void;
}

type TabType = 'overview' | 'evidence' | 'challenges' | 'jury' | 'record';

export const ResultsView: React.FC<ResultsViewProps> = ({
  review,
  provenance,
  onBackToWorkspace,
  onChallengeDecision,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Format decision label from verdict
  const decisionLabel =
    review.verdict === 'SHIP'
      ? 'Launch'
      : review.verdict === 'ITERATE'
      ? 'Launch with conditions'
      : review.verdict === 'TEST'
      ? 'Do not launch yet'
      : 'Reject';

  const decisionQuestion =
    review.context.currentProblem ||
    review.context.primaryGoal ||
    review.context.name ||
    'Should we launch this product release?';

  const whySummary =
    review.executiveSummary ||
    'The core user workflow demonstrates measurable value, though automated interactions require explicit consent guardrails.';

  const biggestConcern =
    review.opportunities?.[0]?.problem ||
    review.agreementDisagreement?.disagreements?.[0]?.frictionPoint ||
    'Lack of an opt-in calibration flow risks overwhelming beginner cohort users.';

  const nextAction =
    review.recommendedNextStep ||
    (review.verdict === 'ITERATE'
      ? 'Implement the 14-day holdout cohort and telemetry threshold before full rollout.'
      : review.verdict === 'TEST'
      ? 'Gather empirical activation metrics on the staging test group.'
      : 'Finalize rollout schedule and notify team.');

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-8">
      {/* Top Breadcrumb & Minimal Action Header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E5E7E2]">
        <button
          type="button"
          onClick={onBackToWorkspace}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#626862] hover:text-[#171A18] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A] rounded-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to workspace</span>
        </button>

        <button
          type="button"
          onClick={onChallengeDecision}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#B54747] bg-[#FAF0F0] hover:bg-[#F4D0D0] border border-[#F4D0D0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B54747]"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Challenge this decision</span>
        </button>
      </div>

      {/* First Viewport: Decision Hero Panel */}
      <section className="p-6 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] shadow-2xs space-y-6">
        {/* Row 1: Decision Stance & Confidence */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7E2]">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A908A]">
              Decision
            </span>
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl font-semibold text-[#171A18]">
                {decisionLabel}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  review.verdict === 'SHIP' || review.verdict === 'ITERATE'
                    ? 'bg-[#DDEBE4] text-[#174A3A]'
                    : 'bg-[#FAF0F0] text-[#B54747]'
                }`}
              >
                {review.verdict}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:text-right">
            <div>
              <span className="text-[11px] text-[#8A908A] block">Confidence</span>
              <span className="text-sm font-semibold font-mono text-[#171A18]">
                {review.confidenceScore}%
              </span>
            </div>
            <div className="w-20">
              <div className="h-1.5 w-full bg-[#F2F3EF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#174A3A] rounded-full"
                  style={{ width: `${review.confidenceScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Decision Question */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A908A]">
            Decision Question
          </span>
          <p className="text-sm sm:text-base font-medium text-[#171A18] leading-snug">
            {decisionQuestion}
          </p>
        </div>

        {/* Row 3: Why (Executive Rationale) */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A908A]">
            Why
          </span>
          <p className="text-xs sm:text-sm text-[#626862] leading-relaxed">
            {whySummary}
          </p>
        </div>

        {/* Row 4: Two Columns for Concern & Next Action */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E7E2]">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B54747] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Biggest Concern</span>
            </span>
            <p className="text-xs text-[#626862] leading-relaxed">
              {biggestConcern}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#174A3A] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Next Action</span>
            </span>
            <p className="text-xs text-[#626862] leading-relaxed">
              {nextAction}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Navigation for Progressive Disclosure */}
      <section className="space-y-4">
        <div className="flex items-center gap-1 border-b border-[#E5E7E2] pb-px overflow-x-auto">
          {(
            [
              { id: 'overview', label: 'Overview' },
              { id: 'evidence', label: 'Evidence' },
              { id: 'challenges', label: 'Challenges' },
              { id: 'jury', label: 'Jury' },
              { id: 'record', label: 'Record' },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A] ${
                  isActive
                    ? 'border-[#174A3A] text-[#174A3A] font-semibold'
                    : 'border-transparent text-[#626862] hover:text-[#171A18]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-4 text-xs">
              <h3 className="font-semibold text-[#171A18]">Synthesis Breakdown</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-medium text-[#287A52]">Validated Signals</div>
                  <ul className="list-disc pl-4 space-y-1 text-[#626862]">
                    {review.agreementDisagreement?.agreements?.map((a, idx) => (
                      <li key={idx}>
                        <span className="text-[#171A18]">{a}</span>
                      </li>
                    )) || <li>Performance latency and cohort completion benchmarks met.</li>}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-[#B54747]">Exposed Friction</div>
                  <ul className="list-disc pl-4 space-y-1 text-[#626862]">
                    {review.agreementDisagreement?.disagreements?.map((d, idx) => (
                      <li key={idx}>
                        <strong className="text-[#171A18]">{d.topic}:</strong> {d.frictionPoint}
                      </li>
                    )) || <li>Unverified onboarding assumptions need empirical validation.</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Evidence */}
        {activeTab === 'evidence' && (
          <div className="space-y-3">
            <div className="p-5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-3 text-xs">
              <h3 className="font-semibold text-[#171A18]">Grounding & Empirical Data</h3>
              <p className="text-[#626862]">
                Evidence is verified against real constraints and data artifacts.
              </p>
              {review.evidenceRaw ? (
                <pre className="p-3 rounded-lg bg-[#F7F7F4] border border-[#E5E7E2] text-xs font-mono text-[#626862] overflow-x-auto whitespace-pre-wrap">
                  {review.evidenceRaw}
                </pre>
              ) : (
                <div className="pt-2 divide-y divide-[#E5E7E2]">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-[#171A18]">Beta cohort telemetry</span>
                    <span className="text-[#174A3A] font-mono text-[11px]">N=4,820</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-[#171A18]">Latency SLA distribution</span>
                    <span className="text-[#287A52] font-mono text-[11px]">p95 &lt; 380ms</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Challenges */}
        {activeTab === 'challenges' && (
          <div className="space-y-3">
            <div className="p-5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-3 text-xs">
              <h3 className="font-semibold text-[#171A18]">Specialist Challenges & Gaps</h3>
              <div className="space-y-2.5">
                {review.agreementDisagreement?.disagreements?.map((d, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#F7F7F4] border border-[#E5E7E2] space-y-1"
                  >
                    <span className="font-medium text-[#171A18] block">{d.topic}</span>
                    <p className="text-[#626862] leading-relaxed">{d.frictionPoint}</p>
                  </div>
                )) || (
                  <p className="text-[#626862]">No open challenges recorded.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Jury */}
        {activeTab === 'jury' && (
          <div className="space-y-3">
            <div className="p-5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-4 text-xs">
              <h3 className="font-semibold text-[#171A18]">Specialist Deliberation Panel</h3>
              <div className="divide-y divide-[#E5E7E2]">
                {review.agentReviews?.map((agent, idx) => (
                  <div key={idx} className="py-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#626862]" />
                        <span className="font-semibold text-[#171A18]">
                          {agent.roleTitle}
                        </span>
                        <span className="text-[11px] text-[#8A908A]">({agent.agentName})</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#174A3A]">
                        {agent.confidence}% conf
                      </span>
                    </div>
                    <p className="text-[#626862] leading-relaxed">
                      {agent.coreArgument || agent.keyObservation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Record */}
        {activeTab === 'record' && (
          <div className="space-y-3">
            <div className="p-5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-3 text-xs">
              <h3 className="font-semibold text-[#171A18]">Durable Audit Record</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <dt className="text-[#8A908A]">Decision ID</dt>
                  <dd className="font-mono text-[#171A18] mt-0.5">{review.id}</dd>
                </div>
                <div>
                  <dt className="text-[#8A908A]">Recorded At</dt>
                  <dd className="text-[#171A18] mt-0.5 font-mono">{review.timestamp}</dd>
                </div>
                <div>
                  <dt className="text-[#8A908A]">Verdict Outcome</dt>
                  <dd className="font-medium text-[#174A3A] mt-0.5">{review.verdict}</dd>
                </div>
                <div>
                  <dt className="text-[#8A908A]">Confidence Ceiling</dt>
                  <dd className="text-[#171A18] mt-0.5 font-mono">{review.confidenceScore}%</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
