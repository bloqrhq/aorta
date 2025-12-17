interface UserStats {
    solved: number;
    attempts: number;
    streak: number;
}

interface UtilityPanelProps {
    stats?: UserStats;
}

export default function UtilityPanel({ stats }: UtilityPanelProps) {
    const accuracy = stats && stats.attempts > 0
        ? Math.round((stats.solved / stats.attempts) * 100)
        : 0;

    const streak = stats?.streak || 0;
    const solved = stats?.solved || 0;

    return (
        <div className="space-y-6">

            {/* Live Session Stats */}
            <section className="bg-white dark:bg-slate-dark rounded-xl border border-divider dark:border-slate-medium/10 p-4 shadow-sm">
                <h3 className="text-xs font-bold text-slate-medium dark:text-slate-400 uppercase tracking-wider mb-4">Live Stats</h3>

                <div className="space-y-4">
                    <StatRow
                        label="Accuracy"
                        value={`${accuracy}%`}
                        color={
                            accuracy >= 70
                                ? "text-recovery dark:text-green-400"
                                : accuracy >= 40
                                    ? "text-warning dark:text-white"
                                    : "text-arterial dark:text-red-400"
                        }
                    />

                    <StatRow
                        label="Questions Solved"
                        value={solved.toString()}
                        color="text-slate-dark dark:text-slate-200"
                    />
                    <StatRow
                        label="Current Streak"
                        value={`${streak} 🔥`}
                        color="text-orange-500"
                    />
                </div>
            </section>
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
