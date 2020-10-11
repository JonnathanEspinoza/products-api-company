import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
    try {
        // recibimos token
        const token = req.headers["x-access-token"];

        if (!token) return res.status(403).json({ message: "No token provide" });

        // extraemos lo que está dentro del token
        const decoded = jwt.verify(token, config.SECRET);

        // Buscamos el usuario
        const user = await User.findById(decoded.id, { password: 0 });
        if (!user) return res.status(404).json({ message: "no user found" });

        next();
        
    } catch (error) {
        res.status(401).json({message: "Unauthorixed"});
    }
}