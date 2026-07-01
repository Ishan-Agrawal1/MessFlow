import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Loader } from '@/components/common/Loader';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // In a real app, you might want a global loading state while checking auth on mount
  if (isAuthenticated === undefined) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect to their respective dashboard if they try to access an unauthorized route
    return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} replace />;
  }

  return <Outlet />;
};

