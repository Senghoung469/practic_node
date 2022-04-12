const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// Get all users
router.get('/api/v1/user', UserController.getUserList);
// Get user by id
router.get('/api/v1/user/:id', UserController.getUserById);
// Crate user 
router.post('/api/v1/user', UserController.createUser);
// Update user 
router.put('/api/v1/user/:id', UserController.updateUser);
// Delete user 
router.delete('/api/v1/user/:id', UserController.deleteUser);

module.exports = router;