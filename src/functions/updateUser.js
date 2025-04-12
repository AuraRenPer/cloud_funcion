const { connectDB } = require('../db');
const { ObjectId } = require('mongodb');

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const db = await connectDB();
    const usersCollection = db.collection('usuarios');

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updates },
      { writeConcern: { w: 'majority', wtimeout: 5000 } }  // writeConcern
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    console.error("Error en actualización:", err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
