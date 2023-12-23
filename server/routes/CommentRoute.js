import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createComment, getComments, deleteAllComments, deleteCommentById } from '../controller/CommentController.js';

const router = express.Router()

router.post("/createComment", authMiddleware, createComment)
router.get("/getComments/:productId", authMiddleware, getComments)
router.delete("/deleteAllComments", authMiddleware, deleteAllComments)
router.delete("/deleteCommentById/:commentId", authMiddleware, deleteCommentById)

export default router