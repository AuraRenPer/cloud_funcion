const functions = require("firebase-functions");
const {db} = require("./firebase.config");

// ✅ Registrar cliente
exports.registrarCliente = functions.https.onRequest(async (req, res) => {
  try {
    const cliente = req.body;
    const docRef = await db.collection("clientes").add(cliente);
    res.status(201).json({id: docRef.id, ...cliente});
  } catch (error) {
    res.status(500).json(
        {error: "Error al registrar cliente", detalle: error.message},
    );
  }
});

// ✅ Obtener todos los clientes
exports.obtenerClientes = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("clientes").get();
    const clientes = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    res.status(200).json(
        clientes,
    );
  } catch (error) {
    res.status(500).json(
        {error: "Error al obtener clientes", detalle: error.message},
    );
  }
});

// ✅ Actualizar cliente
exports.actualizarCliente = functions.https.onRequest(async (req, res) => {
  try {
    const {id, ...datosActualizados} = req.body;
    if (!id) {
      res.status(400).json({error: "ID del cliente es requerido"});
      return;
    }
    await db.collection("clientes").doc(id).update(datosActualizados);
    res.status(200).json(
        {mensaje: "Cliente actualizado correctamente"},
    );
  } catch (error) {
    res.status(500).json(
        {error: "Error al actualizar cliente", detalle: error.message},
    );
  }
});

// ✅ Eliminar cliente
exports.eliminarCliente = functions.https.onRequest(async (req, res) => {
  try {
    const {id} = req.body;
    if (!id) {
      res.status(400).json({error: "ID del cliente es requerido"});
      return;
    }
    await db.collection("clientes").doc(id).delete();
    res.status(200).json({mensaje: "Cliente eliminado correctamente"});
  } catch (error) {
    res.status(500).json(
        {error: "Error al eliminar cliente", detalle: error.message},
    );
  }
});
