import { useState, useEffect } from 'react';
import api from '../../api/axios';

interface Question {
    _id: string;
    question: string;
    options: string[];
    correct: string;
    year?: string;
}

interface QuestionListProps {
    subject: string;
    onSelectQuestion: (question: Question) => void;
}

export default function QuestionList({ subject, onSelectQuestion }: QuestionListProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setError('');
            try {
                // This matches the backend route: GET /api/questions/:subject
                const res = await api.get(`/api/questions/${subject}`);
                setQuestions(res.data || []);
            } catch (err) {
                console.error(err);
                setError('Failed to load questions.');
            } finally {
                setLoading(false);
            }
        };

        if (subject) {
            fetchQuestions();
        }
    }, [subject]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full bg-white dark:bg-slate-dark rounded-2xl">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full bg-white dark:bg-slate-dark rounded-2xl">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-slate-dark rounded-2xl text-slate-500">
                <p className="mb-2 text-lg">No questions found for {subject.toUpperCase()}</p>
                <p className="text-sm">Try selecting a different subject.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-dark rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-divider dark:border-slate-medium/10">
                <h2 className="text-lg font-bold text-slate-dark dark:text-slate-200">
                    {subject.toUpperCase()} Questions
                </h2>
                <div className="text-xs text-slate-500">
                    {questions.length} Questions
                </div>
            </div>

            {/* List Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-clinical/50 dark:bg-slate-800/50 border-b border-divider dark:border-slate-medium/10 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-8">Question</div>
                <div className="col-span-3 text-right">Action</div>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {questions.map((q, i) => (
                    <div
                        key={q._id}
                        onClick={() => onSelectQuestion(q)}
                        className={`
                            grid grid-cols-12 gap-4 px-6 py-4 border-b border-divider/50 dark:border-slate-medium/10 cursor-pointer transition-colors
                            hover:bg-gray-50 dark:hover:bg-slate-800/50
                            ${i % 2 === 0 ? 'bg-white dark:bg-slate-dark' : 'bg-clinical/20 dark:bg-slate-dark'}
                        `}
                    >
                        <div className="col-span-1 flex justify-center items-center font-mono text-slate-400">
                            {i + 1}
                        </div>

                        <div className="col-span-8 flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-1">
                            {q.question}
                        </div>

                        <div className="col-span-3 flex items-center justify-end">
                            <button className="text-primary hover:text-primary-dark text-xs font-semibold">
                                Solve →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
