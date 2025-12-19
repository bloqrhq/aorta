import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Practice from './pages/Practice';
import Contest from './pages/Contest';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import TestPage from './pages/TestPage';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          if(process.env.VITE_ENVIRONMENT !== "production"){
            <Route path="/test" element={<TestPage />} />
          }
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/practice" element={<Practice />} />
            <Route path="/contest" element={<Contest />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Route>
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}