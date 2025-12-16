export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                <div className="mx-auto max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-dark dark:text-white mb-6">
                        Master Medicine with <span className="text-primary dark:text-primary/90">Adaptive Intelligence</span>
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-slate-medium dark:text-slate-300 max-w-2xl mx-auto mb-10">
                        Transforms how students prepare for medical careers—starting with NEET UG and scaling to lifelong clinical training.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                        <button className="bg-primary text-white text-lg px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Start Learning Now
                        </button>
                        <button className="bg-white dark:bg-slate-800 text-primary dark:text-primary-300 border border-primary dark:border-primary/50 text-lg px-8 py-4 rounded-full font-bold hover:bg-clinical dark:hover:bg-slate-700 transition-all shadow-sm">
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* Hero Visual/Stats placeholder */}
                <div className="relative mx-auto max-w-5xl mt-8">
                    <div className="bg-gradient-to-tr from-primary/10 to-neural/10 dark:from-primary/20 dark:to-neural/20 rounded-3xl p-8 border border-divider dark:border-slate-medium/20 shadow-2xl backdrop-blur-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-divider dark:border-slate-medium/20">
                                <div className="text-4xl font-bold text-neural dark:text-blue-400 mb-2">10k+</div>
                                <div className="text-slate-medium dark:text-slate-300 font-medium">Active Students</div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-divider dark:border-slate-medium/20">
                                <div className="text-4xl font-bold text-recovery dark:text-green-400 mb-2">94%</div>
                                <div className="text-slate-medium dark:text-slate-300 font-medium">Exam Success Rate</div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-divider dark:border-slate-medium/20">
                                <div className="text-4xl font-bold text-arterial dark:text-red-400 mb-2">24/7</div>
                                <div className="text-slate-medium dark:text-slate-300 font-medium">AI Tutor Access</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
