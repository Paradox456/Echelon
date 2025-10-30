import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { generateResponse } from "./aiService.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;
    const output = await generateResponse(prompt);
    res.json({ output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));