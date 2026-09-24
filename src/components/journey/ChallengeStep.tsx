import React, { useState } from 'react';
import {
  Users,
  ShieldAlert,
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import type {
  DemoSpecialistDetail,
  DemoDisagreementItem,
  DemoPMResponseOption,
} from '../../data/demoWorkoutDecision';
import { demoWorkoutPMResponses } from '../../data/demoWorkoutDecision';

interface ChallengeStepProps {
  specialists: DemoSpecialistDetail[];
  disagreement: DemoDisagreementItem | null;
  pmSelectedResponseId: string;
  pmResponseText: string;
  onSelectPMResponse: (responseId: string, text: string) => void;
  onOpenSpecialistDetail: (sp: DemoSpecialistDetail) => void;
  isDemo?: boolean;
}

export const ChallengeStep: React.FC<ChallengeStepProps> = ({
  specialists,
  disagreement,
  pmSelectedResponseId,
  pmResponseText,
  onSelectPMResponse,
  onOpenSpecialistDetail,
  isDemo = false,
}) => {
  const [isCustomMode, setIsCustomMode] = useState(pmSelectedResponseId === 'CUSTOM');
  const [customText, setCustomText] = useState(
    pmSelectedResponseId === 'CUSTOM' ? pmResponseText : ''
  );

  const handleSelectOption = (opt: DemoPMResponseOption) => {
    setIsCustomMode(false);
    onSelectPMResponse(opt.id, opt.title);
  };

  const handleCustomChange = (text: string) => {
    setCustomText(text);
    onSelectPMResponse('CUSTOM', text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4 sm:py-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            PHASE 03 · CHALLENGE
          </span>
          {isDemo && (
            <span className="text-[11px] font-mono text-stone-500">
              Deterministic Specialist Jury
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-50 font-normal">
          The Specialist Jury evaluates the decision
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Four independent lenses interrogate your claims, expose friction, and challenge unexamined assumptions.
        </p>
      </div>

      {/* Specialist Jury Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
            Specialist Perspectives ({specialists.length})
          </h2>
          <span className="text-[11px] font-mono text-stone-500">
            Click any specialist to view full arguments & citations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialists.map((sp) => (
            <div
              key={sp.id}
              onClick={() => onOpenSpecialistDetail(sp)}
              className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-700 cursor-pointer transition-all hover:shadow-sm flex flex-col justify-between group"
            >
              <div>
                {/* Header with Title and Stance */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {sp.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-mono">{sp.role}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                      sp.stanceType === 'positive'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : sp.stanceType === 'warning'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {sp.stance}
                  </span>
                </div>

                {/* Key Concern */}
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  &ldquo;{sp.keyConcern}&rdquo;
                </p>
              </div>

              {/* Footer with Confidence and Citations */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono text-stone-400">Claims:</span>
                  {sp.evidenceCitations.slice(0, 2).map((claimId) => (
                    <span
                      key={claimId}
                      className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[9px] font-mono text-stone-600 dark:text-stone-400"
                    >
                      {claimId.replace('CLM-wp0', 'C')}
                    </span>
                  ))}
                  {sp.evidenceCitations.length > 2 && (
                    <span className="text-[9px] font-mono text-stone-400">
                      +{sp.evidenceCitations.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500">
                  <span>{sp.confidence}% conf</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disagreement Clash Section */}
      {disagreement && (
        <section className="p-6 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/10 space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-300">
              Where the Jury Disagrees
            </h2>
          </div>

          <div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-1">
              {disagreement.topic}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {disagreement.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Side A */}
            <div className="p-4 rounded-lg bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {disagreement.sideA.role}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  {disagreement.sideA.stance}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                {disagreement.sideA.argument}
              </p>
            </div>

            {/* Side B */}
            <div className="p-4 rounded-lg bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {disagreement.sideB.role}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium">
                  {disagreement.sideB.stance}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                {disagreement.sideB.argument}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Human Agency: PM Response to the Strongest Challenge */}
      <section className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              PM RESPONSE
            </span>
            <span className="text-xs text-stone-500">Product Jury advises; you decide.</span>
          </div>
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Address the Strongest Challenge
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            The Red Team and Auditor identified user injury risk and unverified 90-day retention as critical vulnerabilities. How do you respond?
          </p>
        </div>

        {/* Response Options */}
        <div className="space-y-2.5">
          {demoWorkoutPMResponses.map((opt) => {
            const isSelected = !isCustomMode && pmSelectedResponseId === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-stone-900 bg-stone-50 dark:border-stone-100 dark:bg-stone-800/80 ring-1 ring-stone-900 dark:ring-stone-100'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 hover:border-stone-400'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {opt.title}
                      </span>
                      {opt.recommended && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/20">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                      {opt.description}
                    </p>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
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

          {/* Custom Response Choice */}
          <div
            onClick={() => {
              setIsCustomMode(true);
              onSelectPMResponse('CUSTOM', customText);
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              isCustomMode
                ? 'border-stone-900 bg-stone-50 dark:border-stone-100 dark:bg-stone-800/80 ring-1 ring-stone-900 dark:ring-stone-100'
                : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 hover:border-stone-400'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                Custom response / specific rationale
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  isCustomMode
                    ? 'border-stone-900 bg-stone-900 dark:border-stone-100 dark:bg-stone-100'
                    : 'border-stone-400'
                }`}
              >
                {isCustomMode && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-stone-900" />
                )}
              </div>
            </div>

            {isCustomMode && (
              <textarea
                rows={3}
                value={customText}
                onChange={(e) => handleCustomChange(e.target.value)}
                placeholder="Explain how you propose to mitigate the challenge or why this risk is acceptable..."
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
