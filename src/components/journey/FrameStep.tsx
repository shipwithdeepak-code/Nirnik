import React, { useState } from 'react';
import { HelpCircle, Sparkles, Check, Edit2, FileText, Upload, AlertCircle, ArrowRight } from 'lucide-react';
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
  const [draftQuestion, setDraftQuestion] = useState(decisionQuestion || '');
  const [isEditing, setIsEditing] = useState(!isQuestionConfirmed || !decisionQuestion);
  const [showEvidenceInput, setShowEvidenceInput] = useState(Boolean(rawEvidence));

  const assessment = assessDecisionQuestion(draftQuestion);

  const handleConfirm = () => {
    if (!draftQuestion.trim()) return;
    const band = editDistanceBand(decisionQuestion || '', draftQuestion);
    onConfirmQuestion(draftQuestion, band);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4 sm:py-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            PHASE 01 · FRAME
          </span>
          {isDemo && (
            <span className="text-[11px] font-mono text-stone-500">
              Deterministic Demo Pack
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-50 font-normal">
          What is the consequential decision?
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          A sharp decision question ensures the Jury evaluates specific trade-offs instead of generating a generic critique.
        </p>
      </div>

      {/* Decision Question Focus Card */}
      <section className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="decision-question-input"
            className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300"
          >
            Decision Question
          </label>
          {isQuestionConfirmed && !isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 underline underline-offset-4"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit question</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <div className="relative">
              <textarea
                id="decision-question-input"
                rows={3}
                value={draftQuestion}
                onChange={(e) => setDraftQuestion(e.target.value)}
                placeholder="e.g. Should we launch AI-powered workout recommendations to all users?"
                className="w-full text-base sm:text-lg font-serif italic p-3.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder:text-stone-400 placeholder:italic"
              />
            </div>

            {/* Quality Hint */}
            {!assessment.isDecisionShaped && draftQuestion.trim().length > 0 && (
              <div className="flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {assessment.weakness ||
                    'Make this a direct call with a consequential choice (e.g. "Should we launch X or hold for Y?").'}
                </span>
              </div>
            )}

            {questionRationale && (
              <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                <span className="font-semibold not-italic">Why this question: </span>
                {questionRationale}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!draftQuestion.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white shadow-sm transition-all disabled:opacity-40"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Confirm question</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/50">
              <p className="text-lg font-serif italic text-stone-900 dark:text-stone-100 leading-snug">
                &ldquo;{decisionQuestion}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" />
                Question confirmed for this run
              </span>
              {questionRationale && (
                <span className="truncate max-w-sm">{questionRationale}</span>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Decision Context Section */}
      <section className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
          Core Context
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Product Name / Feature
            </label>
            <input
              type="text"
              value={context.name}
              onChange={(e) => onChangeContext({ name: e.target.value })}
              placeholder="e.g. FitPulse Workout Companion"
              className="w-full text-sm p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Who is affected? (Target User)
            </label>
            <input
              type="text"
              value={context.targetUser}
              onChange={(e) => onChangeContext({ targetUser: e.target.value })}
              placeholder="e.g. 1.2M active gymgoers & runners"
              className="w-full text-sm p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              What outcome matters most? (Primary Goal)
            </label>
            <input
              type="text"
              value={context.primaryGoal}
              onChange={(e) => onChangeContext({ primaryGoal: e.target.value })}
              placeholder="e.g. Boost 30-day active workout adherence from 32% to 48% and reduce churn"
              className="w-full text-sm p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>
      </section>

      {/* Grounding Evidence Intake */}
      <section className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
              Supporting Evidence
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Customer interviews, metrics, telemetry, survey findings, or pilot data.
            </p>
          </div>
          {onLoadDemoEvidence && (
            <button
              type="button"
              onClick={onLoadDemoEvidence}
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
            >
              Load demo evidence
            </button>
          )}
        </div>

        {showEvidenceInput ? (
          <div>
            <textarea
              rows={4}
              value={rawEvidence}
              onChange={(e) => onChangeEvidence(e.target.value)}
              placeholder="Paste research logs, survey percentages, user quotes, or benchmark data..."
              className="w-full text-xs font-mono p-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder:font-sans"
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowEvidenceInput(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              <span>Paste research/evidence text</span>
            </button>

            {onLoadDemoEvidence && (
              <button
                type="button"
                onClick={() => {
                  onLoadDemoEvidence();
                  setShowEvidenceInput(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Use Workout Recommendations Evidence Pack</span>
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
