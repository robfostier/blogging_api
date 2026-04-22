//! Global router
//! Mounts each feature module on its own sub-path.

import { Router } from 'express';
import usersModule from '../modules/users/index.js';
import postsModule from '../modules/posts/index.js';
import commentsModule from '../modules/comments/index.js';

const router = Router();

// Import and mount feature modules here
router.use(usersModule.path, usersModule.routes);
router.use(postsModule.path, postsModule.routes);
router.use(commentsModule.path, commentsModule.routes);

export default router;
