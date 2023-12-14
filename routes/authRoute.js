// authRoute.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.userSignup);
router.post("/login", authController.userLogin);

module.exports = router;
