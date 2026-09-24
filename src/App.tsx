import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { NavItem } from './components/Sidebar';
import { GlobalNav } from './components/GlobalNav';
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
import { SettingsModal } from './components/SettingsModal';
import { TemplatesView, DecisionTemplate } from './components/TemplatesView';
import { LibraryView } from './components/LibraryView';

import { JourneyPhase } from './components/journey/types';
import { JourneyRail } from './components/journey/JourneyRail';
import { NextActionBar } from './components/journey/NextActionBar';
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
import {
  listStoredDecisions,
  openStoredDecision,
  persistDecision,
  type StoredDecision,
  type StoredDecisions,
} from './services/decisionPersistence';
import { reviewService } from './services/reviewService';
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
  const [activeNav, setActiveNav] = useState<NavItem>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // App View Modes: 'home' | 'journey' | 'results'
  const [viewMode, setViewMode] = useState<'home' | 'journey' | 'results'>('home');
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
  const [keptDecisionId, setKeptDecisionId] = useState<string | null>(null);
  const [reviewHistory, setReviewHistory] = useState<ProductReview[]>([]);
  const [isRedTeamModalOpen, setIsRedTeamModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressSteps, setProgressSteps] = useState<AnalysisProgressStep[]>([]);
  const [privacyGateOpen, setPrivacyGateOpen] = useState(false);
  const pendingUploadRef = useRef<(() => void) | null>(null);

  // Route synchronization
  useEffect(() => {
    let current = true;
    if (route.name === 'decisions') {
      setActiveNav('decisions');
      setDecisionsState({ status: 'loading' });
      void listStoredDecisions().then((next) => {
        if (current) setDecisionsState(next);
      });
    } else if (route.name === 'decision') {
      setActiveNav('decisions');
      setDecisionState({ status: 'loading' });
      void openStoredDecision(route.id).then((next) => {
        if (current) setDecisionState(next);
      });
    } else {
      if (activeNav === 'decisions') {
        setActiveNav('overview');
      }
    }
    return () => {
      current = false;
    };
  }, [route.name, route.name === 'decision' ? route.id : '']);

  // Reset to brand new decision
  const handleStartNewDecision = () => {
    navigate({ name: 'run' });
    setActiveNav('overview');
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
    setActiveNav('overview');
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
    setActiveNav('overview');
    navigate({ name: 'run' });
  };

  // Template Selection
  const handleSelectTemplate = (template: DecisionTemplate) => {
    navigate({ name: 'run' });
    setActiveNav('overview');
    setIsDemoMode(false);
    setContext({
      ...emptyContext,
      ...template.context,
    });
    setDecisionQuestion(template.decisionQuestion);
    setQuestionRationale(template.description);
    setIsQuestionConfirmed(true);
    setClaims(demoWorkoutClaims);
    setUnknowns(demoWorkoutUnknowns);
    setSpecialists(demoWorkoutSpecialists);
    setCompletedPhases(new Set());
    setCurrentPhase('FRAME');
    setViewMode('journey');
    setDecisionId(telemetry.mintDecisionId());
  };

  // Pipeline Execution
  const handleRunReview = async () => {
    setIsAnalyzing(true);
    try {
      const result = await reviewService.runReview(
        {
          context,
          decisionQuestion: decisionQuestion || '',
          rawEvidence,
        },
        setProgressSteps
      );
      setRunResult(result);
      if (result.kind === 'VERDICT') {
        setKeptDecisionId(result.decision.id);
        void persistDecision(result.decision);
        setReviewHistory((prev) => [result.review, ...prev]);
        setViewMode('results');
      }
    } catch (err) {
      console.error('Review execution error:', err);
    } finally {
      setIsAnalyzing(false);
    }
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

    if (claims.length === 0) {
      setClaims(demoWorkoutClaims);
      setUnknowns(demoWorkoutUnknowns);
      setSpecialists(demoWorkoutSpecialists);
    }
    markPhaseCompleted('FRAME');
    handleGoToPhase('GROUND');
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
      } else {
        markPhaseCompleted('FRAME');
        handleGoToPhase('GROUND');
      }
    } else if (currentPhase === 'GROUND') {
      markPhaseCompleted('GROUND');
      handleGoToPhase('CHALLENGE');
    } else if (currentPhase === 'CHALLENGE') {
      markPhaseCompleted('CHALLENGE');
      handleGoToPhase('DECIDE');
    } else if (currentPhase === 'DECIDE') {
      const decisionToSave = buildDemoCanonicalDecision(
        decisionQuestion || DEMO_DECISION_QUESTION,
        finalRationale || demoWorkoutDefaultRationale,
        finalChoice
      );
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
    setActiveNav('overview');
    navigate({ name: 'run' });
  };

  // Dynamic next button label & orientation
  const getNextBarConfig = () => {
    switch (currentPhase) {
      case 'FRAME':
        return {
          label: 'Continue to Grounding →',
          orientation: 'Review what empirical facts and assumptions this decision depends on.',
          canNext: Boolean(decisionQuestion && decisionQuestion.trim().length > 3),
        };
      case 'GROUND':
        return {
          label: 'Continue to Specialist Challenge →',
          orientation: 'See how the specialist panel stress-tests the decision spine.',
          canNext: true,
        };
      case 'CHALLENGE':
        return {
          label: 'Continue to Synthesis →',
          orientation: 'Your PM response feeds directly into the final decision synthesis.',
          canNext: Boolean(pmResponseText && pmResponseText.trim().length > 3),
        };
      case 'DECIDE':
        return {
          label: 'Save Decision & Rationale →',
          orientation: 'You make the definitive product call with full provenance.',
          canNext: Boolean(finalRationale && finalRationale.trim().length > 3),
        };
      case 'RECORD':
        return {
          label: 'View in Stored Decisions →',
          orientation: 'Decision record is immutable and saved locally on this device.',
          canNext: true,
        };
    }
  };

  const nextConfig = getNextBarConfig();

  // Dynamic breadcrumb definition
  const getBreadcrumb = () => {
    if (route.name === 'decision') {
      return {
        section: 'Decisions',
        item:
          decisionState.status === 'loaded'
            ? decisionState.decision.decisionQuestion
            : 'Decision detail',
        onSectionClick: () => navigate({ name: 'decisions' }),
      };
    }
    if (route.name === 'decisions') {
      return {
        section: 'Workspace',
        item: 'Decisions',
      };
    }
    if (activeNav === 'templates') {
      return {
        section: 'Workspace',
        item: 'Templates',
        onSectionClick: () => {
          setActiveNav('overview');
          setViewMode('home');
        },
      };
    }
    if (activeNav === 'evidence') {
      return {
        section: 'Library',
        item: 'Evidence',
        onSectionClick: () => {
          setActiveNav('overview');
          setViewMode('home');
        },
      };
    }
    if (activeNav === 'claims') {
      return {
        section: 'Library',
        item: 'Claims',
        onSectionClick: () => {
          setActiveNav('overview');
          setViewMode('home');
        },
      };
    }
    if (viewMode === 'journey') {
      return {
        section: 'Decisions',
        item: decisionQuestion || 'New decision',
        onSectionClick: () => {
          setViewMode('home');
          setActiveNav('overview');
        },
      };
    }
    return {
      section: 'Workspace',
      item: 'Overview',
    };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <div className="min-h-screen w-screen flex flex-col bg-[#F7F7F4] text-[#17191C] font-sans antialiased selection:bg-[#FBE1D1] selection:text-[#5D2A1A]">
      {/* Global Top Navigation */}
      <GlobalNav
        currentNav={activeNav}
        onSelectNav={(nav) => {
          if (nav === 'settings') {
            setIsSettingsOpen(true);
            return;
          }
          setActiveNav(nav);
          if (nav === 'decisions') {
            navigate({ name: 'decisions' });
          } else {
            navigate({ name: 'run' });
            if (nav === 'overview') {
              setViewMode('home');
            }
          }
        }}
        onNewDecision={handleStartNewDecision}
        onOpenSettings={() => setIsSettingsOpen(true)}
        viewMode={viewMode}
        currentPhase={currentPhase}
        completedPhases={completedPhases}
        onSelectPhase={handleGoToPhase}
        decisionTitle={decisionQuestion}
        isDemo={isDemoMode}
        onExitDemo={handleExitDemo}
        onBackToHome={() => {
          setViewMode('home');
          setActiveNav('overview');
          navigate({ name: 'run' });
        }}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto bg-[#F7F7F4]">
          {/* Stored Decisions List */}
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
            /* Single Stored Decision Detail */
            <DecisionDetail
              state={decisionState}
              onBack={() => navigate({ name: 'decisions' })}
            />
          ) : activeNav === 'templates' ? (
            /* Templates View */
            <TemplatesView
              onSelectTemplate={handleSelectTemplate}
              onBackToOverview={() => {
                setActiveNav('overview');
                setViewMode('home');
              }}
            />
          ) : activeNav === 'evidence' ? (
            /* Evidence Library View */
            <LibraryView type="evidence" />
          ) : activeNav === 'claims' ? (
            /* Claims Library View */
            <LibraryView
              type="claims"
              onSelectClaim={(claim) => setSelectedClaimForDrawer(claim)}
            />
          ) : viewMode === 'home' ? (
            /* SaaS Overview / Home */
            <LandingHome
              onStartNewDecision={handleStartNewDecision}
              onStartDemoDecision={handleStartDemoDecision}
              onOpenStoredDecision={(id) => navigate({ name: 'decision', id })}
              onOpenDecisionsList={() => navigate({ name: 'decisions' })}
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
          ) : viewMode === 'results' && runResult?.kind === 'VERDICT' ? (
            <ResultsView
              review={runResult.review}
              provenance={runResult.provenance}
              onBackToWorkspace={() => setViewMode('journey')}
              onChallengeDecision={() => handleGoToPhase('CHALLENGE')}
            />
          ) : (
            /* 5-Phase Guided Decision Workflow */
            <div className="pb-16">
              {currentPhase === 'FRAME' && (
                <FrameStep
                  context={context}
                  rawEvidence={rawEvidence}
                  decisionQuestion={decisionQuestion}
                  questionRationale={questionRationale}
                  isQuestionConfirmed={isQuestionConfirmed}
                  onChangeContext={(updates) =>
                    setContext((prev) => ({ ...prev, ...updates }))
                  }
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
                  onContinueToChallenge={() => {
                    markPhaseCompleted('GROUND');
                    handleGoToPhase('CHALLENGE');
                  }}
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
                  onContinueToDecide={() => {
                    markPhaseCompleted('CHALLENGE');
                    handleGoToPhase('DECIDE');
                  }}
                  isDemo={isDemoMode}
                />
              )}

              {currentPhase === 'DECIDE' && (
                <DecideStep
                  finalChoice={finalChoice}
                  finalRationale={finalRationale}
                  onSelectFinalChoice={(ch) => setFinalChoice(ch)}
                  onChangeRationale={(rat) => setFinalRationale(rat)}
                  onContinueToRecord={handleNextAction}
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
          )}
        </main>

        {/* Standing Limitations: §53, TR-11: permanent, on every surface, not a modal */}
        <StandingLimitations />
      </div>

      {/* Persistent Bottom Action Bar (when inside the journey) */}
      {route.name === 'run' &&
        activeNav === 'overview' &&
        viewMode === 'journey' &&
        (currentPhase === 'GROUND' || currentPhase === 'CHALLENGE' || currentPhase === 'DECIDE') && (
          <NextActionBar
            onBack={handleBackAction}
            backLabel={currentPhase === 'GROUND' ? 'Exit to Frame' : 'Back'}
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

      {/* Workspace Settings & Local Storage Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onDataDeleted={handleDeleteEverything}
      />

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
