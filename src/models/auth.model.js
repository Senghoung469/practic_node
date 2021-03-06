let dbConn = require("../../config/db.config");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let Auth = function(auth) {
    this.username = auth.username;
    this.email = auth.email;
    this.password = bcrypt.hashSync(auth.password, salt);
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.createdBy = 1;
    this.updatedBy = 1;
}

Auth.signAuth = (authData, result) => {
    dbConn.query("INSERT INTO users SET ?", authData, (error, res) => {
        try {
            if(error) throw error;
            if(res.insertId){
                dbConn.query("UPDATE users SET createdBy = ?, updatedBy = ? WHERE id = ?", [res.insertId, res.insertId, res.insertId]);
                result(null, res);
            }
        } catch (error) {
            result(null, error);
        }
    });
}

Auth.loginAuth = ([username, password], result) => {
    dbConn.query("SELECT * FROM users WHERE username = ?", [username, password], async (error, res) => {
        try {
            if(error) throw error;
            const validPassword = await bcrypt.compare(password, res[0].password);
            result(null, {validPassword: validPassword, user_id: res[0].id});
        } catch (error) {
            result(null, error);
        }
    });
}

module.exports = Auth;