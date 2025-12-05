import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5555;


app.get('/health', (req, res) =>(
	res.json({status : 'ok', message: 'back okey'})
));

app.post('/log', (req, res) => {
    const data = req.body;

    console.log("Datos recibidos:", data);
    let respon = data.message + " soy back";
    res.json({
        sender: "backend",
        message: respon,
        data: data
    });
});


app.listen(PORT, () => {
	console.log("port: " + PORT);
});