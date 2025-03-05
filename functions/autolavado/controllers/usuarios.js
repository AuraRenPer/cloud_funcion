exports.crearUsuario = async (req, res) => {
  try {
    res.status(201).json({mensaje: "Usuario creado correctamente"});
  } catch (error) {
    res.status(500).json({error: "Error en la creación del usuario"});
  }
};

exports.obtenerUsuario = async (req, res) => {
  res.status(200).json({mensaje: "Obteniendo usuario"});
};

exports.actualizarUsuario = async (req, res) => {
  res.status(200).json({mensaje: "Usuario actualizado correctamente"});
};

exports.eliminarUsuario = async (req, res) => {
  res.status(200).json({mensaje: "Usuario eliminado correctamente"});
};

// Agregamos una línea en blanco al final del archivo
