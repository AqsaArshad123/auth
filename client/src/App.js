import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.js";
import ProductPage from "./pages/ProductDetail.js";
import ManageProductsPage from "./pages/ManageProducts.js";
import ProfilePage from "./pages/Profile.js";
import AuthPages from "./pages/Auth.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPages.Login />} />
        <Route path="/signup" element={<AuthPages.Signup />} />
        <Route path="/forgot-password" element={<AuthPages.ForgotPassword />} />
        <Route path="/reset-password" element={<AuthPages.ResetPassword />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product-details" element={<ProductPage />} />
        <Route path="/manage-products" element={<ManageProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

