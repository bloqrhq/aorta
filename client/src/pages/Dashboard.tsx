import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { useAuth } from '../context/AuthContext';
import { getQuestions } from '../api/questions.api';

interface SubjectStat {
  id: string;
  name: string;
  count: number;
  color: string;
  icon: string;
  description: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SubjectStat[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const subjects = [
          { id: 'bot', name: 'Botany', color: 'bg-recovery', icon: '🌿', description: 'Plant life and biology' },
          { id: 'zoo', name: 'Zoology', color: 'bg-arterial', icon: '🦁', description: 'Animal physiology' },
          { id: 'phy', name: 'Physics', color: 'bg-neural', icon: '⚛️', description: 'Matter and energy' },
          { id: 'che', name: 'Chemistry', color: 'bg-gold', icon: '🧪', description: 'Substances and reactions' }
        ];

        const responses = await Promise.all(
          subjects.map(sub => getQuestions(sub.id))
        );

        let total = 0;
        const fetchedStats = subjects.map((sub, index) => {
          const count = responses[index].data.length || 0;
          total += count;
          return { ...sub, count };
        });

        setStats(fetchedStats);
        setTotalQuestions(total);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-dark dark:text-clinical mb-4">
              Welcome back, <span className="text-primary">{user?.name}</span>
            </h1>
            <p className="text-xl text-slate-medium dark:text-slate-400 max-w-2xl mx-auto">
              Your gateway to medical excellence. Access our comprehensive question bank and master your subjects.
            </p>
          </motion.div>

          {/* Overview Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-primary to-neural rounded-3xl p-8 text-white shadow-xl mb-12 relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Question Bank Access</h2>
                <p className="text-white/80 text-lg">Unlimited access to high-quality medical entrance questions.</p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 min-w-[200px]">
                <div className="text-5xl font-bold mb-1">
                  {loading ? "..." : totalQuestions}
                </div>
                <div className="text-sm font-medium text-white/80 uppercase tracking-wider">Total Questions</div>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </motion.div>

          {/* Subject Grid */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-dark dark:text-clinical mb-6">Available Subjects</h3>
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((subject) => (
                <motion.div
                  key={subject.id}
                  variants={item}
                  className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-divider dark:border-slate-700"
                >
                  <div className={`w-12 h-12 rounded-xl ${subject.color} bg-opacity-10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {subject.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-dark dark:text-clinical mb-2">{subject.name}</h4>
                  <p className="text-slate-medium dark:text-slate-400 text-sm mb-4">{subject.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-divider dark:border-slate-700">
                    <span className="text-sm font-medium text-slate-500">
                      {loading ? "Loading..." : `${subject.count} Questions`}
                    </span>
                    <Link 
                      to="/practice" 
                      className="text-primary font-semibold text-sm hover:underline"
                    >
                      Practice →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Link to="/practice" className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm border border-divider dark:border-slate-700 hover:border-primary/50 transition-colors">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-dark dark:text-clinical mb-2">Start Practice Session</h3>
                <p className="text-slate-medium dark:text-slate-400 mb-6">Customize your test with specific topics and difficulty levels.</p>
                <span className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-semibold group-hover:bg-primary/90 transition-colors">
                  Start Now
                </span>
              </div>
              <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
                <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              </div>
            </Link>

            <Link to="/contest" className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm border border-divider dark:border-slate-700 hover:border-arterial/50 transition-colors">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-dark dark:text-clinical mb-2">Live Contests</h3>
                <p className="text-slate-medium dark:text-slate-400 mb-6">Compete with other students in real-time and check your ranking.</p>
                <span className="inline-flex items-center justify-center px-6 py-3 bg-arterial text-white rounded-xl font-semibold group-hover:bg-arterial/90 transition-colors">
                  View Contests
                </span>
              </div>
              <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
                <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M20.2 5.9l.8-.8C21.4 4.7 21.4 4 21 3.6s-1.1-.4-1.4 0l-.8.8c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4.1zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34zM19 12c0-3.75-2.58-6.8-6-7.68v15.36c3.42-.88 6-3.93 6-7.68z"/></svg>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </Layout>
  );
}
