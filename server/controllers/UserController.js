import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const verifyUser = async (req, res) => {
    const { id, token } = req;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        res.json({ user: user, token: token });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to get users' });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true
            }
        });

        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to get users' });
    }
}