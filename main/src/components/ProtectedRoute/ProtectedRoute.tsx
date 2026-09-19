import { Navigate } from "react-router-dom";
import { AuthToken } from "!/api/AuthToken.ts";
import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    token: AuthToken
}


export default function ProtectedRoute({ children, token }: Props) {
  if (!token) {
    return <Navigate to="/login" replace/>;
  }
  return children;
}
