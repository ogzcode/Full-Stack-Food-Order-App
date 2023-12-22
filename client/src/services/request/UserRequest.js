import { request } from '../apiConfig';

export const getAllUsers = async () => {
    return await request.get('/user/getAllUsers');
}


export const deleteUserById = async (id) => {
    return await request.delete(`/user/deleteUser/${id}`);
}

export const deleteAccount = async (password) => {
    return await request.delete(`/user/deleteAccount/${password}`);
}

export const updateUser = async (userData) => {
    return await request.patch('/user/updateUser', userData);
}

export const changePassword = async (passwordData) => {
    return await request.patch('/user/updatePassword', passwordData);
}

export const getUserDetails = async () => {
    return await request.get('/user/getUserDetails');
}