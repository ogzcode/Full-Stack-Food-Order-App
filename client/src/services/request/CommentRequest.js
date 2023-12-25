import { request } from '../apiConfig';

export const createComment = async (commentData) => {
    return await request.post('/comment/createComment', commentData);
}

export const getComments = async (productId) => {
    return await request.get(`/comment/getComments/${productId}`);
}

export const deleteComment = async (commentId) => {
    return await request.delete(`/comment/deleteCommentById/${commentId}`);
}

export const updateComment = async (commentId, commentData) => {
    return await request.put(`/comment/updateCommentById/${commentId}`, commentData);
}
