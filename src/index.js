const functions = require("@google-cloud/functions-framework");
const register = require("./functions/register/index");
const login = require("./functions/login/index");
const updateUser = require("./functions/updateUser/index");
const deleteUser = require("./functions/deleteUser/index");

functions.http("register", register.register);
functions.http("login", login.login);
functions.http("updateUser", updateUser.updateUser);
functions.http("deleteUser", deleteUser.deleteUser);
