import Comment from "../model/Comment.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Order from "../model/Order.js";
import OrderDetail from "../model/OrderDetail.js";

export const createComment = async (req, res) => {
    const userDetails = req.user
    const { comment, rating, productId } = req.body

    const user = await User.findUserById(userDetails.id)


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