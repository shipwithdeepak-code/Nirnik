import React, { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { WorkspaceForm } from './components/WorkspaceForm';
import { ResultsView } from './components/ResultsView';
import { AnalysisLoadingModal } from './components/AnalysisLoadingModal';
import { RedTeamModal } from './components/RedTeamModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { StandingLimitations } from './components/StandingLimitations';
import { PrivacyDisclosure } from './components/PrivacyDisclosure';
import { FailureView, InsufficientView } from './components/RunOutcomeView';
import { DecisionsList } from './components/DecisionsList';
import { DecisionDetail } from './components/DecisionDetail';

import { JourneyPhase } from './components/journey/types';
import { JourneyRail } from './components/journey/JourneyRail';
import { NextActionBar } from './components/journey/NextActionBar';
import { DecisionSnapshot } from './components/journey/DecisionSnapshot';
import { LandingHome } from './components/journey/LandingHome';
import { FrameStep } from './components/journey/FrameStep';
import { GroundStep } from './components/journey/GroundStep';
import { ChallengeStep } from './components/journey/ChallengeStep';
import { DecideStep } from './components/journey/DecideStep';
import { RecordStep } from './components/journey/RecordStep';
import { ClaimDrawer } from './components/journey/ClaimDrawer';
import { SpecialistDrawer } from './components/journey/SpecialistDrawer';

import {
  AnalysisProgressStep,
  ProductContext,
  ProductReview,
  RunResult,
} from './types';
import type { Claim } from './types/claims';
import type { Decision } from './types/decision';
import {
  sampleProductContext,
  sampleRawEvidence,
  sampleProductReview,
  sampleDecisionQuestion,
} from './data/sampleReview';
import {
  DEMO_DECISION_QUESTION,
  demoWorkoutContext,
  demoWorkoutRawEvidence,
  demoWorkoutClaims,
  demoWorkoutUnknowns,
  demoWorkoutSpecialists,
  demoWorkoutDisagreement,
  demoWorkoutDefaultRationale,
  buildDemoCanonicalDecision,
  type DemoUnknownItem,
  type DemoSpecialistDetail,
} from './data/demoWorkoutDecision';
import { reviewService } from './services/reviewService';
import {
  listStoredDecisions,
  openStoredDecision,
  persistDecision,
  type StoredDecision,
  type StoredDecisions,
} from './services/decisionPersistence';
import { navigate, useRoute } from './routing/route';
import * as telemetry from './services/telemetryClient';
import type { EditDistanceBand } from './integrity/decisionQuestion';
import {
  deleteLocalData,
  hasAcknowledgedPrivacy,
} from './integrity/disclosures';

const emptyContext: ProductContext = {
  name: '',
  whatBuilding: '',
  targetUser: '',
  primaryGoal: '',
  currentProblem: '',
  productUrl: '',
  additionalContext: '',
  screenshotUrl: undefined,
  screenshotName: undefined,
  artifactUnderstanding: undefined,
};

export default function App() {
  // Navigation & Routing
  const route = useRoute();

  // App View Modes: 'home' (Landing) | 'journey' (5-Phase Defense) | 'live_result' (Failure/Insufficient/Legacy Verdict)
  const [viewMode, setViewMode] = useState<'home' | 'journey'>('home');
  const [currentPhase, setCurrentPhase] = useState<JourneyPhase>('FRAME');
  const [completedPhases, setCompletedPhases] = useState<Set<JourneyPhase>>(new Set());

  // Demo Mode indicator
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Core Decision Context
  const [context, setContext] = useState<ProductContext>(emptyContext);
  const [rawEvidence, setRawEvidence] = useState<string>('');
  const [decisionQuestion, setDecisionQuestion] = useState<string | null>(null);
  const [questionRationale, setQuestionRationale] = useState<string>('');
  const [isQuestionConfirmed, setIsQuestionConfirmed] = useState(false);

  // Grounding & Claims
  const [claims, setClaims] = useState<Claim[]>([]);
  const [unknowns, setUnknowns] = useState<DemoUnknownItem[]>([]);
  const [selectedClaimForDrawer, setSelectedClaimForDrawer] = useState<Claim | null>(null);

  // Challenge & Specialists
  const [specialists, setSpecialists] = useState<DemoSpecialistDetail[]>([]);
  const [disagreement, setDisagreement] = useState(demoWorkoutDisagreement);
  const [pmSelectedResponseId, setPmSelectedResponseId] = useState<string>('RESP-PHASED');
  const [pmResponseText, setPmResponseText] = useState<string>(
    'Launch phased pilot (20% cohort) with mandatory novice guardrails and 90-day holdout'
  );
  const [selectedSpecialistForDrawer, setSelectedSpecialistForDrawer] =
    useState<DemoSpecialistDetail | null>(null);

  // Decide & Final Call
  const [finalChoice, setFinalChoice] = useState<string>('CONDITIONAL');
  const [finalRationale, setFinalRationale] = useState<string>(demoWorkoutDefaultRationale);

  // Record & Durable State
  const [savedDecision, setSavedDecision] = useState<Decision | null>(null);
  const [decisionId, setDecisionId] = useState<string>(() => telemetry.mintDecisionId());

  // Stored Decisions view state
  const [decisionsState, setDecisionsState] = useState<StoredDecisions | { status: 'loading' }>({
    status: 'loading',
  });
  const [decisionState, setDecisionState] = useState<StoredDecision | { status: 'loading' }>({
    status: 'loading',
  });

  // Ephemeral in-memory review list for session history drawer
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [reviewHistory, setReviewHistory] = useState<ProductReview[]>([]);
  const [isRedTeamModalOpen, setIsRedTeamModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressSteps, setProgressSteps] = useState<AnalysisProgressStep[]>([]);
  const [privacyGateOpen, setPrivacyGateOpen] = useState(false);
  const pendingUploadRef = React.useRef<(() => void) | null>(null);
  const [keptDecisionId, setKeptDecisionId] = useState<string | null>(null);

  // Technical Deliberation Handler
  const handleDeliberationComplete = async (result: RunResult) => {
    setRunResult(result);
    if ((result.kind === 'VERDICT' || result.kind === 'INSUFFICIENT') && result.decision) {
      setKeptDecisionId(result.decision.id);
      void persistDecision(result.decision);
    }
  };

  // Route synchronization
  useEffect(() => {
    let current = true;
    if (route.name === 'decisions') {
      setDecisionsState({ status: 'loading' });
      void listStoredDecisions().then((next) => {
        if (current) setDecisionsState(next);
      });
    } else if (route.name === 'decision') {
      setDecisionState({ status: 'loading' });
      void openStoredDecision(route.id).then((next) => {
        if (current) setDecisionState(next);
      });
    }
    return () => {
      current = false;
    };
  }, [route.name, route.name === 'decision' ? route.id : '']);

  // Reset to brand new decision
  const handleStartNewDecision = () => {
    navigate({ name: 'run' });
    setIsDemoMode(false);
    setContext(emptyContext);
    setRawEvidence('');
    setDecisionQuestion(null);
    setQuestionRationale('');
    setIsQuestionConfirmed(false);
    setClaims([]);
    setUnknowns([]);
    setSpecialists([]);
    setSavedDecision(null);
    setRunResult(null);
    setCompletedPhases(new Set());
    setCurrentPhase('FRAME');
    setViewMode('journey');
    setDecisionId(telemetry.mintDecisionId());
  };

  // Start Deterministic Demo Decision
  const handleStartDemoDecision = () => {
    navigate({ name: 'run' });
    setIsDemoMode(true);
    setContext(demoWorkoutContext);
    setRawEvidence(demoWorkoutRawEvidence);
    setDecisionQuestion(DEMO_DECISION_QUESTION);
    setQuestionRationale(
      'Tests whether to roll out globally or bound risk to an opt-in cohort with safety guardrails.'
    );
    setIsQuestionConfirmed(true);
    setClaims(demoWorkoutClaims);
    setUnknowns(demoWorkoutUnknowns);
    setSpecialists(demoWorkoutSpecialists);
    setDisagreement(demoWorkoutDisagreement);
    setPmSelectedResponseId('RESP-PHASED');
    setPmResponseText(
      'Launch phased pilot (20% cohort) with mandatory novice guardrails and 90-day holdout'
    );
    setFinalChoice('CONDITIONAL');
    setFinalRationale(demoWorkoutDefaultRationale);
    setSavedDecision(null);
    setRunResult(null);
    setCompletedPhases(new Set());
    setCurrentPhase('FRAME');
    setViewMode('journey');
    setDecisionId(telemetry.mintDecisionId());
    telemetry.emit('question_proposed', { decisionId });
  };

  // Exit demo back to Home
  const handleExitDemo = () => {
    setIsDemoMode(false);
    setViewMode('home');
    navigate({ name: 'run' });
  };

  // Privacy Upload Handler
  const requestUploadConsent = useCallback((proceed: () => void) => {
    if (hasAcknowledgedPrivacy()) {
      proceed();
      return;
    }
    pendingUploadRef.current = proceed;
    setPrivacyGateOpen(true);
  }, []);

  const handlePrivacyAcknowledged = () => {
    setPrivacyGateOpen(false);
    const pending = pendingUploadRef.current;
    pendingUploadRef.current = null;
    pending?.();
  };

  const handlePrivacyCancelled = () => {
    setPrivacyGateOpen(false);
    pendingUploadRef.current = null;
  };

  // Confirm Decision Question
  const handleConfirmDecisionQuestion = (question: string, band: EditDistanceBand) => {
    setDecisionQuestion(question);
    setIsQuestionConfirmed(true);
    telemetry.emit('question_confirmed', { decisionId, editDistanceBand: band });

    // Populate claims if empty
    if (claims.length === 0) {
      if (isDemoMode || !rawEvidence) {
        setClaims(demoWorkoutClaims);
        setUnknowns(demoWorkoutUnknowns);
        setSpecialists(demoWorkoutSpecialists);
      }
    }
  };

  // Mark phase complete & advance
  const markPhaseCompleted = (phase: JourneyPhase) => {
    setCompletedPhases((prev) => new Set([...prev, phase]));
  };

  // Navigation between phases
  const handleGoToPhase = (target: JourneyPhase) => {
    setCurrentPhase(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Next action logic for persistent bottom bar
  const handleNextAction = async () => {
    if (currentPhase === 'FRAME') {
      if (!isQuestionConfirmed && decisionQuestion) {
        handleConfirmDecisionQuestion(decisionQuestion, 'unedited');
      }
      markPhaseCompleted('FRAME');
      handleGoToPhase('GROUND');
    } else if (currentPhase === 'GROUND') {
      markPhaseCompleted('GROUND');
      handleGoToPhase('CHALLENGE');
    } else if (currentPhase === 'CHALLENGE') {
      markPhaseCompleted('CHALLENGE');
      handleGoToPhase('DECIDE');
    } else if (currentPhase === 'DECIDE') {
      // Save decision to IndexedDB
      const decisionToSave = buildDemoCanonicalDecision();
      // Update with PM choice and rationale
      decisionToSave.decisionQuestion = decisionQuestion || DEMO_DECISION_QUESTION;
      if (decisionToSave.versions[0]?.verdict) {
        decisionToSave.versions[0].verdict.executiveSummary = finalRationale;
        decisionToSave.versions[0].verdict.outcome =
          finalChoice === 'CONDITIONAL'
            ? 'ITERATE'
            : finalChoice === 'FULL'
            ? 'SHIP'
            : 'TEST';
      }
      void persistDecision(decisionToSave);
      setSavedDecision(decisionToSave);
      markPhaseCompleted('DECIDE');
      handleGoToPhase('RECORD');
    } else if (currentPhase === 'RECORD') {
      navigate({ name: 'decisions' });
    }
  };

  const handleBackAction = () => {
    if (currentPhase === 'GROUND') handleGoToPhase('FRAME');
    else if (currentPhase === 'CHALLENGE') handleGoToPhase('GROUND');
    else if (currentPhase === 'DECIDE') handleGoToPhase('CHALLENGE');
    else if (currentPhase === 'RECORD') handleGoToPhase('DECIDE');
    else setViewMode('home');
  };

  // Delete everything
  const handleDeleteEverything = () => {
    telemetry.emit('decision_deleted', { decisionId });
    void telemetry.flush();
    setContext(emptyContext);
    setRawEvidence('');
    setDecisionQuestion(null);
    setRunResult(null);
    setReviewHistory([]);
    setProgressSteps([]);
    deleteLocalData();
    telemetry.discardQueued();
    setDecisionId(telemetry.mintDecisionId());
    setViewMode('home');
    navigate({ name: 'run' });
  };

  // Dynamic next button label & orientation
  const getNextBarConfig = () => {
    switch (currentPhase) {
      case 'FRAME':
        return {
          label: isQuestionConfirmed
            ? 'Review the Evidence Foundation →'
            : 'Confirm Decision Question →',
          orientation: 'Formulate the consequential product call and make sure the question is sharp.',
          canNext: Boolean(decisionQuestion && decisionQuestion.trim().length > 3),
        };
      case 'GROUND':
        return {
          label: 'Enter the Specialist Jury Room →',
          orientation: 'Review what the Jury actually knows before they challenge your decision.',
          canNext: true,
        };
      case 'CHALLENGE':
        return {
          label: 'Review Jury Synthesis →',
          orientation: 'Examine where the Jury disagrees and record your challenge response.',
          canNext: Boolean(pmResponseText && pmResponseText.trim().length > 3),
        };
      case 'DECIDE':
        return {
          label: 'Save Decision & Rationale →',
          orientation: 'Review the panel synthesis and make the definitive PM product call.',
          canNext: Boolean(finalRationale && finalRationale.trim().length > 3),
        };
      case 'RECORD':
        return {
          label: 'View in Stored Decisions Archive →',
          orientation: 'Decision record is immutable and saved locally on this device.',
          canNext: true,
        };
    }
  };

  const nextConfig = getNextBarConfig();

  return (
    <div className="min-h-screen flex flex-col bg-stone-100/60 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-900">
      <Header
        onHome={() => {
          setViewMode('home');
          navigate({ name: 'run' });
        }}
        onNewReview={handleStartNewDecision}
        onOpenDecisions={() => navigate({ name: 'decisions' })}
        decisionsActive={route.name === 'decisions'}
        isDemo={isDemoMode}
        onExitDemo={handleExitDemo}
        onOpenHistory={() => setIsHistoryDrawerOpen(true)}
      />

      <main className="flex-1 flex flex-col">
        {/* Route: Stored Decisions List */}
        {route.name === 'decisions' ? (
          <DecisionsList
            state={decisionsState}
            onOpen={(id) => {
              telemetry.emit('decision_opened', { decisionId });
              navigate({ name: 'decision', id });
            }}
            onStartNew={handleStartNewDecision}
          />
        ) : route.name === 'decision' ? (
          /* Route: Single Stored Decision Detail */
          <DecisionDetail
            state={decisionState}
            onBack={() => navigate({ name: 'decisions' })}
          />
        ) : viewMode === 'home' ? (
          /* View: Landing Home Experience */
          <LandingHome
            onStartNewDecision={handleStartNewDecision}
            onStartDemoDecision={handleStartDemoDecision}
            onOpenStoredDecision={(id) => navigate({ name: 'decision', id })}
          />
        ) : runResult?.kind === 'FAILED' ? (
          <FailureView
            failure={runResult}
            onRetry={handleStartNewDecision}
            onBackToWorkspace={() => setViewMode('journey')}
          />
        ) : runResult?.kind === 'INSUFFICIENT' ? (
          <InsufficientView
            refusal={runResult}
            onSupplyEvidence={() => setViewMode('journey')}
          />
        ) : (
          /* View: 5-Phase Guided Decision Workflow */
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Left 5-step journey rail */}
            <JourneyRail
              currentPhase={currentPhase}
              completedPhases={completedPhases}
              onSelectPhase={handleGoToPhase}
              isDemo={isDemoMode}
            />

            {/* Main Stage Workspace */}
            <div className="flex-1 px-4 sm:px-8 py-4 overflow-y-auto">
              {currentPhase === 'FRAME' && (
                <FrameStep
                  context={context}
                  rawEvidence={rawEvidence}
                  decisionQuestion={decisionQuestion}
                  questionRationale={questionRationale}
                  isQuestionConfirmed={isQuestionConfirmed}
                  onChangeContext={(updates) => setContext((prev) => ({ ...prev, ...updates }))}
                  onChangeEvidence={(val) => setRawEvidence(val)}
                  onConfirmQuestion={handleConfirmDecisionQuestion}
                  onLoadDemoEvidence={() => {
                    setContext(demoWorkoutContext);
                    setRawEvidence(demoWorkoutRawEvidence);
                    setDecisionQuestion(DEMO_DECISION_QUESTION);
                    setQuestionRationale(
                      'Tests whether to roll out globally or bound risk to an opt-in cohort with safety guardrails.'
                    );
                  }}
                  isDemo={isDemoMode}
                />
              )}

              {currentPhase === 'GROUND' && (
                <GroundStep
                  claims={claims}
                  unknowns={unknowns}
                  onUpdateUnknown={(id, updates) =>
                    setUnknowns((prev) =>
                      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
                    )
                  }
                  onOpenClaimDetail={(c) => setSelectedClaimForDrawer(c)}
                  isDemo={isDemoMode}
                />
              )}

              {currentPhase === 'CHALLENGE' && (
                <ChallengeStep
                  specialists={specialists}
                  disagreement={disagreement}
                  pmSelectedResponseId={pmSelectedResponseId}
                  pmResponseText={pmResponseText}
                  onSelectPMResponse={(id, text) => {
                    setPmSelectedResponseId(id);
                    setPmResponseText(text);
                  }}
                  onOpenSpecialistDetail={(sp) => setSelectedSpecialistForDrawer(sp)}
                  isDemo={isDemoMode}
                />
              )}

              {currentPhase === 'DECIDE' && (
                <DecideStep
                  finalChoice={finalChoice}
                  finalRationale={finalRationale}
                  onSelectFinalChoice={(ch) => setFinalChoice(ch)}
                  onChangeRationale={(rat) => setFinalRationale(rat)}
                  isDemo={isDemoMode}
                />
              )}

              {currentPhase === 'RECORD' && (
                <RecordStep
                  decision={savedDecision}
                  decisionQuestion={decisionQuestion || DEMO_DECISION_QUESTION}
                  finalChoice={finalChoice}
                  finalRationale={finalRationale}
                  claims={claims}
                  specialists={specialists}
                  onStartNewDecision={handleStartNewDecision}
                  onOpenDecisionsList={() => navigate({ name: 'decisions' })}
                  isDemo={isDemoMode}
                />
              )}
            </div>

            {/* Right Contextual Decision Snapshot */}
            <DecisionSnapshot
              decisionQuestion={decisionQuestion}
              isQuestionConfirmed={isQuestionConfirmed}
              claims={claims}
              unknowns={unknowns}
              specialists={specialists}
              onOpenClaims={() => {
                if (claims.length > 0) setSelectedClaimForDrawer(claims[0]);
              }}
              onOpenUnknowns={() => handleGoToPhase('GROUND')}
            />
          </div>
        )}
      </main>

      {/* Persistent Bottom Action Bar (when inside the journey) */}
      {viewMode === 'journey' && !route.name.startsWith('decision') && (
        <NextActionBar
          onBack={handleBackAction}
          backLabel={currentPhase === 'FRAME' ? 'Exit to Home' : 'Back'}
          nextLabel={nextConfig.label}
          onNext={handleNextAction}
          canNext={nextConfig.canNext}
          orientationText={nextConfig.orientation}
        />
      )}

      {/* Progressive Disclosure Drawers */}
      <ClaimDrawer
        claim={selectedClaimForDrawer}
        onClose={() => setSelectedClaimForDrawer(null)}
      />

      <SpecialistDrawer
        specialist={selectedSpecialistForDrawer}
        onClose={() => setSelectedSpecialistForDrawer(null)}
        onSelectClaim={(claimId) => {
          const match = claims.find((c) => c.id === claimId);
          if (match) setSelectedClaimForDrawer(match);
        }}
      />

      {/* Standing Limitations: §53, TR-11: permanent, on every surface, not a modal */}
      <StandingLimitations />

      {/* Upload Privacy Disclosure Modal */}
      {privacyGateOpen && (
        <PrivacyDisclosure
          onAcknowledge={handlePrivacyAcknowledged}
          onCancel={handlePrivacyCancelled}
        />
      )}

      {/* Review History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        reviews={reviewHistory}
        onSelectReview={(selected) => {
          setContext(selected.context);
          setRawEvidence(selected.evidenceRaw || '');
          setIsHistoryDrawerOpen(false);
        }}
        onDeleteEverything={handleDeleteEverything}
      />
    </div>
  );
}
