//! req/res handlers for comments routes
//! Handles HTTP request/response logic. Each function maps to one route.
//! Calls the service layer when there is actual business logic.

import * as commentService from './comment.service.js';
import { validateComment } from './comment.validation.js';

export const create = async (req, res) => {
    try {
        const commentData = { 
            ...req.body, 
            post: req.params.id 
        };

        validateComment(commentData);

        const savedComment = await commentService.createComment(commentData);
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la modification", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const updatedComment = await commentService.updateComment(req.params.id, req.body);
        if (!updatedComment) return res.status(404).json({ message: "Commentaire introuvable" });
        res.status(200).json(updatedComment);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message, errors: error.errors });
    }
};

export const remove = async (req, res) => {
    try {
        const deletedComment = await commentService.deleteComment(req.params.id);
        if (!deletedComment) return res.status(404).json({ message: "Commentaire introuvable" });
        res.status(200).json({ message: "Commentaire supprimé" });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message, errors: error.errors });
    }
};