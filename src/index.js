const express = require("express");
const functions = require("@google-cloud/functions-framework");
const cors = require("cors");

const register = require("./functions/register/index").register;
const login = require("./functions/login/index").login;
const updateUser = require("./functions/update/index").updateUser;
const deleteUser = require("./functions/delete/index").deleteUser;

const app = express();
app.use(express.json());
app.use(cors());

// Rutas para cada función
app.post("/register", register);
app.post("/login", login);
app.put("/updateUser", updateUser);
app.delete("/deleteUser", deleteUser);

// Exportar la función para Google Cloud Functions
functions.http("uteq-api", app);
