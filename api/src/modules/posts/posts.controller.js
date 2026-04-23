//! req/res handlers for posts routes
//! Handles HTTP request/response logic. Each function maps to one route.
//! Calls the service layer when there is actual business logic.

import * as postService from './posts.service.js';
import { validatePost } from './posts.validation.js';

export const create = async (req, res) => {
    try {
        validatePost(req.body);
        const savedPost = await postService.createPost(req.body);
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: "Erreur de création", error: error.message });
    }
};

export const getAll = async (req, res) => {
    try {
        let filter = {};
        if (req.query.tag) filter.tags = req.query.tag;
        if (req.query.author) filter.author = req.query.author;
        if (req.query.date) filter.createdAt = { $gte: new Date(req.query.date) };

        const posts = await postService.getAllPosts(filter);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ message: "Article introuvable" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const updatedPost = await postService.updatePost(req.params.id, req.body);
        if (!updatedPost) return res.status(404).json({ message: "Article introuvable" });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: "Erreur de modification", error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const deletedPost = await postService.deletePost(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: "Article introuvable" });
        res.status(200).json({ message: "Article supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur de suppression", error: error.message });
    }
};