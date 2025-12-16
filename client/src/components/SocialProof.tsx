import { motion } from "framer-motion";

export default function SocialProof() {
    return (
        <section className="py-24 bg-clinical relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Testimonials */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl border border-divider shadow-sm relative"
                        >
                            <div className="text-gold text-2xl mb-4">★★★★★</div>
                            <p className="text-slate-dark text-lg italic mb-6">"Aorta showed exactly why I was losing marks — my accuracy jumped within weeks. Finally, NCERT feels logical instead of random."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">AS</div>
                                <div>
                                    <div className="font-bold text-slate-dark">Ananya S.</div>
                                    <div className="text-sm text-slate-medium">NEET 2024 Aspirant</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border border-divider shadow-sm relative ml-8"
                        >
                            <div className="text-gold text-2xl mb-4">★★★★★</div>
                            <p className="text-slate-dark text-lg italic mb-6">"The exam simulator is brutal but necessary. It trained me to handle pressure like a real doctor."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">RK</div>
                                <div>
                                    <div className="font-bold text-slate-dark">Rahul K.</div>
                                    <div className="text-sm text-slate-medium">AIIMS Delhi Student</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Trust Badges */}
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-slate-dark mb-6">Trusted by Future Doctors</h2>
                        <p className="text-slate-medium mb-12 text-lg">
                            We don't just teach biology. We engineer medical minds. Join the community that prioritizes outcome over noise.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white rounded-xl border border-gold/30 shadow-sm flex flex-col items-center justify-center text-center">
                                <div className="text-4xl font-bold text-gold mb-2">10,000+</div>
                                <div className="text-sm font-medium text-slate-dark">Active Aspirants</div>
                            </div>
                            <div className="p-6 bg-white rounded-xl border border-neural/30 shadow-sm flex flex-col items-center justify-center text-center">
                                <div className="text-4xl font-bold text-neural mb-2">500+</div>
                                <div className="text-sm font-medium text-slate-dark">Doctor Mentors</div>
                            </div>
                        </div>

                        <div className="mt-12 flex items-center justify-center md:justify-start gap-2 text-slate-400 text-sm uppercase tracking-widest font-semibold">
                            <span>Built by Engineers</span>
                            <span className="w-1 h-1 rounded-full bg-slate-400" />
                            <span>Medical Professionals</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
