import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, 75]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);
  const opacity2 = useTransform(scrollY, [200, 600], [0, 1]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const capabilities = [
    {
      title: 'Structured Practice',
      description: 'Navigate through carefully organized question sets across all four subjects',
      gradient: 'from-primary/20 to-neural/20',
      iconBg: 'bg-primary/10',
      delay: 0.2
    },
    {
      title: 'Exam-Oriented Questions',
      description: 'Every question is aligned with NEET patterns and difficulty standards',
      gradient: 'from-neural/20 to-recovery/20',
      iconBg: 'bg-neural/10',
      delay: 0.3
    },
    {
      title: 'Live Competitive Contests',
      description: 'Real-time challenges that simulate actual exam pressure and timing',
      gradient: 'from-arterial/20 to-gold/20',
      iconBg: 'bg-arterial/10',
      delay: 0.4
    },
    {
      title: 'Performance Insights',
      description: 'Advanced analytics will track your growth when you\'re ready',
      gradient: 'from-recovery/20 to-primary/20',
      iconBg: 'bg-recovery/10',
      delay: 0.5
    },
  ];

  const principles = [
    {
      title: 'Discipline',
      description: 'Consistent effort compounds into mastery',
      color: 'primary'
    },
    {
      title: 'Clarity',
      description: 'No noise, only what matters',
      color: 'neural'
    },
    {
      title: 'Progress',
      description: 'Small steps lead to transformation',
      color: 'recovery'
    }
  ];

  return (
    <Layout>
      <Navbar />
      
      <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
        
        {/* Enhanced Background System */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Primary orb */}
          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 50, 0],
              scale: [1, 1.3, 1.1, 1],
              rotate: [0, 90, 180, 360]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-40 -right-40 w-[900px] h-[900px] bg-gradient-to-br from-primary/30 via-neural/20 to-transparent rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
            }}
          />
          
          {/* Secondary orb */}
          <motion.div
            animate={{
              x: [0, -120, 60, 0],
              y: [0, 100, -40, 0],
              scale: [1, 1.2, 1.15, 1],
              rotate: [360, 270, 180, 0]
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
            className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-gradient-to-tr from-recovery/25 via-arterial/15 to-transparent rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`
            }}
          />

          {/* Tertiary accent orb */}
          <motion.div
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -60, 30, 0],
              scale: [1, 1.25, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10
            }}
            className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-gold/20 via-neural/15 to-transparent rounded-full blur-3xl"
          />

          {/* Animated grid */}
          <motion.div
            animate={{ opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:80px_80px]"
          />

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(255,255,255,0.9)_100%)] dark:bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(15,23,42,0.9)_100%)]" />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          
          {/* Hero Section */}
          <motion.div
            style={{ y: y1, opacity: opacity1, scale }}
            className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                    Welcome back,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-neural to-primary bg-clip-text text-transparent animate-gradient">
                    {user?.name}
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-8"
              >
                Let your preparation flow with clarity and focus.
              </motion.p>

              {/* Animated pulse line */}
              <motion.div className="relative h-16 max-w-4xl mx-auto mb-12">
                <svg className="w-full h-full" viewBox="0 0 800 60" fill="none">
                  <motion.path
                    d="M 0 30 L 200 30 L 250 10 L 300 50 L 350 30 L 550 30 L 600 15 L 650 45 L 700 30 L 800 30"
                    stroke="url(#pulse-gradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5B2D8B" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#5B2D8B" stopOpacity="1" />
                      <stop offset="100%" stopColor="#5B2D8B" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Capabilities Grid */}
          <motion.div
            style={{ y: y2 }}
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Built for Excellence
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Every feature designed to support your journey from preparation to success
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: capability.delay,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className={`w-16 h-16 ${capability.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-neural rounded-lg" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {capability.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {capability.description}
                      </p>

                      {/* Hover indicator */}
                      <motion.div
                        className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Philosophy Section */}
            <motion.div
            style={{ y: y3, opacity: opacity2 }}
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-neural/10 to-recovery/10 rounded-[3rem] blur-3xl" />
                
                <div className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-[3rem] p-12 md:p-16 overflow-hidden border border-slate-200 dark:border-slate-700">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-neural/10 dark:bg-neural/20 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                      The Aorta Philosophy
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
                      Just as the aorta sustains the body, consistent effort sustains preparation
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                      {principles.map((principle, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="text-center"
                        >
                          <div className={`w-12 h-1 bg-gradient-to-r from-${principle.color} to-${principle.color}/50 mx-auto mb-4 rounded-full`} />
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{principle.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400">{principle.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>


          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Begin Your Journey
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
                Every expert was once a beginner. Every achievement started with a single step.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/practice">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(91, 45, 139, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-12 py-5 bg-gradient-to-r from-primary to-neural text-white rounded-2xl font-semibold text-lg shadow-2xl overflow-hidden group min-w-[200px]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Start Practice
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-neural to-primary"
                      initial={{ x: '100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>

                <Link to="/contest">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-12 py-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl text-primary border-2 border-primary/30 rounded-2xl font-semibold text-lg hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/50 transition-all shadow-lg min-w-[200px]"
                  >
                    Explore Contests
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none opacity-30">
          <motion.div
            animate={{ x: [0, -100, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0"
          >
            <svg className="w-[300%] h-full" viewBox="0 0 2880 120" fill="none" preserveAspectRatio="none">
              <path d="M0,64 C480,85 960,32 1440,64 C1920,96 2400,43 2880,64 L2880,120 L0,120 Z" 
                    fill="currentColor" 
                    className="text-primary/20" />
            </svg>
          </motion.div>
        </div>

      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </Layout>
  );
}