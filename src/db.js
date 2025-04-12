const { MongoClient } = require('mongodb');

console.log("MONGODB_URI:", process.env.MONGODB_URI);
const mongoURI = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';

let cachedClient = null;

async function connectDB() {
  if (cachedClient) return cachedClient.db();

  const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    w: 'majority'  
  });

  try {
    await client.connect();
    console.log(' Conectado a MongoDB');
    cachedClient = client;
    return client.db();
  } catch (error) {
    console.error(' Error al conectar a MongoDB:', error);
    throw error;
  }
}

module.exports = { connectDB };
