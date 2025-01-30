const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const crypto = require('crypto');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const moment = require('moment');
moment.locale('es'); // Esto es para configurar el idioma en español
const xlsx = require('xlsx');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Busboy = require('busboy');

const { Storage } = require('@google-cloud/storage');
const csvParser = require('csv-parser');
const PdfPrinter = require('pdfmake')
// Configura Multer para manejar la subida de archivos
const upload = multer({ storage: multer.memoryStorage() });

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}


const storage = new Storage();
const bucketName = 'clinic-backup';
const tracesFolder = 'clinic_folder';

exports.login = async (req, res) => {
  cors(corsOptions) // Para permitir el acceso a la API desde cualquier origen
      (req, res, async () => {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({message: 'Email y contraseña son obligatorios'});
        }

        // Reemplaza con tus credenciales y la dirección de conexión a MongoDB Atlas
        const uri = 'mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

        try {
          const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

          const db = client.db('myFirstDatabase');
          const usersCollection = db.collection('usuarios');

          const user = await usersCollection.findOne({ email });

          if (!user) {
            res.status(401).json({message: 'Email o contraseña incorrectos'});
          } else {
            const hash = crypto.createHash('sha256');
            hash.update(password);
            const hashedPassword = hash.digest('hex');

            if (hashedPassword === user.password) {
              const token = jwt.sign({ userId: user._id }, '96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff3', { expiresIn: '30d' });

              res.status(200).json({
                message: 'Inicio de sesión exitoso',
                user: {
                  _id: user._id,
                  nombre: user.nombre,
                  apellido: user.apellido,
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