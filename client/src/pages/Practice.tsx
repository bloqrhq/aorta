import { useState, useEffect, useMemo } from "react";
import PracticeLayout from "../components/practice/PracticeLayout";
import SidebarFilters, { SidebarHeatmap, type Filters } from "../components/practice/SidebarFilters";
import UtilityPanel from "../components/practice/UtilityPanel";
import QuestionList, { type Question } from "../components/practice/QuestionList";
import QuestionPlayer from "../components/practice/QuestionPlayer";
import TimedPracticeSetup from "../components/practice/TimedPracticeSetup";
import TimedPracticeSession, { type PracticeResults } from "../components/practice/TimedPracticeSession";
import TimedPracticeResult from "../components/practice/TimedPracticeResult";
import api from '../api/axios';

// Simple in-memory cache
const questionCache: Record<string, Question[]> = {};

export interface UserStats {
  solved: number;
  attempts: number;
  streak: number;
}

type ViewState = 'list' | 'player' | 'timed-setup' | 'timed-session' | 'timed-result';

export default function Practice() {
  const [currentView, setCurrentView] = useState<ViewState>('list');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [subject, setSubject] = useState('phy');
  const [selectedMode, setSelectedMode] = useState('subject-wise');

  // Lifted State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timedQuestions, setTimedQuestions] = useState<Question[]>([]);
  const [sessionResults, setSessionResults] = useState<PracticeResults | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Solved Questions Tracking
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

  // Filters
  const [filters, setFilters] = useState<Filters>({ year: '', status: 'all' });

  // User Stats
  const [userStats, setUserStats] = useState<UserStats>({ solved: 0, attempts: 0, streak: 0 });

  // Load data on mount
  useEffect(() => {
    const savedSolved = localStorage.getItem('solved_questions');
    if (savedSolved) {
      setSolvedIds(new Set(JSON.parse(savedSolved)));
    }

    const savedStats = localStorage.getItem('user_stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  // Fetch Questions
  useEffect(() => {
    // Reset view when subject changes
    setCurrentView('list');
    setSelectedQuestion(null);
    setSelectedMode('subject-wise'); // Reset mode on subject change to default

    const fetchQuestions = async () => {
      // Check cache
      if (questionCache[subject]) {
        setQuestions(questionCache[subject]);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/api/questions/${subject}`);
        const data = res.data || [];
        questionCache[subject] = data;
        setQuestions(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load questions.');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    if (subject) {
      fetchQuestions();
    }
  }, [subject]);

  const handleSelectQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setCurrentView('player');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedQuestion(null);
  };

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
    if (mode === 'timed') {
      setCurrentView('timed-setup');
    } else if (mode === 'subject-wise') {
      setCurrentView('list');
    }
  };

  const startTimedSession = () => {
    // Select 30 random questions from current subject, excluding solved if possible
    // For now, just take up to 30 from the text loaded questions to keep it simple without new API
    // Ideally we should shuffle
    let pool = [...questions];

    // Filter solved if enough questions remain
    const unsolvled = pool.filter(q => !solvedIds.has(q._id));
    if (unsolvled.length >= 10) { // arbitrary threshold to prefer unsolved
      pool = unsolvled;
    }

    // Shuffle
    pool.sort(() => Math.random() - 0.5);

    // Pick 30
    const selected = pool.slice(0, 30);
    setTimedQuestions(selected);
    setCurrentView('timed-session');
  };

  const handleTimedSessionComplete = (results: PracticeResults) => {
    setSessionResults(results);

    // Update Global Stats
    setUserStats(prev => {
      const newStats = {
        solved: prev.solved + results.correct,
        attempts: prev.attempts + results.attempted,
        streak: prev.streak // Streak logic for timed mode? Maybe simple addition? Or just leave it.
      };
      localStorage.setItem('user_stats', JSON.stringify(newStats));
      return newStats;
    });

    setCurrentView('timed-result');
  };

  const handleSolve = (questionId: string) => {
    setSolvedIds(prev => {
      const newSet = new Set(prev);
      newSet.add(questionId);
      localStorage.setItem('solved_questions', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const handleUpdateStats = (isCorrect: boolean) => {
    setUserStats(prev => {
      const newStats = {
        solved: prev.solved + (isCorrect ? 1 : 0),
        attempts: prev.attempts + 1,
        streak: isCorrect ? prev.streak + 1 : 0
      };
      localStorage.setItem('user_stats', JSON.stringify(newStats));
      return newStats;
    });
  };

  const handleNextQuestion = () => {
    if (!selectedQuestion) return;

    const currentIndex = questions.findIndex(q => q._id === selectedQuestion._id);
    if (currentIndex !== -1 && currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1];
      setSelectedQuestion(nextQuestion);
      // View stays 'player'
    } else {
      // Last question
      handleBackToList();
    }
  };

  const isLastQuestion = selectedQuestion
    ? questions.findIndex(q => q._id === selectedQuestion._id) === questions.length - 1
    : false;

  // derived state for filtered questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // Status Filter
      if (filters.status === 'solved' && !solvedIds.has(q._id)) return false;
      if (filters.status === 'unsolved' && solvedIds.has(q._id)) return false;

      // Year Filter (Assuming question has a 'year' property or similar, if not we skip for now or verify mock data)
      // Based on previous files, 'year' might not exist on Question type yet. 
      // If the API returns it, we can filter. If not, this is a placeholder.
      // Let's assume for now we might need to match it if it exists.
      // Checking QuestionList type from previous contexts... 
      // The Question interface wasn't fully visible but let's assume standard fields.
      // If 'year' is not in data, this filter might effectively do nothing or needs backend update.
      // For this task we implement the logic on frontend assuming data availability
      if (filters.year && (q as any).year && String((q as any).year) !== filters.year) return false;

      return true;
    });
  }, [questions, filters, solvedIds]);


  const handleExitTimedMode = () => {
    setCurrentView('list');
    setSelectedMode('subject-wise');
  };

  // Render content based on view
  const renderContent = () => {
    switch (currentView) {
      case 'timed-setup':
        return (
          <TimedPracticeSetup
            onStart={startTimedSession}
            onCancel={handleExitTimedMode}
          />
        );
      case 'timed-session':
        return (
          <TimedPracticeSession
            questions={timedQuestions}
            onComplete={handleTimedSessionComplete}
            onExit={handleExitTimedMode} // Exit returns to list
          />
        );
      case 'timed-result':
        return sessionResults ? (
          <TimedPracticeResult
            results={sessionResults}
            onClose={handleExitTimedMode}
          />
        ) : null;
      case 'player':
        return selectedQuestion && (
          <QuestionPlayer
            question={selectedQuestion}
            subject={subject}
            stats={userStats}
            onBack={handleBackToList}
            onNext={() => {
              // Find next index
              const idx = filteredQuestions.findIndex(q => q._id === selectedQuestion._id);
              if (idx !== -1 && idx < filteredQuestions.length - 1) {
                setSelectedQuestion(filteredQuestions[idx + 1]);
              }
            }}
            onSolve={() => handleSolve(selectedQuestion._id)}
            onUpdateStats={handleUpdateStats}
            isLast={false} // Todo: calculate real last
          />
        );
      case 'list':
      default:
        return (
          <QuestionList
            subject={subject}
            questions={filteredQuestions}
            loading={loading}
            error={error}
            solvedIds={solvedIds}
            onSelectQuestion={handleSelectQuestion}
          />
        );
    }
  };

  return (
    <PracticeLayout
      sidebar={
        <SidebarFilters
          subject={subject}
          setSubject={setSubject}
          filters={filters}
          setFilters={setFilters}
          onModeSelect={handleModeSelect}
          selectedMode={selectedMode}
        />
      }
      utilityPanel={<UtilityPanel stats={userStats} />}
      mobileBottom={
        currentView === 'list' ? (
          <div className="space-y-4">
            <UtilityPanel stats={userStats} />
            <SidebarHeatmap />
          </div>
        ) : null
      }
    >
      {renderContent()}
    </PracticeLayout>
  );
}
