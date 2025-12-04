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
    const datos = req.body;

    console.log("Datos recibidos:", datos);
    let respon = datos.message + " soy back";
    res.json({
        status: 'ok',
        message: respon,
        data: datos
    });
});


app.listen(PORT, () => {
	console.log("port: " + PORT);
});