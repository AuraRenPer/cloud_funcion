const functions = require("@google-cloud/functions-framework");
const MongoClient = require("mongodb").MongoClient;
const crypto = require("crypto");
const cors = require("cors");
const moment = require("moment");

moment.locale("es"); // Configurar el idioma en español

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

async function register(req, res) {
  try {
    const { nombre, apellido_paterno, apellido_materno, email, password, checkMedico } = req.body;

    if (!nombre || !email || !password) { 
      return res.status(400).json({ message: "Nombre, apellido, email y contraseña son obligatorios" });
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db("basedatos");
    const usersCollection = db.collection("users");

    // 📌 Verificar si el usuario ya está registrado
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      await client.close();
      return res.status(409).json({ message: "El correo electrónico ya está registrado" });
    }

    // 📌 Hashear la contraseña
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    const fechaCiudadMexico = moment(new Date()).utcOffset("-06:00");

    const newUser = {
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      esDoctor: checkMedico,
      password: hashedPassword,
      fecha_registro: fechaCiudadMexico.toDate(),
      fecha_actualizacion: fechaCiudadMexico.toDate(),
      ensayos: [],
      segmentos: [],
    };

    await usersCollection.insertOne(newUser);
    await client.close();

    return res.status(201).json({ message: "Usuario registrado exitosamente" });

  } catch (err) {
    console.error("❌ Error en el registro:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

// 📌 Exportar la función para ser usada en `src/index.js`
module.exports = { register };
