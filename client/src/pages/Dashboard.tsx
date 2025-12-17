import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen bg-clinical p-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Dashboard</h1>
        <p className="text-slate-dark mb-4">Welcome back, {user?.name || user?.email}!</p>
       
      </div>
    </Layout>
  );
}
