const functions = require("firebase-functions");
const {db} = require("./autolavado/config/firebase.config");

// ✅ Crear servicio
exports.crearServicio = functions.https.onRequest(async (req, res) => {
  try {
    const servicio = req.body;
    const docRef = await db.collection("servicios").add(servicio);
    res.status(201).json({id: docRef.id, ...servicio});
  } catch (error) {
    res.status(500).json(
        {error: "Error al registrar servicio", detalle: error.message},
    );
  }
});

// ✅ Obtener todos los servicios
exports.obtenerServicios = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("servicios").get();
    const servicios = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json(
        {error: "Error al obtener servicios", detalle: error.message},
    );
  }
});

// ✅ Actualizar servicio
exports.actualizarServicio = functions.https.onRequest(async (req, res) => {
  try {
    const {id, ...datosActualizados} = req.body;
    if (!id) {
      res.status(400).json({error: "ID del servicio es requerido"});
      return;
    }
    await db.collection("servicios").doc(id).update(datosActualizados);
    res.status(200).json({mensaje: "Servicio actualizado correctamente"});
  } catch (error) {
    res.status(500).json(
        {error: "Error al actualizar el servicio", detalle: error.message},
    );
  }
});

// ✅ Eliminar servicio
exports.eliminarServicio = functions.https.onRequest(async (req, res) => {
  try {
    const {id} = req.body;
    if (!id) {
      res.status(400).json({error: "ID del servicio es requerido"});
      return;
    }
    await db.collection("servicios").doc(id).delete();
    res.status(200).json({mensaje: "Servicio eliminado correctamente"});
  } catch (error) {
    res.status(500).json(
        {error: "Error al eliminar el servicio", detalle: error.message},
    );
  }
});
