import User from '../model/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { email, name, password } = req.body
    try {
        if (email === "admin@mail.com") {
            const user = await User.createUser({ email, name, password, role: 'admin' });
        }
        else {
            const user = await User.createUser({ email, name, password });
        }
            
        res.status(201).json({ message: 'User created successfully.'})
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findUserByEmailAndPassword({ email, password })
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })

        res.status(200).json({ 
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


export const checkAuth = async (req, res) => {
    const token = req.user
    try {
        const user = await User.findUserById(token.id)
        res.status(200).json({ 
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}
