import Comment from "../model/Comment.js";
import Order from "../model/Order.js";

export const createComment = async (req, res) => {
    const userDetails = req.user
    const { comment, rating, productId } = req.body

    const newComment = {
        content: comment,
        rating,
        userId: userDetails.id,
        productId
    }

    const createdComment = await Comment.createComment(newComment)

    res.status(201).json({
        message: "Comment created successfully"
    })
}

export const getComments = async (req, res) => {
    const { productId } = req.params
    const userDetails = req.user

    let userCommentStatus = false

    const comments = await Comment.getCommentsByProductId(parseInt(productId))

    for (let comment of comments) {
        if (comment.user.id === userDetails.id) {
            userCommentStatus = true
            break
        }
    }

    const products = await Order.getProductInOrderByUserId(userDetails.id, parseInt(productId))

    if (products.length === 0) {
        userCommentStatus = true
    }

    res.status(200).json({
        comments,
        userCommentStatus
    })
}

export const deleteAllComments = async (req, res) => {
    await Comment.deleteAllComments()

    res.status(200).json({
        message: "All comments deleted successfully"
    })
}

export const deleteCommentById = async (req, res) => {
    const { commentId } = req.params

    try {
        await Comment.deleteCommentById(parseInt(commentId))

        res.status(200).json({
            message: "Comment deleted successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            error: error.message
        })
    }
}

export const updateCommentById = async (req, res) => {
    const { commentId } = req.params
    const { comment, rating } = req.body

    const updatedComment = {
        content: comment,
        rating
    }

    try {
        await Comment.updateCommentById(parseInt(commentId), updatedComment)

        res.status(200).json({
            message: "Comment updated successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            error: error.message
        })
    }
}