import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { login, register } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mode, saveUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userData = { email };
      if (mode === "db" && e.nativeEvent.submitter.name === "register") {
        // DB register
        const res = await register(name, email, password);
        alert(res.message);
        return;
      }

      // login
      await login(mode, email, password);
      if (mode === "simple") userData.name = "admin";
      if (mode === "db") userData.name = name || email; // DB login should fetch real name
      saveUser(userData);
      navigate("/welcome");
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        {mode === "simple" ? "Simple Login" : "DB Login"}
      </h1>
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        {mode === "db" && (
          <InputField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        )}
        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex gap-4">
          <button
            type="submit"
            name="login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          {mode === "db" && (
            <button
              type="submit"
              name="register"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
