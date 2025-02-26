const admin = require("firebase-admin");
const serviceAccount = require(
    "./autolavado-38624-firebase-adminsdk-fbsvc-8d934991bf.json",
);

// ✅ Evitar inicialización duplicada
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://autolavado-38624.firebaseio.com", // 🔥 Realtime Database (si lo usas)
  });
}

const db = admin.firestore();
module.exports = {db};
