import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yVisual = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

                <motion.div
                    style={{ y: yText, opacity }}
                    className="mx-auto max-w-4xl"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-dark dark:text-white mb-6"
                    >
                        Master Medicine with <span className="text-primary dark:text-primary/90">Adaptive Intelligence</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="mt-4 text-xl md:text-2xl text-slate-medium dark:text-slate-300 max-w-2xl mx-auto mb-10"
                    >
                        Transforms how students prepare for medical careers—starting with NEET UG and scaling to lifelong clinical training.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
                    >
                        <button className="bg-primary text-white text-lg px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Start Learning Now
                        </button>
                        <button className="bg-white dark:bg-slate-800 text-primary dark:text-primary-300 border border-primary dark:border-primary/50 text-lg px-8 py-4 rounded-full font-bold hover:bg-clinical dark:hover:bg-slate-700 transition-all shadow-sm">
                            Watch Demo
                        </button>
                    </motion.div>
                </motion.div>

                {/* Hero Visual/Stats placeholder */}
                <motion.div
                    style={{ y: yVisual }}
                    className="relative mx-auto max-w-5xl mt-8"
                >
                    <div className="bg-gradient-to-tr from-primary/10 to-neural/10 dark:from-primary/20 dark:to-neural/20 rounded-3xl p-8 border border-divider dark:border-slate-medium/20 shadow-2xl backdrop-blur-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-divider dark:border-slate-medium/20"
                            >
                                <div className="text-4xl font-bold text-neural dark:text-blue-400 mb-2">10k+</div>
                                <div className="text-slate-medium dark:text-slate-300 font-medium">Active Students</div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-divider dark:border-slate-medium/20"
                            >
                                <div className="text-4xl font-bold text-recovery dark:text-green-400 mb-2">94%</div>
                                <div className="text-slate-medium dark:text-slate-300 font-medium">Exam Success Rate</div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-divider dark:border-slate-medium/20"
                            >
                                <div className="text-4xl font-bold text-arterial dark:text-red-400 mb-2">24/7</div>
                                <div className="text-slate-medium dark:text-slate-300 font-medium">AI Tutor Access</div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
