import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from './QuestionList'; // Import shared interface

interface QuestionPlayerProps {
    question: Question;
    subject: string;
    onBack: () => void;
    onNext: () => void;
    onSolve: () => void;
    isLast: boolean;
}

export default function QuestionPlayer({ question, subject, onBack, onNext, onSolve, isLast }: QuestionPlayerProps) {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempts, setAttempts] = useState(0); // 0 = fresh, 1 = one attempt used
    const [showWarning, setShowWarning] = useState(false); // For first wrong attempt

    // Reset state when question changes
    useEffect(() => {
        setSelectedOptionIndex(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setAttempts(0);
        setShowWarning(false);
    }, [question]);

    const handleOptionSelect = (index: number) => {
        if (!isSubmitted) {
            setSelectedOptionIndex(index);
            setShowWarning(false); // clear warning on new selection
        }
    };

    const handleSubmit = () => {
        if (selectedOptionIndex === null) return;

        const correct = selectedOptionIndex === question.correct_answer;

        if (correct) {
            // Correct on first or second try
            setIsCorrect(true);
            setIsSubmitted(true);

            // Update Stats & Solved Status
            updateStats(true);
            onSolve(); // Mark as solved in parent
        } else {
            // Incorrect
            if (attempts === 0) {
                // First attempt wrong -> Warning
                setAttempts(1);
                setShowWarning(true);
                // Do not mark as submitted yet, let them try again
                // Optionally visually indicate that the selected option was wrong if desired, 
                // but usually "Try again" implies it. 
                // Let's just reset selection or keep it to show it was wrong?
                // For better UX, let's keep it selected but show warning.
            } else {
                // Second attempt wrong -> Fail
                setIsCorrect(false);
                setIsSubmitted(true);
                updateStats(false);
            }
        }
    };

    const updateStats = (isSuccess: boolean) => {
        const stats = JSON.parse(localStorage.getItem('user_stats') || '{"solved": 0, "attempts": 0}');
        stats.attempts += 1;
        if (isSuccess) stats.solved += 1;
        localStorage.setItem('user_stats', JSON.stringify(stats));
    };

    const acceptanceRate = () => {
        const stats = JSON.parse(localStorage.getItem('user_stats') || '{"solved": 0, "attempts": 0}');
        if (stats.attempts === 0) return 100;
        return Math.round((stats.solved / stats.attempts) * 100);
    };

    return (
        <div className="flex flex-col h-full relative font-sans bg-gray-50 dark:bg-slate-900/50 pb-20">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-dark border-b border-divider dark:border-slate-medium/10 shadow-sm sticky top-0 z-10">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                    Back to List
                </button>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Your Accuracy</span>
                    <span className={`text-base font-bold ${acceptanceRate() >= 70 ? 'text-recovery' : acceptanceRate() >= 40 ? 'text-warning' : 'text-arterial'}`}>
                        {acceptanceRate()}%
                    </span>
                </div>
            </div>

            {/* Main Content - Added huge bottom padding to prevent cutoff */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 pb-40">
                <div className="max-w-3xl mx-auto">
                    {/* Header: Tags & Question */}
                    <div className="bg-white dark:bg-slate-dark rounded-2xl p-6 sm:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] dark:shadow-none border border-divider dark:border-slate-medium/10 mb-6">
                        <div className="flex gap-2 mb-6">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full tracking-wide">{subject.toUpperCase()}</span>
                            {question.year && <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">{question.year}</span>}
                        </div>

                        <h2 className="text-xl sm:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                            {question.question}
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-8">
                        {question.options.map((opt, idx) => {
                            const optId = String.fromCharCode(65 + idx);
                            const isSelected = selectedOptionIndex === idx;
                            const isCorrectAnswer = idx === question.correct_answer;

                            // Determine styles based on state
                            let containerStyle = "border-divider dark:border-slate-medium/10 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md";
                            let badgeStyle = "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600";

                            if (isSelected && !isSubmitted) {
                                containerStyle = "border-primary bg-primary/5 shadow-md shadow-primary/10 ring-1 ring-primary";
                                badgeStyle = "bg-primary text-white border-primary";
                            }

                            // Submitted State
                            if (isSubmitted) {
                                if (isCorrectAnswer) {
                                    // Always highlight correct answer
                                    containerStyle = "bg-recovery/10 border-recovery/50 shadow-md shadow-recovery/10";
                                    badgeStyle = "bg-recovery text-white border-recovery";
                                } else if (isSelected && !isCorrectAnswer) {
                                    // Highlight wrong selection
                                    containerStyle = "bg-arterial/10 border-arterial/50 shadow-md shadow-arterial/10";
                                    badgeStyle = "bg-arterial text-white border-arterial";
                                } else {
                                    // Fade others
                                    containerStyle = "opacity-50 grayscale bg-slate-50 dark:bg-slate-800/50";
                                }
                            }

                            return (
                                <motion.button
                                    key={idx}
                                    onClick={() => handleOptionSelect(idx)}
                                    whileTap={{ scale: isSubmitted ? 1 : 0.99 }}
                                    className={`
                                        w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex items-start gap-4
                                        ${containerStyle}
                                    `}
                                    disabled={isSubmitted}
                                >
                                    <span className={`
                                        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors mt-0.5
                                        ${badgeStyle}
                                    `}>
                                        {optId}
                                    </span>
                                    <span className={`text-base sm:text-lg leading-relaxed ${isSubmitted && !isCorrectAnswer && !isSelected ? 'text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                                        {opt}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Inline Warning for 1st attempt */}
                    <AnimatePresence>
                        {showWarning && !isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-500/30 rounded-xl flex items-center gap-3 text-orange-700 dark:text-orange-400"
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <div>
                                    <p className="font-bold text-sm">Incorrect Answer</p>
                                    <p className="text-sm opacity-90">That wasn't right. You have 1 attempt remaining.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Feedback Panel (Post-Submit) */}
                    <AnimatePresence>
                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`rounded-2xl border shadow-lg overflow-hidden ${isCorrect ? 'bg-recovery/5 border-recovery/20' : 'bg-arterial/5 border-arterial/20'}`}
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-full ${isCorrect ? 'bg-recovery text-white' : 'bg-arterial text-white'}`}>
                                            {isCorrect ? (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <h3 className={`text-xl font-bold ${isCorrect ? 'text-recovery' : 'text-arterial'}`}>
                                            {isCorrect ? 'Well Done!' : 'Not Quite Right'}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 ml-11">
                                        {isCorrect
                                            ? "You got it! Great job."
                                            : <span>The correct answer was <strong className="text-slate-800 dark:text-slate-200">Option {String.fromCharCode(65 + question.correct_answer)}</strong>.</span>
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-dark border-t border-divider dark:border-slate-medium/10 p-4 sm:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <div className="hidden sm:block text-sm text-slate-400 font-medium">
                        {isSubmitted ? 'Review your answer' : 'Select an option to continue'}
                    </div>

                    {isSubmitted ? (
                        <div className="flex gap-3 w-full sm:w-auto justify-end">
                            <button
                                onClick={onBack}
                                className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                            >
                                Back to List
                            </button>
                            <button
                                onClick={onNext}
                                className="flex-1 sm:flex-none bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
                            >
                                {isLast ? 'Finish Practice' : 'Next Question →'}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={selectedOptionIndex === null}
                            className={`
                                w-full sm:w-auto px-8 py-3 rounded-xl font-bold shadow-lg transition-all
                                ${selectedOptionIndex !== null
                                    ? 'bg-primary hover:bg-primary-dark text-white shadow-primary/20 hover:-translate-y-0.5'
                                    : 'bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
                                }
                            `}
                        >
                            {attempts > 0 ? 'Use Last Attempt' : 'Check Answer'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}


