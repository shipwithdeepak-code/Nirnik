import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Check,
  Scale,
  Sparkles,
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
  evidence: string;
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
      evidence: 'Qualitative interview logs: 32% of beginners felt machine plans were too rigid or intimidating.',
      currentAction: 'MODIFY',
    },
    {
      id: 'c2',
      source: 'Evidence Auditor',
      concern: 'No longitudinal baseline past 60 days exists to prove whether 30-day adherence gains prevent recurring churn.',
      evidence: 'Cohort drop-off telemetry only covers 8 weeks of beta usage.',
      currentAction: 'ACCEPT',
    },
    {
      id: 'c3',
      source: 'Red Team',
      concern: 'High-strain heavy compound barbell suggestions carry unmitigated injury and legal liability for unsupervised users.',
      evidence: '3 reported muscle strains during intense unsupervised beta test sessions.',
      currentAction: 'MODIFY',
    },
  ]);

  const handleActionChange = (id: string, mode: ResponseMode) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, currentAction: mode } : c))
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-10 sm:py-16 px-4 sm:px-6 space-y-16">
      {/* SECTION 11 — STEP HEADING */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E8E8EA] text-[10px] font-mono uppercase tracking-widest text-[#777B86]">
          <span>03 CHALLENGE</span>
          <span className="text-[#B0B4BC]">·</span>
          <span>Deliberation Surface</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-normal tracking-tight text-[#17191C]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          The Jury has reviewed your decision
        </h1>
        <p className="text-sm text-[#626862] leading-relaxed max-w-2xl font-light">
          Four specialist perspectives independently probed the evidence, questioned unproven assumptions, and pressure-tested what could cause this decision to fail.
        </p>
      </div>

      {/* DELIBERATION SURFACE: FOUR SPECIALISTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EA]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#777B86]">
            Specialist Perspectives
          </span>
          <span className="text-xs font-mono text-[#777B86]">4 jurors deliberating</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialists.map((sp) => (
            <div
              key={sp.id}
              onClick={() => onOpenSpecialistDetail(sp)}
              className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] hover:border-[#17191C] transition-all cursor-pointer shadow-2xs space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#777B86]">
                    {sp.title}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      sp.stanceType === 'positive'
                        ? 'bg-[#DDEBE4] text-[#174A3A]'
                        : sp.stanceType === 'warning'
                        ? 'bg-[#FDF6ED] text-[#A66B16]'
                        : 'bg-[#FAF0F0] text-[#B54747]'
                    }`}
                  >
                    {sp.confidence}% confidence
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#17191C] leading-snug">
                  {sp.stance}
                </h3>

                <p className="text-xs text-[#626862] leading-relaxed line-clamp-3">
                  {sp.reasoning}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2F2F3] flex items-center justify-between text-xs font-mono text-[11px] text-[#777B86]">
                <span>
                  {sp.evidenceCitations.length} evidence {sp.evidenceCitations.length === 1 ? 'citation' : 'citations'}
                </span>
                <span className="group-hover:text-[#17191C] inline-flex items-center gap-1 transition-colors">
                  <span>Inspect rationale</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 12 — WHERE THE JURY DISAGREES & THE REAL QUESTION */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-6 shadow-2xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E8EA] text-[10px] font-mono uppercase tracking-wider text-[#A66B16]">
            <Scale className="w-3.5 h-3.5" />
            <span>Where the Jury Disagrees</span>
          </div>
          <h2 className="text-lg font-semibold text-[#17191C]">
            Strategic Tension: Velocity vs Liability
          </h2>
        </div>

        {/* 4 Juror Positions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-1">
            <span className="font-mono text-[10px] text-[#777B86] block">Strategist</span>
            <span className="font-semibold text-[#174A3A] block">Launch with conditions</span>
            <span className="text-[11px] text-[#626862] block leading-snug">Monetization lift outweighs unproven long-term decay.</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-1">
            <span className="font-mono text-[10px] text-[#777B86] block">UX Researcher</span>
            <span className="font-semibold text-[#A66B16] block">Pilot first (20%)</span>
            <span className="text-[11px] text-[#626862] block leading-snug">Novices risk churn without interactive onboarding.</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-1">
            <span className="font-mono text-[10px] text-[#777B86] block">Evidence Auditor</span>
            <span className="font-semibold text-[#A66B16] block">Evidence insufficient</span>
            <span className="text-[11px] text-[#626862] block leading-snug">No longitudinal 90-day retention curve measured.</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-1">
            <span className="font-mono text-[10px] text-[#777B86] block">Red Team</span>
            <span className="font-semibold text-[#B54747] block">Major assumption unresolved</span>
            <span className="text-[11px] text-[#626862] block leading-snug">Unsupervised high-strain lifts create injury liability.</span>
          </div>
        </div>

        {/* The Real Question Box */}
        <div className="p-5 rounded-2xl bg-[#FFFFFF] border-l-4 border-[#17191C] space-y-1.5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#777B86]">
            The Real Question
          </div>
          <p
            className="text-base sm:text-lg text-[#17191C] leading-snug italic"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            “Can we justify a full rollout when retention impact remains unproven past 60 days and novice injury risk is unmitigated?”
          </p>
        </div>
      </section>

      {/* SECTION 13 — PM RESPONSE */}
      <section className="space-y-6 pt-4 border-t border-[#E8E8EA]">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-[#17191C]">
            The Jury challenged 3 assumptions
          </h2>
          <p className="text-xs text-[#626862] font-light">
            You make the call. Nirnik does not silently change your decision. Choose how to respond to each challenge before synthesizing.
          </p>
        </div>

        <div className="space-y-4">
          {challenges.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-3.5 shadow-2xs"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-[#777B86] uppercase tracking-wider">
                  Challenge from {c.source}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#FAF0F0] text-[#B54747]">
                  Vulnerability Expose
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#17191C] leading-snug">
                  {c.concern}
                </p>
                <p className="text-xs text-[#626862] italic">
                  Basis: {c.evidence}
                </p>
              </div>

              {/* Agency Actions for PM */}
              <div className="pt-2 border-t border-[#F2F2F3] flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-[#777B86] mr-1">Your response:</span>

                <button
                  type="button"
                  onClick={() => handleActionChange(c.id, 'ACCEPT')}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    c.currentAction === 'ACCEPT'
                      ? 'bg-[#17191C] text-white font-medium'
                      : 'bg-[#FAF9F6] border border-[#E8E8EA] text-[#626862] hover:text-[#17191C]'
                  }`}
                >
                  Accept concern
                </button>

                <button
                  type="button"
                  onClick={() => handleActionChange(c.id, 'ADD_EVIDENCE')}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    c.currentAction === 'ADD_EVIDENCE'
                      ? 'bg-[#17191C] text-white font-medium'
                      : 'bg-[#FAF9F6] border border-[#E8E8EA] text-[#626862] hover:text-[#17191C]'
                  }`}
                >
                  Add evidence
                </button>

                <button
                  type="button"
                  onClick={() => handleActionChange(c.id, 'MODIFY')}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    c.currentAction === 'MODIFY'
                      ? 'bg-[#17191C] text-white font-medium'
                      : 'bg-[#FAF9F6] border border-[#E8E8EA] text-[#626862] hover:text-[#17191C]'
                  }`}
                >
                  Modify scope
                </button>

                <button
                  type="button"
                  onClick={() => handleActionChange(c.id, 'KEEP')}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    c.currentAction === 'KEEP'
                      ? 'bg-[#17191C] text-white font-medium'
                      : 'bg-[#FAF9F6] border border-[#E8E8EA] text-[#626862] hover:text-[#17191C]'
                  }`}
                >
                  Keep decision
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Strategic PM Direction */}
        <div className="p-5 rounded-3xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-3">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#777B86]">
            PM Proposed Strategic Framing
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={pmResponseText}
              onChange={(e) => onSelectPMResponse('RESP-CUSTOM', e.target.value)}
              placeholder="State your operational counter-measure or rollout boundary..."
              className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border border-[#E8E8EA] bg-[#FFFFFF] text-[#17191C] focus:outline-none focus:border-[#17191C] resize-none leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* SECTION 14 — JURY SYNTHESIS */}
      <section className="space-y-5 pt-4 border-t border-[#E8E8EA]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E8E8EA] text-[10px] font-mono uppercase tracking-widest text-[#777B86]">
            <span>Synthesis</span>
            <span className="text-[#B0B4BC]">·</span>
            <span>Deliberation Outcome</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-normal text-[#17191C]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            What survived the challenge?
          </h2>
          <p className="text-xs text-[#626862] font-light">
            Synthesis maps what claims remained intact, which assumptions collapsed, what conditions adapted, and what future data would overturn this position.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WHAT HOLDS */}
          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 shadow-2xs">
            <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#174A3A]">
              What Holds
            </div>
            <p className="text-xs text-[#17191C] leading-relaxed">
              Personalized recommendations are technically feasible and drive an observable +16.1% workout completion lift in active beta users.
            </p>
          </div>

          {/* WHAT DOESN'T */}
          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 shadow-2xs">
            <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#B54747]">
              What Doesn't
            </div>
            <p className="text-xs text-[#17191C] leading-relaxed">
              Current evidence does not establish long-term retention impact, and volume caps alone fail to protect novice lifters from muscular strain.
            </p>
          </div>

          {/* WHAT CHANGED */}
          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 shadow-2xs">
            <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#A66B16]">
              What Changed
            </div>
            <p className="text-xs text-[#17191C] leading-relaxed">
              Full unconstrained rollout is rejected in favor of a controlled 20% opt-in pilot cohort with mandatory novice guardrails.
            </p>
          </div>

          {/* WHAT WOULD CHANGE OUR MIND */}
          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 shadow-2xs">
            <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#5D2A1A]">
              What Would Change Our Mind
            </div>
            <p className="text-xs text-[#17191C] leading-relaxed">
              60-day cohort retention dropping below 32% (decay), or recurring injury escalations in unsupervised test groups.
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={onContinueToDecide}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold text-white bg-[#17191C] hover:bg-[#2D3139] shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] cursor-pointer"
          >
            <span>Continue to Decide →</span>
          </button>
        </div>
      </section>
    </div>
  );
};
