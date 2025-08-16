import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const PORT = 3009;

app.use(bodyParser.json());

// open db
const dbPromise = open({
  filename: "data.db",
  driver: sqlite3.Database,
});

// create tables if not exist
(async () => {
  const db = await dbPromise;
  await db.exec(`CREATE TABLE IF NOT EXISTS dispense_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dispenser_id TEXT,
    nozzle_id TEXT,
    liters REAL,
    price REAL,
    total REAL,
    amount REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
})();

// API endpoint
app.post("/api/dispense", async (req, res) => {
  try {
    const { dispenser_id, nozzle_id, liters, price, total, amount } = req.body;
    const db = await dbPromise;
    await db.run(
      `INSERT INTO dispense_logs (dispenser_id, nozzle_id, liters, price, total, amount) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [dispenser_id, nozzle_id, liters, price, total, amount]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
