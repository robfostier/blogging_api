import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import * as commentController from './comment.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Gestion directe des commentaires
 */

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

export default router;