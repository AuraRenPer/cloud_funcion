const connectDB = require('./db');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

async function updateUser  (req, res) {
  cors(corsOptions)(req, res, async () => {
    const { userId, nombre, apellido_paterno, apellido_materno, email } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'Se requiere el ID del usuario' });
    }

    try {
      const db = await connectDB();
      const usersCollection = db.collection('users');

      const updatedUser = await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { nombre, apellido_paterno, apellido_materno, email, fecha_actualizacion: new Date() } }
      );

      if (updatedUser.matchedCount === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario actualizado correctamente' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
};

// 📌 Exportar la función para ser usada en `src/index.js`
module.exports = { updateUser };