import React, { useState } from 'react';
import {
  CheckCircle,
  Download,
  Share2,
  FileText,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
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
  const [copied, setCopied] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const choiceTitle =
    finalChoice === 'CONDITIONAL'
      ? 'Launch with conditions'
      : finalChoice === 'FULL'
      ? 'Launch'
      : finalChoice === 'PAUSE'
      ? 'Do not launch yet'
      : 'Reject';

  const handleExportMarkdown = () => {
    const md = `# Decision Record: ${decisionQuestion}

## Decision
**${choiceTitle}**

## Why
${finalRationale || 'Rolled out with novice verification gate and safety telemetry conditions.'}

## Evidence Summary
- 12 verified sources
- 8 grounded claims
- 2 unresolved assumptions mitigated

## Key Assumptions
- Users engage more actively with dynamic plans once calibrated.
- Injury telemetry acts as an effective safety net.

## Challenges & Defense
- UX Researcher: Addressed via mandatory 14-day calibration mode.
- Red Team: Addressed via pre-workout injury check-in prompt.

## What Would Change Our Mind
If opt-in falls below 35% in week 1 or injury complaints exceed 0.5%, pause immediately.

## Owner & Review Date
- Owner: Product Lead
- Review Date: ${new Date(Date.now() + 14 * 86400000).toLocaleDateString()}
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decision-record-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
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
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 space-y-8">
      {/* Heading */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-[#DDEBE4] text-[#174A3A] mb-2">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Kept locally on device</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171A18]">
          Decision recorded
        </h1>
        <p className="mt-1 text-sm text-[#626862]">
          This decision is permanently preserved in local storage with complete provenance.
        </p>
      </div>

      {/* Decision Summary Sheet */}
      <section className="p-6 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] shadow-2xs space-y-5 text-xs">
        {/* Decision & Question */}
        <div className="border-b border-[#E5E7E2] pb-4 space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8A908A]">
            Decision
          </div>
          <div className="text-lg font-semibold text-[#171A18]">{choiceTitle}</div>
          <p className="text-xs text-[#626862] italic mt-1">&ldquo;{decisionQuestion}&rdquo;</p>
        </div>

        {/* Why */}
        <div className="space-y-1">
          <div className="font-semibold text-[#171A18]">Why</div>
          <p className="text-[#626862] leading-relaxed">
            {finalRationale ||
              'High pilot engagement demonstrates clear product-market fit, while the mandatory opt-in gate protects novice users from overwhelm and injury risk.'}
          </p>
        </div>

        {/* Evidence */}
        <div className="space-y-1">
          <div className="font-semibold text-[#171A18]">Evidence</div>
          <p className="text-[#626862] leading-relaxed">
            12 empirical sources reviewed, including 4,820 athlete sessions, 14-day holdout data, and latency distribution logs.
          </p>
        </div>

        {/* Key Assumptions */}
        <div className="space-y-1">
          <div className="font-semibold text-[#171A18]">Key assumptions</div>
          <ul className="list-disc pl-4 space-y-0.5 text-[#626862]">
            <li>Calibrated athletes trust dynamic suggestions after guided onboarding.</li>
            <li>Self-reported injury filter catches &gt;95% of contraindicated movements.</li>
          </ul>
        </div>

        {/* Challenges */}
        <div className="space-y-1">
          <div className="font-semibold text-[#171A18]">Challenges addressed</div>
          <p className="text-[#626862] leading-relaxed">
            UX Researcher and Red Team raised beginner confusion and strain risks; resolved through opt-in wizard and telemetry throttle.
          </p>
        </div>

        {/* What would change our mind */}
        <div className="space-y-1">
          <div className="font-semibold text-[#171A18]">What would change our mind</div>
          <p className="text-[#626862] leading-relaxed">
            If opt-in adoption falls below 35% in week 1 or workout abandonments spike above 20%, rollout will immediately halt.
          </p>
        </div>

        {/* Owner & Review date */}
        <div className="pt-4 border-t border-[#E5E7E2] grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#8A908A] block text-[11px]">Owner</span>
            <span className="font-medium text-[#171A18]">Product Lead</span>
          </div>
          <div>
            <span className="text-[#8A908A] block text-[11px]">Review date</span>
            <span className="font-medium text-[#171A18]">
              {new Date(Date.now() + 14 * 86400000).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Primary & Secondary Action CTAs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenDecisionsList}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#174A3A] hover:bg-[#10372C] shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            Save decision
          </button>

          <button
            type="button"
            onClick={handleExportMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#171A18] bg-[#FFFFFF] border border-[#E5E7E2] hover:bg-[#F2F3EF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            <Download className="w-3.5 h-3.5 text-[#626862]" />
            <span>Export markdown</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onStartNewDecision}
          className="text-xs text-[#626862] hover:text-[#171A18] underline underline-offset-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174A3A] rounded-xs"
        >
          + Make another decision
        </button>
      </div>
    </div>
  );
};
