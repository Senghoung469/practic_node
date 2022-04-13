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
    dbConn.query("SELECT * FROM users where id = ?", userId, (error, res) => {
        if(error){
            console.log("Error fetch ", error);
            result(null, error);
        }else{
            result(null, res);
        }

    });
}

User.getUserById = ([userId, id], result) => {
    dbConn.query("SELECT * FROM users WHERE id = ? AND id= ?", [userId, id], (error, res) => {
        if(error) throw error;
        result(null, res);
    });
}

User.createUser = (userData, result) => {
    dbConn.query("INSERT INTO users SET ?", userData, (error, res) => {
        if(error) throw error;
        result(null, res);
    });
}

User.updateUser = (id, userData, result) => {
    dbConn.query(`UPDATE users SET username=?, email=?, password=?, updatedAt=?, updatedBy=? WHERE id=?`,[userData.username, userData.email, userData.password, new Date(), userData.updatedBy, id], (error, res) => {
        if(error) throw error;
        result(null, res);
    });
}

User.deleteUser = (id, result) => {
    dbConn.query("DELETE FROM users WHERE id = ?", [id], (error, res) => {
        if(error) throw error;
        result(null, res);
    });
}

module.exports = User;