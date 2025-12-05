import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5555;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get('/health', (req, res) =>(
	res.json({status : 'ok', message: 'back okey'})
));

app.post('/message', async (req, res) => {
    const {sender, message} = req.body;

    console.log("Datos recibidos:", req.body);
    
    const aiRespons = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
    });

    console.log(aiRespons);
    let respon = aiRespons.text;
    res.json({
        sender: "backend",
        message: respon,
        data: req.body
    });

});


app.listen(PORT, () => {
	console.log("port: " + PORT);
});