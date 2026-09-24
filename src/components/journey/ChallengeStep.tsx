import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Check,
} from 'lucide-react';
import type {
  DemoSpecialistDetail,
  DemoDisagreementItem,
} from '../../data/demoWorkoutDecision';

interface ChallengeStepProps {
  specialists: DemoSpecialistDetail[];
  disagreement: DemoDisagreementItem | null;
  pmSelectedResponseId: string;
  pmResponseText: string;
  onSelectPMResponse: (responseId: string, text: string) => void;
  onOpenSpecialistDetail: (sp: DemoSpecialistDetail) => void;
  onContinueToDecide?: () => void;
  isDemo?: boolean;
}

type ResponseMode = 'ACCEPT' | 'ADD_EVIDENCE' | 'MODIFY' | 'KEEP';

interface ChallengeItem {
  id: string;
  source: string;
  concern: string;
  currentAction: ResponseMode;
}

export const ChallengeStep: React.FC<ChallengeStepProps> = ({
  specialists,
  disagreement,
  pmSelectedResponseId,
  pmResponseText,
  onSelectPMResponse,
  onOpenSpecialistDetail,
  onContinueToDecide,
  isDemo = false,
}) => {
  // 3 Concrete Challenges raised by specialists
  const [challenges, setChallenges] = useState<ChallengeItem[]>([
    {
      id: 'c1',
      source: 'UX Researcher',
      concern: 'Novice athletes become overwhelmed by algorithmic workout adjustments without human coaching context.',
      currentAction: 'MODIFY',
    },
    {
      id: 'c2',
      source: 'Evidence Auditor',
      concern: 'No verified empirical baseline exists for free-tier 14-day completion rates with automated prompts.',
      currentAction: 'ACCEPT',
    },
    {
      id: 'c3',
      source: 'Red Team',
      concern: 'Risk of repetitive strain injury recommendations when user injury logs are out-of-date or incomplete.',
      currentAction: 'MODIFY',
    },
  ]);

  const handleUpdateChallengeAction = (id: string, action: ResponseMode) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, currentAction: action } : c))
    );
    const summary = `PM Actions: ${challenges
      .map((c) => (c.id === id ? `${c.source} -> ${action}` : `${c.source} -> ${c.currentAction}`))
      .join('; ')}`;
    onSelectPMResponse(action, summary);
  };

  const getStanceBadge = (stance: string) => {
    switch (stance) {
      case 'SUPPORT':
      case 'Supports with conditions':
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#DDEBE4] text-[#174A3A]">
            Supports with conditions
          </span>
        );
      case 'CHALLENGE':
      case 'Challenges':
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FAF0F0] text-[#B54747]">
            Challenges
          </span>
        );
      case 'INSUFFICIENT':
      case 'Insufficient evidence':
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FDF6ED] text-[#A66B16]">
            Insufficient evidence
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F2F3EF] text-[#626862]">
            {stance}
          </span>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 space-y-10">
      {/* Heading & Summary Bar */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171A18]">
          The decision has been challenged.
        </h1>
        <div className="mt-2.5 flex items-center gap-3 text-xs text-[#626862]">
          <span className="font-medium text-[#171A18]">4 perspectives</span>
          <span className="text-[#D6D9D2]">·</span>
          <span className="font-medium text-[#B54747]">3 disagreements</span>
          <span className="text-[#D6D9D2]">·</span>
          <span className="font-medium text-[#A66B16]">2 unresolved assumptions</span>
        </div>
      </div>

      {/* Specialist Table / List (clean list/table rather than four huge cards) */}
      <section className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#8A908A] px-1">
          Specialist Panel
        </div>
        <div className="border border-[#E5E7E2] rounded-xl bg-[#FFFFFF] divide-y divide-[#E5E7E2] overflow-hidden">
          {specialists.map((sp) => (
            <div
              key={sp.id}
              onClick={() => onOpenSpecialistDetail(sp)}
              className="px-4 py-3.5 flex items-center justify-between gap-4 hover:bg-[#F2F3EF]/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-medium text-[#171A18] truncate group-hover:text-[#174A3A]">
                  {sp.title}
                </span>
                <span className="hidden sm:inline text-xs text-[#8A908A] truncate max-w-xs">
                  {sp.keyConcern}
                </span>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {getStanceBadge(sp.stance)}
                <ChevronRight className="w-4 h-4 text-[#8A908A] group-hover:text-[#174A3A]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* First-Class Disagreement Section */}
      <section className="p-5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#E5E7E2] pb-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B54747]">
            First-Class Disagreement
          </div>
          <span className="text-[11px] text-[#8A908A]">Core Assumption Conflict</span>
        </div>

        <p className="text-xs font-medium text-[#171A18]">
          The jury disagrees about one critical assumption:
          <span className="block mt-0.5 text-xs text-[#626862] italic">
            &ldquo;Users will trust automated AI workouts without an opt-in calibration period.&rdquo;
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#DDEBE4]/40 border border-[#DDEBE4]">
            <div className="font-semibold text-[#174A3A] mb-1">SUPPORTING</div>
            <p className="text-[#171A18] leading-relaxed">
              Product Strategist notes pilot beta users who saw immediate dynamic plans logged 1.4x more sessions in week 1.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF0F0] border border-[#F4D0D0]">
            <div className="font-semibold text-[#B54747] mb-1">CHALLENGING</div>
            <p className="text-[#171A18] leading-relaxed">
              UX Researcher and Red Team find churn accelerates 2.1x among users who feel the AI does not understand their limits.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E5E7E2] text-xs">
          <span className="font-semibold text-[#171A18]">What would change our minds?</span>
          <p className="text-[#626862] mt-0.5 leading-relaxed">
            Running a 14-day holdout where users must verify their experience level before receiving non-standard routines.
          </p>
        </div>
      </section>

      {/* PM Response Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-[#171A18]">
            The jury raised 3 challenges. How do you respond?
          </h2>
          <p className="text-xs text-[#626862] mt-0.5">
            The AI does not decide. As the product manager, specify your defense for each challenge.
          </p>
        </div>

        <div className="space-y-3">
          {challenges.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#174A3A] uppercase tracking-wide">
                    {c.source}
                  </span>
                  <p className="text-xs text-[#171A18] leading-relaxed">{c.concern}</p>
                </div>
              </div>

              {/* 4 Stance buttons: Accept concern / Add evidence / Modify decision / Keep decision */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                {(
                  [
                    { key: 'ACCEPT', label: 'Accept concern' },
                    { key: 'ADD_EVIDENCE', label: 'Add evidence' },
                    { key: 'MODIFY', label: 'Modify decision' },
                    { key: 'KEEP', label: 'Keep decision' },
                  ] as const
                ).map((opt) => {
                  const isSelected = c.currentAction === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleUpdateChallengeAction(c.id, opt.key)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
                        isSelected
                          ? 'bg-[#174A3A] text-white shadow-xs'
                          : 'bg-[#F2F3EF] text-[#626862] hover:bg-[#E5E7E2] hover:text-[#171A18]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dominant Next Action */}
      <div className="pt-6 border-t border-[#E5E7E2] flex items-center justify-between">
        <p className="text-xs text-[#8A908A]">
          Step 3 of 5 · PM defense feeds directly into final synthesis
        </p>

        {onContinueToDecide && (
          <button
            type="button"
            onClick={onContinueToDecide}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#174A3A] hover:bg-[#10372C] shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            <span>Continue to synthesis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
