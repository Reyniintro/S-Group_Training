const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Lỗi hệ thống nội bộ';

    res.status(status).json({
        status: 'error',
        code: status,
        message: message,
    });
};

module.exports = errorHandler;