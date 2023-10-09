import prisma from './prismaConfig.js';
import bcrypt from 'bcrypt';

export default class User {
    static async createUser({ email, name, password, role = 'user' }) {
        const user = await prisma.user.findUnique({
            where: {
                email
            },
        })

        if (user) {
            throw new Error('Email already exists.')
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        return await prisma.user.create({
            data: {
                email,
                name,
                password: hashPassword,
                role,
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
    
    static async deleteAllUsers() {
        return await prisma.user.deleteMany()
    } 

    static async findUserById(id) {
        return await prisma.user.findUnique({
            where: {
                id
            },
        })
    }
}   
