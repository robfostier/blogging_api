//! HTTP routes for likes module
//! Declares all routes of this module and wires them to the controller.
//! This router is exported and mounted by the global router (routes/router.js).

import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import * as likeController from './like.controller.js';

const router = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Gestion des likes sur les articles
 */

/**
 * @swagger
 * /posts/{id}/likes:
 *   post:
 *     summary: Liker un article
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Like ajouté avec succès
 *       409:
 *         description: Article déjà liké
 */
router.post('/', requireAuth, likeController.like);

/**
 * @swagger
 * /posts/{id}/likes:
 *   delete:
 *     summary: Retirer son like d'un article
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Like retiré avec succès
 */
router.delete('/', requireAuth, likeController.unlike);

/**
 * @swagger
 * /posts/{id}/likes:
 *   get:
 *     summary: Récupérer les likes d'un article
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nombre et liste des likes
 */
router.get('/', likeController.getLikes);

export default router;
