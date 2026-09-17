require('dotenv').config(); 

module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'my_super_secret_access_key',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'my_super_secret_refresh_key'
};