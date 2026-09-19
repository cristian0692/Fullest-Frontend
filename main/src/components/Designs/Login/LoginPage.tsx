import { useState } from "react";
import { loginUser } from "!/api/router.ts";
import { AuthToken } from "!/api/AuthToken.ts";

interface Props {
  setToken: (userToken: AuthToken) => void;
}

export const LoginPage = ({ setToken }: Props) => {
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

      const token = await loginUser({
        username,
        password,
      });
      setToken(token);
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
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          <p>Password</p>
          <input
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
