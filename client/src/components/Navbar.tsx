import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Mock streak if not available
    const streak = 12;

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsProfileOpen(false);
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-dark/80 backdrop-blur-md border-b border-divider dark:border-slate-medium/20 text-sans">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <img className="h-8 w-auto" src={Logo} alt="Aorta Logo" />
                        <span className="font-bold text-2xl text-primary tracking-tight hidden sm:block">aorta</span>
                    </div>

                    {/* Center: Tabs (Desktop) */}
                    <div className="hidden md:flex h-full items-center space-x-1">
                        {!user && <NavTab label="Features" path="/#features" active={false} isHash />}
                        <NavTab label="Practice" path="/practice" active={isActive('/practice')} />
                        <NavTab label="Contest" path="/contest" active={isActive('/contest')} />
                        <NavTab label="Leaderboard" path="/leaderboard" active={isActive('/leaderboard')} />
                    </div>

                    {/* Right: User + Actions */}
                    <div className="flex items-center gap-4">
                        {/* Streak Badge (Only if logged in) */}
                        {user && (
                            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-clinical dark:bg-slate-800 rounded-full border border-divider dark:border-slate-medium/20 text-sm font-medium">
                                <span role="img" aria-label="fire">🔥</span>
                                <span className="text-slate-dark dark:text-slate-200">{streak} Day Streak</span>
                            </div>
                        )}

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

                        {/* Auth State */}
                        {user ? (
                            <div className="relative">
                                {/* Profile Avatar */}
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-semibold cursor-pointer hover:bg-primary/20 transition-colors focus:outline-none"
                                >
                                    {user?.name?.[0]?.toUpperCase() || 'U'}
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.1 }}
                                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-dark rounded-xl shadow-lg border border-divider dark:border-slate-medium/20 py-1 overflow-hidden"
                                        >
                                            <div className="px-4 py-2 border-b border-divider dark:border-slate-medium/10">
                                                <p className="text-sm font-medium text-slate-dark dark:text-slate-200 truncate">{user.name}</p>
                                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-clinical dark:hover:bg-slate-800 transition-colors"
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-arterial hover:bg-arterial/5 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/signin">
                                <button className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md hover:shadow-[0_0_20px_rgba(91,45,139,0.5)] cursor-pointer text-sm">
                                    Sign In
                                </button>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-slate-medium dark:text-slate-200 hover:text-primary focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white dark:bg-slate-dark border-b border-divider dark:border-slate-medium/20 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {!user && <MobileNavLink to="/#features" label="Features" onClick={() => setIsMenuOpen(false)} />}
                            <MobileNavLink to="/practice" label="Practice" onClick={() => setIsMenuOpen(false)} />
                            <MobileNavLink to="/contest" label="Contest" onClick={() => setIsMenuOpen(false)} />
                            <MobileNavLink to="/leaderboard" label="Leaderboard" onClick={() => setIsMenuOpen(false)} />

                            {user && (
                                <>
                                    <div className="border-t border-divider dark:border-slate-medium/10 my-2 pt-2"></div>
                                    <MobileNavLink to="/dashboard" label="Dashboard" onClick={() => setIsMenuOpen(false)} />
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-arterial hover:bg-arterial/5"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function NavTab({ label, path, active = false, isHash = false }: { label: string; path: string; active?: boolean; isHash?: boolean }) {
    const className = `
        relative px-6 h-16 flex items-center text-sm font-medium transition-colors
        ${active
            ? 'text-primary'
            : 'text-slate-medium dark:text-slate-400 hover:text-slate-dark dark:hover:text-slate-200'
        }
    `;

    const content = (
        <>
            {label}
            {active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
        </>
    );

    if (isHash) {
        return (
            <a href={path} className={className}>
                {content}
            </a>
        );
    }

    return (
        <Link to={path} className={className}>
            {content}
        </Link>
    );
}

function MobileNavLink({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
    const isHash = to.startsWith('/#');
    const className = "block px-3 py-2 rounded-md text-base font-medium text-slate-dark dark:text-slate-200 hover:text-primary hover:bg-clinical dark:hover:bg-slate-800";

    if (isHash) {
        return (
            <a href={to} onClick={onClick} className={className}>
                {label}
            </a>
        );
    }

    return (
        <Link to={to} onClick={onClick} className={className}>
            {label}
        </Link>
    );
}

