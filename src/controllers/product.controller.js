const ProductModel = require("../models/product.model");
const { productValidator } = require("../../validator");

// Get product all
exports.getProductList = (req, res) => {
    ProductModel.getProductAll((error, product) => {
        if(error) throw error;
        res.json({status: true, data: product});
    });
}
// Get product by Id
exports.getProductById = (req, res) => {
    ProductModel.getProductById(req.params.id, (error, product) => {
        if(error) throw error;
        res.json({status: true, data: product});
    });
}
// Create product
exports.createProduct = (req, res) => {
    const productData = new ProductModel(req.body);
    const {error} = productValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);

    ProductModel.createProduct(productData, (error, product) => {
        if(error) throw error;
        res.json({status: true, message: 'Product has been created successfully!', data: product});
    });
}
// update product
exports.updateProduct = (req, res) => {
    const productData = new ProductModel(req.body);
    const {error} = productValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);

    ProductModel.updateProduct(req.params.id, productData, (error, product) => {
        if(error) throw error;
        res.json({status: true, message: 'Product has been updated successfully!', data: product});
    });
}
// Delete product
exports.deleteProduct = (req, res) => {
    ProductModel.deleteProduct(req.params.id, (error, product) => {
        if(error) throw error;
        res.json({status: true, messsage: 'Product has been deleted successfuly!', data: product});
    });
}