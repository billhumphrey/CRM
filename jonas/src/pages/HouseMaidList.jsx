import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { FaSearch } from "react-icons/fa";
import "../styles/list.css";

const HouseMaidList = () => {
  const [maids, setMaids] = useState([]);
  const [filteredMaids, setFilteredMaids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

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
    "Name", "Contact", "Passport", "PCC", "Training", "Office", "Exit", "Travel",
    "Medical", "Payment", "Next of Kin", "Relationship", "Kin Contact 1", "Kin Contact 2", "Comments", "Actions"
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
              {filteredMaids.map((maid) => {
                const term = searchTerm.toLowerCase();
                const isMatch =
                  term &&
                  (
                    `${maid.name} ${maid.lastName}`.toLowerCase().includes(term) ||
                    (maid.contact && maid.contact.toLowerCase().includes(term)) ||
                    (maid.passport && maid.passport.toLowerCase().includes(term)) ||
                    (maid.kinName && maid.kinName.toLowerCase().includes(term))
                  );

                return (
                  <tr key={maid.id} className={isMatch ? "highlighted-row" : ""}>
                    <td>{maid.name} {maid.lastName}</td>
                    <td>{maid.contact || "-"}</td>
                    <td>{maid.passport || "-"}</td>
                    <td>{maid.pcc || "-"}</td>
                    <td>{maid.training || "-"}</td>
                    <td>{maid.office || "-"}</td>
                    <td>{maid.exit || "-"}</td>
                    <td>{maid.travel || "-"}</td>
                    <td>{maid.medical || "-"}</td>
                    <td>{maid.payment || "-"}</td>
                    <td>{maid.kinName || "-"}</td>
                    <td>{maid.relationship || "-"}</td>
                    <td>{maid.kinContact1 || "-"}</td>
                    <td>{maid.kinContact2 || "-"}</td>
                    <td>{maid.comments || "-"}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(maid.id)}
                      >
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

export default HouseMaidList;
