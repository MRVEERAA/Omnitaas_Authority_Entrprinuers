import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {},
  );

  const saveMode = (selectedMode) => {
    setMode(selectedMode);
    localStorage.setItem("mode", selectedMode);
  };

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ mode, saveMode, user, saveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
