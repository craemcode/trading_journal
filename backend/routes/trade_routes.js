import express from "express";
import db from "../db/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const {
    instrument,
    direction,
    risk_reward,
    risk_amount,
    entry_price,
    entry_time,
    strategy,
    pre_notes,
  } = req.body;

  // ---------- Validation ----------
  if (
    !instrument ||
    !direction ||
    !risk_reward ||
    !entry_time
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (instrument.length > 15) {
    return res.status(400).json({ message: "Instrument too long" });
  }
  if (entry_price > 1000000) {
    return res.status(400).json({ message: "Asset price cannot be greater than 1 million" });
  }

  if (strategy && strategy.length > 100) {
    return res.status(400).json({ message: "Strategy too long" });
  }

  if (pre_notes && pre_notes.length > 1000) {
    return res.status(400).json({ message: "Pre-trade notes too long" });
  }

  if (!["long", "short"].includes(direction)) {
    return res.status(400).json({ message: "Invalid direction" });
  }

  // Outcome is unknown at entry time
  const outcome = "open"; // placeholder or NULL if you later relax constraint

  try {
    const stmt = db.prepare(`
      INSERT INTO trades (
        instrument,
        direction,
        risk_reward,
        risk_amount,
        entry_price,
        outcome,
        entry_time,
        strategy,
        pre_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      instrument.trim(),
      direction,
      Number(risk_reward),
      risk_amount ? Number(risk_amount) : null,
      Number(entry_price),
      outcome,
      entry_time,
      strategy || null,
      pre_notes || null
    );

    res.status(201).json({ message: "Trade saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

router.get("/", (req, res) => {
  const trades = db.prepare(`
    SELECT * FROM trades ORDER BY entry_time DESC
  `).all();

  res.json(trades);
});

export default router;
