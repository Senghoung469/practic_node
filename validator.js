const Joi = require('@hapi/joi');

const userValidator = body => {
    // schema
    const schema = {
        username: Joi.string().min(5).max(100).required(),
        email: Joi.string().email().max(200).required(),
        password: Joi.string().min(6).required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        createdBy: Joi.number(),
        updatedBy: Joi.number()
    }
    return Joi.validate(body, schema);
}

const productValidator = body => {
    // schema
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        qty: Joi.number().required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        createdBy: Joi.number(),
        updatedBy: Joi.number()
    };
    return Joi.validate(body, schema);
}

module.exports.userValidator = userValidator;
module.exports.productValidator = productValidator;