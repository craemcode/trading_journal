import db from "./db.js";

db.prepare(`
  CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    instrument TEXT NOT NULL,
    direction TEXT CHECK(direction IN ('long', 'short')) NOT NULL, 
    risk_reward REAL NOT NULL,
    risk_amount REAL,
    entry_price REAL NOT NULL,
    exit_price REAL,
    pnl REAL,
    outcome TEXT CHECK(outcome IN ('win', 'open', 'lose')) NOT NULL,
    entry_time TEXT NOT NULL,
    exit_time TEXT,
    strategy TEXT,
    pre_notes TEXT,
    post_notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`).run();

console.log("Database initialized");
