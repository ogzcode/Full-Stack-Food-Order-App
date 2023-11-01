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
                content: true,
                rating: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
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
                        name: true,
                    },
                },
            }
        })
    }

    static async deleteAllComments() {
        return await prisma.comment.deleteMany({})
    }
}

export default Comment
