import axios from "axios";

const BASE_URL = "https://omnitaas-login-app.onrender.com";

// Login (both modes)
export const login = async (mode, username, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    mode,
    username,
    password,
  });
  return response.data;
};

// Register (DB mode only)
export const register = async (name, username, email, password) => {
  const response = await axios.post(`${BASE_URL}/register`, {
    mode: "db",
    name,
    username,
    email,
    password,
  });
  return response.data;
};
