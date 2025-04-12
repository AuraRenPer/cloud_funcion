require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const express = require('express');
const cors = require('cors');
const { register } = require('./functions/register');
const { login } = require('./functions/login');
const { updateUser } = require('./functions/updateUser');
const { deleteUser } = require('./functions/deleteUser');

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.post('/register', register);
app.post('/login', login);
app.put('/users/:userId', updateUser);
app.delete('/users/:userId', deleteUser);

// Google Cloud Function entry point
exports.practica1 = (req, res) => app(req, res);
