import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { register } from "../services/auth.service";

const RegisterPage = () => {
  const { mode, saveUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (mode !== "db") navigate("/");
  }, [mode, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !username || !email || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      const res = await register(name, username, email, password);
      alert(res.message);
      saveUser({
        name: res.user.name,
        username: res.user.username,
        email: res.user.email,
      });
      navigate("/welcome", { replace: true });
    } catch (err) {
      setMessage(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-8 text-indigo-600 text-center drop-shadow-lg">
          Create Your Account
        </h1>
        <form
          onSubmit={handleRegister}
          className="bg-white backdrop-blur-md bg-opacity-80 shadow-2xl rounded-xl p-8 flex flex-col gap-5"
        >
          <InputField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
          <InputField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
          <InputField
            label="Email"
            type="email"
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
          {message && (
            <p className="text-red-500 font-medium text-center">{message}</p>
          )}
          <button className="bg-green-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-green-600 hover:scale-105 transition-transform duration-200">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
