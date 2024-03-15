import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

export function verifyToken(req, res, next) {
    const token = req.cookies.access_token;

    if (!token) {
        return next(ErrorHandler.createError(401, "You're not verified"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(ErrorHandler.createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
}

export function verifyUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(ErrorHandler.createError(403, "You are not authorized"));
        }
    });
}

export function verifyAdmin(req, res, next) {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(ErrorHandler.createError(403, "You are not authorized"));
        }
    });
}