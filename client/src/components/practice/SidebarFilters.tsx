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

interface SidebarFiltersProps {
    subject: string;
    setSubject: (s: string) => void;
}

export default function SidebarFilters({ subject, setSubject }: SidebarFiltersProps) {
    // const [openSubject, setOpenSubject] = useState<string | null>('Human Physiology'); // Removing old mock state
    const [selectedMode, setSelectedMode] = useState('weakness');

    const subjects = [
        { id: 'phy', name: 'Physics' },
        { id: 'che', name: 'Chemistry' },
        { id: 'bot', name: 'Botany' },
        { id: 'zoo', name: 'Zoology' },
    ];

    return (
        <div className="space-y-6">
            {/* Subject Selector */}
            <section>
                <h3 className="text-xs font-bold text-slate-medium dark:text-slate-400 uppercase tracking-wider mb-3">Subject</h3>
                <div className="grid grid-cols-2 gap-2">
                    {subjects.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setSubject(s.id)}
                            className={`
                                flex items-center justify-center gap-2 p-3 rounded-xl border transition-all
                                ${subject === s.id
                                    ? 'bg-primary/10 border-primary text-primary font-bold shadow-sm'
                                    : 'bg-white dark:bg-slate-dark border-divider dark:border-slate-medium/10 text-slate-600 dark:text-slate-400 hover:border-neural/50'
                                }
                            `}
                        >
                            <span className="text-sm">{s.name}</span>
                        </button>
                    ))}
                </div>
            </section>

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

                    />
                    <ModeCard
                        id="neet"
                        title="NEET Pattern Drill"
                        description="Mock test simulation with standard weightage."
                        active={selectedMode === 'neet'}
                        onClick={() => setSelectedMode('neet')}
                    />
                    <ModeCard
                        id="timed"
                        title="Timed Practice"
                        description="Speed & accuracy focus. 30 questions in 30 mins."
                        active={selectedMode === 'timed'}
                        onClick={() => setSelectedMode('timed')}
                    />
                </div>
            </section>


            {/* Weakness Heat Indicator */}
            <div className="hidden lg:block">
                <SidebarHeatmap />
            </div>
        </div>
    );
}

export function SidebarHeatmap() {
    return (
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
