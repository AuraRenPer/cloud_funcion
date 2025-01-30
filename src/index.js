const express = require("express");
const cors = require("cors");
const functions = require("@google-cloud/functions-framework");

const register = require("./functions/register/index").register;

const app = express();
app.use(express.json());
app.use(cors());

// Definir rutas
app.post("/register", register);

// Configuración del puerto en Google Cloud Run
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Exportar la función para Google Cloud
functions.http("uteq-api", app);
