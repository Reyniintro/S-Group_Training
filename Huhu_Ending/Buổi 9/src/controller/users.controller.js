const authService = require('../service/auth.service');
const usersService = require('../service/users.service');
const catchAsync = require('../utils/catchAsync');
const { sendResponse } = require('../utils/responseHelper');

const register = catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const user = await authService.register(username, password);
    sendResponse(res, 201, 'Đăng ký thành công', user);
});

const login = catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const tokens = await authService.login(username, password);
    sendResponse(res, 200, 'Đăng nhập thành công', tokens);
});

const getMe = catchAsync(async (req, res) => {
    const user = await usersService.getUserProfile(req.user.id);
    sendResponse(res, 200, 'Lấy thông tin thành công', user);
});

module.exports = { register, login, getMe };