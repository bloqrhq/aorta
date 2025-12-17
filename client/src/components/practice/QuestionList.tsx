// Mock Questions Data
const MOCK_QUESTIONS = [
    { id: 'Q-1023', concept: 'Cardiac Cycle', accuracy: 85, difficulty: 'Easy', status: 'solved' },
    { id: 'Q-1045', concept: 'Action Potential', accuracy: 42, difficulty: 'Hard', status: 'unsolved' },
    { id: 'Q-1089', concept: 'Gas Exchange', accuracy: 68, difficulty: 'Medium', status: 'solved' },
    { id: 'Q-1102', concept: 'Rental Calculi', accuracy: 25, difficulty: 'Hard', status: 'unsolved' },
    { id: 'Q-1156', concept: 'Synapse', accuracy: 92, difficulty: 'Easy', status: 'solved' },
    { id: 'Q-1201', concept: 'Hormone Action', accuracy: 55, difficulty: 'Medium', status: 'unsolved' },
    { id: 'Q-1234', concept: 'ECG', accuracy: 30, difficulty: 'Hard', status: 'unsolved' },
    { id: 'Q-1288', concept: 'Blood Grouping', accuracy: 95, difficulty: 'Easy', status: 'solved' },
];

interface QuestionListProps {
    onSelectQuestion: (id: string) => void;
}

export default function QuestionList({ onSelectQuestion }: QuestionListProps) {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-dark rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-divider dark:border-slate-medium/10">
                <h2 className="text-lg font-bold text-slate-dark dark:text-slate-200">Question Browser</h2>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium bg-clinical dark:bg-slate-800 rounded-lg border border-divider hover:border-neural transition-colors">
                        Sort by: Relevancy
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium bg-clinical dark:bg-slate-800 rounded-lg border border-divider hover:border-neural transition-colors">
                        Hide Solved
                    </button>
                </div>
            </div>

            {/* List Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-clinical/50 dark:bg-slate-800/50 border-b border-divider dark:border-slate-medium/10 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-2">ID</div>
                <div className="col-span-4">Concept</div>
                <div className="col-span-2 text-center">Accuracy</div>
                <div className="col-span-3 text-right pr-2">Difficulty</div>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {MOCK_QUESTIONS.map((q, i) => (
                    <div
                        key={q.id}
                        onClick={() => onSelectQuestion(q.id)}
                        className={`
                            grid grid-cols-12 gap-4 px-6 py-4 border-b border-divider/50 dark:border-slate-medium/10 cursor-pointer transition-colors
                            hover:bg-gray-50 dark:hover:bg-slate-800/50
                            ${i % 2 === 0 ? 'bg-white dark:bg-slate-dark' : 'bg-clinical/20 dark:bg-slate-dark'}
                        `}
                    >
                        <div className="col-span-1 flex justify-center items-center">
                            {q.status === 'solved' ? (
                                <div className="w-5 h-5 rounded-full bg-recovery/20 text-recovery flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                            )}
                        </div>

                        <div className="col-span-2 flex items-center font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                            {q.id}
                        </div>

                        <div className="col-span-4 flex items-center">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-transparent group-hover:border-primary/20">
                                {q.concept}
                            </span>
                        </div>

                        <div className="col-span-2 flex items-center justify-center text-sm text-slate-600 dark:text-slate-400">
                            {q.accuracy}%
                        </div>

                        <div className="col-span-3 flex items-center justify-end">
                            <DifficultyBadge level={q.difficulty} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DifficultyBadge({ level }: { level: string }) {
    let colors = '';
    if (level === 'Easy') colors = 'bg-recovery/10 text-recovery border-recovery/20';
    if (level === 'Medium') colors = 'bg-gold/10 text-gold-dark border-gold/20'; // gold-dark needs custom or use text-orange-600
    if (level === 'Hard') colors = 'bg-arterial/10 text-arterial border-arterial/20';

    // Custom fix for gold text to be readable
    const textColor = level === 'Medium' ? 'text-yellow-700 dark:text-yellow-500' : '';

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${colors} ${textColor}`}>
            {level}
        </span>
    );
}
