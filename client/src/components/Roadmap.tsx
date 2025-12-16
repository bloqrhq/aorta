import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const roadmapItems = [
    {
        year: "2026",
        title: "NEET UG Mastery",
        description: "Adaptive NCERT modules, Exam Simulators, and Weakness Analytics live.",
        status: "Live Now",
        color: "bg-recovery",
        textColor: "text-recovery",
        borderColor: "border-recovery"
    },
    {
        year: "2027",
        title: "MBBS Clinical Reasoning",
        description: "Case-based learning for 1st Year Anatomy & Physiology. Bridging the gap between theory and practice.",
        status: "Beta Access",
        color: "bg-neural",
        textColor: "text-neural",
        borderColor: "border-neural"
    },
    {
        year: "2028",
        title: "Global Residency Training",
        description: "USMLE & PLAB prep modules integrated with virtual patient simulations.",
        status: "Vision",
        color: "bg-gold",
        textColor: "text-gold",
        borderColor: "border-gold"
    }
];

export default function Roadmap() {
    const targetRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    useEffect(() => {
        const updateScrollRange = () => {
            if (scrollRef.current && targetRef.current) {
                // Calculate total scrollable width minus the viewport width
                // Adding some padding/buffer to ensure smooth end
                const fullWidth = scrollRef.current.scrollWidth;
                const viewWidth = window.innerWidth;
                // If content fits, no scrolling needed (0). Otherwise diff.
                const range = fullWidth > viewWidth ? fullWidth - viewWidth + 64 : 0;
                setScrollRange(range);
            }
        };

        updateScrollRange();
        window.addEventListener("resize", updateScrollRange);
        return () => window.removeEventListener("resize", updateScrollRange);
    }, []);

    const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollRange}px`]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-clinical dark:bg-slate-dark transition-colors duration-300">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div
                    ref={scrollRef}
                    style={{ x }}
                    className="flex gap-12 px-8 md:px-16 items-center"
                >

                    <div className="min-w-[300px] md:min-w-[400px]">
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-dark dark:text-white mb-6">Your Career <br /><span className="text-primary dark:text-primary/90">Roadmap</span></h2>
                        <p className="text-slate-medium dark:text-slate-300 text-lg md:text-xl max-w-sm">From your first MCQ to your postgraduate specialization, Aorta grows with you.</p>
                    </div>

                    {roadmapItems.map((item, index) => (
                        <div key={index} className="relative min-w-[400px] md:min-w-[500px] h-[400px] bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-10 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-300">
                            <div className={`absolute top-0 left-0 w-full h-3 ${item.color} rounded-t-3xl`} />

                            <div>
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-6 ${item.color}`}>
                                    {item.status}
                                </div>
                                <h3 className={`text-6xl font-bold opacity-30 dark:opacity-40 mb-2 select-none ${item.textColor}`}>{item.year}</h3>
                                <h4 className="text-3xl font-bold text-slate-dark dark:text-white mb-4">{item.title}</h4>
                                <p className="text-slate-medium dark:text-slate-300 text-lg leading-relaxed">{item.description}</p>
                            </div>

                            <div className={`flex items-center gap-3 font-bold text-sm uppercase tracking-widest ${item.textColor} opacity-80 group-hover:opacity-100 transition-opacity`}>
                                <span>Learn More</span>
                                <span>→</span>
                            </div>
                        </div>
                    ))}

                    {/* Added buffer div to ensure right padding is visible at end of scroll */}
                    <div className="min-w-[50px]" />

                </motion.div>
            </div>
        </section>
    );
}
