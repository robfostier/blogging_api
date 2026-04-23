//! Input validation for users routes
//! Validates request bodies and params before they reach the controller.

import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const userSchema = Joi.object({
    username: Joi.string().trim().min(1).required(),
    email:    Joi.string().trim().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email:    Joi.string().trim().email().required(),
    password: Joi.string().required(),
});

function validate(schema, body) {
    const { error } = schema.validate(body, { abortEarly: false });
    if (!error) return;
    const err = new Error('Validation failed');
    err.status = StatusCodes.UNPROCESSABLE_ENTITY;
    err.errors = error.details.map(d => d.message);
    throw err;
}

export const validateUser  = (body) => validate(userSchema,  body);
export const validateLogin = (body) => validate(loginSchema, body);