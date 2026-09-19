import { Dispatch, SetStateAction, useState } from "react";
import { loginUser } from "!/api/router.ts";
import { AuthToken } from "!/api/AuthToken.ts";

interface Props {
  setToken: (userToken: AuthToken) => void;
}

export const LoginPage = ({ setToken }: Props) => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      throw new Error("Username and password cant be null");
    }

    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
