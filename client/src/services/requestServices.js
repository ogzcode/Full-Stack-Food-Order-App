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

export const getAllProducts = async () => {
    return await request.get('/product/all');
}

export const createAndUpdateProduct = async (productData) => {
    return await request.post('/product/createAndUpdate', productData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const deleteProductById = async (id) => {
    return await request.delete(`/product/delete/${id}`);
}

export const deleteAccount = async (password) => {
    return await request.delete(`/user/deleteAccount/${password}`);
}