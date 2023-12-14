const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/user", authMiddleware.verifyUser, userController.getAllUsers);

module.exports = router;
