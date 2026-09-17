const sendResponse = (res, status, message, data = null) => {
    const response = { status: 'success', message };
    if (data) response.data = data;
    return res.status(status).json(response);
};

module.exports = { sendResponse };