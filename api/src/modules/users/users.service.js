//! Business logic for users routes
//! All database queries go here. Controllers call these functions
//! and never interact with the model directly.

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './users.model.js';
import appState from '../../config/appState.js';
import { StatusCodes } from 'http-status-codes';

export async function login({ email, password }) {
    // Use .lean() to bypass toJSON transform and get raw password hash
    const rawUser = await User.findOne({ email, status: 'active' }).lean();
    if (!rawUser) {
        const err = new Error('Invalid credentials');
        err.status = StatusCodes.UNAUTHORIZED;
        throw err;
    }

    const valid = await bcrypt.compare(password, rawUser.password);
    if (!valid) {
        const err = new Error('Invalid credentials');
        err.status = StatusCodes.UNAUTHORIZED;
        throw err;
    }

    const token = jwt.sign(
        { id: rawUser._id, username: rawUser.username },
        appState.config.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}
