import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const verifyUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ msg: "Token not found" });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ msg: "Invalid Token" });

            req.userId = decoded.userId;
            next();
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
