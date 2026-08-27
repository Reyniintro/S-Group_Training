import { readData, writeData } from "../repository/readData.js";

export const getAllUsers = async () => {
    const data = await readData();
    return data.users;
};

export const getUserById = async (userId) => {
    const data = await readData();
    return data.users.find((user) => user.id === parseInt(userId)) || null;
};

export const createUser = async (userData) => {
    const data = await readData();
    data.users.push(userData);
    await writeData(data);
};

export const updateUser = async (userId, updateInfo) => {
    const data = await readData();
    
    const userIndex = data.users.findIndex((user) => user.id === parseInt(userId));

    if (userIndex === -1) {
        return null; 
    }

    data.users[userIndex] = { ...data.users[userIndex], ...updateInfo };
    
    await writeData(data);
    
    return data.users[userIndex];
};

export const deleteUser = async (userId) => {
    const data = await readData();
    const initialLength = data.users.length;
    data.users = data.users.filter((user) => user.id !== parseInt(userId));
    if (data.users.length === initialLength) {
        return false; 
    }
    await writeData(data);   
    return true;
};