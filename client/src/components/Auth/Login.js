import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/api.js";

const Login = () => {
  const [email, setEmail] = useState("zunaira@gmail.com");
  const [password, setPassword] = useState("zunairaZ123");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/signup")}>
        Don't have an account? Sign up
      </button>
      <button onClick={() => navigate("/forgot-password")}>
        Forgot password?
      </button>
    </div>
  );
};

export default Login;