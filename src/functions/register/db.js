const { MongoClient } = require('mongodb');

// URL de conexión a MongoDB obtenida de las variables de entorno
const uri = process.env.MONGODB_URI;

// Función para conectar a la base de datos
async function connectDB() {
    if (!uri) {
        throw new Error('La variable de entorno MONGODB_URI no está definida.');
    }
    
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return client.db('myFirstDatabase'); // Cambia 'basedatos' por el nombre real de tu base de datos
}

module.exports = connectDB;
