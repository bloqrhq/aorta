import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

// --- Types ---
type ViewState = "LOBBY" | "LIVE" | "RESULTS";

interface Contest {
  id: number;
  title: string;
  duration: number; // minutes
  tags: string[];
  totalQuestions: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Mixed";
  status: "Live" | "Upcoming" | "Past";
  startTime?: string;
}

// --- Mock Data ---
const MOCK_CONTESTS: Contest[] = [
  {
    id: 1,
    title: "Ray Optics Sprint #4",
    duration: 30,
    tags: ["Prism", "TIR", "Snell’s Law"],
    totalQuestions: 15,
    difficulty: "Mixed",
    status: "Live",
    startTime: "Started 10m ago",
  },
  {
    id: 2,
    title: "Cardiology Foundations",
    duration: 45,
    tags: ["ECG basics", "Cardiac Cycle"],
    totalQuestions: 25,
    difficulty: "Medium",
    status: "Upcoming",
    startTime: "Starts in 2h 15m",
  },
  {
    id: 3,
    title: "Organic Chemistry: Alcohols",
    duration: 60,
    tags: ["Reactions", "Mechanisms"],
    totalQuestions: 30,
    difficulty: "Hard",
    status: "Past",
  },
];

const MOCK_QUESTION = {
  id: 1,
  text: "A ray of light incident at an angle of 53° on a prism of refracting angle 60° suffers minimum deviation. What is the refractive index of the material of the prism?",
  options: ["1.5", "1.33", "1.414", "1.732"],
};

export default function Contest() {
  const [view, setView] = useState<ViewState>("LOBBY");
  const [activeTab, setActiveTab] = useState<"Practice" | "Contests" | "Analytics">("Contests");
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (view === "LIVE" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [view, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartContest = () => {
    setView("LIVE");
    setTimeLeft(30 * 60);
  };

  const handleSubmitContest = () => {
    if (confirm("Are you sure you want to submit? Answer locked.")) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setView("RESULTS");
      }, 1500);
    }
  };

  // --- Views ---

  const renderLobby = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Contest Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Contest Arena
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Compete, benchmark, and diagnose weaknesses in high-stakes environments.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Live Now: 2
          </span>
        </div>
      </div>

      {/* Contest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CONTESTS.map((contest) => (
          <div
            key={contest.id}
            className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contest.status === "Live"
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 animate-pulse"
                  : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                  }`}
              >
                {contest.status === "Live" ? "LIVE" : contest.status}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {contest.duration} mins
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
              {contest.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {contest.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-50 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Difficulty:</span>
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-4 bg-green-500 rounded-sm"></div>
                  <div className="w-1.5 h-4 bg-yellow-400 rounded-sm"></div>
                  <div className={`w-1.5 h-4 rounded-sm ${contest.difficulty === 'Hard' ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                </div>
              </div>
              <button
                onClick={handleStartContest}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg shadow-sm shadow-primary/20 transition-all active:scale-95"
              >
                {contest.status === "Live" ? "Enter Arena" : "Register"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLive = () => (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-slate-50 dark:bg-black">
      {/* Sticky Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ray Optics Sprint #4</h2>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-sm text-slate-500 dark:text-slate-400" title="Prism, TIR, Snell’s Law">
            Prism, H...
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className={`text-2xl font-mono font-bold tabular-nums ${timeLeft < 300 ? 'text-arterial animate-pulse' : 'text-slate-700 dark:text-slate-200'}`}>
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setView('LOBBY')}
            className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            Leave Contest
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Question Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Question Navigator Pills (Horizontal) */}
            <div className="flex flex-wrap gap-2 mb-8 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              {Array.from({ length: 15 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i + 1)}
                  className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${currentQuestion === i + 1
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110'
                    : i < 2 // Mock attempted
                      ? 'bg-purple-100 text-primary dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Question {currentQuestion}</span>
                <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">Single Correct</span>
              </div>

              <p className="text-lg md:text-xl text-slate-900 dark:text-slate-100 leading-relaxed font-medium mb-8">
                {MOCK_QUESTION.text}
              </p>

              <div className="space-y-3">
                {MOCK_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group ${selectedOption === idx
                      ? 'border-primary bg-primary/5 text-primary dark:text-white'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                  >
                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${selectedOption === idx
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-300 text-slate-400 group-hover:border-slate-400'
                      }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSubmitContest}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Contest'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Info */}
        <div className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 hidden lg:block overflow-y-auto">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Live Stats</h3>

          <div className="space-y-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500 mb-1">Attempted</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">2 <span className="text-slate-400 text-sm font-normal">/ 15</span></div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>Rank Preview</span>
                <span className="text-gold font-bold">Top 15%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900 dark:text-white">#142</span>
                <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">▲ 12</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Final rank may change after contest ends.</p>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3">Syllabus</h4>
              <div className="space-y-2">
                {MOCK_CONTESTS[0].tags.map(tag => (
                  <div key={tag} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Contest Complete</h2>
        <p className="text-slate-500 dark:text-slate-400">Great effort! Here is how you performed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-sm text-slate-500 mb-1">Final Rank</div>
          <div className="text-3xl font-bold text-primary">#42</div>
          <div className="text-xs text-green-600 mt-1">Top 5%</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-sm text-slate-500 mb-1">Score</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">48<span className="text-lg text-slate-400">/60</span></div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-sm text-slate-500 mb-1">Accuracy</div>
          <div className="text-3xl font-bold text-green-600">85%</div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 mb-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Topic Breakdown</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700 dark:text-slate-300">Prism Concepts</span>
              <span className="text-green-600 font-bold">100%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700 dark:text-slate-300">Snell's Law</span>
              <span className="text-yellow-500 font-bold">60%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-yellow-400 h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700 dark:text-slate-300">Total Internal Reflection</span>
              <span className="text-red-500 font-bold">40%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setView('LOBBY')}
          className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          Return to Lobby
        </button>
        <button className="px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          Review Solutions
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      {view === "LOBBY" && <Navbar />}

      {view === "LOBBY" && activeTab === "Contests" && renderLobby()}
      {view === "LIVE" && renderLive()}
      {view === "RESULTS" && renderResults()}

      {/* Placeholder for other tabs */}
      {view === "LOBBY" && activeTab !== "Contests" && (
        <div className="p-12 text-center text-slate-500">
          {activeTab} view coming soon.
        </div>
      )}
    </Layout>
  );
}
