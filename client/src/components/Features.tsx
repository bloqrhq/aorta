import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";

const features = [
    {
        title: "AI NCERT Engine",
        description: "Every NCERT line transformed into adaptive NEET-level MCQs.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        color: "bg-neural",
        textColor: "text-neural",
        borderColor: "border-neural/20"
    },
    {
        title: "Clinical Reasoning Builder",
        description: "Train how doctors think — not just how students memorize. (Coming Soon)",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
        color: "bg-primary",
        textColor: "text-primary",
        borderColor: "border-primary/20"
    },
    {
        title: "Exam Simulator Intelligence",
        description: "Experience NEET traps, timing pressure, and real-time ranking.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
        color: "bg-gold",
        textColor: "text-gold",
        borderColor: "border-gold/20"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

function FeatureCard({ feature }: { feature: any }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x);
    const mouseY = useSpring(y);

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXVal = event.clientX - rect.left;
        const mouseYVal = event.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            variants={itemVariants}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className={`relative p-8 rounded-3xl border border-white/20 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
        >
            <div
                style={{ transform: "translateZ(20px)" }}
                className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-md`}
            >
                {feature.icon}
            </div>
            <h4
                style={{ transform: "translateZ(30px)" }}
                className={`text-xl font-bold ${feature.textColor} dark:text-white mb-3`}
            >
                {feature.title}
            </h4>
            <p
                style={{ transform: "translateZ(20px)" }}
                className="text-slate-medium dark:text-slate-300 leading-relaxed font-medium"
            >
                {feature.description}
            </p>
        </motion.div>
    )
}

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white dark:bg-slate-dark transition-colors duration-300 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neural/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-primary dark:text-primary/90 font-bold tracking-wide uppercase text-sm mb-3">The Aorta Advantage</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-slate-dark dark:text-white leading-tight">
                        Train <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neural">Like A Doctor</span>
                    </h3>
                    <p className="mt-6 text-xl text-slate-medium dark:text-slate-300 font-light">
                        Go beyond rote memorization. Build the clinical reflexes needed for top rank and future practice.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
