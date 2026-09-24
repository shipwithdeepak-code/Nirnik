import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { demoWorkoutDefaultRationale } from '../../data/demoWorkoutDecision';

interface DecideStepProps {
  finalChoice: string;
  finalRationale: string;
  onSelectFinalChoice: (choice: string) => void;
  onChangeRationale: (rationale: string) => void;
  onContinueToRecord?: () => void;
  isDemo?: boolean;
}

const DECISION_CHOICES = [
  {
    id: 'FULL',
    title: 'Launch',
    badge: 'Full Rollout',
    subtitle: 'Deploy to all users immediately with standard release notes and telemetry monitoring.',
    suggestedRationale: 'Launch globally to capture peak user motivation and validate recommendation quality at scale.',
  },
  {
    id: 'CONDITIONAL',
    title: 'Launch with conditions',
    badge: 'Recommended',
    subtitle: 'Gate rollout behind a controlled 20% opt-in cohort, mandatory novice guardrails, and 90-day holdout.',
    suggestedRationale: demoWorkoutDefaultRationale,
  },
  {
    id: 'PAUSE',
    title: 'Do not launch yet',
    badge: 'Hold',
    subtitle: 'Pause rollout until the 12-week longitudinal study concludes and inference latency is benchmarked.',
    suggestedRationale: 'Hold rollout pending 12-week empirical retention proof and novice muscular strain validation.',
  },
  {
    id: 'REJECT',
    title: 'Reject',
    badge: 'Abandon',
    subtitle: 'Decline proposal due to structural safety liabilities, unit economics, or unviable friction.',
    suggestedRationale: 'Reject recommendation engine due to unmitigated novice liability and negative discovery feedback.',
  },
];

export const DecideStep: React.FC<DecideStepProps> = ({
  finalChoice,
  finalRationale,
  onSelectFinalChoice,
  onChangeRationale,
  onContinueToRecord,
  isDemo = false,
}) => {
  const handleSelectChoice = (choiceId: string, defaultRat: string) => {
    onSelectFinalChoice(choiceId);
    if (!finalRationale || finalRationale === demoWorkoutDefaultRationale) {
      onChangeRationale(defaultRat);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 sm:py-16 px-4 sm:px-6 space-y-12">
      {/* Step Heading */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E8E8EA] text-[10px] font-mono uppercase tracking-widest text-[#777B86]">
          <span>04 DECIDE</span>
          <span className="text-[#B0B4BC]">·</span>
          <span>Human Commitment</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-normal tracking-tight text-[#17191C]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Your decision
        </h1>
        <p className="text-sm text-[#626862] leading-relaxed max-w-2xl font-light">
          Based on the evidence and challenge, what will you do? Nirnik makes the thinking harder, but you make the final call.
        </p>
      </div>

      {/* Four Meaningful Options Grid */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#777B86]">
          Select Decision Outcome
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DECISION_CHOICES.map((choice) => {
            const isSelected = finalChoice === choice.id;

            return (
              <div
                key={choice.id}
                onClick={() => handleSelectChoice(choice.id, choice.suggestedRationale)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer shadow-2xs flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#17191C] ring-2 ring-[#17191C]'
                    : 'bg-[#FFFFFF] border-[#E8E8EA] hover:border-[#D6D9D2]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                        choice.id === 'CONDITIONAL'
                          ? 'bg-[#DDEBE4] text-[#174A3A] font-semibold'
                          : choice.id === 'FULL'
                          ? 'bg-[#F2F2F3] text-[#17191C]'
                          : choice.id === 'PAUSE'
                          ? 'bg-[#FDF6ED] text-[#A66B16]'
                          : 'bg-[#FAF0F0] text-[#B54747]'
                      }`}
                    >
                      {choice.badge}
                    </span>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#17191C] bg-[#17191C] text-white'
                          : 'border-[#D6D9D2]'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#17191C]">
                    {choice.title}
                  </h3>

                  <p className="text-xs text-[#626862] leading-relaxed">
                    {choice.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rationale Editor */}
      <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <label
            htmlFor="pm-rationale-editor"
            className="text-xs font-mono uppercase tracking-wider text-[#777B86]"
          >
            Decision Rationale
          </label>
          <span className="text-[11px] font-mono text-[#777B86]">
            Auditable executive explanation
          </span>
        </div>

        <p className="text-xs text-[#626862] font-light">
          State why you committed to this choice, what risks you accepted, and what conditions bound your decision.
        </p>

        <textarea
          id="pm-rationale-editor"
          rows={5}
          value={finalRationale}
          onChange={(e) => onChangeRationale(e.target.value)}
          placeholder="State your complete decision rationale here..."
          className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-[#E8E8EA] bg-[#FAF9F6] text-[#17191C] focus:outline-none focus:border-[#17191C] focus:ring-1 focus:ring-[#17191C] resize-none leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2 text-xs font-mono text-[11px] text-[#777B86]">
          <span>Saved to permanent decision record</span>
          <button
            type="button"
            onClick={() => onChangeRationale(demoWorkoutDefaultRationale)}
            className="hover:underline text-[#17191C]"
          >
            Reset to recommended rationale
          </button>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onContinueToRecord}
          disabled={!finalRationale.trim()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-[#17191C] hover:bg-[#2D3139] shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Record decision →</span>
        </button>
      </div>
    </div>
  );
};
