//! Global router
//! Mounts each feature module on its own sub-path.

import { Router } from 'express';
import { postRoutes } from '../modules/posts/index.js';
import { commentRoutes } from '../modules/comments/index.js';

const router = Router();

// Import and mount feature modules here
import usersModule from '../modules/users/index.js';
router.use(usersModule.path, usersModule.routes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

export default router;
