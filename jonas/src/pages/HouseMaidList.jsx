import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaSearch } from "react-icons/fa";
import "../styles/list.css";
// import { query, orderBy } from "firebase/firestore";


const HouseMaidList = () => {
  const [maids, setMaids] = useState([]);
  const [filteredMaids, setFilteredMaids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [editingMaidId, setEditingMaidId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleSaveEdit = async (id) => {
    try {
      const maidRef = doc(db, "maid", id);
      await updateDoc(maidRef, editData);

      setMaids((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...editData } : m))
      );

      setEditingMaidId(null);
    } catch (err) {
      console.error("Failed to update maid:", err);
      alert("Failed to update maid: " + err.message);
    }
  };




  useEffect(() => {
    const fetchMaids = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "maid"));
        const maidArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaids(maidArray);
        setFilteredMaids(maidArray);
      } catch (err) {
        console.error("Error fetching housemaids:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaids();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = maids.filter((maid) =>
      (
        `${maid.name} ${maid.lastName}`.toLowerCase().includes(term) ||
        (maid.contact && maid.contact.toLowerCase().includes(term)) ||
        (maid.passport && maid.passport.toLowerCase().includes(term)) ||
        (maid.kinName && maid.kinName.toLowerCase().includes(term))
      )
    );
    setFilteredMaids(filtered);
  }, [searchTerm, maids]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this maid?")) return;
    try {
      await deleteDoc(doc(db, "maid", id));
      setMaids((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Failed to delete maid:", err);
      alert("Failed to delete maid.");

    }
  };



  const tableHeaders = [
    "No.",
    "Name", "DOB", "Age", "Contact", "Passport", "PCC", "Training", "Office",
    "Exit", "Travel", "Travel Date", "Medical", "Payment",
    "Kin Name 1", "Kin 1 Contact", "Kin Name 2 ", "Kin 2 Contanct", "Kin Name 3 ", "Kin 3 Contanct", "Comments", "Actions"
  ];

  return (
    <div className="client-list-container">
      <h2 className="client-list-title">House Maid List</h2>

      <div className="search-toggle">
        <FaSearch
          className="search-icon"
          onClick={() => setShowSearch(!showSearch)}
          title="Toggle Search"
        />
        {showSearch && (
          <input
            type="text"
            placeholder="Search by name, contact, passport, kin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        )}
      </div>

      {loading ? (
        <p>Loading house maids…</p>
      ) : filteredMaids.length === 0 ? (
        <p>No matching house maids found.</p>
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
              {filteredMaids.map((maid, index) => {
                const term = searchTerm.toLowerCase();
                const isMatch =
                  term &&
                  (
                    `${maid.name} ${maid.lastName}`.toLowerCase().includes(term) ||
                    (maid.contact && maid.contact.toLowerCase().includes(term)) ||
                    (maid.passport && maid.passport.toLowerCase().includes(term)) ||
                    (maid.kinName && maid.kinName.toLowerCase().includes(term))
                  );

    // Normalize values
                const travel = maid.travel?.toLowerCase();
                const payment = maid.payment?.toLowerCase();

                const paid = payment === "paid";
                const travelled = travel === "yes" || travel === "travelled" || travel === "ready";

                let rowClass = "";
                if (!paid && travelled) {
                  rowClass = "red-row"; // Unpaid + Travel-Yes
                } else if (paid && !travelled) {
                  rowClass = "yellow-row"; // Paid + Travel-No
                } else if (paid && travelled) {
                  rowClass = "green-row"; // Paid + Travel-Yes
                } else if (!paid && !travelled) {
                  rowClass = "white-row"; // Unpaid + Travel-No
                }

                const highlightClass = searchTerm && isMatch ? "highlighted-row" : "";
                return (
                  <tr key={maid.id} className={`${highlightClass} ${rowClass}`}>
                    {/* No. column */}
                    <td>{index + 1}</td>

                    {/* Name */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <>
                          <input
                            value={editData.name || ""}
                            onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="First Name"
                          />
                          <input
                            value={editData.lastName || ""}
                            onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                            placeholder="Last Name"
                          />
                        </>
                      ) : (
                        <>
                          {maid.name || "—"} {maid.lastName || ""}
                        </>
                      )}
                    </td>

                    {/* DOB */}
<td>
  {editingMaidId === maid.id ? (
    <input
      type="date"
      value={editData.dob || ""}
      onChange={(e) => setEditData(prev => ({ ...prev, dob: e.target.value }))}
    />
  ) : (
    maid.dob || "—"
  )}
</td>

{/* Age */}
<td>
  {editingMaidId === maid.id ? (
    <input
      type="number"
      value={editData.age || ""}
      onChange={(e) => setEditData(prev => ({ ...prev, age: e.target.value }))}
    />
  ) : (
    maid.age || "—"
  )}
</td>


                    {/* Contact */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.contact || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, contact: e.target.value }))}
                        />
                      ) : (
                        maid.contact || "—"
                      )}
                    </td>

                    {/* Passport */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.passport || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, passport: e.target.value }))}
                        />
                      ) : (
                        maid.passport || "—"
                      )}
                    </td>

                    {/* PCC */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.pcc || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, pcc: e.target.value }))}
                        />
                      ) : (
                        maid.pcc || "—"
                      )}
                    </td>

                    {/* Training */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.training || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, training: e.target.value }))}
                        />
                      ) : (
                        maid.training || "—"
                      )}
                    </td>

                    {/* Office */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.office || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, office: e.target.value }))}
                        />
                      ) : (
                        maid.office || "—"
                      )}
                    </td>

                    {/* Exit */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.exit || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, exit: e.target.value }))}
                        />
                      ) : (
                        maid.exit || "—"
                      )}
                    </td>

                    {/* Travel */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <select
                          value={editData.travel || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, travel: e.target.value }))}
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : (
                        maid.travel || "—"
                      )}
                    </td>

                    {/* Travel Date */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.travelDate || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, travelDate: e.target.value }))}
                        />
                      ) : (
                        maid.travelDate || "—"
                      )}
                    </td>

                    {/* Medical */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.medical || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, medical: e.target.value }))}
                        />
                      ) : (
                        maid.medical || "—"
                      )}
                    </td>

                    {/* Payment */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <select
                          value={editData.payment || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, payment: e.target.value }))}
                        >
                          <option value="">Select</option>
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                      ) : (
                        maid.payment || "—"
                      )}
                    </td>

                    {/* Kin Name 1 */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.kinName || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, kinName: e.target.value }))}
                        />
                      ) : (
                        maid.kinName || "—"
                      )}
                    </td>

                    {/* Kin Contact 1 */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.kinContact1 || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, kinContact1: e.target.value }))}
                        />
                      ) : (
                        maid.kinContact1 || "—"
                      )}
                    </td>

                    {/* Kin Name 2 */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.kinName2 || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, kinName2: e.target.value }))}
                        />
                      ) : (
                        maid.kinName2 || "—"
                      )}
                    </td>



                    {/* Kin Contact 2 */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.kinContact2 || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, kinContact2: e.target.value }))}
                        />
                      ) : (
                        maid.kinContact2 || "—"
                      )}
                    </td>

                    {/* Kin Name 3 */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.kinName3 || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, kinName3: e.target.value }))}
                        />
                      ) : (
                        maid.kinName3 || "—"
                      )}
                    </td>



                    {/* Kin Contact 3 */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.kinContact3 || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, kinContact3: e.target.value }))}
                        />
                      ) : (
                        maid.kinContact3 || "—"
                      )}
                    </td>


                    {/* Comments */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <input
                          value={editData.comments || ""}
                          onChange={(e) => setEditData((prev) => ({ ...prev, comments: e.target.value }))}
                        />
                      ) : (
                        maid.comments || "—"
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      {editingMaidId === maid.id ? (
                        <>
                          <button
                            className="save-btn"
                            onClick={() => handleSaveEdit(maid.id)}
                            style={{ color: "blue", background: "none", border: "none", cursor: "pointer", marginRight: "0.5rem" }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingMaidId(null);
                              setEditData({});
                            }}
                            style={{ color: "gray", background: "none", border: "none", cursor: "pointer" }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(maid.id)}
                            style={{ marginBottom: "0.25rem" }}
                          >
                            Delete
                          </button>
                          <br />
                          <button
                            className="edit-btn"
                            onClick={() => {
                              setEditingMaidId(maid.id);
                              setEditData(maid);
                            }}
                            style={{ color: "green", background: "none", border: "none", cursor: "pointer" }}
                          >
                            Edit
                          </button>
                        </>
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

export default HouseMaidList;
