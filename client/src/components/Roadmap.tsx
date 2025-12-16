import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const roadmapItems = [
    {
        year: "2024",
        title: "NEET UG Mastery",
        description: "Adaptive NCERT modules, Exam Simulators, and Weakness Analytics live.",
        status: "Live Now",
        color: "bg-recovery",
        accent: "border-recovery"
    },
    {
        year: "2025",
        title: "MBBS Clinical Reasoning",
        description: "Case-based learning for 1st Year Anatomy & Physiology. Bridging the gap between theory and practice.",
        status: "Beta Access",
        color: "bg-neural",
        accent: "border-neural"
    },
    {
        year: "2026",
        title: "Global Residency Training",
        description: "USMLE & PLAB prep modules integrated with virtual patient simulations.",
        status: "Vision",
        color: "bg-gold",
        accent: "border-gold"
    }
];

export default function Roadmap() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-slate-dark">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-16 px-16 items-center">

                    <div className="min-w-[400px]">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Your Career <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Roadmap</span></h2>
                        <p className="text-slate-400 text-xl max-w-sm">From your first MCQ to your postgraduate specialization, Aorta grows with you.</p>
                    </div>

                    {roadmapItems.map((item, index) => (
                        <div key={index} className="relative min-w-[500px] h-[400px] bg-slate-800/50 backdrop-blur-md rounded-3xl border border-white/10 p-12 flex flex-col justify-between group hover:border-white/30 transition-colors">
                            <div className={`absolute top-0 left-0 w-full h-2 ${item.color} rounded-t-3xl`} />

                            <div>
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-6 ${item.color}`}>
                                    {item.status}
                                </div>
                                <h3 className="text-6xl font-bold text-white/10 mb-2 select-none">{item.year}</h3>
                                <h4 className="text-3xl font-bold text-white mb-4">{item.title}</h4>
                                <p className="text-slate-300 text-lg leading-relaxed">{item.description}</p>
                            </div>

                            <div className="flex items-center gap-4 text-white/50 group-hover:text-white transition-colors">
                                <span className="text-sm font-bold uppercase tracking-widest">Learn More</span>
                                <span>→</span>
                            </div>
                        </div>
                    ))}

                    <div className="min-w-[300px] flex items-center justify-center">
                        <button className="bg-white text-slate-dark px-8 py-4 rounded-full font-bold hover:bg-clinical transition-colors">
                            Join the Waitlist
                        </button>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
