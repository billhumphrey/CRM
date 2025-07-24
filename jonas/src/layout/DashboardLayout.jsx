// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const navLinks = (
    <>
      <NavLink to="./dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
        Dashboard
      </NavLink>
      <NavLink to="./clients" className={({ isActive }) => (isActive ? "active" : "")}>
        Client List
      </NavLink>
      <NavLink to="./add-client" className={({ isActive }) => (isActive ? "active" : "")}>
        Add Client
      </NavLink>
      <NavLink to="./housemaids" className={({ isActive }) => (isActive ? "active" : "")}>
        House Maid List
      </NavLink>
      <NavLink to="./add-housemaid" className={({ isActive }) => (isActive ? "active" : "")}>
        Add House Maid
      </NavLink>
    </>
  );

  return (
    <div className="layout-container" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Inline Sidebar Styles */}
      <style>{`
        .sidebar {
          width: 250px;
          transition: width 0.3s ease;
          background-color: #1f2937;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1rem;
        }

        .sidebar.collapsed {
          width: 60px;
        }

        .sidebar.collapsed h1 {
          display: none;
        }

        .sidebar nav a {
          display: block;
          padding: 0.5rem 0;
          color: white;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar nav a.active {
          font-weight: bold;
        }

        .sidebar.collapsed nav a {
          font-size: 0;
        }

        .sidebar.collapsed nav a::before {
          content: "•";
          font-size: 16px;
          margin-right: 8px;
        }

        .main {
          flex: 1;
          padding: 1rem;
          overflow: auto;
        }

        .hamburger {
          display: none;
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .hamburger {
            display: block;
            position: absolute;
            top: 1rem;
            left: 1rem;
          }

          .mobile-drawer {
            position: fixed;
            top: 0;
            left: 0;
            width: 250px;
            height: 100vh;
            background-color: #1f2937;
            color: white;
            z-index: 1000;
            transition: transform 0.3s ease;
            padding: 1rem;
          }

          .mobile-drawer.closed {
            transform: translateX(-100%);
          }

          .mobile-drawer.open {
            transform: translateX(0);
          }

          .drawer-content {
            padding: 1rem 0;
          }
        }

        .logout-button {
          margin-top: 1rem;
          padding: 0.5rem;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>

      {/* Desktop Sidebar */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div>
          <h1>CRM Dashboard</h1>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Toggle Sidebar"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              marginBottom: "1rem",
              color: "white",
            }}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
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
