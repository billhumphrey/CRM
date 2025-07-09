import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl mb-4">CRM Dashboard</h1>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/add-housemaid">Add House Maid</NavLink>
          <NavLink to="/housemaids">House Maid List</NavLink>
          <NavLink to="/add-client">Add Client</NavLink>
          <NavLink to="/clients">Client List</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
