import { motion } from "framer-motion";

export default function FinalCTA() {
    return (
        <section className="relative py-32 overflow-hidden flex items-center justify-center">
            {/* Background morphing */}
            <div className="absolute inset-0 bg-slate-900 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-50" />
                {/* Hospital Corridor Hint - Abstract Lines */}
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 49px, #fff 50px)' }}
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        Your Medical Career <br /> Is A Journey.
                    </h2>
                    <p className="text-2xl text-slate-300 mb-12">
                        Don't leave it to chance. Start it with the intelligence you deserve.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-recovery text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-recovery/90 transition-all group relative overflow-hidden cursor-pointer"
                    >
                        <span className="relative z-10">Begin with Aorta</span>
                        <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </motion.button>

                    <p className="mt-6 text-slate-500 text-sm">No credit card required for trial.</p>
                </motion.div>
            </div>
        </section>
    );
}
