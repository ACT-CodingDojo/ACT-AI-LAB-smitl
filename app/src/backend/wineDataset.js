import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const datasetPath = path.resolve(__dirname, "../../data/italian-wines.json");

export function loadItalianWines() {
  const raw = fs.readFileSync(datasetPath, "utf8");
  const data = JSON.parse(raw);

  if (!Array.isArray(data) || data.length < 3) {
    throw new Error("Invalid wine dataset: expected at least 3 entries.");
  }

  for (const entry of data) {
    if (!entry.name || !entry.source || entry.source !== "MASAF") {
      throw new Error("Invalid wine dataset entry: missing required MASAF fields.");
    }
  }

  return data;
}

export function validateRecommendationNamesAreItalian(results, dataset) {
  const allowed = new Set(dataset.map((d) => d.name));
  return results.every((item) => allowed.has(item.name));
}
