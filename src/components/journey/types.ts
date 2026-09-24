import type { ProductContext } from '../../types';
import type { Claim } from '../../types/claims';
import type { Decision } from '../../types/decision';
import type { DemoUnknownItem, DemoSpecialistDetail, DemoDisagreementItem } from '../../data/demoWorkoutDecision';

export type JourneyPhase = 'FRAME' | 'GROUND' | 'CHALLENGE' | 'DECIDE' | 'RECORD';

export interface JourneyStepConfig {
  id: JourneyPhase;
  number: string;
  name: string;
  shortDesc: string;
  orientation: string;
}

export const JOURNEY_STEPS: JourneyStepConfig[] = [
  {
    id: 'FRAME',
    number: '01',
    name: 'Frame',
    shortDesc: 'Define the decision',
    orientation: 'Formulate the consequential product call and make sure the decision question is sharp.',
  },
  {
    id: 'GROUND',
    number: '02',
    name: 'Ground',
    shortDesc: 'Evidence, claims & unknowns',
    orientation: 'Review what the Jury actually knows — grounded facts, inferences, assumptions, and critical unknowns.',
  },
  {
    id: 'CHALLENGE',
    number: '03',
    name: 'Challenge',
    shortDesc: 'Specialist jury review',
    orientation: 'Examine where specialist perspectives clash, review opposing positions, and record your response.',
  },
  {
    id: 'DECIDE',
    number: '04',
    name: 'Decide',
    shortDesc: 'Jury synthesis & PM call',
    orientation: 'Synthesize what holds, test your rationale, and make the definitive PM decision.',
  },
  {
    id: 'RECORD',
    number: '05',
    name: 'Record',
    shortDesc: 'Durable decision record',
    orientation: 'Preserve the durable decision, rationale, epistemic claims, and open loops for future review.',
  },
];

export interface JourneyState {
  currentPhase: JourneyPhase;
  isDemo: boolean;
  context: ProductContext;
  rawEvidence: string;
  decisionQuestion: string | null;
  questionRationale: string;
  isQuestionConfirmed: boolean;
  claims: Claim[];
  unknowns: DemoUnknownItem[];
  specialists: DemoSpecialistDetail[];
  disagreement: DemoDisagreementItem | null;
  pmResponse: string;
  pmSelectedResponseId: string;
  finalDecisionChoice: string;
  finalDecisionRationale: string;
  savedDecision: Decision | null;
}
