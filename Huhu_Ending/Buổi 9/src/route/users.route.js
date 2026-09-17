const express = require('express');
const { body } = require('express-validator');
const usersController = require('../controller/users.controller');
const { validateRequest } = require('../middleware/validate');
const { verifyTokenMiddleware } = require('../utils/jwt.helper');

const router = express.Router();

router.post('/register', [
    body('username').notEmpty().withMessage('Username không được bỏ trống'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải từ 6 ký tự'),
    validateRequest
], usersController.register);

router.post('/login', [
    body('username').notEmpty().withMessage('Username không được bỏ trống'),
    body('password').notEmpty().withMessage('Mật khẩu không được bỏ trống'),
    validateRequest
], usersController.login);

router.get('/me', verifyTokenMiddleware, usersController.getMe);

module.exports = router;