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
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Client List</h2>

      {loading ? (
        <p>Loading clients…</p>
      ) : clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">DOB</th>
                <th className="border px-2 py-1">Age</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Phone</th>
                <th className="border px-2 py-1">Phone Number</th>
                <th className="border px-2 py-1">Contact 1</th>
                <th className="border px-2 py-1">Contact 2</th>
                <th className="border px-2 py-1">Address</th>
                <th className="border px-2 py-1">Passport</th>
                <th className="border px-2 py-1">PCC</th>
                <th className="border px-2 py-1">Field</th>
                <th className="border px-2 py-1">Designation</th>
                <th className="border px-2 py-1">Registration</th>
                <th className="border px-2 py-1">Office</th>
                <th className="border px-2 py-1">Medical</th>
                <th className="border px-2 py-1">Payment</th>
                <th className="border px-2 py-1">Travel</th>
                <th className="border px-2 py-1">Interview</th>
                <th className="border px-2 py-1">Comments</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">
                    {client.firstName} {client.lastName}
                  </td>
                  <td className="border px-2 py-1">{client.dob}</td>
                  <td className="border px-2 py-1">{client.age}</td>
                  <td className="border px-2 py-1">{client.email}</td>
                  <td className="border px-2 py-1">{client.phone}</td>
                  <td className="border px-2 py-1">{client.phoneNumber}</td>
                  <td className="border px-2 py-1">{client.contact1}</td>
                  <td className="border px-2 py-1">{client.contact2}</td>
                  <td className="border px-2 py-1">{client.address}</td>
                  <td className="border px-2 py-1">{client.passport}</td>
                  <td className="border px-2 py-1">{client.pcc}</td>
                  <td className="border px-2 py-1">{client.field}</td>
                  <td className="border px-2 py-1">{client.designation}</td>
                  <td className="border px-2 py-1">{client.registrationStatus}</td>
                  <td className="border px-2 py-1">{client.office}</td>
                  <td className="border px-2 py-1">{client.medical}</td>
                  <td className="border px-2 py-1">{client.payment}</td>
                  <td className="border px-2 py-1">{client.travel}</td>
                  <td className="border px-2 py-1">{client.interview}</td>
                  <td className="border px-2 py-1">{client.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientList;
