const ProductModel = require("../models/product.model");
const { productValidator } = require("../../validator");

// Get product all
exports.getProductList = (req, res) => {
    ProductModel.getProductAll(req.user.user_id, (error, product) => {
        if(error) throw error;
        res.status(200).send({status: true, message: 'Products list all', data: product});
    });
}
// Get product by Id
exports.getProductById = (req, res) => {
    ProductModel.getProductById([req.user.user_id, req.params.id], (error, product) => {
        if(error) throw error;
        res.status(200).send({status: true, message: 'Products by id', data: product});
    });
}
// Create product
exports.createProduct = (req, res) => {
    const {error} = productValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);
    const productData = new ProductModel(req.body);
    productData.createdBy = req.user.user_id;
    productData.updatedBy = req.user.user_id;
    ProductModel.createProduct(productData, (error, product) => {
        if(error) throw error;
        res.status(200).send({status: true, message: 'Product has been created successfully!', data: product});
    });
}
// update product
exports.updateProduct = (req, res) => {
    const {error} = productValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);
    const productData = new ProductModel(req.body);
    productData.updatedBy = req.user.user_id;
    ProductModel.updateProduct(req.params.id, productData, (error, product) => {
        if(error) throw error;
        res.json({status: true, message: 'Product has been updated successfully!', data: product});
    });
}
// Delete product
exports.deleteProduct = (req, res) => {
    ProductModel.deleteProduct(req.params.id, (error, product) => {
        if(error) throw error;
        res.json({status: true, messsage: 'Product has been deleted successfuly!'});
    });
}