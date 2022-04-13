let dbConn = require("../../config/db.config");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let Auth = function(auth) {
    this.id = auth.id;
    this.username = auth.username;
    this.email = auth.email;
    this.password = bcrypt.hashSync(auth.password, salt);
    this.token = auth.token;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.createdBy = auth.createdBy;
    this.updatedBy = auth.updatedBy;
}

Auth.signAuth = (authData, result) => {
    dbConn.query("INSERT INTO users SET ?", authData, (error, res) => {
        try {
            result(null, res);
        } catch (error) {
            result(null, error);
        }
    });
}

Auth.loginAuth = ([username, password], result) => {
    dbConn.query("SELECT * FROM users WHERE username = ?", [username, password], async (error, res) => {
        try {
            const validPassword = await bcrypt.compare(password, res[0].password);
            result(null, {validPassword: validPassword, user_id: res[0].id});
        } catch (error) {
            result(null, error);
        }
    });
}

module.exports = Auth;