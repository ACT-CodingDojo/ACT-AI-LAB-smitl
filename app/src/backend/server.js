import express from "express";
import multer from "multer";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadItalianWines } from "./wineDataset.js";
import { recommendWine } from "./geminiService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, "../frontend");

const app = express();
const upload = multer({ limits: { fileSize: 8 * 1024 * 1024 } });

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please retry shortly."
  }
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api", limiter);
app.use(express.static(frontendDir));

const wineDataset = loadItalianWines();

function toBase64(file) {
  return file ? file.buffer.toString("base64") : null;
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post(
  "/api/recommend",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const imageFile = req.files?.image?.[0] || null;
      const audioFile = req.files?.audio?.[0] || null;
      const contextText = req.body?.contextText || "";

      if (!imageFile) {
        return res.status(400).json({ error: "image is required" });
      }

      const response = await recommendWine({
        imageBase64: toBase64(imageFile),
        audioBase64: toBase64(audioFile),
        contextText,
        dataset: wineDataset,
        apiKey: process.env.GEMINI_API_KEY
      });

      return res.json(response);
    } catch (error) {
      return res.status(500).json({
        error: "recommendation_failed",
        message: error?.message || "Unknown error"
      });
    }
  }
);

app.get("*", (_req, res) => {
  res.sendFile(path.resolve(frontendDir, "index.html"));
});

const port = Number(process.env.PORT || 3000);
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`AiSomellier listening on http://localhost:${port}`);
  });
}

export { app };
