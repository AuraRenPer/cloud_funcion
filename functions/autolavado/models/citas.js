const {firestore} = require("../config/firebase.config");

const Citas = {
  async create(data) {
    const nuevaCita = await firestore.collection("citas").add(data);
    return {id: nuevaCita.id, ...data};
  },

  async getById(id) {
    const cita = await firestore.collection("citas").doc(id).get();
    return cita.exists ? {id, ...cita.data()} : null;
  },

  async getAll() {
    const snapshot = await firestore.collection("citas").get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  },

  async update(id, data) {
    await firestore.collection("citas").doc(id).update(data);
    return {id, ...data};
  },

  async delete(id) {
    await firestore.collection("citas").doc(id).delete;
    return {id, mensaje: "Cita eliminada exitosamente"};
  },
};

module.exports = Citas;
