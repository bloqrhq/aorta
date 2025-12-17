export default function UtilityPanel() {
    return (
        <div className="space-y-6">

            {/* Live Session Stats */}
            <section className="bg-white dark:bg-slate-dark rounded-xl border border-divider dark:border-slate-medium/10 p-4 shadow-sm">
                <h3 className="text-xs font-bold text-slate-medium dark:text-slate-400 uppercase tracking-wider mb-4">Live Session</h3>

                <div className="space-y-4">
                    <StatRow
                        label="Accuracy"
                        value="78%"
                        color="text-recovery"
                    />
                    <StatRow
                        label="Avg Time"
                        value="45s"
                        color="text-slate-dark dark:text-slate-200"
                    />
                    <StatRow
                        label="Streak"
                        value="12 Days"
                        color="text-gold"
                    />
                </div>

                <div className="mt-6 pt-4 border-t border-divider dark:border-slate-medium/10">
                    <h4 className="text-xs font-semibold text-slate-500 mb-2">Confidence vs Accuracy</h4>
                    {/* Simple indicator visualization */}
                    <div className="relative h-24 w-full bg-clinical dark:bg-slate-800 rounded-lg border border-divider dark:border-slate-medium/10 p-2 flex items-center justify-center">
                        <div className="text-xs text-slate-400 text-center">
                            <span className="block text-xl mb-1">🤔</span>
                            Underconfident
                        </div>
                        {/* Position dot */}
                        <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)] animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Ad / Tip / Motivation Placeholder could go here */}
            <div className="bg-neural/5 rounded-xl p-4 border border-neural/10">
                <div className="flex gap-3">
                    <span className="text-lg">💡</span>
                    <div>
                        <h4 className="text-sm font-bold text-neural mb-1">Did you know?</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            Gastric juice pH is 1.8, optimal for pepsin activation.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

function StatRow({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">{label}</span>
            <span className={`text-lg font-bold ${color}`}>{value}</span>
        </div>
    );
}
