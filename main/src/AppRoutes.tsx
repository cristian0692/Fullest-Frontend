import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout.tsx";
import HomePage from "@/Designs/Main/HomePage.tsx";
import PlanDayPage from "@/Designs/PlanDayPage/PlanDayPage.tsx";
import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";

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
      <Route
        path="/new-calendar"
        element={
          <Layout>
            <AppProvider>
              <PlanDayPage />
            </AppProvider>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
