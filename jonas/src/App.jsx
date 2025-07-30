import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import AddHouseMaid from "./pages/AddHouseMaid";
import HouseMaidList from "./pages/HouseMaidList";
import AddClient from "./pages/AddClient";
import ClientList from "./pages/ClientList";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import RequireAuth from "./utils/RequireAuth";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/reset" element={<Reset />} />

      {/* Protected routes */}
      <Route
        path="/app"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="home" element={<Home />} />
        <Route path="add-housemaid" element={<AddHouseMaid />} />
        <Route path="housemaids" element={<HouseMaidList />} />
        <Route path="add-client" element={<AddClient />} />
        <Route path="clients" element={<ClientList />} />
        {/* Optional: fallback route */}
        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Route>

      {/* Catch-all route to redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
