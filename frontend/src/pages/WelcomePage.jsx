import React from "react";
import { useAuth } from "../context/AuthContext";

const WelcomePage = () => {
  const { mode, user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">
        {mode === "simple"
          ? `Welcome, ${user.name || "admin"}`
          : `Welcome, ${user.name || "User"}`}
      </h1>
    </div>
  );
};

export default WelcomePage;
