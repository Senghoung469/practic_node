let dbConn = require("../../config/db.config");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let User = function(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = bcrypt.hashSync(user.password, salt);
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.createdBy = user.createdBy;
    this.updatedBy = user.updatedBy;
}

User.getUserAll = (userId, result) => {
    dbConn.query(`
        SELECT users.id, users.username, users.email, users.PASSWORD, users.createdAt, users.updatedAt,
        (SELECT users.username FROM users WHERE tb_user.createdBy = users.id) AS createdBy,
        (SELECT users.username FROM users WHERE tb_user.updatedBy = users.id) AS updatedBy
        FROM users INNER JOIN users tb_user ON users.id = tb_user.id WHERE users.createdBy = ?`, userId, (error, res) => {
        try {
            if(error) throw error;
            result(null, res);
        } catch (error) {
            result(null, error);
        }

    });
}

User.getUserById = ([id, userId], result) => {
    dbConn.query(`
        SELECT users.id, users.username, users.email, users.PASSWORD, users.createdAt, users.updatedAt,
        (SELECT users.username FROM users WHERE tb_user.createdBy = users.id) AS createdBy,
        (SELECT users.username FROM users WHERE tb_user.updatedBy = users.id) AS updatedBy
        FROM users INNER JOIN users tb_user ON users.id = tb_user.id WHERE users.createdBy = ? AND users.id = ?`, [id, userId], (error, res) => {
        if(error) throw error;
        result(null, res);
    });
}

User.createUser = (userData, result) => {
    dbConn.query("INSERT INTO users SET ?", userData, (error, res) => {
        try {
            if(error) throw error;
            // Check username exist 
            result(null, res);
        } catch (error) {
            result(null, error);
        }
    });
}

User.updateUser = (id, userData, result) => {
    dbConn.query(`UPDATE users SET username=?, email=?, password=?, updatedAt=?, updatedBy=? WHERE id=?`,[userData.username, userData.email, userData.password, new Date(), userData.updatedBy, id], (error, res) => {
        try {
            if(error) throw error;
            result(null, res);
        } catch (error) {
            result(null, error);
        }
    });
}

User.deleteUser = (id, result) => {
    dbConn.query("DELETE FROM users WHERE id = ?", [id], (error, res) => {
        try {
            if(error) throw error;
            result(null, res);
        } catch (error) {
            result(null, error);
        }
    });
}

module.exports = User;