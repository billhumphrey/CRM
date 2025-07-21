// src/pages/HouseMaidList.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/list.css"; // ✅ Link to external stylesheet

const HouseMaidList = () => {
  const [maids, setMaids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaids = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "maid"));
        const maidArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaids(maidArray);
      } catch (err) {
        console.error("Error fetching housemaids:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaids();
  }, []);

  const tableHeaders = [
    "Name", "Contact", "Passport", "PCC", "Training", "Office", "Exit", "Travel",
    "Medical", "Payment", "Next of Kin", "Relationship", "Kin Contact 1", "Kin Contact 2", "Comments"
  ];

  return (
    <div className="client-list-container">
      <h2 className="client-list-title">House Maid List</h2>

      {loading ? (
        <p>Loading house maids…</p>
      ) : maids.length === 0 ? (
        <p>No house maids found.</p>
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
              {maids.map((maid) => (
                <tr key={maid.id}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HouseMaidList;
