import React, { useEffect, useState } from 'react';
import { Plus, Play, ArrowRight, ChevronRight, Layers, ShieldCheck, Cpu } from 'lucide-react';
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
          <span className="inline-flex items-center text-[11px] font-medium text-[#174A3A]">
            Provisional
          </span>
        );
      case 'awaiting_evidence':
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-[#A66B16]">
            Awaiting evidence
          </span>
        );
      case 'waiting_on_a_check':
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-[#626862]">
            Waiting on check
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-[#B54747]">
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-[#626862]">
            Active
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 sm:py-16 px-4 sm:px-6 space-y-16">
      {/* SECTION 1 — HERO */}
      <section className="space-y-6 pt-2">
        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#174A3A] font-semibold">
            NIRNIK · AI DECISION WORKSPACE
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#171A18] tracking-tight leading-[1.12]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Challenge the thinking.<br />
            <span className="italic text-[#174A3A]">Defend the decision.</span>
          </h1>
        </div>

        <p className="text-sm sm:text-base text-[#626862] leading-relaxed max-w-2xl">
          Nirnik stress-tests consequential product decisions against evidence, assumptions, and opposing perspectives before you commit.
        </p>

        <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs font-mono text-[#8A908A] border-l-2 border-[#174A3A] pl-3 py-0.5">
          <span className="text-[#171A18] font-medium">You make the call.</span>
          <span className="hidden sm:inline text-[#D6D9D2]" aria-hidden="true">/</span>
          <span>Nirnik makes the thinking harder.</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-3">
          <button
            type="button"
            onClick={onStartNewDecision}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#174A3A] hover:bg-[#10372C] shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ New decision</span>
          </button>

          <button
            type="button"
            onClick={onStartDemoDecision}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-[#171A18] bg-[#FFFFFF] hover:bg-[#F2F3EF] border border-[#E5E7E2] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] cursor-pointer"
          >
            <Play className="w-3 h-3 fill-[#174A3A] text-[#174A3A]" />
            <span>▶ Try a 3-minute demo</span>
          </button>
        </div>
      </section>

      {/* SECTION 2 — HOW NIRNIK WORKS */}
      <section className="space-y-4 pt-4 border-t border-[#E5E7E2]">
        <h2 className="text-xs font-mono uppercase tracking-wider text-[#8A908A]">
          How Nirnik works
        </h2>

        {/* Desktop / Tablet progression flow */}
        <div className="hidden md:grid grid-cols-6 gap-2 items-center bg-[#FFFFFF] border border-[#E5E7E2] rounded-xl p-4 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#8A908A] block">01</span>
            <span className="text-xs font-medium text-[#171A18] block leading-tight">Your decision</span>
          </div>
          <div className="space-y-1 border-l border-[#E5E7E2] pl-2">
            <span className="text-[10px] font-mono text-[#8A908A] block">02</span>
            <span className="text-xs font-medium text-[#171A18] block leading-tight">Evidence + assumptions</span>
          </div>
          <div className="space-y-1 border-l border-[#E5E7E2] pl-2">
            <span className="text-[10px] font-mono text-[#8A908A] block">03</span>
            <span className="text-xs font-medium text-[#171A18] block leading-tight">Specialists challenge it</span>
          </div>
          <div className="space-y-1 border-l border-[#E5E7E2] pl-2">
            <span className="text-[10px] font-mono text-[#8A908A] block">04</span>
            <span className="text-xs font-medium text-[#171A18] block leading-tight">You respond</span>
          </div>
          <div className="space-y-1 border-l border-[#E5E7E2] pl-2">
            <span className="text-[10px] font-mono text-[#8A908A] block">05</span>
            <span className="text-xs font-medium text-[#171A18] block leading-tight">You make the call</span>
          </div>
          <div className="space-y-1 border-l border-[#E5E7E2] pl-2">
            <span className="text-[10px] font-mono text-[#8A908A] block">06</span>
            <span className="text-xs font-medium text-[#174A3A] block leading-tight">Decision record</span>
          </div>
        </div>

        {/* Mobile progression flow */}
        <div className="md:hidden bg-[#FFFFFF] border border-[#E5E7E2] rounded-xl divide-y divide-[#E5E7E2] text-xs">
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-[#626862]">01 Your decision</span>
            <span className="text-[#8A908A]">↓</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-[#626862]">02 Evidence + assumptions</span>
            <span className="text-[#8A908A]">↓</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-[#626862]">03 Specialists challenge it</span>
            <span className="text-[#8A908A]">↓</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-[#626862]">04 You respond</span>
            <span className="text-[#8A908A]">↓</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-[#626862]">05 You make the call</span>
            <span className="text-[#8A908A]">↓</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between bg-[#F2F3EF]/50">
            <span className="font-medium text-[#174A3A]">06 Decision record</span>
            <span className="text-[10px] font-mono text-[#174A3A]">Durable</span>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FIVE PHASES */}
      <section className="space-y-4 pt-4 border-t border-[#E5E7E2]">
        <h2 className="text-xs font-mono uppercase tracking-wider text-[#8A908A]">
          Five Phases
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-1.5">
            <div className="text-[11px] font-mono font-semibold text-[#174A3A]">01 FRAME</div>
            <div className="text-xs font-medium text-[#171A18]">Define the decision</div>
            <p className="text-[11px] text-[#626862] leading-relaxed">
              Focus the question into an unambiguous testable choice.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-1.5">
            <div className="text-[11px] font-mono font-semibold text-[#174A3A]">02 GROUND</div>
            <div className="text-xs font-medium text-[#171A18]">Separate evidence from assumptions</div>
            <p className="text-[11px] text-[#626862] leading-relaxed">
              Assign epistemic status: facts, inferences, and unverified assumptions.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-1.5">
            <div className="text-[11px] font-mono font-semibold text-[#174A3A]">03 CHALLENGE</div>
            <div className="text-xs font-medium text-[#171A18]">Expose weak points</div>
            <p className="text-[11px] text-[#626862] leading-relaxed">
              Adversarial perspectives probe vulnerabilities and articulate disagreements.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-1.5">
            <div className="text-[11px] font-mono font-semibold text-[#174A3A]">04 DECIDE</div>
            <div className="text-xs font-medium text-[#171A18]">You make the final call</div>
            <p className="text-[11px] text-[#626862] leading-relaxed">
              Evaluate synthesis, review trade-offs, and commit your rationale.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-1.5">
            <div className="text-[11px] font-mono font-semibold text-[#174A3A]">05 RECORD</div>
            <div className="text-xs font-medium text-[#171A18]">Preserve why you decided</div>
            <p className="text-[11px] text-[#626862] leading-relaxed">
              Audit-ready history, conditions that would change minds, and next actions.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT NIRNIK IS FOR */}
      <section className="space-y-4 pt-4 border-t border-[#E5E7E2]">
        <h2 className="text-xs font-mono uppercase tracking-wider text-[#8A908A]">
          Built for consequential product decisions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-[#E5E7E2] bg-[#FFFFFF] space-y-0.5">
            <span className="font-medium text-[#171A18] block">• Feature launches</span>
            <span className="text-[11px] text-[#8A908A] block">Rollout criteria & holdouts</span>
          </div>

          <div className="p-3 rounded-lg border border-[#E5E7E2] bg-[#FFFFFF] space-y-0.5">
            <span className="font-medium text-[#171A18] block">• Pricing changes</span>
            <span className="text-[11px] text-[#8A908A] block">Packaging & churn exposure</span>
          </div>

          <div className="p-3 rounded-lg border border-[#E5E7E2] bg-[#FFFFFF] space-y-0.5">
            <span className="font-medium text-[#171A18] block">• Market entry</span>
            <span className="text-[11px] text-[#8A908A] block">Segment viability & positioning</span>
          </div>

          <div className="p-3 rounded-lg border border-[#E5E7E2] bg-[#FFFFFF] space-y-0.5">
            <span className="font-medium text-[#171A18] block">• Product sunset</span>
            <span className="text-[11px] text-[#8A908A] block">Deprecation costs & migration</span>
          </div>

          <div className="p-3 rounded-lg border border-[#E5E7E2] bg-[#FFFFFF] space-y-0.5">
            <span className="font-medium text-[#171A18] block">• Platform migrations</span>
            <span className="text-[11px] text-[#8A908A] block">Infrastructure risk & latency</span>
          </div>

          <div className="p-3 rounded-lg border border-[#E5E7E2] bg-[#FFFFFF] space-y-0.5">
            <span className="font-medium text-[#171A18] block">• Major product bets</span>
            <span className="text-[11px] text-[#8A908A] block">Irreversible technical investments</span>
          </div>
        </div>
      </section>

      {/* SECTION 5 — THREE CORE PRINCIPLES */}
      <section className="space-y-4 pt-4 border-t border-[#E5E7E2]">
        <h2 className="text-xs font-mono uppercase tracking-wider text-[#8A908A]">
          Three Core Principles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-1.5">
            <div className="text-xs font-semibold text-[#174A3A] uppercase tracking-wide">
              Evidence
            </div>
            <div className="text-sm font-medium text-[#171A18]">
              What do we actually know?
            </div>
            <p className="text-xs text-[#626862] leading-relaxed">
              Ground every claim in empirical telemetry and user research rather than untested narratives.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-1.5">
            <div className="text-xs font-semibold text-[#174A3A] uppercase tracking-wide">
              Challenge
            </div>
            <div className="text-sm font-medium text-[#171A18]">
              Where could our reasoning fail?
            </div>
            <p className="text-xs text-[#626862] leading-relaxed">
              Stress-test fragile assumptions with adversarial perspectives before committing capital and team effort.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] space-y-1.5">
            <div className="text-xs font-semibold text-[#174A3A] uppercase tracking-wide">
              Decision
            </div>
            <div className="text-sm font-medium text-[#171A18]">
              What are we willing to commit to?
            </div>
            <p className="text-xs text-[#626862] leading-relaxed">
              Own the trade-offs explicitly. Nirnik never makes the decision for you—accountability stays with the PM.
            </p>
          </div>
        </div>

        <p className="text-xs text-[#8A908A] font-mono leading-relaxed pt-1">
          Nirnik is not an autonomous decision maker. It structures evidence, exposes disagreement, and holds the line on rigorous product thinking.
        </p>
      </section>

      {/* SECTION 6 — RECENT DECISIONS */}
      <section className="space-y-4 pt-4 border-t border-[#E5E7E2] pb-6">
        <div className="flex items-center justify-between text-xs text-[#8A908A] font-medium">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#8A908A]">
            Recent decisions
          </h2>
          {listings.length > 0 && onOpenDecisionsList && (
            <button
              type="button"
              onClick={onOpenDecisionsList}
              className="text-[#626862] hover:text-[#171A18] underline underline-offset-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A] cursor-pointer"
            >
              View all ({listings.length})
            </button>
          )}
        </div>

        {decisionsState.status === 'loading' ? (
          <div className="py-8 text-center text-xs text-[#8A908A] bg-[#FFFFFF] border border-[#E5E7E2] rounded-xl font-mono">
            Reading decisions kept on this device…
          </div>
        ) : listings.length === 0 ? (
          <div className="py-10 px-5 text-center bg-[#FFFFFF] border border-[#E5E7E2] rounded-xl space-y-3">
            <div className="text-sm font-medium text-[#171A18]">No decisions yet.</div>
            <p className="text-xs text-[#626862] max-w-md mx-auto leading-relaxed">
              Start with a realistic product decision and see Nirnik stress-test it.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onStartDemoDecision}
                className="inline-flex items-center gap-1.5 text-xs text-[#174A3A] hover:text-[#10372C] font-semibold group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A] cursor-pointer"
              >
                <span>Try a 3-minute demo</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#FFFFFF] border border-[#E5E7E2] rounded-xl divide-y divide-[#E5E7E2] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-4 py-2.5 text-[11px] font-mono text-[#8A908A] uppercase tracking-wider bg-[#F7F7F4]/60">
              <div className="col-span-8">Decision</div>
              <div className="col-span-2 text-right sm:text-left">Status</div>
              <div className="col-span-2 text-right">Updated</div>
            </div>

            {/* Table Rows */}
            {listings.slice(0, 6).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenStoredDecision(item.id)}
                className="w-full grid grid-cols-12 px-4 py-3.5 items-center text-left text-xs hover:bg-[#F2F3EF]/60 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A] cursor-pointer"
              >
                <div className="col-span-8 pr-3 min-w-0">
                  <div className="font-medium text-[#171A18] truncate group-hover:text-[#174A3A] transition-colors">
                    {item.decisionQuestion}
                  </div>
                  {item.isSample && (
                    <span className="text-[10px] font-mono text-[#8A908A]">Sample decision</span>
                  )}
                </div>

                <div className="col-span-2 text-right sm:text-left">
                  {getStateBadge(item.state)}
                </div>

                <div className="col-span-2 text-right text-[11px] text-[#8A908A] font-mono">
                  {formatUpdatedDate(item.lastActivityAt)}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
