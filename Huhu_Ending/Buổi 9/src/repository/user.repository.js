const fs = require('fs');
const { DB_FILE_PATH } = require('../config/db.config');

const readData = () => {
    try {
        const data = fs.readFileSync(DB_FILE_PATH, 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData.users || []; 
    } catch (error) {
        return []; 
    }
};

const writeData = (usersArray) => {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ users: usersArray }, null, 2), 'utf8');
};

const createUser = (username, hashedPassword) => {
    const users = readData();
    
    const newUser = { 
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        username, 
        password: hashedPassword 
    };
    
    users.push(newUser);
    writeData(users); 
    
    return newUser;
};

const findByUsername = (username) => {
    const users = readData();
    return users.find(u => u.username === username);
};

const findById = (id) => {
    const users = readData();
    return users.find(u => u.id === id);
};

module.exports = { createUser, findByUsername, findById };