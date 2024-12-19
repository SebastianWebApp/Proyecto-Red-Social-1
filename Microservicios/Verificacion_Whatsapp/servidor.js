import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const PORT = process.env.PORT;
const CORS_ORIGEN = process.env.CORS_ORIGEN;
const app = express();

app.use(cors({
  origin: CORS_ORIGEN,
  methods: ["POST"]
}));

app.use(json());

// Ruta para enviar un mensaje
app.post("/api/Codigo_Verificacion", async (req, res) => {
  try {

    const Parametros = req.body;

    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      body: Parametros.mensaje,
      to: `whatsapp:+593${Parametros.telefono.slice(1)}`,
    });

    res.status(200).json({
      Estado: true,
      Respuesta: "Mensaje enviado"
    });
  } catch (error) {
    res.status(500).json({
      Estado: false,
      Respuesta: "Error al enviar el mensaje"
    });
  }
});

// Middleware de manejo de errores (siempre al final)




app.use((err, req, res, next) => {
  res.status(500).json({
    Estado: false,
    Respuesta: "Error interno del servidor",
  });
});


app.use((req, res) => {
    res.status(404).json({ 
        Estado: false,
        Respuesta: "Recurso no encontrado"

     });
});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Mensajería Activa en http://localhost:${PORT}`);
});
