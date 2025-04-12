const crypto = require('crypto');
const moment = require('moment');
const { connectDB } = require('../db');

moment.locale('es');

exports.register = async (req, res) => {
  try {
    const { nombre, apellido_paterno, apellido_materno, email, password, checkMedico } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios' });
    }
    
    const db = await connectDB();
    const usersCollection = db.collection('usuarios');
    
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo electrónico ya está registrado' });
    }
    
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const fechaActual = moment().utcOffset('-06:00').toDate();
    
    const newUser = {
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      esDoctor: checkMedico,
      password: hashedPassword,
      fecha_registro: fechaActual,
      fecha_actualizacion: fechaActual,
      activo: true
    };
    
    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
