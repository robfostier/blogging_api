//! req/res handlers for likes routes
//! Handles HTTP request/response logic. Each function maps to one route.
//! Calls the service layer when there is actual business logic.

import * as likeService from './like.service.js';
import { StatusCodes } from 'http-status-codes';

export const like = async (req, res, next) => {
    try {
        const savedLike = await likeService.likePost(req.user.id, req.params.id);
        res.status(StatusCodes.CREATED).json(savedLike);
    } catch (err) {
        // Duplicate key = already liked
        if (err.code === 11000) {
            return res.status(StatusCodes.CONFLICT).json({ message: 'You already liked this post' });
        }
        next(err);
    }
};

export const unlike = async (req, res, next) => {
    try {
        const deleted = await likeService.unlikePost(req.user.id, req.params.id);
        if (!deleted) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Like not found' });
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) { next(err); }
};

export const getLikes = async (req, res, next) => {
    try {
        const count = await likeService.countLikesByPost(req.params.id);
        const likes = await likeService.getLikesByPost(req.params.id);
        res.status(StatusCodes.OK).json({ count, likes });
    } catch (err) { next(err); }
};
