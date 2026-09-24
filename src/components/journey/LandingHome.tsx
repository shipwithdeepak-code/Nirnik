import React, { useEffect, useState } from 'react';
import { Plus, Play, Clock, ArrowRight, ShieldCheck, HelpCircle, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { listStoredDecisions, type StoredDecisions } from '../../services/decisionPersistence';
import type { DecisionListing } from '../../../server/decision/decision';

interface LandingHomeProps {
  onStartNewDecision: () => void;
  onStartDemoDecision: () => void;
  onOpenStoredDecision: (id: string) => void;
}

export const LandingHome: React.FC<LandingHomeProps> = ({
  onStartNewDecision,
  onStartDemoDecision,
  onOpenStoredDecision,
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 mb-2">
          <span>Product Jury 2.0</span>
          <span className="text-stone-400">·</span>
          <span>Guided Decision Defense</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-stone-900 dark:text-stone-50 font-normal leading-[1.15]">
          Challenge the product.{' '}
          <span className="italic block sm:inline font-normal text-stone-600 dark:text-stone-300">
            Defend the decision.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
          A structured AI jury that tests your consequential product call against evidence,
          hidden assumptions, and opposing specialist perspectives — keeping you as the final decision maker.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <button
            type="button"
            onClick={onStartNewDecision}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white shadow-md transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New decision</span>
          </button>

          <button
            type="button"
            onClick={onStartDemoDecision}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Play className="w-4 h-4 fill-amber-600 text-amber-600 dark:text-amber-400 dark:fill-amber-400" />
            <span>Try a demo decision</span>
            <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300 ml-1">
              (3 min)
            </span>
          </button>
        </div>
      </section>

      {/* 5-Phase Journey Explainer Banner */}
      <section className="mb-14 p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/40 backdrop-blur-sm shadow-sm">
        <h2 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-4 font-semibold">
          The 5-Phase Decision Defense Workflow
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-700/30">
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">01</span>
            <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-1">FRAME</h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Sharpen the consequential question</p>
          </div>

          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-700/30">
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">02</span>
            <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-1">GROUND</h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Map claims & expose unknowns</p>
          </div>

          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-700/30">
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">03</span>
            <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-1">CHALLENGE</h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Specialist jury stress-tests & PM responds</p>
          </div>

          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-700/30">
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">04</span>
            <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-1">DECIDE</h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Review synthesis & make the call</p>
          </div>

          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-700/30 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">05</span>
            <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-1">RECORD</h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Preserve durable decision rationale</p>
          </div>
        </div>
      </section>

      {/* Recent Decisions Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-500" />
            <h2 className="text-sm font-semibold uppercase tracking-wider font-mono text-stone-700 dark:text-stone-300">
              Decisions kept on this device
            </h2>
          </div>
          {listings.length > 0 && (
            <span className="text-xs font-mono text-stone-500">
              {listings.length} decision{listings.length === 1 ? '' : 's'}
            </span>
          )}
        </div>

        {decisionsState.status === 'loading' ? (
          <div className="p-8 text-center text-sm text-stone-500 rounded-lg border border-stone-200 dark:border-stone-800">
            Loading stored decisions...
          </div>
        ) : listings.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-dashed border-stone-300 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              No decisions stored yet. Start a new decision or try the demo.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={onStartDemoDecision}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
              >
                Try the Workout Recommendations Demo →
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {listings.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenStoredDecision(item.id)}
                className="w-full text-left p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-700 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {item.isSample && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        DEMO
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-stone-500">
                      {new Date(item.lastActivityAt).toLocaleDateString()}
                      {item.openLoops > 0 ? ` · ${item.openLoops} open loop${item.openLoops === 1 ? '' : 's'}` : ''}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                    {item.decisionQuestion}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                      item.state === 'failed'
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        : item.state === 'awaiting_evidence'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {item.state.replace(/_/g, ' ')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
