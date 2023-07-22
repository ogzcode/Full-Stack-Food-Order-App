import jwt from "jsonwebtoken";

export const tokenControl = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send({
            error: "Access token not found!"
        });
    }
    try {
        const decoded = await jwt.verify(token, "secret");
        console.log(decoded);
        req.token = token;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).send({
            error: "Invalid token!"
        });
    }
}