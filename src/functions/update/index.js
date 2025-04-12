const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const crypto = require('crypto');
const cors = require('cors');
const moment = require('moment');

moment.locale('es');
const { Storage } = require('@google-cloud/storage');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

const storage = new Storage();
const bucketName = 'clinic-backup';

exports.updateUser = async (req, res) => {
  cors(corsOptions)(req, res, async () => {
    const { id, nombre, apellido_paterno, apellido_materno, email, password } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'El ID del usuario es obligatorio' });
    }

    const uri = 'mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase';

    
    try {
      const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db('myFirstDatabase');
      const usersCollection = db.collection('usuarios');

      const existingUser = await usersCollection.findOne({ _id: new ObjectId(id), activo: true });

      if (!existingUser) {
        res.status(404).json({ message: 'Usuario no encontrado o inactivo' });
      } else {
        const fechaCiudadMexico = moment().utcOffset('-06:00').toDate();

        let updatedFields = { nombre, apellido_paterno, apellido_materno, email, fecha_actualizacion: fechaCiudadMexico };

        if (password) {
          const hash = crypto.createHash('sha256').update(password).digest('hex');
          updatedFields.password = hash;
        }

        await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });

        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
      }

      await client.close();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
};
