import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Reset() {
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    // Basic validations
    if (newUsername.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      setMessage("");
      return;
    }

    if (newPassword.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      setMessage("");
      return;
    }

    // Simulate saving new credentials (in real app, you'd call an API)
    localStorage.setItem("username", newUsername);
    localStorage.setItem("password", newPassword);

    setError("");
    setMessage("Account reset successful. You can now log in.");
    setTimeout(() => navigate("/"), 2000); // Redirect to login after 2s
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Reset Your Account</h2>
          <p className="login-subtitle">Enter your new credentials below</p>
        </div>

        {message && <p className="login-success">{message}</p>}
        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleReset} className="login-form">
          <div className="login-form-group">
            <label htmlFor="newUsername" className="login-label">New Username</label>
            <input
              id="newUsername"
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="login-input"
              placeholder="Enter new username"
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="newPassword" className="login-label">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="login-input"
              placeholder="Enter new password"
              required
            />
          </div>

          <button type="submit" className="login-button">Reset Account</button>
        </form>

        <div className="reset-link-wrapper">
          <span onClick={() => navigate("/")} className="reset-link">
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
}
