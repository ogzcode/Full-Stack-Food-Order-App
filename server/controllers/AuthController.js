import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                username
            }
        });
        res.json(user);
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(409).json({ error: 'User already exists' });
        }

        res.status(500).json({ error: 'Unable to register user' });
    }
}

