import React, { useState } from 'react';
import {
  CheckCircle,
  FileText,
  Clock,
  Download,
  Share2,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ArrowRight,
  Database,
  ExternalLink,
} from 'lucide-react';
import type { Decision } from '../../types/decision';
import type { Claim } from '../../types/claims';
import type { DemoSpecialistDetail } from '../../data/demoWorkoutDecision';

interface RecordStepProps {
  decision: Decision | null;
  decisionQuestion: string;
  finalChoice: string;
  finalRationale: string;
  claims: Claim[];
  specialists: DemoSpecialistDetail[];
  onStartNewDecision: () => void;
  onOpenDecisionsList: () => void;
  isDemo?: boolean;
}

export const RecordStep: React.FC<RecordStepProps> = ({
  decision,
  decisionQuestion,
  finalChoice,
  finalRationale,
  claims,
  specialists,
  onStartNewDecision,
  onOpenDecisionsList,
  isDemo = false,
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const choiceTitle =
    finalChoice === 'CONDITIONAL'
      ? 'LAUNCH WITH CONDITIONS'
      : finalChoice === 'FULL'
      ? 'LAUNCH TO ALL USERS'
      : finalChoice === 'PAUSE'
      ? 'DO NOT LAUNCH YET'
      : 'REJECT PROPOSAL';

  const factsCount = claims.filter((c) => c.epistemicStatus === 'FACT').length;
  const inferencesCount = claims.filter((c) => c.epistemicStatus === 'INFERENCE').length;
  const assumptionsCount = claims.filter((c) => c.epistemicStatus === 'ASSUMPTION').length;
  const unknownsCount = claims.filter((c) => c.epistemicStatus === 'UNKNOWN').length;

  const handleExportJson = () => {
    if (!decision) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(decision, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${decision.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyLink = () => {
    if (decision) {
      const url = `${window.location.origin}${window.location.pathname}#/decisions/${decision.id}`;
      navigator.clipboard?.writeText?.(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            PHASE 05 · RECORD
          </span>
          <span className="text-[11px] font-mono text-stone-500">
            Immutable Decision Record · Version 1
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-50 font-normal">
          Decision Preserved
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          This record binds the question, claims, specialist positions, and your final rationale into a durable snapshot.
        </p>
      </div>

      {/* Dominant Final Verdict & Outcome Card */}
      <section className="p-6 sm:p-8 rounded-2xl border-2 border-stone-900 dark:border-stone-100 bg-white dark:bg-stone-900 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-semibold block mb-1">
              Final Recorded Decision
            </span>
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
                {choiceTitle}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                Committed v1
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Question & Rationale */}
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-medium block mb-1">
              Decision Question
            </span>
            <p className="text-base sm:text-lg font-serif italic text-stone-900 dark:text-stone-100 leading-snug">
              &ldquo;{decisionQuestion}&rdquo;
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold block">
              PM Rationale & Execution Plan
            </span>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-sans leading-relaxed">
              {finalRationale}
            </p>
          </div>
        </div>

        {/* Epistemic Summary Bar */}
        <div className="pt-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-medium block mb-2">
            Grounded Claim Foundation ({claims.length} total)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-300">
                {factsCount} Facts
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-center">
              <span className="text-sm font-mono font-bold text-sky-700 dark:text-sky-300">
                {inferencesCount} Inferences
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-sm font-mono font-bold text-amber-700 dark:text-amber-300">
                {assumptionsCount} Assumptions
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center">
              <span className="text-sm font-mono font-bold text-purple-700 dark:text-purple-300">
                {unknownsCount} Unknowns
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Open Loop / Review Trigger Section */}
      {decision?.openLoops && decision.openLoops.length > 0 && (
        <section className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
              Active Open Loops & Review Point
            </h2>
          </div>

          <div className="space-y-3">
            {decision.openLoops.map((loop) => (
              <div
                key={loop.id}
                className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    Expected Evidence: {loop.expectedEvidence}
                  </span>
                  <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                    Due: {loop.duePoint}
                  </span>
                </div>
                <p className="text-stone-600 dark:text-stone-400">
                  <span className="font-medium">Trigger: </span>
                  {loop.reEvaluateOnArrival}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Provenance & Technical Audit Trail Accordion */}
      <section className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
        <button
          type="button"
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 font-mono"
        >
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5" />
            <span>Cryptographic Provenance & Storage Integrity</span>
          </div>
          {showTechnicalDetails ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showTechnicalDetails && (
          <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2 text-[11px] font-mono text-stone-500">
            <div className="flex justify-between">
              <span>Decision ID:</span>
              <span className="text-stone-800 dark:text-stone-200">{decision?.id || 'DEC-local'}</span>
            </div>
            <div className="flex justify-between">
              <span>Current Version:</span>
              <span className="text-stone-800 dark:text-stone-200">{decision?.currentVersionId || 'VER-v1'}</span>
            </div>
            <div className="flex justify-between">
              <span>Created:</span>
              <span className="text-stone-800 dark:text-stone-200">
                {decision?.createdAt ? new Date(decision.createdAt).toISOString() : new Date().toISOString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Storage Adapter:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                IndexedDB (Browser Local)
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
        <button
          type="button"
          onClick={onOpenDecisionsList}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>View all stored decisions</span>
        </button>

        <button
          type="button"
          onClick={onStartNewDecision}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white shadow-sm transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start another decision</span>
        </button>
      </div>
    </div>
  );
};
