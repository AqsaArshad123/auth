import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = (credentials) => API.post("/auth/login", credentials);
export const signup = (data) => API.post("/auth/signup", data);
export const getMe = () => API.get("/auth/me");
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const resetPassword = (data) => API.put("/auth/reset-password", data);

export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);