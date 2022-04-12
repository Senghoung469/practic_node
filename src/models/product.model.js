let dbConn = require("../../config/db.config");

let Product = function(product) {
    this.id = product.id;
    this.name = product.name;
    this.qty = product.qty;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.createdBy = product.createdBy;
    this.updatedBy = product.updatedBy;
}

Product.getProductAll = (result) => {
    dbConn.query("SELECT * FROM products", (error, res) => {
        if(error) throw error;
        result(null, res);
    });
}

Product.getProductById = (id, result) => {
    dbConn.query("SELECT * FROM products WHERE id = ?", [id], (error, res) => {
        if(error) throw error;
        result(null, res);
    });
}

Product.createProduct = (productData, result) => {
    dbConn.query("INSERT INTO products SET ?", productData, (error, res) => {
        if(error) throw error;
        result(null, res);
    });
}

Product.updateProduct = (id, productData, result) => {
    dbConn.query(`UPDATE products SET name=?, qty=?, updatedAt=?, updatedBy=? WHERE id=?`, [productData.name, productData.qty, new Date(), productData.updatedBy, id], (error, res) => {
        if(error) throw error;
        result(null, res);
    });
}

Product.deleteProduct = (id, result) => {
    dbConn.query("DELETE FROM products WHERE id =?", [id], (error, res) => {
        if(error) throw error;
        result(null, res);
    });
}

module.exports = Product;