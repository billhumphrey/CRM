// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const navLinks = (
    <>
      <NavLink to="./dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
        Dashboard
      </NavLink>
      <NavLink to="./add-housemaid" className={({ isActive }) => (isActive ? "active" : "")}>
        Add House Maid
      </NavLink>
      <NavLink to="./housemaids" className={({ isActive }) => (isActive ? "active" : "")}>
        House Maid List
      </NavLink>
      <NavLink to="./add-client" className={({ isActive }) => (isActive ? "active" : "")}>
        Add Client
      </NavLink>
      <NavLink to="./clients" className={({ isActive }) => (isActive ? "active" : "")}>
        Client List
      </NavLink>
    </>
  );

  return (
    <div className="layout-container">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div>
          <h1>CRM Dashboard</h1>
          <nav>{navLinks}</nav>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </aside>

      {/* Hamburger Button - Mobile Only */}
      <div className="hamburger">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? <X size={28} color="#1f2937" /> : <Menu size={28} color="#1f2937" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? "open" : "closed"}`}>
        <div className="drawer-content">
          <h1>CRM Dashboard</h1>
          <nav onClick={() => setMenuOpen(false)}>{navLinks}</nav>
        </div>
        <button
          onClick={() => {
            setMenuOpen(false);
            handleLogout();
          }}
          className="logout-button"
        >
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
