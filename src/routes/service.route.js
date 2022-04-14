const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/service.controller");

// Get all upload file
router.post('/api/v1/upload', ServiceController.uploadService);
// Get file
router.get('/api/v1/send/:file(*)', ServiceController.uploadService);
// Delete file
router.get('/api/v1/delete/file/:file', ServiceController.uploadService);

module.exports = router;