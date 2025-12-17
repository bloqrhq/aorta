import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-dark/80 backdrop-blur-md border-b border-divider dark:border-slate-medium/20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <img className="h-8 w-auto" src={Logo} alt="Aorta Logo" />
                        <span className="font-bold text-2xl text-primary tracking-tight">aorta</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-slate-medium dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors font-medium">Features</a>
                        <Link to="/practice" className="text-slate-medium dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors font-medium">Practice</Link>
                        <Link to="/contest" className="text-slate-medium dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors font-medium">Contest</Link>

                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle theme"
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

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/dashboard" className="text-slate-medium dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors font-medium">
                                    Dashboard
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-arterial text-white px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/signin">
                                <button className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md hover:shadow-[0_0_20px_rgba(91,45,139,0.5)] cursor-pointer">
                                    Sign in
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {theme === "dark" ? (
                                <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-slate-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-medium dark:text-slate-200 hover:text-primary focus:outline-none"
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

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-dark border-b border-divider dark:border-slate-medium/20">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-slate-dark dark:text-slate-200 hover:text-primary hover:bg-clinical dark:hover:bg-slate-800">Features</a>
                        <Link to="/practice" className="block px-3 py-2 rounded-md text-base font-medium text-slate-dark dark:text-slate-200 hover:text-primary hover:bg-clinical dark:hover:bg-slate-800">Practice</Link>
                        <Link to="/contest" className="block px-3 py-2 rounded-md text-base font-medium text-slate-dark dark:text-slate-200 hover:text-primary hover:bg-clinical dark:hover:bg-slate-800">Contest</Link>
                        
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-dark dark:text-slate-200 hover:text-primary hover:bg-clinical dark:hover:bg-slate-800">
                                    Dashboard
                                </Link>
                                <div className="mt-4 px-3">
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full bg-arterial text-white px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mt-4 px-3">
                                <Link to="/register">
                                    <button className="w-full bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
