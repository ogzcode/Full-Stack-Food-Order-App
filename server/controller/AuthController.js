import User from '../model/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { email, name, password } = req.body
    try {
        const user = await User.createUser({ email, name, password })
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findUserByEmailAndPassword({ email, password })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        res.status(200).json({ 
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }, 
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

