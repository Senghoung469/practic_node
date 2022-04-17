let dbConn = require("../../config/db.config");

let Product = function(product) {
    this.id = product.id;
    this.name = product.name;
    this.qty = product.qty;
    this.price = product.price;
    this.image = product.image;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.createdBy = product.createdBy;
    this.updatedBy = product.updatedBy;
}

Product.getProductAll = (userId, result) => {
    dbConn.query(`SELECT products.id, products.name, products.qty, products.price, products.image, products.createdAt, products.updatedAt,
    (users.username) AS createdBy,
    (SELECT users.username FROM users WHERE users.id = products.updatedBy) AS updatedBy
    FROM products INNER JOIN users ON products.createdBy = users.id WHERE users.createdBy = ?`, userId, (error, res) => {
        try {
            if(error) throw error;
            result(null, res);
        } catch (error) {
            result(null, error);
        }
    });
}

Product.getProductById = ([userId, id], result) => {
    dbConn.query(`SELECT products.id, products.name, products.qty, products.price, products.image, products.createdAt, products.updatedAt,
    (users.username) AS createdBy,
    (SELECT users.username FROM users WHERE users.id = products.updatedBy) AS updatedBy
    FROM products INNER JOIN users ON products.createdBy = users.id WHERE products.id = ? AND users.createdBy = ?`, [id, userId], (error, res) => {
        try {
            if(error) throw error;
            result(null, res);
        } catch (error) {
            result(null, error);
        }
    });
}

Product.createProduct = (productData, result) => {
    dbConn.query("INSERT INTO products SET ?", productData, (error, res) => {
        try {
            if(error) throw error;
            result(null, res);
        } catch (error) {
            result(null, error);
        }
    });
}

Product.updateProduct = (id, productData, result) => {
    dbConn.query(`UPDATE products SET name=?, qty=?, price=?, updatedAt=?, updatedBy=? WHERE id=?`, [productData.name, productData.qty, productData.price, new Date(), productData.updatedBy, id], (error, res) => {
        try {
            if(error) throw error;
            result(null, res);
        } catch (error) {
            result(null, error);
        }
    });
}

Product.deleteProduct = (id, result) => {
    dbConn.query("SELECT image FROM products WHERE id = ?", id, (error, image) => {
        if(error) throw error;
        try {
            dbConn.query("DELETE FROM products WHERE id =?", id, (error, res) => {
                if(error) throw error;
                result(null, {res: res, data: image});
            });
        } catch (error) {
            result(null, error);
        }
    });
}

module.exports = Product;