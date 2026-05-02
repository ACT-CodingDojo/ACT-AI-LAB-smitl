import { GoogleGenAI } from "@google/genai";
import { buildResponse } from "./schema.js";
import { validateRecommendationNamesAreItalian } from "./wineDataset.js";

function decodeBase64(data) {
  if (!data) {
    return null;
  }

  const cleaned = data.includes(",") ? data.split(",").pop() : data;
  return Buffer.from(cleaned, "base64");
}

function mockRecommendations(dataset, contextText) {
  const keywords = (contextText || "").toLowerCase();

  let picks;
  if (keywords.includes("pesce")) {
    picks = ["Vermentino di Gallura DOCG", "Falanghina del Sannio DOC", "Pinot Grigio delle Venezie DOC"];
  } else if (keywords.includes("carne")) {
    picks = ["Chianti Classico DOCG", "Montepulciano d'Abruzzo DOC", "Primitivo di Manduria DOC"];
  } else if (keywords.includes("dessert") || keywords.includes("dolce")) {
    picks = ["Moscato d'Asti DOCG", "Passito di Pantelleria DOC", "Franciacorta DOCG"];
  } else {
    picks = ["Soave Classico DOC", "Roero Arneis DOCG", "Verdicchio dei Castelli di Jesi DOC"];
  }

  return buildResponse([
    { name: picks[0], reason: "Abbinamento principale in base al contesto fornito.", confidencePercent: 82 },
    { name: picks[1], reason: "Alternativa coerente con il pasto identificato.", confidencePercent: 75 },
    { name: picks[2], reason: "Alternativa meno certa ma plausibile.", confidencePercent: 66 }
  ]);
}

export async function transcribeAudio({ audioBase64, apiKey }) {
  const audioBuffer = decodeBase64(audioBase64);
  if (!audioBuffer) {
    return null;
  }

  if (!apiKey || process.env.MOCK_RECOMMENDER === "true") {
    return "Trascrizione non disponibile in modalita mock.";
  }

  const client = new GoogleGenAI({ apiKey });

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          { text: "Trascrivi in italiano questo audio in una singola frase." },
          {
            inlineData: {
              mimeType: "audio/webm",
              data: audioBuffer.toString("base64")
            }
          }
        ]
      }
    ]
  });

  return response.text || null;
}

export async function recommendWine({ imageBase64, contextText, audioBase64, dataset, apiKey }) {
  const imageBuffer = decodeBase64(imageBase64);
  const transcription = await transcribeAudio({ audioBase64, apiKey });
  const fullContext = [contextText, transcription].filter(Boolean).join("\n");

  if (process.env.MOCK_RECOMMENDER === "true" || !apiKey) {
    return mockRecommendations(dataset, fullContext);
  }

  if (!imageBuffer) {
    throw new Error("Missing required image input.");
  }

  const client = new GoogleGenAI({ apiKey });
  const allowedNames = dataset.map((w) => w.name);

  const prompt = [
    "Sei AiSomellier.",
    "Scegli ESATTAMENTE 3 vini italiani dal catalogo consentito.",
    "Rispondi SOLO in JSON con questa struttura:",
    '{"results":[{"name":"...","reason":"...","confidencePercent":0}]}',
    "confidencePercent deve essere un numero intero 0-100.",
    "Se incertezza elevata usa valori sotto 70.",
    "Catalogo consentito:",
    ...allowedNames.map((name) => `- ${name}`),
    "Contesto testuale utente:",
    fullContext || "(nessun testo aggiuntivo)"
  ].join("\n");

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBuffer.toString("base64")
            }
          }
        ]
      }
    ]
  });

  const text = response.text || "{}";
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  const jsonCandidate = start >= 0 && end > start ? text.slice(start, end + 1) : "{}";
  const parsed = JSON.parse(jsonCandidate);
  const results = Array.isArray(parsed.results) ? parsed.results : [];

  const finalResponse = buildResponse(results);
  const italianOnly = validateRecommendationNamesAreItalian(
    [finalResponse.topPick, ...finalResponse.alternatives],
    dataset
  );

  if (!italianOnly) {
    throw new Error("Model returned wines outside the Italian dataset.");
  }

  return finalResponse;
}
