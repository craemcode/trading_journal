import express from "express";
import db from "../db/db.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";


const router = express.Router();

router.post("/new_trade", authMiddleware, upload.single("entry_screenshot"), (req, res) => {
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

  const entryScreenshot = req.file? req.file.path : null;

  try {
    const stmt = db.prepare(`
      INSERT INTO trades (
        user_id,
        instrument,
        direction,
        risk_reward,
        risk_amount,
        entry_price,
        outcome,
        entry_time,
        strategy,
        pre_notes,
        entry_screenshot
      ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      req.userId,
      instrument.trim(),
      direction,
      Number(risk_reward),
      risk_amount ? Number(risk_amount) : null,
      Number(entry_price),
      outcome,
      entry_time,
      strategy || null,
      pre_notes || null,
      entryScreenshot
    );

    res.status(201).json({ message: "Trade saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sorry, an error occured!" });
  }
});

//get all trades (not yet made)
router.get("/history", authMiddleware, (req, res) => {
  
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const offset = (page - 1) * limit;
  
  
  
  const trades = db.prepare(`
    SELECT * 
    FROM trades 
    WHERE user_id = ?
    AND outcome != 'open'
    ORDER BY entry_time DESC
    LIMIT ? OFFSET ?
  `).all(req.userId,limit, offset);

  const total = db.prepare(`
    SELECT COUNT(*) as count
    FROM trades
    WHERE user_id = ?
    AND outcome != 'open'
  `).get(req.userId).count;



  res.json({
    data: trades,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

//get all trades for calculating stats and drawing equity curve
router.get("/all_history", authMiddleware,(req, res) => {
	  const trades = db.prepare(`
    SELECT * 
    FROM trades 
    WHERE user_id = ?
    AND outcome != 'open'
    ORDER BY entry_time DESC
	`).all(req.userId);

  res.json(trades);
});

//get details for a particular trade.
router.get("/history/:id", authMiddleware, (req,res) =>{
  const {id } = req.params;
  
  const trade = db.prepare(`
    SELECT * 
    FROM trades
    WHERE id = ?`).get(id);
    
    res.json(trade);
})

//get all running trades
router.get("/running", authMiddleware, (req, res) => {
  const trades = db.prepare(`
    SELECT *
    FROM trades
    WHERE user_id = ?
    AND outcome = 'open'
    ORDER BY entry_time DESC
  `).all(req.userId);

  res.json(trades);
});

//close a particular trade
router.post("/:id/close", authMiddleware, upload.single("exit_screenshot"), (req, res) => {
  const { exit_price, pnl, post_notes, exit_time } = req.body;
  const { id } = req.params;
  const exitScreenshot = req.file? req.file.path: null;

  if (exit_price == null || pnl == null) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const outcome = pnl >= 0 ? "win" : "lose";

  const stmt = db.prepare(`
    UPDATE trades
    SET
      exit_time = ?,
      pnl = ?,
      outcome = ?,
      post_notes = ?,
      exit_price = ?,
      exit_screenshot = ?
    WHERE id = ?
  `);

  stmt.run(exit_time, pnl, outcome, post_notes, exit_price, exitScreenshot, id);

  res.json({ success: true });
});




export default router;
