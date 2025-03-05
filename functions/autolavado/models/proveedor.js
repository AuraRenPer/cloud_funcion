const {firestore} = require("../config/firebase.config");

const Proveedor = {
  async create(data) {
    const nuevoProveedor = await firestore.collection("proveedores").add(data);
    return {id: nuevoProveedor.id, ...data};
  },

  async getById(id) {
    const proveedor = await firestore.collection("proveedores").doc(id).get();
    return proveedor.exists ? {id, ...proveedor.data()} : null;
  },

  async getAll() {
    const snapshot = await firestore.collection("proveedores").get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  },

  async update(id, data) {
    await firestore.collection("proveedores").doc(id).update(data);
    return {id, ...data};
  },

  async delete(id) {
    await firestore.collection("proveedores").doc(id).delete();
    return {id, mensaje: "Proveedor eliminado exitosamente"};
  },
};

module.exports = Proveedor;
