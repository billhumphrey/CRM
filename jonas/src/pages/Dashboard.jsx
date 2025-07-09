// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to the CRM Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/add-housemaid"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add House Maid
        </Link>
        <Link
          to="/housemaids"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          House Maid List
        </Link>
        <Link
          to="/add-client"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Add Client
        </Link>
        <Link
          to="/clients"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Client List
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
