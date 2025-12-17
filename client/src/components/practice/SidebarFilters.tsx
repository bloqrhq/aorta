import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data Structure
const TOPICS = [
    {
        subject: 'Human Physiology',
        chapters: [
            { name: 'Digestion & Absorption', concepts: ['Enzymes', 'GIT Anatomy', 'Disorders'] },
            { name: 'Breathing & Exchange', concepts: ['Mechanism', 'Volumes', 'Transport'] },
            { name: 'Body Fluids', concepts: ['Blood', 'Lymph', 'Circulatory Pathways'] }
        ]
    },
    {
        subject: 'Genetics',
        chapters: [
            { name: 'Inheritance Principles', concepts: ['Mendel Laws', 'Linkage', 'Pedigree'] },
            { name: 'Molecular Basis', concepts: ['DNA Structure', 'Replication', 'Transcription'] }
        ]
    }
];

export default function SidebarFilters() {
    const [openSubject, setOpenSubject] = useState<string | null>('Human Physiology');
    const [selectedMode, setSelectedMode] = useState('weakness');

    return (
        <div className="space-y-6">

            {/* Practice Mode Selector */}
            <section>
                <h3 className="text-xs font-bold text-slate-medium dark:text-slate-400 uppercase tracking-wider mb-3">Practice Mode</h3>
                <div className="space-y-2">
                    <ModeCard
                        id="weakness"
                        title="Target Weak Areas"
                        description="AI-curated questions from your lowest accuracy topics."
                        active={selectedMode === 'weakness'}
                        onClick={() => setSelectedMode('weakness')}
                        icon="🎯"
                    />
                    <ModeCard
                        id="neet"
                        title="NEET Pattern Drill"
                        description="Mock test simulation with standard weightage."
                        active={selectedMode === 'neet'}
                        onClick={() => setSelectedMode('neet')}
                        icon="📝"
                    />
                    <ModeCard
                        id="timed"
                        title="Timed Practice"
                        description="Speed & accuracy focus. 30 questions in 30 mins."
                        active={selectedMode === 'timed'}
                        onClick={() => setSelectedMode('timed')}
                        icon="⏱️"
                    />
                </div>
            </section>

            {/* Weakness Heat Indicator */}
            <section>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold text-slate-medium dark:text-slate-400 uppercase tracking-wider">Concept Heatmap</h3>
                    <span className="text-xs text-primary cursor-pointer hover:underline">Auto-filter Weak</span>
                </div>
                <div className="bg-white dark:bg-slate-dark rounded-xl p-3 border border-divider dark:border-slate-medium/10 shadow-sm">
                    <div className="flex justify-between items-end h-12 gap-1">
                        {[40, 60, 30, 80, 20, 90, 50, 45, 25, 10].map((val, i) => (
                            <div
                                key={i}
                                className={`w-full rounded-sm ${val < 40 ? 'bg-arterial' : val < 70 ? 'bg-gold' : 'bg-recovery'
                                    }`}
                                style={{ height: `${val}%`, opacity: 0.8 }}
                                title={`Module ${i + 1}: ${val}% Accuracy`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Topic Filters */}
            <section>
                <h3 className="text-xs font-bold text-slate-medium dark:text-slate-400 uppercase tracking-wider mb-3">Topics</h3>
                <div className="space-y-1">
                    {TOPICS.map((subject) => (
                        <div key={subject.subject} className="bg-white dark:bg-slate-dark rounded-xl border border-divider dark:border-slate-medium/10 overflow-hidden">
                            <button
                                onClick={() => setOpenSubject(openSubject === subject.subject ? null : subject.subject)}
                                className="w-full flex items-center justify-between p-3 text-left hover:bg-clinical dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="font-semibold text-sm text-slate-dark dark:text-slate-200">{subject.subject}</span>
                                <svg
                                    className={`w-4 h-4 text-slate-400 transform transition-transform ${openSubject === subject.subject ? 'rotate-180' : ''}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {openSubject === subject.subject && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-3 pt-0 space-y-3">
                                            {subject.chapters.map(chapter => (
                                                <div key={chapter.name}>
                                                    <h4 className="text-xs font-medium text-slate-500 mb-2">{chapter.name}</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {chapter.concepts.map(concept => (
                                                            <button
                                                                key={concept}
                                                                className="px-2.5 py-1 text-xs rounded-full border border-divider dark:border-slate-medium/20 text-slate-600 dark:text-slate-300 hover:border-neural hover:text-neural hover:bg-neural/5 transition-colors"
                                                            >
                                                                {concept}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function ModeCard({ title, description, active, onClick, icon }: any) {
    return (
        <div
            onClick={onClick}
            className={`
                group relative p-3 rounded-xl border cursor-pointer transition-all duration-200
                ${active
                    ? 'bg-primary/5 border-primary shadow-[0_0_0_1px_var(--color-primary)]'
                    : 'bg-white dark:bg-slate-dark border-divider dark:border-slate-medium/10 hover:border-primary/50'
                }
            `}
        >
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg text-lg ${active ? 'bg-primary/10' : 'bg-gray-50 dark:bg-slate-800'}`}>
                    {icon}
                </div>
                <div>
                    <h4 className={`text-sm font-semibold ${active ? 'text-primary' : 'text-slate-dark dark:text-slate-200'}`}>
                        {title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
