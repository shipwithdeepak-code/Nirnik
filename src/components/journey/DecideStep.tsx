import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import {
  demoWorkoutSynthesis,
  demoWorkoutFinalChoices,
  demoWorkoutDefaultRationale,
} from '../../data/demoWorkoutDecision';

interface DecideStepProps {
  finalChoice: string;
  finalRationale: string;
  onSelectFinalChoice: (choice: string) => void;
  onChangeRationale: (rationale: string) => void;
  isDemo?: boolean;
}

export const DecideStep: React.FC<DecideStepProps> = ({
  finalChoice,
  finalRationale,
  onSelectFinalChoice,
  onChangeRationale,
  isDemo = false,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4 sm:py-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            PHASE 04 · DECIDE
          </span>
          {isDemo && (
            <span className="text-[11px] font-mono text-stone-500">
              Jury Synthesis & PM Authority
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-50 font-normal">
          Jury Synthesis & Final Decision
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Review the panel&apos;s synthesis after taking your response into account, then record your definitive product call.
        </p>
      </div>

      {/* Jury Synthesis Panel */}
      <section className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-semibold block mb-0.5">
              Jury Assessment
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-serif font-bold text-amber-600 dark:text-amber-400">
                {demoWorkoutSynthesis.verdict}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold">
                {demoWorkoutSynthesis.confidence}% Confidence
              </span>
            </div>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md sm:text-right">
            {demoWorkoutSynthesis.confidenceRationale}
          </p>
        </div>

        {/* 4 Synthesis Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* What Holds */}
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>What Holds</span>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300 leading-snug">
              {demoWorkoutSynthesis.whatHolds.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Doesn't */}
          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-300 uppercase">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>What Doesn&apos;t</span>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300 leading-snug">
              {demoWorkoutSynthesis.whatDoesnt.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Changed */}
          <div className="p-4 rounded-lg bg-sky-500/5 border border-sky-500/20 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-700 dark:text-sky-300 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>What Changed (PM Response)</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              {demoWorkoutSynthesis.whatChanged}
            </p>
          </div>

          {/* What Would Change Our Mind */}
          <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-300 uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>What Would Change Our Mind</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              {demoWorkoutSynthesis.whatWouldChangeOurMind}
            </p>
          </div>
        </div>
      </section>

      {/* Final PM Decision Section */}
      <section className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 block mb-1">
            Make the Decision (PM Authority)
          </span>
          <p className="text-xs text-stone-500">
            Select the definitive choice and write your rationale. This creates the permanent decision record.
          </p>
        </div>

        {/* 4 Decision Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {demoWorkoutFinalChoices.map((choice) => {
            const isSelected = finalChoice === choice.id;

            return (
              <div
                key={choice.id}
                onClick={() => onSelectFinalChoice(choice.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-stone-900 bg-stone-50 dark:border-stone-100 dark:bg-stone-800 ring-2 ring-stone-900 dark:ring-stone-100'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {choice.title}
                    </h3>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
                        choice.recommended
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {choice.badge}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                    {choice.subtitle}
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 dark:border-stone-100 dark:bg-stone-100'
                        : 'border-stone-400'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-stone-900" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decision Rationale Input */}
        <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
          <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
            Recorded Decision Rationale & Next Steps
          </label>
          <textarea
            rows={3}
            value={finalRationale}
            onChange={(e) => onChangeRationale(e.target.value)}
            placeholder="Record the reasoning behind your choice, key trade-offs accepted, and immediate next milestones..."
            className="w-full text-xs p-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans leading-relaxed"
          />
          <p className="text-[11px] text-stone-400 italic">
            This rationale will be preserved permanently in the Decision Record and indexed in your local decision archive.
          </p>
        </div>
      </section>
    </div>
  );
};
