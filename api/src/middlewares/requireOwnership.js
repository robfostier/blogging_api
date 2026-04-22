//! Ownership authorization middleware factory
//! Verifies that the authenticated user owns the requested resource.
//! Returns 403 if the user is not the owner, 404 if the resource is not found.
//! Usage: requireOwnership(Model, 'fieldName') where fieldName is the owner field on the document.

import { StatusCodes } from 'http-status-codes';

export const requireOwnership = (Model, ownerField = 'author') => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id);
        if (!doc) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Resource not found' });
        }

        const ownerId = doc[ownerField].toString();
        if (ownerId !== req.user.id.toString()) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
        }

        next();
    } catch (err) {
        next(err);
    }
};
