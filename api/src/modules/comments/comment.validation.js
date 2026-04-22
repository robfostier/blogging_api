import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

export function validateComment(body) {
    const { commentText, author, post } = body ?? {};
    const errors = [];

    if (!commentText || typeof commentText !== 'string' || commentText.trim() === '') {
        errors.push('commentText is required and must be a non-empty string');
    }

    if (!author || !mongoose.isValidObjectId(author)) {
        errors.push('author is required and must be a valid ObjectId');
    }

    if (!post || !mongoose.isValidObjectId(post)) {
        errors.push('post (id) is required and must be a valid ObjectId');
    }

    if (errors.length > 0) {
        const err = new Error('Validation failed');
        err.status = StatusCodes.UNPROCESSABLE_ENTITY;
        err.errors = errors;
        throw err;
    }
}