import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { prompt as travelSchema } from "./prompt";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5555;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get('/health', (req, res) =>(
	res.json({status : 'ok', message: 'back okey'})
));

export async function getTravelRecommendations(ai: GoogleGenAI, prompt: string) {
  const model = "gemini-2.5-flash";

  const res = await ai.models.generateContent({
    model,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
              Dame recomendaciones de viaje según esta descripción:
              "${prompt}"

              IMPORTANTE:
              - Devuelve exactamente 4 sitios.
              - Cada sitio debe incluir: nombre, bandera emoji, descripción corta y coordenadas reales.
              - RESPONDE SOLO CON JSON.
            `
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: travelSchema
    }
  });

  const text = res.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const json = JSON.parse(text);
  return json;
}

app.post('/message', async (req, res) => {
    const { message } = req.body;

    console.log("Datos recibidos:", req.body);
    try {
        const travelData = await getTravelRecommendations(ai, message);
        res.json({
            sender: "backend",
            message: "response_travel_recommendations",
            data: travelData
        });
    } catch (err) {
        console.error("ERROR en getTravelRecommendations:", err);
        res.status(500).json({
            error: "Error generando recomendaciones",
            details: err
        });
    }
});



app.listen(PORT, () => {
	console.log("port: " + PORT);
});