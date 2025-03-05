const {firestore} = require("../config/firebase.config");

const Usuario = {
  async create(data) {
    return await firestore.collection("usuarios").add(data);
  },
  async getById(id) {
    return await firestore.collection("usuarios").doc(id).get();
  },
  async update(id, data) {
    return await firestore.collection("usuarios").doc(id).update(data);
  },
  async delete(id) {
    return await firestore.collection("usuarios").doc(id).delete();
  },
};

module.exports = Usuario;
