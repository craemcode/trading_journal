import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import db from "../db/db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);

  const hash = await bcrypt.hash(password, 12);

  try {
    db.prepare(`
      INSERT INTO users (id, username, password_hash)
      VALUES (?, ?, ?)
    `).run(randomUUID(), username, hash);

    res.sendStatus(201);
  } catch {
    res.status(409).json({ msg: "Username already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (!user) return res.sendStatus(401);

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.sendStatus(401);

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

export default router;
