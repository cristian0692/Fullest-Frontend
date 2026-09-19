import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/Logics/Hooks/AuthContext.tsx";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
