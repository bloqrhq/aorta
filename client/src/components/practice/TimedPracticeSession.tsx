import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from './QuestionList';

interface TimedPracticeSessionProps {
    questions: Question[];
    onComplete: (results: PracticeResults) => void;
    onExit: () => void;
}

export interface PracticeResults {
    totalQuestions: number;
    attempted: number;
    correct: number;
    wrong: number;
    score: number;
    timeTaken: number; // in seconds
    unattempted: number;
}

type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked';



interface ConfirmationModalProps {
    type: 'submit' | 'exit';
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal = ({ type, onConfirm, onCancel }: ConfirmationModalProps) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        >
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {type === 'submit' ? 'Submit Test?' : 'Exit Practice?'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                    {type === 'submit'
                        ? 'Are you sure you want to finish the test? You cannot change your answers after submitting.'
                        : 'Your progress will be lost if you exit now. Are you sure?'}
                </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 rounded-lg font-medium text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className={`px-4 py-2 rounded-lg font-bold text-white shadow-lg transition-transform active:scale-95 ${type === 'submit' ? 'bg-primary shadow-primary/25' : 'bg-red-500 shadow-red-500/25'}`}
                >
                    {type === 'submit' ? 'Submit Now' : 'Exit'}
                </button>
            </div>
        </motion.div>
    </div>
);

export default function TimedPracticeSession({ questions, onComplete, onExit }: TimedPracticeSessionProps) {
    const DURATION_SECONDS = 30 * 60; // 30 mins

    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(DURATION_SECONDS);
    const [answers, setAnswers] = useState<Record<number, number>>({}); // qIndex -> optionIndex
    const [marked, setMarked] = useState<Set<number>>(new Set());
    const [visited, setVisited] = useState<Set<number>>(new Set([0]));
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
    const [confirmation, setConfirmation] = useState<'submit' | 'exit' | null>(null);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmitSession(); // Auto submit
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Helper to format time
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleJumpToQuestion = (index: number) => {
        setCurrentIndex(index);
        setVisited(prev => new Set(prev).add(index));
        setIsSidebarOpen(false); // Close sidebar on mobile after selection
    };

    const handleOptionSelect = (qIndex: number, optIndex: number) => {
        setAnswers(prev => ({
            ...prev,
            [qIndex]: optIndex
        }));
        // If it was marked, unmark it? Or keep it marked? 
        // Usually, answering doesn't clear mark automatically in JEE, but let's keep it simple.
        // We'll keep the mark state independent.
    };

    const handleClearResponse = () => {
        setAnswers(prev => {
            const next = { ...prev };
            delete next[currentIndex];
            return next;
        });
    };

    const handleMarkForReview = () => {
        setMarked(prev => {
            const next = new Set(prev);
            if (next.has(currentIndex)) {
                next.delete(currentIndex);
            } else {
                next.add(currentIndex);
            }
            return next;
        });

        // Move to next if not last
        if (currentIndex < questions.length - 1) {
            handleJumpToQuestion(currentIndex + 1);
        }
    };

    const handleSaveAndNext = () => {
        if (currentIndex < questions.length - 1) {
            handleJumpToQuestion(currentIndex + 1);
        } else {
            confirmSubmit();
        }
    };

    const handleSubmitSession = useCallback(() => {
        // Calculate results
        let correct = 0;
        let wrong = 0;
        let attempted = 0;

        questions.forEach((q, idx) => {
            if (idx in answers) {
                attempted++;
                if (answers[idx] === q.correct_answer) {
                    correct++;
                } else {
                    wrong++;
                }
            }
        });

        const score = (correct * 4) - (wrong * 1);
        const unattempted = questions.length - attempted;
        const timeTaken = DURATION_SECONDS - timeLeft;

        onComplete({
            totalQuestions: questions.length,
            attempted,
            correct,
            wrong,
            score,
            timeTaken,
            unattempted
        });
    }, [answers, questions, timeLeft, onComplete]);


    const getStatus = (idx: number): QuestionStatus => {
        if (marked.has(idx)) return 'marked';
        if (idx in answers) return 'answered';
        if (visited.has(idx)) return 'not_answered'; // Visited but no answer
        return 'not_visited';
    };

    const confirmSubmit = () => setConfirmation('submit');
    const confirmExit = () => setConfirmation('exit');

    const StatusColor = {
        marked: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-600',
        answered: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-600',
        not_answered: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800', // Visited but empty
        not_visited: 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
    };

    const currentQuestion = questions[currentIndex];





    return (
        <div className="flex h-screen max-h-screen bg-clinical dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-hidden font-sans pb-28">

            {/* Left Sidebar (Palette) - Visible on Desktop, Toggle on Mobile */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-dark border-r border-divider dark:border-slate-medium/10 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-4 border-b border-divider dark:border-slate-medium/10 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Question Palette</h3>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <div className="grid grid-cols-4 gap-2">
                        {questions.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleJumpToQuestion(idx)}
                                className={`
                                    w-10 h-10 rounded-lg text-sm font-bold border flex items-center justify-center transition-all
                                    ${getStatus(idx) === 'marked' ? StatusColor.marked :
                                        getStatus(idx) === 'answered' ? StatusColor.answered :
                                            getStatus(idx) === 'not_answered' ? StatusColor.not_answered :
                                                StatusColor.not_visited}
                                    ${currentIndex === idx ? 'ring-2 ring-primary ring-offset-1 dark:ring-offset-slate-900' : ''}
                                `}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-divider dark:border-slate-medium/10 bg-gray-50 dark:bg-slate-800/50 space-y-2 text-xs">
                    <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full border ${StatusColor.answered}`}></div> Answered</div>
                    <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full border ${StatusColor.not_answered}`}></div> Not Answered</div>
                    <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full border ${StatusColor.marked}`}></div> Marked for Review</div>
                    <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full border ${StatusColor.not_visited}`}></div> Not Visited</div>
                </div>
            </div>

            {/* Mobile Actions Overlay */}
            {isSidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}


            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full w-full">

                {/* Header/Timer Bar */}
                <div className="h-16 px-4 bg-white dark:bg-slate-dark border-b border-divider dark:border-slate-medium/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-500">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <button onClick={confirmExit} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors mr-1">
                            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <span className="text-sm font-medium text-slate-500 hidden sm:inline">Timed Practice</span>
                    </div>

                    <div className={`
                        px-4 py-2 rounded-lg font-mono text-xl font-bold border tracking-wider
                        ${timeLeft < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-divider dark:border-slate-700'}
                    `}>
                        {formatTime(timeLeft)}
                    </div>

                    <button
                        onClick={confirmSubmit}
                        className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-md hover:bg-primary-dark transition-colors"
                    >
                        Submit Test
                    </button>
                </div>

                {/* Question Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 relative">
                    <div className="max-w-4xl mx-auto pb-24">
                        {/* Question Header */}
                        <div className="flex items-start justify-between mb-6">
                            <h2 className="text-xl font-medium text-slate-800 dark:text-slate-100">
                                <span className="mr-3 font-bold text-slate-400">Q{currentIndex + 1}.</span>
                                {currentQuestion.question}
                            </h2>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            {currentQuestion.options.map((opt, idx) => {
                                const isSelected = answers[currentIndex] === idx;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleOptionSelect(currentIndex, idx)}
                                        className={`
                                            w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3
                                            ${isSelected
                                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-sm'
                                                : 'bg-white dark:bg-slate-800 border-divider dark:border-slate-700 hover:border-blue-400'
                                            }
                                        `}
                                    >
                                        <div className={`
                                            w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold
                                            ${isSelected ? 'bg-blue-500 text-white border-blue-500' : 'text-slate-400 border-slate-300'}
                                        `}>
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-300">{opt}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom ActionBar */}
                <div className="h-20 bg-white dark:bg-slate-dark border-t border-divider dark:border-slate-medium/10 px-4 sm:px-8 flex items-center justify-between shrink-0">
                    <div className="flex gap-2">
                        <button
                            onClick={handleMarkForReview}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors
                                ${marked.has(currentIndex)
                                    ? 'bg-purple-100 text-purple-700 border-purple-300'
                                    : 'text-slate-500 hover:text-purple-600 border-transparent hover:bg-purple-50'}
                            `}
                        >
                            {marked.has(currentIndex) ? 'Unmark Review' : 'Mark for Review'}
                        </button>
                        <button
                            onClick={handleClearResponse}
                            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                            Clear
                        </button>
                    </div>

                    <button
                        onClick={handleSaveAndNext}
                        className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark hover:-translate-y-0.5 transition-all"
                    >
                        {currentIndex === questions.length - 1 ? 'Save & Submit' : 'Save & Next'}
                    </button>
                </div>

            </div>
            {confirmation && (
                <ConfirmationModal
                    type={confirmation}
                    onConfirm={() => {
                        if (confirmation === 'submit') handleSubmitSession();
                        else onExit();
                        setConfirmation(null);
                    }}
                    onCancel={() => setConfirmation(null)}
                />
            )}
        </div>
    );
}
