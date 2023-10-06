import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
}