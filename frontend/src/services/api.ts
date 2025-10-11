import axios from "axios";

const API = axios.create({
  // baseURL: "https://medicine-system-1.onrender.com/api",
  baseURL: "http://localhost:4000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
