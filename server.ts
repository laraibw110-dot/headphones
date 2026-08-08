import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client server-side
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiConfigured: !!process.env.GEMINI_API_KEY });
});

// AI Fit & Style Concierge Endpoint
app.post("/api/fit-stylist", async (req, res) => {
  try {
    const { headSize, hairType, glasses, dailyStyle, priority } = req.body;

    if (!ai) {
      // Graceful fallback if GEMINI_API_KEY is not configured yet
      return res.json({
        recommendedModel: "AURA One ANC",
        recommendedColor: "Champagne Gold",
        fitTip: "Adjust headband 2 notches for petite head frame. High bun flex hinge relieves crown tension.",
        styleAdvice: "Pair Champagne Gold with warm neutrals like linen blazers, cashmere hoodies, and delicate gold accessories.",
        acousticNote: "Smart 35dB ANC blocks coffee shop chatter and jet engine hum while keeping voice clarity crystal clear.",
        reasoning: "Based on your preferences, the AURA One ANC in Champagne Gold provides optimal clamping balance and effortless aesthetic integration."
      });
    }

    const prompt = `
You are the AI Stylist & Ergonomics Concierge for "AURA Audio", a high-end female-focused headphone brand designed specifically for women's ergonomics, hair compatibility, glasses comfort, and fashion integration.

User Profile:
- Head Size Feeling: ${headSize || "Small / Petite"}
- Hair Style / Hair Type: ${hairType || "High Bun / Curly Volume"}
- Wears Glasses: ${glasses ? "Yes" : "No"}
- Daily Routine & Style: ${dailyStyle || "Smart Casual / Commuter"}
- Top Priority: ${priority || "Comfort & Zero Headaches"}

Provide a personalized recommendation in JSON format with:
1. "recommendedModel": Choose one from ["AURA One ANC", "AURA Studio Lite", "AURA Gem Pods"]
2. "recommendedColor": Choose one from ["Champagne Gold", "Sage Green", "Deep Lavender", "Matte Cream", "Obsidian Pearl"]
3. "fitTip": A 1-2 sentence specific ergonomic fit tip addressing their hair, glasses, or head frame.
4. "styleAdvice": A 1-2 sentence fashion pairing advice (e.g. outfit colors, accessories).
5. "acousticNote": A 1 sentence note on sound profile & ANC for their daily routine.
6. "reasoning": A brief empathetic summary of why this setup was custom matched for them.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedModel: { type: Type.STRING },
            recommendedColor: { type: Type.STRING },
            fitTip: { type: Type.STRING },
            styleAdvice: { type: Type.STRING },
            acousticNote: { type: Type.STRING },
            reasoning: { type: Type.STRING },
          },
          required: [
            "recommendedModel",
            "recommendedColor",
            "fitTip",
            "styleAdvice",
            "acousticNote",
            "reasoning",
          ],
        },
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);
    res.json(data);
  } catch (error: any) {
    console.error("Error in AI Fit Stylist endpoint:", error);
    res.status(500).json({
      error: "Failed to generate AI recommendation",
      fallback: {
        recommendedModel: "AURA One ANC",
        recommendedColor: "Champagne Gold",
        fitTip: "Our flex-hinge headband accommodates buns and glasses with zero pressure points.",
        styleAdvice: "Champagne Gold compliments tailored neutral tones and effortless daily wear.",
        acousticNote: "35dB Active Noise Cancellation tuned for rich vocal acoustics.",
        reasoning: "AURA One ANC is our universally praised ergonomic model for women."
      }
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
