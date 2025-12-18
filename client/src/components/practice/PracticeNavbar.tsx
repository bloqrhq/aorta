import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

export default function PracticeNavbar() {
    const { user } = useAuth(); // Assuming user object has streak info or we mock it
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();

    const [streak, setStreak] = useState(0);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-dark/80 backdrop-blur-md border-b border-divider dark:border-slate-medium/20">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <img className="h-8 w-auto" src={Logo} alt="Aorta Logo" />
                        <span className="font-bold text-2xl text-primary tracking-tight hidden sm:block">aorta</span>
                    </div>

                    {/* Center: Tabs */}
                    <div className="hidden md:flex h-full items-center space-x-1">
                        <NavTab label="Practice" active />
                        <NavTab label="Contest" />
                        <NavTab label="Leaderboard" />
                    </div>

                    {/* Right: User + Streak */}
                    <div className="flex items-center gap-4">
                        {/* Streak Badge */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-clinical dark:bg-slate-800 rounded-full border border-divider dark:border-slate-medium/20 text-sm font-medium">
                            <span role="img" aria-label="fire">🔥</span>
                            <span className="text-slate-dark dark:text-slate-200">{streak} Day Streak</span>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {theme === "dark" ? (
                                <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-slate-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* User Avatar */}
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-semibold cursor-pointer hover:bg-primary/20 transition-colors">
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavTab({ label, active = false }: { label: string; active?: boolean }) {
    return (
        <button
            className={`
                relative px-6 h-16 flex items-center text-sm font-medium transition-colors
                ${active
                    ? 'text-primary'
                    : 'text-slate-medium dark:text-slate-400 hover:text-slate-dark dark:hover:text-slate-200'
                }
            `}
        >
            {label}
            {active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
        </button>
    );
}
