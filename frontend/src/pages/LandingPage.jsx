import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { saveMode, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to welcome page if already logged in
  useEffect(() => {
    if (user) {
      navigate("/welcome", { replace: true });
    }
  }, [user, navigate]);

  const selectMode = (m) => {
    saveMode(m);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-12 text-center">
        Choose Your Login Mode
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div
          onClick={() => selectMode("simple")}
          className="cursor-pointer bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 rounded-2xl shadow-lg p-8 w-72 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-opacity-40"
        >
          <h2 className="text-2xl font-bold text-red-500 mb-3">Simple Mode</h2>
          <p className="text-blue-500">
            Quick login with{" "}
            <span className="font-mono text-blue-500">admin/admin</span>
          </p>
        </div>

        <div
          onClick={() => selectMode("db")}
          className="cursor-pointer bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 rounded-2xl shadow-lg p-8 w-72 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-opacity-40"
        >
          <h2 className="text-2xl font-bold text-red-500 mb-3">DB Auth Mode</h2>
          <p className="text-blue-500 text-opacity-90">
            Login with registered users stored in{" "}
            <span className="font-mono text-blue-500">DB</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
