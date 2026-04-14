//! Global router
//! Mounts each feature module on its own sub-path.

import { Router } from 'express';
import postRoutes from './modules/posts/post.routes.js';

const router = Router();

// Import and mount feature modules here
router.use('/posts', postRoutes);

export default router;
