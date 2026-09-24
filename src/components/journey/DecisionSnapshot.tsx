import React, { useState } from 'react';
import {
  ShieldAlert,
  ChevronRight,
  ChevronDown,
  Layers,
  HelpCircle,
  Users,
  CheckCircle,
  FileQuestion,
} from 'lucide-react';
import type { Claim } from '../../types/claims';
import type { DemoSpecialistDetail, DemoUnknownItem } from '../../data/demoWorkoutDecision';

interface DecisionSnapshotProps {
  decisionQuestion: string | null;
  isQuestionConfirmed: boolean;
  claims: Claim[];
  unknowns: DemoUnknownItem[];
  specialists: DemoSpecialistDetail[];
  onOpenClaims?: () => void;
  onOpenUnknowns?: () => void;
  onOpenSpecialists?: () => void;
}

export const DecisionSnapshot: React.FC<DecisionSnapshotProps> = ({
  decisionQuestion,
  isQuestionConfirmed,
  claims,
  unknowns,
  specialists,
  onOpenClaims,
  onOpenUnknowns,
  onOpenSpecialists,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const factsCount = claims.filter((c) => c.epistemicStatus === 'FACT').length;
  const inferencesCount = claims.filter((c) => c.epistemicStatus === 'INFERENCE').length;
  const assumptionsCount = claims.filter((c) => c.epistemicStatus === 'ASSUMPTION').length;
  const openUnknownsCount = unknowns.filter((u) => u.status === 'OPEN').length;

  if (isCollapsed) {
    return (
      <div className="hidden lg:flex flex-col items-center py-4 px-2 bg-stone-50 dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 w-12 shrink-0">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
          title="Expand Decision Snapshot"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <span className="[writing-mode:vertical-lr] text-xs font-mono uppercase tracking-wider text-stone-500 mt-6 font-semibold">
          Decision Snapshot
        </span>
      </div>
    );
  }

  return (
    <aside className="hidden lg:block w-72 shrink-0 border-l border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 p-4 space-y-5 overflow-y-auto">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
            Decision Snapshot
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          title="Collapse snapshot"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 1. Consequential Question */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-stone-500 font-medium">
            Core Question
          </span>
          {isQuestionConfirmed && (
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Confirmed
            </span>
          )}
        </div>
        <p className="text-xs font-serif italic text-stone-800 dark:text-stone-200 line-clamp-3 leading-snug">
          {decisionQuestion ? `“${decisionQuestion}”` : 'Question not yet framed'}
        </p>
      </div>

      {/* 2. Evidence & Claims */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-stone-500 font-medium">
            Claim Spine
          </span>
          <button
            type="button"
            onClick={onOpenClaims}
            className="text-[10px] font-mono text-amber-600 dark:text-amber-400 hover:underline"
          >
            {claims.length} claims
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            <span className="block text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {factsCount}
            </span>
            <span className="text-[9px] font-mono uppercase text-stone-500">Facts</span>
          </div>

          <div className="p-1.5 rounded bg-sky-500/10 border border-sky-500/20">
            <span className="block text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
              {inferencesCount}
            </span>
            <span className="text-[9px] font-mono uppercase text-stone-500">Inferences</span>
          </div>

          <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20">
            <span className="block text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
              {assumptionsCount}
            </span>
            <span className="text-[9px] font-mono uppercase text-stone-500">Assumptions</span>
          </div>
        </div>
      </div>

      {/* 3. Open Unknowns */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-stone-500 font-medium">
            Open Unknowns
          </span>
          <button
            type="button"
            onClick={onOpenUnknowns}
            className="text-[10px] font-mono text-purple-600 dark:text-purple-400 hover:underline"
          >
            {openUnknownsCount} active
          </button>
        </div>

        <div className="space-y-1 text-xs">
          {unknowns.slice(0, 2).map((u) => (
            <div
              key={u.id}
              className="p-2 rounded bg-white dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800"
            >
              <span className="block font-mono text-[9px] text-stone-400">{u.id}</span>
              <p className="text-[11px] text-stone-700 dark:text-stone-300 line-clamp-2 leading-tight">
                {u.question}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Specialist Jury Stance */}
      {specialists.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-stone-500 font-medium">
              Specialist Panel
            </span>
            <span className="text-[10px] font-mono text-stone-500">4 jurors</span>
          </div>

          <div className="space-y-1">
            {specialists.map((sp) => (
              <div
                key={sp.id}
                className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 text-[11px]"
              >
                <span className="truncate max-w-[120px] font-medium text-stone-800 dark:text-stone-200">
                  {sp.title}
                </span>
                <span
                  className={`text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded ${
                    sp.stanceType === 'positive'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : sp.stanceType === 'warning'
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {sp.confidence}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
