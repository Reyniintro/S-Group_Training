const express = require('express');
const { body } = require('express-validator');
const authController = require('../controller/auth.controller');
const { validateRequest } = require('../middleware/validate');
const { verifyTokenMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();
router.post('/register', [
    body('username').notEmpty().withMessage('Username không được bỏ trống'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải từ 6 ký tự'),
    validateRequest
], authController.register);

router.post('/login', [
    body('username').notEmpty().withMessage('Username không được bỏ trống'),
    body('password').notEmpty().withMessage('Mật khẩu không được bỏ trống'),
    validateRequest
], authController.login);

router.get('/getMe', verifyTokenMiddleware, authController.getMe);

module.exports = router;