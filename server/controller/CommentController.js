import Comment from "../model/Comment.js";
import Order from "../model/Order.js";

/**
 * @swagger
 * /comment/createComment:
 *   post:
 *     summary: Create a new comment.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: body
 *         name: commentData
 *         description: Comment details for creation.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             comment:
 *               type: string
 *             rating:
 *               type: number
 *             productId:
 *               type: number
 *     responses:
 *       201:
 *         description: Comment created successfully.
 *       400:
 *         description: Bad request or error during comment creation.
 */
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

/**
 * @swagger
 * /comment/getComments/{productId}:
 *   get:
 *     summary: Get comments for a specific product.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: ID of the product to get comments for.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comments retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               comments:
 *                 - content: "Great product!"
 *                   rating: 5
 *                   userId: 1
 *                   productId: 123
 *               userCommentStatus: true
 *       400:
 *         description: Bad request or error during comment retrieval.
 */
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

/**
 * @swagger
 * /comment/deleteCommentById/{commentId}:
 *   delete:
 *     summary: Delete a comment by ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: commentId
 *         description: ID of the comment to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       400:
 *         description: Bad request or error during comment deletion.
 */
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


/**
 * @swagger
 * /comment/updateCommentById/{commentId}:
 *   put:
 *     summary: Update a comment by ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         description: ID of the comment to update.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: commentData
 *         description: Updated comment details.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             comment:
 *               type: string
 *             rating:
 *               type: number
 *     responses:
 *       200:
 *         description: Comment updated successfully.
 *       400:
 *         description: Bad request or error during comment update.
 */
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