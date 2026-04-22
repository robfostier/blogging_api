//! JWT authentication middleware
//! Returns 401 if the token is missing or invalid.

import jwt from 'jsonwebtoken';
import appState from '../config/appState.js';
import { StatusCodes } from 'http-status-codes';

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, appState.config.JWT_SECRET);
        req.user = payload; // { id, username }
        next();
    } catch {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
    }
};