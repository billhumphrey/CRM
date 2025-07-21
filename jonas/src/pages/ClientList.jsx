import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { FaSearch } from "react-icons/fa";
import "../styles/list.css";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        const clientArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClients(clientArray);
        setFilteredClients(clientArray);
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = clients.filter((client) =>
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(term) ||
      (client.phone && client.phone.toLowerCase().includes(term)) ||
      (client.passport && client.passport.toLowerCase().includes(term))
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await deleteDoc(doc(db, "clients", id));
      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (err) {
      console.error("Failed to delete client:", err);
      alert("Failed to delete client.");
    }
  };

  const tableHeaders = [
    "Name", "DOB", "Age", "Phone", "Phone Number", "Contact 1", "Contact 2",
    "Passport", "PCC", "Field", "Designation", "Registration", "Office",
    "Medical", "Payment", "Travel", "Interview", "Comments", "Actions"
  ];

  return (
    <div className="client-list-container">
      <h2 className="client-list-title">Client List</h2>

      <div className="search-toggle">
        <FaSearch
          className="search-icon"
          title="Toggle Search"
          onClick={() => setShowSearch(!showSearch)}
        />
        {showSearch && (
          <input
            type="text"
            placeholder="Search by name, phone, passport..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        )}
      </div>

      {loading ? (
        <p>Loading clients…</p>
      ) : filteredClients.length === 0 ? (
        <p>No matching clients found.</p>
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
  {filteredClients.map((client) => {
    const term = searchTerm.toLowerCase();
    const isMatch =
      term &&
      (
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(term) ||
        (client.phone && client.phone.toLowerCase().includes(term)) ||
        (client.passport && client.passport.toLowerCase().includes(term))
      );

    // Normalize and compare travel/payment
    const payment = client.payment?.toLowerCase();
    const travel = client.travel?.toLowerCase();

    const paid = payment === "paid";
    const travelled = travel === "yes" || travel === "travelled" || travel === "ready";

    let rowClass = "";
    if (!paid && travelled) {
      rowClass = "yellow-row";
    } else if (paid && travelled) {
      rowClass = "green-row";
    }

    const highlightClass = searchTerm && isMatch ? "highlighted-row" : "";

    return (
      <tr key={client.id} className={`${highlightClass} ${rowClass}`}>
        <td>{client.firstName} {client.lastName}</td>
        <td>{client.dob || "—"}</td>
        <td>{client.age || "—"}</td>
        <td>{client.phone || "—"}</td>
        <td>{client.phoneNumber || "—"}</td>
        <td>{client.contact1 || "—"}</td>
        <td>{client.contact2 || "—"}</td>
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
        <td>
          <button className="delete-btn" onClick={() => handleDelete(client.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default ClientList;
