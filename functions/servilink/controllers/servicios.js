const Servicio = require("../models/servicio");
const Proveedor = require("../models/proveedor");
// Crear un nuevo servicio
exports.crearServicio = async (req, res) => {
  try {
    const {
      nombre,
      descripcionProblema,
      precio,
      duracion,
      imagen,
      tipoServicio,
      idProveedor,
      ubicacionPersona,
    } = req.body;

    if (
      !nombre ||
      !descripcionProblema ||
      !precio ||
      !duracion ||
      !tipoServicio ||
      !idProveedor
    ) {
      return res.status(400).json({
        error: "Todos los campos obligatorios deben ser completados.",
      });
    }

    const nuevoServicio = new Servicio(
        nombre,
        descripcionProblema,
        precio,
        duracion,
        imagen,
        tipoServicio,
        idProveedor,
        ubicacionPersona || null,
    );

    const servicioId = await nuevoServicio.save();
    await Proveedor.agregarServicioAProveedor(idProveedor, servicioId);

    res.status(201).json({
      idServicio: servicioId,
      mensaje: "Servicio registrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar el servicio",
      detalle: error.message,
    });
  }
};

// Obtener todos los servicios
exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.getAll();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los servicios",
      detalle: error.message,
    });
  }
};

// Obtener servicios de un proveedor
exports.obtenerServiciosPorProveedor = async (req, res) => {
  try {
    const {idProveedor} = req.params;
    const servicios = await Servicio.getByProveedor(idProveedor);
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los servicios del proveedor",
      detalle: error.message,
    });
  }
};

// Actualizar un servicio
exports.actualizarServicio = async (req, res) => {
  try {
    const {id} = req.params;
    const datosActualizados = req.body;

    if (!Object.keys(datosActualizados).length) {
      return res.status(400).json({
        error: "Debe proporcionar datos para actualizar.",
      });
    }

    const servicioActualizado = await Servicio.updateById(
        id, datosActualizados,
    );

    res.status(200).json({
      mensaje: "Servicio actualizado correctamente",
      servicio: servicioActualizado,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el servicio",
      detalle: error.message,
    });
  }
};

// Eliminar un servicio
exports.eliminarServicio = async (req, res) => {
  try {
    const {id} = req.params;
    await Servicio.deleteById(id);

    res.status(200).json({
      mensaje: "Servicio eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el servicio",
      detalle: error.message,
    });
  }
};
