const { connectDB } = require('../db');
const { ObjectId } = require('mongodb');

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const db = await connectDB();
    const usersCollection = db.collection('usuarios');

    const result = await usersCollection.deleteOne(
      { _id: new ObjectId(userId) },
      { writeConcern: { w: 'majority', wtimeout: 5000 } }  // writeConcern
    );

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error("❌ Error en eliminación:", err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
