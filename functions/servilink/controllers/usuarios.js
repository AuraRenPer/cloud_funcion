const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

// Función para crear el token JWT al registrar el usuario
exports.crearUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      correo,
      password,
      telefono,
      fechaRegistro,
      rol,
      estatus,
    } = req.body;

    if (
      !nombre ||
      !apellido ||
      !correo ||
      !password ||
      !telefono ||
      !fechaRegistro ||
      !rol ||
      !estatus
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    const nuevoUsuario = new Usuario(
      nombre,
      apellido,
      correo,
      password,
      telefono,
      fechaRegistro,
      rol,
      estatus
    );
    const usuarioId = await nuevoUsuario.save();

    // Crear el token JWT con los datos necesarios
    const token = jwt.sign(
      {
        id: usuarioId,
        correo,
        username: correo, // O si tienes otro campo como username, puedes usarlo aquí
        nombre,
        apellido,
        telefono,
        rol,
      },
      process.env.JWT_SECRET_KEY, // Asegúrate de tener una clave secreta en tu .env
      { expiresIn: "1h" } // El token expirará en una hora (ajusta según lo que necesites)
    );

    res.status(201).json({
      id: usuarioId,
      mensaje: "Usuario registrado exitosamente",
      token, // Devuelves el token junto con el mensaje de éxito
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
