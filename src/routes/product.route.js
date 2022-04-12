const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");

// Get all products
router.get('/api/v1/product', ProductController.getProductList);
// Get product by id
router.get('/api/v1/product/:id', ProductController.getProductById);
// Create product
router.post('/api/v1/product', ProductController.createProduct);
// Update product
router.put('/api/v1/product/:id', ProductController.updateProduct);
// Delete product
router.delete('/api/v1/product/:id', ProductController.deleteProduct);

module.exports = router;