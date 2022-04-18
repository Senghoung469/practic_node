const ProductModel = require("../models/product.model");
const { productValidator } = require("../../validator");
const {uploadService, destroyFileService} = require("../controllers/service.controller");

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
    let url = uploadService(req.files.image);
    if(!url) return res.status(404).send({message: 'file not found.'});
    const productData = new ProductModel(req.body);
    productData.createdBy = req.user.user_id;
    productData.updatedBy = req.user.user_id;
    productData.image = url;
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
    ProductModel.updateProduct(req.params.id, req.files.image, productData, (error, product) => {
        if(error) throw error;
        if(product.affectedRows == 0) return res.status(404).send({ status: false, message: 'No row to update' });
        res.json({status: true, message: 'Product has been updated successfully!', data: product});
    });
}
// Delete product
exports.deleteProduct = (req, res) => {
    ProductModel.deleteProduct(req.params.id, (error, product) => {
        if(error) throw error;
        if(product.res.affectedRows == 0) return res.status(404).send({ status: false, message: 'No row to delete' });
        // Remove image from directory
        destroyFileService(product.data[0].image);
        res.json({status: true, messsage: 'Product has been deleted successfuly!'});
    });
}