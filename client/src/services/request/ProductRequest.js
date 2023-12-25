import { request } from '../apiConfig';

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

export const getProductForUser = async () => {
    return await request.get('/product/user');
}

export const setProductFavority = async (productId) => {
    return await request.post('/product/setFavority', { productId });
}