import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load from localStorage if exists
  const [mode, setMode] = useState(localStorage.getItem("mode") || ""); // simple / db
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  ); // logged-in user info
  const [token, setToken] = useState(localStorage.getItem("token") || null); // DB auth JWT

  // Save mode in state + localStorage
  const saveMode = (m) => {
    setMode(m);
    localStorage.setItem("mode", m);
  };

  // Save user info + optional token in state + localStorage
  const saveUser = (u, t) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
    if (t) {
      setToken(t);
      localStorage.setItem("token", t);
    }
  };

  // Logout clears everything
  const logout = () => {
    setUser(null);
    setToken(null);
    setMode("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("mode");
  };

  return (
    <AuthContext.Provider
      value={{ mode, saveMode, user, token, saveUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
