import jwt from 'jsonwebtoken';

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
