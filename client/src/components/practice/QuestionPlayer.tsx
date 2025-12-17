import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Question Detail
const MOCK_QUESTION = {
    id: 'Q-1045',
    text: "During the depolarization phase of an action potential in a neuron, which of the following events primarily occurs?",
    options: [
        { id: 'A', text: "Efflux of K+ ions" },
        { id: 'B', text: "Influx of Na+ ions" },
        { id: 'C', text: "Influx of Ca2+ ions" },
        { id: 'D', text: "Activation of Na+-K+ Pump" }
    ],
    correct: 'B',
    explanation: {
        concept: "Action potential depolarization is driven by the rapid opening of voltage-gated Na+ channels, causing a massive influx of Sodium ions into the axoplasm.",
        trap: "Students often confuse Repolarization (K+ efflux) with Depolarization (Na+ influx). Remember: 'Na' in = 'De'polarization.",
        memory: "Na+ -> IN -> SPIKE (Depolarization)"
    }
};

export default function QuestionPlayer({ onBack }: { onBack: () => void }) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [confidence, setConfidence] = useState(50);
    const [activeTab, setActiveTab] = useState<'concept' | 'trap' | 'memory'>('concept');

    const handleOptionSelect = (id: string) => {
        if (!isSubmitted) setSelectedOption(id);
    };

    const handleSubmit = () => {
        if (selectedOption) setIsSubmitted(true);
    };

    return (
        <div className="flex flex-col h-full relative">

            {/* Top Bar for Back & status */}
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
                    Question {MOCK_QUESTION.id}
                </div>
                <div className="w-20"></div> {/* Spacer for center alignment */}
            </div>

            <div className="flex-1 overflow-y-auto p-6 pb-32">
                {/* Question Details */}
                <div className="max-w-3xl mx-auto">

                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                        <span className="px-2 py-1 bg-neural/10 text-neural text-xs font-semibold rounded-md">Neural Control</span>
                        <span className="px-2 py-1 bg-arterial/10 text-arterial text-xs font-semibold rounded-md">Hard</span>
                    </div>

                    {/* Question Text */}
                    <h2 className="text-xl font-medium text-slate-dark dark:text-slate-100 leading-relaxed mb-8">
                        {MOCK_QUESTION.text}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3 mb-8">
                        {MOCK_QUESTION.options.map((opt) => {
                            let stateStyles = "border-divider dark:border-slate-medium/20 hover:border-primary hover:bg-primary/5";

                            if (selectedOption === opt.id && !isSubmitted) {
                                stateStyles = "border-primary bg-primary/5 ring-1 ring-primary";
                            }

                            if (isSubmitted) {
                                if (opt.id === MOCK_QUESTION.correct) {
                                    stateStyles = "bg-recovery/10 border-recovery text-recovery ring-1 ring-recovery font-medium";
                                } else if (selectedOption === opt.id && opt.id !== MOCK_QUESTION.correct) {
                                    stateStyles = "bg-arterial/10 border-arterial text-arterial ring-1 ring-arterial";
                                } else {
                                    stateStyles = "opacity-50 border-gray-200";
                                }
                            }

                            return (
                                <motion.button
                                    key={opt.id}
                                    onClick={() => handleOptionSelect(opt.id)}
                                    whileTap={{ scale: isSubmitted ? 1 : 0.995 }}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${stateStyles}`}
                                    disabled={isSubmitted}
                                >
                                    <span className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors
                                        ${isSubmitted && opt.id === MOCK_QUESTION.correct ? 'bg-recovery text-white border-recovery' : ''}
                                        ${isSubmitted && selectedOption === opt.id && opt.id !== MOCK_QUESTION.correct ? 'bg-arterial text-white border-arterial' : ''}
                                        ${!isSubmitted && selectedOption === opt.id ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600'}
                                    `}>
                                        {opt.id}
                                    </span>
                                    <span className="text-base text-slate-dark dark:text-slate-200">{opt.text}</span>
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

                    {/* Explanation Panel */}
                    <AnimatePresence>
                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-white dark:bg-slate-dark rounded-2xl border border-divider dark:border-slate-medium/10 shadow-lg overflow-hidden"
                            >
                                <div className="flex border-b border-divider dark:border-slate-medium/10">
                                    <TabButton label="Concept" active={activeTab === 'concept'} onClick={() => setActiveTab('concept')} color="text-neural border-neural" />
                                    <TabButton label="Trap Alert" active={activeTab === 'trap'} onClick={() => setActiveTab('trap')} color="text-arterial border-arterial" />
                                    <TabButton label="Memory Hook" active={activeTab === 'memory'} onClick={() => setActiveTab('memory')} color="text-gold border-gold" />
                                </div>
                                <div className="p-6 bg-clinical/30 dark:bg-slate-800/30">
                                    {activeTab === 'concept' && <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{MOCK_QUESTION.explanation.concept}</p>}
                                    {activeTab === 'trap' && <p className="text-arterial font-medium leading-relaxed">⚠️ {MOCK_QUESTION.explanation.trap}</p>}
                                    {activeTab === 'memory' && <p className="text-gold-dark font-medium leading-relaxed">🧠 {MOCK_QUESTION.explanation.memory}</p>}
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
                        <>
                            <div className="flex gap-3">
                                <ActionButton label="Similar Question" />
                                <ActionButton label="Mark Tricky" outline />
                            </div>
                            <button
                                onClick={() => { setIsSubmitted(false); setSelectedOption(null); }}
                                className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-full font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105"
                            >
                                Next Question →
                            </button>
                        </>
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

function TabButton({ label, active, onClick, color }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${active ? `bg-white dark:bg-slate-dark ${color}` : 'border-transparent text-slate-400 hover:text-slate-600 bg-gray-50 dark:bg-slate-900'}`}
        >
            {label}
        </button>
    );
}

function ActionButton({ label, outline = false }: { label: string, outline?: boolean }) {
    return (
        <button className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${outline
                ? 'border border-divider dark:border-slate-medium/20 text-slate-600 hover:border-slate-400'
                : 'bg-clinical dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }
        `}>
            {label}
        </button>
    );
}
