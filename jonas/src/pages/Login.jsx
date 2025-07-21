import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      localStorage.setItem("authToken", token);
      navigate("/app/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
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
            <label htmlFor="email" className="login-label">Email</label>
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

        <div className="reset-link-wrapper">
          <span className="reset-link" onClick={() => navigate("/reset")}>
            Reset Account?
          </span>
        </div>
      </div>
    </div>
  );
}
