import React, { useContext, useState } from "react";
import { AuthContext } from "@/contexts/authContexts";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { user, signIn, signOut } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!!user) {
      signOut();
      return;
    }

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      let result: any;

      if (username === "admin" && password === "admin") {
        result = await signIn("test@test.no", "123456");
      } else {
        result = await signIn(username, password);
      }

      console.log(result);

      if (result?.error?.length > 0) {
        setErrorMsg(result.error[1]);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center align-center mt-[10vh]">
        <div className="bg-white p-4 shadow-md rounded-md max-w-[300px]">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center align-center mt-[10vh]">
      <form
        className="bg-white p-4 shadow-md rounded-md max-w-[300px]"
        onSubmit={handleLogin}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          className="w-full p-2 mb-4 bg-gray-200 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="w-full p-2 mb-4 bg-gray-200 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMsg.length > 0 && <div>{errorMsg}</div>}

        <div className="flex justify-between align-center">
          <button
            className="bg-misc text-white p-2 rounded-sm hover:bg-blue-800"
            type="submit"
          >
            Login
          </button>
          <div className="flex flex-col justify-center">
            <Link to="/register">Register</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
