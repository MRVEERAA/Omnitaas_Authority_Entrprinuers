import React from "react";
import { useNavigate } from "react-router-dom";
import ModeCard from "../components/ModeCard";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { saveMode } = useAuth();

  const handleSelect = (selectedMode) => {
    saveMode(selectedMode);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-4xl font-bold">Select Login Mode</h1>
      <div className="flex gap-6">
        <ModeCard
          title="Simple Mode"
          description="Login with preset admin credentials"
          onClick={() => handleSelect("simple")}
        />
        <ModeCard
          title="DB Auth Mode"
          description="Login with registered users in database"
          onClick={() => handleSelect("db")}
        />
      </div>
    </div>
  );
};

export default LandingPage;
