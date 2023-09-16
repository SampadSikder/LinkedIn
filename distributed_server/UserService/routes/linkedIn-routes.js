const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const authentication = require("../middlewares/authentication");


router.get("/users", authentication, userController.getUser);
router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/auth", authentication);


module.exports = router;