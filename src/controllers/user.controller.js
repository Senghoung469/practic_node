const UserModel = require("../models/user.model");
const { userValidator } = require("../../validator");

// Get all users 
exports.getUserList = (req, res) => {
    UserModel.getUserAll(req.user.user_id, (error, user) => {
        if (error) throw error;
        res.status(200).send({message: 'User list all', data: user});
    });
}

// Get user by id
exports.getUserById = (req, res) => {
    UserModel.getUserById([req.user.user_id, req.params.id], (error, user) => {
        if (error) throw error;
        res.status(200).send({message: 'User data by id', data: user});
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
        if (error)
            throw error;
        if (user.sqlMessage)
            return res.status(400).send({ status: false, message: user.sqlMessage });
        res.status(200).send({ status: true, message: 'User has been created successfully!', data: user });
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
        if (user.sqlMessage)
            return res.status(400).send({ status: false, message: user.sqlMessage });
        res.status(200).send({status: true, message: 'User has been updated successfully!', data: user});
    })
}

// Delete user
exports.deleteUser = (req, res) => {
    UserModel.deleteUser(req.params.id, (error, user) => {
        if(error) throw error;
        res.status(200).send({status: true, message: 'User has been deleted!'});
    });
}
