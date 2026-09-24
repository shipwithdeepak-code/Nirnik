import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import type { DecisionListing } from '../../server/decision/decision';
import type { StoredDecisions } from '../services/decisionPersistence';

/**
 * Stage 7 · CAP-12's decisions list.
 *
 * It reads `DecisionStore.listDecisions()` and nothing else. Not
 * `reviewHistory`, not a `ProductReview`, not a second array kept in step by
 * hand — this component does not know those exist, and the listing type it
 * renders carries no version contents for it to leak.
 *
 * The ordering is the store's: most recent activity first, tie-broken on the
 * decision id so two decisions from the same second do not swap places between
 * reads.
 */

export const DECISIONS_LIST_TESTID = 'decisions-list';

const STATE_LABELS: Record<DecisionListing['state'], string> = {
  provisional: 'Provisional',
  awaiting_evidence: 'Awaiting evidence',
  waiting_on_a_check: 'Waiting on a check',
  failed: 'Did not complete',
};

/**
 * The state, as a word and a shape rather than a colour. AR-4: a PM who cannot
 * distinguish the two ambers still reads the sentence.
 */
function StateBadge({ state }: { state: DecisionListing['state'] }) {
  const tone =
    state === 'awaiting_evidence'
      ? 'border-[#F0DBC0] bg-[#FDF6ED] text-[#A66B16]'
      : state === 'failed'
      ? 'border-[#F8D7D7] bg-[#FAF0F0] text-[#B54747]'
      : 'border-[#E8E8EA] bg-[#F2F2F3] text-[#17191C]';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-mono font-medium ${tone}`}
    >
      {STATE_LABELS[state]}
    </span>
  );
}

function when(iso: string): string {
  const at = new Date(iso);
  if (Number.isNaN(at.getTime())) return iso;
  return at.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function DecisionsList({
  state,
  onOpen,
  onStartNew,
}: {
  state: StoredDecisions | { status: 'loading' };
  onOpen: (id: string) => void;
  onStartNew: () => void;
}) {
  return (
    <section
      data-testid={DECISIONS_LIST_TESTID}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-[#E8E8EA]">
        <div className="space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#777B86]">
            History & Provenance
          </div>
          <h1
            className="text-3xl sm:text-4xl font-normal tracking-tight text-[#17191C]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Decisions
          </h1>
        </div>
        <button
          type="button"
          onClick={onStartNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#17191C] hover:bg-[#2D3139] shadow-2xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C]"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Make a new decision</span>
        </button>
      </div>

      <p className="text-xs text-[#626862] leading-relaxed">
        Kept on this device only. Nothing here has been sent anywhere.
      </p>

      {state.status === 'loading' && (
        <div
          role="status"
          className="p-8 text-center rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] text-xs font-mono text-[#777B86]"
        >
          Reading the decisions kept on this device…
        </div>
      )}

      {state.status === 'error' && (
        <div
          role="status"
          className="p-6 rounded-3xl border border-[#F8D7D7] bg-[#FAF0F0] text-xs text-[#B54747] leading-relaxed"
        >
          {state.userMessage}
        </div>
      )}

      {state.status === 'loaded' && state.listings.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] space-y-3">
          <p className="text-sm font-semibold text-[#17191C]">
            No decisions yet.
          </p>
          <p className="text-xs text-[#626862] max-w-md mx-auto leading-relaxed">
            One is kept here each time a deliberation reaches an outcome — a
            verdict, or a finding that the evidence cannot carry one.
          </p>
        </div>
      )}

      {state.status === 'loaded' && state.listings.length > 0 && (
        <ul className="space-y-3.5">
          {state.listings.map((listing) => (
            <li
              key={listing.id}
              className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E8EA] hover:border-[#17191C] transition-all shadow-2xs group"
            >
              <button
                type="button"
                onClick={() => onOpen(listing.id)}
                className="w-full text-left space-y-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] rounded-xl cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <StateBadge state={listing.state} />
                  {listing.isSample && (
                    <span className="uppercase tracking-wider text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FBE1D1] text-[#5D2A1A]">
                      Sample
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-base sm:text-lg font-semibold text-[#17191C] group-hover:text-[#174A3A] transition-colors leading-snug">
                    {listing.decisionQuestion}
                  </h2>
                  <ArrowRight className="w-4 h-4 text-[#B0B4BC] group-hover:text-[#17191C] shrink-0 transition-colors" />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#777B86] pt-1">
                  <span>Last activity {when(listing.lastActivityAt)}</span>
                  {listing.openLoops > 0 && (
                    <span className="text-[#A66B16]">
                      {listing.openLoops} open {listing.openLoops === 1 ? 'check' : 'checks'}
                    </span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
