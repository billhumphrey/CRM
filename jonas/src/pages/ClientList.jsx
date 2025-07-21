// src/pages/ClientList.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        const clientArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClients(clientArray);
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Client List</h2>

      {loading ? (
        <p>Loading clients…</p>
      ) : clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="border px-4 py-2">
                  {client.firstName} {client.lastName}
                </td>
                <td className="border px-4 py-2">{client.email}</td>
                <td className="border px-4 py-2">{client.phone}</td>
                <td className="border px-4 py-2">{client.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientList;
