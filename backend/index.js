import express from "express";
import cors from "cors";
import dotenv from "dotenv"

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
