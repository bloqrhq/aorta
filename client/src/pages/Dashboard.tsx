import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-clinical p-8">
      <h1 className="text-3xl font-bold text-primary mb-4">Dashboard</h1>
      <p className="text-slate-dark mb-4">Welcome back, {user?.name || user?.email}!</p>
      <button
        onClick={logout}
        className="px-4 py-2 bg-arterial text-white rounded hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
