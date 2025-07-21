// src/pages/HouseMaidList.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 

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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">House Maid List</h2>

      {loading ? (
        <p>Loading house maids…</p>
      ) : maids.length === 0 ? (
        <p>No house maids found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Passport</th>
              <th className="border px-4 py-2">Training</th>
              <th className="border px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {maids.map((maid) => (
              <tr key={maid.id}>
                <td className="border px-4 py-2">{maid.name} {maid.lastName}</td>
                <td className="border px-4 py-2">{maid.passport || "-"}</td>
                <td className="border px-4 py-2">{maid.training || "-"}</td>
                <td className="border px-4 py-2">{maid.contact || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HouseMaidList;
