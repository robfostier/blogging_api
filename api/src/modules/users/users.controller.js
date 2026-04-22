//! req/res handlers for users routes
//! Handles HTTP request/response logic. Each function maps to one route.
//! Calls the service layer when there is actual business logic.

import User from './users.model.js';
import { login as loginService } from './users.service.js';
import { validateUser, validateLogin, validateObjectId } from './users.validation.js';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export async function detail(req, res, next) {
    try {
        validateObjectId(req.params.id);
        const user = await User.findOne({ _id: req.params.id, status: 'active' });
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
        res.status(StatusCodes.OK).json(user);
    } catch (err) { next(err); }
}

export async function update(req, res, next) {
    try {
        validateObjectId(req.params.id);
        validateUser(req.body);
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
        res.status(StatusCodes.OK).json(user);
    } catch (err) { next(err); }
}

export async function remove(req, res, next) {
    try {
        validateObjectId(req.params.id);
        // Soft-delete by setting status to 'deleted'
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: 'deleted' },
            { new: true }
        );
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) { next(err); }
}

export async function login(req, res, next) {
    try {
        validateLogin(req.body);
        const token = await loginService(req.body);
        res.status(StatusCodes.OK).json({ token });
    } catch (err) { next(err); }
}

export async function register(req, res, next) {
    try {
        validateUser(req.body);
        const user = new User(req.body);
        await user.save();
        res.status(StatusCodes.CREATED).json(user);
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(StatusCodes.CONFLICT).json({ message: `${field} already taken` });
        }
        next(err);
    }
}