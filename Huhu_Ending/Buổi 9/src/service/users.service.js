const userRepository = require('../repository/user.repository');
const { NotFoundError } = require('../core/error.response');

const getUserProfile = async (userId) => {
    const user = userRepository.findById(userId);
    if (!user) throw new NotFoundError('Người dùng không tồn tại');
    
    return { id: user.id, username: user.username };
};

module.exports = { getUserProfile };