//! Input validation for comments routes
//! Validates request bodies and params before they reach the controller.

import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const objectId = Joi.string().hex().length(24).required();

const commentSchema = Joi.object({
    commentText: Joi.string().trim().min(1).required(),
    author:      objectId,
    post:        objectId,
});

export function validateComment(body) {
    const { error } = commentSchema.validate(body, { abortEarly: false });
    if (!error) return;
    const err = new Error('Validation failed');
    err.status = StatusCodes.UNPROCESSABLE_ENTITY;
    err.errors = error.details.map(d => d.message);
    throw err;
}
