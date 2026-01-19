import Database from "better-sqlite3";

const db = new Database("db/journal.db");

// Enable foreign keys
db.pragma("foreign_keys = ON");

export default db;
