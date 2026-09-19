import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout.tsx";
import HomePage from "@/Designs/Main/HomePage.tsx";
import PlanDayPage from "@/Designs/PlanDayPage/PlanDayPage.tsx";
import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import ProtectedRoute from "@/ProtectedRoute/ProtectedRoute.tsx";
import { LoginPage } from "@/Designs/Login/LoginPage.tsx";

const AppRoutes = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/new-calendar"
        element={
          <Layout>
            <ProtectedRoute>
              <AppProvider>
                <PlanDayPage />
              </AppProvider>
            </ProtectedRoute>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
