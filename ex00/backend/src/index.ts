import { ok } from "assert";
import dotenv from "dotenv";
import express from "express";
import { url } from "inspector";

dotenv.config();
const app = express();


const PORT = process.env.PORT || 5555;


app.get('/health', (req, res) =>(
	res.json({status : 'ok', message: 'back okey'})
));

app.listen(PORT, () => {
	console.log("port: " + PORT);
});