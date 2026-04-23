//! Middleware factory to validate MongoDB ObjectId route params

import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

export const validateId = (param = 'id') => (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params[param])) {
        const err = new Error('Validation failed');
        err.status = StatusCodes.BAD_REQUEST;
        err.errors = [`${param} must be a valid ObjectId`];
        return next(err);
    }
    next();
};
