const parseId = (id) => {
    const parsed = parseInt(id, 10);
    return isNaN(parsed) ? null : parsed;
};

module.exports = { parseId };