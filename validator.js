const Joi = require('@hapi/joi');

const userValidator = body => {
    // schema
    const schema = {
        username: Joi.string().alphanum().trim(true).min(6).max(100).required(),
        email: Joi.string().email().max(200).required(),
        password: Joi.string().trim(true).min(6).required(),
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
        name: Joi.string().min(3).max(100).trim(true).required(),
        qty: Joi.number().required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        createdBy: Joi.number(),
        updatedBy: Joi.number()
    };
    return Joi.validate(body, schema);
}

const loginValidator = body => {
    // schema
    const schema = {
        username: Joi.string().alphanum().min(6).max(100).trim(true).required(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(body, schema);
}

module.exports.userValidator = userValidator;
module.exports.productValidator = productValidator;
module.exports.loginValidator = loginValidator;