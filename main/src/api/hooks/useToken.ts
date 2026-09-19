import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthToken } from "!/api/AuthToken.ts";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");

    if (tokenString == null) {
      return null;
    }

    const userToken = JSON.parse(tokenString);
    const token = userToken?.token;

    if (!token) {
      return null;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (!decoded.exp || decoded.exp < currentTime) {
        localStorage.removeItem("token");
        return null;
      }

      return token;
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: AuthToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}
