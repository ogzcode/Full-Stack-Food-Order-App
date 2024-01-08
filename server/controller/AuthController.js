import User from '../model/User.js'
import jwt from 'jsonwebtoken'
import { getUserExtraData } from '../utils/util.js'

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user.
 *     tags: [Auth]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to register.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Error during user creation.
 */
export const register = async (req, res) => {
    const { email, username, password } = req.body
    try {
        if (email === "admin@mail.com") {
            const user = await User.createUser({ email, username, password, role: 'admin' });
        }
        else {
            const user = await User.createUser({ email, username, password });
        }

        res.status(201).json({ message: 'User created successfully.' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate and generate JWT token.
 *     tags: [Auth]
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The user credentials for login.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: JWT token generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     userHasExtraData:
 *                       type: boolean
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
 *                 user:
 *                   id: "60b5a5b0f8b0a30015c2c5f1"
 *                   email: "example@mail.com"
 *                   name: "John Doe"
 *                   role: "admin"
 *                 userHasExtraData: true
 *       400:
 *         description: Invalid credentials or error during token generation.
 */

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findUserByEmailAndPassword(email, password)
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })

        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                userHasExtraData: getUserExtraData(user),
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/**
 * @swagger
 * /auth/checkAuth:
 *   get:
 *     summary: Check user authentication.
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     userHasExtraData:
 *                       type: boolean
 *               example:
 *                 user:
 *                   id: "60b5a5b0f8b0a30015c2c5f1"
 *                   email: "example@mail.com"
 *                   name: "John Doe"
 *                   role: "admin"
 *                 userHasExtraData: true
 *       400:
 *         description: Authentication failed or error during authentication check.
 */

export const checkAuth = async (req, res) => {
    const token = req.user
    try {
        const user = await User.findUserById(token.id)

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                userHasExtraData: getUserExtraData(user),
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
