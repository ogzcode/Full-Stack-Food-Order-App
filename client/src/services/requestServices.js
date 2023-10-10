import { request } from './apiConfig';

export const Login = async (loginData) => {
    return await request.post('/auth/login', loginData);
}

export const Register = async (registerData) => {
    return await request.post('/auth/register', registerData);
}

export const CheckAuth = async () => {
    return await request.get('/auth/checkAuth');
}

export const getAllUsers = async () => {
    return await request.get('/user/getAllUsers');
}


export const deleteUserById = async (id) => {
    return await request.delete(`/user/deleteUser/${id}`);
}