import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/login.css";

export default function Reset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email.trim().includes("@")) {
      setError("Please enter a valid email address.");
      setMessage("");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("");
      setMessage("Password reset email sent! Check your inbox.");
      setTimeout(() => navigate("/"), 3000); // Redirect after 3s
    } catch (err) {
      console.error(err);
      setMessage("");
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Reset Your Password</h2>
          <p className="login-subtitle">We'll send a reset link to your email</p>
        </div>

        {message && <p className="login-success">{message}</p>}
        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleReset} className="login-form">
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="you@example.com"
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
