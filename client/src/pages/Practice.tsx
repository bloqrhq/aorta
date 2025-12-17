import { useState, useEffect } from "react";
import PracticeLayout from "../components/practice/PracticeLayout";
import SidebarFilters from "../components/practice/SidebarFilters";
import UtilityPanel from "../components/practice/UtilityPanel";
import QuestionList, { type Question } from "../components/practice/QuestionList";
import QuestionPlayer from "../components/practice/QuestionPlayer";
import api from '../api/axios';

// Simple in-memory cache
const questionCache: Record<string, Question[]> = {};

export default function Practice() {
  const [currentView, setCurrentView] = useState<'list' | 'player'>('list');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [subject, setSubject] = useState('phy');

  // Lifted State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Solved Questions Tracking
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

  // Load solved status on mount
  useEffect(() => {
    const saved = localStorage.getItem('solved_questions');
    if (saved) {
      setSolvedIds(new Set(JSON.parse(saved)));
    }
  }, []);

  // Fetch Questions
  useEffect(() => {
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

  const handleSolve = (questionId: string) => {
    setSolvedIds(prev => {
      const newSet = new Set(prev);
      newSet.add(questionId);
      localStorage.setItem('solved_questions', JSON.stringify(Array.from(newSet)));
      return newSet;
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

  return (
    <PracticeLayout
      sidebar={<SidebarFilters subject={subject} setSubject={setSubject} />}
      utilityPanel={<UtilityPanel />}
    >
      {currentView === 'list' ? (
        <QuestionList
          subject={subject}
          questions={questions}
          loading={loading}
          error={error}
          solvedIds={solvedIds}
          onSelectQuestion={handleSelectQuestion}
        />
      ) : (
        selectedQuestion && (
          <QuestionPlayer
            question={selectedQuestion}
            subject={subject}
            onBack={handleBackToList}
            onNext={handleNextQuestion}
            onSolve={() => handleSolve(selectedQuestion._id)}
            isLast={isLastQuestion}
          />
        )
      )}
    </PracticeLayout>
  );
}
