const jwt = require('jsonwebtoken');
const { AuthFailureError } = require('../core/error.response');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../config/env.config');

const generateAuthTokens = (user) => {
    const payload = { id: user.id, username: user.username };
    
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
    
    return { accessToken, refreshToken };
};

const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new AuthFailureError('Vui lòng cung cấp Access Token');

    try {
        const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        throw new AuthFailureError('Token không hợp lệ hoặc đã hết hạn');
    }
};

module.exports = { generateAuthTokens, verifyTokenMiddleware };