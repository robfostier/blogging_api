import { Router } from 'express';
import { validateCreatePost } from './post.validation.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import * as postController from './post.controller.js';
import * as commentController from '../comments/comment.controller.js';

const router = Router();

router.post('/', requireAuth, postController.create);
router.get('/', postController.getAll);
router.get('/:id', postController.getById);
router.put('/:id', requireAuth, postController.update);
router.delete('/:id', requireAuth, postController.remove);
router.post('/:id/comments', commentController.create);

export default router;