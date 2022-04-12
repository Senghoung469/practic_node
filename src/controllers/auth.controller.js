const AuthModel = require("../models/auth.model");
const {userValidator} = require("../../validator");
const jwt = require('jsonwebtoken');


// register Authentication
exports.signAuth = (req, res, next) => {
    const {error} = userValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);
    const authData = new AuthModel(req.body);
    AuthModel.signAuth(authData, (error, auth) => {
        if(error) throw error;
        const token = jwt.sign({ user_id: auth.insertId}, process.env.TOKEN_SECRET, {expiresIn: "2h"});
        console.log(token);
        res.header("x-access-token").status(200).send({message: 'Your token has been created', access_token: token});
    });
}

// Login Authentication