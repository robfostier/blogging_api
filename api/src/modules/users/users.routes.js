//! HTTP routes for users module
//! Declares all routes of this module and wires them to the controller.
//! This router is exported and mounted by the global router (routes/router.js).

import { Router } from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/:id', usersController.detail);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.remove);
router.post('/login', usersController.login);
router.post('/register', usersController.register);

export default router;
