import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';
import type { ProductContext } from '../../types';
import type { EditDistanceBand } from '../../integrity/decisionQuestion';
import { assessDecisionQuestion, editDistanceBand } from '../../integrity/decisionQuestion';

interface FrameStepProps {
  context: ProductContext;
  rawEvidence: string;
  decisionQuestion: string | null;
  questionRationale?: string;
  isQuestionConfirmed: boolean;
  onChangeContext: (updates: Partial<ProductContext>) => void;
  onChangeEvidence: (evidence: string) => void;
  onConfirmQuestion: (question: string, band: EditDistanceBand) => void;
  onLoadDemoEvidence?: () => void;
  isDemo?: boolean;
}

export const FrameStep: React.FC<FrameStepProps> = ({
  context,
  rawEvidence,
  decisionQuestion,
  questionRationale,
  isQuestionConfirmed,
  onChangeContext,
  onChangeEvidence,
  onConfirmQuestion,
  onLoadDemoEvidence,
  isDemo = false,
}) => {
  const [draftQuestion, setDraftQuestion] = useState(
    decisionQuestion || 'Should we launch AI-powered workout recommendations to all users?'
  );
  const [showAdvancedContext, setShowAdvancedContext] = useState(false);

  const assessment = assessDecisionQuestion(draftQuestion);

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!draftQuestion.trim()) return;
    const band = editDistanceBand(decisionQuestion || '', draftQuestion);
    onConfirmQuestion(draftQuestion.trim(), band);
  };

  const handleUsePreset = (preset: string) => {
    setDraftQuestion(preset);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 sm:py-16 px-4">
      {/* Clean Single-Purpose Layout */}
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171A18]">
            What decision are you making?
          </h1>
          <p className="mt-2 text-sm text-[#626862] leading-relaxed">
            State the consequential product choice clearly. You can add evidence and context next.
          </p>
        </div>

        {/* Primary Large Input Form */}
        <form onSubmit={handleContinue} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <textarea
                id="decision-question-input"
                rows={3}
                value={draftQuestion}
                onChange={(e) => setDraftQuestion(e.target.value)}
                placeholder="e.g. Should we launch AI-powered workout recommendations to all users?"
                className="w-full text-base sm:text-lg font-normal p-4 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] text-[#171A18] placeholder:text-[#8A908A] focus:outline-none focus:ring-2 focus:ring-[#174A3A]/20 focus:border-[#174A3A] transition-all shadow-xs leading-relaxed resize-none"
                autoFocus
              />
            </div>

            {/* Quick demo preset suggestions */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[#8A908A]">Try an example:</span>
              <button
                type="button"
                onClick={() =>
                  handleUsePreset(
                    'Should we launch AI-powered workout recommendations to all users?'
                  )
                }
                className="text-[#174A3A] hover:underline font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A] rounded-xs"
              >
                AI workout rollout
              </button>
              <span className="text-[#D6D9D2]">·</span>
              <button
                type="button"
                onClick={() =>
                  handleUsePreset(
                    'Should we deprecate the legacy CSV export in favor of the new Webhook API?'
                  )
                }
                className="text-[#174A3A] hover:underline font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A] rounded-xs"
              >
                CSV export sunset
              </button>
            </div>
          </div>

          {/* Progressive Disclosure: Optional Context & Scope */}
          <div className="border-t border-[#E5E7E2] pt-4">
            <button
              type="button"
              onClick={() => setShowAdvancedContext(!showAdvancedContext)}
              className="flex items-center gap-1.5 text-xs font-medium text-[#626862] hover:text-[#171A18] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A] rounded-xs"
            >
              <span>Add context and constraints (optional)</span>
              {showAdvancedContext ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showAdvancedContext && (
              <div className="mt-4 p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E7E2] space-y-4">
                <div>
                  <label
                    htmlFor="target-cohort"
                    className="block text-xs font-medium text-[#171A18] mb-1"
                  >
                    Target cohort or user segment
                  </label>
                  <input
                    id="target-cohort"
                    type="text"
                    value={context.targetUser || ''}
                    onChange={(e) => onChangeContext({ targetUser: e.target.value })}
                    placeholder="e.g. Free-tier users with >3 workouts logged this month"
                    className="w-full text-xs p-2.5 rounded-lg border border-[#E5E7E2] bg-[#F7F7F4] text-[#171A18] placeholder:text-[#8A908A] focus:outline-none focus:ring-1 focus:ring-[#174A3A] focus:border-[#174A3A]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="primary-metric"
                    className="block text-xs font-medium text-[#171A18] mb-1"
                  >
                    Primary success condition or guardrail
                  </label>
                  <input
                    id="primary-metric"
                    type="text"
                    value={context.primaryGoal || ''}
                    onChange={(e) => onChangeContext({ primaryGoal: e.target.value })}
                    placeholder="e.g. 15% increase in 14-day retention with zero increase in support tickets"
                    className="w-full text-xs p-2.5 rounded-lg border border-[#E5E7E2] bg-[#F7F7F4] text-[#171A18] placeholder:text-[#8A908A] focus:outline-none focus:ring-1 focus:ring-[#174A3A] focus:border-[#174A3A]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Dominant Primary Action */}
          <div className="pt-2 flex items-center justify-between">
            <p className="text-xs text-[#8A908A]">
              Step 1 of 5 · Evidence and claims are inspected next
            </p>

            <button
              type="submit"
              disabled={!draftQuestion.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#174A3A] hover:bg-[#10372C] disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
