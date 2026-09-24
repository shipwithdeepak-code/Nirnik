import React, { useEffect, useState } from 'react';
import { Plus, Play, ArrowRight, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto py-12 sm:py-20 px-4 sm:px-6 space-y-20">
      {/* SECTION 1 — HERO */}
      <section className="space-y-8 pt-4">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8E8EA] text-[11px] font-mono uppercase tracking-widest text-[#777B86]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#174A3A]" />
            NIRNIK · AI DECISION WORKSPACE
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#17191C] tracking-tight leading-[1.08]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Challenge the thinking.<br />
            <span className="italic text-[#174A3A]">Defend the decision.</span>
          </h1>
        </div>

        <p className="text-base sm:text-lg text-[#626862] leading-relaxed max-w-2xl font-light">
          Nirnik stress-tests consequential product decisions against evidence, assumptions, and opposing perspectives before you commit.
        </p>

        <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs font-mono text-[#777B86] border-l-2 border-[#17191C] pl-4 py-1">
          <span className="text-[#17191C] font-semibold">You make the call.</span>
          <span className="hidden sm:inline text-[#D6D9D2]" aria-hidden="true">/</span>
          <span>Nirnik makes the thinking harder.</span>
        </div>

        <div className="flex flex-wrap items-center gap-3.5 pt-4">
          <button
            type="button"
            onClick={onStartNewDecision}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#17191C] hover:bg-[#2D3139] shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ New decision</span>
          </button>

          <button
            type="button"
            onClick={onStartDemoDecision}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-medium text-[#17191C] bg-[#FFFFFF] hover:bg-[#F2F2F3] border border-[#E8E8EA] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] cursor-pointer shadow-2xs"
          >
            <Play className="w-3.5 h-3.5 fill-[#174A3A] text-[#174A3A]" />
            <span>▶ Try a 3-minute demo</span>
          </button>
        </div>
      </section>

      {/* SECTION 2 — HOW NIRNIK WORKS */}
      <section className="space-y-5 pt-8 border-t border-[#E8E8EA]">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#777B86]">
            How Nirnik works
          </h2>
          <span className="text-[11px] text-[#777B86] font-mono">End-to-end deliberation</span>
        </div>

        {/* Desktop / Tablet progression flow */}
        <div className="hidden md:grid grid-cols-6 gap-2 items-center bg-[#FFFFFF] border border-[#E8E8EA] rounded-3xl p-5 text-center shadow-2xs">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-[#777B86] block">01</span>
            <span className="text-xs font-medium text-[#17191C] block leading-tight">Your decision</span>
          </div>
          <div className="space-y-1.5 border-l border-[#E8E8EA] pl-2">
            <span className="text-[10px] font-mono text-[#777B86] block">02</span>
            <span className="text-xs font-medium text-[#17191C] block leading-tight">Evidence + assumptions</span>
          </div>
          <div className="space-y-1.5 border-l border-[#E8E8EA] pl-2">
            <span className="text-[10px] font-mono text-[#777B86] block">03</span>
            <span className="text-xs font-medium text-[#17191C] block leading-tight">Specialists challenge it</span>
          </div>
          <div className="space-y-1.5 border-l border-[#E8E8EA] pl-2">
            <span className="text-[10px] font-mono text-[#777B86] block">04</span>
            <span className="text-xs font-medium text-[#17191C] block leading-tight">You respond</span>
          </div>
          <div className="space-y-1.5 border-l border-[#E8E8EA] pl-2">
            <span className="text-[10px] font-mono text-[#777B86] block">05</span>
            <span className="text-xs font-medium text-[#17191C] block leading-tight">You make the call</span>
          </div>
          <div className="space-y-1.5 border-l border-[#E8E8EA] pl-2">
            <span className="text-[10px] font-mono text-[#174A3A] block">06</span>
            <span className="text-xs font-semibold text-[#174A3A] block leading-tight">Decision record</span>
          </div>
        </div>

        {/* Mobile progression flow */}
        <div className="md:hidden bg-[#FFFFFF] border border-[#E8E8EA] rounded-2xl divide-y divide-[#E8E8EA] text-xs">
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[#626862]">01 Your decision</span>
            <span className="text-[#777B86]">↓</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[#626862]">02 Evidence + assumptions</span>
            <span className="text-[#777B86]">↓</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[#626862]">03 Specialists challenge it</span>
            <span className="text-[#777B86]">↓</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[#626862]">04 You respond</span>
            <span className="text-[#777B86]">↓</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[#626862]">05 You make the call</span>
            <span className="text-[#777B86]">↓</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between bg-[#F2F2F3]/60 rounded-b-2xl">
            <span className="font-semibold text-[#174A3A]">06 Decision record</span>
            <span className="text-[10px] font-mono text-[#174A3A]">Durable</span>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FIVE PHASES */}
      <section className="space-y-5 pt-8 border-t border-[#E8E8EA]">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#777B86]">
          Five Phases
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-3xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-2 shadow-2xs hover:border-[#D6D9D2] transition-all">
            <div className="text-[10px] font-mono font-bold text-[#174A3A]">01 FRAME</div>
            <div className="text-xs font-medium text-[#17191C]">Define the decision</div>
            <p className="text-[11px] text-[#777B86] leading-relaxed">
              Focus the question into an unambiguous testable choice.
            </p>
          </div>

          <div className="p-4 rounded-3xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-2 shadow-2xs hover:border-[#D6D9D2] transition-all">
            <div className="text-[10px] font-mono font-bold text-[#174A3A]">02 GROUND</div>
            <div className="text-xs font-medium text-[#17191C]">Separate evidence from assumptions</div>
            <p className="text-[11px] text-[#777B86] leading-relaxed">
              Assign epistemic status: facts, inferences, and unverified assumptions.
            </p>
          </div>

          <div className="p-4 rounded-3xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-2 shadow-2xs hover:border-[#D6D9D2] transition-all">
            <div className="text-[10px] font-mono font-bold text-[#174A3A]">03 CHALLENGE</div>
            <div className="text-xs font-medium text-[#17191C]">Expose weak points</div>
            <p className="text-[11px] text-[#777B86] leading-relaxed">
              Adversarial perspectives probe vulnerabilities and articulate disagreements.
            </p>
          </div>

          <div className="p-4 rounded-3xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-2 shadow-2xs hover:border-[#D6D9D2] transition-all">
            <div className="text-[10px] font-mono font-bold text-[#174A3A]">04 DECIDE</div>
            <div className="text-xs font-medium text-[#17191C]">You make the final call</div>
            <p className="text-[11px] text-[#777B86] leading-relaxed">
              Evaluate synthesis, review trade-offs, and commit your rationale.
            </p>
          </div>

          <div className="p-4 rounded-3xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-2 shadow-2xs hover:border-[#D6D9D2] transition-all">
            <div className="text-[10px] font-mono font-bold text-[#174A3A]">05 RECORD</div>
            <div className="text-xs font-medium text-[#17191C]">Preserve why you decided</div>
            <p className="text-[11px] text-[#777B86] leading-relaxed">
              Audit-ready history, conditions that would change minds, and next actions.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT NIRNIK IS FOR */}
      <section className="space-y-5 pt-8 border-t border-[#E8E8EA]">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#777B86]">
          Built for consequential product decisions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-1">
            <span className="font-medium text-[#17191C] block">• Feature launches</span>
            <span className="text-[11px] text-[#777B86] block">Rollout criteria & holdouts</span>
          </div>
          <div className="p-3.5 rounded-2xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-1">
            <span className="font-medium text-[#17191C] block">• Pricing changes</span>
            <span className="text-[11px] text-[#777B86] block">Monetization risk & churn limits</span>
          </div>
          <div className="p-3.5 rounded-2xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-1">
            <span className="font-medium text-[#17191C] block">• Market entry</span>
            <span className="text-[11px] text-[#777B86] block">Willingness to pay & moat defense</span>
          </div>
          <div className="p-3.5 rounded-2xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-1">
            <span className="font-medium text-[#17191C] block">• Product sunset</span>
            <span className="text-[11px] text-[#777B86] block">Deprecation impact & migration paths</span>
          </div>
          <div className="p-3.5 rounded-2xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-1">
            <span className="font-medium text-[#17191C] block">• Platform migrations</span>
            <span className="text-[11px] text-[#777B86] block">API contracts & technical debt</span>
          </div>
          <div className="p-3.5 rounded-2xl border border-[#E8E8EA] bg-[#FFFFFF] space-y-1">
            <span className="font-medium text-[#17191C] block">• Major product bets</span>
            <span className="text-[11px] text-[#777B86] block">Strategic trade-offs & capital allocation</span>
          </div>
        </div>
      </section>

      {/* SECTION 5 — THREE CORE PRINCIPLES */}
      <section className="space-y-5 pt-8 border-t border-[#E8E8EA]">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#777B86]">
          Three Core Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 shadow-2xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#174A3A] font-semibold">
              Evidence
            </div>
            <div className="text-sm font-semibold text-[#17191C]">
              What do we actually know?
            </div>
            <p className="text-xs text-[#626862] leading-relaxed">
              Every inference must trace back to observable artifacts, user research, or telemetry. Unsubstantiated claims are labeled as assumptions.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 shadow-2xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#A66B16] font-semibold">
              Challenge
            </div>
            <div className="text-sm font-semibold text-[#17191C]">
              Where could our reasoning fail?
            </div>
            <p className="text-xs text-[#626862] leading-relaxed">
              Specialists probe vulnerabilities, evaluate survivorship bias, and articulate what evidence would falsify current thinking.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-2 shadow-2xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#17191C] font-semibold">
              Decision
            </div>
            <div className="text-sm font-semibold text-[#17191C]">
              What are we willing to commit to?
            </div>
            <p className="text-xs text-[#626862] leading-relaxed">
              Nirnik does not make autonomous decisions. The human product manager commits the rationale and signs off on the durable record.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — RECENT DECISIONS */}
      <section className="space-y-5 pt-8 border-t border-[#E8E8EA] pb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#777B86]">
            Recent Decisions
          </h2>
          {listings.length > 0 && onOpenDecisionsList && (
            <button
              type="button"
              onClick={onOpenDecisionsList}
              className="text-xs font-medium text-[#17191C] hover:underline"
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
                  <h3 className="text-sm sm:text-base font-semibold text-[#17191C] group-hover:text-[#174A3A] transition-colors truncate">
                    {d.decisionQuestion}
                  </h3>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-xs font-mono text-[#777B86]">
                  <span>Updated {formatUpdatedDate(d.lastActivityAt)}</span>
                  <ArrowRight className="w-4 h-4 text-[#B0B4BC] group-hover:text-[#17191C] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-12 text-center rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-4 shadow-2xs">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#17191C]">
                No decisions yet.
              </p>
              <p className="text-xs text-[#626862] max-w-md mx-auto">
                Start with a realistic product decision and see Nirnik stress-test it against evidence, assumptions, and opposing perspectives.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={onStartDemoDecision}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#17191C] bg-[#FAF9F6] hover:bg-[#F2F2F3] border border-[#E8E8EA] transition-all shadow-2xs cursor-pointer"
              >
                <Play className="w-3 h-3 fill-[#174A3A] text-[#174A3A]" />
                <span>Try a 3-minute demo →</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
