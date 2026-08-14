import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, status } = useAuth();

  if (status === 'checking') {
    return (
      <div className="screen-center">
        <div className="loader" aria-label="Checking session">
          <span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
