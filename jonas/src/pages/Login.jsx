import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password123") {
      localStorage.setItem("authToken", "example-token");
      navigate("/app/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Login to Your Account</h2>
          <p className="login-subtitle">Enter your credentials below</p>
        </div>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
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

          <div className="login-form-group">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-button">Sign In</button>
        </form>

        {/* Reset Account link */}
        <div className="reset-link-wrapper">
          <span className="reset-link" onClick={() => navigate("/reset")}>
            Reset Account?
          </span>
        </div>
      </div>
    </div>
  );
}
