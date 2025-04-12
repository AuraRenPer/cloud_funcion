const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const moment = require('moment');
moment.locale('es');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

exports.deleteUser = async (req, res) => {
  cors(corsOptions)(req, res, async () => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'El ID del usuario es obligatorio' });
    }

    const uri = 'mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase';
    try {
      const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db('myFirstDatabase');
      const usersCollection = db.collection('usuarios');

      // Verificar si el usuario existe
      const existingUser = await usersCollection.findOne({ _id: new ObjectId(id), activo: true });

      if (!existingUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Realizar la eliminación lógica (cambiar activo a false)
      const fechaActualizacion = moment().utcOffset('-06:00').toDate();
      await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { activo: false, fecha_actualizacion: fechaActualizacion } }
      );

      res.status(200).json({ message: 'Usuario desactivado correctamente' });

      await client.close();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
};
