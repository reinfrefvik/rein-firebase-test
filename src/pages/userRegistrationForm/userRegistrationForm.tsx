import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContexts";

const UserRegistrationForm = () => {
  const { createUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await createUser(email, password);
  };

  return (
    <div className="flex justify-center align-center mt-[10vh]">
      <form className="flex flex-col justify-center align-center p-4 bg-white rounded-sm shadow-md" onSubmit={handleRegister}>
        <label htmlFor="email">Email:</label>
        <input
          className="w-full p-4 mb-4 bg-gray-200 rounded-md"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          className="w-full p-4 mb-4 bg-gray-200 rounded-md"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          className="w-full p-4 mb-4 bg-gray-200 rounded-md"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="bg-green-600 p-2 rounded-sm text-white self-end" type="submit">Register</button>
      </form>
    </div>
  );
};

export { UserRegistrationForm };
