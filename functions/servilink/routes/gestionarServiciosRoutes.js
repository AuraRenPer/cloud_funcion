const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const gestionarServiciosController = require(
    "../controllers/gestionarServiciosController",
);

// Crear un nuevo servicio (solo proveedores)
router.post("/crear", gestionarServiciosController.crearServicio);

// Obtener servicios por proveedor
router.get(
    "/proveedor/:idProveedor",
    gestionarServiciosController.obtenerServiciosPorProveedor,
);

// Obtener un servicio por ID
router.get(
    "/:idServicio/:idProveedor",
    gestionarServiciosController.obtenerServicioPorId,
);

// Actualizar servicio (solo el proveedor dueño)
router.put(
    "/:idServicio",
    gestionarServiciosController.actualizarServicio,
);

// Eliminar servicio (solo el proveedor dueño)
router.delete(
    "/:idServicio",
    gestionarServiciosController.eliminarServicio,
);

module.exports = router;
