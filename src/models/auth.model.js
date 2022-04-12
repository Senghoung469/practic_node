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
        if(error) throw error;
        result(null, res);
    });
}

Auth.loginAuth = (req, result) => {

}

// dbConn.query("SELECT COUNT(*) AS email_exist FROM users WHERE email = ?", authData.email, (error, res) => {
//     if(error) throw error;
//     if(res[0].email_exist != 0) return result(null, {status: 400, message: 'email has been already taken'});
//     // console.log(authData.id);
//     // Create token
//     const token = jwt.sign({ user_id: 1}, process.env.TOKEN_SECRET, {expiresIn: "86400"});
//     result(null, token);
// });

module.exports = Auth;