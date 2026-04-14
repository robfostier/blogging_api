//! Global router
//! Mounts each feature module on its own sub-path.

import { Router } from 'express';

const router = Router();

// Import and mount feature modules here
import usersModule from '../modules/users/index.js';
router.use(usersModule.path, usersModule.routes);

export default router;
