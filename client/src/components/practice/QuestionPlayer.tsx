import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
    _id: string;
    question: string;
    options: string[];
    correct: string;
    year?: string;
}

interface QuestionPlayerProps {
    question: Question;
    subject: string;
    onBack: () => void;
}

export default function QuestionPlayer({ question, subject, onBack }: QuestionPlayerProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [confidence, setConfidence] = useState(50);

    // Reset state when question changes
    useEffect(() => {
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setAttempts(0);
        setConfidence(50);
    }, [question]);

    const handleOptionSelect = (option: string) => {
        if (!isSubmitted) setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (!selectedOption) return;

        const correct = selectedOption === question.correct;
        setIsCorrect(correct);
        setAttempts(prev => prev + 1);

        // Update Stats
        const stats = JSON.parse(localStorage.getItem('user_stats') || '{"solved": 0, "attempts": 0}');
        stats.attempts += 1;
        if (correct) stats.solved += 1;
        localStorage.setItem('user_stats', JSON.stringify(stats));

        if (correct || attempts >= 1) { // 2nd attempt (index 1) or correct, show result
            setIsSubmitted(true);
        } else {
            // Shake or simple feedback for 1st wrong attempt could go here
            // For now we just let them try again but don't show "Submitted" UI fully, 
            // maybe just a toast or inline error, but the prompt says 2 attempts.
            // If first attempt is wrong, they get one more chance.
            // We can show "Incorrect, 1 attempt left" message.
            alert("Incorrect answer. You have 1 attempt remaining.");
            setSelectedOption(null);
        }
    };

    const acceptanceRate = () => {
        const stats = JSON.parse(localStorage.getItem('user_stats') || '{"solved": 0, "attempts": 0}');
        if (stats.attempts === 0) return 100;
        return Math.round((stats.solved / stats.attempts) * 100);
    };

    return (
        <div className="flex flex-col h-full relative font-sans">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-divider dark:border-slate-medium/10 bg-white dark:bg-slate-dark">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to List
                </button>
                <div className="text-sm font-bold text-slate-dark dark:text-slate-200">
                    Acceptance Rate: {acceptanceRate()}%
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pb-32">
                <div className="max-w-3xl mx-auto">
                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                        <span className="px-2 py-1 bg-neural/10 text-neural text-xs font-semibold rounded-md">{subject.toUpperCase()}</span>
                        {question.year && <span className="px-2 py-1 bg-arterial/10 text-arterial text-xs font-semibold rounded-md">{question.year}</span>}
                    </div>

                    {/* Question Text */}
                    <h2 className="text-xl font-medium text-slate-dark dark:text-slate-100 leading-relaxed mb-8">
                        {question.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3 mb-8">
                        {question.options.map((opt, idx) => {
                            // Assuming options are just strings in the array. 
                            // If backend stores objects, adapt here. Based on Controller, they seem to be in an array.
                            // Let's assume options is array of strings. 
                            // Wait, correct answer is usually an Option Text or Option Index?
                            // Controller schema isn't fully visible but usually it's text or A/B/C/D.
                            // LeetCode style usually A, B, C, D. Let's assume `question.options` is ["Text A", "Text B", ...].
                            // And `question.correct` is the option string.

                            // Let's create an ID like A, B, C, D for display
                            const optId = String.fromCharCode(65 + idx);
                            // If correct matches option text
                            const isOptCorrect = opt === question.correct;

                            let stateStyles = "border-divider dark:border-slate-medium/20 hover:border-primary hover:bg-primary/5";

                            if (selectedOption === opt && !isSubmitted) {
                                stateStyles = "border-primary bg-primary/5 ring-1 ring-primary";
                            }

                            if (isSubmitted) {
                                if (isOptCorrect) {
                                    stateStyles = "bg-recovery/10 border-recovery text-recovery ring-1 ring-recovery font-medium";
                                } else if (selectedOption === opt && !isOptCorrect) {
                                    stateStyles = "bg-arterial/10 border-arterial text-arterial ring-1 ring-arterial";
                                } else {
                                    stateStyles = "opacity-50 border-gray-200";
                                }
                            }

                            return (
                                <motion.button
                                    key={idx}
                                    onClick={() => handleOptionSelect(opt)}
                                    whileTap={{ scale: isSubmitted ? 1 : 0.995 }}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${stateStyles}`}
                                    disabled={isSubmitted}
                                >
                                    <span className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors
                                        ${isSubmitted && isOptCorrect ? 'bg-recovery text-white border-recovery' : ''}
                                        ${isSubmitted && selectedOption === opt && !isOptCorrect ? 'bg-arterial text-white border-arterial' : ''}
                                        ${!isSubmitted && selectedOption === opt ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600'}
                                    `}>
                                        {optId}
                                    </span>
                                    <span className="text-base text-slate-dark dark:text-slate-200">{opt}</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Pre-Submit Confidence */}
                    {!isSubmitted && selectedOption && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-clinical/50 dark:bg-slate-800 rounded-xl p-4 border border-divider dark:border-slate-medium/10 mb-8"
                        >
                            <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                                <span>How confident are you?</span>
                                <span className="text-primary">{confidence}%</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={confidence}
                                onChange={(e) => setConfidence(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </motion.div>
                    )}

                    {/* Feedback Panel */}
                    <AnimatePresence>
                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-white dark:bg-slate-dark rounded-2xl border border-divider dark:border-slate-medium/10 shadow-lg overflow-hidden mt-6"
                            >
                                <div className="p-6 bg-clinical/30 dark:bg-slate-800/30">
                                    <p className={`text-lg font-medium ${isCorrect ? 'text-recovery' : 'text-arterial'}`}>
                                        {isCorrect ? 'Correct Answer!' : 'Incorrect Answer.'}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                                        The correct answer is <span className="font-bold">{question.correct}</span>.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-dark border-t border-divider dark:border-slate-medium/10 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    {isSubmitted ? (
                        <div className="flex w-full justify-end">
                            <button
                                onClick={() => onBack()}
                                className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-full font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105"
                            >
                                Back to List
                            </button>
                        </div>
                    ) : (
                        <div className="flex w-full justify-end">
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedOption}
                                className={`
                                    px-8 py-2.5 rounded-full font-semibold shadow-lg transition-all
                                    ${selectedOption
                                        ? 'bg-primary hover:bg-primary-dark text-white shadow-primary/20 hover:scale-105'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }
                                `}
                            >
                                Submit Answer
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


