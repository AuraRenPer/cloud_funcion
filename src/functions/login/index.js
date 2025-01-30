const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const moment = require('moment');
moment.locale('es'); 

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

async function login (req, res) {
  cors(corsOptions)(req, res, async () => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({message: 'Email y contraseña son obligatorios'});
    }

    const uri = process.env.MONGODB_URI;
    try {
      const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

      const db = client.db('basedatos');
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ email });

      if (!user) {
        res.status(401).json({message: 'Email o contraseña incorrectos'});
      } else {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        const hashedPassword = hash.digest('hex');

        if (hashedPassword === user.password) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

          res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
              _id: user._id,
              nombre: user.nombre,
              apellido_paterno: user.apellido_paterno,
              email: user.email
            },
            token
          });
        } else {
          res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
      }

      await client.close();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
};

// 📌 Exportar la función para ser usada en `src/index.js`
module.exports = { login };