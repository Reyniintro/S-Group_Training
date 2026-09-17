const { validationResult } = require('express-validator');
const { BadRequestError } = require('../core/error.response');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors.array().map(err => err.msg).join(', ');
        throw new BadRequestError(message);
    }
    next();
};

module.exports = { validateRequest };