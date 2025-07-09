// src/pages/HouseMaidList.jsx
import React, { useEffect, useState } from "react";

const HouseMaidList = () => {
  const [maids, setMaids] = useState([]);

  useEffect(() => {
    // Replace with real data fetch or localStorage
    const storedMaids = JSON.parse(localStorage.getItem("maids")) || [];
    setMaids(storedMaids);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">House Maid List</h2>
      {maids.length === 0 ? (
        <p>No house maids found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Experience</th>
              <th className="border px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {maids.map((maid, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{maid.name}</td>
                <td className="border px-4 py-2">{maid.age}</td>
                <td className="border px-4 py-2">{maid.experience} years</td>
                <td className="border px-4 py-2">{maid.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HouseMaidList;
