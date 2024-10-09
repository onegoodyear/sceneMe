import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen font-bold flex justify-center items-center text-white">
        <span>loading...</span>
      </div>
    ); // Show loading state while fetching user
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
