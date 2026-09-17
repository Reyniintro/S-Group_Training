const userRepository = require('../repository/user.repository');
const { hashPassword, comparePassword } = require('../utils/password.helper');
const { generateAuthTokens } = require('../utils/jwt.helper');
const { BadRequestError, AuthFailureError, NotFoundError } = require('../core/error.response');

const register = async (username, password) => {
    if (userRepository.findByUsername(username)) {
        throw new BadRequestError('Username đã tồn tại');
    }
    const hashedPassword = await hashPassword(password);
    const user = userRepository.createUser(username, hashedPassword);
    
    return { id: user.id, username: user.username };
};

const login = async (username, password) => {
    const user = userRepository.findByUsername(username);
    if (!user) throw new AuthFailureError('Không tìm thấy người dùng');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new AuthFailureError('Mật khẩu không chính xác');
    return generateAuthTokens(user);
};

const getMe = async (userId) => {
    const user = userRepository.findById(userId);
    if (!user) throw new NotFoundError('Người dùng không tồn tại');
    
    return { id: user.id, username: user.username };
};

module.exports = { register, login, getMe };