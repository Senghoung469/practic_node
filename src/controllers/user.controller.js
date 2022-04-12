const UserModel = require("../models/user.model");
const { userValidator } = require("../../validator");

// Get all users 
exports.getUserList = (req, res) => {
    UserModel.getUserAll((error, user) => {
        if (error)
            throw new error;
        res.status(200).send({message: 'User list all', data: user});
    });
}

// Get user by id
exports.getUserById = (req, res) => {
    UserModel.getUserById(req.params.id, (error, user) => {
        if (error)
            throw error;
        res.send(user);
    });
}

// Get create user
exports.createUser = (req, res) => {
    const userData = new UserModel(req.body);
    const {error} =  userValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);
    UserModel.createUser(userData, (error, user) => {
        if(error) throw error;
        res.json({status: true, message: 'User has been created successfully!', data: user});
    })
}

// Get update user
exports.updateUser = (req, res) => {
    const userData = new UserModel(req.body);
    const {error} = userValidator(req.body);
    if(error) return res.status(400).send(error.details[0]);
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
