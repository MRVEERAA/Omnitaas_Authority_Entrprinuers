import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const WelcomePage = () => {
  const { user, mode, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md text-center">
          Welcome, {user?.name}!
        </h1>
        <p className="text-lg font-medium text-gray-600">
          {mode === "simple"
            ? "You are in Simple Mode"
            : "You are in DB Auth Mode"}
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-red-600 hover:scale-105 transition-transform duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
