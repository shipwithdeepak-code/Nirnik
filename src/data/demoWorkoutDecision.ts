import type {
  Claim,
  OpenQuestion,
  SerializedClaimSpine,
  SpecialistPosition,
} from '../types/claims';
import type {
  Decision,
  DecisionVersion,
  OpenLoop,
} from '../types/decision';
import type { ProductContext } from '../types';

export const DEMO_DECISION_QUESTION =
  'Should we launch AI-powered workout recommendations to all users?';

export const demoWorkoutContext: ProductContext = {
  name: 'FitPulse Smart Companion',
  whatBuilding:
    'An algorithmic training engine that generates dynamic, fatigue-adjusted daily workout recommendations based on real-time biometric strain and completion history.',
  targetUser: '1.2M active gymgoers, runners, and functional fitness athletes.',
  primaryGoal:
    'Boost 30-day active workout completion from 32% to 48% and reduce subscription cancellation churn by 18%.',
  currentProblem:
    'Users drop off after 3 weeks because static workout plans do not adapt when they are fatigued, injured, or traveling.',
};

export const demoWorkoutRawEvidence = `Evidence Artifacts & Findings:
- Pilot Cohort: 5,000 active beta users over 8 weeks.
- 30-Day Completion Rate: 48.2% for dynamic recommendation users vs 32.1% control group (+16.1% lift, p < 0.001).
- Churn Reduction: 30-day cohort churn dropped from 14.8% to 11.2%.
- User Feedback: "Finally a plan that does not tell me to squat heavy when I only slept 4 hours." (n=412 qualitative comments).
- Inference Latency: Mean generation time 380ms; p99 latency 850ms.
- Infrastructure Cost: Estimated $0.0042 per daily recommendation generated.
- Injury Risk: 3 beta participants reported mild muscular strains during heavy compound movements (deadlift/squat) scheduled after high-strain days.
- Instrumentation Gap: No longitudinal retention telemetry currently exists past week 8 for personalized recommendation cohorts.`;

const nowIso = '2026-09-24T11:00:00.000Z';
const runId = 'demo-run-fitpulse-01';

export const demoWorkoutClaims: Claim[] = [
  {
    id: 'CLM-wp01-lift',
    text: 'Beta pilot (n=5,000) demonstrated a 24% higher 30-day workout completion rate for active recommendation adopters.',
    epistemicStatus: 'FACT',
    origin: {
      kind: 'ARTIFACT',
      evidence: 'Beta pilot telemetry report Q2, page 4, table 2',
      runId,
      stage: 'analyst',
    },
    supports: [
      {
        dependantId: 'CLM-wp03-retention',
        dependantKind: 'CLAIM',
        stage: 'analyst',
      },
    ],
    loadBearing: 'LOAD_BEARING',
    producedBy: 'analyst',
    runId,
    createdAt: nowIso,
    surfaced: true,
  },
  {
    id: 'CLM-wp02-churn',
    text: '41% of churned subscribers cited static, repetitive, or fatigue-mismatched plans as their primary cancellation driver.',
    epistemicStatus: 'FACT',
    origin: {
      kind: 'ARTIFACT',
      evidence: 'Q2 exit survey logs, n=1,420 churned members',
      runId,
      stage: 'analyst',
    },
    supports: [
      {
        dependantId: 'CLM-wp03-retention',
        dependantKind: 'CLAIM',
        stage: 'analyst',
      },
    ],
    loadBearing: 'LOAD_BEARING',
    producedBy: 'analyst',
    runId,
    createdAt: nowIso,
    surfaced: true,
  },
  {
    id: 'CLM-wp03-retention',
    text: 'Adaptive workout routines will convert early 30-day workout adherence gains into sustained 60-day subscriber retention.',
    epistemicStatus: 'INFERENCE',
    origin: {
      kind: 'MODEL_INFERENCE',
      reasoning: 'Correlating 30-day completion lift with historically observed 60-day cohort survival patterns.',
      derivedFrom: ['CLM-wp01-lift', 'CLM-wp02-churn'],
      runId,
      stage: 'analyst',
    },
    supports: [],
    loadBearing: 'LOAD_BEARING',
    producedBy: 'analyst',
    runId,
    createdAt: nowIso,
    surfaced: true,
  },
  {
    id: 'CLM-wp04-strain',
    text: 'Algorithmic biometric strain scoring prevents workout abandonments caused by cumulative overtraining fatigue.',
    epistemicStatus: 'INFERENCE',
    origin: {
      kind: 'MODEL_INFERENCE',
      reasoning: 'Reduced dropout rate on high-strain days when lower volume workouts were suggested.',
      derivedFrom: ['CLM-wp01-lift'],
      runId,
      stage: 'analyst',
    },
    supports: [],
    loadBearing: 'NOT_LOAD_BEARING',
    producedBy: 'analyst',
    runId,
    createdAt: nowIso,
    surfaced: true,
  },
  {
    id: 'CLM-wp05-scale',
    text: 'Recommendation generation latency (380ms mean) and cloud inference costs will remain stable under 1.2M concurrent peak evening users.',
    epistemicStatus: 'ASSUMPTION',
    origin: {
      kind: 'MODEL_ASSUMPTION',
      reason: 'Infrastructure scaling model assumes linear load distribution without edge cache failure.',
      runId,
      stage: 'analyst',
    },
    supports: [],
    loadBearing: 'LOAD_BEARING',
    producedBy: 'analyst',
    runId,
    createdAt: nowIso,
    surfaced: true,
  },
  {
    id: 'CLM-wp06-safety',
    text: 'Automated intensity guardrails are sufficient to prevent injury without real-time human coach form verification.',
    epistemicStatus: 'ASSUMPTION',
    origin: {
      kind: 'MODEL_ASSUMPTION',
      reason: 'Heuristic volume caps are assumed to prevent over-exertion despite lack of movement video capture.',
      runId,
      stage: 'analyst',
    },
    supports: [],
    loadBearing: 'LOAD_BEARING',
    producedBy: 'analyst',
    runId,
    createdAt: nowIso,
    surfaced: true,
  },
  {
    id: 'CLM-wp07-novice',
    text: 'Adherence and injury risk variance between novice beginners versus experienced strength athletes is unquantified.',
    epistemicStatus: 'UNKNOWN',
    origin: {
      kind: 'MODEL_ASSUMPTION',
      reason: 'Beta cohort did not segment outcomes by user training age or lifting tenure.',
      runId,
      stage: 'analyst',
    },
    supports: [],
    loadBearing: 'LOAD_BEARING',
    producedBy: 'analyst',
    runId,
    createdAt: nowIso,
    surfaced: true,
  },
  {
    id: 'CLM-wp08-novelty',
    text: 'Whether initial workout engagement lift will persist beyond 60 days once the novelty effect of AI recommendations wears off.',
    epistemicStatus: 'UNKNOWN',
    origin: {
      kind: 'MODEL_ASSUMPTION',
      reason: 'No longitudinal retention telemetry currently exists past week 8.',
      runId,
      stage: 'analyst',
    },
    supports: [],
    loadBearing: 'NOT_LOAD_BEARING',
    producedBy: 'analyst',
    runId,
    createdAt: nowIso,
    surfaced: true,
  },
];

export interface DemoUnknownItem {
  id: string;
  question: string;
  whyItMatters: string;
  currentEvidence: string;
  whatWouldResolveIt: string;
  status: 'OPEN' | 'RESOLVED' | 'ACCEPTABLE';
  resolutionNote?: string;
}

export const demoWorkoutUnknowns: DemoUnknownItem[] = [
  {
    id: 'UNK-01',
    question: 'Will 30-day adherence gains persist at 90 days or decay as novelty fades?',
    whyItMatters:
      'The subscription economic payback period requires users to stay subscribed past 60 days. An 8-week pilot cannot prove annual recurring value.',
    currentEvidence: 'Pilot shows +16.1% lift at 30 days, but drops to +9.4% by day 56.',
    whatWouldResolveIt:
      'Tracking a 12-week holdout cohort or instituting progressive goal adjustments in week 6.',
    status: 'OPEN',
  },
  {
    id: 'UNK-02',
    question: 'How dangerous are high-strain recommendations for novice gym-goers?',
    whyItMatters:
      '3 reported strains in a small 5,000-user pilot could extrapolate to hundreds of injuries at a 1.2M user scale, threatening brand reputation and app store rating.',
    currentEvidence:
      'All 3 injured pilot users attempted compound barbell movements on consecutive high-fatigue days.',
    whatWouldResolveIt:
      'Mandatory novice volume cap preventing heavy compound lifts on consecutive days.',
    status: 'OPEN',
  },
  {
    id: 'UNK-03',
    question: 'Will inference latency spike during 6-8 PM peak workout hours?',
    whyItMatters:
      'Gym-goers waiting >2 seconds at a squat rack for workout suggestions will abandon the app and log manual workouts.',
    currentEvidence:
      'Peak testing conducted up to 25,000 simulated requests; full production concurrency not stress-tested.',
    whatWouldResolveIt:
      'Pre-generating daily recommendations overnight rather than on-demand app open.',
    status: 'OPEN',
  },
];

export interface DemoSpecialistDetail {
  id: string;
  title: string;
  role: string;
  stance: string;
  stanceType: 'positive' | 'warning' | 'negative';
  confidence: number;
  keyConcern: string;
  reasoning: string;
  evidenceCitations: string[];
}

export const demoWorkoutSpecialists: DemoSpecialistDetail[] = [
  {
    id: 'SP-STRATEGY',
    title: 'Product Strategist',
    role: 'Commercial Strategy & Growth',
    stance: 'Support with Pilot',
    stanceType: 'positive',
    confidence: 84,
    keyConcern:
      'The 16.1% completion lift directly addresses our #1 cancellation cause, but a 100% rollout risks novelty decay before monetization payback.',
    reasoning:
      'The business case rests on converting workout adherence into renewal retention. Citing CLM-wp01-lift and CLM-wp02-churn, the recommendation engine solves a verified user pain. However, rolling out globally without proving 90-day retention leaves the business vulnerable to seasonal churn.',
    evidenceCitations: ['CLM-wp01-lift', 'CLM-wp02-churn', 'CLM-wp03-retention'],
  },
  {
    id: 'SP-UX',
    title: 'UX Researcher',
    role: 'User Experience & Habits',
    stance: 'Strong Support',
    stanceType: 'positive',
    confidence: 88,
    keyConcern:
      'Users love adaptive plans, but manual override friction must remain zero when a user is exhausted.',
    reasoning:
      'Qualitative sentiment from 412 users confirms that feeling understood on low-energy days creates emotional stickiness. Adaptive plans feel like a personal trainer. We must ensure the UI never shames a user for downgrading an assigned workout.',
    evidenceCitations: ['CLM-wp01-lift', 'CLM-wp04-strain'],
  },
  {
    id: 'SP-AUDITOR',
    title: 'Evidence Auditor',
    role: 'Methodological Rigor & Data Quality',
    stance: 'Warning: Evidence Gaps',
    stanceType: 'warning',
    confidence: 68,
    keyConcern:
      'Assumption CLM-wp05-scale and unknown CLM-wp08-novelty are unverified; the 8-week pilot suffers from survivorship bias.',
    reasoning:
      'The pilot sample over-indexed on already-motivated daily users. Furthermore, there is zero data on retention past week 8. The claim that 30-day adherence translates into sustained annual retention is currently an ungrounded inference.',
    evidenceCitations: ['CLM-wp03-retention', 'CLM-wp05-scale', 'CLM-wp08-novelty'],
  },
  {
    id: 'SP-REDTEAM',
    title: 'Red Team',
    role: 'Adversarial Risk & Liability',
    stance: 'Strong Challenge',
    stanceType: 'negative',
    confidence: 86,
    keyConcern:
      'Three injuries in 5,000 users is a 0.06% incident rate; at 1.2M users that represents over 700 potential injuries and severe product liability.',
    reasoning:
      'Algorithmic recommendation of high-load compound lifts without real-time form checks or medical clearance is an active liability hazard. The current algorithm does not check user age, historical injury notes, or warm-up adequacy before assigning max effort work.',
    evidenceCitations: ['CLM-wp06-safety', 'CLM-wp07-novice'],
  },
];

export interface DemoDisagreementItem {
  topic: string;
  summary: string;
  sideA: { role: string; stance: string; argument: string };
  sideB: { role: string; stance: string; argument: string };
}

export const demoWorkoutDisagreement: DemoDisagreementItem = {
  topic: 'Safety Liability vs Feature Adherence Speed',
  summary:
    'The Product Strategist and UX Researcher advocate immediate rollout based on clear engagement gains, while the Red Team insists automated recommendations pose an unmitigated physical injury hazard.',
  sideA: {
    role: 'Product Strategist & UX Researcher',
    stance: 'Launch Now (Phased)',
    argument:
      'Waiting for a 12-week clinical study cedes market leadership to competitors. The 16% adherence lift is real, and heuristic volume guardrails can be deployed immediately.',
  },
  sideB: {
    role: 'Red Team & Evidence Auditor',
    stance: 'Halt Global Rollout',
    argument:
      'Physical safety cannot be A/B tested lightly. A 0.06% injury rate at 1.2M scale will trigger catastrophic negative reviews, class action liability, and regulatory app store scrutiny.',
  },
};

export interface DemoPMResponseOption {
  id: string;
  title: string;
  description: string;
  recommended: boolean;
}

export const demoWorkoutPMResponses: DemoPMResponseOption[] = [
  {
    id: 'RESP-PHASED',
    title: 'Option A: Phased Pilot with Novice Guardrails (Recommended)',
    description:
      'Roll out to 20% opt-in cohort of intermediate/advanced users first. Restrict novice users to conservative volume caps and require warmup checklists.',
    recommended: true,
  },
  {
    id: 'RESP-DELAY',
    title: 'Option B: Delay Launch Until 12-Week Study Completes',
    description:
      'Run a formal 12-week randomized trial with sports medicine physician oversight to rigorously evaluate injury rates and 90-day retention.',
    recommended: false,
  },
  {
    id: 'RESP-ALL',
    title: 'Option C: Full Global Launch with Disclaimer Checkbox',
    description:
      'Launch to 100% of users immediately with a standard terms-of-service liability waiver and in-app feedback report button.',
    recommended: false,
  },
];

export const demoWorkoutSynthesis = {
  verdict: 'CONDITIONAL LAUNCH',
  confidence: 84,
  confidenceRationale:
    'Core engagement lift is empirically validated (p < 0.001), but physical safety risk and longitudinal decay require bounded rollout.',
  whatHolds: [
    'Pilot demonstrated 16.1% net lift in 30-day workout completion across 5,000 active users.',
    '41% of churned users specifically cite repetitive static workouts as their churn catalyst.',
    'Biometric strain adjustment successfully prevents low-energy workout dropouts.',
  ],
  whatDoesnt: [
    'Assumption that 30-day adherence converts to 90-day renewal is unproven (novelty effect unaccounted for).',
    'Heuristic volume caps alone are insufficient to guarantee injury prevention for novice lifters.',
  ],
  whatChanged:
    'PM agreed to enforce strict novice volume restrictions and gate the rollout to a 20% opt-in cohort, directly neutralizing the Red Team’s catastrophic liability scenario.',
  whatWouldChangeOurMind:
    'If 60-day cohort retention drops below control (<32%), or if any severe injury escalations occur during the 20% phase, halt recommendations immediately.',
};

export const demoWorkoutFinalChoices = [
  {
    id: 'CONDITIONAL',
    title: 'Launch with Conditions',
    subtitle: 'Roll out to 20% opt-in cohort with novice safety guardrails and 90-day holdout.',
    badge: 'Recommended',
    recommended: true,
  },
  {
    id: 'FULL',
    title: 'Launch to All Users',
    subtitle: 'Roll out to 100% of subscribers immediately with standard disclaimers.',
    badge: 'High Risk',
    recommended: false,
  },
  {
    id: 'PAUSE',
    title: 'Do Not Launch Yet',
    subtitle: 'Hold feature until longitudinal 12-week clinical study and cost audits complete.',
    badge: 'Conservative',
    recommended: false,
  },
  {
    id: 'REJECT',
    title: 'Reject Feature Proposal',
    subtitle: 'Abandon automated recommendation engine due to safety liability and complexity.',
    badge: 'Definitive',
    recommended: false,
  },
];

export const demoWorkoutDefaultRationale =
  'We will launch AI Workout Recommendations to a 20% opt-in cohort of intermediate and advanced subscribers, enforcing conservative safety volume caps on novice profiles and tracking a 90-day retention holdout group before expanding to full production.';

export function buildDemoSerializedSpine(): SerializedClaimSpine {
  const openQuestions: OpenQuestion[] = demoWorkoutClaims
    .filter((c) => c.epistemicStatus === 'UNKNOWN')
    .map((c, idx) => ({
      claimId: c.id,
      question: c.text,
      whyItMatters: 'Unverified variable in the recommendation decision model.',
      decisionImpact: (idx === 0 ? 'high' : 'medium') as 'high' | 'medium',
      blocks: [],
      status: 'OPEN' as const,
    }));

  return {
    version: 1,
    runId,
    claims: demoWorkoutClaims,
    openQuestions,
  };
}

export function buildDemoSpecialistPositions(): SpecialistPosition[] {
  return [
    {
      id: 'POS-STRATEGY',
      position: 'Support with Phased Pilot',
      reasoning: demoWorkoutSpecialists[0].reasoning,
      citedClaims: ['CLM-wp01-lift', 'CLM-wp02-churn', 'CLM-wp03-retention'],
      producedBy: 'specialist_strategy',
      runId,
    },
    {
      id: 'POS-UX',
      position: 'Strong Support for Adaptive Plans',
      reasoning: demoWorkoutSpecialists[1].reasoning,
      citedClaims: ['CLM-wp01-lift', 'CLM-wp04-strain'],
      producedBy: 'specialist_ux',
      runId,
    },
    {
      id: 'POS-AUDITOR',
      position: 'Warning: Longitudinal Evidence Gaps',
      reasoning: demoWorkoutSpecialists[2].reasoning,
      citedClaims: ['CLM-wp03-retention', 'CLM-wp05-scale', 'CLM-wp08-novelty'],
      producedBy: 'auditor',
      runId,
    },
    {
      id: 'POS-REDTEAM',
      position: 'Challenge: Liability and Novice Injury Risk',
      reasoning: demoWorkoutSpecialists[3].reasoning,
      citedClaims: ['CLM-wp06-safety', 'CLM-wp07-novice'],
      producedBy: 'red_team',
      runId,
    },
  ];
}

export function buildDemoCanonicalDecision(): Decision {
  const decisionId = 'DEC-fitpulse-demo-workout-01';
  const versionId = 'VER-fitpulse-demo-workout-01-v1';

  const version: DecisionVersion = {
    id: versionId,
    decisionId,
    versionNumber: 1,
    createdAt: nowIso,
    origin: 'pm',
    trigger: 'initial',
    decisionQuestion: DEMO_DECISION_QUESTION,
    successCondition: 'Achieve >=45% 30-day active workout adherence and 0 injury escalations.',
    claimSpine: buildDemoSerializedSpine(),
    specialistPositions: buildDemoSpecialistPositions(),
    verdict: {
      outcome: 'ITERATE',
      confidence: 84,
      confidenceRationale: demoWorkoutSynthesis.confidenceRationale,
      executiveSummary: demoWorkoutDefaultRationale,
      opportunities: [
        {
          id: 'OPP-01',
          problem: 'Risk of novelty decay after week 8',
          userImpact: 'Drop in long-term habit formation',
          businessImpact: 'Negative subscription renewal ROI',
          confidence: 80,
          evidenceStatus: 'INFERENCE',
          evidenceContext: 'Observed drop from +16% at day 30 to +9% at day 56',
        },
        {
          id: 'OPP-02',
          problem: 'Novice lifters over-exerting on consecutive heavy compound days',
          userImpact: 'Muscular strain and negative workout sentiment',
          businessImpact: 'Safety liability and negative app ratings',
          confidence: 85,
          evidenceStatus: 'FACT',
          evidenceContext: '3 reported muscular strains in 5,000 user pilot',
        },
      ],
      recommendedNextStep: 'Deploy 20% opt-in pilot with novice guardrails and 90-day retention study.',
      confidenceCeiling: null,
      falsificationContract: null,
    },
    runMeta: {
      runId,
      startedAt: nowIso,
      finishedAt: nowIso,
      stages: [
        { stage: 'analyst', status: 'completed', attempts: 1, durationMs: 140 },
        { stage: 'gate', status: 'completed', attempts: 1, durationMs: 110 },
        { stage: 'specialist_strategy', status: 'completed', attempts: 1, durationMs: 230 },
        { stage: 'specialist_ux', status: 'completed', attempts: 1, durationMs: 210 },
        { stage: 'auditor', status: 'completed', attempts: 1, durationMs: 190 },
        { stage: 'chair', status: 'completed', attempts: 1, durationMs: 310 },
        { stage: 'red_team', status: 'completed', attempts: 1, durationMs: 240 },
      ],
      servedByUnevaluatedTier: false,
      totalEstimatedCostCents: 0,
      totalProviderCalls: 7,
    },
    outcome: { kind: 'VERDICT' },
  };

  const openLoop: OpenLoop = {
    id: 'LOOP-fitpulse-retention-01',
    decisionId,
    expectedEvidence: '60-day cohort retention data from the 20% phased pilot group.',
    whyItMatters: 'Confirms whether the 30-day adherence gains yield recurring subscription renewals.',
    duePoint: '60 days post-pilot launch',
    bearsOnClaims: ['CLM-wp03-retention', 'CLM-wp08-novelty'],
    reEvaluateOnArrival: 'Assess whether to expand rollout to 100% of subscribers.',
    createdBy: 'contract',
    versionId,
    createdAt: nowIso,
    status: 'OPEN',
  };

  return {
    id: decisionId,
    schemaVersion: 1,
    decisionQuestion: DEMO_DECISION_QUESTION,
    successCondition: 'Achieve >=45% 30-day active workout adherence and 0 injury escalations.',
    createdAt: nowIso,
    updatedAt: nowIso,
    currentVersionId: versionId,
    versions: [version],
    openLoops: [openLoop],
    eventLog: [
      { seq: 0, kind: 'decision_created', at: nowIso },
      { seq: 1, kind: 'question_confirmed', at: nowIso },
      { seq: 2, kind: 'verdict_issued', at: nowIso, outcome: 'verdict' },
    ],
    isSample: true,
  };
}
