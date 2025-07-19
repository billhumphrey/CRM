import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Reset() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    if (username.trim().length < 3) {
      setError("Please enter a valid username.");
      setMessage("");
      return;
    }

    // Simulate reset success
    setError("");
    setMessage(`A reset link has been sent for user "${username}".`);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Reset Your Account</h2>
          <p className="login-subtitle">Enter your username to receive a reset link</p>
        </div>

        {message && <p className="login-success">{message}</p>}
        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleReset} className="login-form">
          <div className="login-form-group">
            <label htmlFor="username" className="login-label">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              placeholder="Enter your username"
              required
            />
          </div>

          <button type="submit" className="login-button">Send Reset Link</button>
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
