//! HTTP routes for comments module
//! Declares all routes of this module and wires them to the controller.
//! This router is exported and mounted by the global router (routes/router.js).

import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import * as commentController from './comment.controller.js';

const router = Router();

// Nested router mounted at /posts/:id/comments
const nestedRouter = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Gestion directe des commentaires
 */

/**
 * @swagger
 * /posts/{id}/comments:
 *   post:
 *     summary: Ajouter un commentaire à un article
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'article commenté
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentText:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 */
nestedRouter.post('/', requireAuth, commentController.create);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Modifier un commentaire existant
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du commentaire à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentText:
 *                 type: string
 *     responses:
 *       200:
 *         description: Commentaire modifié avec succès
 *       404:
 *         description: Commentaire introuvable
 */
router.put('/:id', requireAuth, commentController.update);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du commentaire à supprimer
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire introuvable
 */
router.delete('/:id', requireAuth, commentController.remove);

export { router, nestedRouter };