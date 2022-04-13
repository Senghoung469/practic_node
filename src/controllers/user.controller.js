const UserModel = require("../models/user.model");
const { userValidator } = require("../../validator");
const jwt = require('jsonwebtoken');

// Get all users 
exports.getUserList = (req, res) => {
    UserModel.getUserAll(req.user.user_id, (error, user) => {
        if (error)
            throw new error;
        res.status(200).send({message: 'User list all', data: user});
    });
}

// Get user by id
exports.getUserById = (req, res) => {
    UserModel.getUserById([req.user.user_id, req.params.id], (error, user) => {
        if (error)
            throw error;
        res.send(user);
    });
}

// Get create user
exports.createUser = (req, res) => {
    const {error} =  userValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);
    const userData = new UserModel(req.body);
    userData.createdBy = req.user.user_id;
    userData.updatedBy = req.user.user_id;
    UserModel.createUser(userData, (error, user) => {
        if(error) throw error;
        res.json({status: true, message: 'User has been created successfully!', data: user});
    })
}

// Get update user
exports.updateUser = (req, res) => {
    const {error} = userValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);
    const userData = new UserModel(req.body);
    userData.updatedBy = req.user.user_id;
    UserModel.updateUser(req.params.id, userData, (error, user) => {
        if(error) throw error;
        res.json({status: true, message: 'User has been updated successfully!', data: user});
    })
}

// Delete user
exports.deleteUser = (req, res) => {
    UserModel.deleteUser(req.params.id, (error, user) => {
        if(error) throw error;
        res.json({status: true, message: 'User has been deleted!', data: user});
    });
}
