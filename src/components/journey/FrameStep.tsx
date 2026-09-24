import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
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

const DECISION_TYPES = [
  'Product launch',
  'Pricing change',
  'Market entry',
  'Product sunset',
  'Platform migration',
  'Major product bet',
];

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
  const [selectedType, setSelectedType] = useState('Product launch');
  const [showAdvancedContext, setShowAdvancedContext] = useState(false);

  const assessment = assessDecisionQuestion(draftQuestion);

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!draftQuestion.trim()) return;
    const band = editDistanceBand(decisionQuestion || '', draftQuestion);
    onConfirmQuestion(draftQuestion.trim(), band);
  };

  const handleUsePreset = (preset: string, type: string) => {
    setDraftQuestion(preset);
    setSelectedType(type);
  };

  // Derive title from question
  const getDerivedTitle = () => {
    if (draftQuestion.toLowerCase().includes('workout')) {
      return 'AI-Powered Workout Recommendations';
    }
    if (draftQuestion.toLowerCase().includes('csv')) {
      return 'Deprecate Legacy CSV Export';
    }
    const clean = draftQuestion.replace(/^should we\s+/i, '').replace(/\?$/, '');
    return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : 'Product Decision';
  };

  return (
    <div className="max-w-6xl mx-auto py-10 sm:py-16 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT / PRIMARY COLUMN (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E8E8EA] text-[10px] font-mono uppercase tracking-widest text-[#777B86] mb-3">
              <span>01 FRAME</span>
              <span className="text-[#B0B4BC]">·</span>
              <span>Define the decision</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-normal tracking-tight text-[#17191C] leading-tight"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              What decision are you making?
            </h1>
            <p className="mt-2 text-sm text-[#626862] leading-relaxed font-light">
              State the consequential product choice clearly. Nirnik will stress-test what this choice depends on.
            </p>
          </div>

          {/* Primary Large Input Form */}
          <form onSubmit={handleContinue} className="space-y-6">
            <div className="space-y-2.5">
              <label htmlFor="decision-question-input" className="block text-xs font-mono uppercase tracking-wider text-[#777B86]">
                Decision Question
              </label>
              <div className="relative">
                <textarea
                  id="decision-question-input"
                  rows={3}
                  value={draftQuestion}
                  onChange={(e) => setDraftQuestion(e.target.value)}
                  placeholder="e.g. Should we launch AI-powered workout recommendations to all users?"
                  className="w-full text-base sm:text-lg font-normal p-4 rounded-2xl border border-[#E8E8EA] bg-[#FFFFFF] text-[#17191C] placeholder:text-[#8A908A] focus:outline-none focus:ring-2 focus:ring-[#17191C]/15 focus:border-[#17191C] transition-all shadow-2xs leading-relaxed resize-none"
                  autoFocus
                />
              </div>

              {/* Quick demo presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-[#777B86] font-mono text-[11px]">Presets:</span>
                <button
                  type="button"
                  onClick={() =>
                    handleUsePreset(
                      'Should we launch AI-powered workout recommendations to all users?',
                      'Product launch'
                    )
                  }
                  className="px-2.5 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E8EA] text-[#17191C] hover:bg-[#F2F2F3] text-[11px] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#17191C]"
                >
                  AI workout rollout
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUsePreset(
                      'Should we deprecate legacy CSV export in favor of Webhook API?',
                      'Product sunset'
                    )
                  }
                  className="px-2.5 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E8EA] text-[#17191C] hover:bg-[#F2F2F3] text-[11px] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#17191C]"
                >
                  CSV export sunset
                </button>
              </div>
            </div>

            {/* Decision Type Pill Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#777B86]">
                Decision Type
              </label>
              <div className="flex flex-wrap gap-2">
                {DECISION_TYPES.map((type) => {
                  const isSelected = selectedType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        isSelected
                          ? 'bg-[#17191C] text-white font-medium shadow-2xs'
                          : 'bg-[#FFFFFF] border border-[#E8E8EA] text-[#626862] hover:text-[#17191C] hover:bg-[#F2F2F3]'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Collapsible Lightweight Scope & Context */}
            <div className="border-t border-[#E8E8EA] pt-4 space-y-4">
              <button
                type="button"
                onClick={() => setShowAdvancedContext(!showAdvancedContext)}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#626862] hover:text-[#17191C] transition-colors"
              >
                <span>Scope, Audience & Evidence (Optional)</span>
                {showAdvancedContext ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {showAdvancedContext && (
                <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-3.5 text-xs animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <label className="block font-medium text-[#17191C]">Target Audience</label>
                    <input
                      type="text"
                      value={context.targetUser || ''}
                      onChange={(e) => onChangeContext({ targetUser: e.target.value })}
                      placeholder="e.g. 1.2M active subscribers, casual fitness users"
                      className="w-full p-2.5 rounded-xl border border-[#E8E8EA] bg-[#FAF9F6] text-[#17191C] focus:outline-none focus:border-[#17191C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-medium text-[#17191C]">Primary Goal / Metric</label>
                    <input
                      type="text"
                      value={context.primaryGoal || ''}
                      onChange={(e) => onChangeContext({ primaryGoal: e.target.value })}
                      placeholder="e.g. Increase 30-day workout completion from 32% to 48%"
                      className="w-full p-2.5 rounded-xl border border-[#E8E8EA] bg-[#FAF9F6] text-[#17191C] focus:outline-none focus:border-[#17191C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-medium text-[#17191C]">Evidence & Telemetry Notes</label>
                    <textarea
                      rows={3}
                      value={rawEvidence || ''}
                      onChange={(e) => onChangeEvidence(e.target.value)}
                      placeholder="Paste pilot numbers, user feedback quotes, latency benchmarks, or risk findings..."
                      className="w-full p-2.5 rounded-xl border border-[#E8E8EA] bg-[#FAF9F6] text-[#17191C] focus:outline-none focus:border-[#17191C] resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Dominant Primary Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!draftQuestion.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold text-white bg-[#17191C] hover:bg-[#2D3139] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] cursor-pointer"
              >
                <span>Continue to Ground →</span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: LIVE DECISION SNAPSHOT (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20">
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8EA]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#174A3A] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#777B86] font-semibold">
                  Live Decision Snapshot
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#174A3A] bg-[#DDEBE4] px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            {/* YOUR DECISION */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#777B86]">
                Your Decision
              </div>
              <h3 className="text-base font-semibold text-[#17191C]">
                {getDerivedTitle()}
              </h3>
            </div>

            {/* QUESTION */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#777B86]">
                Question
              </div>
              <p
                className="text-sm font-normal text-[#17191C] leading-snug italic"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                “{draftQuestion || 'No question defined yet'}”
              </p>
            </div>

            {/* THE DECISION DEPENDS ON */}
            <div className="space-y-2 pt-2 border-t border-[#E8E8EA]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#777B86]">
                The decision depends on
              </div>
              <ul className="space-y-1.5 text-xs text-[#17191C]">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#174A3A]" />
                  <span>Recommendation quality & accuracy</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#174A3A]" />
                  <span>Sustained 90-day user adoption</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#174A3A]" />
                  <span>Subscription retention impact</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#174A3A]" />
                  <span>Operational & inference cost scaling</span>
                </li>
              </ul>
            </div>

            {/* NIRNIK HAS IDENTIFIED */}
            <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#777B86]">
                Nirnik has identified
              </div>
              <div className="text-xs font-mono font-medium text-[#17191C]">
                <span className="text-[#174A3A]">4 claims</span> ·{' '}
                <span className="text-[#A66B16]">3 assumptions</span> ·{' '}
                <span className="text-[#5D2A1A]">2 unknowns</span>
              </div>
            </div>

            {/* READY FOR CHALLENGE */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E8E8EA] text-xs">
              <span className="text-[#777B86] font-mono text-[11px]">Ready for challenge:</span>
              <span className="font-semibold text-[#17191C]">4 specialist perspectives</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
