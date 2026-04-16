import { Router } from 'express';
import * as postController from './post.controller.js';
import { validateCreatePost } from './post.validation.js';

const router = Router();

router.post('/', postController.create);
router.get('/', postController.getAll);
router.get('/:id', postController.getById);
router.put('/:id', postController.update);
router.delete('/:id', postController.remove);

export default router;