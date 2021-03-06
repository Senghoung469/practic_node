const AuthModel = require("../models/auth.model");
const {userValidator, loginValidator} = require("../../validator");
const jwt = require('jsonwebtoken');


// register Authentication
exports.signAuth = (req, res) => {
    const {error} = userValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);
    const authData = new AuthModel(req.body);
    AuthModel.signAuth(authData, (error, auth) => {
        if(error) throw error;
        if(auth.sqlMessage) return res.status(400).send({status: false, message: auth.sqlMessage});
        const token = jwt.sign({ user_id: auth.insertId}, process.env.TOKEN_SECRET, {expiresIn: "24h"});
        res.header("authorization").status(200).send({message: 'Your token has been created', access_token: token});
    });
}

// Login Authentication
exports.loginAuth = (req, res) => {
    const {error} = loginValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);
    const authData = new AuthModel(req.body);
    authData.username = req.body.username;
    authData.password = req.body.password;
    AuthModel.loginAuth([authData.username, authData.password], (error, auth) => {
        if (!auth.validPassword) return res.status(400).send({status: false, message: 'Invalid username or password.'})
        const token = jwt.sign({ user_id: auth.user_id}, process.env.TOKEN_SECRET, {expiresIn: "24h"});
        res.header("authorization").status(200).send({message: 'Your token has been created', access_token: token});
    });
}