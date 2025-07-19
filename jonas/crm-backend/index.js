const express = require("express");
const sqlite3 = require("sqlite3").verbose(); // ✅ this was missing!
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite DB
const dbPath = path.join(__dirname, "db.sqlite3");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("❌ Error opening DB:", err.message);
  else console.log("✅ Connected to SQLite database");
});

// GET all clients
app.get("/clients", (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST new client
app.post("/clients", (req, res) => {
  const data = req.body;
  const query = `
    INSERT INTO clients (
      firstName, lastName, dob, age, email, phone, phoneNumber,
      contact1, contact2, address, passport, pcc, field, designation,
      registrationStatus, office, medical, payment, travel, interview, comments
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.firstName, data.lastName, data.dob, data.age, data.email, data.phone, data.phoneNumber,
    data.contact1, data.contact2, data.address, data.passport, data.pcc, data.field, data.designation,
    data.registrationStatus, data.office, data.medical, data.payment, data.travel, data.interview, data.comments
  ];

  db.run(query, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
