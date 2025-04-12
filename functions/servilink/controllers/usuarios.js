const admin = require("firebase-admin");
const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "m1_c14v3_53cr374_muy_larg4_y_d1f1c1l_d3_ad1v1nar";

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  
  try {
    const {
      nombre,
      apellido,
      correo,
      password,
      username,
      telefono,
      fechaLogin,
      rol,
      estatus,
    } = req.body;

    const camposFaltantes = [];
    if (!nombre) camposFaltantes.push("nombre");
    if (!apellido) camposFaltantes.push("apellido");
    if (!correo) camposFaltantes.push("correo");
    if (!password) camposFaltantes.push("password");
    if (!username) camposFaltantes.push("username");
    if (!telefono) camposFaltantes.push("telefono");
    if (!fechaLogin) camposFaltantes.push("fechaLogin");
    if (!rol) camposFaltantes.push("rol");
    if (!estatus) camposFaltantes.push("estatus");

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        error:
        `Los siguientes campos son obligatorios:
         ${camposFaltantes.join(", ")}`,
      });
    }
    console.log("SE VA A EMPEZAR A CREAR USUARIO");
    console.log("Contraseña recibida en API:", password);
    console.log("SE VA A EMPEZAR A CREAR USUARIO2");
    
const usuarioConCorreo = await Usuario.getByCorreo(correo);
if (usuarioConCorreo) {
  return res.status(400).json({ error: "El correo ya está registrado." });
}

const usuarioConUsername = await Usuario.getByUsername(username);
if (usuarioConUsername) {
  return res.status(400).json({ error: "El nombre de usuario ya está registrado." });
}

    const nuevoUsuario = new Usuario(
        nombre,
        apellido,
        correo,
        password,
        username,
        telefono,
        fechaLogin,
        rol,
        estatus,
    );

    console.log(
        "Contraseña encriptada antes de guardar:",
        nuevoUsuario.password,
    );

    const usuarioId = await nuevoUsuario.save();

    res.status(201).json({
      id: usuarioId,
      mensaje: "Usuario registrado exitosamente",
      uid,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar el usuario",
      detalle: error.message,
    });
  }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los usuarios",
      detalle: error.message,
    });
  }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const usuario = await Usuario.getById(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el usuario",
      detalle: error.message,
    });
  }
};

// Actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const {id} = req.params;
    const datosActualizados = req.body;
    await Usuario.updateById(id, datosActualizados);
    res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el usuario",
      detalle: error.message,
    });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const {id} = req.params;
    await Usuario.deleteById(id);
    res.status(200).json({
      mensaje: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el usuario",
      detalle: error.message,
    });
  }
    // Verificar en paralelo si el correo o username ya existen
    const [correoExistente, usernameExistente] = await Promise.all([
      Usuario.getByCorreo(correo),
      Usuario.getByUsername(username)
    ]);
  
    if (correoExistente && usernameExistente) {
      return res.status(400).json({
        error: "El correo electrónico y el nombre de usuario ya están en uso.",
      });
    }
  
    if (correoExistente) {
      return res.status(400).json({
        error: "El correo electrónico ya está en uso.",
      });
    }
  
    if (usernameExistente) {
      return res.status(400).json({
        error: "El nombre de usuario ya está en uso.",
      });
    }
    // Validar formato de correo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return res.status(400).json({
        error: "El formato del correo electrónico no es válido.",
      });
    }
  
    // Validar formato de username (ejemplo: solo letras, números y guiones bajos)
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({
        error: "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        error: "La contraseña debe tener al menos 8 caracteres.",
      });
    }
};

exports.loginUsuario = async (req, res) => {
  try {
    const {login, password} = req.body;
    // 🔹 `login` puede ser un correo o username

    if (!login || !password) {
      return res.status(400).json({
        error:
        "Correo/Usuario y contraseña son obligatorios.",
      });
    }

    // 🔹 Buscar usuario por correo o username
    const snapshot = await Usuario.getByCorreoOrUsername(login);

    if (!snapshot) {
      return res.status(400).json({error: "Usuario no encontrado"});
    }

    const usuarioData = snapshot;

    console.log("✅ Usuario encontrado:", usuarioData);

    // 🔹 Validar la contraseña con bcrypt
    const passwordValida = bcrypt.compareSync(password, usuarioData.password);

    if (!passwordValida) {
      return res.status(401).json({error: "Contraseña incorrecta"});
    }

    // 🔹 Generar token con los datos del usuario
    const token = jwt.sign(
        {
          id: usuarioData.id,
          correo: usuarioData.correo,
          username: usuarioData.username,
          rol: usuarioData.rol,
        },
        SECRET_KEY,
        {expiresIn: "7d"},
    );

    // 🔹 Respuesta con token y datos del usuario
    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuarioData.id,
        nombre: usuarioData.nombre,
        apellido: usuarioData.apellido,
        correo: usuarioData.correo,
        username: usuarioData.username,
        rol: usuarioData.rol,
        estatus: usuarioData.estatus,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({
      error: "Error en el inicio de sesión",
      detalle: error.message,
    });
  }
};
