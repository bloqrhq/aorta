import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ProblemSolution() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Animation Transforms
    const problemOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.5], [1, 1, 0]);
    const problemScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.9]);

    const solutionOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.9], [0, 1, 1]);
    const solutionScale = useTransform(scrollYProgress, [0.5, 0.7], [0.8, 1]);

    const xMoveLeft = useTransform(scrollYProgress, [0.2, 0.6], [0, -50]);
    const xMoveRight = useTransform(scrollYProgress, [0.2, 0.6], [0, 50]);

    return (
        <section ref={containerRef} className="py-32 relative bg-clinical overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold text-slate-dark mb-6"
                    >
                        Why NEET Prep <span className="text-arterial">Breaks Students</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl text-slate-medium max-w-2xl mx-auto"
                    >
                        Passive reading creates false confidence. Active recall builds rankers.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
                    {/* Text Content - Swaps based on scroll? Or static side-by-side? 
                    User asked for "Scroll Animation: Books fade into Clinical White particles -> reassemble as MCQs"
                    Let's do a sticky visual visual.
                */}

                    <div className="relative h-[400px]">
                        {/* Problem State */}
                        <motion.div
                            style={{ opacity: problemOpacity, scale: problemScale, x: xMoveLeft }}
                            className="absolute inset-0 flex flex-col justify-center"
                        >
                            <h3 className="text-3xl font-bold text-slate-dark mb-4">Overwhelmed by Theory</h3>
                            <p className="text-lg text-slate-medium mb-8 leading-relaxed">
                                Students spend 80% of time memorizing textbooks passively. When exams come, applied questions feel "out of syllabus".
                            </p>
                            <div className="p-6 bg-slate-200 rounded-xl border border-slate-300 w-full max-w-md mx-auto relative opacity-50">
                                <div className="h-4 bg-slate-400 rounded w-3/4 mb-4" />
                                <div className="h-4 bg-slate-400 rounded w-full mb-2" />
                                <div className="h-4 bg-slate-400 rounded w-5/6 mb-2" />
                                <div className="h-4 bg-slate-400 rounded w-full mb-2" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold transform -rotate-12">PASSIVE LEARNING</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Solution State */}
                        <motion.div
                            style={{ opacity: solutionOpacity, scale: solutionScale, x: xMoveRight }}
                            className="absolute inset-0 flex flex-col justify-center"
                        >
                            <h3 className="text-3xl font-bold text-primary mb-4">The Aorta Advantage</h3>
                            <p className="text-lg text-slate-medium mb-8 leading-relaxed">
                                Our AI Engine scans every line of NCERT and converts it into active clinical scenarios. You don't just read—you solve.
                            </p>
                            <div className="p-6 bg-white rounded-xl border-l-4 border-recovery shadow-xl w-full max-w-md mx-auto relative bg-gradient-to-r from-green-50 to-white">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-recovery/10 text-recovery text-xs font-bold px-2 py-1 rounded uppercase">Clinical Scenario</span>
                                    <span className="text-gold">★ Top 1% Difficulty</span>
                                </div>
                                <p className="font-semibold text-slate-dark mb-4">A 45-year-old patient presents with...</p>
                                <div className="space-y-2">
                                    <div className="p-2 border border-recovery/30 bg-recovery/5 rounded text-sm text-slate-800 flex justify-between">
                                        <span>Correct Diagnosis Path</span>
                                        <span className="text-recovery font-bold">✓</span>
                                    </div>
                                    <div className="p-2 border border-slate-200 rounded text-sm text-slate-400">Incorrect Option A</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual Side */}
                    <div className="relative h-full flex items-center justify-center">
                        <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-neural/5 to-primary/5 rounded-full blur-[100px]" />

                        {/* Transforming Book -> MCQ Visual */}
                        <div className="relative w-80 h-96 perspective-1000">
                            {/* Book Stack */}
                            <motion.div
                                style={{ opacity: problemOpacity, rotateY: useTransform(scrollYProgress, [0.2, 0.5], [0, 90]) }}
                                className="absolute inset-0 bg-white border border-slate-200 shadow-2xl rounded-r-2xl transform preserve-3d"
                            >
                                <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-slate-100 to-slate-200 border-l border-slate-300 transform skew-y-12 origin-top-right translate-y-3" />
                                <div className="p-8 text-center flex flex-col h-full justify-center">
                                    <div className="text-6xl mb-4">📚</div>
                                    <div className="text-xl font-bold text-slate-dark">NCERT Vol 1</div>
                                </div>
                            </motion.div>

                            {/* Particle/Scanner Effect - Simplified as a scanning beam overlay */}
                            <motion.div
                                style={{ opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]) }}
                                className="absolute inset-0 bg-neural/20 backdrop-blur-sm z-20 flex items-center justify-center border-y-2 border-neural/50"
                            >
                                <span className="text-neural font-mono font-bold tracking-widest animate-pulse">AI SCANNING...</span>
                            </motion.div>

                            {/* Active MCQ Card */}
                            <motion.div
                                style={{
                                    opacity: solutionOpacity,
                                    rotateY: useTransform(scrollYProgress, [0.5, 0.8], [-90, 0])
                                }}
                                className="absolute inset-0 bg-white border border-primary/20 shadow-[0_20px_50px_rgba(30,58,138,0.2)] rounded-2xl transform preserve-3d flex flex-col"
                            >
                                <div className="flex-1 p-6 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-recovery to-neural" />
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-2xl">🧠</div>
                                    <div className="h-2 bg-slate-100 rounded w-full mb-3" />
                                    <div className="h-2 bg-slate-100 rounded w-2/3 mb-6" />

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="h-16 bg-recovery/10 border border-recovery rounded-lg flex items-center justify-center text-recovery font-bold">Concept Applied</div>
                                        <div className="h-16 bg-arterial/10 border border-arterial rounded-lg flex items-center justify-center text-arterial font-bold opacity-30">Distractor</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
