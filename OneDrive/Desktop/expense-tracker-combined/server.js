import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Expense from "./models/Expense.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/expense_tracker";

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("Mongo error:", err.message);
});

app.get("/api/expenses", async (req, res) => {
  const items = await Expense.find().sort({ createdAt: -1 });
  res.json(items);
});

app.post("/api/expenses", async (req, res) => {
  try {
    const { description, amount } = req.body;
    if (!description || typeof amount !== "number") {
      return res.status(400).json({ error: "description and amount are required" });
    }
    const saved = await Expense.create({ description, amount });
    res.status(201).json(saved);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));
app.get("*", (_, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Combined app running at http://localhost:${PORT}`));
