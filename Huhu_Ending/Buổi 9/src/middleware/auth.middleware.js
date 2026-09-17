const jwt = require('jsonwebtoken');
const { AuthFailureError } = require('../core/error.response');

const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new AuthFailureError('Chưa đăng nhập, không tìm thấy token');

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'my_super_secret_access_key');
        req.user = decoded; 
        next();
    } catch (err) {
        throw new AuthFailureError('Token không hợp lệ hoặc đã hết hạn');
    }
};

module.exports = { verifyTokenMiddleware };