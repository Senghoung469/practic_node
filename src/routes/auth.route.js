const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

// Sign Auth
router.post('/api/v1/sign', AuthController.signAuth);

module.exports = router;