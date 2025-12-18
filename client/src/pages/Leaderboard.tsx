import  { useState } from "react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

// --- Types ---
interface LeaderboardEntry {
    rank: number;
    username: string;
    score: number;
    accuracy: number;
    timeTaken: string; // MM:SS
    percentile: number;
    isCurrentUser?: boolean;
}

// --- Mock Data ---
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, username: "DrHouse_MD", score: 60, accuracy: 100, timeTaken: "18:45", percentile: 99.9 },
    { rank: 2, username: "Synapse_Surgeon", score: 58, accuracy: 96, timeTaken: "21:10", percentile: 99.5 },
    { rank: 3, username: "NeuroNav", score: 58, accuracy: 94, timeTaken: "22:05", percentile: 99.2 },
    { rank: 4, username: "CardioKing", score: 56, accuracy: 90, timeTaken: "24:30", percentile: 98.1 },
    { rank: 5, username: "OrthoBro", score: 55, accuracy: 88, timeTaken: "25:15", percentile: 97.5 },
    { rank: 6, username: "DermDiva", score: 52, accuracy: 82, timeTaken: "28:00", percentile: 95.0 },
    { rank: 42, username: "AgSpades", score: 48, accuracy: 75, timeTaken: "29:45", percentile: 85.0, isCurrentUser: true },
    { rank: 43, username: "MedStudent99", score: 48, accuracy: 74, timeTaken: "30:00", percentile: 84.8 },
];

const MOCK_GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, username: "Synapse_Surgeon", score: 1250, accuracy: 97, timeTaken: "41h", percentile: 99.9 },
    { rank: 2, username: "DrHouse_MD", score: 1240, accuracy: 98, timeTaken: "38h", percentile: 99.8 },
    { rank: 3, username: "CardioKing", score: 1200, accuracy: 95, timeTaken: "45h", percentile: 99.5 },
    { rank: 4, username: "NeuroNav", score: 1180, accuracy: 94, timeTaken: "42h", percentile: 99.1 },
    { rank: 5, username: "OrthoBro", score: 1150, accuracy: 92, timeTaken: "40h", percentile: 98.7 },
    { rank: 25, username: "AgSpades", score: 950, accuracy: 82, timeTaken: "35h", percentile: 88.0, isCurrentUser: true },
];

const CONTESTS = [
    "Ray Optics Sprint #4",
    "Cardiology Foundations",
    "Organic Chemistry: Alcohols",
];

export default function Leaderboard() {
    const [selectedContest, setSelectedContest] = useState(CONTESTS[0]);
    const [filter, setFilter] = useState("Top 100");
    const [searchQuery, setSearchQuery] = useState("");
    const [leaderboardType, setLeaderboardType] = useState("CONTEST"); // "CONTEST" or "GLOBAL"

    // Sort/Filter Logic (Mock implementation)
    const currentData = leaderboardType === "GLOBAL" ? MOCK_GLOBAL_LEADERBOARD : MOCK_LEADERBOARD;

    const displayedData = currentData.filter((entry) =>
        entry.username.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.rank - b.rank);

    const getAccuracyColor = (acc: number) => {
        if (acc >= 90) return "text-green-600 bg-green-50 dark:bg-green-900/20";
        if (acc >= 80) return "text-recovery bg-green-50 dark:bg-green-900/20";
        if (acc >= 50) return "text-gold bg-yellow-50 dark:bg-yellow-900/20";
        return "text-arterial bg-red-50 dark:bg-red-900/20";
    };

    const currentUser = currentData.find((e) => e.isCurrentUser);

    return (
        <Layout>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pb-32">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                            Leaderboard
                        </h1>

                        {/* Tabs */}
                        <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl inline-flex mb-2">
                            <button
                                onClick={() => setLeaderboardType("CONTEST")}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${leaderboardType === "CONTEST"
                                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                    }`}
                            >
                                Contest Leaderboard
                            </button>
                            <button
                                onClick={() => setLeaderboardType("GLOBAL")}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${leaderboardType === "GLOBAL"
                                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                    }`}
                            >
                                Global Leaderboard
                            </button>
                        </div>

                        <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
                            {leaderboardType === "CONTEST"
                                ? "Rankings for specific sprint contests."
                                : "Overall rankings based on accumulated performance across all contests."}
                        </p>
                    </div>

                    {leaderboardType === "CONTEST" && (
                        <div className="relative min-w-[280px]">
                            <label className="block text-xs font-semibold text-neural mb-1 uppercase tracking-wider">
                                Select Contest
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedContest}
                                    onChange={(e) => setSelectedContest(e.target.value)}
                                    className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-neural/20 focus:border-neural shadow-sm transition-all"
                                >
                                    {CONTESTS.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filter & Toolbar */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        {["Top 10%", "Top 100", "My Rank"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${filter === f
                                    ? "bg-primary text-white border-primary"
                                    : "bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Search username..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <svg className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24">Rank</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">
                                    <div className="flex items-center justify-center gap-1">
                                        Score
                                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Accuracy</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Time</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Percentile</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {displayedData.map((entry) => (
                                <tr
                                    key={entry.rank}
                                    className={`group transition-colors ${entry.isCurrentUser
                                        ? "bg-purple-50/50 dark:bg-purple-900/10 hover:bg-purple-100/50 dark:hover:bg-purple-900/20"
                                        : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        } ${entry.rank <= 3 ? "relative" : ""}`}
                                >
                                    <td className={`px-6 py-4 text-sm font-bold ${entry.rank <= 3 ? 'text-gold text-lg' : 'text-slate-700 dark:text-slate-300'
                                        }`}>
                                        {entry.rank <= 3 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold"></div>}
                                        #{entry.rank}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${entry.rank === 1 ? 'bg-gold text-white' :
                                                entry.rank === 2 ? 'bg-slate-300 text-slate-600' :
                                                    entry.rank === 3 ? 'bg-orange-300 text-white' :
                                                        'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                                }`}>
                                                {entry.username.charAt(0)}
                                            </div>
                                            <span className={`text-sm font-medium ${entry.isCurrentUser ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                                                {entry.username}
                                                {entry.isCurrentUser && <span className="ml-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase tracking-wide">You</span>}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{entry.score}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccuracyColor(entry.accuracy)}`}>
                                            {entry.accuracy}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-slate-600 dark:text-slate-400 font-mono">
                                        {entry.timeTaken}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{entry.percentile}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {displayedData.map((entry) => (
                        <div
                            key={entry.rank}
                            className={`bg-white dark:bg-slate-900 p-4 rounded-xl border shadow-sm ${entry.isCurrentUser
                                ? 'border-primary ring-1 ring-primary/20'
                                : 'border-slate-200 dark:border-slate-800'
                                } ${entry.rank <= 3 ? 'border-l-4 border-l-gold' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <span className={`text-lg font-bold w-8 ${entry.rank <= 3 ? 'text-gold' : 'text-slate-500'}`}>
                                        #{entry.rank}
                                    </span>
                                    <div>
                                        <div className={`font-semibold ${entry.isCurrentUser ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                                            {entry.username}
                                            {entry.isCurrentUser && <span className="ml-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">YOU</span>}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs font-mono text-slate-400">{entry.timeTaken}</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100 dark:border-slate-800">
                                <div className="text-center">
                                    <div className="text-xs text-slate-500 mb-1">Score</div>
                                    <div className="font-bold text-slate-900 dark:text-white">{entry.score}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-slate-500 mb-1">Accuracy</div>
                                    <div className={`font-bold text-sm ${getAccuracyColor(entry.accuracy).split(' ')[0]}`}>{entry.accuracy}%</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-slate-500 mb-1">Percentile</div>
                                    <div className="font-bold text-slate-900 dark:text-white">{entry.percentile}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sticky User Footer (Always visible) */}
            {currentUser && (
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-primary/20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 md:px-8 z-20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-6">
                            <div className="hidden md:flex flex-col">
                                <span className="text-xs text-slate-500 uppercase tracking-wider">Your Rank</span>
                                <span className="text-2xl font-bold text-primary">#{currentUser.rank}</span>
                            </div>
                            <div className="md:hidden font-bold text-primary flex items-center mb-1">
                                #{currentUser.rank}
                            </div>

                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                            <div className="flex gap-4 md:gap-8 text-sm md:text-base">
                                <div>
                                    <span className="md:hidden text-xs text-slate-500 mr-2">Score</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{currentUser.score}</span>
                                </div>
                                <div>
                                    <span className="md:hidden text-xs text-slate-500 mr-2">Acc</span>
                                    <span className={`font-bold ${getAccuracyColor(currentUser.accuracy).split(' ')[0]}`}>{currentUser.accuracy}%</span>
                                </div>
                                <div className="hidden md:block">
                                    <span className="font-mono text-slate-600 dark:text-slate-400">{currentUser.timeTaken}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="hidden md:inline text-sm text-slate-500">Percentile</span>
                            <span className="px-3 py-1 bg-gold/10 text-yellow-700 dark:text-yellow-400 rounded-lg font-bold text-sm border border-gold/20">
                                {currentUser.percentile}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}