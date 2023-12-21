import prisma from './prismaConfig.js';
import bcrypt from 'bcrypt';

export default class User {
    static async createUser({ email, username, password, role = 'user' }) {
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
                username,
                password: hashPassword,
                role,
            },
        })
    }

    static async getAllUsers() {
        return await prisma.user.findMany({
            where: {
                role: 'user'
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                orderCount: true,
                createdAt: true,
                phone: true,
            }
        })
    }

    static async findUserByEmailAndPassword(email, password) {
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

    static async deleteUserById(id) {
        return await prisma.user.delete({
            where: {
                id
            },
        })
    }

    static async findUserById(id) {
        return await prisma.user.findUnique({
            where: {
                id
            },
        })
    }

    static async checkPassword(id, password) {
        const user = await prisma.user.findUnique({
            where: {
                id
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

    //Kaldırılabilir
    static async updateUserById(id, name, email, newPassword, phone, address) {
        const updateData = {
            name,
            email,
            phone,
            address,
        }

        if (newPassword) {
            const hashPassword = await bcrypt.hash(newPassword, 10);
            updateData.password = hashPassword
        }

        return await prisma.user.update({
            where: {
                id
            },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                orderCount: true,
                createdAt: true,
                phone: true,
                address: true,
            }
        })
    }

    static async updateUserPassword(id, newPassword) {
        const hashPassword = await bcrypt.hash(newPassword, 10);
        return await prisma.user.update({
            where: {
                id
            },
            data: {
                password: hashPassword
            }
        })
    }

    static setOrderCount(id, count) {
        return prisma.user.update({
            where: {
                id
            },
            data: {
                orderCount: count
            }
        })
    }
}   
