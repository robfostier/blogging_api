//! Global router
//! Mounts each feature module on its own sub-path.

import { Router } from 'express';
import usersModule from '../modules/users/index.js';
import postsModule from '../modules/posts/index.js';
import commentsModule from '../modules/comments/index.js';
import likesModule from '../modules/likes/index.js';

const router = Router();

for (const { path, routes } of usersModule)    router.use(path, routes);
for (const { path, routes } of postsModule)    router.use(path, routes);
for (const { path, routes } of commentsModule) router.use(path, routes);
for (const { path, routes } of likesModule)    router.use(path, routes);

export default router;
