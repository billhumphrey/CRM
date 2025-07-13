import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import AddHouseMaid from "../pages/AddHouseMaid";
import HouseMaidList from "../pages/HouseMaidList";
import AddClient from "../pages/AddClient";
import ClientList from "../pages/ClientList";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="add-housemaid" element={<AddHouseMaid />} />
        <Route path="housemaids" element={<HouseMaidList />} />
        <Route path="add-client" element={<AddClient />} />
        <Route path="clients" element={<ClientList />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
