import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export default class User {
    static async createUser({ email, name, password }) {
        const hashPassword = await bcrypt.hash(password, 10)
        return await prisma.user.create({
            data: {
                email,
                name,
                password: hashPassword,
            },
        })
    }

    static async getAllUsers() {
        return await prisma.user.findMany()
    }

    static async findUserByEmailAndPassword({ email, password }) {
        const user =  await prisma.user.findUnique({
            where: {
                email
            },
        })

        if (!user) {
            throw new Error('User not found.')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new Error('Invalid password.')
        }

        return user
    }
}   
