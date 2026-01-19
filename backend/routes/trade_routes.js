import express from "express";
import db from "../db/database.js";

const router = express.Router();

router.post("/", (req, res) => {
  const {
    instrument,
    direction,
    entry_price,
    quantity,
    entry_time
  } = req.body;

  const stmt = db.prepare(`
    INSERT INTO trades
    (instrument, direction, entry_price, quantity, entry_time)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    instrument,
    direction,
    entry_price,
    quantity,
    entry_time
  );

  res.status(201).json({ id: result.lastInsertRowid });
});

router.get("/", (req, res) => {
  const trades = db.prepare(`
    SELECT * FROM trades ORDER BY entry_time DESC
  `).all();

  res.json(trades);
});

export default router;
