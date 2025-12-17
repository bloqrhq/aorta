import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  // const token = localStorage.getItem("token");

  // if (!token) {
  //   return <Navigate to="/signin" state={{ from: location }} replace />;
  // }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-clinical">
        <div className="text-primary text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
