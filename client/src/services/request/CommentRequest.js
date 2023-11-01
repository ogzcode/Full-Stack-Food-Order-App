import { request } from '../apiConfig';

export const createComment = async (commentData) => {
    return await request.post('/comment/createComment', commentData);
}

export const getComments = async (productId) => {
    return await request.get(`/comment/getComments/${productId}`);
}