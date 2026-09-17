class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class BadRequestError extends ApiError {
    constructor(message = 'Dữ liệu không hợp lệ') { super(message, 400); }
}

class AuthFailureError extends ApiError {
    constructor(message = 'Xác thực thất bại') { super(message, 401); }
}

class NotFoundError extends ApiError {
    constructor(message = 'Không tìm thấy tài nguyên') { super(message, 404); }
}

module.exports = { ApiError, BadRequestError, AuthFailureError, NotFoundError };