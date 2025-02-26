const functions = require("firebase-functions");
const { crearServicio, obtenerServicios, actualizarServicio, eliminarServicio } = require("./servicios");
const { registrarCliente, obtenerClientes, actualizarCliente, eliminarCliente } = require("./clientes");

// ✅ Exportamos las funciones de Servicios
exports.crearServicio = crearServicio;
exports.obtenerServicios = obtenerServicios;
exports.actualizarServicio = actualizarServicio;
exports.eliminarServicio = eliminarServicio;

// ✅ Exportamos las funciones de Clientes
exports.registrarCliente = registrarCliente;
exports.obtenerClientes = obtenerClientes;
exports.actualizarCliente = actualizarCliente;
exports.eliminarCliente = eliminarCliente;
