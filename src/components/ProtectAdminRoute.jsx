import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectAdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (!user.is_staff) return <Navigate to="/" replace />;

  return children;
};

export default ProtectAdminRoute;
