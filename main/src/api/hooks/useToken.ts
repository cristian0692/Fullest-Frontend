import { useState } from "react";
import { AuthToken } from "!/api/AuthToken.ts";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");

    if (tokenString == null) {
      return null;
    }

    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: AuthToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
