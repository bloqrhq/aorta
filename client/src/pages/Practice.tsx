import { useState, useEffect } from "react";
import PracticeLayout from "../components/practice/PracticeLayout";
import SidebarFilters, { SidebarHeatmap } from "../components/practice/SidebarFilters";
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

  // Lifted State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timedQuestions, setTimedQuestions] = useState<Question[]>([]);
  const [sessionResults, setSessionResults] = useState<PracticeResults | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Solved Questions Tracking
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

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
    if (mode === 'timed') {
      setCurrentView('timed-setup');
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

  // Render content based on view
  const renderContent = () => {
    switch (currentView) {
      case 'timed-setup':
        return <TimedPracticeSetup onStart={startTimedSession} onCancel={handleBackToList} />;
      case 'timed-session':
        return (
          <TimedPracticeSession
            questions={timedQuestions}
            onComplete={handleTimedSessionComplete}
            onExit={handleBackToList}
          />
        );
      case 'timed-result':
        return sessionResults && <TimedPracticeResult results={sessionResults} onClose={handleBackToList} />;
      case 'player':
        return selectedQuestion && (
          <QuestionPlayer
            question={selectedQuestion}
            subject={subject}
            stats={userStats}
            onBack={handleBackToList}
            onNext={handleNextQuestion}
            onSolve={() => handleSolve(selectedQuestion._id)}
            onUpdateStats={handleUpdateStats}
            isLast={isLastQuestion}
          />
        );
      case 'list':
      default:
        return (
          <QuestionList
            subject={subject}
            questions={questions}
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
      sidebar={<SidebarFilters subject={subject} setSubject={setSubject} onModeSelect={handleModeSelect} />}
      utilityPanel={<UtilityPanel stats={userStats} />}
      mobileBottom={currentView === 'list' ? <SidebarHeatmap /> : null} // Only show bottom heatmap in list view
    >
      {renderContent()}
    </PracticeLayout>
  );
}

