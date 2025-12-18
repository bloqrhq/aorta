import { motion } from 'framer-motion';

interface TimedPracticeSetupProps {
    onStart: () => void;
    onCancel: () => void;
}

export default function TimedPracticeSetup({ onStart, onCancel }: TimedPracticeSetupProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl border border-divider dark:border-slate-medium/10 overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-divider dark:border-slate-medium/10 bg-gray-50 dark:bg-slate-800/50">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <span className="p-2 rounded-lg bg-primary/10 text-primary">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        Timed Practice Setup
                    </h2>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-divider dark:border-slate-medium/10">
                            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Standard Test Pattern</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Simulate a real exam environment. Questions are selected randomly from your chosen subject.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-divider dark:border-slate-medium/10 text-center">
                                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">30</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Questions</div>
                            </div>
                            <div className="p-4 rounded-xl border border-divider dark:border-slate-medium/10 text-center">
                                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">30</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Minutes</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-500/20">
                            <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-500 mb-2 uppercase tracking-wide">Marking Scheme</h4>
                            <div className="flex gap-4 text-sm">
                                <span className="flex items-center gap-1.5 text-green-700 dark:text-green-400 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                    +4 Correct
                                </span>
                                <span className="flex items-center gap-1.5 text-red-700 dark:text-red-400 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                    -1 Incorrect
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-divider dark:border-slate-medium/10 bg-gray-50 dark:bg-slate-800/50 flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2.5 rounded-xl font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onStart}
                        className="px-8 py-2.5 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:-translate-y-0.5 transition-all"
                    >
                        Start Test
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
