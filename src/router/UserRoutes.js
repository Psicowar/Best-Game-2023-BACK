const express = require('express');
const tokenChecker = require('../middlewares/tokenChecker');
const userController = require('../controllers/user.controllers');
const UserRoutes = express.Router();


UserRoutes
    .post("/register", userController.createUser) // Signup path
    .post("/authenticate", userController.authenticate) // Login path
    .post("/authorizate", userController.checkUserPassword) // Path to Check user password
    .post("checkRole", tokenChecker, userController.checkUserRole) // Path to check user role


module.exports = UserRoutes;