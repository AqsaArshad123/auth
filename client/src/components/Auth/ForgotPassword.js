import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../apis/api.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ email });
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (error) {
      console.error("Failed to send OTP", error);
      setMessage("Failed to send OTP. Try again!");
    }
  };

  return (
    <form onSubmit={handleSendOtp}>
      <h2>Forget Password</h2>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send OTP</button>
      {message && <p>{message}</p>}
      {otpSent && (
        <button onClick={() => navigate("/reset-password")}>Next</button>
      )}
    </form>
  );
};

export default ForgotPassword;
