import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const token = localStorage.getItem("authToken");
  const location = useLocation();

  if (!token) {
    // Redirect unauthenticated user to login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
