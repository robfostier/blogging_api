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

export function validatePost(body) {
    const { title, content, author } = body ?? {};
    const errors = [];

    if (!title || typeof title !== 'string' || title.trim() === '') {
        errors.push('title is required and must be a non-empty string');
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
        errors.push('content is required and must be a non-empty string');
    }

    if (!author || !mongoose.isValidObjectId(author)) {
        errors.push('author is required and must be a valid ObjectId');
    }

    if (errors.length > 0) {
        const err = new Error('Validation failed');
        err.status = StatusCodes.UNPROCESSABLE_ENTITY;
        err.errors = errors;
        throw err;
    }
}