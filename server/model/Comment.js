import prisma from "./prismaConfig.js"

class Comment {
    static async createComment(comment) {
        return await prisma.comment.create({
            data: comment
        })
    }

    static async getCommentsByProductId(productId) {
        return await prisma.comment.findMany({
            where: {
                productId
            },
            select: {
                id: true,
                content: true,
                rating: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            }
        })
    }

    static async getCommentsByUserId(userId) {
        return await prisma.comment.findMany({
            where: {
                userId
            },
            select: {
                content: true,
                rating: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            }
        })
    }

    static async deleteAllComments() {
        return await prisma.comment.deleteMany({})
    }

    static async deleteCommentById(commentId) {
        return await prisma.comment.delete({
            where: {
                id: commentId
            }
        })
    }

    static getRatingByProductId(productId) {
        return prisma.comment.aggregate({
            where: {
                productId
            },
            _avg: {
                rating: true
            }
        })
    }

    static async updateCommentById(commentId, comment) {
        return await prisma.comment.update({
            where: {
                id: commentId
            },
            data: comment
        })
    }
}

export default Comment
