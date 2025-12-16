import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ProblemSolution() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Animation Transforms
    const problemOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [1, 1, 0]);
    const problemScale = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.9]);
    const problemX = useTransform(scrollYProgress, [0.2, 0.5], [0, -50]);

    const solutionOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8], [0, 1, 1]);
    const solutionScale = useTransform(scrollYProgress, [0.5, 0.7], [0.8, 1]);
    const solutionX = useTransform(scrollYProgress, [0.5, 0.8], [50, 0]);

    const bookRotate = useTransform(scrollYProgress, [0.2, 0.5], [0, 90]);
    const cardRotate = useTransform(scrollYProgress, [0.5, 0.8], [-90, 0]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-slate-dark mb-32">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="text-center mb-12 md:mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                        >
                            Why NEET Prep <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-arterial">Breaks Students</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-xl text-slate-300 max-w-2xl mx-auto"
                        >
                            Passive reading creates false confidence. Active recall builds rankers.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center min-h-[400px]">
                        {/* Text Content - Swaps based on scroll */}
                        <div className="relative h-[400px]">
                            {/* Problem State */}
                            <motion.div
                                style={{ opacity: problemOpacity, scale: problemScale, x: problemX }}
                                className="absolute inset-0 flex flex-col justify-center"
                            >
                                <h3 className="text-3xl font-bold text-white mb-4">Overwhelmed by Theory</h3>
                                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                    Students spend 80% of time memorizing textbooks passively. When exams come, applied questions feel "out of syllabus".
                                </p>
                                <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 w-full max-w-md mx-auto relative opacity-80 backdrop-blur-sm">
                                    <div className="h-4 bg-slate-700 rounded w-3/4 mb-4" />
                                    <div className="h-4 bg-slate-700 rounded w-full mb-2" />
                                    <div className="h-4 bg-slate-700 rounded w-5/6 mb-2" />
                                    <div className="h-4 bg-slate-700 rounded w-full mb-2" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="bg-slate-900/90 text-red-200 border border-red-500/30 px-4 py-2 rounded-lg font-bold transform -rotate-12 backdrop-blur-md">PASSIVE LEARNING</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Solution State */}
                            <motion.div
                                style={{ opacity: solutionOpacity, scale: solutionScale, x: solutionX }}
                                className="absolute inset-0 flex flex-col justify-center"
                            >
                                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-primary mb-4">The Aorta Advantage</h3>
                                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                    Our AI Engine scans every line of NCERT and converts it into active clinical scenarios. You don't just read—you solve.
                                </p>
                                <div className="p-6 bg-slate-800 rounded-xl border-l-4 border-recovery shadow-2xl w-full max-w-md mx-auto relative bg-gradient-to-r from-slate-800 to-slate-900/50 ring-1 ring-white/10">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-recovery/20 text-recovery text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Clinical Scenario</span>
                                        <span className="text-gold text-sm">★ Top 1% Difficulty</span>
                                    </div>
                                    <p className="font-semibold text-white mb-4">A 45-year-old patient presents with...</p>
                                    <div className="space-y-2">
                                        <div className="p-3 border border-recovery/30 bg-recovery/10 rounded-lg text-sm text-white flex justify-between items-center">
                                            <span>Correct Diagnosis Path</span>
                                            <span className="text-recovery font-bold bg-recovery/20 rounded-full w-5 h-5 flex items-center justify-center">✓</span>
                                        </div>
                                        <div className="p-3 border border-slate-700 bg-slate-700/30 rounded-lg text-sm text-slate-400">Incorrect Option A</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Visual Side */}
                        <div className="relative h-full flex items-center justify-center min-h-[400px]">
                            <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-neural/20 to-primary/20 rounded-full blur-[100px]" />

                            {/* Transforming Book -> MCQ Visual */}
                            <div className="relative w-80 h-96 perspective-1000">
                                {/* Book Stack */}
                                <motion.div
                                    style={{ opacity: problemOpacity, rotateY: bookRotate }}
                                    className="absolute inset-0 bg-slate-100 border border-slate-300 shadow-2xl rounded-r-2xl transform preserve-3d"
                                >
                                    <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-slate-200 to-slate-300 border-l border-slate-400 transform skew-y-12 origin-top-right translate-y-3" />
                                    <div className="p-8 text-center flex flex-col h-full justify-center">
                                        <div className="text-6xl mb-4">📚</div>
                                        <div className="text-xl font-bold text-slate-800">NCERT Vol 1</div>
                                    </div>
                                </motion.div>


                                {/* Active MCQ Card */}
                                <motion.div
                                    style={{
                                        opacity: solutionOpacity,
                                        rotateY: cardRotate,
                                        backfaceVisibility: "hidden"
                                    }}
                                    className="absolute inset-0 bg-slate-900 border border-primary/20 shadow-[0_20px_50px_rgba(30,58,138,0.3)] rounded-2xl transform preserve-3d flex flex-col"
                                >
                                    <div className="flex-1 p-6 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-recovery to-neural" />
                                        <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4 text-2xl border border-primary/20">🧠</div>
                                        <div className="h-2 bg-slate-700 rounded w-full mb-3" />
                                        <div className="h-2 bg-slate-700 rounded w-2/3 mb-6" />

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="h-16 bg-recovery/10 border border-recovery/50 rounded-lg flex items-center justify-center text-recovery font-bold text-sm text-center p-2">Concept Applied</div>
                                            <div className="h-16 bg-arterial/10 border border-arterial/30 rounded-lg flex items-center justify-center text-arterial font-bold opacity-50 text-sm text-center p-2">Distractor</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
