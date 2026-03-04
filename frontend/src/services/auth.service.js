import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const login = async (mode, email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    mode,
    email,
    password,
  });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await axios.post(`${BASE_URL}/register`, {
    mode: "db",
    name,
    email,
    password,
  });
  return response.data;
};
