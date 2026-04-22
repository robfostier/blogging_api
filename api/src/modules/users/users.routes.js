//! HTTP routes for users module
//! Declares all routes of this module and wires them to the controller.
//! This router is exported and mounted by the global router (routes/router.js).

import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireOwnership } from '../../middlewares/requireOwnership.js';
import * as usersController from './users.controller.js';
import User from './users.model.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs et de l'authentification
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Créer un nouveau compte utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compte créé avec succès
 *       409:
 *         description: Username ou email déjà utilisé
 *       422:
 *         description: Données invalides
 */
router.post('/register', usersController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Se connecter et obtenir un token JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne le token JWT
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', usersController.login);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer le profil d'un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Profil utilisateur récupéré avec succès
 *       404:
 *         description: Utilisateur introuvable
 */
router.get('/:id', usersController.detail);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Utilisateur introuvable
 */
router.put('/:id', requireAuth, requireOwnership(User, '_id'), usersController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un compte utilisateur (soft delete)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur
 *     responses:
 *       204:
 *         description: Utilisateur supprimé
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Utilisateur introuvable
 */
router.delete('/:id', requireAuth, requireOwnership(User, '_id'), usersController.remove);

export default router;
