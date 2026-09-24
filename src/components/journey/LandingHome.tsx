import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  HelpCircle,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { listStoredDecisions, type StoredDecisions } from '../../services/decisionPersistence';
import type { DecisionListing } from '../../../server/decision/decision';

interface LandingHomeProps {
  onStartNewDecision: () => void;
  onStartDemoDecision: () => void;
  onOpenStoredDecision: (id: string) => void;
  onOpenDecisionsList?: () => void;
}

export const LandingHome: React.FC<LandingHomeProps> = ({
  onStartNewDecision,
  onStartDemoDecision,
  onOpenStoredDecision,
  onOpenDecisionsList,
}) => {
  const [decisionsState, setDecisionsState] = useState<StoredDecisions | { status: 'loading' }>({
    status: 'loading',
  });

  useEffect(() => {
    let active = true;
    void listStoredDecisions().then((res) => {
      if (active) setDecisionsState(res);
    });
    return () => {
      active = false;
    };
  }, []);

  const listings: DecisionListing[] =
    decisionsState.status === 'loaded' ? decisionsState.listings : [];

  const formatUpdatedDate = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  const getStateBadge = (state: DecisionListing['state']) => {
    switch (state) {
      case 'provisional':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-[#DDEBE4] text-[#174A3A]">
            Provisional
          </span>
        );
      case 'awaiting_evidence':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-[#FDF6ED] text-[#A66B16]">
            Awaiting evidence
          </span>
        );
      case 'waiting_on_a_check':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-[#F2F2F3] text-[#777B86]">
            Waiting on check
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-[#FAF0F0] text-[#B54747]">
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-[#F2F2F3] text-[#777B86]">
            Active
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-[#FAF9F6] text-[#17191C] selection:bg-[#174A3A] selection:text-white">
      {/* ============================================================ */}
      {/* SECTION 1 — COMPOSED EDITORIAL HERO (1440x900 FIRST VIEWPORT) */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden border-b border-[#E8E8EA] bg-[#FFFFFF] pt-8 pb-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT FLANK: ARTIFACT 1 (DECISION) & ARTIFACT 2 (EVIDENCE) */}
            <div className="order-2 lg:order-1 lg:col-span-3 space-y-4 lg:space-y-6 lg:-translate-y-2">
              
              {/* ARTIFACT 1 — DECISION */}
              <div
                onClick={onStartDemoDecision}
                className="group relative bg-[#FAF9F6] rounded-3xl border border-[#E8E8EA] p-5 shadow-2xs hover:shadow-md hover:border-[#17191C]/25 transition-all duration-300 cursor-pointer lg:-rotate-[0.5deg]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onStartDemoDecision();
                  }
                }}
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#E8E8EA] pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#17191C]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-[#777B86]">
                      DECISION
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#174A3A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#174A3A]" />
                    <span>Question framed</span>
                  </div>
                </div>

                <div className="mt-3.5 space-y-2">
                  <h3 className="text-sm font-semibold text-[#17191C] leading-snug group-hover:text-[#174A3A] transition-colors">
                    Should we launch AI-powered workout recommendations?
                  </h3>
                  <div className="text-[11px] font-mono text-[#777B86] flex items-center gap-2">
                    <span className="text-[#17191C] font-medium">Product launch</span>
                    <span>·</span>
                    <span>High reversibility cost</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E8EA] flex items-center justify-between text-[11px] font-mono text-[#777B86] group-hover:text-[#17191C] transition-colors">
                  <span>Workspace fragment</span>
                  <span className="inline-flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform">
                    Open decision <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* ARTIFACT 2 — EVIDENCE */}
              <div
                onClick={onStartDemoDecision}
                className="group relative bg-[#FAF9F6] rounded-3xl border border-[#E8E8EA] p-5 shadow-2xs hover:shadow-md hover:border-[#17191C]/25 transition-all duration-300 cursor-pointer lg:translate-x-1"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onStartDemoDecision();
                  }
                }}
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#E8E8EA] pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#174A3A]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-[#777B86]">
                      EVIDENCE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#777B86]">
                    3 sources · 4 claims
                  </span>
                </div>

                <div className="mt-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-[#FFFFFF] border border-[#E8E8EA]">
                    <div className="flex items-center gap-2 text-[#17191C] font-medium">
                      <Check className="w-3.5 h-3.5 text-[#174A3A] stroke-[2.5]" />
                      <span>Workout frequency</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#174A3A] bg-[#DDEBE4] px-1.5 py-0.5 rounded">
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-[#FFFFFF] border border-[#E8E8EA]">
                    <div className="flex items-center gap-2 text-[#17191C] font-medium">
                      <Check className="w-3.5 h-3.5 text-[#174A3A] stroke-[2.5]" />
                      <span>User engagement</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#174A3A] bg-[#DDEBE4] px-1.5 py-0.5 rounded">
                      Corroborated
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-[#FFFFFF] border border-[#E8E8EA]">
                    <div className="flex items-center gap-2 text-[#626862] font-medium">
                      <HelpCircle className="w-3.5 h-3.5 text-[#A66B16] stroke-[2]" />
                      <span>Retention impact</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#A66B16] bg-[#FDF6ED] px-1.5 py-0.5 rounded">
                      Assumption
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E8EA] flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>Epistemic grounding</span>
                  <span className="text-[#174A3A] font-medium group-hover:underline">
                    View sources →
                  </span>
                </div>
              </div>

            </div>

            {/* CENTER: THE EDITORIAL CORE PROPOSITION */}
            <div className="order-1 lg:order-2 lg:col-span-6 text-center space-y-6 lg:px-4">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8E8EA] text-[11px] font-mono uppercase tracking-widest text-[#777B86]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#174A3A]" />
                <span>NIRNIK · AI DECISION WORKSPACE</span>
              </div>

              {/* Major Display Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-normal text-[#17191C] tracking-tight leading-[1.06]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Challenge the thinking.<br />
                <span className="italic text-[#174A3A]">Defend the decision.</span>
              </h1>

              {/* Core Copy */}
              <div className="space-y-3 max-w-xl mx-auto">
                <p className="text-base sm:text-lg text-[#17191C] font-medium leading-snug">
                  Important product decisions rarely fail because teams lack opinions.
                  They fail because assumptions go unchallenged.
                </p>
                <p className="text-sm sm:text-base text-[#626862] leading-relaxed font-light">
                  Bring an important decision to Nirnik. It separates what you know from what you assume, then puts the reasoning under pressure.
                </p>
              </div>

              {/* Stance Callout */}
              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-xs font-mono text-[#777B86] border border-[#E8E8EA] bg-[#FAF9F6] px-4 py-2 rounded-2xl sm:rounded-full">
                <span className="text-[#17191C] font-semibold">You make the call.</span>
                <span className="hidden sm:inline text-[#D6D9D2]">/</span>
                <span>Nirnik makes the thinking harder to ignore.</span>
              </div>

              {/* Dominant Primary CTA + Quiet Text Link */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onStartNewDecision}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#17191C] hover:bg-[#2D3139] shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] cursor-pointer group"
                >
                  <span>Start a decision</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onStartDemoDecision}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-[#777B86] hover:text-[#17191C] transition-colors underline-offset-4 hover:underline cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#17191C] rounded-lg"
                >
                  <span>See a 3-minute example</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* RIGHT FLANK: ARTIFACT 3 (JURY CHALLENGE) & ARTIFACT 4 (UNKNOWN) */}
            <div className="order-3 lg:col-span-3 space-y-4 lg:space-y-6 lg:translate-y-1">
              
              {/* ARTIFACT 3 — JURY CHALLENGE */}
              <div
                onClick={onStartDemoDecision}
                className="group relative bg-[#FAF9F6] rounded-3xl border border-[#E8E8EA] p-5 shadow-2xs hover:shadow-md hover:border-[#5D2A1A]/30 transition-all duration-300 cursor-pointer lg:rotate-[0.5deg] ring-1 ring-[#5D2A1A]/5"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onStartDemoDecision();
                  }
                }}
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#E8E8EA] pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5D2A1A]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-[#5D2A1A]">
                      THE JURY CHALLENGES
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#777B86] bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#E8E8EA]">
                    UX RESEARCHER
                  </span>
                </div>

                <div className="mt-3.5 space-y-1.5">
                  <div className="text-sm font-semibold text-[#17191C] leading-snug group-hover:text-[#5D2A1A] transition-colors">
                    “Pilot before rollout.”
                  </div>
                  <p className="text-xs text-[#626862] leading-relaxed">
                    The evidence shows interest, not sustained behaviour.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E8EA] flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-[#777B86]">Adversarial probe</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[#174A3A] group-hover:text-[#5D2A1A] group-hover:translate-x-0.5 transition-all">
                    View challenge <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* ARTIFACT 4 — UNKNOWN */}
              <div
                onClick={onStartDemoDecision}
                className="group relative bg-[#FAF9F6] rounded-3xl border border-[#E8E8EA] p-5 shadow-2xs hover:shadow-md hover:border-[#A66B16]/30 transition-all duration-300 cursor-pointer lg:-translate-x-1"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onStartDemoDecision();
                  }
                }}
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#E8E8EA] pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A66B16]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-[#A66B16]">
                      STILL UNKNOWN
                    </span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#FAF0F0] text-[#B54747] border border-[#F2D7D7]">
                    UNPROVEN
                  </span>
                </div>

                <div className="mt-3.5 space-y-1.5">
                  <h4 className="text-xs font-semibold text-[#17191C] leading-snug">
                    Will recommendations improve retention?
                  </h4>
                  <p className="text-[11px] text-[#777B86] leading-relaxed">
                    Zero holdout cohort telemetry exists past week 8 for churn mitigation.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E8EA] flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>Falsification check</span>
                  <span className="text-[#A66B16] font-medium group-hover:underline">
                    View open loop →
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — THE PROBLEM: IMPORTANT DECISIONS DON'T ARRIVE CLEAN */}
      {/* ============================================================ */}
      <section className="py-20 border-b border-[#E8E8EA] bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777B86]">
              01 · The Reality of Product Decisions
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17191C] tracking-tight leading-[1.12]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Important decisions don’t arrive clean.
            </h2>
            <p className="text-sm sm:text-base text-[#626862] leading-relaxed font-light">
              A consequential product decision never enters as a clean proposition. It arrives as a tangled collision of competing signals, loud opinions, and unspoken assumptions.
            </p>
          </div>

          {/* Visual Input Collage converging to a single question */}
          <div className="mt-12 bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Input 1 */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>CUSTOMER FEEDBACK</span>
                  <span className="text-[#A66B16]">Subjective</span>
                </div>
                <div className="text-xs font-semibold text-[#17191C]">
                  “Users say static plans are boring.”
                </div>
                <p className="text-[11px] text-[#626862]">
                  412 qualitative comments requesting dynamic guidance, but no price sensitivity data.
                </p>
              </div>

              {/* Input 2 */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>ANALYTICS TELEMETRY</span>
                  <span className="text-[#174A3A]">Observed</span>
                </div>
                <div className="text-xs font-semibold text-[#17191C]">
                  Beta pilot: 48.2% completion vs 32.1%
                </div>
                <p className="text-[11px] text-[#626862]">
                  Observed lift over 8 weeks, but early adopters carry high novelty bias.
                </p>
              </div>

              {/* Input 3 */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>STAKEHOLDER OPINION</span>
                  <span className="text-[#5D2A1A]">Urgency</span>
                </div>
                <div className="text-xs font-semibold text-[#17191C]">
                  “Competitor just shipped AI coaching.”
                </div>
                <p className="text-[11px] text-[#626862]">
                  Executive pressure to ship general availability before Q3 ends.
                </p>
              </div>

              {/* Input 4 */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>USER RESEARCH</span>
                  <span className="text-[#174A3A]">Sampled</span>
                </div>
                <div className="text-xs font-semibold text-[#17191C]">
                  68% stated interest in dynamic plans
                </div>
                <p className="text-[11px] text-[#626862]">
                  3 participants reported muscle strain following high-intensity recommendations.
                </p>
              </div>

              {/* Input 5 */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>CRITICAL ASSUMPTION</span>
                  <span className="text-[#B54747]">Untested</span>
                </div>
                <div className="text-xs font-semibold text-[#17191C]">
                  “Higher completion directly cuts churn.”
                </div>
                <p className="text-[11px] text-[#626862]">
                  Belief that workout frequency prevents subscription cancellation at month 2.
                </p>
              </div>

              {/* Input 6 */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>INFRASTRUCTURE</span>
                  <span className="text-[#777B86]">Cost</span>
                </div>
                <div className="text-xs font-semibold text-[#17191C]">
                  $0.0042 per daily recommendation
                </div>
                <p className="text-[11px] text-[#626862]">
                  Mean inference 380ms; p99 latency spikes during peak 7 AM training hours.
                </p>
              </div>

            </div>

            {/* Convergence Funnel */}
            <div className="mt-8 pt-6 border-t border-[#E8E8EA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#17191C] text-white flex items-center justify-center font-mono text-xs">
                  ↓
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#777B86] uppercase tracking-wider">
                    Confronts the team with one inescapable question
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#17191C]">
                    “Should we launch AI-powered workout recommendations to all users?”
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block px-3 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E8EA] text-xs font-mono text-[#17191C]">
                  High Reversibility Cost
                </span>
              </div>
            </div>
          </div>

          {/* Differentiator Statement */}
          <div className="mt-8 text-center">
            <p className="text-sm sm:text-base font-mono text-[#777B86]">
              Most tools help collect the inputs. <span className="text-[#17191C] font-semibold underline decoration-[#174A3A] underline-offset-4">Nirnik helps stress-test the decision.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — TRANSFORMATION: FROM QUESTION TO DECISION */}
      {/* ============================================================ */}
      <section className="py-20 border-b border-[#E8E8EA] bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777B86]">
              02 · The Transformation
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17191C] tracking-tight leading-[1.12]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              From question to decision.
            </h2>
            <p className="text-sm sm:text-base text-[#626862] leading-relaxed font-light">
              See how an ambiguous proposal becomes an audit-proof commitment that stands up to scrutiny.
            </p>
          </div>

          {/* Before / After Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* LEFT: BEFORE NIRNIK */}
            <div className="bg-[#FAF9F6] border border-[#E8E8EA] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E8EA] pb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#777B86] font-semibold">
                    BEFORE NIRNIK
                  </span>
                  <span className="text-[11px] font-mono text-[#B54747] bg-[#FAF0F0] px-2 py-0.5 rounded">
                    Intuitive Blur
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#777B86]">PROPOSAL</span>
                  <div className="text-base font-semibold text-[#17191C]">
                    “Should we launch AI recommendations?”
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-[#E8E8EA] text-xs text-[#626862] italic">
                    “I think users will love it. Engagement seems strong, and everyone expects AI now.”
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-white border border-[#E8E8EA] text-xs space-y-1">
                    <span className="font-mono text-[10px] text-[#777B86] block">RESEARCH SIGNAL</span>
                    <span className="text-[#17191C]">68% stated interest in dynamic workouts</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E8E8EA] text-xs space-y-1">
                    <span className="font-mono text-[10px] text-[#777B86] block">ANALYTICS SIGNAL</span>
                    <span className="text-[#17191C]">Engagement is good in beta</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF0F0]/50 border border-[#F2D7D7] text-xs space-y-1">
                    <span className="font-mono text-[10px] text-[#B54747] block">UNEXAMINED BLIND SPOT</span>
                    <span className="text-[#17191C]">Retention impact remains untested</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E8EA] text-center text-xs font-mono text-[#777B86]">
                Outcome: Rollout committed on unverified optimism.
              </div>
            </div>

            {/* RIGHT: AFTER NIRNIK */}
            <div className="bg-[#FFFFFF] border-2 border-[#17191C] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E8EA] pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#174A3A]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#17191C] font-bold">
                      AFTER NIRNIK
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#174A3A] bg-[#DDEBE4] px-2.5 py-0.5 rounded-full font-semibold">
                    Launch with conditions
                  </span>
                </div>

                <div className="space-y-3">
                  {/* What Holds */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#174A3A] font-bold uppercase tracking-wider">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>WHAT HOLDS</span>
                    </div>
                    <p className="text-xs text-[#17191C]">
                      User interest and short-term workout completion (+16.1%) are supported by empirical telemetry.
                    </p>
                  </div>

                  {/* What Doesn't */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#B54747] font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
                      <span>WHAT DOESN’T</span>
                    </div>
                    <p className="text-xs text-[#17191C]">
                      Retention impact remains unproven without longitudinal holdout data past week 8.
                    </p>
                  </div>

                  {/* What The Jury Challenged */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#5D2A1A]/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#5D2A1A] font-bold uppercase tracking-wider">
                      <ShieldAlert className="w-3 h-3 stroke-[2.5]" />
                      <span>WHAT THE JURY CHALLENGED</span>
                    </div>
                    <p className="text-xs text-[#17191C]">
                      Full rollout assumes sustained habit formation we haven’t observed; injury risk spikes after high-strain days.
                    </p>
                  </div>

                  {/* What Would Change Our Mind & Next Action */}
                  <div className="p-3.5 rounded-2xl bg-[#DDEBE4]/30 border border-[#174A3A]/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#174A3A] font-bold uppercase tracking-wider">
                      <Lock className="w-3 h-3 stroke-[2.5]" />
                      <span>CONDITIONS & NEXT ACTION</span>
                    </div>
                    <p className="text-xs text-[#17191C]">
                      Ship to 10% holdout cohort with safety governors. Falsification trigger: flat D30 retention after 4 weeks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#17191C] text-white flex items-center justify-between text-xs font-mono">
                <span>Durable Decision Record</span>
                <span className="text-[#DDEBE4] font-medium">Committed by Lead PM</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — HOW NIRNIK THINKS: A CONTINUOUS PRODUCT JOURNEY */}
      {/* ============================================================ */}
      <section className="py-20 border-b border-[#E8E8EA] bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777B86]">
              03 · The System Architecture
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17191C] tracking-tight leading-[1.12]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              How Nirnik thinks.
            </h2>
            <p className="text-sm sm:text-base text-[#626862] leading-relaxed font-light">
              One decision moving through five disciplined stages. Each phase produces a real workspace artifact that builds upon the last.
            </p>
          </div>

          {/* Continuous Journey Flow */}
          <div className="space-y-6">
            
            {/* Stage 1: FRAME */}
            <div className="bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-6 sm:p-7 shadow-2xs hover:border-[#17191C]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 md:max-w-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#174A3A]">01 FRAME</span>
                  <span className="text-xs text-[#777B86] font-mono">· Step 1 of 5</span>
                </div>
                <h3 className="text-lg font-semibold text-[#17191C]">
                  What exactly are we deciding?
                </h3>
                <p className="text-xs text-[#626862] leading-relaxed">
                  Focus the ambiguous question into an unambiguous testable choice with explicit boundaries, options, and reversibility tier.
                </p>
              </div>

              {/* Stage 1 Real Miniature Artifact */}
              <div className="bg-[#FAF9F6] border border-[#E8E8EA] rounded-2xl p-4 md:w-80 shrink-0 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>DECISION BOUNDARY</span>
                  <span className="text-[#174A3A]">Type 1 Reversible</span>
                </div>
                <div className="font-semibold text-[#17191C]">
                  Launch AI Workout Guidance v1.0
                </div>
                <div className="text-[11px] text-[#777B86] font-mono">
                  Options: [ Full Rollout · Holdout Pilot · Kill ]
                </div>
              </div>
            </div>

            {/* Connecting Connector */}
            <div className="flex justify-center -my-3">
              <div className="w-px h-6 bg-[#E8E8EA]" />
            </div>

            {/* Stage 2: GROUND */}
            <div className="bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-6 sm:p-7 shadow-2xs hover:border-[#17191C]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 md:max-w-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#174A3A]">02 GROUND</span>
                  <span className="text-xs text-[#777B86] font-mono">· Step 2 of 5</span>
                </div>
                <h3 className="text-lg font-semibold text-[#17191C]">
                  What do we actually know?
                </h3>
                <p className="text-xs text-[#626862] leading-relaxed">
                  Separate observable telemetry from inferences and assumptions. Build the Claim Spine with strict epistemic status tags.
                </p>
              </div>

              {/* Stage 2 Real Miniature Artifact */}
              <div className="bg-[#FAF9F6] border border-[#E8E8EA] rounded-2xl p-4 md:w-80 shrink-0 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>CLAIM SPINE</span>
                  <span>4 claims verified</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center justify-between py-0.5">
                    <span className="truncate pr-2">Beta completion lift (+16.1%)</span>
                    <span className="text-[9px] font-mono text-[#174A3A] bg-[#DDEBE4] px-1 rounded">FACT</span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="truncate pr-2">Retention improvement at D30</span>
                    <span className="text-[9px] font-mono text-[#A66B16] bg-[#FDF6ED] px-1 rounded">ASSUMPTION</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Connector */}
            <div className="flex justify-center -my-3">
              <div className="w-px h-6 bg-[#E8E8EA]" />
            </div>

            {/* Stage 3: CHALLENGE */}
            <div className="bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-6 sm:p-7 shadow-2xs hover:border-[#5D2A1A]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ring-1 ring-[#5D2A1A]/5">
              <div className="space-y-2 md:max-w-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#5D2A1A]">03 CHALLENGE</span>
                  <span className="text-xs text-[#777B86] font-mono">· Step 3 of 5</span>
                </div>
                <h3 className="text-lg font-semibold text-[#17191C]">
                  Where could our reasoning fail?
                </h3>
                <p className="text-xs text-[#626862] leading-relaxed">
                  Adversarial specialists probe vulnerabilities, evaluate survivorship bias, and articulate what evidence would falsify current thinking.
                </p>
              </div>

              {/* Stage 3 Real Miniature Artifact */}
              <div className="bg-[#FAF9F6] border border-[#E8E8EA] rounded-2xl p-4 md:w-80 shrink-0 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#5D2A1A]">
                  <span className="font-bold">ADVERSARIAL JURY</span>
                  <span>UX & Systems</span>
                </div>
                <div className="text-[11px] text-[#17191C] font-medium leading-snug">
                  “Survivorship bias: early adopters completed more workouts because they were already motivated athletes.”
                </div>
              </div>
            </div>

            {/* Connecting Connector */}
            <div className="flex justify-center -my-3">
              <div className="w-px h-6 bg-[#E8E8EA]" />
            </div>

            {/* Stage 4: DECIDE */}
            <div className="bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-6 sm:p-7 shadow-2xs hover:border-[#17191C]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 md:max-w-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#17191C]">04 DECIDE</span>
                  <span className="text-xs text-[#777B86] font-mono">· Step 4 of 5</span>
                </div>
                <h3 className="text-lg font-semibold text-[#17191C]">
                  What are we willing to commit to?
                </h3>
                <p className="text-xs text-[#626862] leading-relaxed">
                  You make the final call. Nirnik synthesizes the balance of trade-offs, but the human product manager signs off on the rationale.
                </p>
              </div>

              {/* Stage 4 Real Miniature Artifact */}
              <div className="bg-[#FAF9F6] border border-[#E8E8EA] rounded-2xl p-4 md:w-80 shrink-0 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#777B86]">
                  <span>COMMITMENT</span>
                  <span className="text-[#174A3A]">Conditional</span>
                </div>
                <div className="text-xs font-semibold text-[#17191C]">
                  Staged Rollout (10% cohort)
                </div>
                <div className="text-[11px] text-[#626862]">
                  Trade-off accepted: Slower revenue growth in exchange for capped liability.
                </div>
              </div>
            </div>

            {/* Connecting Connector */}
            <div className="flex justify-center -my-3">
              <div className="w-px h-6 bg-[#E8E8EA]" />
            </div>

            {/* Stage 5: RECORD */}
            <div className="bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-6 sm:p-7 shadow-2xs hover:border-[#174A3A]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 md:max-w-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#174A3A]">05 RECORD</span>
                  <span className="text-xs text-[#777B86] font-mono">· Step 5 of 5</span>
                </div>
                <h3 className="text-lg font-semibold text-[#17191C]">
                  Why did we decide this?
                </h3>
                <p className="text-xs text-[#626862] leading-relaxed">
                  Generate a durable, versioned record with next actions, open loops, and the exact falsification triggers that would change minds.
                </p>
              </div>

              {/* Stage 5 Real Miniature Artifact */}
              <div className="bg-[#DDEBE4]/30 border border-[#174A3A]/20 rounded-2xl p-4 md:w-80 shrink-0 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#174A3A]">
                  <span className="font-bold">DURABLE ARTIFACT</span>
                  <span>Version 03</span>
                </div>
                <div className="text-xs font-semibold text-[#17191C]">
                  Audit trail committed
                </div>
                <div className="text-[11px] text-[#174A3A]/80 font-mono">
                  Trigger: Review in 14 days on holdout telemetry
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — CORE DIFFERENTIATOR: YOU MAKE THE CALL */}
      {/* ============================================================ */}
      <section className="py-24 border-b border-[#E8E8EA] bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-12">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777B86]">
              04 · The Responsibility Boundary
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#17191C] tracking-tight leading-[1.08]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Nirnik doesn’t give you an answer.<br />
              <span className="italic text-[#174A3A]">It gives your answer somewhere to stand.</span>
            </h2>
          </div>

          {/* Responsibility Visual Diagram */}
          <div className="bg-[#FAF9F6] border border-[#E8E8EA] rounded-3xl p-8 max-w-3xl mx-auto shadow-2xs">
            <div className="space-y-6">
              
              {/* Top: Human */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E8EA]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#17191C] text-white flex items-center justify-center font-mono text-xs">
                    YOU
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-[#17191C]">Product Manager</div>
                    <div className="text-[11px] text-[#777B86]">Brings the question, evidence, constraints, and business risk</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#17191C] font-semibold">Inputs</span>
              </div>

              {/* Connecting Flow */}
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#777B86]">
                <span>↓</span>
                <span>Puts reasoning under pressure</span>
                <span>↓</span>
              </div>

              {/* Center: Nirnik */}
              <div className="p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#174A3A]/40 space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-[#E8E8EA] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#174A3A]" />
                    <span className="font-mono text-xs font-bold text-[#174A3A] tracking-wider uppercase">
                      NIRNIK WORKSPACE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#777B86]">Adversarial & Epistemic</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E8E8EA]">
                    <span className="text-[#174A3A] font-bold block">AUDIT</span>
                    <span className="text-[10px] text-[#777B86]">Evidence Spine</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E8E8EA]">
                    <span className="text-[#A66B16] font-bold block">EXPOSE</span>
                    <span className="text-[10px] text-[#777B86]">Unknowns</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E8E8EA]">
                    <span className="text-[#5D2A1A] font-bold block">CHALLENGE</span>
                    <span className="text-[10px] text-[#777B86]">Specialist Jury</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E8E8EA]">
                    <span className="text-[#17191C] font-bold block">SYNTHESIZE</span>
                    <span className="text-[10px] text-[#777B86]">Trade-offs</span>
                  </div>
                </div>
              </div>

              {/* Connecting Flow */}
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#777B86]">
                <span>↓</span>
                <span>Returns evaluated synthesis</span>
                <span>↓</span>
              </div>

              {/* Bottom: Human Final Sign-off */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#17191C] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white text-[#17191C] flex items-center justify-center font-mono text-xs font-bold">
                    YOU
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white">Final Decision & Rationale</div>
                    <div className="text-[11px] text-[#B0B4BC]">You commit the rationale, sign off on conditions, and own the outcome</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#DDEBE4] font-semibold">Accountability</span>
              </div>

            </div>
          </div>

          <p className="text-base sm:text-lg text-[#17191C] font-medium max-w-xl mx-auto">
            The AI challenges the reasoning. The PM owns the decision.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — THREE CORE PRINCIPLES (WITH REAL ARTIFACTS) */}
      {/* ============================================================ */}
      <section className="py-20 border-b border-[#E8E8EA] bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777B86]">
              05 · The Core Principles
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17191C] tracking-tight leading-[1.12]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              How reasoning stays rigorous.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Principle 01: EVIDENCE */}
            <div className="bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#174A3A] font-bold">
                  01 · EVIDENCE
                </div>
                <h3 className="text-xl font-semibold text-[#17191C]">
                  Don’t let confidence outrun evidence.
                </h3>
                <p className="text-xs text-[#626862] leading-relaxed">
                  Every claim is tagged by epistemic origin. If a claim lacks verifiable telemetry or direct user observation, Nirnik marks it as an unverified assumption.
                </p>
              </div>

              {/* Real Claim Spine UI Fragment */}
              <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-2 text-xs">
                <div className="text-[10px] font-mono text-[#777B86] uppercase tracking-wider">
                  CLAIM SPINE AUDIT
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#E8E8EA] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#17191C]">Completion Lift</span>
                    <span className="text-[9px] font-mono text-[#174A3A] bg-[#DDEBE4] px-1.5 py-0.5 rounded">
                      SUPPORTED
                    </span>
                  </div>
                  <div className="text-[10px] text-[#777B86] font-mono">
                    2 sources: Telemetry report + Beta cohort
                  </div>
                </div>
              </div>
            </div>

            {/* Principle 02: CHALLENGE */}
            <div className="bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#5D2A1A] font-bold">
                  02 · CHALLENGE
                </div>
                <h3 className="text-xl font-semibold text-[#17191C]">
                  Agreement isn’t the goal.
                </h3>
                <p className="text-xs text-[#626862] leading-relaxed">
                  Nirnik deploys specialized adversarial perspectives that disagree with each other. If every specialist agrees immediately, the decision isn’t hard enough.
                </p>
              </div>

              {/* Real Specialist Clash UI Fragment */}
              <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-2 text-xs">
                <div className="text-[10px] font-mono text-[#777B86] uppercase tracking-wider">
                  SPECIALIST DISAGREEMENT
                </div>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-xl bg-white border border-[#E8E8EA] flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#17191C]">UX Researcher</span>
                    <span className="text-[9px] font-mono text-[#5D2A1A] bg-[#FAF0F0] px-1.5 py-0.5 rounded">
                      Pilot first
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#E8E8EA] flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#17191C]">Growth Analyst</span>
                    <span className="text-[9px] font-mono text-[#174A3A] bg-[#DDEBE4] px-1.5 py-0.5 rounded">
                      Full rollout
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Principle 03: DECISION */}
            <div className="bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#17191C] font-bold">
                  03 · DECISION
                </div>
                <h3 className="text-xl font-semibold text-[#17191C]">
                  AI doesn’t make the call.
                </h3>
                <p className="text-xs text-[#626862] leading-relaxed">
                  Autonomous agents cannot be fired when a product bets the company’s runway. The human PM commits the trade-off and owns the audit history.
                </p>
              </div>

              {/* Real Human Sign-off UI Fragment */}
              <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-2 text-xs">
                <div className="text-[10px] font-mono text-[#777B86] uppercase tracking-wider">
                  DECISION COMMITTED
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#E8E8EA] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#17191C]">Controlled Rollout</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#174A3A]" />
                  </div>
                  <div className="text-[10px] text-[#777B86]">
                    Rationale committed by Lead PM · Audit lock active
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — CONSEQUENT DECISIONS (REAL CONTEXT QUESTIONS) */}
      {/* ============================================================ */}
      <section className="py-20 border-b border-[#E8E8EA] bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777B86]">
              06 · Application Scope
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17191C] tracking-tight leading-[1.12]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Bring Nirnik in when the decision is expensive to get wrong.
            </h2>
            <p className="text-sm sm:text-base text-[#626862] leading-relaxed font-light">
              Don’t use Nirnik for button colors. Use it when failure costs quarters of runway or customer trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Context 1 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-2 hover:border-[#17191C] transition-all">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#174A3A] font-bold block">
                FEATURE LAUNCH
              </span>
              <h3 className="text-sm font-semibold text-[#17191C]">
                “Should we roll out AI recommendations to all active tiers?”
              </h3>
              <p className="text-xs text-[#626862]">
                Evaluating novelty drop-off, server inference economics, and cohort retention decay.
              </p>
            </div>

            {/* Context 2 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-2 hover:border-[#17191C] transition-all">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#174A3A] font-bold block">
                PRICING CHANGE
              </span>
              <h3 className="text-sm font-semibold text-[#17191C]">
                “Can we unbundle enterprise seats without triggering seat contraction?”
              </h3>
              <p className="text-xs text-[#626862]">
                Stress-testing grandfathering terms against enterprise renewal churn risk.
              </p>
            </div>

            {/* Context 3 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-2 hover:border-[#17191C] transition-all">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#174A3A] font-bold block">
                PRODUCT SUNSET
              </span>
              <h3 className="text-sm font-semibold text-[#17191C]">
                “Should we deprecate the v1 public API before parity reaches 100%?”
              </h3>
              <p className="text-xs text-[#626862]">
                Auditing partner integration fallout, migration blockers, and contractual SLAs.
              </p>
            </div>

            {/* Context 4 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-2 hover:border-[#17191C] transition-all">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#174A3A] font-bold block">
                PLATFORM MIGRATION
              </span>
              <h3 className="text-sm font-semibold text-[#17191C]">
                “Do we rebuild billing in-house or migrate to Stripe Billing?”
              </h3>
              <p className="text-xs text-[#626862]">
                Weighing custom ledger flexibility against six months of deferred roadmap velocity.
              </p>
            </div>

            {/* Context 5 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-2 hover:border-[#17191C] transition-all">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#174A3A] font-bold block">
                MARKET ENTRY
              </span>
              <h3 className="text-sm font-semibold text-[#17191C]">
                “Is mid-market self-serve viable without dedicated sales engineering?”
              </h3>
              <p className="text-xs text-[#626862]">
                Testing customer willingness to self-provision complex SAML/SSO configs.
              </p>
            </div>

            {/* Context 6 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F6] border border-[#E8E8EA] space-y-2 hover:border-[#17191C] transition-all">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#174A3A] font-bold block">
                MAJOR STRATEGIC BET
              </span>
              <h3 className="text-sm font-semibold text-[#17191C]">
                “Should we pivot from synchronous canvas to asynchronous decision audit?”
              </h3>
              <p className="text-xs text-[#626862]">
                Confronting workflow switching costs and executive stakeholder buy-in.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8 — DECISION RECORD: A DECISION SHOULDN'T DISAPPEAR */}
      {/* ============================================================ */}
      <section className="py-20 border-b border-[#E8E8EA] bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777B86]">
              07 · The Durable Artifact
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17191C] tracking-tight leading-[1.12]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              A decision shouldn’t disappear after the meeting.
            </h2>
            <p className="text-sm sm:text-base text-[#626862] leading-relaxed font-light">
              Nirnik turns transient executive meetings into structured, audit-proof records that protect future teams from repeat mistakes.
            </p>
          </div>

          {/* Large Realistic Nirnik Decision Record Artifact */}
          <div className="bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Record Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8EA] pb-6">
              <div>
                <div className="text-[10px] font-mono text-[#777B86] uppercase tracking-widest">
                  DECISION RECORD · FITPULSE-REC-01
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17191C] mt-1">
                  AI-Powered Workout Recommendations
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#DDEBE4] text-[#174A3A]">
                  Launch with conditions
                </span>
                <span className="text-xs font-mono text-[#777B86]">
                  Version 03
                </span>
              </div>
            </div>

            {/* Core Question & Stance */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#777B86]">
                DECISION QUESTION
              </span>
              <p className="text-base font-semibold text-[#17191C]">
                Should we launch AI-powered recommendations to all users?
              </p>
            </div>

            {/* Grid of Audit Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* What We Knew */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA]">
                <div className="text-xs font-mono font-bold text-[#174A3A] uppercase tracking-wider">
                  WHAT WE KNEW
                </div>
                <p className="text-xs text-[#17191C] leading-relaxed">
                  Pilot cohort (n=5,000) demonstrated a 48.2% completion rate vs 32.1% control group (+16.1% lift, p &lt; 0.001). Mean inference latency 380ms.
                </p>
              </div>

              {/* What We Didn't Know */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA]">
                <div className="text-xs font-mono font-bold text-[#A66B16] uppercase tracking-wider">
                  WHAT WE DIDN’T KNOW
                </div>
                <p className="text-xs text-[#17191C] leading-relaxed">
                  Longitudinal retention past week 8. Injury frequency during consecutive high-strain training cycles remains unmonitored.
                </p>
              </div>

              {/* What The Jury Challenged */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA]">
                <div className="text-xs font-mono font-bold text-[#5D2A1A] uppercase tracking-wider">
                  WHAT THE JURY CHALLENGED
                </div>
                <p className="text-xs text-[#17191C] leading-relaxed">
                  Conflating early adopter curiosity with durable habit formation. UX research recommended pilot before full rollout.
                </p>
              </div>

              {/* What Changed */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA]">
                <div className="text-xs font-mono font-bold text-[#17191C] uppercase tracking-wider">
                  WHAT CHANGED AFTER CHALLENGE
                </div>
                <p className="text-xs text-[#17191C] leading-relaxed">
                  <span className="line-through text-[#777B86]">Full rollout</span> → 10% holdout cohort rollout with strain-governor safety guardrails.
                </p>
              </div>

              {/* What Would Change Our Mind */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8EA]">
                <div className="text-xs font-mono font-bold text-[#B54747] uppercase tracking-wider">
                  WHAT WOULD CHANGE OUR MIND
                </div>
                <p className="text-xs text-[#17191C] leading-relaxed">
                  Holdout cohort exhibits flat or negative D30 retention after 4 weeks, or compound exercise strain exceeds 1.5%.
                </p>
              </div>

              {/* Next Evidence Action */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#DDEBE4]/40 border border-[#174A3A]/20">
                <div className="text-xs font-mono font-bold text-[#174A3A] uppercase tracking-wider">
                  NEXT EVIDENCE ACTION
                </div>
                <p className="text-xs text-[#17191C] leading-relaxed">
                  Run 14-day holdout telemetry audit on week-4 churn; audit unit economics at 50k DAU.
                </p>
              </div>

            </div>

            {/* Record Footer */}
            <div className="pt-4 border-t border-[#E8E8EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-[#777B86]">
              <div>
                Committed 24 September 2026 · Signed by Principal PM
              </div>
              <div className="text-[#174A3A] font-medium">
                The decision becomes a durable artifact.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 9 — DEMO INVITATION (REAL DEMO DECISION) */}
      {/* ============================================================ */}
      <section className="py-20 border-b border-[#E8E8EA] bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#777B86]">
            08 · Interactive Demonstration
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17191C] tracking-tight leading-[1.12]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            See Nirnik challenge a real decision.
          </h2>
          <p className="text-base text-[#626862] leading-relaxed max-w-xl mx-auto font-light">
            Take a consequential product decision from question to evidence to challenge to final call in three minutes.
          </p>

          <div className="pt-4">
            <button
              type="button"
              onClick={onStartDemoDecision}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-[#17191C] hover:bg-[#2D3139] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] group"
            >
              <span>Run the 3-minute decision</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 10 — FINAL CTA & RECENT STORED DECISIONS */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          
          {/* Final Editorial Callout */}
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2
              className="text-4xl sm:text-5xl font-normal text-[#17191C] tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Have a decision worth defending?
            </h2>
            <p className="text-base text-[#626862]">
              Bring it to Nirnik.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={onStartNewDecision}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#17191C] hover:bg-[#2D3139] shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <span>Start a decision</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onStartDemoDecision}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-[#777B86] hover:text-[#17191C] transition-colors underline-offset-4 hover:underline cursor-pointer"
              >
                <span>Explore the 3-minute example</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stored Decisions Archive (Preserved for existing records) */}
          <div className="pt-12 border-t border-[#E8E8EA] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#777B86]">
                  Recent Stored Decisions
                </h3>
                <p className="text-xs text-[#626862] mt-0.5">
                  Your persistent local decision records and audit histories.
                </p>
              </div>

              {listings.length > 0 && onOpenDecisionsList && (
                <button
                  type="button"
                  onClick={onOpenDecisionsList}
                  className="text-xs font-medium text-[#17191C] hover:underline cursor-pointer"
                >
                  View all ({listings.length}) →
                </button>
              )}
            </div>

            {decisionsState.status === 'loading' ? (
              <div className="p-6 text-center text-xs font-mono text-[#777B86] bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl">
                Loading decision records...
              </div>
            ) : listings.length > 0 ? (
              <div className="space-y-3">
                {listings.slice(0, 5).map((d) => (
                  <div
                    key={d.id}
                    onClick={() => onOpenStoredDecision(d.id)}
                    className="p-4 sm:p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] hover:border-[#17191C] transition-all cursor-pointer shadow-2xs group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2">
                        {getStateBadge(d.state)}
                        {d.isSample && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-[#FBE1D1] text-[#5D2A1A]">
                            Sample
                          </span>
                        )}
                        {d.openLoops > 0 && (
                          <span className="text-[11px] font-mono text-[#A66B16]">
                            {d.openLoops} {d.openLoops === 1 ? 'check' : 'checks'}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-[#17191C] group-hover:text-[#174A3A] transition-colors truncate">
                        {d.decisionQuestion}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-xs font-mono text-[#777B86]">
                      <span>Updated {formatUpdatedDate(d.lastActivityAt)}</span>
                      <ArrowRight className="w-4 h-4 text-[#B0B4BC] group-hover:text-[#17191C] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-3 shadow-2xs">
                <p className="text-sm font-semibold text-[#17191C]">
                  No local decisions stored yet.
                </p>
                <p className="text-xs text-[#626862] max-w-md mx-auto">
                  Start a new decision or run the 3-minute sample to generate your first audit record.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={onStartDemoDecision}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#17191C] bg-[#FAF9F6] hover:bg-[#F2F2F3] border border-[#E8E8EA] transition-all cursor-pointer"
                  >
                    <span>Run the 3-minute decision →</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
