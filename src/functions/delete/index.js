const connectDB = require('./db');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

exports.deleteUser = async (req, res) => {
  cors(corsOptions)(req, res, async () => {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'Se requiere el ID del usuario' });
    }

    try {
      const db = await connectDB();
      const usersCollection = db.collection('users');

      const deletedUser = await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { eliminado: true } } // Eliminación lógica
      );

      if (deletedUser.matchedCount === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario eliminado correctamente' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
};
