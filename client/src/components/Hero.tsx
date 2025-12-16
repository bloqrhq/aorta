import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
    const ref = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Prevent glitchy initial render by waiting for mount
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yMidground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <section
            ref={ref}
            className="relative min-h-[90vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary via-[#4a2475] to-neural/30 text-white"
        >
            {/* Background Layer: Grid & Gradient Mesh */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ y: isLoaded ? yBackground : 0 }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/40 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neural/40 rounded-full blur-[80px] mix-blend-screen" />
            </motion.div>

            {/* Midground Layer: Floating Medical Symbols (Abstract) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ y: isLoaded ? yMidground : 0 }}
                className="absolute inset-0 z-10 pointer-events-none"
            >
                <motion.div
                    initial={{ y: 0, rotate: 12, opacity: 0 }}
                    animate={{ y: isLoaded ? [0, -20, 0] : 0, rotate: isLoaded ? [12, 17, 12] : 12, opacity: isLoaded ? 1 : 0 }}
                    transition={{
                        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: 0.8, ease: "easeOut" }
                    }}
                    className="absolute top-1/4 right-[10%] w-16 h-16 border-2 border-neural/30 rounded-lg backdrop-blur-sm"
                />
                <motion.div
                    initial={{ y: 0, rotate: 0, opacity: 0 }}
                    animate={{ y: isLoaded ? [0, 30, 0] : 0, rotate: isLoaded ? [0, -10, 0] : 0, opacity: isLoaded ? 1 : 0 }}
                    transition={{
                        y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 },
                        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 },
                        opacity: { duration: 0.8, delay: 0.4, ease: "easeOut" }
                    }}
                    className="absolute bottom-1/3 left-[15%] w-24 h-24 border border-white/10 rounded-full bg-white/5 backdrop-blur-md"
                />
                {/* ECG Line Hint */}
                <svg className="absolute top-1/2 left-0 w-full h-32 opacity-10 stroke-white fill-none" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path d="M0,50 L200,50 L220,10 L240,90 L260,50 L1000,50" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
            </motion.div>

            {/* Foreground Layer: Content & "3D Aspirant" Placeholder */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ y: isLoaded ? yForeground : 0 }}
                className="container mx-auto px-4 z-20 relative grid md:grid-cols-2 gap-12 items-center"
            >

                {/* Copy */}
                <div className="text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-gold font-medium text-sm mb-6 backdrop-blur-md">
                            AI-Powered Medical Mastery
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 text-white drop-shadow-sm">
                            From NEET Preparation to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Clinical Thinking</span>
                            <div className="text-lg font-normal opacity-70 mt-2 block">Powered by AI</div>
                        </h1>
                        <p className="text-xl text-blue-100/90 leading-relaxed mb-10 max-w-xl">
                            Master NCERT concepts. Eliminate weak zones. Train your medical mind from day one.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-primary text-white border border-white/10 px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(91,45,139,0.5)] relative overflow-hidden group cursor-pointer"
                            >
                                <span className="relative z-10 ">Begin with Aorta</span>
                                <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {/* Gold Pulse Micro-interaction */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 1 }}
                                    animate={{ opacity: [0, 0.5, 0], scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 6, delay: 1 }}
                                    className="absolute inset-0 border-2 border-gold rounded-full"
                                />
                            </motion.button>

                            <a href="#roadmap" className="flex items-center gap-2 px-8 py-4 text-white/90 hover:text-white font-semibold transition-colors group">
                                Explore Aorta's Vision
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Visual: Simulated 3D Aspirant */}
                <div className="relative hidden md:block h-[600px] w-full">
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: 0, rotateZ: 0 }}
                        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {/* Placeholder for 3D Aspirant - simplified as a glowing card hierarchy */}
                        <motion.div
                            initial={{ rotateY: -12, rotateZ: 3 }}
                            whileHover={{ rotateY: 0, rotateZ: 0 }}
                            transition={{ duration: 0.7 }}
                            className="relative w-80 h-[500px] bg-slate-900/40 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-2xl p-6"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Internal UI Mockup */}
                            <div className="w-full h-40 bg-gradient-to-br from-neural/20 to-primary/20 rounded-xl mb-4 border border-white/5 relative overflow-hidden">
                                <div className="absolute bottom-4 left-4">
                                    <div className="text-white/50 text-xs uppercase tracking-wider">NEET Predicted Rank</div>
                                    <div className="text-3xl font-bold text-white">Top 1%</div>
                                </div>
                                <div className="absolute top-4 right-4 text-gold animate-pulse">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-12 bg-white/5 rounded-lg w-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                                ))}
                            </div>

                            {/* Floating elements */}
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? [0, -10, 0] : 0 }}
                                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.5, delay: 0.6 } }}
                                className="absolute -right top-100 bg-white text-primary px-4 py-3 rounded-xl shadow-xl font-bold flex items-center gap-2"
                            >
                                <span className="text-recovery">✓</span> Accuracy +15%
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? [0, 10, 0] : 0 }}
                                transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }, opacity: { duration: 0.5, delay: 0.7 } }}
                                className="absolute -left top-50 bg-neural text-white px-18 py-3 rounded-xl shadow-xl font-bold text-sm border border-white/20"
                            >
                                Biology: Mastered
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? [0, 8, 0] : 0 }}
                                transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }, opacity: { duration: 0.5, delay: 0.8 } }}
                                className="absolute -left top-64 bg-neural text-white px-18 py-3 rounded-xl shadow-xl font-bold text-sm border border-white/20"
                            >
                                Physics: Mastered
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? [0, 12, 0] : 0 }}
                                transition={{ y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }, opacity: { duration: 0.5, delay: 0.9 } }}
                                className="absolute -left top-78 bg-neural text-white px-16 py-3 rounded-xl shadow-xl font-bold text-sm border border-white/20"
                            >
                                Chemistry: Mastered
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
