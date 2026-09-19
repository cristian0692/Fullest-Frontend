import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout.tsx";
import HomePage from "@/Designs/Main/HomePage.tsx";
import PlanDayPage from "@/Designs/PlanDayPage/PlanDayPage.tsx";
import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import { LoginPage } from "@/Designs/Login/LoginPage.tsx";
import { AuthToken } from "!/api/AuthToken.ts";
import useToken from "!/api/hooks/useToken.ts";

const AppRoutes = () => {
  const {token, setToken} = useToken();

  if(!token){
    return <LoginPage setToken={setToken} />
  }

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
