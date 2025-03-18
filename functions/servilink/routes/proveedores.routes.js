const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor,
} = require("../controllers/proveedores");


router.post("/crearproveedor", crearProveedor);
router.get("/obtenerproveedores", obtenerProveedores);
router.get("/obtenerproveedor/:id", obtenerProveedorPorId);
router.put("/actualizarproveedor/:id", actualizarProveedor);
router.delete("/eliminarproveedor/:id", eliminarProveedor);

module.exports = router;

/*
{
  "nombreEmpresa": "Super Mega Lavado",
  "correo": "contacto@megalavado.com",
  "telefono": "1234567890",
  "ubicacion": {
    "lat": 19.4326,
    "lng": -99.1332,
    "direccion": "Calle 123, Ciudad, País"
  },
  "horarioServicio": "Lunes a Viernes 8:00 AM - 6:00 PM",
  "serviciosDisponibles": ["Encerado chido", "Limpieza Profunda Perrona"],
  "estado": "activo",
  "idUsuario": "FGhnQZQie5fjRYvEEKAk"
}


*/