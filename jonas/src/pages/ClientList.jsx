// src/pages/ClientList.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/list.css"; // ✅ External styling

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

  const tableHeaders = [
    "Name", "DOB", "Age", "Email", "Phone", "Phone Number", "Contact 1", "Contact 2",
    "Address", "Passport", "PCC", "Field", "Designation", "Registration", "Office",
    "Medical", "Payment", "Travel", "Interview", "Comments"
  ];

  return (
    <div className="client-list-container">
      <h2 className="client-list-title">Client List</h2>

      {loading ? (
        <p>Loading clients…</p>
      ) : clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="client-table">
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.firstName} {client.lastName}</td>
                  <td>{client.dob || "—"}</td>
                  <td>{client.age || "—"}</td>
                  <td>{client.email || "—"}</td>
                  <td>{client.phone || "—"}</td>
                  <td>{client.phoneNumber || "—"}</td>
                  <td>{client.contact1 || "—"}</td>
                  <td>{client.contact2 || "—"}</td>
                  <td>{client.address || "—"}</td>
                  <td>{client.passport || "—"}</td>
                  <td>{client.pcc || "—"}</td>
                  <td>{client.field || "—"}</td>
                  <td>{client.designation || "—"}</td>
                  <td>{client.registrationStatus || "—"}</td>
                  <td>{client.office || "—"}</td>
                  <td>{client.medical || "—"}</td>
                  <td>{client.payment || "—"}</td>
                  <td>{client.travel || "—"}</td>
                  <td>{client.interview || "—"}</td>
                  <td>{client.comments || "—"}</td>
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
