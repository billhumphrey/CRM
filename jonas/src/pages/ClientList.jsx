import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { FaSearch } from "react-icons/fa";
import "../styles/list.css";
import { updateDoc } from "firebase/firestore";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);
  const [editData, setEditData] = useState({});


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

  const handleSaveEdit = async (id) => {
  try {
    const clientRef = doc(db, "clients", id);
    await updateDoc(clientRef, editData);
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...editData } : c))
    );
    setEditingClientId(null);
  } catch (err) {
    console.error("Failed to update client:", err);
    alert("Failed to update client.");
  }
};

  const tableHeaders = [
    "Name", "DOB", "Age", "Phone", "Phone Number", "Contact 1", "Contact 2",
    "Passport", "PCC", "Field", "Designation", "Registration", "Office",
    "Medical", "Payment", "Travel","Travel Date", "Interview", "Comments", "Actions"
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
<td>
  {editingClientId === client.id ? (
    <>
      <input
        value={editData.name || ""}
        onChange={(e) =>
          setEditData((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="First Name"
      />{" "}
      <input
        value={editData.lastName || ""}
        onChange={(e) =>
          setEditData((prev) => ({ ...prev, lastName: e.target.value }))
        }
        placeholder="Last Name"
      />
    </>
  ) : (
    <>
      {client.name || "—"} {client.lastName || ""}
    </>
  )}
</td>


 <td>
  {editingClientId === client.id ? (
    <input
      value={editData.dob || ""}
      onChange={(e) =>
        setEditData((prev) => ({ ...prev, dob: e.target.value }))
      }
    />
  ) : (
    client.dob || "—"
  )}
</td>
  <td>
  {editingClientId === client.id ? (
    <input
      value={editData.age || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, age: e.target.value }))}
    />
  ) : (
    client.age || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.phone || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
    />
  ) : (
    client.phone || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.phoneNumber || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
    />
  ) : (
    client.phoneNumber || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.contact1 || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, contact1: e.target.value }))}
    />
  ) : (
    client.contact1 || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.contact2 || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, contact2: e.target.value }))}
    />
  ) : (
    client.contact2 || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.passport || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, passport: e.target.value }))}
    />
  ) : (
    client.passport || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.pcc || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, pcc: e.target.value }))}
    />
  ) : (
    client.pcc || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.field || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, field: e.target.value }))}
    />
  ) : (
    client.field || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.designation || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, designation: e.target.value }))}
    />
  ) : (
    client.designation || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.registrationStatus || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, registrationStatus: e.target.value }))}
    />
  ) : (
    client.registrationStatus || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.office || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, office: e.target.value }))}
    />
  ) : (
    client.office || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <input
      value={editData.medical || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, medical: e.target.value }))}
    />
  ) : (
    client.medical || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <select
      value={editData.payment || ""}
      onChange={(e) =>
        setEditData((prev) => ({ ...prev, payment: e.target.value }))
      }
    >
      <option value="">Select</option>
      <option value="Paid">Paid</option>
      <option value="Unpaid">Unpaid</option>
    </select>
  ) : (
    client.payment || "—"
  )}
</td>


<td>
  {editingClientId === client.id ? (
    <select
      value={editData.travel || ""}
      onChange={(e) =>
        setEditData((prev) => ({ ...prev, travel: e.target.value }))
      }
    >
      <option value="">Select</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  ) : (
    client.travel || "—"
  )}
</td>


<td>
  {editingClientId === client.id ? (
    <input
      value={editData.travelDate || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, travelDate: e.target.value }))}
    />
  ) : (
    client.travelDate || "—"
  )}
</td>

<td>
  {editingClientId === client.id ? (
    <select
      value={editData.interview || ""}
      onChange={(e) =>
        setEditData((prev) => ({ ...prev, interview: e.target.value }))
      }
    >
      <option value="">Select</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  ) : (
    client.interview || "—"
  )}
</td>


<td>
  {editingClientId === client.id ? (
    <input
      value={editData.comments || ""}
      onChange={(e) => setEditData((prev) => ({ ...prev, comments: e.target.value }))}
    />
  ) : (
    client.comments || "—"
  )}
</td>

<td>
  <button className="delete-btn" onClick={() => handleDelete(client.id)}>
    Delete
  </button>
  <br />
  {editingClientId === client.id ? (
    <>
      <button
        className="save-btn"
        style={{ color: "green", marginRight: "8px", cursor: "pointer" }}
        onClick={() => handleSaveEdit(client.id)}
      >
        Save
      </button>
      <button
        className="cancel-btn"
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => setEditingClientId(null)}
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      className="edit-btn"
      onClick={() => {
        setEditingClientId(client.id);
        setEditData(client);
      }}
      style={{ color: "green", background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      Edit
    </button>
  )}
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
