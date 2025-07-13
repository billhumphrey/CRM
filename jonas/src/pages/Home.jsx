import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the CRM System</h1>
      <p className="home-subtitle">Choose an option below to get started:</p>

      <div className="card-grid">
        <Link to="/dashboard/add-housemaid" className="card">
          ➕ Add House Maid
        </Link>

        <Link to="/dashboard/housemaids" className="card">
          📋 House Maid List
        </Link>

        <Link to="/dashboard/add-client" className="card">
          ➕ Add Client
        </Link>

        <Link to="/dashboard/clients" className="card">
          👥 Client List
        </Link>
      </div>
    </div>
  );
};

export default Home;
