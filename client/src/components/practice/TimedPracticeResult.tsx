import type { PracticeResults } from './TimedPracticeSession';

interface TimedPracticeResultProps {
    results: PracticeResults;
    onClose: () => void;
}

export default function TimedPracticeResult({ results, onClose }: TimedPracticeResultProps) {
    const accuracy = Math.round((results.correct / results.attempted) * 100) || 0;

    // Format seconds to mm:ss
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return (
        <div className="flex flex-col h-full items-center justify-center p-6 bg-clinical dark:bg-slate-900">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-dark rounded-2xl shadow-xl border border-divider dark:border-slate-medium/10 overflow-hidden">
                <div className="p-8 text-center border-b border-divider dark:border-slate-medium/10 bg-gray-50 dark:bg-slate-800/50">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Practice Complete!</h2>
                    <p className="text-slate-500 dark:text-slate-400">Here is how you performed.</p>
                </div>

                <div className="p-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <ResultCard label="Score" value={results.score} color="text-primary" />
                    <ResultCard label="Accuracy" value={`${accuracy}%`} color={accuracy >= 70 ? 'text-green-500' : 'text-orange-500'} />
                    <ResultCard label="Correct" value={results.correct} color="text-green-600" />
                    <ResultCard label="Wrong" value={results.wrong} color="text-red-500" />
                </div>

                <div className="px-8 pb-8">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-divider dark:border-slate-medium/10 flex justify-between text-sm">
                        <span className="text-slate-500">Total Questions: <strong className="text-slate-800 dark:text-slate-200">{results.totalQuestions}</strong></span>
                        <span className="text-slate-500">Attempted: <strong className="text-slate-800 dark:text-slate-200">{results.attempted}</strong></span>
                        <span className="text-slate-500">Time Taken: <strong className="text-slate-800 dark:text-slate-200">{formatTime(results.timeTaken)}</strong></span>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-800/50 border-t border-divider dark:border-slate-medium/10 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark hover:-translate-y-0.5 transition-all"
                    >
                        Back to Practice
                    </button>
                </div>
            </div>
        </div>
    );
}

function ResultCard({ label, value, color }: { label: string, value: string | number, color: string }) {
    return (
        <div className="text-center">
            <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</div>
        </div>
    );
}
