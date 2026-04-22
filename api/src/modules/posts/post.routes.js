//! HTTP routes for posts module
//! Declares all routes of this module and wires them to the controller.
//! This router is exported and mounted by the global router (routes/router.js).

import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireOwnership } from '../../middlewares/requireOwnership.js';
import * as postController from './post.controller.js';
import Post from './post.model.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gestion des articles du blog
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Article créé avec succès
 */
router.post('/', requireAuth, postController.create);


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: La liste de tous les articles
 */
router.get('/', postController.getAll);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Récupérer un article avec son ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'article
 *     responses:
 *       200:
 *         description: L'article a été trouvé
 *       404:
 *         description: Article introuvable
 */
router.get('/:id', postController.getById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Modifier un article existant
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'article à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Article modifié avec succès
 *       404:
 *         description: Article introuvable
 */
router.put('/:id', requireAuth, requireOwnership(Post, 'author'), postController.update);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'article à supprimer
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       404:
 *         description: Article introuvable
 */
router.delete('/:id', requireAuth, requireOwnership(Post, 'author'), postController.remove);

export default router;