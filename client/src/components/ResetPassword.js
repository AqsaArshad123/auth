import React, { useState } from 'react';
import { resetPassword } from '../apis/api.js';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
          await resetPassword({ otp, newPassword });
          navigate('/login');
        } catch (error) {
          console.error('Failed to reset password', error);
        }
    };
    
    return (
        <form onSubmit={handleResetPassword}>
          <h2>Reset Password</h2>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      );
    };
    
    export default ResetPassword;