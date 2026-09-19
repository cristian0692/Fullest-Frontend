import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./global.css";
import AppRoutes from "./AppRoutes.tsx";
import { AuthProvider } from "@/Logics/Hooks/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  </StrictMode>,
);
