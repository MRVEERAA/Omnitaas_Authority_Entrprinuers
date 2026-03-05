import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/auth.service";

const LoginPage = () => {
  const { mode, user, saveUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate("/welcome", { replace: true });
    if (!mode) navigate("/"); // if no mode selected
  }, [user, mode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    try {
      if (mode === "simple") {
        if (username !== "admin") {
          setError("User not found");
          return;
        }

        if (password !== "admin") {
          setError("Incorrect password");
          return;
        }

        // Login success
        saveUser({ name: "admin" });
        navigate("/welcome", { replace: true });
      }

      if (mode === "db") {
        const res = await login(mode, username, password);
        saveUser(
          {
            name: res.user.name,
            username: res.user.username,
            email: res.user.email,
          },
          res.token,
        );
        navigate("/welcome", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  const goRegister = () => navigate("/register");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-8 text-indigo-600 text-center drop-shadow-lg">
          {mode === "simple" ? "Simple Login" : "DB Login"}
        </h1>
        <form
          onSubmit={handleLogin}
          className="bg-white backdrop-blur-md bg-opacity-80 shadow-2xl rounded-xl p-8 flex flex-col gap-5"
        >
          <InputField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          {error && (
            <p className="text-red-500 font-medium text-sm text-center">
              {error}
            </p>
          )}
          <button className="bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-indigo-700 hover:scale-105 transition-transform duration-200">
            Login
          </button>
          {mode === "db" && (
            <p
              className="text-indigo-500 text-center cursor-pointer mt-2 hover:underline hover:text-indigo-700 transition-colors"
              onClick={goRegister}
            >
              Create account
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
