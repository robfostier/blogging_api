//! Input validation for users routes
//! Validates request bodies and params before they reach the controller.

import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

export function validateObjectId(id) {
    if (!mongoose.isValidObjectId(id)) {
        const err = new Error('Validation failed');
        err.status = StatusCodes.BAD_REQUEST;
        err.errors = ['id must be a valid ObjectId'];
        throw err;
    }
}

export function validateUser(body) {
    const { username, email, password } = body ?? {};
    const errors = [];

    if (!username || typeof username !== 'string' || username.trim() === '')
        errors.push('username is required and must be a non-empty string');
    if (email == null || typeof email !== 'string' || email.trim() === '')
        errors.push('email is required and must be a non-empty string');
    if (password == null || typeof password !== 'string' || password.trim() === '')
        errors.push('password is required and must be a non-empty string');

    if (errors.length > 0) {
        const err = new Error('Validation failed');
        err.status = StatusCodes.UNPROCESSABLE_ENTITY;
        err.errors = errors;
        throw err;
    }
}