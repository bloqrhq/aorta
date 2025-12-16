import { motion } from "framer-motion";

const features = [
    {
        title: "AI NCERT Engine",
        description: "Converts textbook lines into smart MCQs that adapt to student weaknesses.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        color: "bg-neural",
        textColor: "text-neural",
        borderColor: "border-neural/20"
    },
    {
        title: "Exam Simulator",
        description: "Recreates NEET's trick patterns with real-time percentile rankings.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: "bg-recovery",
        textColor: "text-recovery",
        borderColor: "border-recovery/20"
    },
    {
        title: "Weakness Analytics",
        description: "Heatmaps pinpoint exactly where students lose marks.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        color: "bg-arterial",
        textColor: "text-arterial",
        borderColor: "border-arterial/20"
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
            ease: "easeOut" as const
        }
    }
};

export default function Features() {
    return (
        <section id="features" className="py-20 bg-white dark:bg-slate-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-primary dark:text-primary/90 font-bold tracking-wide uppercase text-sm mb-2">Why Choose Aorta</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-dark dark:text-white">
                        Smarter Prep, <span className="text-primary dark:text-primary/90">Better Outcomes</span>
                    </h3>
                    <p className="mt-4 text-xl text-slate-medium dark:text-slate-300">
                        Medical education today is broken. We fix it by making learning adaptive, interactive, and outcome-driven.
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
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`group p-8 rounded-3xl border ${feature.borderColor} bg-clinical dark:bg-slate-800 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h4 className={`text-xl font-bold ${feature.textColor} dark:text-white mb-3`}>{feature.title}</h4>
                            <p className="text-slate-medium dark:text-slate-300 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
