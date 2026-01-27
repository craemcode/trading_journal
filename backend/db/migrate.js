import db from "./db.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
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
    entry_screenshot TEXT,
    exit_screenshot TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

console.log("Database initialized");
