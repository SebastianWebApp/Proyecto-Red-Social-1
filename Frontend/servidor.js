import express, { json } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath, pathToFileURL } from "url";
import router from "./Routers/routers_crear_cuenta.js";


// Permitimos la conexión con el .env
dotenv.config();
const PORT = process.env.PORT;

// Obtenemos la dirección de los elementos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Iniciamos express
const app = express();

//Middlewares
app.use(cors()); // Permite la conexión entre el Front y el Backend
app.use(json()); // Parear JSON en las solicitudes

// Permite mostrar la página web segun la ruta
app.use(express.static(path.join(__dirname)));

app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname,"views","index.html"));
});

app.get("/crear_cuenta", (req,res) =>{
    res.sendFile(path.join(__dirname,"views","crear_cuenta.html"));
});

app.get("/codigo_verificacion", (req,res) =>{
    res.sendFile(path.join(__dirname,"views","codigo_verificacion.html"));
});

app.get("/olvide_password", (req,res) =>{
    res.sendFile(path.join(__dirname,"views","olvide_password.html"));
});


app.use("/api/crear_cuenta",router);


// Middleware para manejar rutas no existentes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html")); // Ruta al archivo 404.html
});

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor Activo http://localhost:${PORT}`);
});



