import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to the CRM Dashboard</h2>

      <p className="text-gray-600 mb-6">
        Use the shortcuts below to manage clients and housemaids.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/add-housemaid"
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg shadow-md text-center font-medium transition duration-200"
        >
          Add House Maid
        </Link>
        <Link
          to="/housemaids"
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg shadow-md text-center font-medium transition duration-200"
        >
          House Maid List
        </Link>
        <Link
          to="/add-client"
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg shadow-md text-center font-medium transition duration-200"
        >
          Add Client
        </Link>
        <Link
          to="/clients"
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg shadow-md text-center font-medium transition duration-200"
        >
          Client List
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
