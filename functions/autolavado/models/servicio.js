const {firestore} = require("../config/firebase.config");

const Servicio = {
  async create(data) {
    const nuevoServicio = await firestore.collection("servicios").add(data);
    return {id: nuevoServicio.id, ...data};
  },

  async getById(id) {
    const servicio = await firestore.collection("servicios").doc(id).get();
    return servicio.exists ? {id, ...servicio.data()} : null;
  },

  async getAll() {
    const snapshot = await firestore.collection("servicios").get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  },

  async update(id, data) {
    await firestore.collection("servicios").doc(id).update(data);
    return {id, ...data};
  },

  async delete(id) {
    await firestore.collection("servicios").doc(id).delete();
    return {id, mensaje: "Servicio eliminado exitosamente"};
  },
};

module.exports = Servicio;
