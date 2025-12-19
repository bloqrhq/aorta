import { useState } from 'react';
import { motion } from 'framer-motion';

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

export interface Filters {
    year: string;
    status: 'all' | 'solved' | 'unsolved';
}

interface SidebarFiltersProps {
    subject: string;
    setSubject: (s: string) => void;
    filters: Filters;
    setFilters: (f: Filters) => void;
    onModeSelect: (mode: string) => void;
    selectedMode: string;
}

export default function SidebarFilters({ subject, setSubject, filters, setFilters, onModeSelect, selectedMode }: SidebarFiltersProps) {

    const subjects = [
        { id: 'phy', name: 'Physics' },
        { id: 'che', name: 'Chemistry' },
        { id: 'bot', name: 'Botany' },
        { id: 'zoo', name: 'Zoology' },
    ];

    const years = ['2024', '2023', '2022', '2021', '2020'];

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

            {/* Filters */}
            <section>
                <h3 className="text-xs font-bold text-slate-medium dark:text-slate-400 uppercase tracking-wider mb-3">Filters</h3>
                <div className="space-y-3">
                    {/* Year Filter */}
                    <div>
                        <label className="text-xs text-slate-500 mb-1 block">Year</label>
                        <select
                            value={filters.year}
                            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                            className="w-full text-sm p-2 rounded-lg border border-divider dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                            <option value="">All Years</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="text-xs text-slate-500 mb-1 block">Status</label>
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-divider dark:border-slate-700">
                            {/* Helper for tabs */}
                            {[
                                { id: 'all', label: 'All' },
                                { id: 'solved', label: 'Solved' },
                                { id: 'unsolved', label: 'Unsolved' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setFilters({ ...filters, status: tab.id as any })}
                                    className={`
                                         flex-1 text-xs py-1.5 rounded-md font-medium transition-all
                                         ${filters.status === tab.id
                                            ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-slate-200'
                                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}
                                     `}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Practice Mode Selector */}
            <section>
                <h3 className="text-xs font-bold text-slate-medium dark:text-slate-400 uppercase tracking-wider mb-3">Practice Mode</h3>
                <div className="space-y-2">
                    <ModeCard
                        id="subject-wise"
                        title="Subject Wise"
                        description="Practice questions by selected subject."
                        active={selectedMode === 'subject-wise'}
                        onClick={() => onModeSelect('subject-wise')}
                    />
                    <ModeCard
                        id="timed"
                        title="Timed Practice"
                        description="Speed & accuracy focus. 30 questions in 30 mins."
                        active={selectedMode === 'timed'}
                        onClick={() => onModeSelect('timed')}
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
