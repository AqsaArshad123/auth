import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = (credentials) => API.post("/auth/login", credentials);
export const signup = (data) => API.post("/auth/signup", data);
export const getMe = () => API.get("/auth/me");
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });
export const resetPassword = (data) => API.put("/auth/reset-password", data);
