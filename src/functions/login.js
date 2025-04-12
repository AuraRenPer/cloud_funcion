const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { connectDB } = require('../db');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }
    
    const db = await connectDB();
    const usersCollection = db.collection('usuarios');
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
    
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (hashedPassword !== user.password) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        _id: user._id,
        nombre: user.nombre,
        apellido: user.apellido_paterno,
        email: user.email
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
