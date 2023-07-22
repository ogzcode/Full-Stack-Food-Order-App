import jwt from 'jsonwebtoken';

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

        res.status(201).json({
            message: 'User created successfully'
        });

    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(409).json({ error: 'User already exists' });
        }

        res.status(500).json({ error: 'Unable to register user' });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
                password
            }
        })

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        
        res.json(
            {
                token,
                user
            }
        );
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to login' });
    }
}

