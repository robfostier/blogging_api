//! Input validation for posts routes
//! Validates request bodies and params before they reach the controller.

import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const objectId = Joi.string().hex().length(24).required();

const postSchema = Joi.object({
    title:   Joi.string().trim().min(1).required(),
    content: Joi.string().trim().min(1).required(),
    author:  objectId,
    tags:    Joi.array().items(Joi.string()).default([]),
});

export function validatePost(body) {
    const { error } = postSchema.validate(body, { abortEarly: false });
    if (!error) return;
    const err = new Error('Validation failed');
    err.status = StatusCodes.UNPROCESSABLE_ENTITY;
    err.errors = error.details.map(d => d.message);
    throw err;
}
