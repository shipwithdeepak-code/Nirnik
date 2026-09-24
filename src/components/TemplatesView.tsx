import React from 'react';
import { ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ProductContext } from '../types';

export interface DecisionTemplate {
  id: string;
  title: string;
  category: string;
  decisionQuestion: string;
  context: Partial<ProductContext>;
  description: string;
  keyTradeoff: string;
}

export const DECISION_TEMPLATES: DecisionTemplate[] = [
  {
    id: 'feature-rollout',
    title: 'AI Feature Rollout: Global vs Opt-In',
    category: 'Product Growth & Safety',
    decisionQuestion: 'Should we launch AI-powered workout recommendations to all users?',
    context: {
      name: 'AI Workout Recommendations Rollout',
      targetUser: 'Active free-tier athletes with >3 logged workouts',
      primaryGoal: '15% boost in 14-day habit retention with zero safety regressions',
      currentProblem: 'Novice athletes can be overwhelmed or misdirected without calibration',
    },
    description: 'Determine whether to push algorithmic recommendations globally or gate behind an explicit calibration phase.',
    keyTradeoff: 'Velocity of adoption vs protection against beginner churn and strain injury.',
  },
  {
    id: 'capability-sunset',
    title: 'Legacy Capability Deprecation',
    category: 'Platform & Technical Debt',
    decisionQuestion: 'Should we deprecate the legacy CSV export in favor of the new Webhook API?',
    context: {
      name: 'Legacy CSV Export Sunset',
      targetUser: 'Enterprise accounts relying on manual weekly reports',
      primaryGoal: 'Eliminate maintenance burden of unindexed DB dumps by Q4',
      currentProblem: '12% of high-ACV customers still have batch jobs using the old endpoint',
    },
    description: 'Stress-test an irreversible sunset decision where high-value customers might experience workflow disruption.',
    keyTradeoff: 'Engineering velocity and security vs customer churn risk and migration friction.',
  },
  {
    id: 'pricing-tiering',
    title: 'Packaging & Monitization Gate',
    category: 'Pricing & Monetization',
    decisionQuestion: 'Should we gate export features behind the Pro tier for all new signups?',
    context: {
      name: 'Pro Tier Feature Gating',
      targetUser: 'Self-serve teams evaluating the free tier',
      primaryGoal: 'Increase free-to-paid conversion rate by 2.5 percentage points',
      currentProblem: 'Risk of dropping organic product viral coefficient in developer communities',
    },
    description: 'Evaluate moving previously accessible free features behind a monetization gate.',
    keyTradeoff: 'Direct revenue expansion vs viral acquisition loop health.',
  },
  {
    id: 'architecture-migration',
    title: 'Core Infrastructure Replatforming',
    category: 'Engineering Architecture',
    decisionQuestion: 'Should we migrate the search indexing engine from Elasticsearch to Vector Search in Q3?',
    context: {
      name: 'Vector Search Migration',
      targetUser: 'Platform engineering team and enterprise query users',
      primaryGoal: 'Sub-150ms semantic query latency across 10M records',
      currentProblem: 'Dual-write synchronization overhead and potential query divergence',
    },
    description: 'Weigh an architectural replatforming decision against continuous feature delivery commitments.',
    keyTradeoff: 'Architectural modernness and latency vs multi-month delivery freeze risks.',
  },
];

interface TemplatesViewProps {
  onSelectTemplate: (template: DecisionTemplate) => void;
  onBackToOverview: () => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onSelectTemplate,
  onBackToOverview,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-10 sm:py-14 px-4 sm:px-6 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171A18]">
          Decision Templates
        </h1>
        <p className="mt-1 text-sm text-[#626862]">
          Preconfigured frameworks for high-stakes product decisions with established trade-offs and claim structures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DECISION_TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            className="p-5 rounded-xl border border-[#E5E7E2] bg-[#FFFFFF] hover:border-[#D6D9D2] hover:shadow-2xs transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F2F3EF] text-[#626862]">
                  {tmpl.category}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#171A18] leading-snug">
                {tmpl.title}
              </h3>
              <p className="text-xs text-[#626862] leading-relaxed">
                {tmpl.description}
              </p>
              <div className="pt-2 border-t border-[#E5E7E2] text-xs">
                <span className="text-[#8A908A] block text-[11px]">Key trade-off:</span>
                <span className="text-[#171A18] font-medium">{tmpl.keyTradeoff}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectTemplate(tmpl)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-[#174A3A] bg-[#DDEBE4] hover:bg-[#DDEBE4]/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
            >
              <span>Use this template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
