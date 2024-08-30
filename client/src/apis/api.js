import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

//Authentication
export const login = (credentials) => API.post("/auth/login", credentials);
export const signup = (data) => API.post("/auth/signup", data);
export const getMe = () => {
  const token = localStorage.getItem("token");
  return API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const resetPassword = (data) => API.put("/auth/reset-password", data);

//Products
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => {
  const token = localStorage.getItem("token");
  return API.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProduct = (id, data) => {
  const token = localStorage.getItem("token");
  return API.put(`/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = (id) => {
  const token = localStorage.getItem("token");
  return API.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Cart 
export const createCart = () => {
  const token = localStorage.getItem("token");
  return API.post("/cart", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getCart = () => {
  const token = localStorage.getItem("token");
  return API.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const addToCart = (productId) => {
  const token = localStorage.getItem("token");
  return API.post(`/cart/add`, { productId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const removeFromCart = (productId) => {
  const token = localStorage.getItem("token");
  return API.post(`/cart/remove`, { productId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};