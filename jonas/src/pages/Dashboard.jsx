import React from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import MaidIcon from "../assets/130212.png";
import AddIcon from "../assets/107827.png";
import ClientIcon from "../assets/121169.png";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Welcome to the CRM Dashboard</h2>
      </div>

      <div className="card-grid">
        <Link to="../add-housemaid" className="card">
          <img src={AddIcon} alt="Add House Maid Icon" className="card-icon" />
          Add House Maid
        </Link>

        <Link to="../housemaids" className="card">
          <img src={MaidIcon} alt="House Maid Icon" className="card-icon" />
          House Maid List
        </Link>

        <Link to="../add-client" className="card">
          <img src={AddIcon} alt="Add Client Icon" className="card-icon" />
          Add Client
        </Link>

        <Link to="../clients" className="card">
          <img src={ClientIcon} alt="Client Icon" className="card-icon" />
          Client List
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
