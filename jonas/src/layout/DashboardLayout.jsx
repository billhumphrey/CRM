import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside className="sidebar">
        <h1>CRM Dashboard</h1>
        <nav>
          <NavLink to="/add-housemaid" className={({ isActive }) => (isActive ? "active" : "")}>
            ➕ Add House Maid
          </NavLink>
          <NavLink to="/housemaids" className={({ isActive }) => (isActive ? "active" : "")}>
            📋 House Maid List
          </NavLink>
          <NavLink to="/add-client" className={({ isActive }) => (isActive ? "active" : "")}>
            ➕ Add Client
          </NavLink>
          <NavLink to="/clients" className={({ isActive }) => (isActive ? "active" : "")}>
            👥 Client List
          </NavLink>
        </nav>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
