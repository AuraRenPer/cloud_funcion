const Usuario = require("../models/usuario");

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
