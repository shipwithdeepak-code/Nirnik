import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { demoWorkoutSynthesis } from '../../data/demoWorkoutDecision';

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
    subtitle: 'Deploy unconditionally to all target users.',
  },
  {
    id: 'CONDITIONAL',
    title: 'Launch with conditions',
    subtitle: 'Gate behind explicit consent and novice calibration.',
  },
  {
    id: 'PAUSE',
    title: 'Do not launch yet',
    subtitle: 'Await empirical cohort retention and safety validation.',
  },
  {
    id: 'REJECT',
    title: 'Reject',
    subtitle: 'Decline proposal due to structural safety or trust risks.',
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
  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 space-y-10">
      {/* Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171A18]">
          You make the call.
        </h1>
        <p className="mt-2 text-sm text-[#626862] leading-relaxed">
          Nirnik challenges assumptions and calculates bounds, but final authority rests entirely with the product manager.
        </p>
      </div>

      {/* Concise Synthesis */}
      <section className="p-5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#E5E7E2] pb-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#626862]">
            Jury Synthesis
          </div>
          <div className="text-xs text-[#626862]">
            Advisory position:{' '}
            <span className="font-semibold text-[#174A3A]">Launch with conditions</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* What holds */}
          <div className="p-3 rounded-lg bg-[#F7F7F4] border border-[#E5E7E2] space-y-1">
            <div className="font-semibold text-[#287A52] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>What holds</span>
            </div>
            <p className="text-[#626862] leading-relaxed">
              Recommendation latency is well within 400ms SLA, and pilot engagement showed +40% workouts for active athletes.
            </p>
          </div>

          {/* What does not */}
          <div className="p-3 rounded-lg bg-[#F7F7F4] border border-[#E5E7E2] space-y-1">
            <div className="font-semibold text-[#B54747] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>What does not</span>
            </div>
            <p className="text-[#626862] leading-relaxed">
              Assumption that beginners understand algorithmic adjustments without guidance does not hold.
            </p>
          </div>

          {/* What changed */}
          <div className="p-3 rounded-lg bg-[#F7F7F4] border border-[#E5E7E2] space-y-1">
            <div className="font-semibold text-[#496F8C] flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>What changed</span>
            </div>
            <p className="text-[#626862] leading-relaxed">
              PM agreed to modify rollout by adding mandatory injury check-in and novice calibration gate.
            </p>
          </div>

          {/* What would change our mind */}
          <div className="p-3 rounded-lg bg-[#F7F7F4] border border-[#E5E7E2] space-y-1">
            <div className="font-semibold text-[#A66B16] flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>What would change our mind</span>
            </div>
            <p className="text-[#626862] leading-relaxed">
              If opt-in rates in the first 500 novice users fall below 35%, rollout should immediately pause.
            </p>
          </div>
        </div>
      </section>

      {/* Your Decision Choices (Options: Launch, Launch with conditions, Do not launch yet, Reject) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-[#171A18]">Your decision</h2>
          <p className="text-xs text-[#626862] mt-0.5">
            Select your definitive commitment. The jury does not select this for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DECISION_CHOICES.map((choice) => {
            const isSelected = finalChoice === choice.id;
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => onSelectFinalChoice(choice.id)}
                className={`p-4 rounded-xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] ${
                  isSelected
                    ? 'border-[#174A3A] bg-[#FFFFFF] shadow-sm ring-1 ring-[#174A3A]'
                    : 'border-[#E5E7E2] bg-[#FFFFFF] hover:border-[#D6D9D2]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#171A18]">
                    {choice.title}
                  </span>
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-[#174A3A] bg-[#174A3A]'
                        : 'border-[#D6D9D2] bg-white'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-[#626862] leading-relaxed">
                  {choice.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* PM Defense & Rationale */}
      <section className="space-y-2">
        <label
          htmlFor="final-rationale"
          className="block text-xs font-semibold text-[#171A18]"
        >
          Your rationale & defense notes
        </label>
        <textarea
          id="final-rationale"
          rows={3}
          value={finalRationale}
          onChange={(e) => onChangeRationale(e.target.value)}
          placeholder="Record why this call is defensible given the evidence and jury challenges..."
          className="w-full text-xs p-3.5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] text-[#171A18] placeholder:text-[#8A908A] focus:outline-none focus:ring-1 focus:ring-[#174A3A] focus:border-[#174A3A] leading-relaxed resize-none"
        />
      </section>

      {/* Dominant Next Action */}
      <div className="pt-6 border-t border-[#E5E7E2] flex items-center justify-between">
        <p className="text-xs text-[#8A908A]">
          Step 4 of 5 · Recorded in local immutable decision history
        </p>

        {onContinueToRecord && (
          <button
            type="button"
            onClick={onContinueToRecord}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#174A3A] hover:bg-[#10372C] shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            <span>Save decision</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
