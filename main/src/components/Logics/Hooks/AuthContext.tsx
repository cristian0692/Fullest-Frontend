import { createContext, ReactNode, useContext, useState } from "react";
import useToken from "!/api/hooks/useToken.ts";
import { Credentials, loginUser } from "!/api/router.ts";

const AuthContext = createContext<DragContextType | null>(null);

type DragContextType = {
  token: string | null;
  user: string | null;
  login: (credentials: Credentials) => Promise<string>;
  logout: () => void;
  isAuthenticated: boolean;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const { token, setToken, removeToken } = useToken();
  const [user, setUser] = useState(null);

  const login = async (credentials: Credentials) => {
    const response = await loginUser(credentials);

    setToken(response);

    return response;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
