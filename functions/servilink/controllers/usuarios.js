const Usuario = require("../models/usuario");
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

    console.log("Contraseña recibida en API:", password);

    // Verificar si el correo ya existe
    const usuarioExistentePorCorreo = await Usuario.getByCorreoOrUsername(correo);
    if (usuarioExistentePorCorreo) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Verificar si el username ya existe
    const usuarioExistentePorUsername = await Usuario.getByCorreoOrUsername(username);
    if (usuarioExistentePorUsername) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
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
};

exports.loginUsuario = async (req, res) => {
  try {
    const {
      login,
      password,
    } = req.body; // login es correo o username

    console.log("Intento de login con:", login);

    const snapshot = await Usuario.getByCorreoOrUsername(login);

    if (!snapshot) {
      return res.status(400).json({error: "Usuario no encontrado"});
    }

    const usuarioData = snapshot;

    console.log("Usuario encontrado:", usuarioData);

    const passwordValida = bcrypt.compareSync(password, usuarioData.password);

    if (!passwordValida) {
      return res.status(401).json({error: "Contraseña incorrecta"});
    }

    const token = jwt.sign(
        {id: usuarioData.id,
          correo: usuarioData.correo,
          username: usuarioData.username,
          rol: usuarioData.rol},
        SECRET_KEY,
        {expiresIn: "7d"},
    );

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
    console.error("Error en login:", error);
    res.status(500).json({
      error: "Error en el inicio de sesión",
      detalle: error.message,
    });
  }
};
