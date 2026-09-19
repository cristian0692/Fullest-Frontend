import { useState } from "react";
import { useAuth } from "@/Logics/Hooks/AuthContext.tsx";
import { Navigate, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!username) {
        throw new Error("Username cant be null");
      }
      if (!password) {
        throw new Error("Password cant be null");
      }

      await login({ username, password });
      navigate("/new-calendar");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err) || "An error occurred during login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <h1>Log In</h1>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </label>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
